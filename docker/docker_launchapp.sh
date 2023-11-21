echo "Starting up Oberon system NOW"

set -e

echo "Setting environment"
contentUrl="$(${CONTENT_URL})"
Mdate="$(date +"%Y-%m-%d_%H:%M:%S")"

export METEOR_SETTINGS='{
  "drupalTokenUrl": "http://'"${BASE_CONTENT_URL}"'/services/session/token",
  "drupalLoginUrl": "http://'"${BASE_CONTENT_URL}"'/gudrun_user/user/login",
  "drupalTestConnection": "http://'"${BASE_CONTENT_URL}"'/tri_gudrun_test_connection/json",
  "drupalGetTax": "http://'"${BASE_CONTENT_URL}"'/tri_gudrun_get_taxonomy",
  "drupalQueryTax": "http://'"${BASE_CONTENT_URL}"'/tri_gudrun_query_taxonomy",
  "drupalEntityQuery": "http://'"${BASE_CONTENT_URL}"'/tri_gudrun_entity_search",
  "drupalUserUrl": "http://'"${BASE_CONTENT_URL}"'/tri_gudrun_user_query",
  "drupalCompanyUsersUrl": "http://'"${BASE_CONTENT_URL}"'/tri_gudrun_company_query",
  "drupalManageUserUrl": "http://'"${BASE_CONTENT_URL}"'/tri_gudrun_company_user",
  "drupalContactUrl": "http://'"${BASE_CONTENT_URL}"'/tri_gudrun_contact",
  "drupalGetArticleUrl": "http://'"${BASE_CONTENT_URL}"'/tri_gudrun_article_query",
  "drupalFileareaQuery": "http://'"${BASE_CONTENT_URL}"'/tri_gudrun_filearea_query",
  "drupalFileareaGetFile": "http://'"${BASE_CONTENT_URL}"'/tri_gudrun_filearea_getitem",
  "drupalGetUser": "http://'"${BASE_CONTENT_URL}"'/tri_user_user_query",
  "drupalInsertUser": "http://'"${BASE_CONTENT_URL}"'/tri_user_user_insert",
  "apiKey": "3MfPYcPrGGBYdRhxks9UCfodTg6aMJzG9c3b_6rxM6A",
  "relayTimer": 60000,
  "public": {
    "minPasswordLength": 8,
    "listDateTimeFormat": "YYYY-MM-DD HH.mm",
    "detailsDateFormat": "YYYYMMDD",
    "detailsDateTimeFormat": "YYYYMMDD HH.mm.ss",
    "defaultLocale": "sv",
    "ldapUserDn": "",
    "ldapUserSearchBy": "sAMAccountName",
    "ldapBindToDomain": false,
    "graphQLServerUrl": "http://localhost:48700/graphql",
    "displayEmptyHelpIcons": true,
    "pageTermsLink": "/content/info_article_x_16848",
    "ordersPerPage": 5,
    "accountLostPassword": "'"${BASE_CONTENT_URL_EXTERNAL}"'/user/password",
    "accountRegister": "'"${BASE_CONTENT_URL_EXTERNAL}"'/user/register"
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