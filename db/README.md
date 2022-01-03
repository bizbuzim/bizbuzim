* Required tools:
  * pg_dump
  * migrate - https://github.com/golang-migrate/migrate
  * sqlc - https://docs.sqlc.dev/en/latest/tutorials/getting-started-postgresql.html

* All table should be in plural
* No camelCase columns, use snake_case


* Flow
  * `export POSTGRESQL_URL=<URL>`
  * `export PGPASSWORD=<PASSWORD>`
  * `make new-migration name=<NAME>`
    * It runs: `migrate create -ext sql -dir db/migrations -seq <NAME(s)>`
    * Fill up and down scripts
  * `make run-migrations`
    * It runs:
      * `migrate -path db/migrations/ -database $POSTGRESQL_URL --verbose up`
      * `pg_dump --host=localhost -U postgres --port=5432 -d postgres -s > db/schema.sql`
  * Add queries to `db/queries/<NAME(s)>.sql`
  * `for f in db/queries/*.sql; do (cat "${f}"; echo "\n") >> db/query.sql; done;`
  * `sqlc generate -f sqlc.yaml`