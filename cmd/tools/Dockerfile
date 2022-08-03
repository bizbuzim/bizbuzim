FROM migrate/migrate as migrate 

FROM golang:1.18-alpine3.15 as build

RUN apk update && apk add gcc g++ make

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -o bizbuzim-migration cmd/tools/main.go

RUN go install github.com/xo/xo@latest

FROM alpine:3.15

WORKDIR /app

RUN apk update && apk add postgresql-client docker openrc
RUN rc-update add docker boot

COPY --from=migrate /usr/bin/migrate /usr/bin/migrate
COPY --from=build /app/bizbuzim-migration /usr/bin/bizbuzim-migration
COPY --from=build /app/cmd/tools/tables.yaml /app/tables.yaml
COPY --from=build /app/db/migrations /app/db/migrations
COPY --from=build /go/bin/xo /usr/local/bin/xo

ENV MIGRATION_TABLES=/app/tables.yaml
ENV MIGRATIONS=/app/db/migrations
ENV SCHEMA_SQL_PATH=/app/db/schema.sql
ENTRYPOINT ["bizbuzim-migration"]