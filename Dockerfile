FROM golang:1.17-alpine as build

RUN apk add gcc g++ make

WORKDIR /app

COPY . .

RUN make unit-test

RUN go build -o server cmd/server/main.go

FROM alpine:3.15 as dist

COPY --from=build /app/server /usr/local/bin/server

CMD [ "server" ]