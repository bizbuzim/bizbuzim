FROM alpine:3.15

WORKDIR /app

COPY Makefile .

RUN apk add curl bash make

RUN curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash