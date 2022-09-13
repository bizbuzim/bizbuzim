package telegram

import (
	"testing"
	"time"

	"github.com/bizbuzim/bizbuzim/pkg/dal"
	"github.com/bizbuzim/bizbuzim/pkg/tests"
	"github.com/olegsu/go-tools/pkg/logger"
	"github.com/stretchr/testify/assert"
)

var lgr = logger.New(logger.WithoutStd())

func Test_DefaultParser(t *testing.T) {
	type args struct {
		msg  string
		date time.Time
		src  *dal.Source
	}
	tests := []struct {
		name    string
		args    args
		want    Message
		wantErr bool
	}{
		{
			name: "ok",
			args: args{
				msg:  "name\n12.34\nsource\n1 2\nhello\nworld",
				date: tests.MustParseTime("2006-01-02", "2022-01-01"),
			},
			want: Message{
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
			got, err := defaultParser(tt.args.msg, tt.args.date, sourceConfiguration{})
			assert.NoError(t, err)
			assert.Equal(t, tt.want, got)
		})
	}
}
