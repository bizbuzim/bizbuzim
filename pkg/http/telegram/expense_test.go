package telegram

import (
	"testing"
	"time"

	"github.com/olegsu/bizbuzim/pkg/tests"
	"github.com/stretchr/testify/assert"
)

func Test_attemptToParseMessage(t *testing.T) {
	type args struct {
		msg  string
		date time.Time
	}
	tests := []struct {
		name    string
		args    args
		want    *StructuredMessage
		wantErr bool
	}{
		{
			name: "ok",
			args: args{
				msg:  "name\n12.34\nsource\n1 2\nhello\nworld",
				date: tests.MustParseTime("2006-01-02", "2022-01-01"),
			},
			want: &StructuredMessage{
				Name:        "name",
				Price:       12.34,
				Categories:  []string{"1", "2"},
				Source:      "source",
				Description: "hello\nworld",
				Date:        tests.MustParseTime("2006-01-02", "2022-01-01"),
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := attemptToParseMessage(tt.args.msg, tt.args.date)
			assert.NoError(t, err)
			assert.Equal(t, tt.want, got)
		})
	}
}
