package db

import (
	"context"
	"fmt"
	"time"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"github.com/olegsu/go-tools/pkg/logger"
	"google.golang.org/api/option"
)

type (
	firestoreDal struct {
		project     string
		credentials []byte
		client      *firestore.Client
		fb          *firebase.App
		lgr         *logger.Logger
	}
)

func (f *firestoreDal) Create(ctx context.Context, date time.Time, doc Document) (string, error) {
	root := f.client.Collection(fmt.Sprintf("%d", date.Year()))
	dref := root.Doc(date.Month().String())
	data, err := doc.JSON()
	if err != nil {
		return "", err
	}
	expenses := dref.Collection("expenses")
	ref, _, err := expenses.Add(ctx, data)
	return ref.ID, err
}
func (f *firestoreDal) CreateRaw(ctx context.Context, date time.Time, doc RawDocument) (string, error) {
	root := f.client.Collection(fmt.Sprintf("%d", date.Year()))
	dref := root.Doc(date.Month().String())
	data, err := doc.JSON()
	if err != nil {
		return "", err
	}
	expenses := dref.Collection("raw")
	ref, _, err := expenses.Add(ctx, data)
	return ref.ID, err
}

func (f *firestoreDal) Close() error {
	return f.client.Close()
}

func newFirestoreDal(ctx context.Context, options options) (*firestoreDal, error) {
	f := &firestoreDal{}
	conf := &firebase.Config{ProjectID: f.project}
	creds := option.WithCredentialsJSON(f.credentials)
	app, err := firebase.NewApp(ctx, conf, creds)
	if err != nil {
		return nil, fmt.Errorf("failed to authenticate with firebase: %w", err)
	}

	f.fb = app
	client, err := app.Firestore(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to create firestore client: %w", err)
	}
	f.client = client

	return f, nil
}
