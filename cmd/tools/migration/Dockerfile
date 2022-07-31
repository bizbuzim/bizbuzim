FROM migrate/migrate as migrate 

FROM golang:1.18-alpine3.15 as build

RUN apk update

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -o bizbuzim-migration cmd/tools/migration/main.go

FROM alpine:3.15

WORKDIR /app

RUN apk update && apk add postgresql-client

COPY --from=migrate /usr/bin/migrate /usr/bin/migrate
COPY --from=build /app/bizbuzim-migration /usr/bin/bizbuzim-migration
COPY --from=build /app/cmd/tools/migration/tables.yaml /app/tables.yaml
COPY --from=build /app/db/migrations /app/db/migrations

ENV MIGRATION_TABLES=/app/tables.yaml
ENV MIGRATIONS=/app/db/migrations
ENV SCHEMA_SQL_PATH=/app/db/schema.sql
CMD ["bizbuzim-migration"]