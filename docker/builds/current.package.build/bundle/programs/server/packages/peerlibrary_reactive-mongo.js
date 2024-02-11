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
  var callback, dependency, fnName, i, initializing, len, ref;

  if (!Tracker.active) {
    return;
  }

  dependency = new Tracker.Dependency();
  dependency.depend(); // On server side observe does not have _suppress_initial,
  // so we are skipping initial documents manually.

  initializing = true;
  callback = {};
  ref = ['added', 'changed', 'removed', 'addedBefore', 'movedBefore'];

  for (i = 0, len = ref.length; i < len; i++) {
    fnName = ref[i];

    if (changers[fnName]) {
      callback[fnName] = function () {
        if (!initializing) {
          return dependency.changed();
        }
      };
    }
  } // observeChanges will stop() when this computation is invalidated.


  this.observeChanges(callback, {
    nonMutatingCallbacks: true
  });
  return initializing = false;
};

MeteorCursor.prototype.observeChanges = function (callbacks, options = {}) {
  var handle;
  handle = originalObserveChanges.call(this, callbacks, options);

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvcGVlcmxpYnJhcnlfcmVhY3RpdmUtbW9uZ28vc2VydmVyLmNvZmZlZSIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyLmNvZmZlZSJdLCJuYW1lcyI6WyJNZXRlb3JDdXJzb3IiLCJjYWxsYmFja3NPcmRlcmVkIiwiY2FsbGJhY2tzVW5vcmRlcmVkIiwiaSIsImxlbiIsIm1ldGhvZCIsIm9yaWdpbmFsQ291bnQiLCJvcmlnaW5hbEV4aXN0cyIsIm9yaWdpbmFsT2JzZXJ2ZUNoYW5nZXMiLCJyZWYiLCJPYmplY3QiLCJnZXRQcm90b3R5cGVPZiIsIk1vbmdvSW50ZXJuYWxzIiwiZGVmYXVsdFJlbW90ZUNvbGxlY3Rpb25Ecml2ZXIiLCJtb25nbyIsImZpbmQiLCJjb25zdHJ1Y3RvciIsInByb3RvdHlwZSIsIm9ic2VydmVDaGFuZ2VzIiwiY291bnQiLCJleGlzdHMiLCJfaXNSZWFjdGl2ZSIsIl9jdXJzb3JEZXNjcmlwdGlvbiIsIm9wdGlvbnMiLCJyZWFjdGl2ZSIsIl9kZXBlbmQiLCJjaGFuZ2VycyIsImNhbGxiYWNrIiwiZGVwZW5kZW5jeSIsImZuTmFtZSIsImluaXRpYWxpemluZyIsIlRyYWNrZXIiLCJhY3RpdmUiLCJEZXBlbmRlbmN5IiwiZGVwZW5kIiwibGVuZ3RoIiwiY2hhbmdlZCIsIm5vbk11dGF0aW5nQ2FsbGJhY2tzIiwiY2FsbGJhY2tzIiwiaGFuZGxlIiwiY2FsbCIsIm9uSW52YWxpZGF0ZSIsInN0b3AiLCJhZGRlZEJlZm9yZSIsInJlbW92ZWQiLCJtb3ZlZEJlZm9yZSIsImFkZGVkIiwib3JpZ2luYWxNZXRob2QiLCJhcmdzIiwib3JkZXJlZCIsInNvcnQiLCJhcHBseSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxZQUFBLEVBQUFDLGdCQUFBLEVBQUFDLGtCQUFBLEVBQUFDLENBQUEsRUFBQUMsR0FBQSxFQUFBQyxNQUFBLEVBQUFDLGFBQUEs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TUFBZCxHQUF1QixhQUFDNEIsSUFBRDtBQUNyQixRQUFHLEtBQUMzQixXQUFELEVBQUg7QUFDRSxXQUFDSSxPQUFELENBQ0U7QUFBQXFCLGFBQUEsRUFBTyxJQUFQO0FBQ0FGLGVBQUEsRUFBUztBQURULE9BREY7QUNrQ0Q7O0FBQ0QsV0QvQkFyQyxjQUFjLENBQUM0QyxLQUFmLENBQXFCLElBQXJCLEVBQXdCSCxJQUF4QixDQytCQTtBRHJDcUIsR0FBdkI7QUN1Q0QsQyIsImZpbGUiOiIvcGFja2FnZXMvcGVlcmxpYnJhcnlfcmVhY3RpdmUtbW9uZ28uanMiLCJzb3VyY2VzQ29udGVudCI6WyJNZXRlb3JDdXJzb3IgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTW9uZ29JbnRlcm5hbHMuZGVmYXVsdFJlbW90ZUNvbGxlY3Rpb25Ecml2ZXIoKS5tb25nby5maW5kKCkpLmNvbnN0cnVjdG9yXG5cbm9yaWdpbmFsT2JzZXJ2ZUNoYW5nZXMgPSBNZXRlb3JDdXJzb3I6Om9ic2VydmVDaGFuZ2VzXG5vcmlnaW5hbENvdW50ID0gTWV0ZW9yQ3Vyc29yOjpjb3VudFxuXG4jIFRoaXMgaXMgYSBQZWVyREIgZXh0ZW5zaW9uLiBJdCBtaWdodCBub3QgZXhpc3QgaWYgdGhlIHBhY2thZ2UgaXMgdXNlZCB3aXRob3V0IFBlZXJEQi5cbiMgQnV0IHdlIGRlZmluZWQgYSB3ZWVrIGRlcGVuZGVuY3kgb24gUGVlckRCIHNvIHRoYXQgaXQgaXMgbG9hZGVkIGJlZm9yZSB0aGlzIHBhY2thZ2VcbiMgdG8gdGhhdCBQZWVyREIgYWRkcyB0aGlzIGV4dGVuc2lvbiBiZWZvcmUgd2UgZ2V0IGhlcmUuXG5vcmlnaW5hbEV4aXN0cyA9IE1ldGVvckN1cnNvcjo6ZXhpc3RzXG5cbk1ldGVvckN1cnNvcjo6X2lzUmVhY3RpdmUgPSAtPlxuICAjIEJ5IGRlZmF1bHQgd2UgbWFrZSBhbGwgY3Vyc29ycyByZWFjdGl2ZS4gQnV0IHlvdSBjYW5cbiAgIyBzdGlsbCBkaXNhYmxlIHRoYXQsIHRoZSBzYW1lIGFzIG9uIHRoZSBjbGllbnQuXG4gIEBfY3Vyc29yRGVzY3JpcHRpb24ub3B0aW9ucy5yZWFjdGl2ZSA/IHRydWVcblxuTWV0ZW9yQ3Vyc29yOjpfZGVwZW5kID0gKGNoYW5nZXJzKSAtPlxuICByZXR1cm4gdW5sZXNzIFRyYWNrZXIuYWN0aXZlXG5cbiAgZGVwZW5kZW5jeSA9IG5ldyBUcmFja2VyLkRlcGVuZGVuY3koKVxuICBkZXBlbmRlbmN5LmRlcGVuZCgpXG5cbiAgIyBPbiBzZXJ2ZXIgc2lkZSBvYnNlcnZlIGRvZXMgbm90IGhhdmUgX3N1cHByZXNzX2luaXRpYWwsXG4gICMgc28gd2UgYXJlIHNraXBwaW5nIGluaXRpYWwgZG9jdW1lbnRzIG1hbnVhbGx5LlxuICBpbml0aWFsaXppbmcgPSB0cnVlXG5cbiAgY2FsbGJhY2sgPSB7fVxuICBmb3IgZm5OYW1lIGluIFsnYWRkZWQnLCAnY2hhbmdlZCcsICdyZW1vdmVkJywgJ2FkZGVkQmVmb3JlJywgJ21vdmVkQmVmb3JlJ10gd2hlbiBjaGFuZ2Vyc1tmbk5hbWVdXG4gICAgY2FsbGJhY2tbZm5OYW1lXSA9IC0+XG4gICAgICBkZXBlbmRlbmN5LmNoYW5nZWQoKSB1bmxlc3MgaW5pdGlhbGl6aW5nXG5cbiAgIyBvYnNlcnZlQ2hhbmdlcyB3aWxsIHN0b3AoKSB3aGVuIHRoaXMgY29tcHV0YXRpb24gaXMgaW52YWxpZGF0ZWQuXG4gIEBvYnNlcnZlQ2hhbmdlcyBjYWxsYmFjaywge25vbk11dGF0aW5nQ2FsbGJhY2tzOiB0cnVlfVxuXG4gIGluaXRpYWxpemluZyA9IGZhbHNlXG5cbk1ldGVvckN1cnNvcjo6b2JzZXJ2ZUNoYW5nZXMgPSAoY2FsbGJhY2tzLCBvcHRpb25zID0ge30pIC0+XG4gIGhhbmRsZSA9IG9yaWdpbmFsT2JzZXJ2ZUNoYW5nZXMuY2FsbCBALCBjYWxsYmFja3MsIG9wdGlvbnNcbiAgaWYgVHJhY2tlci5hY3RpdmUgYW5kIEBfaXNSZWFjdGl2ZSgpXG4gICAgVHJhY2tlci5vbkludmFsaWRhdGUgPT5cbiAgICAgIGhhbmRsZS5zdG9wKClcbiAgaGFuZGxlXG5cbmNhbGxiYWNrc09yZGVyZWQgPVxuICBhZGRlZEJlZm9yZTogdHJ1ZVxuICByZW1vdmVkOiB0cnVlXG4gIGNoYW5nZWQ6IHRydWVcbiAgbW92ZWRCZWZvcmU6IHRydWVcblxuY2FsbGJhY2tzVW5vcmRlcmVkID1cbiAgYWRkZWQ6IHRydWVcbiAgY2hhbmdlZDogdHJ1ZVxuICByZW1vdmVkOiB0cnVlXG5cbmZvciBtZXRob2QgaW4gWydmb3JFYWNoJywgJ21hcCcsICdmZXRjaCddXG4gIGRvIChtZXRob2QpIC0+XG4gICAgb3JpZ2luYWxNZXRob2QgPSBNZXRlb3JDdXJzb3I6OlttZXRob2RdXG4gICAgTWV0ZW9yQ3Vyc29yOjpbbWV0aG9kXSA9IChhcmdzLi4uKSAtPlxuICAgICAgaWYgQF9pc1JlYWN0aXZlKClcbiAgICAgICAge3NvcnQsIG9yZGVyZWR9ID0gQF9jdXJzb3JEZXNjcmlwdGlvbi5vcHRpb25zXG4gICAgICAgIGlmIG9yZGVyZWQ/XG4gICAgICAgICAgY2FsbGJhY2tzID0gaWYgb3JkZXJlZCB0aGVuIGNhbGxiYWNrc09yZGVyZWQgZWxzZSBjYWxsYmFja3NVbm9yZGVyZWRcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGNhbGxiYWNrcyA9IGlmICEhc29ydCB0aGVuIGNhbGxiYWNrc09yZGVyZWQgZWxzZSBjYWxsYmFja3NVbm9yZGVyZWRcbiAgICAgICAgQF9kZXBlbmQgY2FsbGJhY2tzXG5cbiAgICAgIG9yaWdpbmFsTWV0aG9kLmFwcGx5IEAsIGFyZ3NcblxuTWV0ZW9yQ3Vyc29yOjpjb3VudCA9IChhcmdzLi4uKSAtPlxuICBpZiBAX2lzUmVhY3RpdmUoKVxuICAgIEBfZGVwZW5kXG4gICAgICBhZGRlZDogdHJ1ZVxuICAgICAgcmVtb3ZlZDogdHJ1ZVxuXG4gIG9yaWdpbmFsQ291bnQuYXBwbHkgQCwgYXJnc1xuXG5pZiBvcmlnaW5hbEV4aXN0c1xuICBNZXRlb3JDdXJzb3I6OmV4aXN0cyA9IChhcmdzLi4uKSAtPlxuICAgIGlmIEBfaXNSZWFjdGl2ZSgpXG4gICAgICBAX2RlcGVuZFxuICAgICAgICBhZGRlZDogdHJ1ZVxuICAgICAgICByZW1vdmVkOiB0cnVlXG5cbiAgICBvcmlnaW5hbEV4aXN0cy5hcHBseSBALCBhcmdzXG4iLCJ2YXIgTWV0ZW9yQ3Vyc29yLCBjYWxsYmFja3NPcmRlcmVkLCBjYWxsYmFja3NVbm9yZGVyZWQsIGksIGxlbiwgbWV0aG9kLCBvcmlnaW5hbENvdW50LCBvcmlnaW5hbEV4aXN0cywgb3JpZ2luYWxPYnNlcnZlQ2hhbmdlcywgcmVmO1xuXG5NZXRlb3JDdXJzb3IgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTW9uZ29JbnRlcm5hbHMuZGVmYXVsdFJlbW90ZUNvbGxlY3Rpb25Ecml2ZXIoKS5tb25nby5maW5kKCkpLmNvbnN0cnVjdG9yO1xuXG5vcmlnaW5hbE9ic2VydmVDaGFuZ2VzID0gTWV0ZW9yQ3Vyc29yLnByb3RvdHlwZS5vYnNlcnZlQ2hhbmdlcztcblxub3JpZ2luYWxDb3VudCA9IE1ldGVvckN1cnNvci5wcm90b3R5cGUuY291bnQ7XG5cbi8vIFRoaXMgaXMgYSBQZWVyREIgZXh0ZW5zaW9uLiBJdCBtaWdodCBub3QgZXhpc3QgaWYgdGhlIHBhY2thZ2UgaXMgdXNlZCB3aXRob3V0IFBlZXJEQi5cbi8vIEJ1dCB3ZSBkZWZpbmVkIGEgd2VlayBkZXBlbmRlbmN5IG9uIFBlZXJEQiBzbyB0aGF0IGl0IGlzIGxvYWRlZCBiZWZvcmUgdGhpcyBwYWNrYWdlXG4vLyB0byB0aGF0IFBlZXJEQiBhZGRzIHRoaXMgZXh0ZW5zaW9uIGJlZm9yZSB3ZSBnZXQgaGVyZS5cbm9yaWdpbmFsRXhpc3RzID0gTWV0ZW9yQ3Vyc29yLnByb3RvdHlwZS5leGlzdHM7XG5cbk1ldGVvckN1cnNvci5wcm90b3R5cGUuX2lzUmVhY3RpdmUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHJlZjtcbiAgLy8gQnkgZGVmYXVsdCB3ZSBtYWtlIGFsbCBjdXJzb3JzIHJlYWN0aXZlLiBCdXQgeW91IGNhblxuICAvLyBzdGlsbCBkaXNhYmxlIHRoYXQsIHRoZSBzYW1lIGFzIG9uIHRoZSBjbGllbnQuXG4gIHJldHVybiAocmVmID0gdGhpcy5fY3Vyc29yRGVzY3JpcHRpb24ub3B0aW9ucy5yZWFjdGl2ZSkgIT0gbnVsbCA/IHJlZiA6IHRydWU7XG59O1xuXG5NZXRlb3JDdXJzb3IucHJvdG90eXBlLl9kZXBlbmQgPSBmdW5jdGlvbihjaGFuZ2Vycykge1xuICB2YXIgY2FsbGJhY2ssIGRlcGVuZGVuY3ksIGZuTmFtZSwgaSwgaW5pdGlhbGl6aW5nLCBsZW4sIHJlZjtcbiAgaWYgKCFUcmFja2VyLmFjdGl2ZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBkZXBlbmRlbmN5ID0gbmV3IFRyYWNrZXIuRGVwZW5kZW5jeSgpO1xuICBkZXBlbmRlbmN5LmRlcGVuZCgpO1xuICAvLyBPbiBzZXJ2ZXIgc2lkZSBvYnNlcnZlIGRvZXMgbm90IGhhdmUgX3N1cHByZXNzX2luaXRpYWwsXG4gIC8vIHNvIHdlIGFyZSBza2lwcGluZyBpbml0aWFsIGRvY3VtZW50cyBtYW51YWxseS5cbiAgaW5pdGlhbGl6aW5nID0gdHJ1ZTtcbiAgY2FsbGJhY2sgPSB7fTtcbiAgcmVmID0gWydhZGRlZCcsICdjaGFuZ2VkJywgJ3JlbW92ZWQnLCAnYWRkZWRCZWZvcmUnLCAnbW92ZWRCZWZvcmUnXTtcbiAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgZm5OYW1lID0gcmVmW2ldO1xuICAgIGlmIChjaGFuZ2Vyc1tmbk5hbWVdKSB7XG4gICAgICBjYWxsYmFja1tmbk5hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghaW5pdGlhbGl6aW5nKSB7XG4gICAgICAgICAgcmV0dXJuIGRlcGVuZGVuY3kuY2hhbmdlZCgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfVxuICAvLyBvYnNlcnZlQ2hhbmdlcyB3aWxsIHN0b3AoKSB3aGVuIHRoaXMgY29tcHV0YXRpb24gaXMgaW52YWxpZGF0ZWQuXG4gIHRoaXMub2JzZXJ2ZUNoYW5nZXMoY2FsbGJhY2ssIHtcbiAgICBub25NdXRhdGluZ0NhbGxiYWNrczogdHJ1ZVxuICB9KTtcbiAgcmV0dXJuIGluaXRpYWxpemluZyA9IGZhbHNlO1xufTtcblxuTWV0ZW9yQ3Vyc29yLnByb3RvdHlwZS5vYnNlcnZlQ2hhbmdlcyA9IGZ1bmN0aW9uKGNhbGxiYWNrcywgb3B0aW9ucyA9IHt9KSB7XG4gIHZhciBoYW5kbGU7XG4gIGhhbmRsZSA9IG9yaWdpbmFsT2JzZXJ2ZUNoYW5nZXMuY2FsbCh0aGlzLCBjYWxsYmFja3MsIG9wdGlvbnMpO1xuICBpZiAoVHJhY2tlci5hY3RpdmUgJiYgdGhpcy5faXNSZWFjdGl2ZSgpKSB7XG4gICAgVHJhY2tlci5vbkludmFsaWRhdGUoKCkgPT4ge1xuICAgICAgcmV0dXJuIGhhbmRsZS5zdG9wKCk7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIGhhbmRsZTtcbn07XG5cbmNhbGxiYWNrc09yZGVyZWQgPSB7XG4gIGFkZGVkQmVmb3JlOiB0cnVlLFxuICByZW1vdmVkOiB0cnVlLFxuICBjaGFuZ2VkOiB0cnVlLFxuICBtb3ZlZEJlZm9yZTogdHJ1ZVxufTtcblxuY2FsbGJhY2tzVW5vcmRlcmVkID0ge1xuICBhZGRlZDogdHJ1ZSxcbiAgY2hhbmdlZDogdHJ1ZSxcbiAgcmVtb3ZlZDogdHJ1ZVxufTtcblxucmVmID0gWydmb3JFYWNoJywgJ21hcCcsICdmZXRjaCddO1xuZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gIG1ldGhvZCA9IHJlZltpXTtcbiAgKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgIHZhciBvcmlnaW5hbE1ldGhvZDtcbiAgICBvcmlnaW5hbE1ldGhvZCA9IE1ldGVvckN1cnNvci5wcm90b3R5cGVbbWV0aG9kXTtcbiAgICByZXR1cm4gTWV0ZW9yQ3Vyc29yLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oLi4uYXJncykge1xuICAgICAgdmFyIGNhbGxiYWNrcywgb3JkZXJlZCwgc29ydDtcbiAgICAgIGlmICh0aGlzLl9pc1JlYWN0aXZlKCkpIHtcbiAgICAgICAgKHtzb3J0LCBvcmRlcmVkfSA9IHRoaXMuX2N1cnNvckRlc2NyaXB0aW9uLm9wdGlvbnMpO1xuICAgICAgICBpZiAob3JkZXJlZCAhPSBudWxsKSB7XG4gICAgICAgICAgY2FsbGJhY2tzID0gb3JkZXJlZCA/IGNhbGxiYWNrc09yZGVyZWQgOiBjYWxsYmFja3NVbm9yZGVyZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2FsbGJhY2tzID0gISFzb3J0ID8gY2FsbGJhY2tzT3JkZXJlZCA6IGNhbGxiYWNrc1Vub3JkZXJlZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9kZXBlbmQoY2FsbGJhY2tzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvcmlnaW5hbE1ldGhvZC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9O1xuICB9KShtZXRob2QpO1xufVxuXG5NZXRlb3JDdXJzb3IucHJvdG90eXBlLmNvdW50ID0gZnVuY3Rpb24oLi4uYXJncykge1xuICBpZiAodGhpcy5faXNSZWFjdGl2ZSgpKSB7XG4gICAgdGhpcy5fZGVwZW5kKHtcbiAgICAgIGFkZGVkOiB0cnVlLFxuICAgICAgcmVtb3ZlZDogdHJ1ZVxuICAgIH0pO1xuICB9XG4gIHJldHVybiBvcmlnaW5hbENvdW50LmFwcGx5KHRoaXMsIGFyZ3MpO1xufTtcblxuaWYgKG9yaWdpbmFsRXhpc3RzKSB7XG4gIE1ldGVvckN1cnNvci5wcm90b3R5cGUuZXhpc3RzID0gZnVuY3Rpb24oLi4uYXJncykge1xuICAgIGlmICh0aGlzLl9pc1JlYWN0aXZlKCkpIHtcbiAgICAgIHRoaXMuX2RlcGVuZCh7XG4gICAgICAgIGFkZGVkOiB0cnVlLFxuICAgICAgICByZW1vdmVkOiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG9yaWdpbmFsRXhpc3RzLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9O1xufVxuIl19
