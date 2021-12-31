package db

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/olegsu/go-tools/pkg/logger"
)

type (
	memoryDal struct {
		lgr      *logger.Logger
		expenses map[string]Document
		raw      map[string]RawDocument
	}
)

func (m *memoryDal) Create(ctx context.Context, date time.Time, doc Document) (string, error) {
	u, _ := uuid.NewUUID()
	m.expenses[u.String()] = doc
	return u.String(), nil
}
func (m *memoryDal) CreateRaw(ctx context.Context, date time.Time, doc RawDocument) (string, error) {
	u, _ := uuid.NewUUID()
	m.raw[u.String()] = doc
	return u.String(), nil
}
func (m *memoryDal) Close() error {
	return nil
}

func newMemoryDal(ctx context.Context, options options) (*memoryDal, error) {
	return &memoryDal{
		lgr:      options.lgr,
		expenses: map[string]Document{},
		raw:      map[string]RawDocument{},
	}, nil
}
