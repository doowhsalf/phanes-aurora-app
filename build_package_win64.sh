#!/bin/bash
# Fix Git Sites, clone repo from edge, copy settings, modules, libraris and theme do correct folders from edge default folder.
Mdate="$(date +"%Y%m%d_%H%M%S")"
rootFolder="$(pwd)"
buildStructure="builds/win64/current.package.build"
buildFolder="$rootFolder/$buildStructure"
history="history"
cd $rootFolder
cd ../sunhill-app-deploy
deploymentFolder="$(pwd)"
cd $rootFolder
echo $rootFolder
echo $buildFolder
echo $deploymentFolder
echo $buildStructure 
echo "Kill the old structure"
mkdir -p $deploymentFolder/$history
mv $deploymentFolder/builds/ $deploymentFolder/$history/builds_$Mdate
echo 
echo "First commit all"
git add .
git commit -m "Commit for creating Deployment package"
echo "Build starts"
Mdate="$(date +"%Y%m%d_%H%M%S")"
sh buildnumber_increase.sh
node generatebuildnumber.js
cd source
mkdir $buildFolder
meteor npm install -g yarn
meteor yarn
sh ../build_core.sh
# We don't update version in this script. It's using the same version as the docker system
#meteor yarn version --patch
versionNumber="$(sh ../extractVersion.sh)"
meteor build --allow-superuser --server-only --architecture os.windows.x86_64 --directory $buildFolder
# remove any garbage files...
cd $rootFolder
cd $buildFolder
rm -rf .bundle-garbage*
# copy to docker-folder
echo "Build done"
cd $rootFolder
git add .
git commit -m "Commit for Image build"
cd source
cd $rootFolder
gittag="$(git log -1 --pretty=%h)"
echo $gittag
cd $rootFolder
echo "Gittab"
echo $gittag
echo "Version"
echo $versionNumber
git push --tags origin master
echo "Fix the deployment folder"
mkdir -p $deploymentFolder/$buildStructure
yes|cp -afc $buildFolder/bundle $deploymentFolder/$buildStructure
cd $deploymentFolder
git tag -a v$versionNumber -m "Autotagged new version to v$versionNumber"
git add .
git commit -m "Commit for new Build to DeployRepo"
git push --tags origin main
echo "Done..."