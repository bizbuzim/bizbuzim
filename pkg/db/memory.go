package db

import (
	"context"
	"time"

	"github.com/olegsu/go-tools/pkg/logger"
)

type (
	memoryDal struct {
		lgr *logger.Logger
	}
)

func (m *memoryDal) Create(ctx context.Context, date time.Time, doc Document) (string, error) {
	return "", nil
}
func (m *memoryDal) CreateRaw(ctx context.Context, date time.Time, doc RawDocument) (string, error) {
	return "", nil
}
func (m *memoryDal) Close() error {
	return nil
}

func newMemoryDal(ctx context.Context, options options) (*memoryDal, error) {
	return &memoryDal{}, nil
}
