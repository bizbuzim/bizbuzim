package telegram

import (
	"context"
	"database/sql"
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/brianvoe/gofakeit/v6"
	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
	"github.com/google/uuid"
	"github.com/olegsu/bizbuzim/pkg/dal"
	"github.com/olegsu/go-tools/pkg/logger"
)

type (
	StructuredMessage struct {
		Name        string
		Price       float64
		Categories  []string
		Source      string
		Description string
		Date        time.Time
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

func processNewExpenseMessage(ctx context.Context, lgr *logger.Logger, msg tgbotapi.Message, bot *tgbotapi.BotAPI, db dal.DB) error {
	chat := msg.Chat.ID
	sources, err := dal.SourcesByIdxSourceExternalID(ctx, db, strconv.Itoa(int(chat)))
	if err != nil {
		lgr.Info("failed to get source", "error", err.Error())
		return sendMessageToClient(msg.MessageID, "something went wrong...", msg.Chat.ID, bot)
	}
	if len(sources) == 0 {
		return sendMessageToClient(msg.MessageID, fmt.Sprintf("source %d not found", msg.Chat.ID), msg.Chat.ID, bot)
	}

	replayMessage := strings.Builder{}
	data, err := attemptToParseMessage(msg.Text, msg.Time())
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

	return sendMessageToClient(msg.MessageID, replayMessage.String(), msg.Chat.ID, bot)
}

func sendMessageToClient(msg int, content string, chat int64, bot *tgbotapi.BotAPI) error {
	m := tgbotapi.NewMessage(chat, content)
	m.ReplyToMessageID = msg
	_, err := bot.Send(m)
	return err
}

func attemptToParseMessage(msg string, date time.Time) (*StructuredMessage, error) {
	parts := strings.Split(msg, "\n")
	if len(parts) < 3 {
		return nil, fmt.Errorf("missing fields")
	}

	name := parts[0]

	p := strings.TrimSpace(parts[1])
	price, err := strconv.ParseFloat(p, 64)
	if err != nil {
		return nil, err
	}

	source := strings.TrimSpace(parts[2])

	categories := []string{}
	if len(parts) >= 4 {
		for _, c := range strings.Split(parts[3], " ") {
			cat := strings.TrimSpace(c)
			if cat == "" {
				continue
			}
			categories = append(categories, cat)
		}
	}

	description := ""
	if len(parts) >= 5 {
		description = strings.Join(parts[4:], "\n")
	}

	return &StructuredMessage{
		Name:        name,
		Source:      source,
		Categories:  categories,
		Description: description,
		Date:        date,
		Price:       price,
	}, nil
}

func random(arr []string) string {
	return arr[gofakeit.Number(0, len(arr)-1)]
}
