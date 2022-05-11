package telegram

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
	"github.com/olegsu/bizbuzim/pkg/dal"
	"github.com/olegsu/go-tools/pkg/logger"
)

type (
	Handler struct {
		Dal    dal.DB
		Logger *logger.Logger
		TGBot  *tgbotapi.BotAPI
	}
)

func (h *Handler) Handle(w http.ResponseWriter, r *http.Request) {
	update, err := h.TGBot.HandleUpdate(r)
	if err != nil {
		h.Logger.Info("failed to read body", "error", err.Error())
		errMsg, _ := json.Marshal(map[string]string{"error": err.Error()})
		w.WriteHeader(http.StatusBadRequest)
		w.Header().Set("Content-Type", "application/json")
		_, _ = w.Write(errMsg)
		return
	}
	if update == nil {
		h.Logger.Info("update is nil")
		return
	}
	if update.Message == nil {
		h.Logger.Info("no message in update")
		return
	}
	if update.Message.From == nil {
		h.Logger.Info("the message was sent by no-one", "update", update)
		return
	}
	go ProcessUpdate(context.Background(), h.Logger, h.TGBot, *update.Message, h.Dal)
}

func ProcessUpdate(ctx context.Context, lgr *logger.Logger, bot *tgbotapi.BotAPI, msg tgbotapi.Message, db dal.DB) {
	lgr.Info("processing message", "text", msg.Text, "user", msg.From.UserName, "channel", msg.Chat.Title, "channel-id", msg.Chat.ID)
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
