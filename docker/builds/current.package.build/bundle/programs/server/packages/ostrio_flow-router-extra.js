(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var meteorInstall = Package.modules.meteorInstall;
var ECMAScript = Package.ecmascript.ECMAScript;
var Promise = Package.promise.Promise;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var ReactiveDict = Package['reactive-dict'].ReactiveDict;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var EJSON = Package.ejson.EJSON;
var check = Package.check.check;
var Match = Package.check.Match;

var require = meteorInstall({"node_modules":{"meteor":{"ostrio:flow-router-extra":{"server":{"_init.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/ostrio_flow-router-extra/server/_init.js                                                //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
module.export({
  FlowRouter: () => FlowRouter,
  Router: () => Router,
  Route: () => Route,
  Group: () => Group,
  Triggers: () => Triggers,
  BlazeRenderer: () => BlazeRenderer
});
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }
}, 0);
let Router;
module.link("./router.js", {
  default(v) {
    Router = v;
  }
}, 1);
let Route;
module.link("./route.js", {
  default(v) {
    Route = v;
  }
}, 2);
let Group;
module.link("./group.js", {
  default(v) {
    Group = v;
  }
}, 3);
module.link("./plugins/fast-render.js");
if (Package['meteorhacks:inject-data']) {
  Meteor._debug('`meteorhacks:inject-data` is deprecated, please remove it and install its successor - `communitypackages:inject-data`');
  Meteor._debug('meteor remove meteorhacks:inject-data');
  Meteor._debug('meteor add communitypackages:inject-data');
}
if (Package['meteorhacks:fast-render']) {
  Meteor._debug('`meteorhacks:fast-render` is deprecated, please remove it and install its successor - `communitypackages:fast-render`');
  Meteor._debug('meteor remove meteorhacks:fast-render');
  Meteor._debug('meteor add communitypackages:fast-render');
}
if (Package['staringatlights:inject-data']) {
  Meteor._debug('`staringatlights:inject-data` is deprecated, please remove it and install its successor - `communitypackages:inject-data`');
  Meteor._debug('meteor remove staringatlights:inject-data');
  Meteor._debug('meteor add communitypackages:inject-data');
}
if (Package['staringatlights:fast-render']) {
  Meteor._debug('`staringatlights:fast-render` is deprecated, please remove it and install its successor - `communitypackages:fast-render`');
  Meteor._debug('meteor remove staringatlights:fast-render');
  Meteor._debug('meteor add communitypackages:fast-render');
}
const Triggers = {};
const BlazeRenderer = {};
const FlowRouter = new Router();
FlowRouter.Router = Router;
FlowRouter.Route = Route;
//////////////////////////////////////////////////////////////////////////////////////////////////////

},"group.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/ostrio_flow-router-extra/server/group.js                                                //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
let _helpers;
module.link("./../lib/_helpers.js", {
  _helpers(v) {
    _helpers = v;
  }
}, 0);
const makeTrigger = trigger => {
  if (_helpers.isFunction(trigger)) {
    return [trigger];
  } else if (!_helpers.isArray(trigger)) {
    return [];
  }
  return trigger;
};
const makeTriggers = (_base, _triggers) => {
  if (!_base && !_triggers) {
    return [];
  }
  return makeTrigger(_base).concat(makeTrigger(_triggers));
};
class Group {
  constructor(router) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let parent = arguments.length > 2 ? arguments[2] : undefined;
    if (options.prefix && !/^\//.test(options.prefix)) {
      throw new Error('group\'s prefix must start with "/"');
    }
    this._router = router;
    this.prefix = options.prefix || '';
    this.name = options.name;
    this.options = options;
    this._triggersEnter = makeTriggers(options.triggersEnter, this._triggersEnter);
    this._triggersExit = makeTriggers(this._triggersExit, options.triggersExit);
    this._subscriptions = options.subscriptions || Function.prototype;
    this.parent = parent;
    if (this.parent) {
      this.prefix = parent.prefix + this.prefix;
      this._triggersEnter = makeTriggers(parent._triggersEnter, this._triggersEnter);
      this._triggersExit = makeTriggers(this._triggersExit, parent._triggersExit);
    }
  }
  route(_pathDef) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let _group = arguments.length > 2 ? arguments[2] : undefined;
    if (!/^\//.test(_pathDef)) {
      throw new Error('route\'s path must start with "/"');
    }
    const group = _group || this;
    const pathDef = this.prefix + _pathDef;
    options.triggersEnter = makeTriggers(this._triggersEnter, options.triggersEnter);
    options.triggersExit = makeTriggers(options.triggersExit, this._triggersExit);
    return this._router.route(pathDef, _helpers.extend(_helpers.omit(this.options, ['triggersEnter', 'triggersExit', 'subscriptions', 'prefix', 'waitOn', 'name', 'title', 'titlePrefix', 'link', 'script', 'meta']), options), group);
  }
  group(options) {
    return new Group(this._router, options, this);
  }
}
module.exportDefault(Group);
//////////////////////////////////////////////////////////////////////////////////////////////////////

},"route.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/ostrio_flow-router-extra/server/route.js                                                //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
class Route {
  constructor(router, pathDef) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    this.options = options;
    this.name = options.name;
    this.pathDef = pathDef;

    // Route.path is deprecated and will be removed in 3.0
    this.path = pathDef;
    this.action = options.action || Function.prototype;
    this.subscriptions = options.subscriptions || Function.prototype;
    this._subsMap = {};
  }
  register(name, sub) {
    this._subsMap[name] = sub;
  }
  subscription(name) {
    return this._subsMap[name];
  }
  middleware() {
    // ?
  }
}
module.exportDefault(Route);
//////////////////////////////////////////////////////////////////////////////////////////////////////

},"router.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/ostrio_flow-router-extra/server/router.js                                               //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
let page;
module.link("page", {
  default(v) {
    page = v;
  }
}, 0);
let Route;
module.link("./route.js", {
  default(v) {
    Route = v;
  }
}, 1);
let Group;
module.link("./group.js", {
  default(v) {
    Group = v;
  }
}, 2);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }
}, 3);
let _helpers;
module.link("../lib/_helpers.js", {
  _helpers(v) {
    _helpers = v;
  }
}, 4);
const qs = require('qs');
class Router {
  constructor() {
    this.pathRegExp = /(:[\w\(\)\\\+\*\.\?\[\]\-]+)+/g;
    this._routes = [];
    this._routesMap = {};
    this._current = {};
    this._specialChars = ['/', '%', '+'];
    this._encodeParam = param => {
      const paramArr = param.split('');
      let _param = '';
      for (let i = 0; i < paramArr.length; i++) {
        if (this._specialChars.includes(paramArr[i])) {
          _param += encodeURIComponent(encodeURIComponent(paramArr[i]));
        } else {
          try {
            _param += encodeURIComponent(paramArr[i]);
          } catch (e) {
            _param += paramArr[i];
          }
        }
      }
      return _param;
    };
    this.subscriptions = Function.prototype;

    // holds onRoute callbacks
    this._onRouteCallbacks = [];
    this.triggers = {
      enter() {
        // client only
      },
      exit() {
        // client only
      }
    };
  }
  matchPath(path) {
    const params = {};
    const route = this._routes.find(r => {
      const pageRoute = new page.Route(r.pathDef);
      return pageRoute.match(path, params);
    });
    if (!route) {
      return null;
    }
    return {
      params: _helpers.clone(params),
      route: _helpers.clone(route)
    };
  }
  setCurrent(current) {
    this._current = current;
  }
  route(pathDef) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!/^\/.*/.test(pathDef) && pathDef !== '*') {
      throw new Error('route\'s path must start with "/"');
    }
    const route = new Route(this, pathDef, options);
    this._routes.push(route);
    if (options.name) {
      this._routesMap[options.name] = route;
    }
    this._triggerRouteRegister(route);
    return route;
  }
  group(options) {
    return new Group(this, options);
  }
  path(_pathDef) {
    let fields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let queryParams = arguments.length > 2 ? arguments[2] : undefined;
    let pathDef = _pathDef;
    if (this._routesMap[pathDef]) {
      pathDef = this._routesMap[pathDef].path;
    }
    let path = pathDef.replace(this.pathRegExp, _key => {
      const firstRegexpChar = _key.indexOf('(');
      // get the content behind : and (\\d+/)
      let key = _key.substring(1, firstRegexpChar > 0 ? firstRegexpChar : undefined);
      // remove +?*
      key = key.replace(/[\+\*\?]+/g, '');
      if (fields[key]) {
        return this._encodeParam("".concat(fields[key]));
      }
      return '';
    });
    path = path.replace(/\/\/+/g, '/'); // Replace multiple slashes with single slash

    // remove trailing slash
    // but keep the root slash if it's the only one
    path = path.match(/^\/{1}$/) ? path : path.replace(/\/$/, '');
    const strQueryParams = qs.stringify(queryParams || {});
    if (strQueryParams) {
      path += "?".concat(strQueryParams);
    }
    return path;
  }
  onRouteRegister(cb) {
    this._onRouteCallbacks.push(cb);
  }
  _triggerRouteRegister(currentRoute) {
    // We should only need to send a safe set of fields on the route
    // object.
    // This is not to hide what's inside the route object, but to show
    // these are the public APIs
    const routePublicApi = _helpers.pick(currentRoute, ['name', 'pathDef', 'path']);
    routePublicApi.options = _helpers.omit(currentRoute.options, ['triggersEnter', 'triggersExit', 'action', 'subscriptions', 'name']);
    this._onRouteCallbacks.forEach(cb => {
      cb(routePublicApi);
    });
  }
  go() {
    // client only
  }
  current() {
    // client only
    return this._current;
  }
  middleware() {
    // client only
  }
  getState() {
    // client only
  }
  getAllStates() {
    // client only
  }
  getRouteName() {
    return this._current.route ? this._current.route.name : undefined;
  }
  getQueryParam(key) {
    return this._current.query ? this._current.queryParams[key] : undefined;
  }
  setState() {
    // client only
  }
  setParams() {}
  removeState() {
    // client only
  }
  clearStates() {
    // client only
  }
  ready() {
    // client only
  }
  initialize() {
    // client only
  }
  wait() {
    // client only
  }
  url() {
    // We need to remove the leading base path, or "/", as it will be inserted
    // automatically by `Meteor.absoluteUrl` as documented in:
    // http://docs.meteor.com/#/full/meteor_absoluteurl
    return Meteor.absoluteUrl(this.path.apply(this, arguments).replace(new RegExp('^' + ('/' + (this._basePath || '') + '/').replace(/\/\/+/g, '/')), ''));
  }
}
module.exportDefault(Router);
//////////////////////////////////////////////////////////////////////////////////////////////////////

},"plugins":{"fast-render.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/ostrio_flow-router-extra/server/plugins/fast-render.js                                  //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }
}, 0);
let _helpers;
module.link("./../../lib/_helpers.js", {
  _helpers(v) {
    _helpers = v;
  }
}, 1);
let FlowRouter;
module.link("../_init.js", {
  FlowRouter(v) {
    FlowRouter = v;
  }
}, 2);
if (!Package['communitypackages:fast-render']) {
  return;
}
const FastRender = Package['communitypackages:fast-render'].FastRender;
const setupFastRender = () => {
  FlowRouter._routes.forEach(route => {
    if (route.pathDef === '*') {
      return;
    }
    FastRender.route(route.pathDef, function (routeParams, path) {
      // anyone using Meteor.subscribe for something else?
      const meteorSubscribe = Meteor.subscribe;
      Meteor.subscribe = function () {
        return Array.from(arguments);
      };
      route._subsMap = {};
      FlowRouter.subscriptions.call(route, path);
      if (route.subscriptions) {
        route.subscriptions(_helpers.omit(routeParams, ['query']), routeParams.query);
      }
      Object.keys(route._subsMap).forEach(key => {
        this.subscribe.apply(this, route._subsMap[key]);
      });

      // restore Meteor.subscribe, ... on server side
      Meteor.subscribe = meteorSubscribe;
    });
  });
};

// hack to run after everything else on startup
Meteor.startup(() => {
  Meteor.startup(() => {
    setupFastRender();
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"lib":{"_helpers.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/ostrio_flow-router-extra/lib/_helpers.js                                                //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
module.export({
  _helpers: () => _helpers
});
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }
}, 0);
const _helpers = {
  isEmpty(obj) {
    // 1
    if (obj == null) {
      return true;
    }
    if (this.isArray(obj) || this.isString(obj) || this.isArguments(obj)) {
      return obj.length === 0;
    }
    return Object.keys(obj).length === 0;
  },
  isObject(obj) {
    const type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  },
  omit(obj, keys) {
    // 10
    if (!this.isObject(obj)) {
      Meteor._debug('[ostrio:flow-router-extra] [_helpers.omit] First argument must be an Object');
      return obj;
    }
    if (!this.isArray(keys)) {
      Meteor._debug('[ostrio:flow-router-extra] [_helpers.omit] Second argument must be an Array');
      return obj;
    }
    const copy = this.clone(obj);
    keys.forEach(key => {
      delete copy[key];
    });
    return copy;
  },
  pick(obj, keys) {
    // 2
    if (!this.isObject(obj)) {
      Meteor._debug('[ostrio:flow-router-extra] [_helpers.omit] First argument must be an Object');
      return obj;
    }
    if (!this.isArray(keys)) {
      Meteor._debug('[ostrio:flow-router-extra] [_helpers.omit] Second argument must be an Array');
      return obj;
    }
    const picked = {};
    keys.forEach(key => {
      picked[key] = obj[key];
    });
    return picked;
  },
  isArray(obj) {
    return Array.isArray(obj);
  },
  extend() {
    for (var _len = arguments.length, objs = new Array(_len), _key = 0; _key < _len; _key++) {
      objs[_key] = arguments[_key];
    }
    // 4
    return Object.assign({}, ...objs);
  },
  clone(obj) {
    if (!this.isObject(obj)) return obj;
    return this.isArray(obj) ? obj.slice() : this.extend(obj);
  }
};
['Arguments', 'Function', 'String', 'RegExp'].forEach(name => {
  _helpers['is' + name] = function (obj) {
    return Object.prototype.toString.call(obj) === '[object ' + name + ']';
  };
});
//////////////////////////////////////////////////////////////////////////////////////////////////////

}},"node_modules":{"page":{"package.json":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// node_modules/meteor/ostrio_flow-router-extra/node_modules/page/package.json                      //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
module.exports = {
  "name": "page",
  "version": "1.9.0",
  "main": "index.js"
};

//////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// node_modules/meteor/ostrio_flow-router-extra/node_modules/page/index.js                          //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
module.useNode();
//////////////////////////////////////////////////////////////////////////////////////////////////////

}},"qs":{"package.json":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// node_modules/meteor/ostrio_flow-router-extra/node_modules/qs/package.json                        //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
module.exports = {
  "name": "qs",
  "version": "6.11.0",
  "main": "lib/index.js"
};

//////////////////////////////////////////////////////////////////////////////////////////////////////

},"lib":{"index.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// node_modules/meteor/ostrio_flow-router-extra/node_modules/qs/lib/index.js                        //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
module.useNode();
//////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".d.ts"
  ]
});

var exports = require("/node_modules/meteor/ostrio:flow-router-extra/server/_init.js");

/* Exports */
Package._define("ostrio:flow-router-extra", exports);

})();

//# sourceURL=meteor://💻app/packages/ostrio_flow-router-extra.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvb3N0cmlvOmZsb3ctcm91dGVyLWV4dHJhL3NlcnZlci9faW5pdC5qcyIsIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvb3N0cmlvOmZsb3ctcm91dGVyLWV4dHJhL3NlcnZlci9ncm91cC5qcyIsIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvb3N0cmlvOmZsb3ctcm91dGVyLWV4dHJhL3NlcnZlci9yb3V0ZS5qcyIsIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvb3N0cmlvOmZsb3ctcm91dGVyLWV4dHJhL3NlcnZlci9yb3V0ZXIuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL29zdHJpbzpmbG93LXJvdXRlci1leHRyYS9zZXJ2ZXIvcGx1Z2lucy9mYXN0LXJlbmRlci5qcyIsIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvb3N0cmlvOmZsb3ctcm91dGVyLWV4dHJhL2xpYi9faGVscGVycy5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnQiLCJGbG93Um91dGVyIiwiUm91dGVyIiwiUm91dGUiLCJHcm91cCIsIlRyaWdnZXJzIiwiQmxhemVSZW5kZXJlciIsIk1ldGVvciIsImxpbmsiLCJ2IiwiZGVmYXVsdCIsIlBhY2thZ2UiLCJfZGVidWciLCJfaGVscGVycyIsIm1ha2VUcmlnZ2VyIiwidHJpZ2dlciIsImlzRnVuY3Rpb24iLCJpc0FycmF5IiwibWFrZVRyaWdnZXJzIiwiX2Jhc2UiLCJfdHJpZ2dlcnMiLCJjb25jYXQiLCJjb25zdHJ1Y3RvciIsInJvdXRlciIsIm9wdGlvbnMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJwYXJlbnQiLCJwcmVmaXgiLCJ0ZXN0IiwiRXJyb3IiLCJfcm91dGVyIiwibmFtZSIsIl90cmlnZ2Vyc0VudGVyIiwidHJpZ2dlcnNFbnRlciIsIl90cmlnZ2Vyc0V4aXQiLCJ0cmlnZ2Vyc0V4aXQiLCJfc3Vic2NyaXB0aW9ucyIsInN1YnNjcmlwdGlvbnMiLCJGdW5jdGlvbiIsInByb3RvdHlwZSIsInJvdXRlIiwiX3BhdGhEZWYiLCJfZ3JvdXAiLCJncm91cCIsInBhdGhEZWYiLCJleHRlbmQiLCJvbWl0IiwiZXhwb3J0RGVmYXVsdCIsInBhdGgiLCJhY3Rpb24iLCJfc3Vic01hcCIsInJlZ2lzdGVyIiwic3ViIiwic3Vic2NyaXB0aW9uIiwibWlkZGxld2FyZSIsInBhZ2UiLCJxcyIsInJlcXVpcmUiLCJwYXRoUmVnRXhwIiwiX3JvdXRlcyIsIl9yb3V0ZXNNYXAiLCJfY3VycmVudCIsIl9zcGVjaWFsQ2hhcnMiLCJfZW5jb2RlUGFyYW0iLCJwYXJhbSIsInBhcmFtQXJyIiwic3BsaXQiLCJfcGFyYW0iLCJpIiwiaW5jbHVkZXMiLCJlbmNvZGVVUklDb21wb25lbnQiLCJlIiwiX29uUm91dGVDYWxsYmFja3MiLCJ0cmlnZ2VycyIsImVudGVyIiwiZXhpdCIsIm1hdGNoUGF0aCIsInBhcmFtcyIsImZpbmQiLCJyIiwicGFnZVJvdXRlIiwibWF0Y2giLCJjbG9uZSIsInNldEN1cnJlbnQiLCJjdXJyZW50IiwicHVzaCIsIl90cmlnZ2VyUm91dGVSZWdpc3RlciIsImZpZWxkcyIsInF1ZXJ5UGFyYW1zIiwicmVwbGFjZSIsIl9rZXkiLCJmaXJzdFJlZ2V4cENoYXIiLCJpbmRleE9mIiwia2V5Iiwic3Vic3RyaW5nIiwic3RyUXVlcnlQYXJhbXMiLCJzdHJpbmdpZnkiLCJvblJvdXRlUmVnaXN0ZXIiLCJjYiIsImN1cnJlbnRSb3V0ZSIsInJvdXRlUHVibGljQXBpIiwicGljayIsImZvckVhY2giLCJnbyIsImdldFN0YXRlIiwiZ2V0QWxsU3RhdGVzIiwiZ2V0Um91dGVOYW1lIiwiZ2V0UXVlcnlQYXJhbSIsInF1ZXJ5Iiwic2V0U3RhdGUiLCJzZXRQYXJhbXMiLCJyZW1vdmVTdGF0ZSIsImNsZWFyU3RhdGVzIiwicmVhZHkiLCJpbml0aWFsaXplIiwid2FpdCIsInVybCIsImFic29sdXRlVXJsIiwiYXBwbHkiLCJSZWdFeHAiLCJfYmFzZVBhdGgiLCJGYXN0UmVuZGVyIiwic2V0dXBGYXN0UmVuZGVyIiwicm91dGVQYXJhbXMiLCJtZXRlb3JTdWJzY3JpYmUiLCJzdWJzY3JpYmUiLCJBcnJheSIsImZyb20iLCJjYWxsIiwiT2JqZWN0Iiwia2V5cyIsInN0YXJ0dXAiLCJpc0VtcHR5Iiwib2JqIiwiaXNTdHJpbmciLCJpc0FyZ3VtZW50cyIsImlzT2JqZWN0IiwidHlwZSIsImNvcHkiLCJwaWNrZWQiLCJfbGVuIiwib2JqcyIsImFzc2lnbiIsInNsaWNlIiwidG9TdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxNQUFNLENBQUM7RUFBQ0MsVUFBVSxFQUFDQSxDQUFBLEtBQUlBLFVBQVU7RUFBQ0MsTUFBTSxFQUFDQSxDQUFBLEtBQUlBLE1BQU07RUFBQ0MsS0FBSyxFQUFDQSxDQUFBLEtBQUlBLEtBQUs7RUFBQ0MsS0FBSyxFQUFDQSxDQUFBLEtBQUlBLEtBQUs7RUFBQ0MsUUFBUSxFQUFDQSxDQUFBLEtBQUlBLFFBQVE7RUFBQ0MsYUFBYSxFQUFDQSxDQUFBLEtBQUlBO0FBQWEsQ0FBQyxDQUFDO0FBQUMsSUFBSUMsTUFBTTtBQUFDUixNQUFNLENBQUNTLElBQUksQ0FBQyxlQUFlLEVBQUM7RUFBQ0QsTUFBTUEsQ0FBQ0UsQ0FBQyxFQUFDO0lBQUNGLE1BQU0sR0FBQ0UsQ0FBQztFQUFBO0FBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztBQUFDLElBQUlQLE1BQU07QUFBQ0gsTUFBTSxDQUFDUyxJQUFJLENBQUMsYUFBYSxFQUFDO0VBQUNFLE9BQU9BLENBQUNELENBQUMsRUFBQztJQUFDUCxNQUFNLEdBQUNPLENBQUM7RUFBQTtBQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7QUFBQyxJQUFJTixLQUFLO0FBQUNKLE1BQU0sQ0FBQ1MsSUFBSSxDQUFDLFlBQVksRUFBQztFQUFDRSxPQUFPQSxDQUFDRCxDQUFDLEVBQUM7SUFBQ04sS0FBSyxHQUFDTSxDQUFDO0VBQUE7QUFBQyxDQUFD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SUFBSSxDQUFDbEcsTUFBTSxDQUFDd0YsR0FBRyxDQUFDO0VBQzNEO0FBQ0YsQ0FBQztBQUVELENBQUMsV0FBVyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMvQixPQUFPLENBQUV2RSxJQUFJLElBQUs7RUFDOURwQixRQUFRLENBQUMsSUFBSSxHQUFHb0IsSUFBSSxDQUFDLEdBQUcsVUFBVXNHLEdBQUcsRUFBRTtJQUNyQyxPQUFPSixNQUFNLENBQUMxRixTQUFTLENBQUN5RyxRQUFRLENBQUNoQixJQUFJLENBQUNLLEdBQUcsQ0FBQyxLQUFLLFVBQVUsR0FBR3RHLElBQUksR0FBRyxHQUFHO0VBQ3hFLENBQUM7QUFDSCxDQUFDLENBQUMsQyIsImZpbGUiOiIvcGFja2FnZXMvb3N0cmlvX2Zsb3ctcm91dGVyLWV4dHJhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSAnbWV0ZW9yL21ldGVvcic7XG5cbmltcG9ydCBSb3V0ZXIgZnJvbSAnLi9yb3V0ZXIuanMnO1xuaW1wb3J0IFJvdXRlIGZyb20gJy4vcm91dGUuanMnO1xuaW1wb3J0IEdyb3VwIGZyb20gJy4vZ3JvdXAuanMnO1xuXG5pbXBvcnQgJy4vcGx1Z2lucy9mYXN0LXJlbmRlci5qcyc7XG5cbmlmIChQYWNrYWdlWydtZXRlb3JoYWNrczppbmplY3QtZGF0YSddKSB7XG4gIE1ldGVvci5fZGVidWcoJ2BtZXRlb3JoYWNrczppbmplY3QtZGF0YWAgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHJlbW92ZSBpdCBhbmQgaW5zdGFsbCBpdHMgc3VjY2Vzc29yIC0gYGNvbW11bml0eXBhY2thZ2VzOmluamVjdC1kYXRhYCcpO1xuICBNZXRlb3IuX2RlYnVnKCdtZXRlb3IgcmVtb3ZlIG1ldGVvcmhhY2tzOmluamVjdC1kYXRhJyk7XG4gIE1ldGVvci5fZGVidWcoJ21ldGVvciBhZGQgY29tbXVuaXR5cGFja2FnZXM6aW5qZWN0LWRhdGEnKTtcbn1cblxuaWYgKFBhY2thZ2VbJ21ldGVvcmhhY2tzOmZhc3QtcmVuZGVyJ10pIHtcbiAgTWV0ZW9yLl9kZWJ1ZygnYG1ldGVvcmhhY2tzOmZhc3QtcmVuZGVyYCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgcmVtb3ZlIGl0IGFuZCBpbnN0YWxsIGl0cyBzdWNjZXNzb3IgLSBgY29tbXVuaXR5cGFja2FnZXM6ZmFzdC1yZW5kZXJgJyk7XG4gIE1ldGVvci5fZGVidWcoJ21ldGVvciByZW1vdmUgbWV0ZW9yaGFja3M6ZmFzdC1yZW5kZXInKTtcbiAgTWV0ZW9yLl9kZWJ1ZygnbWV0ZW9yIGFkZCBjb21tdW5pdHlwYWNrYWdlczpmYXN0LXJlbmRlcicpO1xufVxuXG5pZiAoUGFja2FnZVsnc3RhcmluZ2F0bGlnaHRzOmluamVjdC1kYXRhJ10pIHtcbiAgTWV0ZW9yLl9kZWJ1ZygnYHN0YXJpbmdhdGxpZ2h0czppbmplY3QtZGF0YWAgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHJlbW92ZSBpdCBhbmQgaW5zdGFsbCBpdHMgc3VjY2Vzc29yIC0gYGNvbW11bml0eXBhY2thZ2VzOmluamVjdC1kYXRhYCcpO1xuICBNZXRlb3IuX2RlYnVnKCdtZXRlb3IgcmVtb3ZlIHN0YXJpbmdhdGxpZ2h0czppbmplY3QtZGF0YScpO1xuICBNZXRlb3IuX2RlYnVnKCdtZXRlb3IgYWRkIGNvbW11bml0eXBhY2thZ2VzOmluamVjdC1kYXRhJyk7XG59XG5cbmlmIChQYWNrYWdlWydzdGFyaW5nYXRsaWdodHM6ZmFzdC1yZW5kZXInXSkge1xuICBNZXRlb3IuX2RlYnVnKCdgc3RhcmluZ2F0bGlnaHRzOmZhc3QtcmVuZGVyYCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgcmVtb3ZlIGl0IGFuZCBpbnN0YWxsIGl0cyBzdWNjZXNzb3IgLSBgY29tbXVuaXR5cGFja2FnZXM6ZmFzdC1yZW5kZXJgJyk7XG4gIE1ldGVvci5fZGVidWcoJ21ldGVvciByZW1vdmUgc3RhcmluZ2F0bGlnaHRzOmZhc3QtcmVuZGVyJyk7XG4gIE1ldGVvci5fZGVidWcoJ21ldGVvciBhZGQgY29tbXVuaXR5cGFja2FnZXM6ZmFzdC1yZW5kZXInKTtcbn1cblxuY29uc3QgVHJpZ2dlcnMgPSB7fTtcbmNvbnN0IEJsYXplUmVuZGVyZXIgPSB7fTtcblxuY29uc3QgRmxvd1JvdXRlciA9IG5ldyBSb3V0ZXIoKTtcbkZsb3dSb3V0ZXIuUm91dGVyID0gUm91dGVyO1xuRmxvd1JvdXRlci5Sb3V0ZSA9IFJvdXRlO1xuXG5leHBvcnQgeyBGbG93Um91dGVyLCBSb3V0ZXIsIFJvdXRlLCBHcm91cCwgVHJpZ2dlcnMsIEJsYXplUmVuZGVyZXIgfTtcbiIsImltcG9ydCB7IF9oZWxwZXJzIH0gZnJvbSAnLi8uLi9saWIvX2hlbHBlcnMuanMnO1xuXG5jb25zdCBtYWtlVHJpZ2dlciA9ICh0cmlnZ2VyKSA9PiB7XG4gIGlmIChfaGVscGVycy5pc0Z1bmN0aW9uKHRyaWdnZXIpKSB7XG4gICAgcmV0dXJuIFt0cmlnZ2VyXTtcbiAgfSBlbHNlIGlmICghX2hlbHBlcnMuaXNBcnJheSh0cmlnZ2VyKSkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHJldHVybiB0cmlnZ2VyO1xufTtcblxuY29uc3QgbWFrZVRyaWdnZXJzID0gKF9iYXNlLCBfdHJpZ2dlcnMpID0+IHtcbiAgaWYgKCghX2Jhc2UgJiYgIV90cmlnZ2VycykpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgcmV0dXJuIG1ha2VUcmlnZ2VyKF9iYXNlKS5jb25jYXQobWFrZVRyaWdnZXIoX3RyaWdnZXJzKSk7XG59O1xuXG5jbGFzcyBHcm91cCB7XG4gIGNvbnN0cnVjdG9yKHJvdXRlciwgb3B0aW9ucyA9IHt9LCBwYXJlbnQpIHtcbiAgICBpZiAob3B0aW9ucy5wcmVmaXggJiYgIS9eXFwvLy50ZXN0KG9wdGlvbnMucHJlZml4KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdncm91cFxcJ3MgcHJlZml4IG11c3Qgc3RhcnQgd2l0aCBcIi9cIicpO1xuICAgIH1cblxuICAgIHRoaXMuX3JvdXRlciA9IHJvdXRlcjtcbiAgICB0aGlzLnByZWZpeCA9IG9wdGlvbnMucHJlZml4IHx8ICcnO1xuICAgIHRoaXMubmFtZSA9IG9wdGlvbnMubmFtZTtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXG4gICAgdGhpcy5fdHJpZ2dlcnNFbnRlciA9IG1ha2VUcmlnZ2VycyhvcHRpb25zLnRyaWdnZXJzRW50ZXIsIHRoaXMuX3RyaWdnZXJzRW50ZXIpO1xuICAgIHRoaXMuX3RyaWdnZXJzRXhpdCAgPSBtYWtlVHJpZ2dlcnModGhpcy5fdHJpZ2dlcnNFeGl0LCBvcHRpb25zLnRyaWdnZXJzRXhpdCk7XG5cbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zID0gb3B0aW9ucy5zdWJzY3JpcHRpb25zIHx8IEZ1bmN0aW9uLnByb3RvdHlwZTtcblxuICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgdGhpcy5wcmVmaXggPSBwYXJlbnQucHJlZml4ICsgdGhpcy5wcmVmaXg7XG4gICAgICB0aGlzLl90cmlnZ2Vyc0VudGVyID0gbWFrZVRyaWdnZXJzKHBhcmVudC5fdHJpZ2dlcnNFbnRlciwgdGhpcy5fdHJpZ2dlcnNFbnRlcik7XG4gICAgICB0aGlzLl90cmlnZ2Vyc0V4aXQgID0gbWFrZVRyaWdnZXJzKHRoaXMuX3RyaWdnZXJzRXhpdCwgcGFyZW50Ll90cmlnZ2Vyc0V4aXQpO1xuICAgIH1cbiAgfVxuXG4gIHJvdXRlKF9wYXRoRGVmLCBvcHRpb25zID0ge30sIF9ncm91cCkge1xuICAgIGlmICghL15cXC8vLnRlc3QoX3BhdGhEZWYpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3JvdXRlXFwncyBwYXRoIG11c3Qgc3RhcnQgd2l0aCBcIi9cIicpO1xuICAgIH1cblxuICAgIGNvbnN0IGdyb3VwICAgPSBfZ3JvdXAgfHwgdGhpcztcbiAgICBjb25zdCBwYXRoRGVmID0gdGhpcy5wcmVmaXggKyBfcGF0aERlZjtcblxuICAgIG9wdGlvbnMudHJpZ2dlcnNFbnRlciA9IG1ha2VUcmlnZ2Vycyh0aGlzLl90cmlnZ2Vyc0VudGVyLCBvcHRpb25zLnRyaWdnZXJzRW50ZXIpO1xuICAgIG9wdGlvbnMudHJpZ2dlcnNFeGl0ICA9IG1ha2VUcmlnZ2VycyhvcHRpb25zLnRyaWdnZXJzRXhpdCwgdGhpcy5fdHJpZ2dlcnNFeGl0KTtcblxuICAgIHJldHVybiB0aGlzLl9yb3V0ZXIucm91dGUocGF0aERlZiwgX2hlbHBlcnMuZXh0ZW5kKF9oZWxwZXJzLm9taXQodGhpcy5vcHRpb25zLCBbJ3RyaWdnZXJzRW50ZXInLCAndHJpZ2dlcnNFeGl0JywgJ3N1YnNjcmlwdGlvbnMnLCAncHJlZml4JywgJ3dhaXRPbicsICduYW1lJywgJ3RpdGxlJywgJ3RpdGxlUHJlZml4JywgJ2xpbmsnLCAnc2NyaXB0JywgJ21ldGEnXSksIG9wdGlvbnMpLCBncm91cCk7XG4gIH1cblxuICBncm91cChvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBHcm91cCh0aGlzLl9yb3V0ZXIsIG9wdGlvbnMsIHRoaXMpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdyb3VwO1xuIiwiY2xhc3MgUm91dGUge1xuICBjb25zdHJ1Y3Rvcihyb3V0ZXIsIHBhdGhEZWYsIG9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5uYW1lID0gb3B0aW9ucy5uYW1lO1xuICAgIHRoaXMucGF0aERlZiA9IHBhdGhEZWY7XG5cbiAgICAvLyBSb3V0ZS5wYXRoIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiAzLjBcbiAgICB0aGlzLnBhdGggPSBwYXRoRGVmO1xuXG4gICAgdGhpcy5hY3Rpb24gPSBvcHRpb25zLmFjdGlvbiB8fCBGdW5jdGlvbi5wcm90b3R5cGU7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gb3B0aW9ucy5zdWJzY3JpcHRpb25zIHx8IEZ1bmN0aW9uLnByb3RvdHlwZTtcbiAgICB0aGlzLl9zdWJzTWFwID0ge307XG4gIH1cblxuXG4gIHJlZ2lzdGVyKG5hbWUsIHN1Yikge1xuICAgIHRoaXMuX3N1YnNNYXBbbmFtZV0gPSBzdWI7XG4gIH1cblxuXG4gIHN1YnNjcmlwdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N1YnNNYXBbbmFtZV07XG4gIH1cblxuXG4gIG1pZGRsZXdhcmUoKSB7XG4gICAgLy8gP1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJvdXRlO1xuIiwiaW1wb3J0IHBhZ2UgICAgICAgICBmcm9tICdwYWdlJztcbmltcG9ydCBSb3V0ZSAgICAgICAgZnJvbSAnLi9yb3V0ZS5qcyc7XG5pbXBvcnQgR3JvdXAgICAgICAgIGZyb20gJy4vZ3JvdXAuanMnO1xuaW1wb3J0IHsgTWV0ZW9yIH0gICBmcm9tICdtZXRlb3IvbWV0ZW9yJztcbmltcG9ydCB7IF9oZWxwZXJzIH0gZnJvbSAnLi4vbGliL19oZWxwZXJzLmpzJztcblxuY29uc3QgcXMgPSByZXF1aXJlKCdxcycpO1xuXG5jbGFzcyBSb3V0ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnBhdGhSZWdFeHAgPSAvKDpbXFx3XFwoXFwpXFxcXFxcK1xcKlxcLlxcP1xcW1xcXVxcLV0rKSsvZztcbiAgICB0aGlzLl9yb3V0ZXMgPSBbXTtcbiAgICB0aGlzLl9yb3V0ZXNNYXAgPSB7fTtcbiAgICB0aGlzLl9jdXJyZW50ID0ge307XG4gICAgdGhpcy5fc3BlY2lhbENoYXJzID0gWycvJywgJyUnLCAnKyddO1xuICAgIHRoaXMuX2VuY29kZVBhcmFtID0gcGFyYW0gPT4ge1xuICAgICAgY29uc3QgcGFyYW1BcnIgPSBwYXJhbS5zcGxpdCgnJyk7XG4gICAgICBsZXQgX3BhcmFtID0gJyc7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcmFtQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLl9zcGVjaWFsQ2hhcnMuaW5jbHVkZXMocGFyYW1BcnJbaV0pKSB7XG4gICAgICAgICAgX3BhcmFtICs9IGVuY29kZVVSSUNvbXBvbmVudChlbmNvZGVVUklDb21wb25lbnQocGFyYW1BcnJbaV0pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgX3BhcmFtICs9IGVuY29kZVVSSUNvbXBvbmVudChwYXJhbUFycltpXSk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgX3BhcmFtICs9IHBhcmFtQXJyW2ldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIF9wYXJhbTtcbiAgICB9O1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcblxuICAgIC8vIGhvbGRzIG9uUm91dGUgY2FsbGJhY2tzXG4gICAgdGhpcy5fb25Sb3V0ZUNhbGxiYWNrcyA9IFtdO1xuXG4gICAgdGhpcy50cmlnZ2VycyA9IHtcbiAgICAgIGVudGVyKCkge1xuICAgICAgICAvLyBjbGllbnQgb25seVxuICAgICAgfSxcbiAgICAgIGV4aXQoKSB7XG4gICAgICAgIC8vIGNsaWVudCBvbmx5XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIG1hdGNoUGF0aChwYXRoKSB7XG4gICAgY29uc3QgcGFyYW1zID0ge307XG4gICAgY29uc3Qgcm91dGUgPSB0aGlzLl9yb3V0ZXMuZmluZChyID0+IHtcbiAgICAgIGNvbnN0IHBhZ2VSb3V0ZSA9IG5ldyBwYWdlLlJvdXRlKHIucGF0aERlZik7XG4gICAgICByZXR1cm4gcGFnZVJvdXRlLm1hdGNoKHBhdGgsIHBhcmFtcyk7XG4gICAgfSk7XG4gICAgaWYgKCFyb3V0ZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHBhcmFtczogX2hlbHBlcnMuY2xvbmUocGFyYW1zKSxcbiAgICAgIHJvdXRlOiBfaGVscGVycy5jbG9uZShyb3V0ZSksXG4gICAgfTtcbiAgfVxuXG4gIHNldEN1cnJlbnQoY3VycmVudCkge1xuICAgIHRoaXMuX2N1cnJlbnQgPSBjdXJyZW50O1xuICB9XG5cbiAgcm91dGUocGF0aERlZiwgb3B0aW9ucyA9IHt9KSB7XG4gICAgaWYgKCEvXlxcLy4qLy50ZXN0KHBhdGhEZWYpICYmIHBhdGhEZWYgIT09ICcqJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdyb3V0ZVxcJ3MgcGF0aCBtdXN0IHN0YXJ0IHdpdGggXCIvXCInKTtcbiAgICB9XG5cbiAgICBjb25zdCByb3V0ZSA9IG5ldyBSb3V0ZSh0aGlzLCBwYXRoRGVmLCBvcHRpb25zKTtcbiAgICB0aGlzLl9yb3V0ZXMucHVzaChyb3V0ZSk7XG5cbiAgICBpZiAob3B0aW9ucy5uYW1lKSB7XG4gICAgICB0aGlzLl9yb3V0ZXNNYXBbb3B0aW9ucy5uYW1lXSA9IHJvdXRlO1xuICAgIH1cblxuICAgIHRoaXMuX3RyaWdnZXJSb3V0ZVJlZ2lzdGVyKHJvdXRlKTtcbiAgICByZXR1cm4gcm91dGU7XG4gIH1cblxuICBncm91cChvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBHcm91cCh0aGlzLCBvcHRpb25zKTtcbiAgfVxuXG4gIHBhdGgoX3BhdGhEZWYsIGZpZWxkcyA9IHt9LCBxdWVyeVBhcmFtcykge1xuICAgIGxldCBwYXRoRGVmID0gX3BhdGhEZWY7XG4gICAgaWYgKHRoaXMuX3JvdXRlc01hcFtwYXRoRGVmXSkge1xuICAgICAgcGF0aERlZiA9IHRoaXMuX3JvdXRlc01hcFtwYXRoRGVmXS5wYXRoO1xuICAgIH1cblxuICAgIGxldCBwYXRoID0gcGF0aERlZi5yZXBsYWNlKHRoaXMucGF0aFJlZ0V4cCwgKF9rZXkpID0+IHtcbiAgICAgIGNvbnN0IGZpcnN0UmVnZXhwQ2hhciA9IF9rZXkuaW5kZXhPZignKCcpO1xuICAgICAgLy8gZ2V0IHRoZSBjb250ZW50IGJlaGluZCA6IGFuZCAoXFxcXGQrLylcbiAgICAgIGxldCBrZXkgPSBfa2V5LnN1YnN0cmluZygxLCBmaXJzdFJlZ2V4cENoYXIgPiAwID8gZmlyc3RSZWdleHBDaGFyIDogdW5kZWZpbmVkKTtcbiAgICAgIC8vIHJlbW92ZSArPypcbiAgICAgIGtleSA9IGtleS5yZXBsYWNlKC9bXFwrXFwqXFw/XSsvZywgJycpO1xuXG4gICAgICBpZiAoZmllbGRzW2tleV0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuY29kZVBhcmFtKGAke2ZpZWxkc1trZXldfWApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJyc7XG4gICAgfSk7XG5cbiAgICBwYXRoID0gcGF0aC5yZXBsYWNlKC9cXC9cXC8rL2csICcvJyk7IC8vIFJlcGxhY2UgbXVsdGlwbGUgc2xhc2hlcyB3aXRoIHNpbmdsZSBzbGFzaFxuXG4gICAgLy8gcmVtb3ZlIHRyYWlsaW5nIHNsYXNoXG4gICAgLy8gYnV0IGtlZXAgdGhlIHJvb3Qgc2xhc2ggaWYgaXQncyB0aGUgb25seSBvbmVcbiAgICBwYXRoID0gcGF0aC5tYXRjaCgvXlxcL3sxfSQvKSA/IHBhdGggOiBwYXRoLnJlcGxhY2UoL1xcLyQvLCAnJyk7XG5cbiAgICBjb25zdCBzdHJRdWVyeVBhcmFtcyA9IHFzLnN0cmluZ2lmeShxdWVyeVBhcmFtcyB8fCB7fSk7XG4gICAgaWYgKHN0clF1ZXJ5UGFyYW1zKSB7XG4gICAgICBwYXRoICs9IGA/JHtzdHJRdWVyeVBhcmFtc31gO1xuICAgIH1cblxuICAgIHJldHVybiBwYXRoO1xuICB9XG5cbiAgb25Sb3V0ZVJlZ2lzdGVyKGNiKSB7XG4gICAgdGhpcy5fb25Sb3V0ZUNhbGxiYWNrcy5wdXNoKGNiKTtcbiAgfVxuXG4gIF90cmlnZ2VyUm91dGVSZWdpc3RlcihjdXJyZW50Um91dGUpIHtcbiAgICAvLyBXZSBzaG91bGQgb25seSBuZWVkIHRvIHNlbmQgYSBzYWZlIHNldCBvZiBmaWVsZHMgb24gdGhlIHJvdXRlXG4gICAgLy8gb2JqZWN0LlxuICAgIC8vIFRoaXMgaXMgbm90IHRvIGhpZGUgd2hhdCdzIGluc2lkZSB0aGUgcm91dGUgb2JqZWN0LCBidXQgdG8gc2hvd1xuICAgIC8vIHRoZXNlIGFyZSB0aGUgcHVibGljIEFQSXNcbiAgICBjb25zdCByb3V0ZVB1YmxpY0FwaSA9IF9oZWxwZXJzLnBpY2soY3VycmVudFJvdXRlLCBbXG4gICAgICAnbmFtZScsXG4gICAgICAncGF0aERlZicsXG4gICAgICAncGF0aCcsXG4gICAgXSk7XG4gICAgcm91dGVQdWJsaWNBcGkub3B0aW9ucyA9IF9oZWxwZXJzLm9taXQoY3VycmVudFJvdXRlLm9wdGlvbnMsIFtcbiAgICAgICd0cmlnZ2Vyc0VudGVyJyxcbiAgICAgICd0cmlnZ2Vyc0V4aXQnLFxuICAgICAgJ2FjdGlvbicsXG4gICAgICAnc3Vic2NyaXB0aW9ucycsXG4gICAgICAnbmFtZScsXG4gICAgXSk7XG5cbiAgICB0aGlzLl9vblJvdXRlQ2FsbGJhY2tzLmZvckVhY2goY2IgPT4ge1xuICAgICAgY2Iocm91dGVQdWJsaWNBcGkpO1xuICAgIH0pO1xuICB9XG5cbiAgZ28oKSB7XG4gICAgLy8gY2xpZW50IG9ubHlcbiAgfVxuXG4gIGN1cnJlbnQoKSB7XG4gICAgLy8gY2xpZW50IG9ubHlcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudDtcbiAgfVxuXG4gIG1pZGRsZXdhcmUoKSB7XG4gICAgLy8gY2xpZW50IG9ubHlcbiAgfVxuXG4gIGdldFN0YXRlKCkge1xuICAgIC8vIGNsaWVudCBvbmx5XG4gIH1cblxuICBnZXRBbGxTdGF0ZXMoKSB7XG4gICAgLy8gY2xpZW50IG9ubHlcbiAgfVxuXG4gIGdldFJvdXRlTmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudC5yb3V0ZSA/IHRoaXMuX2N1cnJlbnQucm91dGUubmFtZSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGdldFF1ZXJ5UGFyYW0oa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnQucXVlcnkgPyB0aGlzLl9jdXJyZW50LnF1ZXJ5UGFyYW1zW2tleV0gOiB1bmRlZmluZWQ7XG4gIH1cblxuICBzZXRTdGF0ZSgpIHtcbiAgICAvLyBjbGllbnQgb25seVxuICB9XG5cbiAgc2V0UGFyYW1zKCkge31cblxuICByZW1vdmVTdGF0ZSgpIHtcbiAgICAvLyBjbGllbnQgb25seVxuICB9XG5cbiAgY2xlYXJTdGF0ZXMoKSB7XG4gICAgLy8gY2xpZW50IG9ubHlcbiAgfVxuXG4gIHJlYWR5KCkge1xuICAgIC8vIGNsaWVudCBvbmx5XG4gIH1cblxuICBpbml0aWFsaXplKCkge1xuICAgIC8vIGNsaWVudCBvbmx5XG4gIH1cblxuICB3YWl0KCkge1xuICAgIC8vIGNsaWVudCBvbmx5XG4gIH1cblxuICB1cmwoKSB7XG4gICAgLy8gV2UgbmVlZCB0byByZW1vdmUgdGhlIGxlYWRpbmcgYmFzZSBwYXRoLCBvciBcIi9cIiwgYXMgaXQgd2lsbCBiZSBpbnNlcnRlZFxuICAgIC8vIGF1dG9tYXRpY2FsbHkgYnkgYE1ldGVvci5hYnNvbHV0ZVVybGAgYXMgZG9jdW1lbnRlZCBpbjpcbiAgICAvLyBodHRwOi8vZG9jcy5tZXRlb3IuY29tLyMvZnVsbC9tZXRlb3JfYWJzb2x1dGV1cmxcbiAgICByZXR1cm4gTWV0ZW9yLmFic29sdXRlVXJsKHRoaXMucGF0aC5hcHBseSh0aGlzLCBhcmd1bWVudHMpLnJlcGxhY2UobmV3IFJlZ0V4cCgnXicgKyAoJy8nICsgKHRoaXMuX2Jhc2VQYXRoIHx8ICcnKSArICcvJykucmVwbGFjZSgvXFwvXFwvKy9nLCAnLycpKSwgJycpKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSb3V0ZXI7XG4iLCJpbXBvcnQgeyBNZXRlb3IgfSAgICAgZnJvbSAnbWV0ZW9yL21ldGVvcic7XG5pbXBvcnQgeyBfaGVscGVycyB9ICAgZnJvbSAnLi8uLi8uLi9saWIvX2hlbHBlcnMuanMnO1xuaW1wb3J0IHsgRmxvd1JvdXRlciB9IGZyb20gJy4uL19pbml0LmpzJztcblxuaWYoIVBhY2thZ2VbJ2NvbW11bml0eXBhY2thZ2VzOmZhc3QtcmVuZGVyJ10pIHtcbiAgcmV0dXJuO1xufVxuXG5jb25zdCBGYXN0UmVuZGVyID0gUGFja2FnZVsnY29tbXVuaXR5cGFja2FnZXM6ZmFzdC1yZW5kZXInXS5GYXN0UmVuZGVyO1xuXG5jb25zdCBzZXR1cEZhc3RSZW5kZXIgPSAoKSA9PiB7XG4gIEZsb3dSb3V0ZXIuX3JvdXRlcy5mb3JFYWNoKChyb3V0ZSkgPT4ge1xuICAgIGlmIChyb3V0ZS5wYXRoRGVmID09PSAnKicpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBGYXN0UmVuZGVyLnJvdXRlKHJvdXRlLnBhdGhEZWYsIGZ1bmN0aW9uIChyb3V0ZVBhcmFtcywgcGF0aCkge1xuICAgICAgLy8gYW55b25lIHVzaW5nIE1ldGVvci5zdWJzY3JpYmUgZm9yIHNvbWV0aGluZyBlbHNlP1xuICAgICAgY29uc3QgbWV0ZW9yU3Vic2NyaWJlID0gTWV0ZW9yLnN1YnNjcmliZTtcbiAgICAgIE1ldGVvci5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XG4gICAgICB9O1xuXG4gICAgICByb3V0ZS5fc3Vic01hcCA9IHt9O1xuICAgICAgRmxvd1JvdXRlci5zdWJzY3JpcHRpb25zLmNhbGwocm91dGUsIHBhdGgpO1xuICAgICAgaWYgKHJvdXRlLnN1YnNjcmlwdGlvbnMpIHtcbiAgICAgICAgcm91dGUuc3Vic2NyaXB0aW9ucyhfaGVscGVycy5vbWl0KHJvdXRlUGFyYW1zLCBbJ3F1ZXJ5J10pLCByb3V0ZVBhcmFtcy5xdWVyeSk7XG4gICAgICB9XG5cbiAgICAgIE9iamVjdC5rZXlzKHJvdXRlLl9zdWJzTWFwKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmUuYXBwbHkodGhpcywgcm91dGUuX3N1YnNNYXBba2V5XSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gcmVzdG9yZSBNZXRlb3Iuc3Vic2NyaWJlLCAuLi4gb24gc2VydmVyIHNpZGVcbiAgICAgIE1ldGVvci5zdWJzY3JpYmUgPSBtZXRlb3JTdWJzY3JpYmU7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuLy8gaGFjayB0byBydW4gYWZ0ZXIgZXZlcnl0aGluZyBlbHNlIG9uIHN0YXJ0dXBcbk1ldGVvci5zdGFydHVwKCgpID0+IHtcbiAgTWV0ZW9yLnN0YXJ0dXAoKCkgPT4ge1xuICAgIHNldHVwRmFzdFJlbmRlcigpO1xuICB9KTtcbn0pO1xuIiwiaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSAnbWV0ZW9yL21ldGVvcic7XG5cbmNvbnN0IF9oZWxwZXJzID0ge1xuICBpc0VtcHR5KG9iaikgeyAvLyAxXG4gICAgaWYgKG9iaiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0FycmF5KG9iaikgfHwgdGhpcy5pc1N0cmluZyhvYmopIHx8IHRoaXMuaXNBcmd1bWVudHMob2JqKSkge1xuICAgICAgcmV0dXJuIG9iai5sZW5ndGggPT09IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubGVuZ3RoID09PSAwO1xuICB9LFxuICBpc09iamVjdChvYmopIHtcbiAgICBjb25zdCB0eXBlID0gdHlwZW9mIG9iajtcbiAgICByZXR1cm4gdHlwZSA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlID09PSAnb2JqZWN0JyAmJiAhIW9iajtcbiAgfSxcbiAgb21pdChvYmosIGtleXMpIHsgLy8gMTBcbiAgICBpZiAoIXRoaXMuaXNPYmplY3Qob2JqKSkge1xuICAgICAgTWV0ZW9yLl9kZWJ1ZygnW29zdHJpbzpmbG93LXJvdXRlci1leHRyYV0gW19oZWxwZXJzLm9taXRdIEZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYW4gT2JqZWN0Jyk7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5pc0FycmF5KGtleXMpKSB7XG4gICAgICBNZXRlb3IuX2RlYnVnKCdbb3N0cmlvOmZsb3ctcm91dGVyLWV4dHJhXSBbX2hlbHBlcnMub21pdF0gU2Vjb25kIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXknKTtcbiAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuXG4gICAgY29uc3QgY29weSA9IHRoaXMuY2xvbmUob2JqKTtcbiAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgZGVsZXRlIGNvcHlba2V5XTtcbiAgICB9KTtcblxuICAgIHJldHVybiBjb3B5O1xuICB9LFxuICBwaWNrKG9iaiwga2V5cykgeyAvLyAyXG4gICAgaWYgKCF0aGlzLmlzT2JqZWN0KG9iaikpIHtcbiAgICAgIE1ldGVvci5fZGVidWcoJ1tvc3RyaW86Zmxvdy1yb3V0ZXItZXh0cmFdIFtfaGVscGVycy5vbWl0XSBGaXJzdCBhcmd1bWVudCBtdXN0IGJlIGFuIE9iamVjdCcpO1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaXNBcnJheShrZXlzKSkge1xuICAgICAgTWV0ZW9yLl9kZWJ1ZygnW29zdHJpbzpmbG93LXJvdXRlci1leHRyYV0gW19oZWxwZXJzLm9taXRdIFNlY29uZCBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5Jyk7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cblxuICAgIGNvbnN0IHBpY2tlZCA9IHt9O1xuICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBwaWNrZWRba2V5XSA9IG9ialtrZXldO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBpY2tlZDtcbiAgfSxcbiAgaXNBcnJheShvYmopIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShvYmopO1xuICB9LFxuICBleHRlbmQoLi4ub2JqcykgeyAvLyA0XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIC4uLm9ianMpO1xuICB9LFxuICBjbG9uZShvYmopIHtcbiAgICBpZiAoIXRoaXMuaXNPYmplY3Qob2JqKSkgcmV0dXJuIG9iajtcbiAgICByZXR1cm4gdGhpcy5pc0FycmF5KG9iaikgPyBvYmouc2xpY2UoKSA6IHRoaXMuZXh0ZW5kKG9iaik7XG4gIH1cbn07XG5cblsnQXJndW1lbnRzJywgJ0Z1bmN0aW9uJywgJ1N0cmluZycsICdSZWdFeHAnXS5mb3JFYWNoKChuYW1lKSA9PiB7XG4gIF9oZWxwZXJzWydpcycgKyBuYW1lXSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0ICcgKyBuYW1lICsgJ10nO1xuICB9O1xufSk7XG5cbmV4cG9ydCB7IF9oZWxwZXJzIH07XG4iXX0=
