package main

import (
	"context"
	"fmt"
	"net/http"
	"os"

	"database/sql"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
	"github.com/olegsu/bizbuzim/pkg/dal"
	"github.com/olegsu/bizbuzim/pkg/fatal"
	"github.com/olegsu/bizbuzim/pkg/handlers"
	"github.com/olegsu/go-tools/pkg/logger"

	_ "github.com/lib/pq"
)

func main() {
	lgr := logger.New()

	host := fatal.GetEnv("POSTGRES_HOST")
	user := fatal.GetEnv("POSTGRES_USER")
	port := fatal.GetEnv("POSTGRES_PORT")
	password := fatal.GetEnv("POSTGRES_PASSWORD")
	dbname := fatal.GetEnv("POSTGRES_DATABASE")
	connstr := fmt.Sprintf("host=%s port=%s user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	db, err := sql.Open("postgres", connstr)
	dieOnError(err, "failed to connect to db")

	dieOnError(db.Ping(), "failed to ping to the database")

	lgr.Info("connected to db")

	queries := dal.New(db)

	bot, err := tgbotapi.NewBotAPI(fatal.GetEnv("TELEGRAM_BOT_TOKEN"))
	dieOnError(err, "failed to authenticated")

	lgr.Info("Authentication with Telegram completed", "user", bot.Self.UserName)

	hook := os.Getenv("TELEGRAM_BOT_WEBHOOK")
	if hook == "" {
		lgr.Info("Hook was not provided, starting bot with polling")
		u := tgbotapi.NewUpdate(0)
		u.Timeout = 60
		updates := bot.GetUpdatesChan(u)
		for u := range updates {
			if u.Message == nil {
				continue
			}
			go handlers.ProcessUpdate(context.Background(), lgr, bot, *u.Message, queries)
		}
	} else {
		wh, err := tgbotapi.NewWebhook(hook)
		dieOnError(err, "failed to create webhook")

		resp, err := bot.Request(wh)
		dieOnError(err, "failed to register webhook")
		lgr.Info("webhook registration completed", "description", resp.Description)

	}
	http.HandleFunc("/", handlers.MessageHandler(lgr, bot, queries))
	err = http.ListenAndServe(":8080", nil)
	dieOnError(err, "failed to start server")
}

func dieOnError(err error, msg string) {
	fatal.DieOnError(err, msg)
}
