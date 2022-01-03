.PHONY: new-migration
new-migration:
	migrate create -ext sql -dir db/migrations -seq $(name)

.PHONY: run-migrations
run-migrations: check-env
	echo "Running migrations"
	migrate -path db/migrations/ -database ${POSTGRESQL_URL} --verbose up
	pg_dump --host=localhost -U postgres --port=5432 -d postgres -s > db/schema.sql

.PHONY: gen-code
gen-code: check-env
	rm db/query.sql
	for f in $(shell pwd)/db/queries/*.sql; do (cat "$$f"; echo "\n") >> db/query.sql; done;
	sqlc generate -f sqlc.yaml

check-env:
ifndef POSTGRESQL_URL
	$(error POSTGRESQL_URL is undefined)
endif

ifndef PGPASSWORD
	$(error PGPASSWORD is undefined)
endif