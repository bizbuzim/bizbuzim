package handlers

import (
	"context"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
	"github.com/olegsu/go-tools/pkg/logger"
)

func complete(ctx context.Context, lgr *logger.Logger, msg tgbotapi.Message, bot *tgbotapi.BotAPI) error {
	replay := tgbotapi.NewMessage(msg.Chat.ID, "coming soon")
	_, err := bot.Send(replay)
	return err
}
