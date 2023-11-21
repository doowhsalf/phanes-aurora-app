#!/bin/bash
# Push image to docker-hub
gittag="$(git log -1 --pretty=%H)"
echo $gittag
echo "Push stuff to docker-hub 🚢..."
sed 's/.*"version": "\(.*\)".*/\1/;t;d' ./source/package.json
cat ~/.docker/stuff.txt | docker login --username doowhsalf --password-stdin
docker tag neptune-sunhill-app/tritonite:$gittag tritonite/neptune-sunhill-app:latest
docker push tritonite/neptune-sunhill-app