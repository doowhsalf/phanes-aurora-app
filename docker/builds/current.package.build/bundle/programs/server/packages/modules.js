(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var meteorInstall = Package['modules-runtime'].meteorInstall;
var verifyErrors = Package['modules-runtime'].verifyErrors;

var require = meteorInstall({"node_modules":{"meteor":{"modules":{"server.js":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/modules/server.js                                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
require("./install-packages.js");
require("./process.js");
require("./reify.js");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"install-packages.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/modules/install-packages.js                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
function install(name, mainModule) {
  var meteorDir = {};

  // Given a package name <name>, install a stub module in the
  // /node_modules/meteor directory called <name>.js, so that
  // require.resolve("meteor/<name>") will always return
  // /node_modules/meteor/<name>.js instead of something like
  // /node_modules/meteor/<name>/index.js, in the rare but possible event
  // that the package contains a file called index.js (#6590).

  if (typeof mainModule === "string") {
    // Set up an alias from /node_modules/meteor/<package>.js to the main
    // module, e.g. meteor/<package>/index.js.
    meteorDir[name + ".js"] = mainModule;
  } else {
    // back compat with old Meteor packages
    meteorDir[name + ".js"] = function (r, e, module) {
      module.exports = Package[name];
    };
  }

  meteorInstall({
    node_modules: {
      meteor: meteorDir
    }
  });
}

// This file will be modified during computeJsOutputFilesMap to include
// install(<name>) calls for every Meteor package.

install("meteor");
install("meteor-base");
install("mobile-experience");
install("npm-mongo");
install("ecmascript-runtime");
install("modules-runtime");
install("modules", "meteor/modules/server.js");
install("modern-browsers", "meteor/modern-browsers/modern.js");
install("es5-shim");
install("promise", "meteor/promise/server.js");
install("ecmascript-runtime-client", "meteor/ecmascript-runtime-client/versions.js");
install("ecmascript-runtime-server", "meteor/ecmascript-runtime-server/runtime.js");
install("babel-compiler");
install("react-fast-refresh");
install("ecmascript");
install("babel-runtime", "meteor/babel-runtime/babel-runtime.js");
install("fetch", "meteor/fetch/server.js");
install("inter-process-messaging", "meteor/inter-process-messaging/inter-process-messaging.js");
install("dynamic-import", "meteor/dynamic-import/server.js");
install("base64", "meteor/base64/base64.js");
install("ejson", "meteor/ejson/ejson.js");
install("diff-sequence", "meteor/diff-sequence/diff.js");
install("geojson-utils", "meteor/geojson-utils/main.js");
install("id-map", "meteor/id-map/id-map.js");
install("random", "meteor/random/main_server.js");
install("mongo-id", "meteor/mongo-id/id.js");
install("ordered-dict", "meteor/ordered-dict/ordered_dict.js");
install("tracker");
install("mongo-decimal", "meteor/mongo-decimal/decimal.js");
install("minimongo", "meteor/minimongo/minimongo_server.js");
install("check", "meteor/check/match.js");
install("retry", "meteor/retry/retry.js");
install("callback-hook", "meteor/callback-hook/hook.js");
install("ddp-common");
install("reload");
install("socket-stream-client", "meteor/socket-stream-client/node.js");
install("ddp-client", "meteor/ddp-client/server/server.js");
install("underscore");
install("rate-limit", "meteor/rate-limit/rate-limit.js");
install("ddp-rate-limiter", "meteor/ddp-rate-limiter/ddp-rate-limiter.js");
install("typescript");
install("logging", "meteor/logging/logging.js");
install("routepolicy", "meteor/routepolicy/main.js");
install("boilerplate-generator", "meteor/boilerplate-generator/generator.js");
install("webapp-hashing");
install("webapp", "meteor/webapp/webapp_server.js");
install("audit-argument-checks");
install("ddp-server");
install("ddp");
install("allow-deny");
install("binary-heap", "meteor/binary-heap/binary-heap.js");
install("mongo");
install("session");
install("jquery");
install("reactive-dict", "meteor/reactive-dict/migration.js");
install("fortawesome:fontawesome");
install("url", "meteor/url/server.js");
install("accounts-base", "meteor/accounts-base/server_main.js");
install("sha");
install("email", "meteor/email/email.js");
install("accounts-password");
install("percolate:find-from-publication", "meteor/percolate:find-from-publication/server.js");
install("jagi:astronomy");
install("jagi:reactive-map");
install("jagi:astronomy-validators");
install("udondan:jszip");
install("meteorhacks:picker");
install("minifier-css", "meteor/minifier-css/minifier.js");
install("standard-minifier-css");
install("standard-minifier-js");
install("coffeescript");
install("peerlibrary:assert");
install("peerlibrary:fiber-utils", "meteor/peerlibrary:fiber-utils/src/meteor-server.coffee");
install("peerlibrary:server-autorun", "meteor/peerlibrary:server-autorun/server.coffee");
install("peerlibrary:reactive-mongo");
install("peerlibrary:extend-publish", "meteor/peerlibrary:extend-publish/server.coffee");
install("peerlibrary:reactive-publish");
install("universe:i18n", "meteor/universe:i18n/source/server.ts");
install("static-html");
install("zodern:types");
install("reywood:publish-composite", "meteor/reywood:publish-composite/lib/publish_composite.js");
install("reactive-var");
install("service-configuration");
install("http", "meteor/http/httpcall_server.js");
install("ostrio:flow-router-extra", "meteor/ostrio:flow-router-extra/server/_init.js");
install("hot-code-push");
install("launch-screen");
install("autoupdate", "meteor/autoupdate/autoupdate_server.js");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"process.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/modules/process.js                                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
if (! global.process) {
  try {
    // The application can run `npm install process` to provide its own
    // process stub; otherwise this module will provide a partial stub.
    global.process = require("process");
  } catch (missing) {
    global.process = {};
  }
}

var proc = global.process;

if (Meteor.isServer) {
  // Make require("process") work on the server in all versions of Node.
  meteorInstall({
    node_modules: {
      "process.js": function (r, e, module) {
        module.exports = proc;
      }
    }
  });
} else {
  proc.platform = "browser";
  proc.nextTick = proc.nextTick || Meteor._setImmediate;
}

if (typeof proc.env !== "object") {
  proc.env = {};
}

var hasOwn = Object.prototype.hasOwnProperty;
for (var key in meteorEnv) {
  if (hasOwn.call(meteorEnv, key)) {
    proc.env[key] = meteorEnv[key];
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"reify.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/modules/reify.js                                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
require("@meteorjs/reify/lib/runtime").enable(
  module.constructor.prototype
);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"node_modules":{"@meteorjs":{"reify":{"lib":{"runtime":{"index.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/meteor/modules/node_modules/@meteorjs/reify/lib/runtime/index.js                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.useNode();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
meteorInstall({"node_modules":{"react":{"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/react/package.json                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = {
  "name": "react",
  "description": "React is a JavaScript library for building user interfaces.",
  "keywords": [
    "react"
  ],
  "version": "18.2.0",
  "homepage": "https://reactjs.org/",
  "bugs": "https://github.com/facebook/react/issues",
  "license": "MIT",
  "files": [
    "LICENSE",
    "README.md",
    "index.js",
    "cjs/",
    "umd/",
    "jsx-runtime.js",
    "jsx-dev-runtime.js",
    "react.shared-subset.js"
  ],
  "main": "index.js",
  "exports": {
    ".": {
      "react-server": "./react.shared-subset.js",
      "default": "./index.js"
    },
    "./package.json": "./package.json",
    "./jsx-runtime": "./jsx-runtime.js",
    "./jsx-dev-runtime": "./jsx-dev-runtime.js"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/facebook/react.git",
    "directory": "packages/react"
  },
  "engines": {
    "node": ">=0.10.0"
  },
  "dependencies": {
    "loose-envify": "^1.1.0"
  },
  "browserify": {
    "transform": [
      "loose-envify"
    ]
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/react/index.js                                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.useNode();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"tcomb-form":{"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/tcomb-form/package.json                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = {
  "name": "tcomb-form",
  "version": "0.9.21",
  "main": "lib/main.js"
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"lib":{"main.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/tcomb-form/lib/main.js                                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.useNode();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"moment":{"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/moment/package.json                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = {
  "name": "moment",
  "version": "2.30.1",
  "main": "./moment.js"
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"moment.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/moment/moment.js                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.useNode();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"@babel":{"runtime":{"helpers":{"objectSpread2.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/@babel/runtime/helpers/objectSpread2.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.useNode();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"objectWithoutProperties.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/@babel/runtime/helpers/objectWithoutProperties.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.useNode();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/@babel/runtime/package.json                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = {
  "name": "@babel/runtime",
  "version": "7.23.8",
  "description": "babel's modular runtime helpers",
  "license": "MIT",
  "publishConfig": {
    "access": "public"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/babel/babel.git",
    "directory": "packages/babel-runtime"
  },
  "homepage": "https://babel.dev/docs/en/next/babel-runtime",
  "author": "The Babel Team (https://babel.dev/team)",
  "dependencies": {
    "regenerator-runtime": "^0.14.0"
  },
  "exports": {
    "./helpers/AsyncGenerator": [
      {
        "node": "./helpers/AsyncGenerator.js",
        "import": "./helpers/esm/AsyncGenerator.js",
        "default": "./helpers/AsyncGenerator.js"
      },
      "./helpers/AsyncGenerator.js"
    ],
    "./helpers/esm/AsyncGenerator": "./helpers/esm/AsyncGenerator.js",
    "./helpers/OverloadYield": [
      {
        "node": "./helpers/OverloadYield.js",
        "import": "./helpers/esm/OverloadYield.js",
        "default": "./helpers/OverloadYield.js"
      },
      "./helpers/OverloadYield.js"
    ],
    "./helpers/esm/OverloadYield": "./helpers/esm/OverloadYield.js",
    "./helpers/applyDecs": [
      {
        "node": "./helpers/applyDecs.js",
        "import": "./helpers/esm/applyDecs.js",
        "default": "./helpers/applyDecs.js"
      },
      "./helpers/applyDecs.js"
    ],
    "./helpers/esm/applyDecs": "./helpers/esm/applyDecs.js",
    "./helpers/applyDecs2203": [
      {
        "node": "./helpers/applyDecs2203.js",
        "import": "./helpers/esm/applyDecs2203.js",
        "default": "./helpers/applyDecs2203.js"
      },
      "./helpers/applyDecs2203.js"
    ],
    "./helpers/esm/applyDecs2203": "./helpers/esm/applyDecs2203.js",
    "./helpers/applyDecs2203R": [
      {
        "node": "./helpers/applyDecs2203R.js",
        "import": "./helpers/esm/applyDecs2203R.js",
        "default": "./helpers/applyDecs2203R.js"
      },
      "./helpers/applyDecs2203R.js"
    ],
    "./helpers/esm/applyDecs2203R": "./helpers/esm/applyDecs2203R.js",
    "./helpers/applyDecs2301": [
      {
        "node": "./helpers/applyDecs2301.js",
        "import": "./helpers/esm/applyDecs2301.js",
        "default": "./helpers/applyDecs2301.js"
      },
      "./helpers/applyDecs2301.js"
    ],
    "./helpers/esm/applyDecs2301": "./helpers/esm/applyDecs2301.js",
    "./helpers/applyDecs2305": [
      {
        "node": "./helpers/applyDecs2305.js",
        "import": "./helpers/esm/applyDecs2305.js",
        "default": "./helpers/applyDecs2305.js"
      },
      "./helpers/applyDecs2305.js"
    ],
    "./helpers/esm/applyDecs2305": "./helpers/esm/applyDecs2305.js",
    "./helpers/asyncGeneratorDelegate": [
      {
        "node": "./helpers/asyncGeneratorDelegate.js",
        "import": "./helpers/esm/asyncGeneratorDelegate.js",
        "default": "./helpers/asyncGeneratorDelegate.js"
      },
      "./helpers/asyncGeneratorDelegate.js"
    ],
    "./helpers/esm/asyncGeneratorDelegate": "./helpers/esm/asyncGeneratorDelegate.js",
    "./helpers/asyncIterator": [
      {
        "node": "./helpers/asyncIterator.js",
        "import": "./helpers/esm/asyncIterator.js",
        "default": "./helpers/asyncIterator.js"
      },
      "./helpers/asyncIterator.js"
    ],
    "./helpers/esm/asyncIterator": "./helpers/esm/asyncIterator.js",
    "./helpers/awaitAsyncGenerator": [
      {
        "node": "./helpers/awaitAsyncGenerator.js",
        "import": "./helpers/esm/awaitAsyncGenerator.js",
        "default": "./helpers/awaitAsyncGenerator.js"
      },
      "./helpers/awaitAsyncGenerator.js"
    ],
    "./helpers/esm/awaitAsyncGenerator": "./helpers/esm/awaitAsyncGenerator.js",
    "./helpers/callSuper": [
      {
        "node": "./helpers/callSuper.js",
        "import": "./helpers/esm/callSuper.js",
        "default": "./helpers/callSuper.js"
      },
      "./helpers/callSuper.js"
    ],
    "./helpers/esm/callSuper": "./helpers/esm/callSuper.js",
    "./helpers/checkInRHS": [
      {
        "node": "./helpers/checkInRHS.js",
        "import": "./helpers/esm/checkInRHS.js",
        "default": "./helpers/checkInRHS.js"
      },
      "./helpers/checkInRHS.js"
    ],
    "./helpers/esm/checkInRHS": "./helpers/esm/checkInRHS.js",
    "./helpers/construct": [
      {
        "node": "./helpers/construct.js",
        "import": "./helpers/esm/construct.js",
        "default": "./helpers/construct.js"
      },
      "./helpers/construct.js"
    ],
    "./helpers/esm/construct": "./helpers/esm/construct.js",
    "./helpers/defineAccessor": [
      {
        "node": "./helpers/defineAccessor.js",
        "import": "./helpers/esm/defineAccessor.js",
        "default": "./helpers/defineAccessor.js"
      },
      "./helpers/defineAccessor.js"
    ],
    "./helpers/esm/defineAccessor": "./helpers/esm/defineAccessor.js",
    "./helpers/dispose": [
      {
        "node": "./helpers/dispose.js",
        "import": "./helpers/esm/dispose.js",
        "default": "./helpers/dispose.js"
      },
      "./helpers/dispose.js"
    ],
    "./helpers/esm/dispose": "./helpers/esm/dispose.js",
    "./helpers/importDeferProxy": [
      {
        "node": "./helpers/importDeferProxy.js",
        "import": "./helpers/esm/importDeferProxy.js",
        "default": "./helpers/importDeferProxy.js"
      },
      "./helpers/importDeferProxy.js"
    ],
    "./helpers/esm/importDeferProxy": "./helpers/esm/importDeferProxy.js",
    "./helpers/interopRequireWildcard": [
      {
        "node": "./helpers/interopRequireWildcard.js",
        "import": "./helpers/esm/interopRequireWildcard.js",
        "default": "./helpers/interopRequireWildcard.js"
      },
      "./helpers/interopRequireWildcard.js"
    ],
    "./helpers/esm/interopRequireWildcard": "./helpers/esm/interopRequireWildcard.js",
    "./helpers/isNativeReflectConstruct": [
      {
        "node": "./helpers/isNativeReflectConstruct.js",
        "import": "./helpers/esm/isNativeReflectConstruct.js",
        "default": "./helpers/isNativeReflectConstruct.js"
      },
      "./helpers/isNativeReflectConstruct.js"
    ],
    "./helpers/esm/isNativeReflectConstruct": "./helpers/esm/isNativeReflectConstruct.js",
    "./helpers/iterableToArrayLimit": [
      {
        "node": "./helpers/iterableToArrayLimit.js",
        "import": "./helpers/esm/iterableToArrayLimit.js",
        "default": "./helpers/iterableToArrayLimit.js"
      },
      "./helpers/iterableToArrayLimit.js"
    ],
    "./helpers/esm/iterableToArrayLimit": "./helpers/esm/iterableToArrayLimit.js",
    "./helpers/iterableToArrayLimitLoose": [
      {
        "node": "./helpers/iterableToArrayLimitLoose.js",
        "import": "./helpers/esm/iterableToArrayLimitLoose.js",
        "default": "./helpers/iterableToArrayLimitLoose.js"
      },
      "./helpers/iterableToArrayLimitLoose.js"
    ],
    "./helpers/esm/iterableToArrayLimitLoose": "./helpers/esm/iterableToArrayLimitLoose.js",
    "./helpers/jsx": [
      {
        "node": "./helpers/jsx.js",
        "import": "./helpers/esm/jsx.js",
        "default": "./helpers/jsx.js"
      },
      "./helpers/jsx.js"
    ],
    "./helpers/esm/jsx": "./helpers/esm/jsx.js",
    "./helpers/objectSpread2": [
      {
        "node": "./helpers/objectSpread2.js",
        "import": "./helpers/esm/objectSpread2.js",
        "default": "./helpers/objectSpread2.js"
      },
      "./helpers/objectSpread2.js"
    ],
    "./helpers/esm/objectSpread2": "./helpers/esm/objectSpread2.js",
    "./helpers/regeneratorRuntime": [
      {
        "node": "./helpers/regeneratorRuntime.js",
        "import": "./helpers/esm/regeneratorRuntime.js",
        "default": "./helpers/regeneratorRuntime.js"
      },
      "./helpers/regeneratorRuntime.js"
    ],
    "./helpers/esm/regeneratorRuntime": "./helpers/esm/regeneratorRuntime.js",
    "./helpers/setFunctionName": [
      {
        "node": "./helpers/setFunctionName.js",
        "import": "./helpers/esm/setFunctionName.js",
        "default": "./helpers/setFunctionName.js"
      },
      "./helpers/setFunctionName.js"
    ],
    "./helpers/esm/setFunctionName": "./helpers/esm/setFunctionName.js",
    "./helpers/toPrimitive": [
      {
        "node": "./helpers/toPrimitive.js",
        "import": "./helpers/esm/toPrimitive.js",
        "default": "./helpers/toPrimitive.js"
      },
      "./helpers/toPrimitive.js"
    ],
    "./helpers/esm/toPrimitive": "./helpers/esm/toPrimitive.js",
    "./helpers/toPropertyKey": [
      {
        "node": "./helpers/toPropertyKey.js",
        "import": "./helpers/esm/toPropertyKey.js",
        "default": "./helpers/toPropertyKey.js"
      },
      "./helpers/toPropertyKey.js"
    ],
    "./helpers/esm/toPropertyKey": "./helpers/esm/toPropertyKey.js",
    "./helpers/typeof": [
      {
        "node": "./helpers/typeof.js",
        "import": "./helpers/esm/typeof.js",
        "default": "./helpers/typeof.js"
      },
      "./helpers/typeof.js"
    ],
    "./helpers/esm/typeof": "./helpers/esm/typeof.js",
    "./helpers/using": [
      {
        "node": "./helpers/using.js",
        "import": "./helpers/esm/using.js",
        "default": "./helpers/using.js"
      },
      "./helpers/using.js"
    ],
    "./helpers/esm/using": "./helpers/esm/using.js",
    "./helpers/wrapRegExp": [
      {
        "node": "./helpers/wrapRegExp.js",
        "import": "./helpers/esm/wrapRegExp.js",
        "default": "./helpers/wrapRegExp.js"
      },
      "./helpers/wrapRegExp.js"
    ],
    "./helpers/esm/wrapRegExp": "./helpers/esm/wrapRegExp.js",
    "./helpers/AwaitValue": [
      {
        "node": "./helpers/AwaitValue.js",
        "import": "./helpers/esm/AwaitValue.js",
        "default": "./helpers/AwaitValue.js"
      },
      "./helpers/AwaitValue.js"
    ],
    "./helpers/esm/AwaitValue": "./helpers/esm/AwaitValue.js",
    "./helpers/wrapAsyncGenerator": [
      {
        "node": "./helpers/wrapAsyncGenerator.js",
        "import": "./helpers/esm/wrapAsyncGenerator.js",
        "default": "./helpers/wrapAsyncGenerator.js"
      },
      "./helpers/wrapAsyncGenerator.js"
    ],
    "./helpers/esm/wrapAsyncGenerator": "./helpers/esm/wrapAsyncGenerator.js",
    "./helpers/asyncToGenerator": [
      {
        "node": "./helpers/asyncToGenerator.js",
        "import": "./helpers/esm/asyncToGenerator.js",
        "default": "./helpers/asyncToGenerator.js"
      },
      "./helpers/asyncToGenerator.js"
    ],
    "./helpers/esm/asyncToGenerator": "./helpers/esm/asyncToGenerator.js",
    "./helpers/classCallCheck": [
      {
        "node": "./helpers/classCallCheck.js",
        "import": "./helpers/esm/classCallCheck.js",
        "default": "./helpers/classCallCheck.js"
      },
      "./helpers/classCallCheck.js"
    ],
    "./helpers/esm/classCallCheck": "./helpers/esm/classCallCheck.js",
    "./helpers/createClass": [
      {
        "node": "./helpers/createClass.js",
        "import": "./helpers/esm/createClass.js",
        "default": "./helpers/createClass.js"
      },
      "./helpers/createClass.js"
    ],
    "./helpers/esm/createClass": "./helpers/esm/createClass.js",
    "./helpers/defineEnumerableProperties": [
      {
        "node": "./helpers/defineEnumerableProperties.js",
        "import": "./helpers/esm/defineEnumerableProperties.js",
        "default": "./helpers/defineEnumerableProperties.js"
      },
      "./helpers/defineEnumerableProperties.js"
    ],
    "./helpers/esm/defineEnumerableProperties": "./helpers/esm/defineEnumerableProperties.js",
    "./helpers/defaults": [
      {
        "node": "./helpers/defaults.js",
        "import": "./helpers/esm/defaults.js",
        "default": "./helpers/defaults.js"
      },
      "./helpers/defaults.js"
    ],
    "./helpers/esm/defaults": "./helpers/esm/defaults.js",
    "./helpers/defineProperty": [
      {
        "node": "./helpers/defineProperty.js",
        "import": "./helpers/esm/defineProperty.js",
        "default": "./helpers/defineProperty.js"
      },
      "./helpers/defineProperty.js"
    ],
    "./helpers/esm/defineProperty": "./helpers/esm/defineProperty.js",
    "./helpers/extends": [
      {
        "node": "./helpers/extends.js",
        "import": "./helpers/esm/extends.js",
        "default": "./helpers/extends.js"
      },
      "./helpers/extends.js"
    ],
    "./helpers/esm/extends": "./helpers/esm/extends.js",
    "./helpers/objectSpread": [
      {
        "node": "./helpers/objectSpread.js",
        "import": "./helpers/esm/objectSpread.js",
        "default": "./helpers/objectSpread.js"
      },
      "./helpers/objectSpread.js"
    ],
    "./helpers/esm/objectSpread": "./helpers/esm/objectSpread.js",
    "./helpers/inherits": [
      {
        "node": "./helpers/inherits.js",
        "import": "./helpers/esm/inherits.js",
        "default": "./helpers/inherits.js"
      },
      "./helpers/inherits.js"
    ],
    "./helpers/esm/inherits": "./helpers/esm/inherits.js",
    "./helpers/inheritsLoose": [
      {
        "node": "./helpers/inheritsLoose.js",
        "import": "./helpers/esm/inheritsLoose.js",
        "default": "./helpers/inheritsLoose.js"
      },
      "./helpers/inheritsLoose.js"
    ],
    "./helpers/esm/inheritsLoose": "./helpers/esm/inheritsLoose.js",
    "./helpers/getPrototypeOf": [
      {
        "node": "./helpers/getPrototypeOf.js",
        "import": "./helpers/esm/getPrototypeOf.js",
        "default": "./helpers/getPrototypeOf.js"
      },
      "./helpers/getPrototypeOf.js"
    ],
    "./helpers/esm/getPrototypeOf": "./helpers/esm/getPrototypeOf.js",
    "./helpers/setPrototypeOf": [
      {
        "node": "./helpers/setPrototypeOf.js",
        "import": "./helpers/esm/setPrototypeOf.js",
        "default": "./helpers/setPrototypeOf.js"
      },
      "./helpers/setPrototypeOf.js"
    ],
    "./helpers/esm/setPrototypeOf": "./helpers/esm/setPrototypeOf.js",
    "./helpers/isNativeFunction": [
      {
        "node": "./helpers/isNativeFunction.js",
        "import": "./helpers/esm/isNativeFunction.js",
        "default": "./helpers/isNativeFunction.js"
      },
      "./helpers/isNativeFunction.js"
    ],
    "./helpers/esm/isNativeFunction": "./helpers/esm/isNativeFunction.js",
    "./helpers/wrapNativeSuper": [
      {
        "node": "./helpers/wrapNativeSuper.js",
        "import": "./helpers/esm/wrapNativeSuper.js",
        "default": "./helpers/wrapNativeSuper.js"
      },
      "./helpers/wrapNativeSuper.js"
    ],
    "./helpers/esm/wrapNativeSuper": "./helpers/esm/wrapNativeSuper.js",
    "./helpers/instanceof": [
      {
        "node": "./helpers/instanceof.js",
        "import": "./helpers/esm/instanceof.js",
        "default": "./helpers/instanceof.js"
      },
      "./helpers/instanceof.js"
    ],
    "./helpers/esm/instanceof": "./helpers/esm/instanceof.js",
    "./helpers/interopRequireDefault": [
      {
        "node": "./helpers/interopRequireDefault.js",
        "import": "./helpers/esm/interopRequireDefault.js",
        "default": "./helpers/interopRequireDefault.js"
      },
      "./helpers/interopRequireDefault.js"
    ],
    "./helpers/esm/interopRequireDefault": "./helpers/esm/interopRequireDefault.js",
    "./helpers/newArrowCheck": [
      {
        "node": "./helpers/newArrowCheck.js",
        "import": "./helpers/esm/newArrowCheck.js",
        "default": "./helpers/newArrowCheck.js"
      },
      "./helpers/newArrowCheck.js"
    ],
    "./helpers/esm/newArrowCheck": "./helpers/esm/newArrowCheck.js",
    "./helpers/objectDestructuringEmpty": [
      {
        "node": "./helpers/objectDestructuringEmpty.js",
        "import": "./helpers/esm/objectDestructuringEmpty.js",
        "default": "./helpers/objectDestructuringEmpty.js"
      },
      "./helpers/objectDestructuringEmpty.js"
    ],
    "./helpers/esm/objectDestructuringEmpty": "./helpers/esm/objectDestructuringEmpty.js",
    "./helpers/objectWithoutPropertiesLoose": [
      {
        "node": "./helpers/objectWithoutPropertiesLoose.js",
        "import": "./helpers/esm/objectWithoutPropertiesLoose.js",
        "default": "./helpers/objectWithoutPropertiesLoose.js"
      },
      "./helpers/objectWithoutPropertiesLoose.js"
    ],
    "./helpers/esm/objectWithoutPropertiesLoose": "./helpers/esm/objectWithoutPropertiesLoose.js",
    "./helpers/objectWithoutProperties": [
      {
        "node": "./helpers/objectWithoutProperties.js",
        "import": "./helpers/esm/objectWithoutProperties.js",
        "default": "./helpers/objectWithoutProperties.js"
      },
      "./helpers/objectWithoutProperties.js"
    ],
    "./helpers/esm/objectWithoutProperties": "./helpers/esm/objectWithoutProperties.js",
    "./helpers/assertThisInitialized": [
      {
        "node": "./helpers/assertThisInitialized.js",
        "import": "./helpers/esm/assertThisInitialized.js",
        "default": "./helpers/assertThisInitialized.js"
      },
      "./helpers/assertThisInitialized.js"
    ],
    "./helpers/esm/assertThisInitialized": "./helpers/esm/assertThisInitialized.js",
    "./helpers/possibleConstructorReturn": [
      {
        "node": "./helpers/possibleConstructorReturn.js",
        "import": "./helpers/esm/possibleConstructorReturn.js",
        "default": "./helpers/possibleConstructorReturn.js"
      },
      "./helpers/possibleConstructorReturn.js"
    ],
    "./helpers/esm/possibleConstructorReturn": "./helpers/esm/possibleConstructorReturn.js",
    "./helpers/createSuper": [
      {
        "node": "./helpers/createSuper.js",
        "import": "./helpers/esm/createSuper.js",
        "default": "./helpers/createSuper.js"
      },
      "./helpers/createSuper.js"
    ],
    "./helpers/esm/createSuper": "./helpers/esm/createSuper.js",
    "./helpers/superPropBase": [
      {
        "node": "./helpers/superPropBase.js",
        "import": "./helpers/esm/superPropBase.js",
        "default": "./helpers/superPropBase.js"
      },
      "./helpers/superPropBase.js"
    ],
    "./helpers/esm/superPropBase": "./helpers/esm/superPropBase.js",
    "./helpers/get": [
      {
        "node": "./helpers/get.js",
        "import": "./helpers/esm/get.js",
        "default": "./helpers/get.js"
      },
      "./helpers/get.js"
    ],
    "./helpers/esm/get": "./helpers/esm/get.js",
    "./helpers/set": [
      {
        "node": "./helpers/set.js",
        "import": "./helpers/esm/set.js",
        "default": "./helpers/set.js"
      },
      "./helpers/set.js"
    ],
    "./helpers/esm/set": "./helpers/esm/set.js",
    "./helpers/taggedTemplateLiteral": [
      {
        "node": "./helpers/taggedTemplateLiteral.js",
        "import": "./helpers/esm/taggedTemplateLiteral.js",
        "default": "./helpers/taggedTemplateLiteral.js"
      },
      "./helpers/taggedTemplateLiteral.js"
    ],
    "./helpers/esm/taggedTemplateLiteral": "./helpers/esm/taggedTemplateLiteral.js",
    "./helpers/taggedTemplateLiteralLoose": [
      {
        "node": "./helpers/taggedTemplateLiteralLoose.js",
        "import": "./helpers/esm/taggedTemplateLiteralLoose.js",
        "default": "./helpers/taggedTemplateLiteralLoose.js"
      },
      "./helpers/taggedTemplateLiteralLoose.js"
    ],
    "./helpers/esm/taggedTemplateLiteralLoose": "./helpers/esm/taggedTemplateLiteralLoose.js",
    "./helpers/readOnlyError": [
      {
        "node": "./helpers/readOnlyError.js",
        "import": "./helpers/esm/readOnlyError.js",
        "default": "./helpers/readOnlyError.js"
      },
      "./helpers/readOnlyError.js"
    ],
    "./helpers/esm/readOnlyError": "./helpers/esm/readOnlyError.js",
    "./helpers/writeOnlyError": [
      {
        "node": "./helpers/writeOnlyError.js",
        "import": "./helpers/esm/writeOnlyError.js",
        "default": "./helpers/writeOnlyError.js"
      },
      "./helpers/writeOnlyError.js"
    ],
    "./helpers/esm/writeOnlyError": "./helpers/esm/writeOnlyError.js",
    "./helpers/classNameTDZError": [
      {
        "node": "./helpers/classNameTDZError.js",
        "import": "./helpers/esm/classNameTDZError.js",
        "default": "./helpers/classNameTDZError.js"
      },
      "./helpers/classNameTDZError.js"
    ],
    "./helpers/esm/classNameTDZError": "./helpers/esm/classNameTDZError.js",
    "./helpers/temporalUndefined": [
      {
        "node": "./helpers/temporalUndefined.js",
        "import": "./helpers/esm/temporalUndefined.js",
        "default": "./helpers/temporalUndefined.js"
      },
      "./helpers/temporalUndefined.js"
    ],
    "./helpers/esm/temporalUndefined": "./helpers/esm/temporalUndefined.js",
    "./helpers/tdz": [
      {
        "node": "./helpers/tdz.js",
        "import": "./helpers/esm/tdz.js",
        "default": "./helpers/tdz.js"
      },
      "./helpers/tdz.js"
    ],
    "./helpers/esm/tdz": "./helpers/esm/tdz.js",
    "./helpers/temporalRef": [
      {
        "node": "./helpers/temporalRef.js",
        "import": "./helpers/esm/temporalRef.js",
        "default": "./helpers/temporalRef.js"
      },
      "./helpers/temporalRef.js"
    ],
    "./helpers/esm/temporalRef": "./helpers/esm/temporalRef.js",
    "./helpers/slicedToArray": [
      {
        "node": "./helpers/slicedToArray.js",
        "import": "./helpers/esm/slicedToArray.js",
        "default": "./helpers/slicedToArray.js"
      },
      "./helpers/slicedToArray.js"
    ],
    "./helpers/esm/slicedToArray": "./helpers/esm/slicedToArray.js",
    "./helpers/slicedToArrayLoose": [
      {
        "node": "./helpers/slicedToArrayLoose.js",
        "import": "./helpers/esm/slicedToArrayLoose.js",
        "default": "./helpers/slicedToArrayLoose.js"
      },
      "./helpers/slicedToArrayLoose.js"
    ],
    "./helpers/esm/slicedToArrayLoose": "./helpers/esm/slicedToArrayLoose.js",
    "./helpers/toArray": [
      {
        "node": "./helpers/toArray.js",
        "import": "./helpers/esm/toArray.js",
        "default": "./helpers/toArray.js"
      },
      "./helpers/toArray.js"
    ],
    "./helpers/esm/toArray": "./helpers/esm/toArray.js",
    "./helpers/toConsumableArray": [
      {
        "node": "./helpers/toConsumableArray.js",
        "import": "./helpers/esm/toConsumableArray.js",
        "default": "./helpers/toConsumableArray.js"
      },
      "./helpers/toConsumableArray.js"
    ],
    "./helpers/esm/toConsumableArray": "./helpers/esm/toConsumableArray.js",
    "./helpers/arrayWithoutHoles": [
      {
        "node": "./helpers/arrayWithoutHoles.js",
        "import": "./helpers/esm/arrayWithoutHoles.js",
        "default": "./helpers/arrayWithoutHoles.js"
      },
      "./helpers/arrayWithoutHoles.js"
    ],
    "./helpers/esm/arrayWithoutHoles": "./helpers/esm/arrayWithoutHoles.js",
    "./helpers/arrayWithHoles": [
      {
        "node": "./helpers/arrayWithHoles.js",
        "import": "./helpers/esm/arrayWithHoles.js",
        "default": "./helpers/arrayWithHoles.js"
      },
      "./helpers/arrayWithHoles.js"
    ],
    "./helpers/esm/arrayWithHoles": "./helpers/esm/arrayWithHoles.js",
    "./helpers/maybeArrayLike": [
      {
        "node": "./helpers/maybeArrayLike.js",
        "import": "./helpers/esm/maybeArrayLike.js",
        "default": "./helpers/maybeArrayLike.js"
      },
      "./helpers/maybeArrayLike.js"
    ],
    "./helpers/esm/maybeArrayLike": "./helpers/esm/maybeArrayLike.js",
    "./helpers/iterableToArray": [
      {
        "node": "./helpers/iterableToArray.js",
        "import": "./helpers/esm/iterableToArray.js",
        "default": "./helpers/iterableToArray.js"
      },
      "./helpers/iterableToArray.js"
    ],
    "./helpers/esm/iterableToArray": "./helpers/esm/iterableToArray.js",
    "./helpers/unsupportedIterableToArray": [
      {
        "node": "./helpers/unsupportedIterableToArray.js",
        "import": "./helpers/esm/unsupportedIterableToArray.js",
        "default": "./helpers/unsupportedIterableToArray.js"
      },
      "./helpers/unsupportedIterableToArray.js"
    ],
    "./helpers/esm/unsupportedIterableToArray": "./helpers/esm/unsupportedIterableToArray.js",
    "./helpers/arrayLikeToArray": [
      {
        "node": "./helpers/arrayLikeToArray.js",
        "import": "./helpers/esm/arrayLikeToArray.js",
        "default": "./helpers/arrayLikeToArray.js"
      },
      "./helpers/arrayLikeToArray.js"
    ],
    "./helpers/esm/arrayLikeToArray": "./helpers/esm/arrayLikeToArray.js",
    "./helpers/nonIterableSpread": [
      {
        "node": "./helpers/nonIterableSpread.js",
        "import": "./helpers/esm/nonIterableSpread.js",
        "default": "./helpers/nonIterableSpread.js"
      },
      "./helpers/nonIterableSpread.js"
    ],
    "./helpers/esm/nonIterableSpread": "./helpers/esm/nonIterableSpread.js",
    "./helpers/nonIterableRest": [
      {
        "node": "./helpers/nonIterableRest.js",
        "import": "./helpers/esm/nonIterableRest.js",
        "default": "./helpers/nonIterableRest.js"
      },
      "./helpers/nonIterableRest.js"
    ],
    "./helpers/esm/nonIterableRest": "./helpers/esm/nonIterableRest.js",
    "./helpers/createForOfIteratorHelper": [
      {
        "node": "./helpers/createForOfIteratorHelper.js",
        "import": "./helpers/esm/createForOfIteratorHelper.js",
        "default": "./helpers/createForOfIteratorHelper.js"
      },
      "./helpers/createForOfIteratorHelper.js"
    ],
    "./helpers/esm/createForOfIteratorHelper": "./helpers/esm/createForOfIteratorHelper.js",
    "./helpers/createForOfIteratorHelperLoose": [
      {
        "node": "./helpers/createForOfIteratorHelperLoose.js",
        "import": "./helpers/esm/createForOfIteratorHelperLoose.js",
        "default": "./helpers/createForOfIteratorHelperLoose.js"
      },
      "./helpers/createForOfIteratorHelperLoose.js"
    ],
    "./helpers/esm/createForOfIteratorHelperLoose": "./helpers/esm/createForOfIteratorHelperLoose.js",
    "./helpers/skipFirstGeneratorNext": [
      {
        "node": "./helpers/skipFirstGeneratorNext.js",
        "import": "./helpers/esm/skipFirstGeneratorNext.js",
        "default": "./helpers/skipFirstGeneratorNext.js"
      },
      "./helpers/skipFirstGeneratorNext.js"
    ],
    "./helpers/esm/skipFirstGeneratorNext": "./helpers/esm/skipFirstGeneratorNext.js",
    "./helpers/initializerWarningHelper": [
      {
        "node": "./helpers/initializerWarningHelper.js",
        "import": "./helpers/esm/initializerWarningHelper.js",
        "default": "./helpers/initializerWarningHelper.js"
      },
      "./helpers/initializerWarningHelper.js"
    ],
    "./helpers/esm/initializerWarningHelper": "./helpers/esm/initializerWarningHelper.js",
    "./helpers/initializerDefineProperty": [
      {
        "node": "./helpers/initializerDefineProperty.js",
        "import": "./helpers/esm/initializerDefineProperty.js",
        "default": "./helpers/initializerDefineProperty.js"
      },
      "./helpers/initializerDefineProperty.js"
    ],
    "./helpers/esm/initializerDefineProperty": "./helpers/esm/initializerDefineProperty.js",
    "./helpers/applyDecoratedDescriptor": [
      {
        "node": "./helpers/applyDecoratedDescriptor.js",
        "import": "./helpers/esm/applyDecoratedDescriptor.js",
        "default": "./helpers/applyDecoratedDescriptor.js"
      },
      "./helpers/applyDecoratedDescriptor.js"
    ],
    "./helpers/esm/applyDecoratedDescriptor": "./helpers/esm/applyDecoratedDescriptor.js",
    "./helpers/classPrivateFieldLooseKey": [
      {
        "node": "./helpers/classPrivateFieldLooseKey.js",
        "import": "./helpers/esm/classPrivateFieldLooseKey.js",
        "default": "./helpers/classPrivateFieldLooseKey.js"
      },
      "./helpers/classPrivateFieldLooseKey.js"
    ],
    "./helpers/esm/classPrivateFieldLooseKey": "./helpers/esm/classPrivateFieldLooseKey.js",
    "./helpers/classPrivateFieldLooseBase": [
      {
        "node": "./helpers/classPrivateFieldLooseBase.js",
        "import": "./helpers/esm/classPrivateFieldLooseBase.js",
        "default": "./helpers/classPrivateFieldLooseBase.js"
      },
      "./helpers/classPrivateFieldLooseBase.js"
    ],
    "./helpers/esm/classPrivateFieldLooseBase": "./helpers/esm/classPrivateFieldLooseBase.js",
    "./helpers/classPrivateFieldGet": [
      {
        "node": "./helpers/classPrivateFieldGet.js",
        "import": "./helpers/esm/classPrivateFieldGet.js",
        "default": "./helpers/classPrivateFieldGet.js"
      },
      "./helpers/classPrivateFieldGet.js"
    ],
    "./helpers/esm/classPrivateFieldGet": "./helpers/esm/classPrivateFieldGet.js",
    "./helpers/classPrivateFieldSet": [
      {
        "node": "./helpers/classPrivateFieldSet.js",
        "import": "./helpers/esm/classPrivateFieldSet.js",
        "default": "./helpers/classPrivateFieldSet.js"
      },
      "./helpers/classPrivateFieldSet.js"
    ],
    "./helpers/esm/classPrivateFieldSet": "./helpers/esm/classPrivateFieldSet.js",
    "./helpers/classPrivateFieldDestructureSet": [
      {
        "node": "./helpers/classPrivateFieldDestructureSet.js",
        "import": "./helpers/esm/classPrivateFieldDestructureSet.js",
        "default": "./helpers/classPrivateFieldDestructureSet.js"
      },
      "./helpers/classPrivateFieldDestructureSet.js"
    ],
    "./helpers/esm/classPrivateFieldDestructureSet": "./helpers/esm/classPrivateFieldDestructureSet.js",
    "./helpers/classExtractFieldDescriptor": [
      {
        "node": "./helpers/classExtractFieldDescriptor.js",
        "import": "./helpers/esm/classExtractFieldDescriptor.js",
        "default": "./helpers/classExtractFieldDescriptor.js"
      },
      "./helpers/classExtractFieldDescriptor.js"
    ],
    "./helpers/esm/classExtractFieldDescriptor": "./helpers/esm/classExtractFieldDescriptor.js",
    "./helpers/classStaticPrivateFieldSpecGet": [
      {
        "node": "./helpers/classStaticPrivateFieldSpecGet.js",
        "import": "./helpers/esm/classStaticPrivateFieldSpecGet.js",
        "default": "./helpers/classStaticPrivateFieldSpecGet.js"
      },
      "./helpers/classStaticPrivateFieldSpecGet.js"
    ],
    "./helpers/esm/classStaticPrivateFieldSpecGet": "./helpers/esm/classStaticPrivateFieldSpecGet.js",
    "./helpers/classStaticPrivateFieldSpecSet": [
      {
        "node": "./helpers/classStaticPrivateFieldSpecSet.js",
        "import": "./helpers/esm/classStaticPrivateFieldSpecSet.js",
        "default": "./helpers/classStaticPrivateFieldSpecSet.js"
      },
      "./helpers/classStaticPrivateFieldSpecSet.js"
    ],
    "./helpers/esm/classStaticPrivateFieldSpecSet": "./helpers/esm/classStaticPrivateFieldSpecSet.js",
    "./helpers/classStaticPrivateMethodGet": [
      {
        "node": "./helpers/classStaticPrivateMethodGet.js",
        "import": "./helpers/esm/classStaticPrivateMethodGet.js",
        "default": "./helpers/classStaticPrivateMethodGet.js"
      },
      "./helpers/classStaticPrivateMethodGet.js"
    ],
    "./helpers/esm/classStaticPrivateMethodGet": "./helpers/esm/classStaticPrivateMethodGet.js",
    "./helpers/classStaticPrivateMethodSet": [
      {
        "node": "./helpers/classStaticPrivateMethodSet.js",
        "import": "./helpers/esm/classStaticPrivateMethodSet.js",
        "default": "./helpers/classStaticPrivateMethodSet.js"
      },
      "./helpers/classStaticPrivateMethodSet.js"
    ],
    "./helpers/esm/classStaticPrivateMethodSet": "./helpers/esm/classStaticPrivateMethodSet.js",
    "./helpers/classApplyDescriptorGet": [
      {
        "node": "./helpers/classApplyDescriptorGet.js",
        "import": "./helpers/esm/classApplyDescriptorGet.js",
        "default": "./helpers/classApplyDescriptorGet.js"
      },
      "./helpers/classApplyDescriptorGet.js"
    ],
    "./helpers/esm/classApplyDescriptorGet": "./helpers/esm/classApplyDescriptorGet.js",
    "./helpers/classApplyDescriptorSet": [
      {
        "node": "./helpers/classApplyDescriptorSet.js",
        "import": "./helpers/esm/classApplyDescriptorSet.js",
        "default": "./helpers/classApplyDescriptorSet.js"
      },
      "./helpers/classApplyDescriptorSet.js"
    ],
    "./helpers/esm/classApplyDescriptorSet": "./helpers/esm/classApplyDescriptorSet.js",
    "./helpers/classApplyDescriptorDestructureSet": [
      {
        "node": "./helpers/classApplyDescriptorDestructureSet.js",
        "import": "./helpers/esm/classApplyDescriptorDestructureSet.js",
        "default": "./helpers/classApplyDescriptorDestructureSet.js"
      },
      "./helpers/classApplyDescriptorDestructureSet.js"
    ],
    "./helpers/esm/classApplyDescriptorDestructureSet": "./helpers/esm/classApplyDescriptorDestructureSet.js",
    "./helpers/classStaticPrivateFieldDestructureSet": [
      {
        "node": "./helpers/classStaticPrivateFieldDestructureSet.js",
        "import": "./helpers/esm/classStaticPrivateFieldDestructureSet.js",
        "default": "./helpers/classStaticPrivateFieldDestructureSet.js"
      },
      "./helpers/classStaticPrivateFieldDestructureSet.js"
    ],
    "./helpers/esm/classStaticPrivateFieldDestructureSet": "./helpers/esm/classStaticPrivateFieldDestructureSet.js",
    "./helpers/classCheckPrivateStaticAccess": [
      {
        "node": "./helpers/classCheckPrivateStaticAccess.js",
        "import": "./helpers/esm/classCheckPrivateStaticAccess.js",
        "default": "./helpers/classCheckPrivateStaticAccess.js"
      },
      "./helpers/classCheckPrivateStaticAccess.js"
    ],
    "./helpers/esm/classCheckPrivateStaticAccess": "./helpers/esm/classCheckPrivateStaticAccess.js",
    "./helpers/classCheckPrivateStaticFieldDescriptor": [
      {
        "node": "./helpers/classCheckPrivateStaticFieldDescriptor.js",
        "import": "./helpers/esm/classCheckPrivateStaticFieldDescriptor.js",
        "default": "./helpers/classCheckPrivateStaticFieldDescriptor.js"
      },
      "./helpers/classCheckPrivateStaticFieldDescriptor.js"
    ],
    "./helpers/esm/classCheckPrivateStaticFieldDescriptor": "./helpers/esm/classCheckPrivateStaticFieldDescriptor.js",
    "./helpers/decorate": [
      {
        "node": "./helpers/decorate.js",
        "import": "./helpers/esm/decorate.js",
        "default": "./helpers/decorate.js"
      },
      "./helpers/decorate.js"
    ],
    "./helpers/esm/decorate": "./helpers/esm/decorate.js",
    "./helpers/classPrivateMethodGet": [
      {
        "node": "./helpers/classPrivateMethodGet.js",
        "import": "./helpers/esm/classPrivateMethodGet.js",
        "default": "./helpers/classPrivateMethodGet.js"
      },
      "./helpers/classPrivateMethodGet.js"
    ],
    "./helpers/esm/classPrivateMethodGet": "./helpers/esm/classPrivateMethodGet.js",
    "./helpers/checkPrivateRedeclaration": [
      {
        "node": "./helpers/checkPrivateRedeclaration.js",
        "import": "./helpers/esm/checkPrivateRedeclaration.js",
        "default": "./helpers/checkPrivateRedeclaration.js"
      },
      "./helpers/checkPrivateRedeclaration.js"
    ],
    "./helpers/esm/checkPrivateRedeclaration": "./helpers/esm/checkPrivateRedeclaration.js",
    "./helpers/classPrivateFieldInitSpec": [
      {
        "node": "./helpers/classPrivateFieldInitSpec.js",
        "import": "./helpers/esm/classPrivateFieldInitSpec.js",
        "default": "./helpers/classPrivateFieldInitSpec.js"
      },
      "./helpers/classPrivateFieldInitSpec.js"
    ],
    "./helpers/esm/classPrivateFieldInitSpec": "./helpers/esm/classPrivateFieldInitSpec.js",
    "./helpers/classPrivateMethodInitSpec": [
      {
        "node": "./helpers/classPrivateMethodInitSpec.js",
        "import": "./helpers/esm/classPrivateMethodInitSpec.js",
        "default": "./helpers/classPrivateMethodInitSpec.js"
      },
      "./helpers/classPrivateMethodInitSpec.js"
    ],
    "./helpers/esm/classPrivateMethodInitSpec": "./helpers/esm/classPrivateMethodInitSpec.js",
    "./helpers/classPrivateMethodSet": [
      {
        "node": "./helpers/classPrivateMethodSet.js",
        "import": "./helpers/esm/classPrivateMethodSet.js",
        "default": "./helpers/classPrivateMethodSet.js"
      },
      "./helpers/classPrivateMethodSet.js"
    ],
    "./helpers/esm/classPrivateMethodSet": "./helpers/esm/classPrivateMethodSet.js",
    "./helpers/identity": [
      {
        "node": "./helpers/identity.js",
        "import": "./helpers/esm/identity.js",
        "default": "./helpers/identity.js"
      },
      "./helpers/identity.js"
    ],
    "./helpers/esm/identity": "./helpers/esm/identity.js",
    "./helpers/nullishReceiverError": [
      {
        "node": "./helpers/nullishReceiverError.js",
        "import": "./helpers/esm/nullishReceiverError.js",
        "default": "./helpers/nullishReceiverError.js"
      },
      "./helpers/nullishReceiverError.js"
    ],
    "./helpers/esm/nullishReceiverError": "./helpers/esm/nullishReceiverError.js",
    "./package": "./package.json",
    "./package.json": "./package.json",
    "./regenerator": "./regenerator/index.js",
    "./regenerator/*.js": "./regenerator/*.js",
    "./regenerator/": "./regenerator/"
  },
  "engines": {
    "node": ">=6.9.0"
  },
  "type": "commonjs"
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"dateformat":{"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/dateformat/package.json                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = {
  "name": "dateformat",
  "version": "5.0.3",
  "main": "lib/dateformat.js"
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"lib":{"dateformat.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/dateformat/lib/dateformat.js                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({default:()=>dateFormat,masks:()=>masks,i18n:()=>i18n,formatTimezone:()=>formatTimezone});var token=/d{1,4}|D{3,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|W{1,2}|[LlopSZN]|"[^"]*"|'[^']*'/g;var timezone=/\b(?:[A-Z]{1,3}[A-Z][TC])(?:[-+]\d{4})?|((?:Australian )?(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time)\b/g;var timezoneClip=/[^-+\dA-Z]/g;function dateFormat(date,mask,utc,gmt){if(arguments.length===1&&typeof date==="string"&&!/\d/.test(date)){mask=date;date=undefined}date=date||date===0?date:new Date;if(!(date instanceof Date)){date=new Date(date)}if(isNaN(date)){throw TypeError("Invalid date")}mask=String(masks[mask]||mask||masks["default"]);var maskSlice=mask.slice(0,4);if(maskSlice==="UTC:"||maskSlice==="GMT:"){mask=mask.slice(4);utc=true;if(maskSlice==="GMT:"){gmt=true}}var _=function _(){return utc?"getUTC":"get"};var _d=function d(){return date[_()+"Date"]()};var D=function D(){return date[_()+"Day"]()};var _m=function m(){return date[_()+"Month"]()};var y=function y(){return date[_()+"FullYear"]()};var _H=function H(){return date[_()+"Hours"]()};var _M=function M(){return date[_()+"Minutes"]()};var _s=function s(){return date[_()+"Seconds"]()};var _L=function L(){return date[_()+"Milliseconds"]()};var _o=function o(){return utc?0:date.getTimezoneOffset()};var _W=function W(){return getWeek(date)};var _N=function N(){return getDayOfWeek(date)};var flags={d:function d(){return _d()},dd:function dd(){return pad(_d())},ddd:function ddd(){return i18n.dayNames[D()]},DDD:function DDD(){return getDayName({y:y(),m:_m(),d:_d(),_:_(),dayName:i18n.dayNames[D()],short:true})},dddd:function dddd(){return i18n.dayNames[D()+7]},DDDD:function DDDD(){return getDayName({y:y(),m:_m(),d:_d(),_:_(),dayName:i18n.dayNames[D()+7]})},m:function m(){return _m()+1},mm:function mm(){return pad(_m()+1)},mmm:function mmm(){return i18n.monthNames[_m()]},mmmm:function mmmm(){return i18n.monthNames[_m()+12]},yy:function yy(){return String(y()).slice(2)},yyyy:function yyyy(){return pad(y(),4)},h:function h(){return _H()%12||12},hh:function hh(){return pad(_H()%12||12)},H:function H(){return _H()},HH:function HH(){return pad(_H())},M:function M(){return _M()},MM:function MM(){return pad(_M())},s:function s(){return _s()},ss:function ss(){return pad(_s())},l:function l(){return pad(_L(),3)},L:function L(){return pad(Math.floor(_L()/10))},t:function t(){return _H()<12?i18n.timeNames[0]:i18n.timeNames[1]},tt:function tt(){return _H()<12?i18n.timeNames[2]:i18n.timeNames[3]},T:function T(){return _H()<12?i18n.timeNames[4]:i18n.timeNames[5]},TT:function TT(){return _H()<12?i18n.timeNames[6]:i18n.timeNames[7]},Z:function Z(){return gmt?"GMT":utc?"UTC":formatTimezone(date)},o:function o(){return(_o()>0?"-":"+")+pad(Math.floor(Math.abs(_o())/60)*100+Math.abs(_o())%60,4)},p:function p(){return(_o()>0?"-":"+")+pad(Math.floor(Math.abs(_o())/60),2)+":"+pad(Math.floor(Math.abs(_o())%60),2)},S:function S(){return["th","st","nd","rd"][_d()%10>3?0:(_d()%100-_d()%10!=10)*_d()%10]},W:function W(){return _W()},WW:function WW(){return pad(_W())},N:function N(){return _N()}};return mask.replace(token,function(match){if(match in flags){return flags[match]()}return match.slice(1,match.length-1)})}var masks={default:"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",paddedShortDate:"mm/dd/yyyy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:sso",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",expiresHeaderFormat:"ddd, dd mmm yyyy HH:MM:ss Z"};var i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"],timeNames:["a","p","am","pm","A","P","AM","PM"]};var pad=function pad(val){var len=arguments.length>1&&arguments[1]!==undefined?arguments[1]:2;return String(val).padStart(len,"0")};var getDayName=function getDayName(_ref){var y=_ref.y,m=_ref.m,d=_ref.d,_=_ref._,dayName=_ref.dayName,_ref$short=_ref["short"],_short=_ref$short===void 0?false:_ref$short;var today=new Date;var yesterday=new Date;yesterday.setDate(yesterday[_+"Date"]()-1);var tomorrow=new Date;tomorrow.setDate(tomorrow[_+"Date"]()+1);var today_d=function today_d(){return today[_+"Date"]()};var today_m=function today_m(){return today[_+"Month"]()};var today_y=function today_y(){return today[_+"FullYear"]()};var yesterday_d=function yesterday_d(){return yesterday[_+"Date"]()};var yesterday_m=function yesterday_m(){return yesterday[_+"Month"]()};var yesterday_y=function yesterday_y(){return yesterday[_+"FullYear"]()};var tomorrow_d=function tomorrow_d(){return tomorrow[_+"Date"]()};var tomorrow_m=function tomorrow_m(){return tomorrow[_+"Month"]()};var tomorrow_y=function tomorrow_y(){return tomorrow[_+"FullYear"]()};if(today_y()===y&&today_m()===m&&today_d()===d){return _short?"Tdy":"Today"}else if(yesterday_y()===y&&yesterday_m()===m&&yesterday_d()===d){return _short?"Ysd":"Yesterday"}else if(tomorrow_y()===y&&tomorrow_m()===m&&tomorrow_d()===d){return _short?"Tmw":"Tomorrow"}return dayName};var getWeek=function getWeek(date){var targetThursday=new Date(date.getFullYear(),date.getMonth(),date.getDate());targetThursday.setDate(targetThursday.getDate()-(targetThursday.getDay()+6)%7+3);var firstThursday=new Date(targetThursday.getFullYear(),0,4);firstThursday.setDate(firstThursday.getDate()-(firstThursday.getDay()+6)%7+3);var ds=targetThursday.getTimezoneOffset()-firstThursday.getTimezoneOffset();targetThursday.setHours(targetThursday.getHours()-ds);var weekDiff=(targetThursday-firstThursday)/(864e5*7);return 1+Math.floor(weekDiff)};var getDayOfWeek=function getDayOfWeek(date){var dow=date.getDay();if(dow===0){dow=7}return dow};var formatTimezone=function formatTimezone(date){return(String(date).match(timezone)||[""]).pop().replace(timezoneClip,"").replace(/GMT\+0000/g,"UTC")};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"lodash":{"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/lodash/package.json                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = {
  "name": "lodash",
  "version": "4.17.21",
  "main": "lodash.js"
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"lodash.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/lodash/lodash.js                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.useNode();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"node-fetch":{"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/node-fetch/package.json                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = {
  "name": "node-fetch",
  "version": "3.3.2",
  "main": "./src/index.js"
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"src":{"index.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/node-fetch/src/index.js                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({FormData:()=>FormData,Headers:()=>Headers,Request:()=>Request,Response:()=>Response,FetchError:()=>FetchError,AbortError:()=>AbortError,isRedirect:()=>isRedirect,Blob:()=>Blob,File:()=>File,fileFromSync:()=>fileFromSync,fileFrom:()=>fileFrom,blobFromSync:()=>blobFromSync,blobFrom:()=>blobFrom,default:()=>fetch});let http;module.link('node:http',{default(v){http=v}},0);let https;module.link('node:https',{default(v){https=v}},1);let zlib;module.link('node:zlib',{default(v){zlib=v}},2);let Stream,PassThrough,pump;module.link('node:stream',{default(v){Stream=v},PassThrough(v){PassThrough=v},pipeline(v){pump=v}},3);let Buffer;module.link('node:buffer',{Buffer(v){Buffer=v}},4);let dataUriToBuffer;module.link('data-uri-to-buffer',{default(v){dataUriToBuffer=v}},5);let writeToStream,clone;module.link('./body.js',{writeToStream(v){writeToStream=v},clone(v){clone=v}},6);let Response;module.link('./response.js',{default(v){Response=v}},7);let Headers,fromRawHeaders;module.link('./headers.js',{default(v){Headers=v},fromRawHeaders(v){fromRawHeaders=v}},8);let Request,getNodeRequestOptions;module.link('./request.js',{default(v){Request=v},getNodeRequestOptions(v){getNodeRequestOptions=v}},9);let FetchError;module.link('./errors/fetch-error.js',{FetchError(v){FetchError=v}},10);let AbortError;module.link('./errors/abort-error.js',{AbortError(v){AbortError=v}},11);let isRedirect;module.link('./utils/is-redirect.js',{isRedirect(v){isRedirect=v}},12);let FormData;module.link('formdata-polyfill/esm.min.js',{FormData(v){FormData=v}},13);let isDomainOrSubdomain,isSameProtocol;module.link('./utils/is.js',{isDomainOrSubdomain(v){isDomainOrSubdomain=v},isSameProtocol(v){isSameProtocol=v}},14);let parseReferrerPolicyFromHeader;module.link('./utils/referrer.js',{parseReferrerPolicyFromHeader(v){parseReferrerPolicyFromHeader=v}},15);let Blob,File,fileFromSync,fileFrom,blobFromSync,blobFrom;module.link('fetch-blob/from.js',{Blob(v){Blob=v},File(v){File=v},fileFromSync(v){fileFromSync=v},fileFrom(v){fileFrom=v},blobFromSync(v){blobFromSync=v},blobFrom(v){blobFrom=v}},16);/**
 * Index.js
 *
 * a request API compatible with window.fetch
 *
 * All spec algorithm step numbers are based on https://fetch.spec.whatwg.org/commit-snapshots/ae716822cb3a61843226cd090eefc6589446c1d2/.
 */































const supportedSchemas = new Set(['data:', 'http:', 'https:']);

/**
 * Fetch function
 *
 * @param   {string | URL | import('./request').default} url - Absolute url or Request instance
 * @param   {*} [options_] - Fetch options
 * @return  {Promise<import('./response').default>}
 */
async function fetch(url, options_) {
	return new Promise((resolve, reject) => {
		// Build request object
		const request = new Request(url, options_);
		const {parsedURL, options} = getNodeRequestOptions(request);
		if (!supportedSchemas.has(parsedURL.protocol)) {
			throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${parsedURL.protocol.replace(/:$/, '')}" is not supported.`);
		}

		if (parsedURL.protocol === 'data:') {
			const data = dataUriToBuffer(request.url);
			const response = new Response(data, {headers: {'Content-Type': data.typeFull}});
			resolve(response);
			return;
		}

		// Wrap http.request into fetch
		const send = (parsedURL.protocol === 'https:' ? https : http).request;
		const {signal} = request;
		let response = null;

		const abort = () => {
			const error = new AbortError('The operation was aborted.');
			reject(error);
			if (request.body && request.body instanceof Stream.Readable) {
				request.body.destroy(error);
			}

			if (!response || !response.body) {
				return;
			}

			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = () => {
			abort();
			finalize();
		};

		// Send request
		const request_ = send(parsedURL.toString(), options);

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		const finalize = () => {
			request_.abort();
			if (signal) {
				signal.removeEventListener('abort', abortAndFinalize);
			}
		};

		request_.on('error', error => {
			reject(new FetchError(`request to ${request.url} failed, reason: ${error.message}`, 'system', error));
			finalize();
		});

		fixResponseChunkedTransferBadEnding(request_, error => {
			if (response && response.body) {
				response.body.destroy(error);
			}
		});

		/* c8 ignore next 18 */
		if (process.version < 'v14') {
			// Before Node.js 14, pipeline() does not fully support async iterators and does not always
			// properly handle when the socket close/end events are out of order.
			request_.on('socket', s => {
				let endedWithEventsCount;
				s.prependListener('end', () => {
					endedWithEventsCount = s._eventsCount;
				});
				s.prependListener('close', hadError => {
					// if end happened before close but the socket didn't emit an error, do it now
					if (response && endedWithEventsCount < s._eventsCount && !hadError) {
						const error = new Error('Premature close');
						error.code = 'ERR_STREAM_PREMATURE_CLOSE';
						response.body.emit('error', error);
					}
				});
			});
		}

		request_.on('response', response_ => {
			request_.setTimeout(0);
			const headers = fromRawHeaders(response_.rawHeaders);

			// HTTP fetch step 5
			if (isRedirect(response_.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				let locationURL = null;
				try {
					locationURL = location === null ? null : new URL(location, request.url);
				} catch {
					// error here can only be invalid URL in Location: header
					// do not throw when options.redirect == manual
					// let the user extract the errorneous redirect URL
					if (request.redirect !== 'manual') {
						reject(new FetchError(`uri requested responds with an invalid redirect URL: ${location}`, 'invalid-redirect'));
						finalize();
						return;
					}
				}

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// Nothing to do
						break;
					case 'follow': {
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOptions = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: clone(request),
							signal: request.signal,
							size: request.size,
							referrer: request.referrer,
							referrerPolicy: request.referrerPolicy
						};

						// when forwarding sensitive headers like "Authorization",
						// "WWW-Authenticate", and "Cookie" to untrusted targets,
						// headers will be ignored when following a redirect to a domain
						// that is not a subdomain match or exact match of the initial domain.
						// For example, a redirect from "foo.com" to either "foo.com" or "sub.foo.com"
						// will forward the sensitive headers, but a redirect to "bar.com" will not.
						// headers will also be ignored when following a redirect to a domain using
						// a different protocol. For example, a redirect from "https://foo.com" to "http://foo.com"
						// will not forward the sensitive headers
						if (!isDomainOrSubdomain(request.url, locationURL) || !isSameProtocol(request.url, locationURL)) {
							for (const name of ['authorization', 'www-authenticate', 'cookie', 'cookie2']) {
								requestOptions.headers.delete(name);
							}
						}

						// HTTP-redirect fetch step 9
						if (response_.statusCode !== 303 && request.body && options_.body instanceof Stream.Readable) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (response_.statusCode === 303 || ((response_.statusCode === 301 || response_.statusCode === 302) && request.method === 'POST')) {
							requestOptions.method = 'GET';
							requestOptions.body = undefined;
							requestOptions.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 14
						const responseReferrerPolicy = parseReferrerPolicyFromHeader(headers);
						if (responseReferrerPolicy) {
							requestOptions.referrerPolicy = responseReferrerPolicy;
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOptions)));
						finalize();
						return;
					}

					default:
						return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
				}
			}

			// Prepare response
			if (signal) {
				response_.once('end', () => {
					signal.removeEventListener('abort', abortAndFinalize);
				});
			}

			let body = pump(response_, new PassThrough(), error => {
				if (error) {
					reject(error);
				}
			});
			// see https://github.com/nodejs/node/pull/29376
			/* c8 ignore next 3 */
			if (process.version < 'v12.10') {
				response_.on('aborted', abortAndFinalize);
			}

			const responseOptions = {
				url: request.url,
				status: response_.statusCode,
				statusText: response_.statusMessage,
				headers,
				size: request.size,
				counter: request.counter,
				highWaterMark: request.highWaterMark
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
				response = new Response(body, responseOptions);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib.Z_SYNC_FLUSH,
				finishFlush: zlib.Z_SYNC_FLUSH
			};

			// For gzip
			if (codings === 'gzip' || codings === 'x-gzip') {
				body = pump(body, zlib.createGunzip(zlibOptions), error => {
					if (error) {
						reject(error);
					}
				});
				response = new Response(body, responseOptions);
				resolve(response);
				return;
			}

			// For deflate
			if (codings === 'deflate' || codings === 'x-deflate') {
				// Handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = pump(response_, new PassThrough(), error => {
					if (error) {
						reject(error);
					}
				});
				raw.once('data', chunk => {
					// See http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = pump(body, zlib.createInflate(), error => {
							if (error) {
								reject(error);
							}
						});
					} else {
						body = pump(body, zlib.createInflateRaw(), error => {
							if (error) {
								reject(error);
							}
						});
					}

					response = new Response(body, responseOptions);
					resolve(response);
				});
				raw.once('end', () => {
					// Some old IIS servers return zero-length OK deflate responses, so
					// 'data' is never emitted. See https://github.com/node-fetch/node-fetch/pull/903
					if (!response) {
						response = new Response(body, responseOptions);
						resolve(response);
					}
				});
				return;
			}

			// For br
			if (codings === 'br') {
				body = pump(body, zlib.createBrotliDecompress(), error => {
					if (error) {
						reject(error);
					}
				});
				response = new Response(body, responseOptions);
				resolve(response);
				return;
			}

			// Otherwise, use response as-is
			response = new Response(body, responseOptions);
			resolve(response);
		});

		// eslint-disable-next-line promise/prefer-await-to-then
		writeToStream(request_, request).catch(reject);
	});
}

function fixResponseChunkedTransferBadEnding(request, errorCallback) {
	const LAST_CHUNK = Buffer.from('0\r\n\r\n');

	let isChunkedTransfer = false;
	let properLastChunkReceived = false;
	let previousChunk;

	request.on('response', response => {
		const {headers} = response;
		isChunkedTransfer = headers['transfer-encoding'] === 'chunked' && !headers['content-length'];
	});

	request.on('socket', socket => {
		const onSocketClose = () => {
			if (isChunkedTransfer && !properLastChunkReceived) {
				const error = new Error('Premature close');
				error.code = 'ERR_STREAM_PREMATURE_CLOSE';
				errorCallback(error);
			}
		};

		const onData = buf => {
			properLastChunkReceived = Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;

			// Sometimes final 0-length chunk and end of message code are in separate packets
			if (!properLastChunkReceived && previousChunk) {
				properLastChunkReceived = (
					Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 &&
					Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0
				);
			}

			previousChunk = buf;
		};

		socket.prependListener('close', onSocketClose);
		socket.on('data', onData);

		request.on('close', () => {
			socket.removeListener('close', onSocketClose);
			socket.removeListener('data', onData);
		});
	});
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"body.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/node-fetch/src/body.js                                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({default:()=>Body});module.export({clone:()=>clone,extractContentType:()=>extractContentType,getTotalBytes:()=>getTotalBytes,writeToStream:()=>writeToStream},true);let Stream,PassThrough;module.link('node:stream',{default(v){Stream=v},PassThrough(v){PassThrough=v}},0);let types,deprecate,promisify;module.link('node:util',{types(v){types=v},deprecate(v){deprecate=v},promisify(v){promisify=v}},1);let Buffer;module.link('node:buffer',{Buffer(v){Buffer=v}},2);let Blob;module.link('fetch-blob',{default(v){Blob=v}},3);let FormData,formDataToBlob;module.link('formdata-polyfill/esm.min.js',{FormData(v){FormData=v},formDataToBlob(v){formDataToBlob=v}},4);let FetchError;module.link('./errors/fetch-error.js',{FetchError(v){FetchError=v}},5);let FetchBaseError;module.link('./errors/base.js',{FetchBaseError(v){FetchBaseError=v}},6);let isBlob,isURLSearchParameters;module.link('./utils/is.js',{isBlob(v){isBlob=v},isURLSearchParameters(v){isURLSearchParameters=v}},7);
/**
 * Body.js
 *
 * Body interface provides common methods for Request and Response
 */












const pipeline = promisify(Stream.pipeline);
const INTERNALS = Symbol('Body internals');

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Body {
	constructor(body, {
		size = 0
	} = {}) {
		let boundary = null;

		if (body === null) {
			// Body is undefined or null
			body = null;
		} else if (isURLSearchParameters(body)) {
			// Body is a URLSearchParams
			body = Buffer.from(body.toString());
		} else if (isBlob(body)) {
			// Body is blob
		} else if (Buffer.isBuffer(body)) {
			// Body is Buffer
		} else if (types.isAnyArrayBuffer(body)) {
			// Body is ArrayBuffer
			body = Buffer.from(body);
		} else if (ArrayBuffer.isView(body)) {
			// Body is ArrayBufferView
			body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
		} else if (body instanceof Stream) {
			// Body is stream
		} else if (body instanceof FormData) {
			// Body is FormData
			body = formDataToBlob(body);
			boundary = body.type.split('=')[1];
		} else {
			// None of the above
			// coerce to string then buffer
			body = Buffer.from(String(body));
		}

		let stream = body;

		if (Buffer.isBuffer(body)) {
			stream = Stream.Readable.from(body);
		} else if (isBlob(body)) {
			stream = Stream.Readable.from(body.stream());
		}

		this[INTERNALS] = {
			body,
			stream,
			boundary,
			disturbed: false,
			error: null
		};
		this.size = size;

		if (body instanceof Stream) {
			body.on('error', error_ => {
				const error = error_ instanceof FetchBaseError ?
					error_ :
					new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, 'system', error_);
				this[INTERNALS].error = error;
			});
		}
	}

	get body() {
		return this[INTERNALS].stream;
	}

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	}

	/**
	 * Decode response as ArrayBuffer
	 *
	 * @return  Promise
	 */
	async arrayBuffer() {
		const {buffer, byteOffset, byteLength} = await consumeBody(this);
		return buffer.slice(byteOffset, byteOffset + byteLength);
	}

	async formData() {
		const ct = this.headers.get('content-type');

		if (ct.startsWith('application/x-www-form-urlencoded')) {
			const formData = new FormData();
			const parameters = new URLSearchParams(await this.text());

			for (const [name, value] of parameters) {
				formData.append(name, value);
			}

			return formData;
		}

		const {toFormData} = await module.dynamicImport('./utils/multipart-parser.js');
		return toFormData(this.body, ct);
	}

	/**
	 * Return raw response as Blob
	 *
	 * @return Promise
	 */
	async blob() {
		const ct = (this.headers && this.headers.get('content-type')) || (this[INTERNALS].body && this[INTERNALS].body.type) || '';
		const buf = await this.arrayBuffer();

		return new Blob([buf], {
			type: ct
		});
	}

	/**
	 * Decode response as json
	 *
	 * @return  Promise
	 */
	async json() {
		const text = await this.text();
		return JSON.parse(text);
	}

	/**
	 * Decode response as text
	 *
	 * @return  Promise
	 */
	async text() {
		const buffer = await consumeBody(this);
		return new TextDecoder().decode(buffer);
	}

	/**
	 * Decode response as buffer (non-spec api)
	 *
	 * @return  Promise
	 */
	buffer() {
		return consumeBody(this);
	}
}

Body.prototype.buffer = deprecate(Body.prototype.buffer, 'Please use \'response.arrayBuffer()\' instead of \'response.buffer()\'', 'node-fetch#buffer');

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: {enumerable: true},
	bodyUsed: {enumerable: true},
	arrayBuffer: {enumerable: true},
	blob: {enumerable: true},
	json: {enumerable: true},
	text: {enumerable: true},
	data: {get: deprecate(() => {},
		'data doesn\'t exist, use json(), text(), arrayBuffer(), or body instead',
		'https://github.com/node-fetch/node-fetch/issues/1000 (response)')}
});

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return Promise
 */
async function consumeBody(data) {
	if (data[INTERNALS].disturbed) {
		throw new TypeError(`body used already for: ${data.url}`);
	}

	data[INTERNALS].disturbed = true;

	if (data[INTERNALS].error) {
		throw data[INTERNALS].error;
	}

	const {body} = data;

	// Body is null
	if (body === null) {
		return Buffer.alloc(0);
	}

	/* c8 ignore next 3 */
	if (!(body instanceof Stream)) {
		return Buffer.alloc(0);
	}

	// Body is stream
	// get ready to actually consume the body
	const accum = [];
	let accumBytes = 0;

	try {
		for await (const chunk of body) {
			if (data.size > 0 && accumBytes + chunk.length > data.size) {
				const error = new FetchError(`content size at ${data.url} over limit: ${data.size}`, 'max-size');
				body.destroy(error);
				throw error;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		}
	} catch (error) {
		const error_ = error instanceof FetchBaseError ? error : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error.message}`, 'system', error);
		throw error_;
	}

	if (body.readableEnded === true || body._readableState.ended === true) {
		try {
			if (accum.every(c => typeof c === 'string')) {
				return Buffer.from(accum.join(''));
			}

			return Buffer.concat(accum, accumBytes);
		} catch (error) {
			throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error.message}`, 'system', error);
		}
	} else {
		throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
	}
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed   instance       Response or Request instance
 * @param   String  highWaterMark  highWaterMark for both PassThrough body streams
 * @return  Mixed
 */
const clone = (instance, highWaterMark) => {
	let p1;
	let p2;
	let {body} = instance[INTERNALS];

	// Don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// Check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if ((body instanceof Stream) && (typeof body.getBoundary !== 'function')) {
		// Tee instance body
		p1 = new PassThrough({highWaterMark});
		p2 = new PassThrough({highWaterMark});
		body.pipe(p1);
		body.pipe(p2);
		// Set instance body to teed body and return the other teed body
		instance[INTERNALS].stream = p1;
		body = p2;
	}

	return body;
};

const getNonSpecFormDataBoundary = deprecate(
	body => body.getBoundary(),
	'form-data doesn\'t follow the spec and requires special treatment. Use alternative package',
	'https://github.com/node-fetch/node-fetch/issues/1167'
);

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param {any} body Any options.body input
 * @returns {string | null}
 */
const extractContentType = (body, request) => {
	// Body is null or undefined
	if (body === null) {
		return null;
	}

	// Body is string
	if (typeof body === 'string') {
		return 'text/plain;charset=UTF-8';
	}

	// Body is a URLSearchParams
	if (isURLSearchParameters(body)) {
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	}

	// Body is blob
	if (isBlob(body)) {
		return body.type || null;
	}

	// Body is a Buffer (Buffer, ArrayBuffer or ArrayBufferView)
	if (Buffer.isBuffer(body) || types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
		return null;
	}

	if (body instanceof FormData) {
		return `multipart/form-data; boundary=${request[INTERNALS].boundary}`;
	}

	// Detect form data input from form-data module
	if (body && typeof body.getBoundary === 'function') {
		return `multipart/form-data;boundary=${getNonSpecFormDataBoundary(body)}`;
	}

	// Body is stream - can't really do much about this
	if (body instanceof Stream) {
		return null;
	}

	// Body constructor defaults other things to string
	return 'text/plain;charset=UTF-8';
};

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param {any} obj.body Body object from the Body instance.
 * @returns {number | null}
 */
const getTotalBytes = request => {
	const {body} = request[INTERNALS];

	// Body is null or undefined
	if (body === null) {
		return 0;
	}

	// Body is Blob
	if (isBlob(body)) {
		return body.size;
	}

	// Body is Buffer
	if (Buffer.isBuffer(body)) {
		return body.length;
	}

	// Detect form data input from form-data module
	if (body && typeof body.getLengthSync === 'function') {
		return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
	}

	// Body is stream
	return null;
};

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param {Stream.Writable} dest The stream to write to.
 * @param obj.body Body object from the Body instance.
 * @returns {Promise<void>}
 */
const writeToStream = async (dest, {body}) => {
	if (body === null) {
		// Body is null
		dest.end();
	} else {
		// Body is stream
		await pipeline(body, dest);
	}
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"errors":{"fetch-error.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/node-fetch/src/errors/fetch-error.js                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({FetchError:()=>FetchError});let FetchBaseError;module.link('./base.js',{FetchBaseError(v){FetchBaseError=v}},0);


/**
 * @typedef {{ address?: string, code: string, dest?: string, errno: number, info?: object, message: string, path?: string, port?: number, syscall: string}} SystemError
*/

/**
 * FetchError interface for operational errors
 */
class FetchError extends FetchBaseError {
	/**
	 * @param  {string} message -      Error message for human
	 * @param  {string} [type] -        Error type for machine
	 * @param  {SystemError} [systemError] - For Node.js system error
	 */
	constructor(message, type, systemError) {
		super(message, type);
		// When err.type is `system`, err.erroredSysCall contains system error and err.code contains system error code
		if (systemError) {
			// eslint-disable-next-line no-multi-assign
			this.code = this.errno = systemError.code;
			this.erroredSysCall = systemError.syscall;
		}
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"base.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/node-fetch/src/errors/base.js                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({FetchBaseError:()=>FetchBaseError});class FetchBaseError extends Error {
	constructor(message, type) {
		super(message);
		// Hide custom error implementation details from end-users
		Error.captureStackTrace(this, this.constructor);

		this.type = type;
	}

	get name() {
		return this.constructor.name;
	}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"abort-error.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/node-fetch/src/errors/abort-error.js                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({AbortError:()=>AbortError});let FetchBaseError;module.link('./base.js',{FetchBaseError(v){FetchBaseError=v}},0);

/**
 * AbortError interface for cancelled requests
 */
class AbortError extends FetchBaseError {
	constructor(message, type = 'aborted') {
		super(message, type);
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"utils":{"is.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/node-fetch/src/utils/is.js                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({isURLSearchParameters:()=>isURLSearchParameters,isBlob:()=>isBlob,isAbortSignal:()=>isAbortSignal,isDomainOrSubdomain:()=>isDomainOrSubdomain,isSameProtocol:()=>isSameProtocol},true);/**
 * Is.js
 *
 * Object type checks.
 */

const NAME = Symbol.toStringTag;

/**
 * Check if `obj` is a URLSearchParams object
 * ref: https://github.com/node-fetch/node-fetch/issues/296#issuecomment-307598143
 * @param {*} object - Object to check for
 * @return {boolean}
 */
const isURLSearchParameters = object => {
	return (
		typeof object === 'object' &&
		typeof object.append === 'function' &&
		typeof object.delete === 'function' &&
		typeof object.get === 'function' &&
		typeof object.getAll === 'function' &&
		typeof object.has === 'function' &&
		typeof object.set === 'function' &&
		typeof object.sort === 'function' &&
		object[NAME] === 'URLSearchParams'
	);
};

/**
 * Check if `object` is a W3C `Blob` object (which `File` inherits from)
 * @param {*} object - Object to check for
 * @return {boolean}
 */
const isBlob = object => {
	return (
		object &&
		typeof object === 'object' &&
		typeof object.arrayBuffer === 'function' &&
		typeof object.type === 'string' &&
		typeof object.stream === 'function' &&
		typeof object.constructor === 'function' &&
		/^(Blob|File)$/.test(object[NAME])
	);
};

/**
 * Check if `obj` is an instance of AbortSignal.
 * @param {*} object - Object to check for
 * @return {boolean}
 */
const isAbortSignal = object => {
	return (
		typeof object === 'object' && (
			object[NAME] === 'AbortSignal' ||
			object[NAME] === 'EventTarget'
		)
	);
};

/**
 * isDomainOrSubdomain reports whether sub is a subdomain (or exact match) of
 * the parent domain.
 *
 * Both domains must already be in canonical form.
 * @param {string|URL} original
 * @param {string|URL} destination
 */
const isDomainOrSubdomain = (destination, original) => {
	const orig = new URL(original).hostname;
	const dest = new URL(destination).hostname;

	return orig === dest || orig.endsWith(`.${dest}`);
};

/**
 * isSameProtocol reports whether the two provided URLs use the same protocol.
 *
 * Both domains must already be in canonical form.
 * @param {string|URL} original
 * @param {string|URL} destination
 */
const isSameProtocol = (destination, original) => {
	const orig = new URL(original).protocol;
	const dest = new URL(destination).protocol;

	return orig === dest;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"multipart-parser.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/node-fetch/src/utils/multipart-parser.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({toFormData:()=>toFormData});let File;module.link('fetch-blob/from.js',{File(v){File=v}},0);let FormData;module.link('formdata-polyfill/esm.min.js',{FormData(v){FormData=v}},1);


let s = 0;
const S = {
	START_BOUNDARY: s++,
	HEADER_FIELD_START: s++,
	HEADER_FIELD: s++,
	HEADER_VALUE_START: s++,
	HEADER_VALUE: s++,
	HEADER_VALUE_ALMOST_DONE: s++,
	HEADERS_ALMOST_DONE: s++,
	PART_DATA_START: s++,
	PART_DATA: s++,
	END: s++
};

let f = 1;
const F = {
	PART_BOUNDARY: f,
	LAST_BOUNDARY: f *= 2
};

const LF = 10;
const CR = 13;
const SPACE = 32;
const HYPHEN = 45;
const COLON = 58;
const A = 97;
const Z = 122;

const lower = c => c | 0x20;

const noop = () => {};

class MultipartParser {
	/**
	 * @param {string} boundary
	 */
	constructor(boundary) {
		this.index = 0;
		this.flags = 0;

		this.onHeaderEnd = noop;
		this.onHeaderField = noop;
		this.onHeadersEnd = noop;
		this.onHeaderValue = noop;
		this.onPartBegin = noop;
		this.onPartData = noop;
		this.onPartEnd = noop;

		this.boundaryChars = {};

		boundary = '\r\n--' + boundary;
		const ui8a = new Uint8Array(boundary.length);
		for (let i = 0; i < boundary.length; i++) {
			ui8a[i] = boundary.charCodeAt(i);
			this.boundaryChars[ui8a[i]] = true;
		}

		this.boundary = ui8a;
		this.lookbehind = new Uint8Array(this.boundary.length + 8);
		this.state = S.START_BOUNDARY;
	}

	/**
	 * @param {Uint8Array} data
	 */
	write(data) {
		let i = 0;
		const length_ = data.length;
		let previousIndex = this.index;
		let {lookbehind, boundary, boundaryChars, index, state, flags} = this;
		const boundaryLength = this.boundary.length;
		const boundaryEnd = boundaryLength - 1;
		const bufferLength = data.length;
		let c;
		let cl;

		const mark = name => {
			this[name + 'Mark'] = i;
		};

		const clear = name => {
			delete this[name + 'Mark'];
		};

		const callback = (callbackSymbol, start, end, ui8a) => {
			if (start === undefined || start !== end) {
				this[callbackSymbol](ui8a && ui8a.subarray(start, end));
			}
		};

		const dataCallback = (name, clear) => {
			const markSymbol = name + 'Mark';
			if (!(markSymbol in this)) {
				return;
			}

			if (clear) {
				callback(name, this[markSymbol], i, data);
				delete this[markSymbol];
			} else {
				callback(name, this[markSymbol], data.length, data);
				this[markSymbol] = 0;
			}
		};

		for (i = 0; i < length_; i++) {
			c = data[i];

			switch (state) {
				case S.START_BOUNDARY:
					if (index === boundary.length - 2) {
						if (c === HYPHEN) {
							flags |= F.LAST_BOUNDARY;
						} else if (c !== CR) {
							return;
						}

						index++;
						break;
					} else if (index - 1 === boundary.length - 2) {
						if (flags & F.LAST_BOUNDARY && c === HYPHEN) {
							state = S.END;
							flags = 0;
						} else if (!(flags & F.LAST_BOUNDARY) && c === LF) {
							index = 0;
							callback('onPartBegin');
							state = S.HEADER_FIELD_START;
						} else {
							return;
						}

						break;
					}

					if (c !== boundary[index + 2]) {
						index = -2;
					}

					if (c === boundary[index + 2]) {
						index++;
					}

					break;
				case S.HEADER_FIELD_START:
					state = S.HEADER_FIELD;
					mark('onHeaderField');
					index = 0;
					// falls through
				case S.HEADER_FIELD:
					if (c === CR) {
						clear('onHeaderField');
						state = S.HEADERS_ALMOST_DONE;
						break;
					}

					index++;
					if (c === HYPHEN) {
						break;
					}

					if (c === COLON) {
						if (index === 1) {
							// empty header field
							return;
						}

						dataCallback('onHeaderField', true);
						state = S.HEADER_VALUE_START;
						break;
					}

					cl = lower(c);
					if (cl < A || cl > Z) {
						return;
					}

					break;
				case S.HEADER_VALUE_START:
					if (c === SPACE) {
						break;
					}

					mark('onHeaderValue');
					state = S.HEADER_VALUE;
					// falls through
				case S.HEADER_VALUE:
					if (c === CR) {
						dataCallback('onHeaderValue', true);
						callback('onHeaderEnd');
						state = S.HEADER_VALUE_ALMOST_DONE;
					}

					break;
				case S.HEADER_VALUE_ALMOST_DONE:
					if (c !== LF) {
						return;
					}

					state = S.HEADER_FIELD_START;
					break;
				case S.HEADERS_ALMOST_DONE:
					if (c !== LF) {
						return;
					}

					callback('onHeadersEnd');
					state = S.PART_DATA_START;
					break;
				case S.PART_DATA_START:
					state = S.PART_DATA;
					mark('onPartData');
					// falls through
				case S.PART_DATA:
					previousIndex = index;

					if (index === 0) {
						// boyer-moore derrived algorithm to safely skip non-boundary data
						i += boundaryEnd;
						while (i < bufferLength && !(data[i] in boundaryChars)) {
							i += boundaryLength;
						}

						i -= boundaryEnd;
						c = data[i];
					}

					if (index < boundary.length) {
						if (boundary[index] === c) {
							if (index === 0) {
								dataCallback('onPartData', true);
							}

							index++;
						} else {
							index = 0;
						}
					} else if (index === boundary.length) {
						index++;
						if (c === CR) {
							// CR = part boundary
							flags |= F.PART_BOUNDARY;
						} else if (c === HYPHEN) {
							// HYPHEN = end boundary
							flags |= F.LAST_BOUNDARY;
						} else {
							index = 0;
						}
					} else if (index - 1 === boundary.length) {
						if (flags & F.PART_BOUNDARY) {
							index = 0;
							if (c === LF) {
								// unset the PART_BOUNDARY flag
								flags &= ~F.PART_BOUNDARY;
								callback('onPartEnd');
								callback('onPartBegin');
								state = S.HEADER_FIELD_START;
								break;
							}
						} else if (flags & F.LAST_BOUNDARY) {
							if (c === HYPHEN) {
								callback('onPartEnd');
								state = S.END;
								flags = 0;
							} else {
								index = 0;
							}
						} else {
							index = 0;
						}
					}

					if (index > 0) {
						// when matching a possible boundary, keep a lookbehind reference
						// in case it turns out to be a false lead
						lookbehind[index - 1] = c;
					} else if (previousIndex > 0) {
						// if our boundary turned out to be rubbish, the captured lookbehind
						// belongs to partData
						const _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
						callback('onPartData', 0, previousIndex, _lookbehind);
						previousIndex = 0;
						mark('onPartData');

						// reconsider the current character even so it interrupted the sequence
						// it could be the beginning of a new sequence
						i--;
					}

					break;
				case S.END:
					break;
				default:
					throw new Error(`Unexpected state entered: ${state}`);
			}
		}

		dataCallback('onHeaderField');
		dataCallback('onHeaderValue');
		dataCallback('onPartData');

		// Update properties for the next call
		this.index = index;
		this.state = state;
		this.flags = flags;
	}

	end() {
		if ((this.state === S.HEADER_FIELD_START && this.index === 0) ||
			(this.state === S.PART_DATA && this.index === this.boundary.length)) {
			this.onPartEnd();
		} else if (this.state !== S.END) {
			throw new Error('MultipartParser.end(): stream ended unexpectedly');
		}
	}
}

function _fileName(headerValue) {
	// matches either a quoted-string or a token (RFC 2616 section 19.5.1)
	const m = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
	if (!m) {
		return;
	}

	const match = m[2] || m[3] || '';
	let filename = match.slice(match.lastIndexOf('\\') + 1);
	filename = filename.replace(/%22/g, '"');
	filename = filename.replace(/&#(\d{4});/g, (m, code) => {
		return String.fromCharCode(code);
	});
	return filename;
}

async function toFormData(Body, ct) {
	if (!/multipart/i.test(ct)) {
		throw new TypeError('Failed to fetch');
	}

	const m = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);

	if (!m) {
		throw new TypeError('no or bad content-type header, no multipart boundary');
	}

	const parser = new MultipartParser(m[1] || m[2]);

	let headerField;
	let headerValue;
	let entryValue;
	let entryName;
	let contentType;
	let filename;
	const entryChunks = [];
	const formData = new FormData();

	const onPartData = ui8a => {
		entryValue += decoder.decode(ui8a, {stream: true});
	};

	const appendToFile = ui8a => {
		entryChunks.push(ui8a);
	};

	const appendFileToFormData = () => {
		const file = new File(entryChunks, filename, {type: contentType});
		formData.append(entryName, file);
	};

	const appendEntryToFormData = () => {
		formData.append(entryName, entryValue);
	};

	const decoder = new TextDecoder('utf-8');
	decoder.decode();

	parser.onPartBegin = function () {
		parser.onPartData = onPartData;
		parser.onPartEnd = appendEntryToFormData;

		headerField = '';
		headerValue = '';
		entryValue = '';
		entryName = '';
		contentType = '';
		filename = null;
		entryChunks.length = 0;
	};

	parser.onHeaderField = function (ui8a) {
		headerField += decoder.decode(ui8a, {stream: true});
	};

	parser.onHeaderValue = function (ui8a) {
		headerValue += decoder.decode(ui8a, {stream: true});
	};

	parser.onHeaderEnd = function () {
		headerValue += decoder.decode();
		headerField = headerField.toLowerCase();

		if (headerField === 'content-disposition') {
			// matches either a quoted-string or a token (RFC 2616 section 19.5.1)
			const m = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);

			if (m) {
				entryName = m[2] || m[3] || '';
			}

			filename = _fileName(headerValue);

			if (filename) {
				parser.onPartData = appendToFile;
				parser.onPartEnd = appendFileToFormData;
			}
		} else if (headerField === 'content-type') {
			contentType = headerValue;
		}

		headerValue = '';
		headerField = '';
	};

	for await (const chunk of Body) {
		parser.write(chunk);
	}

	parser.end();

	return formData;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"is-redirect.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/node-fetch/src/utils/is-redirect.js                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({isRedirect:()=>isRedirect},true);const redirectStatus = new Set([301, 302, 303, 307, 308]);

/**
 * Redirect code matching
 *
 * @param {number} code - Status code
 * @return {boolean}
 */
const isRedirect = code => {
	return redirectStatus.has(code);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"get-search.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/node-fetch/src/utils/get-search.js                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({getSearch:()=>getSearch},true);const getSearch = parsedURL => {
	if (parsedURL.search) {
		return parsedURL.search;
	}

	const lastOffset = parsedURL.href.length - 1;
	const hash = parsedURL.hash || (parsedURL.href[lastOffset] === '#' ? '#' : '');
	return parsedURL.href[lastOffset - hash.length] === '?' ? '?' : '';
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"referrer.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/node-fetch/src/utils/referrer.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({stripURLForUseAsAReferrer:()=>stripURLForUseAsAReferrer,validateReferrerPolicy:()=>validateReferrerPolicy,isOriginPotentiallyTrustworthy:()=>isOriginPotentiallyTrustworthy,isUrlPotentiallyTrustworthy:()=>isUrlPotentiallyTrustworthy,determineRequestsReferrer:()=>determineRequestsReferrer,parseReferrerPolicyFromHeader:()=>parseReferrerPolicyFromHeader});module.export({ReferrerPolicy:()=>ReferrerPolicy,DEFAULT_REFERRER_POLICY:()=>DEFAULT_REFERRER_POLICY},true);let isIP;module.link('node:net',{isIP(v){isIP=v}},0);

/**
 * @external URL
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/URL|URL}
 */

/**
 * @module utils/referrer
 * @private
 */

/**
 * @see {@link https://w3c.github.io/webappsec-referrer-policy/#strip-url|Referrer Policy §8.4. Strip url for use as a referrer}
 * @param {string} URL
 * @param {boolean} [originOnly=false]
 */
function stripURLForUseAsAReferrer(url, originOnly = false) {
	// 1. If url is null, return no referrer.
	if (url == null) { // eslint-disable-line no-eq-null, eqeqeq
		return 'no-referrer';
	}

	url = new URL(url);

	// 2. If url's scheme is a local scheme, then return no referrer.
	if (/^(about|blob|data):$/.test(url.protocol)) {
		return 'no-referrer';
	}

	// 3. Set url's username to the empty string.
	url.username = '';

	// 4. Set url's password to null.
	// Note: `null` appears to be a mistake as this actually results in the password being `"null"`.
	url.password = '';

	// 5. Set url's fragment to null.
	// Note: `null` appears to be a mistake as this actually results in the fragment being `"#null"`.
	url.hash = '';

	// 6. If the origin-only flag is true, then:
	if (originOnly) {
		// 6.1. Set url's path to null.
		// Note: `null` appears to be a mistake as this actually results in the path being `"/null"`.
		url.pathname = '';

		// 6.2. Set url's query to null.
		// Note: `null` appears to be a mistake as this actually results in the query being `"?null"`.
		url.search = '';
	}

	// 7. Return url.
	return url;
}

/**
 * @see {@link https://w3c.github.io/webappsec-referrer-policy/#enumdef-referrerpolicy|enum ReferrerPolicy}
 */
const ReferrerPolicy = new Set([
	'',
	'no-referrer',
	'no-referrer-when-downgrade',
	'same-origin',
	'origin',
	'strict-origin',
	'origin-when-cross-origin',
	'strict-origin-when-cross-origin',
	'unsafe-url'
]);

/**
 * @see {@link https://w3c.github.io/webappsec-referrer-policy/#default-referrer-policy|default referrer policy}
 */
const DEFAULT_REFERRER_POLICY = 'strict-origin-when-cross-origin';

/**
 * @see {@link https://w3c.github.io/webappsec-referrer-policy/#referrer-policies|Referrer Policy §3. Referrer Policies}
 * @param {string} referrerPolicy
 * @returns {string} referrerPolicy
 */
function validateReferrerPolicy(referrerPolicy) {
	if (!ReferrerPolicy.has(referrerPolicy)) {
		throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
	}

	return referrerPolicy;
}

/**
 * @see {@link https://w3c.github.io/webappsec-secure-contexts/#is-origin-trustworthy|Referrer Policy §3.2. Is origin potentially trustworthy?}
 * @param {external:URL} url
 * @returns `true`: "Potentially Trustworthy", `false`: "Not Trustworthy"
 */
function isOriginPotentiallyTrustworthy(url) {
	// 1. If origin is an opaque origin, return "Not Trustworthy".
	// Not applicable

	// 2. Assert: origin is a tuple origin.
	// Not for implementations

	// 3. If origin's scheme is either "https" or "wss", return "Potentially Trustworthy".
	if (/^(http|ws)s:$/.test(url.protocol)) {
		return true;
	}

	// 4. If origin's host component matches one of the CIDR notations 127.0.0.0/8 or ::1/128 [RFC4632], return "Potentially Trustworthy".
	const hostIp = url.host.replace(/(^\[)|(]$)/g, '');
	const hostIPVersion = isIP(hostIp);

	if (hostIPVersion === 4 && /^127\./.test(hostIp)) {
		return true;
	}

	if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) {
		return true;
	}

	// 5. If origin's host component is "localhost" or falls within ".localhost", and the user agent conforms to the name resolution rules in [let-localhost-be-localhost], return "Potentially Trustworthy".
	// We are returning FALSE here because we cannot ensure conformance to
	// let-localhost-be-loalhost (https://tools.ietf.org/html/draft-west-let-localhost-be-localhost)
	if (url.host === 'localhost' || url.host.endsWith('.localhost')) {
		return false;
	}

	// 6. If origin's scheme component is file, return "Potentially Trustworthy".
	if (url.protocol === 'file:') {
		return true;
	}

	// 7. If origin's scheme component is one which the user agent considers to be authenticated, return "Potentially Trustworthy".
	// Not supported

	// 8. If origin has been configured as a trustworthy origin, return "Potentially Trustworthy".
	// Not supported

	// 9. Return "Not Trustworthy".
	return false;
}

/**
 * @see {@link https://w3c.github.io/webappsec-secure-contexts/#is-url-trustworthy|Referrer Policy §3.3. Is url potentially trustworthy?}
 * @param {external:URL} url
 * @returns `true`: "Potentially Trustworthy", `false`: "Not Trustworthy"
 */
function isUrlPotentiallyTrustworthy(url) {
	// 1. If url is "about:blank" or "about:srcdoc", return "Potentially Trustworthy".
	if (/^about:(blank|srcdoc)$/.test(url)) {
		return true;
	}

	// 2. If url's scheme is "data", return "Potentially Trustworthy".
	if (url.protocol === 'data:') {
		return true;
	}

	// Note: The origin of blob: and filesystem: URLs is the origin of the context in which they were
	// created. Therefore, blobs created in a trustworthy origin will themselves be potentially
	// trustworthy.
	if (/^(blob|filesystem):$/.test(url.protocol)) {
		return true;
	}

	// 3. Return the result of executing §3.2 Is origin potentially trustworthy? on url's origin.
	return isOriginPotentiallyTrustworthy(url);
}

/**
 * Modifies the referrerURL to enforce any extra security policy considerations.
 * @see {@link https://w3c.github.io/webappsec-referrer-policy/#determine-requests-referrer|Referrer Policy §8.3. Determine request's Referrer}, step 7
 * @callback module:utils/referrer~referrerURLCallback
 * @param {external:URL} referrerURL
 * @returns {external:URL} modified referrerURL
 */

/**
 * Modifies the referrerOrigin to enforce any extra security policy considerations.
 * @see {@link https://w3c.github.io/webappsec-referrer-policy/#determine-requests-referrer|Referrer Policy §8.3. Determine request's Referrer}, step 7
 * @callback module:utils/referrer~referrerOriginCallback
 * @param {external:URL} referrerOrigin
 * @returns {external:URL} modified referrerOrigin
 */

/**
 * @see {@link https://w3c.github.io/webappsec-referrer-policy/#determine-requests-referrer|Referrer Policy §8.3. Determine request's Referrer}
 * @param {Request} request
 * @param {object} o
 * @param {module:utils/referrer~referrerURLCallback} o.referrerURLCallback
 * @param {module:utils/referrer~referrerOriginCallback} o.referrerOriginCallback
 * @returns {external:URL} Request's referrer
 */
function determineRequestsReferrer(request, {referrerURLCallback, referrerOriginCallback} = {}) {
	// There are 2 notes in the specification about invalid pre-conditions.  We return null, here, for
	// these cases:
	// > Note: If request's referrer is "no-referrer", Fetch will not call into this algorithm.
	// > Note: If request's referrer policy is the empty string, Fetch will not call into this
	// > algorithm.
	if (request.referrer === 'no-referrer' || request.referrerPolicy === '') {
		return null;
	}

	// 1. Let policy be request's associated referrer policy.
	const policy = request.referrerPolicy;

	// 2. Let environment be request's client.
	// not applicable to node.js

	// 3. Switch on request's referrer:
	if (request.referrer === 'about:client') {
		return 'no-referrer';
	}

	// "a URL": Let referrerSource be request's referrer.
	const referrerSource = request.referrer;

	// 4. Let request's referrerURL be the result of stripping referrerSource for use as a referrer.
	let referrerURL = stripURLForUseAsAReferrer(referrerSource);

	// 5. Let referrerOrigin be the result of stripping referrerSource for use as a referrer, with the
	//    origin-only flag set to true.
	let referrerOrigin = stripURLForUseAsAReferrer(referrerSource, true);

	// 6. If the result of serializing referrerURL is a string whose length is greater than 4096, set
	//    referrerURL to referrerOrigin.
	if (referrerURL.toString().length > 4096) {
		referrerURL = referrerOrigin;
	}

	// 7. The user agent MAY alter referrerURL or referrerOrigin at this point to enforce arbitrary
	//    policy considerations in the interests of minimizing data leakage. For example, the user
	//    agent could strip the URL down to an origin, modify its host, replace it with an empty
	//    string, etc.
	if (referrerURLCallback) {
		referrerURL = referrerURLCallback(referrerURL);
	}

	if (referrerOriginCallback) {
		referrerOrigin = referrerOriginCallback(referrerOrigin);
	}

	// 8.Execute the statements corresponding to the value of policy:
	const currentURL = new URL(request.url);

	switch (policy) {
		case 'no-referrer':
			return 'no-referrer';

		case 'origin':
			return referrerOrigin;

		case 'unsafe-url':
			return referrerURL;

		case 'strict-origin':
			// 1. If referrerURL is a potentially trustworthy URL and request's current URL is not a
			//    potentially trustworthy URL, then return no referrer.
			if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
				return 'no-referrer';
			}

			// 2. Return referrerOrigin.
			return referrerOrigin.toString();

		case 'strict-origin-when-cross-origin':
			// 1. If the origin of referrerURL and the origin of request's current URL are the same, then
			//    return referrerURL.
			if (referrerURL.origin === currentURL.origin) {
				return referrerURL;
			}

			// 2. If referrerURL is a potentially trustworthy URL and request's current URL is not a
			//    potentially trustworthy URL, then return no referrer.
			if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
				return 'no-referrer';
			}

			// 3. Return referrerOrigin.
			return referrerOrigin;

		case 'same-origin':
			// 1. If the origin of referrerURL and the origin of request's current URL are the same, then
			//    return referrerURL.
			if (referrerURL.origin === currentURL.origin) {
				return referrerURL;
			}

			// 2. Return no referrer.
			return 'no-referrer';

		case 'origin-when-cross-origin':
			// 1. If the origin of referrerURL and the origin of request's current URL are the same, then
			//    return referrerURL.
			if (referrerURL.origin === currentURL.origin) {
				return referrerURL;
			}

			// Return referrerOrigin.
			return referrerOrigin;

		case 'no-referrer-when-downgrade':
			// 1. If referrerURL is a potentially trustworthy URL and request's current URL is not a
			//    potentially trustworthy URL, then return no referrer.
			if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
				return 'no-referrer';
			}

			// 2. Return referrerURL.
			return referrerURL;

		default:
			throw new TypeError(`Invalid referrerPolicy: ${policy}`);
	}
}

/**
 * @see {@link https://w3c.github.io/webappsec-referrer-policy/#parse-referrer-policy-from-header|Referrer Policy §8.1. Parse a referrer policy from a Referrer-Policy header}
 * @param {Headers} headers Response headers
 * @returns {string} policy
 */
function parseReferrerPolicyFromHeader(headers) {
	// 1. Let policy-tokens be the result of extracting header list values given `Referrer-Policy`
	//    and response’s header list.
	const policyTokens = (headers.get('referrer-policy') || '').split(/[,\s]+/);

	// 2. Let policy be the empty string.
	let policy = '';

	// 3. For each token in policy-tokens, if token is a referrer policy and token is not the empty
	//    string, then set policy to token.
	// Note: This algorithm loops over multiple policy values to allow deployment of new policy
	// values with fallbacks for older user agents, as described in § 11.1 Unknown Policy Values.
	for (const token of policyTokens) {
		if (token && ReferrerPolicy.has(token)) {
			policy = token;
		}
	}

	// 4. Return policy.
	return policy;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"response.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/node-fetch/src/response.js                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({default:()=>Response});let Headers;module.link('./headers.js',{default(v){Headers=v}},0);let Body,clone,extractContentType;module.link('./body.js',{default(v){Body=v},clone(v){clone=v},extractContentType(v){extractContentType=v}},1);let isRedirect;module.link('./utils/is-redirect.js',{isRedirect(v){isRedirect=v}},2);/**
 * Response.js
 *
 * Response class provides content decoding
 */





const INTERNALS = Symbol('Response internals');

/**
 * Response class
 *
 * Ref: https://fetch.spec.whatwg.org/#response-class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response extends Body {
	constructor(body = null, options = {}) {
		super(body, options);

		// eslint-disable-next-line no-eq-null, eqeqeq, no-negated-condition
		const status = options.status != null ? options.status : 200;

		const headers = new Headers(options.headers);

		if (body !== null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body, this);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS] = {
			type: 'default',
			url: options.url,
			status,
			statusText: options.statusText || '',
			headers,
			counter: options.counter,
			highWaterMark: options.highWaterMark
		};
	}

	get type() {
		return this[INTERNALS].type;
	}

	get url() {
		return this[INTERNALS].url || '';
	}

	get status() {
		return this[INTERNALS].status;
	}

	/**
	 * Convenience property representing if the request ended normally
	 */
	get ok() {
		return this[INTERNALS].status >= 200 && this[INTERNALS].status < 300;
	}

	get redirected() {
		return this[INTERNALS].counter > 0;
	}

	get statusText() {
		return this[INTERNALS].statusText;
	}

	get headers() {
		return this[INTERNALS].headers;
	}

	get highWaterMark() {
		return this[INTERNALS].highWaterMark;
	}

	/**
	 * Clone this response
	 *
	 * @return  Response
	 */
	clone() {
		return new Response(clone(this, this.highWaterMark), {
			type: this.type,
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected,
			size: this.size,
			highWaterMark: this.highWaterMark
		});
	}

	/**
	 * @param {string} url    The URL that the new response is to originate from.
	 * @param {number} status An optional status code for the response (e.g., 302.)
	 * @returns {Response}    A Response object.
	 */
	static redirect(url, status = 302) {
		if (!isRedirect(status)) {
			throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
		}

		return new Response(null, {
			headers: {
				location: new URL(url).toString()
			},
			status
		});
	}

	static error() {
		const response = new Response(null, {status: 0, statusText: ''});
		response[INTERNALS].type = 'error';
		return response;
	}

	static json(data = undefined, init = {}) {
		const body = JSON.stringify(data);

		if (body === undefined) {
			throw new TypeError('data is not JSON serializable');
		}

		const headers = new Headers(init && init.headers);

		if (!headers.has('content-type')) {
			headers.set('content-type', 'application/json');
		}

		return new Response(body, {
			...init,
			headers
		});
	}

	get [Symbol.toStringTag]() {
		return 'Response';
	}
}

Object.defineProperties(Response.prototype, {
	type: {enumerable: true},
	url: {enumerable: true},
	status: {enumerable: true},
	ok: {enumerable: true},
	redirected: {enumerable: true},
	statusText: {enumerable: true},
	headers: {enumerable: true},
	clone: {enumerable: true}
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"headers.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/node-fetch/src/headers.js                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({default:()=>Headers,fromRawHeaders:()=>fromRawHeaders});let types;module.link('node:util',{types(v){types=v}},0);let http;module.link('node:http',{default(v){http=v}},1);/**
 * Headers.js
 *
 * Headers class offers convenient helpers
 */




/* c8 ignore next 9 */
const validateHeaderName = typeof http.validateHeaderName === 'function' ?
	http.validateHeaderName :
	name => {
		if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
			const error = new TypeError(`Header name must be a valid HTTP token [${name}]`);
			Object.defineProperty(error, 'code', {value: 'ERR_INVALID_HTTP_TOKEN'});
			throw error;
		}
	};

/* c8 ignore next 9 */
const validateHeaderValue = typeof http.validateHeaderValue === 'function' ?
	http.validateHeaderValue :
	(name, value) => {
		if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
			const error = new TypeError(`Invalid character in header content ["${name}"]`);
			Object.defineProperty(error, 'code', {value: 'ERR_INVALID_CHAR'});
			throw error;
		}
	};

/**
 * @typedef {Headers | Record<string, string> | Iterable<readonly [string, string]> | Iterable<Iterable<string>>} HeadersInit
 */

/**
 * This Fetch API interface allows you to perform various actions on HTTP request and response headers.
 * These actions include retrieving, setting, adding to, and removing.
 * A Headers object has an associated header list, which is initially empty and consists of zero or more name and value pairs.
 * You can add to this using methods like append() (see Examples.)
 * In all methods of this interface, header names are matched by case-insensitive byte sequence.
 *
 */
class Headers extends URLSearchParams {
	/**
	 * Headers class
	 *
	 * @constructor
	 * @param {HeadersInit} [init] - Response headers
	 */
	constructor(init) {
		// Validate and normalize init object in [name, value(s)][]
		/** @type {string[][]} */
		let result = [];
		if (init instanceof Headers) {
			const raw = init.raw();
			for (const [name, values] of Object.entries(raw)) {
				result.push(...values.map(value => [name, value]));
			}
		} else if (init == null) { // eslint-disable-line no-eq-null, eqeqeq
			// No op
		} else if (typeof init === 'object' && !types.isBoxedPrimitive(init)) {
			const method = init[Symbol.iterator];
			// eslint-disable-next-line no-eq-null, eqeqeq
			if (method == null) {
				// Record<ByteString, ByteString>
				result.push(...Object.entries(init));
			} else {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// Sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				result = [...init]
					.map(pair => {
						if (
							typeof pair !== 'object' || types.isBoxedPrimitive(pair)
						) {
							throw new TypeError('Each header pair must be an iterable object');
						}

						return [...pair];
					}).map(pair => {
						if (pair.length !== 2) {
							throw new TypeError('Each header pair must be a name/value tuple');
						}

						return [...pair];
					});
			}
		} else {
			throw new TypeError('Failed to construct \'Headers\': The provided value is not of type \'(sequence<sequence<ByteString>> or record<ByteString, ByteString>)');
		}

		// Validate and lowercase
		result =
			result.length > 0 ?
				result.map(([name, value]) => {
					validateHeaderName(name);
					validateHeaderValue(name, String(value));
					return [String(name).toLowerCase(), String(value)];
				}) :
				undefined;

		super(result);

		// Returning a Proxy that will lowercase key names, validate parameters and sort keys
		// eslint-disable-next-line no-constructor-return
		return new Proxy(this, {
			get(target, p, receiver) {
				switch (p) {
					case 'append':
					case 'set':
						return (name, value) => {
							validateHeaderName(name);
							validateHeaderValue(name, String(value));
							return URLSearchParams.prototype[p].call(
								target,
								String(name).toLowerCase(),
								String(value)
							);
						};

					case 'delete':
					case 'has':
					case 'getAll':
						return name => {
							validateHeaderName(name);
							return URLSearchParams.prototype[p].call(
								target,
								String(name).toLowerCase()
							);
						};

					case 'keys':
						return () => {
							target.sort();
							return new Set(URLSearchParams.prototype.keys.call(target)).keys();
						};

					default:
						return Reflect.get(target, p, receiver);
				}
			}
		});
		/* c8 ignore next */
	}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	toString() {
		return Object.prototype.toString.call(this);
	}

	get(name) {
		const values = this.getAll(name);
		if (values.length === 0) {
			return null;
		}

		let value = values.join(', ');
		if (/^content-encoding$/i.test(name)) {
			value = value.toLowerCase();
		}

		return value;
	}

	forEach(callback, thisArg = undefined) {
		for (const name of this.keys()) {
			Reflect.apply(callback, thisArg, [this.get(name), name, this]);
		}
	}

	* values() {
		for (const name of this.keys()) {
			yield this.get(name);
		}
	}

	/**
	 * @type {() => IterableIterator<[string, string]>}
	 */
	* entries() {
		for (const name of this.keys()) {
			yield [name, this.get(name)];
		}
	}

	[Symbol.iterator]() {
		return this.entries();
	}

	/**
	 * Node-fetch non-spec method
	 * returning all headers and their values as array
	 * @returns {Record<string, string[]>}
	 */
	raw() {
		return [...this.keys()].reduce((result, key) => {
			result[key] = this.getAll(key);
			return result;
		}, {});
	}

	/**
	 * For better console.log(headers) and also to convert Headers into Node.js Request compatible format
	 */
	[Symbol.for('nodejs.util.inspect.custom')]() {
		return [...this.keys()].reduce((result, key) => {
			const values = this.getAll(key);
			// Http.request() only supports string as Host header.
			// This hack makes specifying custom Host header possible.
			if (key === 'host') {
				result[key] = values[0];
			} else {
				result[key] = values.length > 1 ? values : values[0];
			}

			return result;
		}, {});
	}
}

/**
 * Re-shaping object for Web IDL tests
 * Only need to do it for overridden methods
 */
Object.defineProperties(
	Headers.prototype,
	['get', 'entries', 'forEach', 'values'].reduce((result, property) => {
		result[property] = {enumerable: true};
		return result;
	}, {})
);

/**
 * Create a Headers object from an http.IncomingMessage.rawHeaders, ignoring those that do
 * not conform to HTTP grammar productions.
 * @param {import('http').IncomingMessage['rawHeaders']} headers
 */
function fromRawHeaders(headers = []) {
	return new Headers(
		headers
			// Split into pairs
			.reduce((result, value, index, array) => {
				if (index % 2 === 0) {
					result.push(array.slice(index, index + 2));
				}

				return result;
			}, [])
			.filter(([name, value]) => {
				try {
					validateHeaderName(name);
					validateHeaderValue(name, String(value));
					return true;
				} catch {
					return false;
				}
			})

	);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"request.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/node-fetch/src/request.js                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({default:()=>Request});module.export({getNodeRequestOptions:()=>getNodeRequestOptions},true);let formatUrl;module.link('node:url',{format(v){formatUrl=v}},0);let deprecate;module.link('node:util',{deprecate(v){deprecate=v}},1);let Headers;module.link('./headers.js',{default(v){Headers=v}},2);let Body,clone,extractContentType,getTotalBytes;module.link('./body.js',{default(v){Body=v},clone(v){clone=v},extractContentType(v){extractContentType=v},getTotalBytes(v){getTotalBytes=v}},3);let isAbortSignal;module.link('./utils/is.js',{isAbortSignal(v){isAbortSignal=v}},4);let getSearch;module.link('./utils/get-search.js',{getSearch(v){getSearch=v}},5);let validateReferrerPolicy,determineRequestsReferrer,DEFAULT_REFERRER_POLICY;module.link('./utils/referrer.js',{validateReferrerPolicy(v){validateReferrerPolicy=v},determineRequestsReferrer(v){determineRequestsReferrer=v},DEFAULT_REFERRER_POLICY(v){DEFAULT_REFERRER_POLICY=v}},6);/**
 * Request.js
 *
 * Request class contains server only options
 *
 * All spec algorithm step numbers are based on https://fetch.spec.whatwg.org/commit-snapshots/ae716822cb3a61843226cd090eefc6589446c1d2/.
 */











const INTERNALS = Symbol('Request internals');

/**
 * Check if `obj` is an instance of Request.
 *
 * @param  {*} object
 * @return {boolean}
 */
const isRequest = object => {
	return (
		typeof object === 'object' &&
		typeof object[INTERNALS] === 'object'
	);
};

const doBadDataWarn = deprecate(() => {},
	'.data is not a valid RequestInit property, use .body instead',
	'https://github.com/node-fetch/node-fetch/issues/1000 (request)');

/**
 * Request class
 *
 * Ref: https://fetch.spec.whatwg.org/#request-class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request extends Body {
	constructor(input, init = {}) {
		let parsedURL;

		// Normalize input and force URL to be encoded as UTF-8 (https://github.com/node-fetch/node-fetch/issues/245)
		if (isRequest(input)) {
			parsedURL = new URL(input.url);
		} else {
			parsedURL = new URL(input);
			input = {};
		}

		if (parsedURL.username !== '' || parsedURL.password !== '') {
			throw new TypeError(`${parsedURL} is an url with embedded credentials.`);
		}

		let method = init.method || input.method || 'GET';
		if (/^(delete|get|head|options|post|put)$/i.test(method)) {
			method = method.toUpperCase();
		}

		if (!isRequest(init) && 'data' in init) {
			doBadDataWarn();
		}

		// eslint-disable-next-line no-eq-null, eqeqeq
		if ((init.body != null || (isRequest(input) && input.body !== null)) &&
			(method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		const inputBody = init.body ?
			init.body :
			(isRequest(input) && input.body !== null ?
				clone(input) :
				null);

		super(inputBody, {
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody !== null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody, this);
			if (contentType) {
				headers.set('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ?
			input.signal :
			null;
		if ('signal' in init) {
			signal = init.signal;
		}

		// eslint-disable-next-line no-eq-null, eqeqeq
		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal or EventTarget');
		}

		// §5.4, Request constructor steps, step 15.1
		// eslint-disable-next-line no-eq-null, eqeqeq
		let referrer = init.referrer == null ? input.referrer : init.referrer;
		if (referrer === '') {
			// §5.4, Request constructor steps, step 15.2
			referrer = 'no-referrer';
		} else if (referrer) {
			// §5.4, Request constructor steps, step 15.3.1, 15.3.2
			const parsedReferrer = new URL(referrer);
			// §5.4, Request constructor steps, step 15.3.3, 15.3.4
			referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? 'client' : parsedReferrer;
		} else {
			referrer = undefined;
		}

		this[INTERNALS] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal,
			referrer
		};

		// Node-fetch-only options
		this.follow = init.follow === undefined ? (input.follow === undefined ? 20 : input.follow) : init.follow;
		this.compress = init.compress === undefined ? (input.compress === undefined ? true : input.compress) : init.compress;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
		this.highWaterMark = init.highWaterMark || input.highWaterMark || 16384;
		this.insecureHTTPParser = init.insecureHTTPParser || input.insecureHTTPParser || false;

		// §5.4, Request constructor steps, step 16.
		// Default is empty string per https://fetch.spec.whatwg.org/#concept-request-referrer-policy
		this.referrerPolicy = init.referrerPolicy || input.referrerPolicy || '';
	}

	/** @returns {string} */
	get method() {
		return this[INTERNALS].method;
	}

	/** @returns {string} */
	get url() {
		return formatUrl(this[INTERNALS].parsedURL);
	}

	/** @returns {Headers} */
	get headers() {
		return this[INTERNALS].headers;
	}

	get redirect() {
		return this[INTERNALS].redirect;
	}

	/** @returns {AbortSignal} */
	get signal() {
		return this[INTERNALS].signal;
	}

	// https://fetch.spec.whatwg.org/#dom-request-referrer
	get referrer() {
		if (this[INTERNALS].referrer === 'no-referrer') {
			return '';
		}

		if (this[INTERNALS].referrer === 'client') {
			return 'about:client';
		}

		if (this[INTERNALS].referrer) {
			return this[INTERNALS].referrer.toString();
		}

		return undefined;
	}

	get referrerPolicy() {
		return this[INTERNALS].referrerPolicy;
	}

	set referrerPolicy(referrerPolicy) {
		this[INTERNALS].referrerPolicy = validateReferrerPolicy(referrerPolicy);
	}

	/**
	 * Clone this request
	 *
	 * @return  Request
	 */
	clone() {
		return new Request(this);
	}

	get [Symbol.toStringTag]() {
		return 'Request';
	}
}

Object.defineProperties(Request.prototype, {
	method: {enumerable: true},
	url: {enumerable: true},
	headers: {enumerable: true},
	redirect: {enumerable: true},
	clone: {enumerable: true},
	signal: {enumerable: true},
	referrer: {enumerable: true},
	referrerPolicy: {enumerable: true}
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param {Request} request - A Request instance
 * @return The options object to be passed to http.request
 */
const getNodeRequestOptions = request => {
	const {parsedURL} = request[INTERNALS];
	const headers = new Headers(request[INTERNALS].headers);

	// Fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body === null && /^(post|put)$/i.test(request.method)) {
		contentLengthValue = '0';
	}

	if (request.body !== null) {
		const totalBytes = getTotalBytes(request);
		// Set Content-Length if totalBytes is a number (that is not NaN)
		if (typeof totalBytes === 'number' && !Number.isNaN(totalBytes)) {
			contentLengthValue = String(totalBytes);
		}
	}

	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// 4.1. Main fetch, step 2.6
	// > If request's referrer policy is the empty string, then set request's referrer policy to the
	// > default referrer policy.
	if (request.referrerPolicy === '') {
		request.referrerPolicy = DEFAULT_REFERRER_POLICY;
	}

	// 4.1. Main fetch, step 2.7
	// > If request's referrer is not "no-referrer", set request's referrer to the result of invoking
	// > determine request's referrer.
	if (request.referrer && request.referrer !== 'no-referrer') {
		request[INTERNALS].referrer = determineRequestsReferrer(request);
	} else {
		request[INTERNALS].referrer = 'no-referrer';
	}

	// 4.5. HTTP-network-or-cache fetch, step 6.9
	// > If httpRequest's referrer is a URL, then append `Referer`/httpRequest's referrer, serialized
	// >  and isomorphic encoded, to httpRequest's header list.
	if (request[INTERNALS].referrer instanceof URL) {
		headers.set('Referer', request.referrer);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip, deflate, br');
	}

	let {agent} = request;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	const search = getSearch(parsedURL);

	// Pass the full URL directly to request(), but overwrite the following
	// options:
	const options = {
		// Overwrite search to retain trailing ? (issue #776)
		path: parsedURL.pathname + search,
		// The following options are not expressed in the URL
		method: request.method,
		headers: headers[Symbol.for('nodejs.util.inspect.custom')](),
		insecureHTTPParser: request.insecureHTTPParser,
		agent
	};

	return {
		/** @type {URL} */
		parsedURL,
		options
	};
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"data-uri-to-buffer":{"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/data-uri-to-buffer/package.json                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = {
  "name": "data-uri-to-buffer",
  "version": "4.0.1",
  "main": "./dist/index.js"
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"dist":{"index.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/data-uri-to-buffer/dist/index.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({dataUriToBuffer:()=>dataUriToBuffer});/**
 * Returns a `Buffer` instance from the given data URI `uri`.
 *
 * @param {String} uri Data URI to turn into a Buffer instance
 * @returns {Buffer} Buffer instance from Data URI
 * @api public
 */
function dataUriToBuffer(uri) {
    if (!/^data:/i.test(uri)) {
        throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
    }
    // strip newlines
    uri = uri.replace(/\r?\n/g, '');
    // split the URI up into the "metadata" and the "data" portions
    const firstComma = uri.indexOf(',');
    if (firstComma === -1 || firstComma <= 4) {
        throw new TypeError('malformed data: URI');
    }
    // remove the "data:" scheme and parse the metadata
    const meta = uri.substring(5, firstComma).split(';');
    let charset = '';
    let base64 = false;
    const type = meta[0] || 'text/plain';
    let typeFull = type;
    for (let i = 1; i < meta.length; i++) {
        if (meta[i] === 'base64') {
            base64 = true;
        }
        else if (meta[i]) {
            typeFull += `;${meta[i]}`;
            if (meta[i].indexOf('charset=') === 0) {
                charset = meta[i].substring(8);
            }
        }
    }
    // defaults to US-ASCII only if type is not provided
    if (!meta[0] && !charset.length) {
        typeFull += ';charset=US-ASCII';
        charset = 'US-ASCII';
    }
    // get the encoded data portion and decode URI-encoded chars
    const encoding = base64 ? 'base64' : 'ascii';
    const data = unescape(uri.substring(firstComma + 1));
    const buffer = Buffer.from(data, encoding);
    // set `.type` and `.typeFull` properties to MIME type
    buffer.type = type;
    buffer.typeFull = typeFull;
    // set the `.charset` property
    buffer.charset = charset;
    return buffer;
}
module.exportDefault(dataUriToBuffer);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"fetch-blob":{"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/fetch-blob/package.json                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = {
  "name": "fetch-blob",
  "version": "3.2.0",
  "main": "index.js"
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/fetch-blob/index.js                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({Blob:()=>Blob},true);module.link('./streams.cjs');/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */

// TODO (jimmywarting): in the feature use conditional loading with top level await (requires 14.x)
// Node has recently added whatwg stream into core



// 64 KiB (same size chrome slice theirs blob into Uint8array's)
const POOL_SIZE = 65536

/** @param {(Blob | Uint8Array)[]} parts */
async function * toIterator (parts, clone = true) {
  for (const part of parts) {
    if ('stream' in part) {
      yield * (/** @type {AsyncIterableIterator<Uint8Array>} */ (part.stream()))
    } else if (ArrayBuffer.isView(part)) {
      if (clone) {
        let position = part.byteOffset
        const end = part.byteOffset + part.byteLength
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE)
          const chunk = part.buffer.slice(position, position + size)
          position += chunk.byteLength
          yield new Uint8Array(chunk)
        }
      } else {
        yield part
      }
    /* c8 ignore next 10 */
    } else {
      // For blobs that have arrayBuffer but no stream method (nodes buffer.Blob)
      let position = 0, b = (/** @type {Blob} */ (part))
      while (position !== b.size) {
        const chunk = b.slice(position, Math.min(b.size, position + POOL_SIZE))
        const buffer = await chunk.arrayBuffer()
        position += buffer.byteLength
        yield new Uint8Array(buffer)
      }
    }
  }
}

const _Blob = class Blob {
  /** @type {Array.<(Blob|Uint8Array)>} */
  #parts = []
  #type = ''
  #size = 0
  #endings = 'transparent'

  /**
   * The Blob() constructor returns a new Blob object. The content
   * of the blob consists of the concatenation of the values given
   * in the parameter array.
   *
   * @param {*} blobParts
   * @param {{ type?: string, endings?: string }} [options]
   */
  constructor (blobParts = [], options = {}) {
    if (typeof blobParts !== 'object' || blobParts === null) {
      throw new TypeError('Failed to construct \'Blob\': The provided value cannot be converted to a sequence.')
    }

    if (typeof blobParts[Symbol.iterator] !== 'function') {
      throw new TypeError('Failed to construct \'Blob\': The object must have a callable @@iterator property.')
    }

    if (typeof options !== 'object' && typeof options !== 'function') {
      throw new TypeError('Failed to construct \'Blob\': parameter 2 cannot convert to dictionary.')
    }

    if (options === null) options = {}

    const encoder = new TextEncoder()
    for (const element of blobParts) {
      let part
      if (ArrayBuffer.isView(element)) {
        part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength))
      } else if (element instanceof ArrayBuffer) {
        part = new Uint8Array(element.slice(0))
      } else if (element instanceof Blob) {
        part = element
      } else {
        part = encoder.encode(`${element}`)
      }

      this.#size += ArrayBuffer.isView(part) ? part.byteLength : part.size
      this.#parts.push(part)
    }

    this.#endings = `${options.endings === undefined ? 'transparent' : options.endings}`
    const type = options.type === undefined ? '' : String(options.type)
    this.#type = /^[\x20-\x7E]*$/.test(type) ? type : ''
  }

  /**
   * The Blob interface's size property returns the
   * size of the Blob in bytes.
   */
  get size () {
    return this.#size
  }

  /**
   * The type property of a Blob object returns the MIME type of the file.
   */
  get type () {
    return this.#type
  }

  /**
   * The text() method in the Blob interface returns a Promise
   * that resolves with a string containing the contents of
   * the blob, interpreted as UTF-8.
   *
   * @return {Promise<string>}
   */
  async text () {
    // More optimized than using this.arrayBuffer()
    // that requires twice as much ram
    const decoder = new TextDecoder()
    let str = ''
    for await (const part of toIterator(this.#parts, false)) {
      str += decoder.decode(part, { stream: true })
    }
    // Remaining
    str += decoder.decode()
    return str
  }

  /**
   * The arrayBuffer() method in the Blob interface returns a
   * Promise that resolves with the contents of the blob as
   * binary data contained in an ArrayBuffer.
   *
   * @return {Promise<ArrayBuffer>}
   */
  async arrayBuffer () {
    // Easier way... Just a unnecessary overhead
    // const view = new Uint8Array(this.size);
    // await this.stream().getReader({mode: 'byob'}).read(view);
    // return view.buffer;

    const data = new Uint8Array(this.size)
    let offset = 0
    for await (const chunk of toIterator(this.#parts, false)) {
      data.set(chunk, offset)
      offset += chunk.length
    }

    return data.buffer
  }

  stream () {
    const it = toIterator(this.#parts, true)

    return new globalThis.ReadableStream({
      // @ts-ignore
      type: 'bytes',
      async pull (ctrl) {
        const chunk = await it.next()
        chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value)
      },

      async cancel () {
        await it.return()
      }
    })
  }

  /**
   * The Blob interface's slice() method creates and returns a
   * new Blob object which contains data from a subset of the
   * blob on which it's called.
   *
   * @param {number} [start]
   * @param {number} [end]
   * @param {string} [type]
   */
  slice (start = 0, end = this.size, type = '') {
    const { size } = this

    let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size)
    let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size)

    const span = Math.max(relativeEnd - relativeStart, 0)
    const parts = this.#parts
    const blobParts = []
    let added = 0

    for (const part of parts) {
      // don't add the overflow to new blobParts
      if (added >= span) {
        break
      }

      const size = ArrayBuffer.isView(part) ? part.byteLength : part.size
      if (relativeStart && size <= relativeStart) {
        // Skip the beginning and change the relative
        // start & end position as we skip the unwanted parts
        relativeStart -= size
        relativeEnd -= size
      } else {
        let chunk
        if (ArrayBuffer.isView(part)) {
          chunk = part.subarray(relativeStart, Math.min(size, relativeEnd))
          added += chunk.byteLength
        } else {
          chunk = part.slice(relativeStart, Math.min(size, relativeEnd))
          added += chunk.size
        }
        relativeEnd -= size
        blobParts.push(chunk)
        relativeStart = 0 // All next sequential parts should start at 0
      }
    }

    const blob = new Blob([], { type: String(type).toLowerCase() })
    blob.#size = span
    blob.#parts = blobParts

    return blob
  }

  get [Symbol.toStringTag] () {
    return 'Blob'
  }

  static [Symbol.hasInstance] (object) {
    return (
      object &&
      typeof object === 'object' &&
      typeof object.constructor === 'function' &&
      (
        typeof object.stream === 'function' ||
        typeof object.arrayBuffer === 'function'
      ) &&
      /^(Blob|File)$/.test(object[Symbol.toStringTag])
    )
  }
}

Object.defineProperties(_Blob.prototype, {
  size: { enumerable: true },
  type: { enumerable: true },
  slice: { enumerable: true }
})

/** @type {typeof globalThis.Blob} */
const Blob = _Blob
module.exportDefault(Blob);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"streams.cjs":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/fetch-blob/streams.cjs                                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.useNode();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"file.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/fetch-blob/file.js                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({File:()=>File},true);let Blob;module.link('./index.js',{default(v){Blob=v}},0);

const _File = class File extends Blob {
  #lastModified = 0
  #name = ''

  /**
   * @param {*[]} fileBits
   * @param {string} fileName
   * @param {{lastModified?: number, type?: string}} options
   */// @ts-ignore
  constructor (fileBits, fileName, options = {}) {
    if (arguments.length < 2) {
      throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`)
    }
    super(fileBits, options)

    if (options === null) options = {}

    // Simulate WebIDL type casting for NaN value in lastModified option.
    const lastModified = options.lastModified === undefined ? Date.now() : Number(options.lastModified)
    if (!Number.isNaN(lastModified)) {
      this.#lastModified = lastModified
    }

    this.#name = String(fileName)
  }

  get name () {
    return this.#name
  }

  get lastModified () {
    return this.#lastModified
  }

  get [Symbol.toStringTag] () {
    return 'File'
  }

  static [Symbol.hasInstance] (object) {
    return !!object && object instanceof Blob &&
      /^(File)$/.test(object[Symbol.toStringTag])
  }
}

/** @type {typeof globalThis.File} */// @ts-ignore
const File = _File
module.exportDefault(File);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"from.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/fetch-blob/from.js                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({File:()=>File,Blob:()=>Blob,blobFrom:()=>blobFrom,blobFromSync:()=>blobFromSync,fileFrom:()=>fileFrom,fileFromSync:()=>fileFromSync});let statSync,createReadStream,fs;module.link('node:fs',{statSync(v){statSync=v},createReadStream(v){createReadStream=v},promises(v){fs=v}},0);let basename;module.link('node:path',{basename(v){basename=v}},1);let DOMException;module.link('node-domexception',{default(v){DOMException=v}},2);let File;module.link('./file.js',{default(v){File=v}},3);let Blob;module.link('./index.js',{default(v){Blob=v}},4);






const { stat } = fs

/**
 * @param {string} path filepath on the disk
 * @param {string} [type] mimetype to use
 */
const blobFromSync = (path, type) => fromBlob(statSync(path), path, type)

/**
 * @param {string} path filepath on the disk
 * @param {string} [type] mimetype to use
 * @returns {Promise<Blob>}
 */
const blobFrom = (path, type) => stat(path).then(stat => fromBlob(stat, path, type))

/**
 * @param {string} path filepath on the disk
 * @param {string} [type] mimetype to use
 * @returns {Promise<File>}
 */
const fileFrom = (path, type) => stat(path).then(stat => fromFile(stat, path, type))

/**
 * @param {string} path filepath on the disk
 * @param {string} [type] mimetype to use
 */
const fileFromSync = (path, type) => fromFile(statSync(path), path, type)

// @ts-ignore
const fromBlob = (stat, path, type = '') => new Blob([new BlobDataItem({
  path,
  size: stat.size,
  lastModified: stat.mtimeMs,
  start: 0
})], { type })

// @ts-ignore
const fromFile = (stat, path, type = '') => new File([new BlobDataItem({
  path,
  size: stat.size,
  lastModified: stat.mtimeMs,
  start: 0
})], basename(path), { type, lastModified: stat.mtimeMs })

/**
 * This is a blob backed up by a file on the disk
 * with minium requirement. Its wrapped around a Blob as a blobPart
 * so you have no direct access to this.
 *
 * @private
 */
class BlobDataItem {
  #path
  #start

  constructor (options) {
    this.#path = options.path
    this.#start = options.start
    this.size = options.size
    this.lastModified = options.lastModified
  }

  /**
   * Slicing arguments is first validated and formatted
   * to not be out of range by Blob.prototype.slice
   */
  slice (start, end) {
    return new BlobDataItem({
      path: this.#path,
      lastModified: this.lastModified,
      size: end - start,
      start: this.#start + start
    })
  }

  async * stream () {
    const { mtimeMs } = await stat(this.#path)
    if (mtimeMs > this.lastModified) {
      throw new DOMException('The requested file could not be read, typically due to permission problems that have occurred after a reference to a file was acquired.', 'NotReadableError')
    }
    yield * createReadStream(this.#path, {
      start: this.#start,
      end: this.#start + this.size - 1
    })
  }

  get [Symbol.toStringTag] () {
    return 'Blob'
  }
}

module.exportDefault(blobFromSync);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"formdata-polyfill":{"esm.min.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/formdata-polyfill/esm.min.js                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.export({formDataToBlob:()=>formDataToBlob});module.export({File:()=>File,FormData:()=>FormData},true);let C;module.link('fetch-blob',{default(v){C=v}},0);let F;module.link('fetch-blob/file.js',{default(v){F=v}},1);/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */




var {toStringTag:t,iterator:i,hasInstance:h}=Symbol,
r=Math.random,
m='append,set,get,getAll,delete,keys,values,entries,forEach,constructor'.split(','),
f=(a,b,c)=>(a+='',/^(Blob|File)$/.test(b && b[t])?[(c=c!==void 0?c+'':b[t]=='File'?b.name:'blob',a),b.name!==c||b[t]=='blob'?new F([b],c,b):b]:[a,b+'']),
e=(c,f)=>(f?c:c.replace(/\r?\n|\r/g,'\r\n')).replace(/\n/g,'%0A').replace(/\r/g,'%0D').replace(/"/g,'%22'),
x=(n, a, e)=>{if(a.length<e){throw new TypeError(`Failed to execute '${n}' on 'FormData': ${e} arguments required, but only ${a.length} present.`)}}

const File = F

/** @type {typeof globalThis.FormData} */
const FormData = class FormData {
#d=[];
constructor(...a){if(a.length)throw new TypeError(`Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.`)}
get [t]() {return 'FormData'}
[i](){return this.entries()}
static [h](o) {return o&&typeof o==='object'&&o[t]==='FormData'&&!m.some(m=>typeof o[m]!='function')}
append(...a){x('append',arguments,2);this.#d.push(f(...a))}
delete(a){x('delete',arguments,1);a+='';this.#d=this.#d.filter(([b])=>b!==a)}
get(a){x('get',arguments,1);a+='';for(var b=this.#d,l=b.length,c=0;c<l;c++)if(b[c][0]===a)return b[c][1];return null}
getAll(a,b){x('getAll',arguments,1);b=[];a+='';this.#d.forEach(c=>c[0]===a&&b.push(c[1]));return b}
has(a){x('has',arguments,1);a+='';return this.#d.some(b=>b[0]===a)}
forEach(a,b){x('forEach',arguments,1);for(var [c,d]of this)a.call(b,d,c,this)}
set(...a){x('set',arguments,2);var b=[],c=!0;a=f(...a);this.#d.forEach(d=>{d[0]===a[0]?c&&(c=!b.push(a)):b.push(d)});c&&b.push(a);this.#d=b}
*entries(){yield*this.#d}
*keys(){for(var[a]of this)yield a}
*values(){for(var[,a]of this)yield a}}

/** @param {FormData} F */
function formDataToBlob (F,B=C){
var b=`${r()}${r()}`.replace(/\./g, '').slice(-28).padStart(32, '-'),c=[],p=`--${b}\r\nContent-Disposition: form-data; name="`
F.forEach((v,n)=>typeof v=='string'
?c.push(p+e(n)+`"\r\n\r\n${v.replace(/\r(?!\n)|(?<!\r)\n/g, '\r\n')}\r\n`)
:c.push(p+e(n)+`"; filename="${e(v.name, 1)}"\r\nContent-Type: ${v.type||"application/octet-stream"}\r\n\r\n`, v, '\r\n'))
c.push(`--${b}--`)
return new B(c,{type:"multipart/form-data; boundary="+b})}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"node-domexception":{"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/node-domexception/package.json                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = {
  "name": "node-domexception",
  "version": "1.0.0",
  "main": "index.js"
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/node-domexception/index.js                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.useNode();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"prop-types":{"package.json":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/prop-types/package.json                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.exports = {
  "name": "prop-types",
  "version": "15.8.1",
  "main": "index.js"
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// node_modules/prop-types/index.js                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
module.useNode();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},{
  "extensions": [
    ".js",
    ".json",
    ".mjs",
    ".jsx",
    ".i18n.yml"
  ]
});

var exports = require("/node_modules/meteor/modules/server.js");

/* Exports */
Package._define("modules", exports, {
  meteorInstall: meteorInstall
});

})();
