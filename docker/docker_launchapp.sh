#!/bin/bash
echo "Starting up Oberon system NOW"

set -e

echo "Setting environment"
contentUrl="$(${CONTENT_URL})"
Mdate="$(date +"%Y-%m-%d_%H:%M:%S")"

export METEOR_SETTINGS='{
  "relayTimer": 60000,
  "public": {
    "minPasswordLength": 8,
    "listDateTimeFormat": "YYYY-MM-DD HH.mm",
    "detailsDateFormat": "YYYYMMDD",
    "detailsDateTimeFormat": "YYYYMMDD HH.mm.ss",
    "defaultLocale": "en",
    "ldapUserDn": "",
    "ldapUserSearchBy": "sAMAccountName",
    "ldapBindToDomain": false,
    "displayEmptyHelpIcons": true,
    "pageTermsLink": "/content/info_article_x_16848",
    "ordersPerPage": 5,
    "accountLostPassword": "/password",
    "accountRegister": "/register"
  }
}
'

echo $METEOR_SETTINGS

export MONGO_DB=${MONGO_DB}
export MONGO_SERVER=${MONGO_SERVER}
export PORT=${APP_PORT}
Mdate="$(date +"%Y-%m-%d_%H:%M:%S")"
mserver="$(more MONGO_SERVER)"
mdb="$(more MONGO_DB)"
export MONGO_URL=${MONGO_URL}	
export ROOT_URL='http://127.0.0.1/'
export MAIL_URL='smtp://127.0.0.1:25/'
echo "===> Starting app new version:"
echo "===> root_url: ${ROOT_URL}:${PORT}/"
echo "===> port: ${APP_PORT}"
echo "===> mail_url: ${MAIL_URL}"
echo "===> mongo_url: ${MONGO_URL}"
echo "Launching service 🚀"
node main.js