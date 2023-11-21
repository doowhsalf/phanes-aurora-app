#!/bin/bash
# Fix Git Sites, clone repo from edge, copy settings, modules, libraris and theme do correct folders from edge default folder.
echo "Build starts"
wall "gudrun build starts"
Mdate="$(date +"%Y%m%d_%H%M%S")"
export METEOR_ALLOW_SUPERUSER
sh buildnumber_increase.sh
node generatebuildnumber.js
cd source
mkdir ../builds/current.package.build
mv node_modules /tmp/node_modules_gudrun_$Mdate
meteor yarn --allow-superuser
meteor add doow:accounts-drupal --allow-superuser
meteor yarn add @babel/runtime react tcomb-form moment lodash prop-types classnames @material-ui/core react-select @material-ui/icons javascript-time-ago react-timer-mixin react-simple-di-extra react-komposer@1.13.1 react-dom material-ui-pickers dateformat mantra-core-extra react-mounter date-fns@2.0.0-alpha.21 @date-io/date-fns react-world-flags react-input-mask  es6-promisify react-iframe   --allow-superuser 
meteor yarn add react es6-promisify tcomb-form moment dateformat react-iframe  react-text-mask lodash --allow-superuser 
#meteor --allow-superuser npm install --save @date-io/date-fns 
#meteor --allow-superuser npm install --save date-fns@2.0.0-alpha.21
meteor yarn add  @date-io/moment moment --allow-superuser 
#meteor npm install --allow-superuser
#meteor npm rebuild --allow-superuser 
meteor build --allow-superuser --server-only --architecture os.linux.x86_64 --directory ../builds/current.package.build
cd ../builds/current.package.build
tar -zcvf ../$Mdate.package.tar.gz bundle
cd ..
yes | cp $Mdate.package.tar.gz  current.package.tar.gz
echo "Build done"
wall "build done!"
