package telegram

import (
	"fmt"
	"strconv"
	"strings"
	"time"
)

func defaultParser(msg string, date time.Time, cfg sourceConfiguration) (Message, error) {
	m := Message{}
	parts := strings.Split(msg, "\n")
	if len(parts) < 3 {
		return m, fmt.Errorf("missing fields")
	}

	name := parts[0]

	p := strings.TrimSpace(parts[1])
	price, err := strconv.ParseFloat(p, 64)
	if err != nil {
		return m, err
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

	return Message{
		Name:        name,
		Source:      source,
		Categories:  categories,
		Description: description,
		Date:        date,
		Price:       price,
	}, nil
}
