#!/bin/bash
# Build and generate assets
echo "Generating new assets"
Mdate="$(date +"%Y%m%d_%H%M%S")"
cd source
mv resources ../meteor-assets-master/history/$Mdate.resources
cd ../meteor-assets-master
node meteor-assets.js
cp -a resources ../source/resources
echo Assets generated
