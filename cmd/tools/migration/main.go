package main

import (
	"context"
	"io/ioutil"
	"os"
	"os/exec"
	"path"
	"strings"
	"time"

	"github.com/olegsu/bizbuzim/pkg/fatal"
	"github.com/olegsu/go-tools/pkg/logger"
	"gopkg.in/yaml.v3"
)

func main() {
	lgr := logger.New()
	lgr.Info("Starting migration")
	wd, err := os.Getwd()
	dieOnError(err, "")

	postgresURL := os.Getenv("POSTGRESQL_URL")
	postgresHost := os.Getenv("POSTGRES_HOST")
	if postgresURL == "" {
		lgr.Info("POSTGRESQL_URL is not set, starting postgresql in docker")
		pg := []string{
			"run", "-it",
			"-d",
			"-p", "5432:5432",
			"-e", "POSTGRES_PASSWORD=postgres",
			"postgres:14",
		}
		_, err := run(context.Background(), lgr, time.Second*10, "docker", pg...)
		dieOnError(err, "failed to start postgres")
		lgr.Info("postgresql started, waiting 10 seconds")
		time.Sleep(time.Second * 30)
		postgresURL = "postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable"
		postgresHost = "localhost"
	}

	p := os.Getenv("MIGRATION_TABLES")
	if p == "" {
		p = path.Join(wd, "cmd/tools/migration/tables.yaml")
	}
	b, err := ioutil.ReadFile(p)
	dieOnError(err, "failed to read tables.yaml file")

	tables := []map[string]string{}
	err = yaml.Unmarshal(b, &tables)
	dieOnError(err, "failed to unmarshal table.yaml into object")

	migrationsPath := os.Getenv("MIGRATIONS")
	if migrationsPath == "" {
		migrationsPath = path.Join(wd, "./db/migrations")
	}
	migration := []string{
		"-path", migrationsPath,
		"-database", postgresURL,
	}

	version, err := run(context.Background(), lgr, time.Second*30, "migrate", append(migration, "version")...)
	if err != nil {
		lgr.Info("failed to get migration version", "error", err.Error(), "output", string(version))
	}
	lgr.Info("migrating to latest version")

	_, err = run(context.Background(), lgr, time.Second*30, "migrate", append(migration, "up")...)
	dieOnError(err, "failed to run migration")
	lgr.Info("migration completed")

	dump := []string{
		"-s",
		"--host", postgresHost,
		"-U", "postgres",
		"--port", "5432",
		"-d", "postgres",
	}
	for _, object := range tables {
		for k, v := range object {
			if k == "name" {
				dump = append(dump, []string{
					"--table", v,
				}...)
			}
		}
	}
	schema := os.Getenv("SCHEMA_SQL_PATH")
	if schema != "" {
		d, err := run(context.Background(), lgr, time.Second*30, "pg_dump", dump...)
		lgr.Info("pg_dump completed", "distination", schema)
		dieOnError(err, "failed to run pg_dump")
		err = os.WriteFile(schema, d, os.ModePerm)
		dieOnError(err, schema)
	}
	if os.Getenv("GEN_CODE") != "" {
		lgr.Info("Starting to generate code")
		xo := []string{
			"schema", postgresURL,
			"-o", "pkg/dal",
			"--go-pkg", "dal",
			"-j",
		}
		for _, object := range tables {
			for k, v := range object {
				if k == "name" {
					xo = append(xo, []string{
						"-i", v,
					}...)
				}
			}
		}
		out, err := run(context.Background(), lgr, time.Second*30, "xo", xo...)
		dieOnError(err, "failed to run xo"+" -- "+string(out))
	}
}

func dieOnError(err error, msg string) {
	fatal.DieOnError(err, msg)
}

func run(ctx context.Context, lgr *logger.Logger, timeout time.Duration, name string, args ...string) ([]byte, error) {
	lgr.Info("running cmd", "cmd", name, "args", strings.Join(args, " "))
	tctx, cancel := context.WithTimeout(ctx, timeout)
	defer cancel()
	cmd := exec.CommandContext(tctx, name, args...)
	cmd.Env = os.Environ()
	return cmd.CombinedOutput()
}
