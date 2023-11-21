echo "First get the stuff from google"
node gsheetDownload.js
echo "Run transformation script"
node transformer.js
cd ../source/i18n/core
echo "Run translation copy"
cp -a ../../../google-get-files-script/output/ .