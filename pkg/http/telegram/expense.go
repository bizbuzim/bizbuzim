package telegram

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/brianvoe/gofakeit/v6"
	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
	"github.com/google/uuid"
	"github.com/olegsu/bizbuzim/pkg/dal"
	"github.com/olegsu/go-tools/pkg/logger"
)

type (
	sourceConfiguration struct {
		Defaults      sourceConfigurationDefaults `json:"defaults"`
		MessageParser string                      `json:"messageParser"`
	}

	sourceConfigurationDefaults struct {
		Source string   `json:"source"`
		Tags   []string `json:"tags"`
	}
)

var (
	completed = []string{
		"👍 Good job",
		"😉 Your'e awesome",
	}
	partially = []string{
		"🤭 Saved, you can finish it later.",
	}
	failed = []string{
		"👎 Oh crap ... ",
	}
)

func processNewExpenseMessage(ctx context.Context, lgr *logger.Logger, msg tgbotapi.Message, bot *tgbotapi.BotAPI, source *dal.Source, db dal.DB) error {
	config := sourceConfiguration{
		MessageParser: "default",
	}
	if err := json.Unmarshal(source.Configuration, &config); err != nil {
		lgr.Error(err, "failed to parse configuration, using default")
	}
	replayMessage := strings.Builder{}
	parse := getParser(config.MessageParser)
	data, err := parse(msg.Text, msg.Time(), config)
	id := uuid.Must(uuid.NewUUID())
	user := ""
	if msg.From != nil {
		user = msg.From.String()
	}
	if err != nil {
		lgr.Info("failed to parse messege, storing in raw table", "error", err.Error())
		raw := dal.RawExpense{
			ID:        id,
			Text:      msg.Text,
			CreatedAt: msg.Time(),
			CreatedBy: user,
			ExternalChannelID: sql.NullString{
				String: fmt.Sprintf("%d", msg.Chat.ID),
				Valid:  true,
			},
		}
		if err := raw.Insert(ctx, db); err != nil {
			replayMessage.WriteString(random(failed))
			lgr.Info("failed to add new record to raw table", "error", err.Error())
		} else {
			replayMessage.WriteString(random(partially))
			lgr.Info("saved", "id", id)
		}
	} else {
		expense := dal.Expense{
			ID:          id,
			Name:        data.Name,
			Payment:     data.Source,
			Price:       data.Price,
			Tags:        data.Categories,
			Description: data.Description,
			CreatedAt:   msg.Time(),
			CreatedBy:   user,
			ExternalChannelID: sql.NullString{
				String: fmt.Sprintf("%d", msg.Chat.ID),
				Valid:  true,
			},
		}
		lgr.Info("storing in expenses table", "data", data)
		if err := expense.Insert(ctx, db); err != nil {
			replayMessage.WriteString(random(failed))
			lgr.Info("failed to add new record to expenses table", "error", err.Error())
		} else {
			replayMessage.WriteString(random(completed))
			lgr.Info("saved", "id", id)
		}
	}

	return sendMessageToClient(&msg.MessageID, replayMessage.String(), msg.Chat.ID, bot)
}

func sendMessageToClient(msg *int, content string, chat int64, bot *tgbotapi.BotAPI) error {
	m := tgbotapi.NewMessage(chat, content)
	if msg != nil {
		m.ReplyToMessageID = *msg
	}
	_, err := bot.Send(m)
	return err
}

func random(arr []string) string {
	return arr[gofakeit.Number(0, len(arr)-1)]
}
