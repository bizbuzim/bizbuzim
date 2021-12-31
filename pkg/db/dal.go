package db

import (
	"context"
	"errors"
	"time"

	"github.com/olegsu/go-tools/pkg/logger"
)

const (
	DBDriverFirestore = "firestore"
	DBDriverMemory    = "memory"
)

var errDriverNotSupported = errors.New("driver not supported")

type (
	Option func(o *options)

	Dal interface {
		Close() error
		Create(ctx context.Context, date time.Time, doc Document) (string, error)
		CreateRaw(ctx context.Context, date time.Time, doc RawDocument) (string, error)
	}

	options struct {
		firestoreProject     string
		firestoreCredentials []byte
		lgr                  *logger.Logger
	}
)

func New(ctx context.Context, driver string, opts ...Option) (Dal, error) {

	opt := &options{}
	for _, o := range opts {
		o(opt)
	}

	if driver == DBDriverMemory {
		return newMemoryDal(ctx, *opt)
	}

	if driver == DBDriverFirestore {
		return newFirestoreDal(ctx, *opt)
	}
	return nil, errDriverNotSupported
}

func WithFirestoreProject(id string) Option {
	return func(o *options) {
		o.firestoreProject = id
	}
}

func WithFirestoreCredentials(credentials []byte) Option {
	return func(o *options) {
		o.firestoreCredentials = credentials
	}
}

func WithLogger(lgr *logger.Logger) Option {
	return func(o *options) {
		o.lgr = lgr
	}
}
