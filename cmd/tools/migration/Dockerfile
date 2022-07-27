FROM migrate/migrate as migrate 

FROM golang:1.18-alpine3.15 as build

RUN apk update

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -o bizbuzim-migration cmd/tools/migration/main.go

FROM alpine:3.15

RUN apk update && apk add postgresql-client

COPY --from=migrate /usr/bin/migrate /usr/bin/migrate
COPY --from=build /app/bizbuzim-migration /usr/bin/bizbuzim-migration