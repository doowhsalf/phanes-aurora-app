#!/bin/bash
# Build docker and win64 version origin main
rootFolder="$(pwd)"
echo "First build docker"
cd $rootFolder
sh build_docker.sh
echo "Now build win64"
cd $rootFolder
sh build_package_win64.sh
echo "Done..."