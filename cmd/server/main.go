package main

import (
	"context"
	"net/http"

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

	wh, err := tgbotapi.NewWebhook(fatal.GetEnv("TELEGRAM_BOT_WEBHOOK"))
	dieOnError(err, "failed to create webhook")

	resp, err := bot.Request(wh)
	dieOnError(err, "failed to register webhook")
	lgr.Info("webhook registration completed", "description", resp.Description)

	http.HandleFunc("/", handlers.MessageHandler(lgr, bot, client))
	err = http.ListenAndServe(":8080", nil)
	dieOnError(err, "failed to start server")
}

func dieOnError(err error, msg string) {
	fatal.DieOnError(err, msg)
}
