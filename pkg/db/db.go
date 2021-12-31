package db

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"time"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

const (
	DBDriverFirestore = "firestore"
	DBDriverMemory    = "memory"
)

var errDriverNotSupported = errors.New("driver not supported")

type (
	DB struct {
		project     string
		credentials []byte
		client      *firestore.Client
		fb          *firebase.App
		ctx         context.Context
		driver      string
	}

	Option func(d *DB)

	Document struct {
		Name        string    `json:"name"`
		Price       float64   `json:"price"`
		Categories  []string  `json:"categories"`
		Source      string    `json:"source"`
		Description string    `json:"description"`
		CreateAt    time.Time `json:"createdAt"`
	}

	RawDocument struct {
		Text     string    `json:"text"`
		CreateAt time.Time `json:"createdAt"`
	}
)

func New(opts ...Option) (*DB, error) {
	d := &DB{}
	for _, o := range opts {
		o(d)
	}

	if d.driver == DBDriverMemory {
		return d, nil
	}

	if d.driver == DBDriverFirestore {
		conf := &firebase.Config{ProjectID: d.project}
		creds := option.WithCredentialsJSON(d.credentials)
		app, err := firebase.NewApp(d.ctx, conf, creds)
		if err != nil {
			return nil, fmt.Errorf("failed to authenticate with firebase: %w", err)
		}

		d.fb = app
		client, err := app.Firestore(d.ctx)
		if err != nil {
			return nil, fmt.Errorf("failed to create firestore client: %w", err)
		}
		d.client = client

		return d, nil
	}
	return nil, errDriverNotSupported
}

func WithContext(ctx context.Context) Option {
	return func(d *DB) {
		d.ctx = ctx
	}
}
func WithProject(project string) Option {
	return func(d *DB) {
		d.project = project
		d.driver = DBDriverFirestore
	}
}
func WithCredentials(credentials []byte) Option {
	return func(d *DB) {
		d.credentials = credentials
	}
}
func WithMemoryDB() Option {
	return func(d *DB) {
		d.driver = DBDriverFirestore
	}
}

func (d *DB) Create(ctx context.Context, date time.Time, doc Document) (string, error) {
	if !d.isFirestoreDriver() {
		return "", nil
	}
	root := d.client.Collection(fmt.Sprintf("%d", date.Year()))
	dref := root.Doc(date.Month().String())
	data, err := doc.JSON()
	if err != nil {
		return "", err
	}
	expenses := dref.Collection("expenses")
	ref, _, err := expenses.Add(ctx, data)
	return ref.ID, err
}

func (d *DB) CreateRaw(ctx context.Context, date time.Time, doc RawDocument) (string, error) {
	if !d.isFirestoreDriver() {
		return "", nil
	}
	root := d.client.Collection(fmt.Sprintf("%d", date.Year()))
	dref := root.Doc(date.Month().String())
	data, err := doc.JSON()
	if err != nil {
		return "", err
	}
	expenses := dref.Collection("raw")
	ref, _, err := expenses.Add(ctx, data)
	return ref.ID, err
}

func (d *DB) Close() error {
	return d.client.Close()
}

func (d *DB) isFirestoreDriver() bool {
	return d.driver == DBDriverFirestore
}

func (doc Document) JSON() (map[string]interface{}, error) {
	return toJson(doc)
}

func (doc RawDocument) JSON() (map[string]interface{}, error) {
	return toJson(doc)
}

func toJson(data interface{}) (map[string]interface{}, error) {
	b, err := json.Marshal(data)
	if err != nil {
		return nil, err
	}
	j := map[string]interface{}{}
	if err := json.Unmarshal(b, &j); err != nil {
		return nil, err
	}
	return j, nil

}
