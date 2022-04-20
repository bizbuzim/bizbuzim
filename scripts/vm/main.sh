#/bin/sh

mkdir ~/.kube
touch ~/.kube/config
docker build -f scripts/vm/Dockerfile -t builder .
docker run  -v /var/run/docker.sock:/var/run/docker.sock -v $HOME:/root builder
