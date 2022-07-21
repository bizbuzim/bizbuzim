FROM migrate/migrate as migrate 

FROM alpine:3.15

RUN apk update && apk add postgresql-client

COPY --from=migrate /usr/bin/migrate /usr/bin/migrate