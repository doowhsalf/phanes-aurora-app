(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var _ = Package.underscore._;
var Promise = Package.promise.Promise;
var meteorInstall = Package.modules.meteorInstall;

/* Package-scope variables */
var __coffeescriptShare, FiberUtils;

var require = meteorInstall({"node_modules":{"meteor":{"peerlibrary:fiber-utils":{"src":{"meteor-server.coffee":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
// packages/peerlibrary_fiber-utils/src/meteor-server.coffee                                         //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
module.export({
  FiberUtils: () => fiberUtils
});
let Fiber;
module.link("fibers", {
  default(v) {
    Fiber = v;
  }

}, 0);
let Future;
module.link("fibers/future", {
  default(v) {
    Future = v;
  }

}, 1);
var fiberUtils;
({
  FiberUtils
} = require('./server'));
module.runSetters(fiberUtils = new FiberUtils(Fiber, Future));
///////////////////////////////////////////////////////////////////////////////////////////////////////

},"base.coffee":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
// packages/peerlibrary_fiber-utils/src/base.coffee                                                  //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
module.export({
  FiberUtils: () => FiberUtils
});
var FiberUtils = class FiberUtils {
  constructor(Fiber, Future) {
    this.Fiber = Fiber;
    this.Future = Future;
  }

};
///////////////////////////////////////////////////////////////////////////////////////////////////////

},"fence.coffee":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
// packages/peerlibrary_fiber-utils/src/fence.coffee                                                 //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var OrderedFence,
    _,
    assert,
    indexOf = [].indexOf;

_ = require('underscore');
assert = require('assert');
OrderedFence = class OrderedFence {
  constructor(Fiber, Future, {
    allowRecursive,
    allowNested,
    breakDeadlocks
  }) {
    this.Fiber = Fiber;
    this.Future = Future;
    this.allowRecursive = allowRecursive;
    this.allowNested = allowNested;
    this.breakDeadlocks = breakDeadlocks;

    if (this.allowRecursive == null) {
      this.allowRecursive = true;
    }

    if (this.allowNested == null) {
      this.allowNested = true;
    }

    if (this.breakDeadlocks == null) {
      this.breakDeadlocks = true;
    } // A chain of futures to enforce order.


    this._futures = []; // Fiber that is currently executing the guarded section.

    this._currentFiber = null;
  }

  enter() {
    var base, base1, dependedFiber, future, node, ownFuture, queue, visited;

    if (this.Fiber.current === this._currentFiber) {
      if (!this.allowRecursive) {
        // We allow to reenter the guarded section from the current fiber. We must not establish
        // a dependency in this case as this would cause a deadlock.
        throw new Error("Recursive reentry of guarded section within the same fiber not allowed.");
      }

      return false;
    }

    if (this.Fiber.current._guardsActive > 0 && !this.allowNested) {
      // By default we allow nested guards, but that leads to the possibility of deadlock occurring.
      throw new Error("Nesting of guarded sections is not allowed.");
    } // Track dependencies.


    dependedFiber = null;

    if (this._currentFiber) {
      if ((base = this.Fiber.current)._dependencies == null) {
        base._dependencies = [];
      }

      this.Fiber.current._dependencies.push(this._currentFiber);

      dependedFiber = this._currentFiber; // Search for cycles.

      visited = [];
      queue = [this.Fiber.current];

      while (true) {
        node = queue.shift();

        if (!node) {
          break;
        }

        if (indexOf.call(visited, node) >= 0) {
          if (this.breakDeadlocks) {
            // Remove our dependency.
            this.Fiber.current._dependencies = _.without(this.Fiber.current._dependencies, this._currentFiber); // Prevent deadlock.

            throw new Error("Dependency cycle detected between guarded sections.");
          }

          console.warn("Dependency cycle detected between guarded sections. Deadlock not broken.");
          break;
        }

        visited.push(node);
        queue = queue.concat(node._dependencies);
      } // Free references to fibers.


      queue = null;
      visited = null;
    }

    future = null;

    if (!_.isEmpty(this._futures)) {
      future = this._futures[this._futures.length - 1];
    } // Establish a new future so others may depend on us.


    ownFuture = new this.Future();

    this._futures.push(ownFuture); // Depend on any futures before us.


    if (future != null) {
      future.wait();
    }

    if (dependedFiber) {
      // Remove dependency.
      this.Fiber.current._dependencies = _.without(this.Fiber.current._dependencies, dependedFiber);
    } // When we start executing, there can only be one outstanding future.


    assert(this._futures[0] === ownFuture);
    assert(!this._currentFiber); // Store current fiber.

    this._currentFiber = this.Fiber.current;

    if ((base1 = this._currentFiber)._guardsActive == null) {
      base1._guardsActive = 0;
    }

    this._currentFiber._guardsActive++;
    return true;
  }

  exit(topLevel) {
    var ref;

    if (!topLevel) {
      return;
    } // Reset current fiber.


    assert(this._currentFiber._guardsActive > 0);
    this._currentFiber._guardsActive--;
    this._currentFiber = null; // The first future is resolved.

    return (ref = this._futures.shift()) != null ? ref.return() : void 0;
  }

  isInUse() {
    return this._futures.length > 0;
  }

};
module.exports = {
  OrderedFence
};
///////////////////////////////////////////////////////////////////////////////////////////////////////

},"server.coffee":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
// packages/peerlibrary_fiber-utils/src/server.coffee                                                //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
module.export({
  FiberUtils: () => FiberUtils
});
let FiberUtils;
module.link("./base", {
  FiberUtils(v) {
    FiberUtils = v;
  }

}, 0);
let OrderedFence;
module.link("./fence", {
  OrderedFence(v) {
    OrderedFence = v;
  }

}, 1);

FiberUtils.prototype.sleep = function (ms) {
  var future;
  future = new this.Future();
  setTimeout(function () {
    return future.return();
  }, ms);
  future.wait();
};

FiberUtils.prototype.wrap = function (f, scope = null) {
  return (...args) => {
    return this.Future.wrap(f).apply(scope, args).wait();
  };
};

FiberUtils.prototype.in = function (f, scope = null, handleErrors = null) {
  return (...args) => {
    var error;

    if (this.Fiber.current) {
      try {
        f.apply(scope, args);
      } catch (error1) {
        error = error1;

        if (handleErrors) {
          handleErrors.call(scope, error);
        } else {
          throw error;
        }
      }
    } else {
      new this.Fiber(function () {
        try {
          return f.apply(scope, args);
        } catch (error1) {
          error = error1;

          if (handleErrors) {
            return handleErrors.call(scope, error);
          } else {
            throw error;
          }
        }
      }).run();
    }
  };
}; // Function cannot return a value when not already running
// inside a Fiber, so let us not return a value at all.


FiberUtils.prototype.ensure = function (f, scope = null, handleErrors = null) {
  this.in(f, scope, handleErrors)();
}; // Function cannot return a value when not already running
// inside a Fiber, so let us not return a value at all.


FiberUtils.prototype.synchronize = function (guardObject, uniqueId, f, options = {}) {
  var guards, topLevel; // Use the guard object to determine whether we have reentered.

  guards = guardObject._guards != null ? guardObject._guards : guardObject._guards = {};

  if (guards[uniqueId] == null) {
    guards[uniqueId] = new OrderedFence(this.Fiber, this.Future, options);
  }

  topLevel = guards[uniqueId].enter();

  try {
    return f();
  } finally {
    guards[uniqueId].exit(topLevel);

    if (uniqueId in guards && !guards[uniqueId].isInUse()) {
      delete guards[uniqueId];
    }
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////

}},"node_modules":{"underscore":{"package.json":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
// node_modules/meteor/peerlibrary_fiber-utils/node_modules/underscore/package.json                  //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                     //
module.exports = {
  "name": "underscore",
  "version": "1.8.3",
  "main": "underscore.js"
};

///////////////////////////////////////////////////////////////////////////////////////////////////////

},"underscore.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
// node_modules/meteor/peerlibrary_fiber-utils/node_modules/underscore/underscore.js                 //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                     //
module.useNode();
///////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".coffee"
  ]
});

var exports = require("/node_modules/meteor/peerlibrary:fiber-utils/src/meteor-server.coffee");

/* Exports */
Package._define("peerlibrary:fiber-utils", exports, {
  FiberUtils: FiberUtils
});

})();

//# sourceURL=meteor://💻app/packages/peerlibrary_fiber-utils.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvcGVlcmxpYnJhcnlfZmliZXItdXRpbHMvc3JjL21ldGVvci1zZXJ2ZXIuY29mZmVlIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9wZWVybGlicmFyeV9maWJlci11dGlscy9zcmMvYmFzZS5jb2ZmZWUiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL3BlZXJsaWJyYXJ5X2ZpYmVyLXV0aWxzL3NyYy9mZW5jZS5jb2ZmZWUiLCJtZXRlb3I6Ly/wn5K7YXBwL3NyYy9mZW5jZS5jb2ZmZWUiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL3BlZXJsaWJyYXJ5X2ZpYmVyLXV0aWxzL3NyYy9zZXJ2ZXIuY29mZmVlIiwibWV0ZW9yOi8v8J+Su2FwcC9zcmMvc2VydmVyLmNvZmZlZSJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnQiLCJGaWJlclV0aWxzIiwiZmliZXJVdGlscyIsIkZpYmVyIiwibGluayIsImRlZmF1bHQiLCJ2IiwiRnV0dXJlIiwicmVxdWlyZSIsImNvbnN0cnVjdG9yIiwiT3JkZXJlZEZlbmNlIiwiXyIsImFzc2VydCIsImluZGV4T2YiLCJhbGxvd1JlY3Vyc2l2ZSIsImFsbG93TmVzdGVkIiwiYnJlYWtEZWFkbG9ja3MiLCJfZnV0dXJlcyIsIl9jdXJyZW50RmliZXIiLCJlbnRlciIsImJhc2UiLCJiYXNlMSIsImRlcGVuZGVkRmliZXIiLCJmdXR1cmUiLCJub2RlIiwib3duRnV0dXJlIiwicXVldWUiLCJ2aXNpdGVkIiwiY3VycmVudCIsIkVycm9yIiwiX2d1YXJkc0FjdGl2ZSIsIl9kZXBlbmRlbmNpZXMiLCJwdXNoIiwic2hpZnQiLCJjYWxsIiwid2l0aG91dCIsImNvbnNvbGUiLCJ3YXJuIiwiY29uY2F0IiwiaXNFbXB0eSIsImxlbmd0aCIsIndhaXQiLCJleGl0IiwidG9wTGV2ZWwiLCJyZWYiLCJyZXR1cm4iLCJpc0luVXNlIiwiZXhwb3J0cyIsInByb3RvdHlwZSIsInNsZWVwIiwibXMiLCJzZXRUaW1lb3V0Iiwid3JhcCIsImYiLCJzY29wZSIsImFyZ3MiLCJhcHBseSIsImluIiwiaGFuZGxlRXJyb3JzIiwiZXJyb3IiLCJlcnJvcjEiLCJydW4iLCJlbnN1cmUiLCJzeW5jaHJvbml6ZSIsImd1YXJkT2JqZWN0IiwidW5pcXVlSWQiLCJvcHRpb25zIiwiZ3VhcmRzIiwiX2d1YXJkcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsTUFBQSxDQUFBQyxNQUFBO0FBQUFDLFlBQUEsUUFBQUM7QUFBQTtBQUFBLElBQUFDLEtBQUE7QUFBQUosTUFBQSxDQUFBSyxJQUFBO0FBQUFDLFNBQUEsQ0FBQUMsQ0FBQTtBQUFBSCxTQUFBLEdBQUFHLENBQUE7QUFBQTs7QUFBQTtBQUFBLElBQUFDLE1BQUE7QUFBQVIsTUFBQSxDQUFBSyxJQUFBO0FBQUFDLFNBQUEsQ0FBQUMsQ0FBQTtBQUFBQyxVQUFBLEdBQUFELENBQUE7QUFBQTs7QUFBQTtBQUFBLElBQUFKLFVBQUE7QUFBQTtBQUFDRDtBQUFELElBQWVPLE9BQUEsQ0FBUSxVQUFSLENBQWY7QUFLQSxrQkFBQU4sVUFBQSxHQUFhLElBQUlELFVBQUosQ0FBZUUsS0FBZixFQUFzQkksTUFBdEIsQ0FBYixFOzs7Ozs7Ozs7Ozs7QUNMQVIsTUFBQSxDQUFBQyxNQUFBLENBQWE7QUFBQUMsWUFBTixRQUFBQTtBQUFNLENBQWI7QUFBQSxJQUFhQSxVQUFBLEdBQU4sTUFBQUEsVUFBQTtBQUNMUSxhQUFhLENBQUFOLEtBQUEsRUFBQUksTUFBQTtBQUFDLFNBQUNKLEtBQUQsR0FBQ0EsS0FBRDtBQUFRLFNBQUNJLE1BQUQsR0FBQ0EsTUFBRDtBQUFUOztBQURSLENBQVAsQzs7Ozs7Ozs7Ozs7O0FDQUEsSUFBQUcsWUFBQTtBQUFBLElBQUFDLENBQUE7QUFBQSxJQUFBQyxNQUFBO0FBQUEsSUFBQUMsT0FBQSxNQUFBQSxPQUFBOztBQUFBRixDQUFBLEdBQUlILE9BQUEsQ0FBUSxZQUFSLENBQUo7QUFDQUksTUFBQSxH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IntGaWJlclV0aWxzfSA9IHJlcXVpcmUgJy4vc2VydmVyJ1xuXG5pbXBvcnQgRmliZXIgZnJvbSAnZmliZXJzJ1xuaW1wb3J0IEZ1dHVyZSBmcm9tICdmaWJlcnMvZnV0dXJlJ1xuXG5maWJlclV0aWxzID0gbmV3IEZpYmVyVXRpbHMgRmliZXIsIEZ1dHVyZVxuXG5leHBvcnQge2ZpYmVyVXRpbHMgYXMgRmliZXJVdGlsc31cbiIsImV4cG9ydCBjbGFzcyBGaWJlclV0aWxzXG4gIGNvbnN0cnVjdG9yOiAoQEZpYmVyLCBARnV0dXJlKSAtPlxuIiwiXyA9IHJlcXVpcmUgJ3VuZGVyc2NvcmUnXG5hc3NlcnQgPSByZXF1aXJlICdhc3NlcnQnXG5cbmNsYXNzIE9yZGVyZWRGZW5jZVxuICBjb25zdHJ1Y3RvcjogKEBGaWJlciwgQEZ1dHVyZSwge0BhbGxvd1JlY3Vyc2l2ZSwgQGFsbG93TmVzdGVkLCBAYnJlYWtEZWFkbG9ja3N9KSAtPlxuICAgIEBhbGxvd1JlY3Vyc2l2ZSA/PSB0cnVlXG4gICAgQGFsbG93TmVzdGVkID89IHRydWVcbiAgICBAYnJlYWtEZWFkbG9ja3MgPz0gdHJ1ZVxuXG4gICAgIyBBIGNoYWluIG9mIGZ1dHVyZXMgdG8gZW5mb3JjZSBvcmRlci5cbiAgICBAX2Z1dHVyZXMgPSBbXVxuICAgICMgRmliZXIgdGhhdCBpcyBjdXJyZW50bHkgZXhlY3V0aW5nIHRoZSBndWFyZGVkIHNlY3Rpb24uXG4gICAgQF9jdXJyZW50RmliZXIgPSBudWxsXG5cbiAgZW50ZXI6IC0+XG4gICAgaWYgQEZpYmVyLmN1cnJlbnQgaXMgQF9jdXJyZW50RmliZXJcbiAgICAgICMgV2UgYWxsb3cgdG8gcmVlbnRlciB0aGUgZ3VhcmRlZCBzZWN0aW9uIGZyb20gdGhlIGN1cnJlbnQgZmliZXIuIFdlIG11c3Qgbm90IGVzdGFibGlzaFxuICAgICAgIyBhIGRlcGVuZGVuY3kgaW4gdGhpcyBjYXNlIGFzIHRoaXMgd291bGQgY2F1c2UgYSBkZWFkbG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvciBcIlJlY3Vyc2l2ZSByZWVudHJ5IG9mIGd1YXJkZWQgc2VjdGlvbiB3aXRoaW4gdGhlIHNhbWUgZmliZXIgbm90IGFsbG93ZWQuXCIgdW5sZXNzIEBhbGxvd1JlY3Vyc2l2ZVxuXG4gICAgICByZXR1cm4gZmFsc2VcblxuICAgIGlmIEBGaWJlci5jdXJyZW50Ll9ndWFyZHNBY3RpdmUgPiAwIGFuZCBub3QgQGFsbG93TmVzdGVkXG4gICAgICAjIEJ5IGRlZmF1bHQgd2UgYWxsb3cgbmVzdGVkIGd1YXJkcywgYnV0IHRoYXQgbGVhZHMgdG8gdGhlIHBvc3NpYmlsaXR5IG9mIGRlYWRsb2NrIG9jY3VycmluZy5cbiAgICAgIHRocm93IG5ldyBFcnJvciBcIk5lc3Rpbmcgb2YgZ3VhcmRlZCBzZWN0aW9ucyBpcyBub3QgYWxsb3dlZC5cIlxuXG4gICAgIyBUcmFjayBkZXBlbmRlbmNpZXMuXG4gICAgZGVwZW5kZWRGaWJlciA9IG51bGxcbiAgICBpZiBAX2N1cnJlbnRGaWJlclxuICAgICAgQEZpYmVyLmN1cnJlbnQuX2RlcGVuZGVuY2llcyA/PSBbXVxuICAgICAgQEZpYmVyLmN1cnJlbnQuX2RlcGVuZGVuY2llcy5wdXNoIEBfY3VycmVudEZpYmVyXG4gICAgICBkZXBlbmRlZEZpYmVyID0gQF9jdXJyZW50RmliZXJcblxuICAgICAgIyBTZWFyY2ggZm9yIGN5Y2xlcy5cbiAgICAgIHZpc2l0ZWQgPSBbXVxuICAgICAgcXVldWUgPSBbQEZpYmVyLmN1cnJlbnRdXG4gICAgICBsb29wXG4gICAgICAgIG5vZGUgPSBxdWV1ZS5zaGlmdCgpXG4gICAgICAgIGJyZWFrIHVubGVzcyBub2RlXG5cbiAgICAgICAgaWYgbm9kZSBpbiB2aXNpdGVkXG4gICAgICAgICAgaWYgQGJyZWFrRGVhZGxvY2tzXG4gICAgICAgICAgICAjIFJlbW92ZSBvdXIgZGVwZW5kZW5jeS5cbiAgICAgICAgICAgIEBGaWJlci5jdXJyZW50Ll9kZXBlbmRlbmNpZXMgPSBfLndpdGhvdXQgQEZpYmVyLmN1cnJlbnQuX2RlcGVuZGVuY2llcywgQF9jdXJyZW50RmliZXJcbiAgICAgICAgICAgICMgUHJldmVudCBkZWFkbG9jay5cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvciBcIkRlcGVuZGVuY3kgY3ljbGUgZGV0ZWN0ZWQgYmV0d2VlbiBndWFyZGVkIHNlY3Rpb25zLlwiXG5cbiAgICAgICAgICBjb25zb2xlLndhcm4gXCJEZXBlbmRlbmN5IGN5Y2xlIGRldGVjdGVkIGJldHdlZW4gZ3VhcmRlZCBzZWN0aW9ucy4gRGVhZGxvY2sgbm90IGJyb2tlbi5cIlxuICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgdmlzaXRlZC5wdXNoIG5vZGVcbiAgICAgICAgcXVldWUgPSBxdWV1ZS5jb25jYXQgbm9kZS5fZGVwZW5kZW5jaWVzXG4gICAgICAjIEZyZWUgcmVmZXJlbmNlcyB0byBmaWJlcnMuXG4gICAgICBxdWV1ZSA9IG51bGxcbiAgICAgIHZpc2l0ZWQgPSBudWxsXG5cbiAgICBmdXR1cmUgPSBudWxsXG4gICAgZnV0dXJlID0gQF9mdXR1cmVzW0BfZnV0dXJlcy5sZW5ndGggLSAxXSB1bmxlc3MgXy5pc0VtcHR5IEBfZnV0dXJlc1xuICAgICMgRXN0YWJsaXNoIGEgbmV3IGZ1dHVyZSBzbyBvdGhlcnMgbWF5IGRlcGVuZCBvbiB1cy5cbiAgICBvd25GdXR1cmUgPSBuZXcgQEZ1dHVyZSgpXG4gICAgQF9mdXR1cmVzLnB1c2ggb3duRnV0dXJlXG4gICAgIyBEZXBlbmQgb24gYW55IGZ1dHVyZXMgYmVmb3JlIHVzLlxuICAgIGZ1dHVyZT8ud2FpdCgpXG4gICAgIyBSZW1vdmUgZGVwZW5kZW5jeS5cbiAgICBARmliZXIuY3VycmVudC5fZGVwZW5kZW5jaWVzID0gXy53aXRob3V0IEBGaWJlci5jdXJyZW50Ll9kZXBlbmRlbmNpZXMsIGRlcGVuZGVkRmliZXIgaWYgZGVwZW5kZWRGaWJlclxuICAgICMgV2hlbiB3ZSBzdGFydCBleGVjdXRpbmcsIHRoZXJlIGNhbiBvbmx5IGJlIG9uZSBvdXRzdGFuZGluZyBmdXR1cmUuXG4gICAgYXNzZXJ0IEBfZnV0dXJlc1swXSBpcyBvd25GdXR1cmVcbiAgICBhc3NlcnQgbm90IEBfY3VycmVudEZpYmVyXG4gICAgIyBTdG9yZSBjdXJyZW50IGZpYmVyLlxuICAgIEBfY3VycmVudEZpYmVyID0gQEZpYmVyLmN1cnJlbnRcbiAgICBAX2N1cnJlbnRGaWJlci5fZ3VhcmRzQWN0aXZlID89IDBcbiAgICBAX2N1cnJlbnRGaWJlci5fZ3VhcmRzQWN0aXZlKytcblxuICAgIHRydWVcblxuICBleGl0OiAodG9wTGV2ZWwpIC0+XG4gICAgcmV0dXJuIHVubGVzcyB0b3BMZXZlbFxuXG4gICAgIyBSZXNldCBjdXJyZW50IGZpYmVyLlxuICAgIGFzc2VydCBAX2N1cnJlbnRGaWJlci5fZ3VhcmRzQWN0aXZlID4gMFxuICAgIEBfY3VycmVudEZpYmVyLl9ndWFyZHNBY3RpdmUtLVxuICAgIEBfY3VycmVudEZpYmVyID0gbnVsbFxuICAgICMgVGhlIGZpcnN0IGZ1dHVyZSBpcyByZXNvbHZlZC5cbiAgICBAX2Z1dHVyZXMuc2hpZnQoKT8ucmV0dXJuKClcblxuICBpc0luVXNlOiAtPlxuICAgIEBfZnV0dXJlcy5sZW5ndGggPiAwXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBPcmRlcmVkRmVuY2Vcbn1cbiIsInZhciBPcmRlcmVkRmVuY2UsIF8sIGFzc2VydCxcbiAgaW5kZXhPZiA9IFtdLmluZGV4T2Y7XG5cbl8gPSByZXF1aXJlKCd1bmRlcnNjb3JlJyk7XG5cbmFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpO1xuXG5PcmRlcmVkRmVuY2UgPSBjbGFzcyBPcmRlcmVkRmVuY2Uge1xuICBjb25zdHJ1Y3RvcihGaWJlciwgRnV0dXJlLCB7YWxsb3dSZWN1cnNpdmUsIGFsbG93TmVzdGVkLCBicmVha0RlYWRsb2Nrc30pIHtcbiAgICB0aGlzLkZpYmVyID0gRmliZXI7XG4gICAgdGhpcy5GdXR1cmUgPSBGdXR1cmU7XG4gICAgdGhpcy5hbGxvd1JlY3Vyc2l2ZSA9IGFsbG93UmVjdXJzaXZlO1xuICAgIHRoaXMuYWxsb3dOZXN0ZWQgPSBhbGxvd05lc3RlZDtcbiAgICB0aGlzLmJyZWFrRGVhZGxvY2tzID0gYnJlYWtEZWFkbG9ja3M7XG4gICAgaWYgKHRoaXMuYWxsb3dSZWN1cnNpdmUgPT0gbnVsbCkge1xuICAgICAgdGhpcy5hbGxvd1JlY3Vyc2l2ZSA9IHRydWU7XG4gICAgfVxuICAgIGlmICh0aGlzLmFsbG93TmVzdGVkID09IG51bGwpIHtcbiAgICAgIHRoaXMuYWxsb3dOZXN0ZWQgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAodGhpcy5icmVha0RlYWRsb2NrcyA9PSBudWxsKSB7XG4gICAgICB0aGlzLmJyZWFrRGVhZGxvY2tzID0gdHJ1ZTtcbiAgICB9XG4gICAgLy8gQSBjaGFpbiBvZiBmdXR1cmVzIHRvIGVuZm9yY2Ugb3JkZXIuXG4gICAgdGhpcy5fZnV0dXJlcyA9IFtdO1xuICAgIC8vIEZpYmVyIHRoYXQgaXMgY3VycmVudGx5IGV4ZWN1dGluZyB0aGUgZ3VhcmRlZCBzZWN0aW9uLlxuICAgIHRoaXMuX2N1cnJlbnRGaWJlciA9IG51bGw7XG4gIH1cblxuICBlbnRlcigpIHtcbiAgICB2YXIgYmFzZSwgYmFzZTEsIGRlcGVuZGVkRmliZXIsIGZ1dHVyZSwgbm9kZSwgb3duRnV0dXJlLCBxdWV1ZSwgdmlzaXRlZDtcbiAgICBpZiAodGhpcy5GaWJlci5jdXJyZW50ID09PSB0aGlzLl9jdXJyZW50RmliZXIpIHtcbiAgICAgIGlmICghdGhpcy5hbGxvd1JlY3Vyc2l2ZSkge1xuICAgICAgICAvLyBXZSBhbGxvdyB0byByZWVudGVyIHRoZSBndWFyZGVkIHNlY3Rpb24gZnJvbSB0aGUgY3VycmVudCBmaWJlci4gV2UgbXVzdCBub3QgZXN0YWJsaXNoXG4gICAgICAgIC8vIGEgZGVwZW5kZW5jeSBpbiB0aGlzIGNhc2UgYXMgdGhpcyB3b3VsZCBjYXVzZSBhIGRlYWRsb2NrLlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSZWN1cnNpdmUgcmVlbnRyeSBvZiBndWFyZGVkIHNlY3Rpb24gd2l0aGluIHRoZSBzYW1lIGZpYmVyIG5vdCBhbGxvd2VkLlwiKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuRmliZXIuY3VycmVudC5fZ3VhcmRzQWN0aXZlID4gMCAmJiAhdGhpcy5hbGxvd05lc3RlZCkge1xuICAgICAgLy8gQnkgZGVmYXVsdCB3ZSBhbGxvdyBuZXN0ZWQgZ3VhcmRzLCBidXQgdGhhdCBsZWFkcyB0byB0aGUgcG9zc2liaWxpdHkgb2YgZGVhZGxvY2sgb2NjdXJyaW5nLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTmVzdGluZyBvZiBndWFyZGVkIHNlY3Rpb25zIGlzIG5vdCBhbGxvd2VkLlwiKTtcbiAgICB9XG4gICAgLy8gVHJhY2sgZGVwZW5kZW5jaWVzLlxuICAgIGRlcGVuZGVkRmliZXIgPSBudWxsO1xuICAgIGlmICh0aGlzLl9jdXJyZW50RmliZXIpIHtcbiAgICAgIGlmICgoYmFzZSA9IHRoaXMuRmliZXIuY3VycmVudCkuX2RlcGVuZGVuY2llcyA9PSBudWxsKSB7XG4gICAgICAgIGJhc2UuX2RlcGVuZGVuY2llcyA9IFtdO1xuICAgICAgfVxuICAgICAgdGhpcy5GaWJlci5jdXJyZW50Ll9kZXBlbmRlbmNpZXMucHVzaCh0aGlzLl9jdXJyZW50RmliZXIpO1xuICAgICAgZGVwZW5kZWRGaWJlciA9IHRoaXMuX2N1cnJlbnRGaWJlcjtcbiAgICAgIC8vIFNlYXJjaCBmb3IgY3ljbGVzLlxuICAgICAgdmlzaXRlZCA9IFtdO1xuICAgICAgcXVldWUgPSBbdGhpcy5GaWJlci5jdXJyZW50XTtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIG5vZGUgPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXhPZi5jYWxsKHZpc2l0ZWQsIG5vZGUpID49IDApIHtcbiAgICAgICAgICBpZiAodGhpcy5icmVha0RlYWRsb2Nrcykge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIG91ciBkZXBlbmRlbmN5LlxuICAgICAgICAgICAgdGhpcy5GaWJlci5jdXJyZW50Ll9kZXBlbmRlbmNpZXMgPSBfLndpdGhvdXQodGhpcy5GaWJlci5jdXJyZW50Ll9kZXBlbmRlbmNpZXMsIHRoaXMuX2N1cnJlbnRGaWJlcik7XG4gICAgICAgICAgICAvLyBQcmV2ZW50IGRlYWRsb2NrLlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRGVwZW5kZW5jeSBjeWNsZSBkZXRlY3RlZCBiZXR3ZWVuIGd1YXJkZWQgc2VjdGlvbnMuXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zb2xlLndhcm4oXCJEZXBlbmRlbmN5IGN5Y2xlIGRldGVjdGVkIGJldHdlZW4gZ3VhcmRlZCBzZWN0aW9ucy4gRGVhZGxvY2sgbm90IGJyb2tlbi5cIik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdmlzaXRlZC5wdXNoKG5vZGUpO1xuICAgICAgICBxdWV1ZSA9IHF1ZXVlLmNvbmNhdChub2RlLl9kZXBlbmRlbmNpZXMpO1xuICAgICAgfVxuICAgICAgLy8gRnJlZSByZWZlcmVuY2VzIHRvIGZpYmVycy5cbiAgICAgIHF1ZXVlID0gbnVsbDtcbiAgICAgIHZpc2l0ZWQgPSBudWxsO1xuICAgIH1cbiAgICBmdXR1cmUgPSBudWxsO1xuICAgIGlmICghXy5pc0VtcHR5KHRoaXMuX2Z1dHVyZXMpKSB7XG4gICAgICBmdXR1cmUgPSB0aGlzLl9mdXR1cmVzW3RoaXMuX2Z1dHVyZXMubGVuZ3RoIC0gMV07XG4gICAgfVxuICAgIC8vIEVzdGFibGlzaCBhIG5ldyBmdXR1cmUgc28gb3RoZXJzIG1heSBkZXBlbmQgb24gdXMuXG4gICAgb3duRnV0dXJlID0gbmV3IHRoaXMuRnV0dXJlKCk7XG4gICAgdGhpcy5fZnV0dXJlcy5wdXNoKG93bkZ1dHVyZSk7XG4gICAgLy8gRGVwZW5kIG9uIGFueSBmdXR1cmVzIGJlZm9yZSB1cy5cbiAgICBpZiAoZnV0dXJlICE9IG51bGwpIHtcbiAgICAgIGZ1dHVyZS53YWl0KCk7XG4gICAgfVxuICAgIGlmIChkZXBlbmRlZEZpYmVyKSB7XG4gICAgICAvLyBSZW1vdmUgZGVwZW5kZW5jeS5cbiAgICAgIHRoaXMuRmliZXIuY3VycmVudC5fZGVwZW5kZW5jaWVzID0gXy53aXRob3V0KHRoaXMuRmliZXIuY3VycmVudC5fZGVwZW5kZW5jaWVzLCBkZXBlbmRlZEZpYmVyKTtcbiAgICB9XG4gICAgLy8gV2hlbiB3ZSBzdGFydCBleGVjdXRpbmcsIHRoZXJlIGNhbiBvbmx5IGJlIG9uZSBvdXRzdGFuZGluZyBmdXR1cmUuXG4gICAgYXNzZXJ0KHRoaXMuX2Z1dHVyZXNbMF0gPT09IG93bkZ1dHVyZSk7XG4gICAgYXNzZXJ0KCF0aGlzLl9jdXJyZW50RmliZXIpO1xuICAgIC8vIFN0b3JlIGN1cnJlbnQgZmliZXIuXG4gICAgdGhpcy5fY3VycmVudEZpYmVyID0gdGhpcy5GaWJlci5jdXJyZW50O1xuICAgIGlmICgoYmFzZTEgPSB0aGlzLl9jdXJyZW50RmliZXIpLl9ndWFyZHNBY3RpdmUgPT0gbnVsbCkge1xuICAgICAgYmFzZTEuX2d1YXJkc0FjdGl2ZSA9IDA7XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnRGaWJlci5fZ3VhcmRzQWN0aXZlKys7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBleGl0KHRvcExldmVsKSB7XG4gICAgdmFyIHJlZjtcbiAgICBpZiAoIXRvcExldmVsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIFJlc2V0IGN1cnJlbnQgZmliZXIuXG4gICAgYXNzZXJ0KHRoaXMuX2N1cnJlbnRGaWJlci5fZ3VhcmRzQWN0aXZlID4gMCk7XG4gICAgdGhpcy5fY3VycmVudEZpYmVyLl9ndWFyZHNBY3RpdmUtLTtcbiAgICB0aGlzLl9jdXJyZW50RmliZXIgPSBudWxsO1xuICAgIC8vIFRoZSBmaXJzdCBmdXR1cmUgaXMgcmVzb2x2ZWQuXG4gICAgcmV0dXJuIChyZWYgPSB0aGlzLl9mdXR1cmVzLnNoaWZ0KCkpICE9IG51bGwgPyByZWYucmV0dXJuKCkgOiB2b2lkIDA7XG4gIH1cblxuICBpc0luVXNlKCkge1xuICAgIHJldHVybiB0aGlzLl9mdXR1cmVzLmxlbmd0aCA+IDA7XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7T3JkZXJlZEZlbmNlfTtcbiIsImltcG9ydCB7RmliZXJVdGlsc30gZnJvbSAnLi9iYXNlJ1xuaW1wb3J0IHtPcmRlcmVkRmVuY2V9IGZyb20gJy4vZmVuY2UnXG5cbkZpYmVyVXRpbHM6OnNsZWVwID0gKG1zKSAtPlxuICBmdXR1cmUgPSBuZXcgQEZ1dHVyZSgpXG4gIHNldFRpbWVvdXQgLT5cbiAgICBmdXR1cmUucmV0dXJuKClcbiAgLFxuICAgIG1zXG4gIGZ1dHVyZS53YWl0KClcbiAgcmV0dXJuXG5cbkZpYmVyVXRpbHM6OndyYXAgPSAoZiwgc2NvcGU9bnVsbCkgLT5cbiAgKGFyZ3MuLi4pID0+XG4gICAgQEZ1dHVyZS53cmFwKGYpLmFwcGx5KHNjb3BlLCBhcmdzKS53YWl0KClcblxuRmliZXJVdGlsczo6aW4gPSAoZiwgc2NvcGU9bnVsbCwgaGFuZGxlRXJyb3JzPW51bGwpIC0+XG4gIChhcmdzLi4uKSA9PlxuICAgIGlmIEBGaWJlci5jdXJyZW50XG4gICAgICB0cnlcbiAgICAgICAgZi5hcHBseShzY29wZSwgYXJncylcbiAgICAgIGNhdGNoIGVycm9yXG4gICAgICAgIGlmIGhhbmRsZUVycm9yc1xuICAgICAgICAgIGhhbmRsZUVycm9ycy5jYWxsIHNjb3BlLCBlcnJvclxuICAgICAgICBlbHNlXG4gICAgICAgICAgdGhyb3cgZXJyb3JcbiAgICBlbHNlXG4gICAgICBuZXcgQEZpYmVyKC0+XG4gICAgICAgIHRyeVxuICAgICAgICAgIGYuYXBwbHkoc2NvcGUsIGFyZ3MpXG4gICAgICAgIGNhdGNoIGVycm9yXG4gICAgICAgICAgaWYgaGFuZGxlRXJyb3JzXG4gICAgICAgICAgICBoYW5kbGVFcnJvcnMuY2FsbCBzY29wZSwgZXJyb3JcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aHJvdyBlcnJvclxuICAgICAgKS5ydW4oKVxuXG4gICAgIyBGdW5jdGlvbiBjYW5ub3QgcmV0dXJuIGEgdmFsdWUgd2hlbiBub3QgYWxyZWFkeSBydW5uaW5nXG4gICAgIyBpbnNpZGUgYSBGaWJlciwgc28gbGV0IHVzIG5vdCByZXR1cm4gYSB2YWx1ZSBhdCBhbGwuXG4gICAgcmV0dXJuXG5cbkZpYmVyVXRpbHM6OmVuc3VyZSA9IChmLCBzY29wZT1udWxsLCBoYW5kbGVFcnJvcnM9bnVsbCkgLT5cbiAgQGluKGYsIHNjb3BlLCBoYW5kbGVFcnJvcnMpKClcblxuICAjIEZ1bmN0aW9uIGNhbm5vdCByZXR1cm4gYSB2YWx1ZSB3aGVuIG5vdCBhbHJlYWR5IHJ1bm5pbmdcbiAgIyBpbnNpZGUgYSBGaWJlciwgc28gbGV0IHVzIG5vdCByZXR1cm4gYSB2YWx1ZSBhdCBhbGwuXG4gIHJldHVyblxuXG5GaWJlclV0aWxzOjpzeW5jaHJvbml6ZSA9IChndWFyZE9iamVjdCwgdW5pcXVlSWQsIGYsIG9wdGlvbnM9e30pIC0+XG4gICMgVXNlIHRoZSBndWFyZCBvYmplY3QgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgd2UgaGF2ZSByZWVudGVyZWQuXG4gIGd1YXJkcyA9IGd1YXJkT2JqZWN0Ll9ndWFyZHMgPz0ge31cbiAgZ3VhcmRzW3VuaXF1ZUlkXSA/PSBuZXcgT3JkZXJlZEZlbmNlIEBGaWJlciwgQEZ1dHVyZSwgb3B0aW9uc1xuICB0b3BMZXZlbCA9IGd1YXJkc1t1bmlxdWVJZF0uZW50ZXIoKVxuXG4gIHRyeVxuICAgIHJldHVybiBmKClcbiAgZmluYWxseVxuICAgIGd1YXJkc1t1bmlxdWVJZF0uZXhpdCB0b3BMZXZlbFxuICAgIGRlbGV0ZSBndWFyZHNbdW5pcXVlSWRdIGlmIHVuaXF1ZUlkIG9mIGd1YXJkcyBhbmQgbm90IGd1YXJkc1t1bmlxdWVJZF0uaXNJblVzZSgpXG5cbmV4cG9ydCB7RmliZXJVdGlsc31cbiIsImltcG9ydCB7XG4gIEZpYmVyVXRpbHNcbn0gZnJvbSAnLi9iYXNlJztcblxuaW1wb3J0IHtcbiAgT3JkZXJlZEZlbmNlXG59IGZyb20gJy4vZmVuY2UnO1xuXG5GaWJlclV0aWxzLnByb3RvdHlwZS5zbGVlcCA9IGZ1bmN0aW9uKG1zKSB7XG4gIHZhciBmdXR1cmU7XG4gIGZ1dHVyZSA9IG5ldyB0aGlzLkZ1dHVyZSgpO1xuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmdXR1cmUucmV0dXJuKCk7XG4gIH0sIG1zKTtcbiAgZnV0dXJlLndhaXQoKTtcbn07XG5cbkZpYmVyVXRpbHMucHJvdG90eXBlLndyYXAgPSBmdW5jdGlvbihmLCBzY29wZSA9IG51bGwpIHtcbiAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuRnV0dXJlLndyYXAoZikuYXBwbHkoc2NvcGUsIGFyZ3MpLndhaXQoKTtcbiAgfTtcbn07XG5cbkZpYmVyVXRpbHMucHJvdG90eXBlLmluID0gZnVuY3Rpb24oZiwgc2NvcGUgPSBudWxsLCBoYW5kbGVFcnJvcnMgPSBudWxsKSB7XG4gIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAodGhpcy5GaWJlci5jdXJyZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICBmLmFwcGx5KHNjb3BlLCBhcmdzKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yMSkge1xuICAgICAgICBlcnJvciA9IGVycm9yMTtcbiAgICAgICAgaWYgKGhhbmRsZUVycm9ycykge1xuICAgICAgICAgIGhhbmRsZUVycm9ycy5jYWxsKHNjb3BlLCBlcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbmV3IHRoaXMuRmliZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIGYuYXBwbHkoc2NvcGUsIGFyZ3MpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcjEpIHtcbiAgICAgICAgICBlcnJvciA9IGVycm9yMTtcbiAgICAgICAgICBpZiAoaGFuZGxlRXJyb3JzKSB7XG4gICAgICAgICAgICByZXR1cm4gaGFuZGxlRXJyb3JzLmNhbGwoc2NvcGUsIGVycm9yKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KS5ydW4oKTtcbiAgICB9XG4gIH07XG59O1xuXG4vLyBGdW5jdGlvbiBjYW5ub3QgcmV0dXJuIGEgdmFsdWUgd2hlbiBub3QgYWxyZWFkeSBydW5uaW5nXG4vLyBpbnNpZGUgYSBGaWJlciwgc28gbGV0IHVzIG5vdCByZXR1cm4gYSB2YWx1ZSBhdCBhbGwuXG5GaWJlclV0aWxzLnByb3RvdHlwZS5lbnN1cmUgPSBmdW5jdGlvbihmLCBzY29wZSA9IG51bGwsIGhhbmRsZUVycm9ycyA9IG51bGwpIHtcbiAgdGhpcy5pbihmLCBzY29wZSwgaGFuZGxlRXJyb3JzKSgpO1xufTtcblxuLy8gRnVuY3Rpb24gY2Fubm90IHJldHVybiBhIHZhbHVlIHdoZW4gbm90IGFscmVhZHkgcnVubmluZ1xuLy8gaW5zaWRlIGEgRmliZXIsIHNvIGxldCB1cyBub3QgcmV0dXJuIGEgdmFsdWUgYXQgYWxsLlxuRmliZXJVdGlscy5wcm90b3R5cGUuc3luY2hyb25pemUgPSBmdW5jdGlvbihndWFyZE9iamVjdCwgdW5pcXVlSWQsIGYsIG9wdGlvbnMgPSB7fSkge1xuICB2YXIgZ3VhcmRzLCB0b3BMZXZlbDtcbiAgLy8gVXNlIHRoZSBndWFyZCBvYmplY3QgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgd2UgaGF2ZSByZWVudGVyZWQuXG4gIGd1YXJkcyA9IGd1YXJkT2JqZWN0Ll9ndWFyZHMgIT0gbnVsbCA/IGd1YXJkT2JqZWN0Ll9ndWFyZHMgOiBndWFyZE9iamVjdC5fZ3VhcmRzID0ge307XG4gIGlmIChndWFyZHNbdW5pcXVlSWRdID09IG51bGwpIHtcbiAgICBndWFyZHNbdW5pcXVlSWRdID0gbmV3IE9yZGVyZWRGZW5jZSh0aGlzLkZpYmVyLCB0aGlzLkZ1dHVyZSwgb3B0aW9ucyk7XG4gIH1cbiAgdG9wTGV2ZWwgPSBndWFyZHNbdW5pcXVlSWRdLmVudGVyKCk7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGYoKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBndWFyZHNbdW5pcXVlSWRdLmV4aXQodG9wTGV2ZWwpO1xuICAgIGlmICh1bmlxdWVJZCBpbiBndWFyZHMgJiYgIWd1YXJkc1t1bmlxdWVJZF0uaXNJblVzZSgpKSB7XG4gICAgICBkZWxldGUgZ3VhcmRzW3VuaXF1ZUlkXTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCB7XG4gIEZpYmVyVXRpbHNcbn07XG4iXX0=
