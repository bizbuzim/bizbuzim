package db

import (
	"time"
)

type (
	RawDocument struct {
		Text     string    `json:"text"`
		CreateAt time.Time `json:"createdAt"`
	}
)

func (doc RawDocument) JSON() (map[string]interface{}, error) {
	return toJson(doc)
}
