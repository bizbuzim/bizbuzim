package main

import (
	"context"
	"net/http"
	"os"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
	"github.com/olegsu/bizbuzim/pkg/db"
	"github.com/olegsu/bizbuzim/pkg/fatal"
	"github.com/olegsu/bizbuzim/pkg/handlers"
	"github.com/olegsu/go-tools/pkg/logger"
)

func main() {
	lgr := logger.New()

	client, err := db.New(
		db.WithContext(context.Background()),
		db.WithProject(fatal.GetEnv("PROJECT_ID")),
		db.WithCredentials(fatal.DecodeB64(fatal.GetEnv("FIRESTORE_SA_B64"))),
	)
	dieOnError(err, "failed to connect to database")

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
			go handlers.ProcessUpdate(context.Background(), lgr, bot, *u.Message, client)
		}
	} else {
		wh, err := tgbotapi.NewWebhook(hook)
		dieOnError(err, "failed to create webhook")

		resp, err := bot.Request(wh)
		dieOnError(err, "failed to register webhook")
		lgr.Info("webhook registration completed", "description", resp.Description)

	}
	http.HandleFunc("/", handlers.MessageHandler(lgr, bot, client))
	err = http.ListenAndServe(":8080", nil)
	dieOnError(err, "failed to start server")
}

func dieOnError(err error, msg string) {
	fatal.DieOnError(err, msg)
}
