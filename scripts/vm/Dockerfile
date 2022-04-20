FROM alpine:3.15

RUN apk update && apk add curl docker

RUN curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.12.0/kind-linux-amd64 && \
    chmod +x ./kind && \
    mv kind /usr/local/bin

COPY scripts/vm scripts/vm
COPY kubernetes kubernetes
ENTRYPOINT ["/bin/sh"]
CMD ["./scripts/vm/cluster.sh"]