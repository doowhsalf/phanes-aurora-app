echo "Set current date"
Mdate="$(date +"%Y%m%d")"
json -I -f package.json -e 'this.version_build_date="'$Mdate'"'



