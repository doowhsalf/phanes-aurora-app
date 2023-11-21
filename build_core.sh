#!/bin/bash
# Fix Git Sites, clone repo from edge, copy settings, modules, libraris and theme do correct folders from edge default folder.
echo "Generic Build step"
meteor npm install -g yarn
# buildnumgen
# meteor yarn version --patch
meteor remove doow:accounts-drupal
meteor remove kadira:flow-router
meteor yarn
# meteor yarn add @babel/runtime react tcomb-form moment lodash prop-types classnames @material-ui/core react-select @material-ui/icons javascript-time-ago react-timer-mixin react-simple-di-extra react-komposer@1.13.1 react-dom material-ui-pickers dateformat mantra-core-extra react-mounter date-fns@2.0.0-alpha.21 @date-io/date-fns react-world-flags react-input-mask  es6-promisify react-iframe react-country-flag  --allow-superuser 
# meteor yarn add echarts-for-react  react-clock  --allow-superuser 
# meteor yarn add date-fns  --allow-superuser 
# meteor yarn add react-spring --allow-superuser 
# meteor yarn add animate.css react-gravatar --allow-superuser
# meteor yarn add @mui/material @mui/styles @mui/lab @mui/icons-material @emotion/react @emotion/styled react-tiny-link node-fetch --allow-superuser
meteor yarn add @emotion/react @emotion/styled xlsx file-saver  react-trianglify trianglify --allow-superuser
npx browserslist@latest --update-db
echo "Generic Build done"