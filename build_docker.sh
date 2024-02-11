#!/bin/bash
# Fix Git Sites, clone repo from edge, copy settings, modules, libraris and theme do correct folders from edge default folder.
echo "======================================== Starting upp stuff ========================================"
rootFolder="$(pwd)"
cd $rootFolder
echo "======================== First commit all since we are building a image ========================"
git add .
git commit -m "Commit for Docker Image build"
echo "Build starts"
Mdate="$(date +"%Y%m%d_%H%M%S")"
sh buildnumber_increase.sh
node generatebuildnumber.js
cd source
cp -f debug_prod.json debug.json
mkdir ../docker/builds/current.package.build
meteor npm install -g yarn
meteor yarn
npx browserslist@latest --update-db
sh ../build_core.sh
sh ../deploy_update_date.sh
meteor yarn version --patch
versionNumber="$(sh ../extractVersion.sh)"
echo "======================================== BUILDING METEOR APP ========================================"
meteor build  --allow-superuser --server-only --architecture os.linux.x86_64 --directory ../docker/builds/current.package.build
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
dockerFolder="$(pwd)"
cd $dockerFolder
echo "======================================== BUILDING DOCKER IMAGE ========================================"
echo "Building docker image"
newDockerTag="tritonite/phanes-aurora-app:"$versionNumber
echo "New docker tag: "$newDockerTag
#docker buildx build --platform 'linux/amd64' --rm -f 'dockerfile' -t 'tritonite/phanes-aurora-app:latest'  -t $newDockerTag $dockerFolder
# docker build --rm -f "dockerfile" -t tritonite/phanes-aurora-app:latest .
docker build --platform linux/amd64 --rm -f "dockerfile" -t tritonite/phanes-aurora-app:latest -t $newDockerTag .
cd $rootFolder
echo "Gittab"
echo $gittag
echo "Version"
echo $versionNumber
# No need to tag since it's tagged in the push of the versionnum update by Yarn
# git tag -a v$versionNumber -m "Autotagged new version to v$versionNumber"
echo "======================================== PUSHING TO GIT ========================================"
git push main
echo "======================================== PUSHING TO DOCKER ========================================"
cat ~/.docker/stuff.txt | docker login --username doowhsalf --password-stdin
docker push tritonite/phanes-aurora-app:$versionNumber
docker push tritonite/phanes-aurora-app:latest
echo "======================================== DONE ========================================"