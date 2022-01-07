package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/dosco/graphjin/core"
	"github.com/go-chi/render"
	_ "github.com/jackc/pgx/v4/stdlib"
	"github.com/olegsu/bizbuzim/pkg/fatal"
	"github.com/olegsu/go-tools/pkg/logger"
)

type Body struct {
	Query string `json:"query"`
}

func Handler(gj *core.GraphJin) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		b, err := ioutil.ReadAll(r.Body)
		if err != nil {
			return
		}
		body := Body{}
		if err := json.Unmarshal(b, &body); err != nil {
			return
		}

		res, err := gj.GraphQL(r.Context(), body.Query, nil, nil)
		if err != nil {
			return
		}
		render.JSON(w, r, res)
	}
}

func main() {
	lgr := logger.New()
	lgr.Info("starting graphjin")
	user := fatal.GetEnv("POSTGRES_USER")
	password := fatal.GetEnv("POSTGRES_PASSWORD")
	dbname := fatal.GetEnv("POSTGRES_DATABASE")
	uri := ""
	gcp := os.Getenv("INSTANCE_CONNECTION_NAME")
	if gcp != "" {
		lgr.Info("connecting to gcp sql server")
		socketDir, isSet := os.LookupEnv("DB_SOCKET_DIR")
		if !isSet {
			lgr.Info("socket dir is not set")
			socketDir = "/cloudsql"
		}
		uri = fmt.Sprintf("user=%s password=%s database=%s host=%s/%s", user, password, dbname, socketDir, gcp)
	} else {
		lgr.Info("connecting to postgres directly")
		host := fatal.GetEnv("POSTGRES_HOST")
		port := fatal.GetEnv("POSTGRES_PORT")
		uri = fmt.Sprintf("host=%s port=%s user=%s "+
			"password=%s dbname=%s sslmode=disable",
			host, port, user, password, dbname)
	}

	db, err := sql.Open("postgres", uri)
	fatal.DieOnError(err, "failed to connect to db")

	gj, err := core.NewGraphJin(nil, db)
	fatal.DieOnError(err, "failed start graphjin")

	http.HandleFunc("/api", Handler(gj))
	err = http.ListenAndServe(":8080", nil)
}
