package graphql

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/dosco/graphjin/core"
	"github.com/go-chi/render"
	"github.com/olegsu/go-tools/pkg/logger"
)

type (
	Handler struct {
		Logger *logger.Logger
		GJ     *core.GraphJin
	}

	Body struct {
		Query string `json:"query"`
	}
)

func (h *Handler) Handle(w http.ResponseWriter, r *http.Request) {
	h.Logger.Info("handling request")
	if r.Method != http.MethodPost {
		return
	}
	b, err := ioutil.ReadAll(r.Body)
	if err != nil {
		return
	}
	body := Body{}
	if err := json.Unmarshal(b, &body); err != nil {
		return
	}

	res, err := h.GJ.GraphQL(r.Context(), body.Query, nil, nil)
	if err != nil {
		return
	}
	render.JSON(w, r, res)
}
