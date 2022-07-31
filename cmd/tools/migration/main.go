package main

import (
	"context"
	"io/ioutil"
	"os"
	"os/exec"
	"path"
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

	p := os.Getenv("MIGRATION_TABLES")
	if p == "" {
		p = path.Join(wd, "cmd/tools/migrations/tables.yaml")
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
		"-database", os.Getenv("POSTGRESQL_URL"),
	}

	version, err := run(context.Background(), lgr, time.Second*30, "migrate", append(migration, "version")...)
	dieOnError(err, "failed to get current migration version")
	lgr.Info("migrating to latest version", "current-version", string(version))

	_, err = run(context.Background(), lgr, time.Second*30, "migrate", append(migration, "up")...)
	dieOnError(err, "failed to run migration")
	lgr.Info("migration completed")

	dump := []string{
		"-s",
		"--host", os.Getenv("POSTGRES_HOST"),
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
	if schema == "" {
		lgr.Info("SCHEMA_SQL_PATH is not set, skipping pg_dump")
		return
	}
	d, err := run(context.Background(), lgr, time.Second*30, "pg_dump", dump...)
	lgr.Info("pg_dump completed", "distination", schema)
	dieOnError(err, "failed to run pg_dump")

	err = os.WriteFile(schema, d, os.ModePerm)
	dieOnError(err, schema)
}

func dieOnError(err error, msg string) {
	fatal.DieOnError(err, msg)
}

func run(ctx context.Context, lgr *logger.Logger, timeout time.Duration, name string, args ...string) ([]byte, error) {
	lgr.Info("running cmd", "cmd", name, "args", args)
	tctx, cancel := context.WithTimeout(ctx, timeout)
	defer cancel()
	cmd := exec.CommandContext(tctx, name, args...)
	cmd.Env = os.Environ()
	return cmd.CombinedOutput()
}
