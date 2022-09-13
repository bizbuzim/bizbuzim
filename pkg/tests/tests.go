package tests

import (
	"fmt"
	"time"

	"github.com/bizbuzim/bizbuzim/pkg/fatal"
)

func MustParseTime(layout string, value string) time.Time {
	t, err := time.Parse(layout, value)
	fatal.DieOnError(err, fmt.Sprintf("failed to parse time: %s", value))
	return t
}
