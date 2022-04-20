#/bin/sh

apk add curl docker

curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.12.0/kind-linux-amd64
chmod +x ./kind

./kind create cluster --config kubernetes/kind.yaml --name bizbuzim