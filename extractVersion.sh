# a bash script that extract the version number from the package.json file
# and print it to the console
echo "Extracting version number from package.json"
version=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')
echo "Version number is $version"
echo "##vso[task.setvariable variable=version]$version"

