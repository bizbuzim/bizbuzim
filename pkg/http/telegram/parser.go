package telegram

import "time"

type (
	Message struct {
		Name        string
		Price       float64
		Categories  []string
		Source      string
		Description string
		Date        time.Time
	}

	Parse func(msg string, date time.Time, cgf sourceConfiguration) (Message, error)
)

var m = map[string]Parse{
	"default":              defaultParser,
	"with_config_defaults": configDefault,
}

func getParser(name string) Parse {
	if p, ok := m[name]; ok {
		return p
	}
	return defaultParser
}
