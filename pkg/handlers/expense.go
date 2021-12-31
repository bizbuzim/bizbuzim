package handlers

import (
	"context"
	"fmt"
	"strconv"
	"strings"
	"time"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
	"github.com/olegsu/bizbuzim/pkg/db"
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

func processNewExpenseMessage(ctx context.Context, lgr *logger.Logger, msg tgbotapi.Message, bot *tgbotapi.BotAPI, dal db.Dal) error {
	var storeError error
	data, err := attemptToParseMessage(msg)
	if err != nil {
		lgr.Info("failed to parse messege, storing in raw table", "error", err.Error())
		id, err := dal.CreateRaw(ctx, msg.Time(), db.RawDocument{
			Text:     msg.Text,
			CreateAt: msg.Time(),
		})
		if err != nil {
			lgr.Info("failed to add new record", "error", err.Error())
			return err
		}
		lgr.Info("saved", "id", id)
	} else {
		lgr.Info("storing in expenses table", "data", data)
		id, err := dal.Create(ctx, msg.Time(), db.Document{
			Name:        data.Name,
			Price:       data.Price,
			Categories:  data.Categories,
			Source:      data.Source,
			Description: data.Description,
			CreateAt:    data.Date,
		})
		if err != nil {
			lgr.Info("failed to add new record", "error", err.Error())
			return err
		}
		lgr.Info("saved", "id", id)
	}

	replayText := "👍 OK"
	if storeError != nil {
		lgr.Info("failed to add record to airtable", "error", storeError.Error())
		replayText = "👎 Oh crap ... "
	}

	replay := tgbotapi.NewMessage(msg.Chat.ID, replayText)
	replay.ReplyToMessageID = msg.MessageID
	bot.Send(replay)
	return nil
}

func attemptToParseMessage(msg tgbotapi.Message) (*StructuredMessage, error) {
	parts := strings.Split(msg.Text, "\n")
	if len(parts) < 3 {
		return nil, fmt.Errorf("Missing fields")
	}

	if len(parts) > 5 {
		return nil, fmt.Errorf("Too many fields")
	}

	name := parts[0]

	price, err := strconv.ParseFloat(strings.TrimSpace(parts[1]), 64)
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
		description = strings.Join(parts[5:], "\n")
	}

	return &StructuredMessage{
		Name:        name,
		Source:      source,
		Categories:  categories,
		Description: description,
		Date:        msg.Time(),
		Price:       price,
	}, nil
}
