package db

import (
	"encoding/json"
	"time"
)

type (
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
