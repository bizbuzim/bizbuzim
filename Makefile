.PHONY: dev-tools
dev-tools:
	docker build -f Dockerfile.tools -t bizbuzim/tools .

.PHONY: run-dev-tools
run-dev-tools:
	docker run -it \
		-v $(shell pwd):/app \
		--network host \
		-e PGPASSWORD=${POSTGRES_PASSWORD} \
		-u $(shell id -u ${USER}):$(shell id -g ${USER}) \
		bizbuzim/tools $(cmd)

.PHONY: new-migration
new-migration:
	make run-dev-tools cmd="migrate create -ext sql -dir /app/db/migrations -seq $(name)"

.PHONY: run-migrations
run-migrations: check-env
	echo "Running migrations"
	make run-dev-tools cmd="migrate -path=/app/db/migrations -database ${POSTGRESQL_URL} up"
	make -s run-dev-tools cmd="pg_dump -s --host=localhost -U postgres --port 5432 -d postgres --table=expenses --table=raw_expenses" > db/schema.sql
	

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

.PHONY: dev-setup
dev-setup:
	docker compose down
	UID=$(shell id -u ${USER}) GID=$(shell id -g ${USER}) docker compose up -d

.PHONY: unit-test
unit-test:
	rm -rf .cover/ .test/
	mkdir .cover/ .test/
	go test -v -covermode=atomic -coverprofile=".cover/cover.out" github.com/olegsu/bizbuzim/.../.
	go tool cover -html=.cover/cover.out -o=.cover/coverage.html

	
check-env:
ifndef POSTGRESQL_URL
	$(error POSTGRESQL_URL is undefined)
endif

ifndef PGPASSWORD
	$(error PGPASSWORD is undefined)
endif