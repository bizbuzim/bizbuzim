.PHONY: new-migration
new-migration:
	migrate create -ext sql -dir db/migrations -seq $(name)

.PHONY: run-migrations
run-migrations: check-env
	echo "Running migrations"
	migrate -path db/migrations/ -database ${POSTGRESQL_URL} --verbose up
	tables=$(for i in $(bizbuzim_tables); do echo $$i; done;)
	pg_dump --host=localhost -U postgres --port=5432 -d postgres -s \
		--table=expenses \
		--table=raw_expenses \
		> db/schema.sql

.PHONY: gen-code
gen-code: check-env
	rm db/query.sql || true
	rm pkg/dal/* || true
	for f in $(shell pwd)/db/queries/*.sql; do (cat "$$f"; echo "\n") >> db/query.sql; done;
	xo schema ${POSTGRESQL_URL} \
		-o pkg/dal \
		--go-pkg=dal \
		-i expenses \
		-i raw_expenses

.PHONY: hasura-setup
hasura-setup:
	hasura init --project hasura
	hasura metadata apply \
		--endpoint http://$(HASURA_HOST):$(HASURA_PORT) \
		--skip-update-check \
		--project hasura

.PHONY: dev-setup
dev-setup:
	docker compose up -d
	
check-env:
ifndef POSTGRESQL_URL
	$(error POSTGRESQL_URL is undefined)
endif

ifndef PGPASSWORD
	$(error PGPASSWORD is undefined)
endif