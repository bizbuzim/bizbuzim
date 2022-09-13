package cmd

import (
	"bytes"
	"context"
	"fmt"
	"io/ioutil"
	"os"
	"path"
	"time"

	"github.com/bizbuzim/bizbuzim/pkg/cmd"
	"github.com/bizbuzim/bizbuzim/pkg/fatal"
	"github.com/olegsu/go-tools/pkg/logger"
	"github.com/spf13/cobra"
	"gopkg.in/yaml.v3"
)

var syncCmd = &cobra.Command{
	Use: "sync",
	Run: func(cmd *cobra.Command, args []string) {
		run()
	},
}

type syncCmdOptions struct {
	postgresHost       string
	postgresPort       string
	postgresUser       string
	postgresPassword   string
	migrationTablePath string
	migrationPath      string
	sqlSchemaPath      string
	production         bool
	genCode            bool
}

var syncOpt syncCmdOptions

func run() {
	lgr := logger.New()
	lgr.Info("Starting migration")
	wd, err := os.Getwd()
	fatal.DieOnError(err, "")

	docker := cmd.New(
		cmd.WithName("docker"),
		cmd.WithLogger(lgr),
	)

	postgresURL := fmt.Sprintf("postgres://%s:%s@%s:%s/postgres?sslmode=disable", syncOpt.postgresUser, syncOpt.postgresPassword, syncOpt.postgresHost, syncOpt.postgresPort)
	if !syncOpt.production {
		lgr.Info("POSTGRES_HOST and --pg-host is not set, using default localhost (starting postgresql in docker)")
		syncOpt.postgresHost = "localhost"
		err := docker.Exec(context.Background(),
			"run",
			"-d",
			"--name", "bizbuzim-migration",
			"-p", fmt.Sprintf("5432:%s", syncOpt.postgresPort),
			"-e", fmt.Sprintf("POSTGRES_PASSWORD=%s", syncOpt.postgresPassword),
			"postgres:14.4-alpine3.16")
		fatal.DieOnError(err, "failed to start postgres")
		lgr.Info("postgresql started, waiting 10 seconds")
		time.Sleep(time.Second * 30)
	}

	b, err := ioutil.ReadFile(syncOpt.migrationTablePath)
	fatal.DieOnError(err, "failed to read tables.yaml file")

	tables := []map[string]string{}
	err = yaml.Unmarshal(b, &tables)
	fatal.DieOnError(err, "failed to unmarshal table.yaml into object")

	migrationsPath := Getenv("MIGRATIONS", path.Join(wd, "./db/migrations"))
	migration := []string{
		"-path", migrationsPath,
		"-database", postgresURL,
	}
	migrate := cmd.New(cmd.WithName("migrate"))
	err = migrate.Exec(context.Background(), append(migration, "version")...)
	if err != nil {
		lgr.Info("failed to get migration version", "error", err.Error())
	}
	lgr.Info("migrating to latest version")

	err = migrate.Exec(context.Background(), append(migration, "up")...)
	fatal.DieOnError(err, "failed to run migration")
	lgr.Info("migration completed")

	dump := []string{
		"-s",
		"--host", syncOpt.postgresHost,
		"-U", syncOpt.postgresUser,
		"--port", syncOpt.postgresPort,
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
	if syncOpt.sqlSchemaPath != "" {
		dumpOut := &bytes.Buffer{}
		pgDump := cmd.New(
			cmd.WithName("pg_dump"),
			cmd.WithEnv([]string{
				fmt.Sprintf("PGPASSWORD=%s", syncOpt.postgresPassword),
			}),
			cmd.WithSTDOut(dumpOut),
		)
		err = pgDump.Exec(context.Background(), dump...)
		fatal.DieOnError(err, "failed to run pg_dump")
		lgr.Info("pg_dump completed", "distination", syncOpt.sqlSchemaPath)
		dumpResult, err := ioutil.ReadAll(dumpOut)
		fatal.DieOnError(err, "failed to read pg_dump result")
		err = os.WriteFile(syncOpt.sqlSchemaPath, dumpResult, os.ModePerm)
		fatal.DieOnError(err, syncOpt.sqlSchemaPath)
	}
	if syncOpt.genCode {
		lgr.Info("Starting to generate code")
		xoFlags := []string{
			"schema", postgresURL,
			"-o", "pkg/dal",
			"--go-pkg", "dal",
			"-j",
		}
		for _, object := range tables {
			for k, v := range object {
				if k == "name" {
					xoFlags = append(xoFlags, []string{
						"-i", v,
					}...)
				}
			}
		}
		xo := cmd.New(cmd.WithName("xo"))
		err = xo.Exec(context.Background(), xoFlags...)
		fatal.DieOnError(err, "failed to run xo")
	}
}

func init() {
	wd, err := os.Getwd()
	fatal.DieOnError(err, "")
	rootCmd.AddCommand(syncCmd)
	syncCmd.Flags().StringVar(&syncOpt.postgresHost, "pg-host", Getenv("POSTGRES_HOST", "localhost"), "postgres host")
	syncCmd.Flags().StringVar(&syncOpt.postgresPort, "pg-port", Getenv("POSTGRES_PORT", "5432"), "postgres post")
	syncCmd.Flags().StringVar(&syncOpt.postgresUser, "pg-user", Getenv("POSTGRES_USER", "postgres"), "postgres user")
	syncCmd.Flags().StringVar(&syncOpt.postgresPassword, "pg-password", Getenv("POSTGRES_PASSWORD", "postgres"), "postgres password")
	syncCmd.Flags().BoolVar(&syncOpt.production, "production", false, "")
	syncCmd.Flags().BoolVar(&syncOpt.genCode, "generate-code", true, "use xo to generate code from postgres schema")
	syncCmd.Flags().StringVar(&syncOpt.migrationTablePath, "tables", Getenv("MIGRATION_TABLES", path.Join(wd, "cmd/tools//tables.yaml")), "path to tables.yaml")
	syncCmd.Flags().StringVar(&syncOpt.migrationPath, "migrations", Getenv("MIGRATIONS", path.Join(wd, "./db/migrations")), "path to migrations dir")
	syncCmd.Flags().StringVar(&syncOpt.sqlSchemaPath, "schema-sql", os.Getenv("SCHEMA_SQL_PATH"), "path to schema.sql")
}
