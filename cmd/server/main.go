package main

import (
	"context"
	"fmt"
	"net/http"
	"os"

	"database/sql"

	"github.com/bizbuzim/bizbuzim/pkg/fatal"
	"github.com/bizbuzim/bizbuzim/pkg/http/telegram"
	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
	"github.com/olegsu/go-tools/pkg/logger"

	_ "github.com/lib/pq"
)

const (
	apiTelegram = "/hook/telegram"
)

func main() {
	lgr := logger.New()
	lgr.Info("starting server")

	db, err := sql.Open("postgres", buildDatabaseConnURI(lgr))
	dieOnError(err, "failed to connect to db")
	dieOnError(db.Ping(), "failed to ping to the database")
	lgr.Info("connected to db")

	bot, err := tgbotapi.NewBotAPI(fatal.GetEnv("TELEGRAM_BOT_TOKEN"))
	dieOnError(err, "failed to authenticated")

	lgr.Info("Authentication with Telegram completed", "user", bot.Self.UserName)

	hook := os.Getenv("TELEGRAM_BOT_WEBHOOK")
	if hook == "" {
		lgr.Info("Hook was not provided, starting bot with polling")
		u := tgbotapi.NewUpdate(0)
		u.Timeout = 60
		updates := bot.GetUpdatesChan(u)
		go func() {
			for u := range updates {
				if u.Message == nil {
					continue
				}
				go telegram.ProcessUpdate(context.Background(), lgr, bot, *u.Message, db)
			}
		}()

	} else {
		wh, err := tgbotapi.NewWebhook(hook + apiTelegram)
		dieOnError(err, "failed to create webhook")
		wh.AllowedUpdates = []string{"message"}
		resp, err := bot.Request(wh)
		dieOnError(err, "failed to register webhook")
		info, err := bot.GetWebhookInfo()
		dieOnError(err, "failed to get webhook info")
		lgr.Info("webhook registration completed", "webhook", resp, "webhook-info", info)

	}
	tgHandler := telegram.Handler{
		Dal:    db,
		Logger: lgr.Fork("handler", "telegram"),
		TGBot:  bot,
	}
	http.HandleFunc(apiTelegram, tgHandler.Handle)
	err = http.ListenAndServe(":8000", nil)
	dieOnError(err, "failed to start server")
}

func dieOnError(err error, msg string) {
	fatal.DieOnError(err, msg)
}

func buildDatabaseConnURI(lgr *logger.Logger) string {
	user := fatal.GetEnv("POSTGRES_USER")
	password := fatal.GetEnv("POSTGRES_PASSWORD")
	dbname := fatal.GetEnv("POSTGRES_DATABASE")
	uri := ""
	gcp := os.Getenv("INSTANCE_CONNECTION_NAME")
	if gcp != "" {
		lgr.Info("connecting to gcp sql server")
		socketDir, isSet := os.LookupEnv("DB_SOCKET_DIR")
		if !isSet {
			lgr.Info("socket dir is not set")
			socketDir = "/cloudsql"
		}
		uri = fmt.Sprintf("user=%s password=%s database=%s host=%s/%s", user, password, dbname, socketDir, gcp)
	} else {
		lgr.Info("connecting to postgres directly")
		host := fatal.GetEnv("POSTGRES_HOST")
		port := fatal.GetEnv("POSTGRES_PORT")
		uri = fmt.Sprintf("host=%s port=%s user=%s "+
			"password=%s dbname=%s sslmode=disable",
			host, port, user, password, dbname)
	}

	return uri
}
