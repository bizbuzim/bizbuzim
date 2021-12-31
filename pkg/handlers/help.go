package handlers

import (
	"context"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
	"github.com/olegsu/go-tools/pkg/logger"
)

var helpMessage = `
Hey 👋, I am your personal financial bot.
I will store your expenses and send you nice insights.

💵 💵 💵
To add new expense just send me a message in format:
<Store Name>
<Price>
<Payment Source>
<Category> <Category> ... <Category>
<Multi line description>
💵 💵 💵

💬 Commands I support:
/help - show this message
`

func help(ctx context.Context, lgr *logger.Logger, msg tgbotapi.Message, bot *tgbotapi.BotAPI) error {
	replay := tgbotapi.NewMessage(msg.Chat.ID, helpMessage)
	_, err := bot.Send(replay)
	return err
}
