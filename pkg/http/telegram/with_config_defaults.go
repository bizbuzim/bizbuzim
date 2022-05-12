package telegram

import (
	"fmt"
	"strconv"
	"strings"
	"time"
)

func configDefault(msg string, date time.Time, cnf sourceConfiguration) (Message, error) {
	m := Message{}
	parts := strings.Split(msg, "\n")
	if len(parts) < 2 {
		return m, fmt.Errorf("missing fields")
	}
	name := parts[0]

	p := strings.TrimSpace(parts[1])
	price, err := strconv.ParseFloat(p, 64)
	if err != nil {
		return m, err
	}

	categories := []string{}
	if len(parts) >= 3 {
		for _, c := range strings.Split(parts[3], " ") {
			cat := strings.TrimSpace(c)
			if cat == "" {
				continue
			}
			categories = append(categories, cat)
		}
	}

	description := ""
	if len(parts) >= 4 {
		description = strings.Join(parts[3:], "\n")
	}

	res := Message{
		Categories:  append(cnf.Defaults.Tags, categories...),
		Source:      cnf.Defaults.Source,
		Date:        date,
		Name:        name,
		Price:       price,
		Description: description,
	}
	return res, nil
}
