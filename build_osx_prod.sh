#!/bin/bash
# Fix Git Sites, clone repo from edge, copy settings, modules, libraris and theme do correct folders from edge default folder.
echo "Build starts"
Mdate="$(date +"%Y%m%d_%H%M%S")"
cd source
meteor npm install -g yarn
sh ../build_core.sh
ssh -fN -L 48485:localhost:48484 -p 2251 johang@217.70.37.128
export MAIL_URL='smtp://127.0.0.1:25/'
export MONGO_URL='mongodb://belinda:belinda888!!@127.0.0.1:48485/belinda_prod'
meteor --port 30888 --settings settings.production.json
echo "Launched..."