#!/bin/bash
# Fix Git Sites, clone repo from edge, copy settings, modules, libraris and theme do correct folders from edge default folder.
echo "Build starts"
Mdate="$(date +"%Y%m%d_%H%M%S")"
cd source
ssh -fN -L 48999:127.0.0.1:48999 bogadmin@10.241.241.84
#mv node_modules /tmp/node_modules_gudrun_$Mdate
meteor add doow:accounts-drupal
meteor yarn
meteor yarn add @babel/runtime react tcomb-form moment lodash prop-types classnames @material-ui/core react-select @material-ui/icons javascript-time-ago react-timer-mixin react-simple-di-extra react-komposer@1.13.1 react-dom material-ui-pickers dateformat mantra-core-extra react-mounter date-fns@2.0.0-alpha.21 @date-io/date-fns react-world-flags react-input-mask  es6-promisify   --allow-superuser 
export MONGO_URL='mongodb://127.0.0.1:48999/edge_gudrun_search'
meteor --port 3080 --settings settings_osx_stage.json
echo "Launched..."
