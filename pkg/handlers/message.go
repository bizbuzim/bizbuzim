package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
	"github.com/olegsu/bizbuzim/pkg/dal"
	"github.com/olegsu/go-tools/pkg/logger"
)

func MessageHandler(lgr *logger.Logger, bot *tgbotapi.BotAPI, db dal.DB) func(w http.ResponseWriter, r *http.Request) {
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
			go ProcessUpdate(context.Background(), lgr, bot, *update.Message, db)
		}
	}
}

func ProcessUpdate(ctx context.Context, lgr *logger.Logger, bot *tgbotapi.BotAPI, msg tgbotapi.Message, db dal.DB) {
	lgr.Info("processing message", "text", msg.Text, "user", msg.From.UserName, "channel", msg.Chat.Title)
	if msg.Text == "/help" {
		if err := help(ctx, lgr, msg, bot); err != nil {
			lgr.Info("failed to process /help message")
		}
		return
	}

	if msg.Text == "/uncompleted" {
		if err := uncompleted(ctx, lgr, msg, bot); err != nil {
			lgr.Info("failed to process /uncompleted message")
		}
		return
	}

	if msg.Text == "/expenses" {
		if err := expenses(ctx, lgr, msg, bot); err != nil {
			lgr.Info("failed to process /uncompleted message")
		}
		return
	}

	if strings.HasPrefix(msg.Text, "/complete") {
		if err := complete(ctx, lgr, msg, bot); err != nil {
			lgr.Info("failed to process /uncompleted message")
		}
		return
	}
	if err := processNewExpenseMessage(ctx, lgr, msg, bot, db); err != nil {
		lgr.Info("failed to process message", "error", err.Error())
	}
}
