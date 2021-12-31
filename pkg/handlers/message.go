package handlers

import (
	"context"
	"encoding/json"
	"net/http"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
	"github.com/olegsu/bizbuzim/pkg/db"
	"github.com/olegsu/go-tools/pkg/logger"
)

func MessageHandler(lgr *logger.Logger, bot *tgbotapi.BotAPI, dal *db.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		update, err := bot.HandleUpdate(r)
		if err != nil {
			errMsg, _ := json.Marshal(map[string]string{"error": err.Error()})
			w.WriteHeader(http.StatusBadRequest)
			w.Header().Set("Content-Type", "application/json")
			_, _ = w.Write(errMsg)
			return
		}
		if update.Message.From == nil {
			return
		}
		if update.Message != nil {
			go ProcessUpdate(r.Context(), lgr, bot, *update.Message, dal)
		}
	}
}

func ProcessUpdate(ctx context.Context, lgr *logger.Logger, bot *tgbotapi.BotAPI, msg tgbotapi.Message, dal *db.DB) {
	lgr.Info("processing message", "text", msg.Text)
	if msg.Text == "/help" {
		if err := help(ctx, lgr, msg, bot); err != nil {
			lgr.Info("failed to process /help message")
		}
		return
	}
	if err := processNewExpenseMessage(ctx, lgr, msg, bot, dal); err != nil {
		lgr.Info("failed to process message", "error", err.Error())
	}
}
