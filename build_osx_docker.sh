#!/bin/bash
# Fix Git Sites, clone repo from edge, copy settings, modules, libraris and theme do correct folders from edge default folder.
echo "Build starts"
Mdate="$(date +"%Y%m%d_%H%M%S")"
cd source
sh ../build_core.sh
npx browserslist@latest --update-db
export MONGO_URL='mongodb://localhost:51017/aurora_pod_001'
meteor  --port 3051 --settings settings_osx_docker.json
echo "Launched..."
