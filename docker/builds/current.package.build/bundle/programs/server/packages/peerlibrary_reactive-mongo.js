(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var _ = Package.underscore._;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var Tracker = Package['peerlibrary:server-autorun'].Tracker;
var Promise = Package.promise.Promise;
var meteorInstall = Package.modules.meteorInstall;

/* Package-scope variables */
var __coffeescriptShare;

var require = meteorInstall({"node_modules":{"meteor":{"peerlibrary:reactive-mongo":{"server.coffee":function module(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/peerlibrary_reactive-mongo/server.coffee                                                           //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var MeteorCursor, callbacksOrdered, callbacksUnordered, i, len, method, originalCount, originalExists, originalObserveChanges, ref;
MeteorCursor = Object.getPrototypeOf(MongoInternals.defaultRemoteCollectionDriver().mongo.find()).constructor;
originalObserveChanges = MeteorCursor.prototype.observeChanges;
originalCount = MeteorCursor.prototype.count; // This is a PeerDB extension. It might not exist if the package is used without PeerDB.
// But we defined a week dependency on PeerDB so that it is loaded before this package
// to that PeerDB adds this extension before we get here.

originalExists = MeteorCursor.prototype.exists;

MeteorCursor.prototype._isReactive = function () {
  var ref; // By default we make all cursors reactive. But you can
  // still disable that, the same as on the client.

  return (ref = this._cursorDescription.options.reactive) != null ? ref : true;
};

MeteorCursor.prototype._depend = function (changers) {
  var dependency, fnName, i, initializing, len, options, ref;

  if (!Tracker.active) {
    return;
  }

  dependency = new Tracker.Dependency();
  dependency.depend(); // On server side observe does not have _suppress_initial,
  // so we are skipping initial documents manually.

  initializing = true;
  options = {};
  ref = ['added', 'changed', 'removed', 'addedBefore', 'movedBefore'];

  for (i = 0, len = ref.length; i < len; i++) {
    fnName = ref[i];

    if (changers[fnName]) {
      options[fnName] = function () {
        if (!initializing) {
          return dependency.changed();
        }
      };
    }
  } // observeChanges will stop() when this computation is invalidated.


  this.observeChanges(options);
  return initializing = false;
};

MeteorCursor.prototype.observeChanges = function (options) {
  var handle;
  handle = originalObserveChanges.call(this, options);

  if (Tracker.active && this._isReactive()) {
    Tracker.onInvalidate(() => {
      return handle.stop();
    });
  }

  return handle;
};

callbacksOrdered = {
  addedBefore: true,
  removed: true,
  changed: true,
  movedBefore: true
};
callbacksUnordered = {
  added: true,
  changed: true,
  removed: true
};
ref = ['forEach', 'map', 'fetch'];

for (i = 0, len = ref.length; i < len; i++) {
  method = ref[i];

  (function (method) {
    var originalMethod;
    originalMethod = MeteorCursor.prototype[method];
    return MeteorCursor.prototype[method] = function (...args) {
      var callbacks, ordered, sort;

      if (this._isReactive()) {
        ({
          sort,
          ordered
        } = this._cursorDescription.options);

        if (ordered != null) {
          callbacks = ordered ? callbacksOrdered : callbacksUnordered;
        } else {
          callbacks = !!sort ? callbacksOrdered : callbacksUnordered;
        }

        this._depend(callbacks);
      }

      return originalMethod.apply(this, args);
    };
  })(method);
}

MeteorCursor.prototype.count = function (...args) {
  if (this._isReactive()) {
    this._depend({
      added: true,
      removed: true
    });
  }

  return originalCount.apply(this, args);
};

if (originalExists) {
  MeteorCursor.prototype.exists = function (...args) {
    if (this._isReactive()) {
      this._depend({
        added: true,
        removed: true
      });
    }

    return originalExists.apply(this, args);
  };
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".coffee"
  ]
});

require("/node_modules/meteor/peerlibrary:reactive-mongo/server.coffee");

/* Exports */
Package._define("peerlibrary:reactive-mongo");

})();

//# sourceURL=meteor://💻app/packages/peerlibrary_reactive-mongo.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvcGVlcmxpYnJhcnlfcmVhY3RpdmUtbW9uZ28vc2VydmVyLmNvZmZlZSIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyLmNvZmZlZSJdLCJuYW1lcyI6WyJNZXRlb3JDdXJzb3IiLCJjYWxsYmFja3NPcmRlcmVkIiwiY2FsbGJhY2tzVW5vcmRlcmVkIiwiaSIsImxlbiIsIm1ldGhvZCIsIm9yaWdpbmFsQ291bnQiLCJvcmlnaW5hbEV4aXN0cyIsIm9yaWdpbmFsT2JzZXJ2ZUNoYW5nZXMiLCJyZWYiLCJPYmplY3QiLCJnZXRQcm90b3R5cGVPZiIsIk1vbmdvSW50ZXJuYWxzIiwiZGVmYXVsdFJlbW90ZUNvbGxlY3Rpb25Ecml2ZXIiLCJtb25nbyIsImZpbmQiLCJjb25zdHJ1Y3RvciIsInByb3RvdHlwZSIsIm9ic2VydmVDaGFuZ2VzIiwiY291bnQiLCJleGlzdHMiLCJfaXNSZWFjdGl2ZSIsIl9jdXJzb3JEZXNjcmlwdGlvbiIsIm9wdGlvbnMiLCJyZWFjdGl2ZSIsIl9kZXBlbmQiLCJjaGFuZ2VycyIsImRlcGVuZGVuY3kiLCJmbk5hbWUiLCJpbml0aWFsaXppbmciLCJUcmFja2VyIiwiYWN0aXZlIiwiRGVwZW5kZW5jeSIsImRlcGVuZCIsImxlbmd0aCIsImNoYW5nZWQiLCJoYW5kbGUiLCJjYWxsIiwib25JbnZhbGlkYXRlIiwic3RvcCIsImFkZGVkQmVmb3JlIiwicmVtb3ZlZCIsIm1vdmVkQmVmb3JlIiwiYWRkZWQiLCJvcmlnaW5hbE1ldGhvZCIsImFyZ3MiLCJjYWxsYmFja3MiLCJvcmRlcmVkIiwic29ydCIsImFwcGx5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLFlBQUEsRUFBQUMsZ0JBQUEsRUFBQUMsa0JBQUEsRUFBQUMsQ0FBQSxFQUFBQyxHQUFBLEVBQUFDLE1BQUEsRUFBQUMsYUFBQSxFQUFBQyxjQUFBLEVBQUFDLHNCQUFBLEVBQUFDLEdBQUE7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QUFEVCxPQURGO0FDZ0NEOztBQUNELFdEN0JBbEMsY0FBYyxDQUFDMEMsS0FBZixDQUFxQixJQUFyQixFQUF3QkosSUFBeEIsQ0M2QkE7QURuQ3FCLEdBQXZCO0FDcUNELEMiLCJmaWxlIjoiL3BhY2thZ2VzL3BlZXJsaWJyYXJ5X3JlYWN0aXZlLW1vbmdvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiTWV0ZW9yQ3Vyc29yID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKE1vbmdvSW50ZXJuYWxzLmRlZmF1bHRSZW1vdGVDb2xsZWN0aW9uRHJpdmVyKCkubW9uZ28uZmluZCgpKS5jb25zdHJ1Y3RvclxuXG5vcmlnaW5hbE9ic2VydmVDaGFuZ2VzID0gTWV0ZW9yQ3Vyc29yOjpvYnNlcnZlQ2hhbmdlc1xub3JpZ2luYWxDb3VudCA9IE1ldGVvckN1cnNvcjo6Y291bnRcblxuIyBUaGlzIGlzIGEgUGVlckRCIGV4dGVuc2lvbi4gSXQgbWlnaHQgbm90IGV4aXN0IGlmIHRoZSBwYWNrYWdlIGlzIHVzZWQgd2l0aG91dCBQZWVyREIuXG4jIEJ1dCB3ZSBkZWZpbmVkIGEgd2VlayBkZXBlbmRlbmN5IG9uIFBlZXJEQiBzbyB0aGF0IGl0IGlzIGxvYWRlZCBiZWZvcmUgdGhpcyBwYWNrYWdlXG4jIHRvIHRoYXQgUGVlckRCIGFkZHMgdGhpcyBleHRlbnNpb24gYmVmb3JlIHdlIGdldCBoZXJlLlxub3JpZ2luYWxFeGlzdHMgPSBNZXRlb3JDdXJzb3I6OmV4aXN0c1xuXG5NZXRlb3JDdXJzb3I6Ol9pc1JlYWN0aXZlID0gLT5cbiAgIyBCeSBkZWZhdWx0IHdlIG1ha2UgYWxsIGN1cnNvcnMgcmVhY3RpdmUuIEJ1dCB5b3UgY2FuXG4gICMgc3RpbGwgZGlzYWJsZSB0aGF0LCB0aGUgc2FtZSBhcyBvbiB0aGUgY2xpZW50LlxuICBAX2N1cnNvckRlc2NyaXB0aW9uLm9wdGlvbnMucmVhY3RpdmUgPyB0cnVlXG5cbk1ldGVvckN1cnNvcjo6X2RlcGVuZCA9IChjaGFuZ2VycykgLT5cbiAgcmV0dXJuIHVubGVzcyBUcmFja2VyLmFjdGl2ZVxuXG4gIGRlcGVuZGVuY3kgPSBuZXcgVHJhY2tlci5EZXBlbmRlbmN5KClcbiAgZGVwZW5kZW5jeS5kZXBlbmQoKVxuXG4gICMgT24gc2VydmVyIHNpZGUgb2JzZXJ2ZSBkb2VzIG5vdCBoYXZlIF9zdXBwcmVzc19pbml0aWFsLFxuICAjIHNvIHdlIGFyZSBza2lwcGluZyBpbml0aWFsIGRvY3VtZW50cyBtYW51YWxseS5cbiAgaW5pdGlhbGl6aW5nID0gdHJ1ZVxuXG4gIG9wdGlvbnMgPSB7fVxuICBmb3IgZm5OYW1lIGluIFsnYWRkZWQnLCAnY2hhbmdlZCcsICdyZW1vdmVkJywgJ2FkZGVkQmVmb3JlJywgJ21vdmVkQmVmb3JlJ10gd2hlbiBjaGFuZ2Vyc1tmbk5hbWVdXG4gICAgb3B0aW9uc1tmbk5hbWVdID0gLT5cbiAgICAgIGRlcGVuZGVuY3kuY2hhbmdlZCgpIHVubGVzcyBpbml0aWFsaXppbmdcblxuICAjIG9ic2VydmVDaGFuZ2VzIHdpbGwgc3RvcCgpIHdoZW4gdGhpcyBjb21wdXRhdGlvbiBpcyBpbnZhbGlkYXRlZC5cbiAgQG9ic2VydmVDaGFuZ2VzIG9wdGlvbnNcblxuICBpbml0aWFsaXppbmcgPSBmYWxzZVxuXG5NZXRlb3JDdXJzb3I6Om9ic2VydmVDaGFuZ2VzID0gKG9wdGlvbnMpIC0+XG4gIGhhbmRsZSA9IG9yaWdpbmFsT2JzZXJ2ZUNoYW5nZXMuY2FsbCBALCBvcHRpb25zXG4gIGlmIFRyYWNrZXIuYWN0aXZlIGFuZCBAX2lzUmVhY3RpdmUoKVxuICAgIFRyYWNrZXIub25JbnZhbGlkYXRlID0+XG4gICAgICBoYW5kbGUuc3RvcCgpXG4gIGhhbmRsZVxuXG5jYWxsYmFja3NPcmRlcmVkID1cbiAgYWRkZWRCZWZvcmU6IHRydWVcbiAgcmVtb3ZlZDogdHJ1ZVxuICBjaGFuZ2VkOiB0cnVlXG4gIG1vdmVkQmVmb3JlOiB0cnVlXG5cbmNhbGxiYWNrc1Vub3JkZXJlZCA9XG4gIGFkZGVkOiB0cnVlXG4gIGNoYW5nZWQ6IHRydWVcbiAgcmVtb3ZlZDogdHJ1ZVxuXG5mb3IgbWV0aG9kIGluIFsnZm9yRWFjaCcsICdtYXAnLCAnZmV0Y2gnXVxuICBkbyAobWV0aG9kKSAtPlxuICAgIG9yaWdpbmFsTWV0aG9kID0gTWV0ZW9yQ3Vyc29yOjpbbWV0aG9kXVxuICAgIE1ldGVvckN1cnNvcjo6W21ldGhvZF0gPSAoYXJncy4uLikgLT5cbiAgICAgIGlmIEBfaXNSZWFjdGl2ZSgpXG4gICAgICAgIHtzb3J0LCBvcmRlcmVkfSA9IEBfY3Vyc29yRGVzY3JpcHRpb24ub3B0aW9uc1xuICAgICAgICBpZiBvcmRlcmVkP1xuICAgICAgICAgIGNhbGxiYWNrcyA9IGlmIG9yZGVyZWQgdGhlbiBjYWxsYmFja3NPcmRlcmVkIGVsc2UgY2FsbGJhY2tzVW5vcmRlcmVkXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBjYWxsYmFja3MgPSBpZiAhIXNvcnQgdGhlbiBjYWxsYmFja3NPcmRlcmVkIGVsc2UgY2FsbGJhY2tzVW5vcmRlcmVkXG4gICAgICAgIEBfZGVwZW5kIGNhbGxiYWNrc1xuXG4gICAgICBvcmlnaW5hbE1ldGhvZC5hcHBseSBALCBhcmdzXG5cbk1ldGVvckN1cnNvcjo6Y291bnQgPSAoYXJncy4uLikgLT5cbiAgaWYgQF9pc1JlYWN0aXZlKClcbiAgICBAX2RlcGVuZFxuICAgICAgYWRkZWQ6IHRydWVcbiAgICAgIHJlbW92ZWQ6IHRydWVcblxuICBvcmlnaW5hbENvdW50LmFwcGx5IEAsIGFyZ3NcblxuaWYgb3JpZ2luYWxFeGlzdHNcbiAgTWV0ZW9yQ3Vyc29yOjpleGlzdHMgPSAoYXJncy4uLikgLT5cbiAgICBpZiBAX2lzUmVhY3RpdmUoKVxuICAgICAgQF9kZXBlbmRcbiAgICAgICAgYWRkZWQ6IHRydWVcbiAgICAgICAgcmVtb3ZlZDogdHJ1ZVxuXG4gICAgb3JpZ2luYWxFeGlzdHMuYXBwbHkgQCwgYXJnc1xuIiwidmFyIE1ldGVvckN1cnNvciwgY2FsbGJhY2tzT3JkZXJlZCwgY2FsbGJhY2tzVW5vcmRlcmVkLCBpLCBsZW4sIG1ldGhvZCwgb3JpZ2luYWxDb3VudCwgb3JpZ2luYWxFeGlzdHMsIG9yaWdpbmFsT2JzZXJ2ZUNoYW5nZXMsIHJlZjtcblxuTWV0ZW9yQ3Vyc29yID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKE1vbmdvSW50ZXJuYWxzLmRlZmF1bHRSZW1vdGVDb2xsZWN0aW9uRHJpdmVyKCkubW9uZ28uZmluZCgpKS5jb25zdHJ1Y3Rvcjtcblxub3JpZ2luYWxPYnNlcnZlQ2hhbmdlcyA9IE1ldGVvckN1cnNvci5wcm90b3R5cGUub2JzZXJ2ZUNoYW5nZXM7XG5cbm9yaWdpbmFsQ291bnQgPSBNZXRlb3JDdXJzb3IucHJvdG90eXBlLmNvdW50O1xuXG4vLyBUaGlzIGlzIGEgUGVlckRCIGV4dGVuc2lvbi4gSXQgbWlnaHQgbm90IGV4aXN0IGlmIHRoZSBwYWNrYWdlIGlzIHVzZWQgd2l0aG91dCBQZWVyREIuXG4vLyBCdXQgd2UgZGVmaW5lZCBhIHdlZWsgZGVwZW5kZW5jeSBvbiBQZWVyREIgc28gdGhhdCBpdCBpcyBsb2FkZWQgYmVmb3JlIHRoaXMgcGFja2FnZVxuLy8gdG8gdGhhdCBQZWVyREIgYWRkcyB0aGlzIGV4dGVuc2lvbiBiZWZvcmUgd2UgZ2V0IGhlcmUuXG5vcmlnaW5hbEV4aXN0cyA9IE1ldGVvckN1cnNvci5wcm90b3R5cGUuZXhpc3RzO1xuXG5NZXRlb3JDdXJzb3IucHJvdG90eXBlLl9pc1JlYWN0aXZlID0gZnVuY3Rpb24oKSB7XG4gIHZhciByZWY7XG4gIC8vIEJ5IGRlZmF1bHQgd2UgbWFrZSBhbGwgY3Vyc29ycyByZWFjdGl2ZS4gQnV0IHlvdSBjYW5cbiAgLy8gc3RpbGwgZGlzYWJsZSB0aGF0LCB0aGUgc2FtZSBhcyBvbiB0aGUgY2xpZW50LlxuICByZXR1cm4gKHJlZiA9IHRoaXMuX2N1cnNvckRlc2NyaXB0aW9uLm9wdGlvbnMucmVhY3RpdmUpICE9IG51bGwgPyByZWYgOiB0cnVlO1xufTtcblxuTWV0ZW9yQ3Vyc29yLnByb3RvdHlwZS5fZGVwZW5kID0gZnVuY3Rpb24oY2hhbmdlcnMpIHtcbiAgdmFyIGRlcGVuZGVuY3ksIGZuTmFtZSwgaSwgaW5pdGlhbGl6aW5nLCBsZW4sIG9wdGlvbnMsIHJlZjtcbiAgaWYgKCFUcmFja2VyLmFjdGl2ZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBkZXBlbmRlbmN5ID0gbmV3IFRyYWNrZXIuRGVwZW5kZW5jeSgpO1xuICBkZXBlbmRlbmN5LmRlcGVuZCgpO1xuICAvLyBPbiBzZXJ2ZXIgc2lkZSBvYnNlcnZlIGRvZXMgbm90IGhhdmUgX3N1cHByZXNzX2luaXRpYWwsXG4gIC8vIHNvIHdlIGFyZSBza2lwcGluZyBpbml0aWFsIGRvY3VtZW50cyBtYW51YWxseS5cbiAgaW5pdGlhbGl6aW5nID0gdHJ1ZTtcbiAgb3B0aW9ucyA9IHt9O1xuICByZWYgPSBbJ2FkZGVkJywgJ2NoYW5nZWQnLCAncmVtb3ZlZCcsICdhZGRlZEJlZm9yZScsICdtb3ZlZEJlZm9yZSddO1xuICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBmbk5hbWUgPSByZWZbaV07XG4gICAgaWYgKGNoYW5nZXJzW2ZuTmFtZV0pIHtcbiAgICAgIG9wdGlvbnNbZm5OYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIWluaXRpYWxpemluZykge1xuICAgICAgICAgIHJldHVybiBkZXBlbmRlbmN5LmNoYW5nZWQoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH1cbiAgLy8gb2JzZXJ2ZUNoYW5nZXMgd2lsbCBzdG9wKCkgd2hlbiB0aGlzIGNvbXB1dGF0aW9uIGlzIGludmFsaWRhdGVkLlxuICB0aGlzLm9ic2VydmVDaGFuZ2VzKG9wdGlvbnMpO1xuICByZXR1cm4gaW5pdGlhbGl6aW5nID0gZmFsc2U7XG59O1xuXG5NZXRlb3JDdXJzb3IucHJvdG90eXBlLm9ic2VydmVDaGFuZ2VzID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICB2YXIgaGFuZGxlO1xuICBoYW5kbGUgPSBvcmlnaW5hbE9ic2VydmVDaGFuZ2VzLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gIGlmIChUcmFja2VyLmFjdGl2ZSAmJiB0aGlzLl9pc1JlYWN0aXZlKCkpIHtcbiAgICBUcmFja2VyLm9uSW52YWxpZGF0ZSgoKSA9PiB7XG4gICAgICByZXR1cm4gaGFuZGxlLnN0b3AoKTtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gaGFuZGxlO1xufTtcblxuY2FsbGJhY2tzT3JkZXJlZCA9IHtcbiAgYWRkZWRCZWZvcmU6IHRydWUsXG4gIHJlbW92ZWQ6IHRydWUsXG4gIGNoYW5nZWQ6IHRydWUsXG4gIG1vdmVkQmVmb3JlOiB0cnVlXG59O1xuXG5jYWxsYmFja3NVbm9yZGVyZWQgPSB7XG4gIGFkZGVkOiB0cnVlLFxuICBjaGFuZ2VkOiB0cnVlLFxuICByZW1vdmVkOiB0cnVlXG59O1xuXG5yZWYgPSBbJ2ZvckVhY2gnLCAnbWFwJywgJ2ZldGNoJ107XG5mb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgbWV0aG9kID0gcmVmW2ldO1xuICAoZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgdmFyIG9yaWdpbmFsTWV0aG9kO1xuICAgIG9yaWdpbmFsTWV0aG9kID0gTWV0ZW9yQ3Vyc29yLnByb3RvdHlwZVttZXRob2RdO1xuICAgIHJldHVybiBNZXRlb3JDdXJzb3IucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbiguLi5hcmdzKSB7XG4gICAgICB2YXIgY2FsbGJhY2tzLCBvcmRlcmVkLCBzb3J0O1xuICAgICAgaWYgKHRoaXMuX2lzUmVhY3RpdmUoKSkge1xuICAgICAgICAoe3NvcnQsIG9yZGVyZWR9ID0gdGhpcy5fY3Vyc29yRGVzY3JpcHRpb24ub3B0aW9ucyk7XG4gICAgICAgIGlmIChvcmRlcmVkICE9IG51bGwpIHtcbiAgICAgICAgICBjYWxsYmFja3MgPSBvcmRlcmVkID8gY2FsbGJhY2tzT3JkZXJlZCA6IGNhbGxiYWNrc1Vub3JkZXJlZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYWxsYmFja3MgPSAhIXNvcnQgPyBjYWxsYmFja3NPcmRlcmVkIDogY2FsbGJhY2tzVW5vcmRlcmVkO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2RlcGVuZChjYWxsYmFja3MpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9yaWdpbmFsTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH07XG4gIH0pKG1ldGhvZCk7XG59XG5cbk1ldGVvckN1cnNvci5wcm90b3R5cGUuY291bnQgPSBmdW5jdGlvbiguLi5hcmdzKSB7XG4gIGlmICh0aGlzLl9pc1JlYWN0aXZlKCkpIHtcbiAgICB0aGlzLl9kZXBlbmQoe1xuICAgICAgYWRkZWQ6IHRydWUsXG4gICAgICByZW1vdmVkOiB0cnVlXG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIG9yaWdpbmFsQ291bnQuYXBwbHkodGhpcywgYXJncyk7XG59O1xuXG5pZiAob3JpZ2luYWxFeGlzdHMpIHtcbiAgTWV0ZW9yQ3Vyc29yLnByb3RvdHlwZS5leGlzdHMgPSBmdW5jdGlvbiguLi5hcmdzKSB7XG4gICAgaWYgKHRoaXMuX2lzUmVhY3RpdmUoKSkge1xuICAgICAgdGhpcy5fZGVwZW5kKHtcbiAgICAgICAgYWRkZWQ6IHRydWUsXG4gICAgICAgIHJlbW92ZWQ6IHRydWVcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gb3JpZ2luYWxFeGlzdHMuYXBwbHkodGhpcywgYXJncyk7XG4gIH07XG59XG4iXX0=
