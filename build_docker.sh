#!/bin/bash
# Fix Git Sites, clone repo from edge, copy settings, modules, libraris and theme do correct folders from edge default folder.
rootFolder="$(pwd)"
cd $rootFolder
echo "First commit all since we are building a image"
git add .
git commit -m "Commit for Docker Image build"
echo "Build starts"
Mdate="$(date +"%Y%m%d_%H%M%S")"
sh buildnumber_increase.sh
node generatebuildnumber.js
cd source
mkdir ../docker/builds/current.package.build
meteor npm install -g yarn
meteor yarn
sh ../build_core.sh
meteor yarn version --patch
sh ../deploy_update_date.sh
versionNumber="$(sh ../extractVersion.sh)"
meteor build --release 2.3.4 --allow-superuser --server-only --architecture os.linux.x86_64 --directory ../docker/builds/current.package.build
# remove any garbage files...
cd $rootFolder
cd docker/builds/current.package.build
rm -rf .bundle-garbage*
# copy to docker-folder
echo "Build done"
cd $rootFolder
git add .
git commit -m "Commit for Docker Image build"
cd source
cd $rootFolder
gittag="$(git log -1 --pretty=%h)"
echo $gittag
cd docker
docker build --rm -f "dockerfile" -t tritonite/neptune-pod-app:latest -t tritonite/neptune-pod-app:$versionNumber .
cd $rootFolder
echo "Gittab"
echo $gittag
echo "Version"
echo $versionNumber
# No need to tag since it's tagged in the push of the versionnum update by Yarn
# git tag -a v$versionNumber -m "Autotagged new version to v$versionNumber"
git push origin master
cat ~/.docker/stuff.txt | docker login --username doowhsalf --password-stdin
docker push tritonite/neptune-pod-app:$versionNumber
docker push tritonite/neptune-pod-app:latest