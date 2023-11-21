#!/bin/bash
# Build and generate assets
cd source
echo "Run local but on remote server"
meteor run  --settings settings.json --mobile-server  edge.gudrun.tritonite.io
