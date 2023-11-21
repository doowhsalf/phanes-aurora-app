(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var _ = Package.underscore._;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var assert = Package['peerlibrary:assert'].assert;
var FiberUtils = Package['peerlibrary:fiber-utils'].FiberUtils;
var Promise = Package.promise.Promise;
var meteorInstall = Package.modules.meteorInstall;

/* Package-scope variables */
var __coffeescriptShare;

var require = meteorInstall({"node_modules":{"meteor":{"peerlibrary:server-autorun":{"server.coffee":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/peerlibrary_server-autorun/server.coffee                                                                //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
module.export({
  Tracker: () => Tracker
});
let Tracker;
module.link("meteor/tracker", {
  Tracker(v) {
    Tracker = v;
  }

}, 0);
let Fiber;
module.link("fibers", {
  default(v) {
    Fiber = v;
  }

}, 1);
let Future;
module.link("fibers/future", {
  default(v) {
    Future = v;
  }

}, 2);
var TrackerInstance, guard, nextId, privateObject;
// Tracker.Computation constructor is private, so we are using this object as a guard.
// External code cannot access this, and will not be able to directly construct a
// Tracker.Computation instance.
privateObject = {}; // Guard object for fiber utils.

guard = {};
nextId = 1;
TrackerInstance = class TrackerInstance {
  constructor() {
    this.active = false;
    this.currentComputation = null;
    this.pendingComputations = [];
    this.willFlush = false;
    this.inFlush = null;
    this.inRequireFlush = false;
    this.inCompute = false;
    this.throwFirstError = false;
    this.afterFlushCallbacks = [];
  }

  setCurrentComputation(computation) {
    this.currentComputation = computation;
    return this.active = !!computation;
  } // Copied from tracker.js.


  _debugFunc() {
    if (typeof Meteor !== "undefined" && Meteor !== null ? Meteor._debug : void 0) {
      return Meteor._debug;
    }

    if (typeof console !== "undefined" && console !== null ? console.error : void 0) {
      return function () {
        return console.error.apply(console, arguments);
      };
    }

    return function () {};
  } // Copied from tracker.js.


  _maybeSuppressMoreLogs(messagesLength) {
    if (typeof Meteor !== "undefined") {
      if (Meteor._suppressed_log_expected()) {
        return Meteor._suppress_log(messagesLength - 1);
      }
    }
  } // Copied from tracker.js.


  _throwOrLog(from, error) {
    var i, idx, len, message, printArg, printArgs, results;

    if (this.throwFirstError) {
      throw error;
    } else {
      printArgs = ["Exception from Tracker " + from + " function:"];

      if (error.stack && error.message && error.name) {
        idx = error.stack.indexOf(error.message);

        if (idx < 0 || idx > error.name.length + 2) {
          message = error.name + ": " + error.message;
          printArgs.push(message);
        }
      }

      printArgs.push(error.stack);

      this._maybeSuppressMoreLogs(printArgs.length);

      results = [];

      for (i = 0, len = printArgs.length; i < len; i++) {
        printArg = printArgs[i];
        results.push(this._debugFunc()(printArg));
      }

      return results;
    }
  }

  _deferAndTransfer(func) {
    // Defer execution of a function, which will create a new fiber. Make the resulting
    // fiber share ownership of the same tracker instance as it will serve only as its
    // extension for executing its flushes.
    return Meteor.defer(() => {
      assert(!Fiber.current._trackerInstance);

      try {
        Fiber.current._trackerInstance = this;
        return func();
      } finally {
        Fiber.current._trackerInstance = null;
      }
    });
  }

  requireFlush() {
    if (this.willFlush) {
      return;
    }

    this._deferAndTransfer(() => {
      return this._runFlush({
        fromRequireFlush: true
      });
    });

    return this.willFlush = true;
  }

  _runFlush(options) {
    var computation, error, finishedTry, func, inFlush, recomputedCount;

    if (this.inFlush instanceof Future) {
      // If there are two runs from requireFlush in sequence, we simply skip the second one, the first
      // one is still in progress.
      if (options != null ? options.fromRequireFlush : void 0) {
        return;
      } // We wait for the previous flush from requireFlush to finish before continuing.


      this.inFlush.wait();
      assert(!this.inFlush);
    } // If already in flush and this is a flush from requireFlush, just skip it.


    if (this.inFlush && (options != null ? options.fromRequireFlush : void 0)) {
      return;
    }

    if (this.inFlush) {
      throw new Error("Can't call Tracker.flush while flushing");
    }

    if (this.inCompute) {
      if (options != null ? options.fromRequireFlush : void 0) {
        // If this fiber is currently running a computation and a require flush has been
        // deferred, we need to defer again and retry.
        this._deferAndTransfer(() => {
          return this._runFlush(options);
        });

        return;
      }

      throw new Error("Can't flush inside Tracker.autorun");
    } // If this is a run from requireFlush, provide a future so that calls to flush can wait on it.


    if (options != null ? options.fromRequireFlush : void 0) {
      this.inFlush = new Future();
    } else {
      this.inFlush = true;
    }

    this.willFlush = true;
    this.throwFirstError = !!(options != null ? options.throwFirstError : void 0);
    recomputedCount = 0;
    finishedTry = false;

    try {
      while (this.pendingComputations.length || this.afterFlushCallbacks.length) {
        while (this.pendingComputations.length) {
          computation = this.pendingComputations.shift();

          computation._recompute();

          if (computation._needsRecompute()) {
            this.pendingComputations.unshift(computation);
          }

          if (!(options != null ? options.finishSynchronously : void 0) && ++recomputedCount > 1000) {
            finishedTry = true;
            return;
          }
        }

        if (this.afterFlushCallbacks.length) {
          func = this.afterFlushCallbacks.shift();

          try {
            func();
          } catch (error1) {
            error = error1;

            this._throwOrLog("afterFlush", error);
          }
        }
      }

      return finishedTry = true;
    } finally {
      // We first have to set @inFlush to null, then we can return.
      inFlush = this.inFlush;

      if (!finishedTry) {
        this.inFlush = null;

        if (inFlush instanceof Future) {
          inFlush.return();
        }

        this._runFlush({
          finishSynchronously: options != null ? options.finishSynchronously : void 0,
          throwFirstError: false
        });
      }

      this.willFlush = false;
      this.inFlush = null;

      if (inFlush instanceof Future) {
        inFlush.return();
      }

      if (this.pendingComputations.length || this.afterFlushCallbacks.length) {
        if (options != null ? options.finishSynchronously : void 0) {
          throw new Error("still have more to do?");
        }

        Meteor.setTimeout(() => {
          return this.requireFlush();
        }, 10); // ms
      }
    }
  }

};

Tracker._trackerInstance = function () {
  var base;

  Meteor._nodeCodeMustBeInFiber();

  return (base = Fiber.current)._trackerInstance != null ? base._trackerInstance : base._trackerInstance = new TrackerInstance();
};

Tracker.flush = function (options) {
  return Tracker._trackerInstance()._runFlush({
    finishSynchronously: true,
    throwFirstError: options != null ? options._throwFirstError : void 0
  });
};

Tracker.inFlush = function () {
  return Tracker._trackerInstance().inFlush;
};

Tracker.autorun = function (func, options) {
  var c;

  if (typeof func !== "function") {
    throw new Error("Tracker.autorun requires a function argument");
  }

  c = new Tracker.Computation(func, Tracker.currentComputation, options != null ? options.onError : void 0, privateObject);

  if (Tracker.active) {
    Tracker.onInvalidate(function () {
      return c.stop();
    });
  }

  return c;
};

Tracker.nonreactive = function (f) {
  var previous, trackerInstance;
  trackerInstance = Tracker._trackerInstance();
  previous = trackerInstance.currentComputation;
  trackerInstance.setCurrentComputation(null);

  try {
    return f();
  } finally {
    trackerInstance.setCurrentComputation(previous);
  }
};

Tracker.onInvalidate = function (f) {
  if (!Tracker.active) {
    throw new Error("Tracker.onInvalidate requires a currentComputation");
  }

  return Tracker.currentComputation.onInvalidate(f);
};

Tracker.afterFlush = function (f) {
  var trackerInstance;
  trackerInstance = Tracker._trackerInstance();
  trackerInstance.afterFlushCallbacks.push(f);
  return trackerInstance.requireFlush();
}; // Compatibility with the client-side Tracker. On node.js we can use defineProperties to define getters.


Object.defineProperties(Tracker, {
  currentComputation: {
    get: function () {
      return Tracker._trackerInstance().currentComputation;
    }
  },
  active: {
    get: function () {
      return Tracker._trackerInstance().active;
    }
  }
});
Tracker.Computation = class Computation {
  constructor(func, _parent, _onError, _private) {
    var errored, onException;
    this._parent = _parent;
    this._onError = _onError;

    if (_private !== privateObject) {
      throw new Error("Tracker.Computation constructor is private; use Tracker.autorun");
    }

    this.stopped = false;
    this.invalidated = false;
    this.firstRun = true;
    this._id = nextId++;
    this._onInvalidateCallbacks = [];
    this._onStopCallbacks = [];
    this._beforeRunCallbacks = [];
    this._afterRunCallbacks = [];
    this._recomputing = false;
    this._trackerInstance = Tracker._trackerInstance();

    onException = error => {
      if (this.firstRun) {
        throw error;
      }

      if (this._onError) {
        return this._onError(error);
      } else {
        return this._trackerInstance._throwOrLog("recompute", error);
      }
    };

    this._func = Meteor.bindEnvironment(func, onException, this);
    errored = true;

    try {
      this._compute();

      errored = false;
    } finally {
      this.firstRun = false;

      if (errored) {
        this.stop();
      }
    }
  }

  onInvalidate(f) {
    return FiberUtils.ensure(() => {
      if (typeof f !== "function") {
        throw new Error("onInvalidate requires a function");
      }

      if (this.invalidated) {
        return Tracker.nonreactive(() => {
          return f(this);
        });
      } else {
        return this._onInvalidateCallbacks.push(f);
      }
    });
  }

  onStop(f) {
    return FiberUtils.ensure(() => {
      if (typeof f !== "function") {
        throw new Error("onStop requires a function");
      }

      if (this.stopped) {
        return Tracker.nonreactive(() => {
          return f(this);
        });
      } else {
        return this._onStopCallbacks.push(f);
      }
    });
  }

  beforeRun(f) {
    if (typeof f !== "function") {
      throw new Error("beforeRun requires a function");
    }

    return this._beforeRunCallbacks.push(f);
  }

  afterRun(f) {
    if (typeof f !== "function") {
      throw new Error("afterRun requires a function");
    }

    return this._afterRunCallbacks.push(f);
  }

  invalidate() {
    return FiberUtils.ensure(() => {
      var callback, i, len, ref; // TODO: Why some tests freeze if we wrap this method into FiberUtils.synchronize?

      if (!this.invalidated) {
        if (!this._recomputing && !this.stopped) {
          this._trackerInstance.requireFlush();

          this._trackerInstance.pendingComputations.push(this);
        }

        this.invalidated = true;
        ref = this._onInvalidateCallbacks;

        for (i = 0, len = ref.length; i < len; i++) {
          callback = ref[i];
          Tracker.nonreactive(() => {
            return callback(this);
          });
        }

        return this._onInvalidateCallbacks = [];
      }
    });
  }

  stop() {
    return FiberUtils.ensure(() => {
      return FiberUtils.synchronize(guard, this._id, () => {
        var callback, results;

        if (this.stopped) {
          return;
        }

        this.stopped = true;
        this.invalidate();
        results = [];

        while (this._onStopCallbacks.length) {
          callback = this._onStopCallbacks.shift();
          results.push(Tracker.nonreactive(() => {
            return callback(this);
          }));
        }

        return results;
      });
    });
  } // Runs an arbitrary function inside the computation. This allows breaking many assumptions, so use it very carefully.


  _runInside(func) {
    return FiberUtils.synchronize(guard, this._id, () => {
      var previousComputation, previousInCompute, previousTrackerInstance;

      Meteor._nodeCodeMustBeInFiber();

      previousTrackerInstance = Tracker._trackerInstance();
      Fiber.current._trackerInstance = this._trackerInstance;
      previousComputation = this._trackerInstance.currentComputation;

      this._trackerInstance.setCurrentComputation(this);

      previousInCompute = this._trackerInstance.inCompute;
      this._trackerInstance.inCompute = true;

      try {
        return func(this);
      } finally {
        Fiber.current._trackerInstance = previousTrackerInstance;

        this._trackerInstance.setCurrentComputation(previousComputation);

        this._trackerInstance.inCompute = previousInCompute;
      }
    });
  }

  _compute() {
    return FiberUtils.synchronize(guard, this._id, () => {
      this.invalidated = false;
      return this._runInside(computation => {
        var callback, results;

        while (this._beforeRunCallbacks.length) {
          callback = this._beforeRunCallbacks.shift();
          Tracker.nonreactive(() => {
            return callback(this);
          });
        }

        this._func.call(null, this);

        results = [];

        while (this._afterRunCallbacks.length) {
          callback = this._afterRunCallbacks.shift();
          results.push(Tracker.nonreactive(() => {
            return callback(this);
          }));
        }

        return results;
      });
    });
  }

  _needsRecompute() {
    return this.invalidated && !this.stopped;
  }

  _recompute() {
    return FiberUtils.synchronize(guard, this._id, () => {
      assert(!this._recomputing);
      this._recomputing = true;

      try {
        if (this._needsRecompute()) {
          return this._compute();
        }
      } finally {
        this._recomputing = false;
      }
    });
  }

  flush() {
    return FiberUtils.ensure(() => {
      if (this._recomputing) {
        return;
      }

      return this._recompute();
    });
  }

  run() {
    return FiberUtils.ensure(() => {
      this.invalidate();
      return this.flush();
    });
  }

};
Tracker.Dependency = class Dependency {
  constructor() {
    this._dependentsById = {};
  }

  depend(computation) {
    var id;

    if (!computation) {
      if (!Tracker.active) {
        return false;
      }

      computation = Tracker.currentComputation;
    }

    id = computation._id;

    if (!(id in this._dependentsById)) {
      this._dependentsById[id] = computation;
      computation.onInvalidate(() => {
        return delete this._dependentsById[id];
      });
      return true;
    }

    return false;
  }

  changed() {
    var computation, id, ref, results;
    ref = this._dependentsById;
    results = [];

    for (id in ref) {
      computation = ref[id];
      results.push(computation.invalidate());
    }

    return results;
  }

  hasDependents() {
    var computation, id, ref;
    ref = this._dependentsById;

    for (id in ref) {
      computation = ref[id];
      return true;
    }

    return false;
  }

};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".coffee"
  ]
});

var exports = require("/node_modules/meteor/peerlibrary:server-autorun/server.coffee");

/* Exports */
Package._define("peerlibrary:server-autorun", exports, {
  Tracker: Tracker
});

})();

//# sourceURL=meteor://💻app/packages/peerlibrary_server-autorun.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvcGVlcmxpYnJhcnlfc2VydmVyLWF1dG9ydW4vc2VydmVyLmNvZmZlZSIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyLmNvZmZlZSJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnQiLCJUcmFja2VyIiwibGluayIsInYiLCJGaWJlciIsImRlZmF1bHQiLCJGdXR1cmUiLCJUcmFja2VySW5zdGFuY2UiLCJndWFyZCIsIm5leHRJZCIsInByaXZhdGVPYmplY3QiLCJjb25zdHJ1Y3RvciIsImFjdGl2ZSIsImN1cnJlbnRDb21wdXRhdGlvbiIsInBlbmRpbmdDb21wdXRhdGlvbnMiLCJ3aWxsRmx1c2giLCJpbkZsdXNoIiwiaW5SZXF1aXJlRmx1c2giLCJpbkNvbXB1dGUiLCJ0aHJvd0ZpcnN0RXJyb3IiLCJhZnRlckZsdXNoQ2FsbGJhY2tzIiwic2V0Q3VycmVudENvbXB1dGF0aW9uIiwiY29tcHV0YXRpb24iLCJfZGVidWdGdW5jIiwiTWV0ZW9yIiwiX2RlYnVnIiwiY29uc29sZSIsImVycm9yIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJfbWF5YmVTdXBwcmVzc01vcmVMb2dzIiwibWVzc2FnZXNMZW5ndGgiLCJfc3VwcHJlc3NlZF9sb2dfZXhwZWN0ZWQiLCJfc3VwcHJlc3NfbG9nIiwiX3Rocm93T3JMb2ciLCJmcm9tIiwiaSIsImlkeCIsImxlbiIsIm1lc3NhZ2UiLCJwcmludEFyZyIsInByaW50QXJncyIsInJlc3VsdHMiLCJzdGFjayIsIm5hbWUiLCJpbmRleE9mIiwibGVuZ3RoIiwicHVzaCIsIl9kZWZlckFuZFRyYW5zZmVyIiwiZnVuYyIsImRlZmVyIiwiYXNzZXJ0IiwiY3VycmVudCIsIl90cmFja2VySW5zdGFuY2UiLCJyZXF1aXJlRmx1c2giLCJfcnVuRmx1c2giLCJmcm9tUmVxdWlyZUZsdXNoIiwib3B0aW9ucyIsImZpbmlzaGVkVHJ5IiwicmVjb21wdXRlZENvdW50Iiwid2FpdCIsIkVycm9yIiwic2hpZnQiLCJfcmVjb21wdXRlIiwiX25lZWRzUmVjb21wdXRlIiwidW5zaGlmdCIsImZpbmlzaFN5bmNocm9ub3VzbHkiLCJlcnJvcjEiLCJyZXR1cm4iLCJzZXRUaW1lb3V0IiwiYmFzZSIsIl9ub2RlQ29kZU11c3RCZUluRmliZXIiLCJmbHVzaCIsIl90aHJvd0ZpcnN0RXJyb3IiLCJhdXRvcnVuIiwiYyIsIkNvbXB1dGF0aW9uIiwib25FcnJvciIsIm9uSW52YWxpZGF0ZSIsInN0b3AiLCJub25yZWFjdGl2ZSIsImYiLCJwcmV2aW91cyIsInRyYWNrZXJJbnN0YW5jZSIsImFmdGVyRmx1c2giLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiZ2V0IiwiX3BhcmVudCIsIl9vbkVycm9yIiwiX3ByaXZhdGUiLCJlcnJvcmVkIiwib25FeGNlcHRpb24iLCJzdG9wcGVkIiwiaW52YWxpZGF0ZWQiLCJmaXJzdFJ1biIsIl9pZCIsIl9vbkludmFsaWRhdGVDYWxsYmFja3MiLCJfb25TdG9wQ2FsbGJhY2tzIiwiX2JlZm9yZVJ1bkNhbGxiYWNrcyIsIl9hZnRlclJ1bkNhbGxiYWNrcyIsIl9yZWNvbXB1dGluZyIsIl9mdW5jIiwiYmluZEVudmlyb25tZW50IiwiX2NvbXB1dGUiLCJGaWJlclV0aWxzIiwiZW5zdXJlIiwib25TdG9wIiwiYmVmb3JlUnVuIiwiYWZ0ZXJSdW4iLCJpbnZhbGlkYXRlIiwiY2FsbGJhY2siLCJyZWYiLCJzeW5jaHJvbml6ZSIsIl9ydW5JbnNpZGUiLCJwcmV2aW91c0NvbXB1dGF0aW9uIiwicHJldmlvdXNJbkNvbXB1dGUiLCJwcmV2aW91c1RyYWNrZXJJbnN0YW5jZSIsImNhbGwiLCJydW4iLCJEZXBlbmRlbmN5IiwiX2RlcGVuZGVudHNCeUlkIiwiZGVwZW5kIiwiaWQiLCJjaGFuZ2VkIiwiaGFzRGVwZW5kZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE1BQUEsQ0FBQUMsTUFBQTtBQUFBQyxTQUFBLFFBQUFBO0FBQUE7QUFB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QUFDd0YsVUFBWixFQ2lJQTtBRGxJRjs7QUNvSUEsV0FBT3BFLE9BQVA7QURySU87O0FBSVRtRixlQUFlO0FBQ2IsUUFBQXZHLFdBQUEsRUFBQXFHLEVBQUEsRUFBQVgsR0FBQTtBQUFBQSxPQUFBLFFBQUFTLGVBQUE7O0FBQUEsU0FBQUUsRUFBQSxJQUFBWCxHQUFBO0FDdUlFMUYsaUJBQVcsR0FBRzBGLEdBQUcsQ0FBQ1csRUFBRCxDQUFqQjtBRHRJQSxhQUFPLElBQVA7QUFERjs7QUMwSUEsV0R4SUEsS0N3SUE7QUQzSWE7O0FBdkJqQixDQUFNLEMiLCJmaWxlIjoiL3BhY2thZ2VzL3BlZXJsaWJyYXJ5X3NlcnZlci1hdXRvcnVuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUcmFja2VyfSBmcm9tICdtZXRlb3IvdHJhY2tlcidcblxuaW1wb3J0IEZpYmVyIGZyb20gJ2ZpYmVycydcbmltcG9ydCBGdXR1cmUgZnJvbSAnZmliZXJzL2Z1dHVyZSdcblxuIyBUcmFja2VyLkNvbXB1dGF0aW9uIGNvbnN0cnVjdG9yIGlzIHByaXZhdGUsIHNvIHdlIGFyZSB1c2luZyB0aGlzIG9iamVjdCBhcyBhIGd1YXJkLlxuIyBFeHRlcm5hbCBjb2RlIGNhbm5vdCBhY2Nlc3MgdGhpcywgYW5kIHdpbGwgbm90IGJlIGFibGUgdG8gZGlyZWN0bHkgY29uc3RydWN0IGFcbiMgVHJhY2tlci5Db21wdXRhdGlvbiBpbnN0YW5jZS5cbnByaXZhdGVPYmplY3QgPSB7fVxuXG4jIEd1YXJkIG9iamVjdCBmb3IgZmliZXIgdXRpbHMuXG5ndWFyZCA9IHt9XG5cbm5leHRJZCA9IDFcblxuY2xhc3MgVHJhY2tlckluc3RhbmNlXG4gIGNvbnN0cnVjdG9yOiAtPlxuICAgIEBhY3RpdmUgPSBmYWxzZVxuICAgIEBjdXJyZW50Q29tcHV0YXRpb24gPSBudWxsXG5cbiAgICBAcGVuZGluZ0NvbXB1dGF0aW9ucyA9IFtdXG4gICAgQHdpbGxGbHVzaCA9IGZhbHNlXG4gICAgQGluRmx1c2ggPSBudWxsXG4gICAgQGluUmVxdWlyZUZsdXNoID0gZmFsc2VcbiAgICBAaW5Db21wdXRlID0gZmFsc2VcbiAgICBAdGhyb3dGaXJzdEVycm9yID0gZmFsc2VcbiAgICBAYWZ0ZXJGbHVzaENhbGxiYWNrcyA9IFtdXG5cbiAgc2V0Q3VycmVudENvbXB1dGF0aW9uOiAoY29tcHV0YXRpb24pIC0+XG4gICAgQGN1cnJlbnRDb21wdXRhdGlvbiA9IGNvbXB1dGF0aW9uXG4gICAgQGFjdGl2ZSA9ICEhY29tcHV0YXRpb25cblxuICAjIENvcGllZCBmcm9tIHRyYWNrZXIuanMuXG4gIF9kZWJ1Z0Z1bmM6IC0+XG4gICAgcmV0dXJuIE1ldGVvci5fZGVidWcgaWYgTWV0ZW9yPy5fZGVidWdcblxuICAgIGlmIGNvbnNvbGU/LmVycm9yXG4gICAgICByZXR1cm4gLT5cbiAgICAgICAgY29uc29sZS5lcnJvci5hcHBseSBjb25zb2xlLCBhcmd1bWVudHNcblxuICAgIHJldHVybiAtPlxuXG4gICMgQ29waWVkIGZyb20gdHJhY2tlci5qcy5cbiAgX21heWJlU3VwcHJlc3NNb3JlTG9nczogKG1lc3NhZ2VzTGVuZ3RoKSAtPlxuICAgIGlmIHR5cGVvZiBNZXRlb3IgaXNudCBcInVuZGVmaW5lZFwiXG4gICAgICBpZiBNZXRlb3IuX3N1cHByZXNzZWRfbG9nX2V4cGVjdGVkKClcbiAgICAgICAgTWV0ZW9yLl9zdXBwcmVzc19sb2cobWVzc2FnZXNMZW5ndGggLSAxKVxuXG4gICMgQ29waWVkIGZyb20gdHJhY2tlci5qcy5cbiAgX3Rocm93T3JMb2c6IChmcm9tLCBlcnJvcikgLT5cbiAgICBpZiBAdGhyb3dGaXJzdEVycm9yXG4gICAgICB0aHJvdyBlcnJvclxuICAgIGVsc2VcbiAgICAgIHByaW50QXJncyA9IFtcIkV4Y2VwdGlvbiBmcm9tIFRyYWNrZXIgXCIgKyBmcm9tICsgXCIgZnVuY3Rpb246XCJdXG4gICAgICBpZiBlcnJvci5zdGFjayBhbmQgZXJyb3IubWVzc2FnZSBhbmQgZXJyb3IubmFtZVxuICAgICAgICBpZHggPSBlcnJvci5zdGFjay5pbmRleE9mIGVycm9yLm1lc3NhZ2VcbiAgICAgICAgaWYgaWR4IDwgMCBvciBpZHggPiBlcnJvci5uYW1lLmxlbmd0aCArIDJcbiAgICAgICAgICBtZXNzYWdlID0gZXJyb3IubmFtZSArIFwiOiBcIiArIGVycm9yLm1lc3NhZ2VcbiAgICAgICAgICBwcmludEFyZ3MucHVzaCBtZXNzYWdlXG4gICAgICBwcmludEFyZ3MucHVzaCBlcnJvci5zdGFja1xuICAgICAgQF9tYXliZVN1cHByZXNzTW9yZUxvZ3MgcHJpbnRBcmdzLmxlbmd0aFxuXG4gICAgICBmb3IgcHJpbnRBcmcgaW4gcHJpbnRBcmdzXG4gICAgICAgIEBfZGVidWdGdW5jKCkgcHJpbnRBcmdcblxuICBfZGVmZXJBbmRUcmFuc2ZlcjogKGZ1bmMpIC0+XG4gICAgIyBEZWZlciBleGVjdXRpb24gb2YgYSBmdW5jdGlvbiwgd2hpY2ggd2lsbCBjcmVhdGUgYSBuZXcgZmliZXIuIE1ha2UgdGhlIHJlc3VsdGluZ1xuICAgICMgZmliZXIgc2hhcmUgb3duZXJzaGlwIG9mIHRoZSBzYW1lIHRyYWNrZXIgaW5zdGFuY2UgYXMgaXQgd2lsbCBzZXJ2ZSBvbmx5IGFzIGl0c1xuICAgICMgZXh0ZW5zaW9uIGZvciBleGVjdXRpbmcgaXRzIGZsdXNoZXMuXG4gICAgTWV0ZW9yLmRlZmVyID0+XG4gICAgICBhc3NlcnQgbm90IEZpYmVyLmN1cnJlbnQuX3RyYWNrZXJJbnN0YW5jZVxuXG4gICAgICB0cnlcbiAgICAgICAgRmliZXIuY3VycmVudC5fdHJhY2tlckluc3RhbmNlID0gQFxuICAgICAgICBmdW5jKClcbiAgICAgIGZpbmFsbHlcbiAgICAgICAgRmliZXIuY3VycmVudC5fdHJhY2tlckluc3RhbmNlID0gbnVsbFxuXG4gIHJlcXVpcmVGbHVzaDogLT5cbiAgICByZXR1cm4gaWYgQHdpbGxGbHVzaFxuXG4gICAgQF9kZWZlckFuZFRyYW5zZmVyID0+XG4gICAgICBAX3J1bkZsdXNoXG4gICAgICAgIGZyb21SZXF1aXJlRmx1c2g6IHRydWVcblxuICAgIEB3aWxsRmx1c2ggPSB0cnVlXG5cbiAgX3J1bkZsdXNoOiAob3B0aW9ucykgLT5cbiAgICBpZiBAaW5GbHVzaCBpbnN0YW5jZW9mIEZ1dHVyZVxuICAgICAgIyBJZiB0aGVyZSBhcmUgdHdvIHJ1bnMgZnJvbSByZXF1aXJlRmx1c2ggaW4gc2VxdWVuY2UsIHdlIHNpbXBseSBza2lwIHRoZSBzZWNvbmQgb25lLCB0aGUgZmlyc3RcbiAgICAgICMgb25lIGlzIHN0aWxsIGluIHByb2dyZXNzLlxuICAgICAgcmV0dXJuIGlmIG9wdGlvbnM/LmZyb21SZXF1aXJlRmx1c2hcblxuICAgICAgIyBXZSB3YWl0IGZvciB0aGUgcHJldmlvdXMgZmx1c2ggZnJvbSByZXF1aXJlRmx1c2ggdG8gZmluaXNoIGJlZm9yZSBjb250aW51aW5nLlxuICAgICAgQGluRmx1c2gud2FpdCgpXG4gICAgICBhc3NlcnQgbm90IEBpbkZsdXNoXG5cbiAgICAjIElmIGFscmVhZHkgaW4gZmx1c2ggYW5kIHRoaXMgaXMgYSBmbHVzaCBmcm9tIHJlcXVpcmVGbHVzaCwganVzdCBza2lwIGl0LlxuICAgIHJldHVybiBpZiBAaW5GbHVzaCBhbmQgb3B0aW9ucz8uZnJvbVJlcXVpcmVGbHVzaFxuXG4gICAgdGhyb3cgbmV3IEVycm9yIFwiQ2FuJ3QgY2FsbCBUcmFja2VyLmZsdXNoIHdoaWxlIGZsdXNoaW5nXCIgaWYgQGluRmx1c2hcblxuICAgIGlmIEBpbkNvbXB1dGVcbiAgICAgIGlmIG9wdGlvbnM/LmZyb21SZXF1aXJlRmx1c2hcbiAgICAgICAgIyBJZiB0aGlzIGZpYmVyIGlzIGN1cnJlbnRseSBydW5uaW5nIGEgY29tcHV0YXRpb24gYW5kIGEgcmVxdWlyZSBmbHVzaCBoYXMgYmVlblxuICAgICAgICAjIGRlZmVycmVkLCB3ZSBuZWVkIHRvIGRlZmVyIGFnYWluIGFuZCByZXRyeS5cbiAgICAgICAgQF9kZWZlckFuZFRyYW5zZmVyID0+XG4gICAgICAgICAgQF9ydW5GbHVzaCBvcHRpb25zXG4gICAgICAgIHJldHVyblxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IgXCJDYW4ndCBmbHVzaCBpbnNpZGUgVHJhY2tlci5hdXRvcnVuXCJcblxuICAgICMgSWYgdGhpcyBpcyBhIHJ1biBmcm9tIHJlcXVpcmVGbHVzaCwgcHJvdmlkZSBhIGZ1dHVyZSBzbyB0aGF0IGNhbGxzIHRvIGZsdXNoIGNhbiB3YWl0IG9uIGl0LlxuICAgIGlmIG9wdGlvbnM/LmZyb21SZXF1aXJlRmx1c2hcbiAgICAgIEBpbkZsdXNoID0gbmV3IEZ1dHVyZSgpXG4gICAgZWxzZVxuICAgICAgQGluRmx1c2ggPSB0cnVlXG5cbiAgICBAd2lsbEZsdXNoID0gdHJ1ZVxuICAgIEB0aHJvd0ZpcnN0RXJyb3IgPSAhIW9wdGlvbnM/LnRocm93Rmlyc3RFcnJvclxuXG4gICAgcmVjb21wdXRlZENvdW50ID0gMFxuICAgIGZpbmlzaGVkVHJ5ID0gZmFsc2VcbiAgICB0cnlcbiAgICAgIHdoaWxlIEBwZW5kaW5nQ29tcHV0YXRpb25zLmxlbmd0aCBvciBAYWZ0ZXJGbHVzaENhbGxiYWNrcy5sZW5ndGhcblxuICAgICAgICB3aGlsZSBAcGVuZGluZ0NvbXB1dGF0aW9ucy5sZW5ndGhcbiAgICAgICAgICBjb21wdXRhdGlvbiA9IEBwZW5kaW5nQ29tcHV0YXRpb25zLnNoaWZ0KClcbiAgICAgICAgICBjb21wdXRhdGlvbi5fcmVjb21wdXRlKClcbiAgICAgICAgICBpZiBjb21wdXRhdGlvbi5fbmVlZHNSZWNvbXB1dGUoKVxuICAgICAgICAgICAgQHBlbmRpbmdDb21wdXRhdGlvbnMudW5zaGlmdCBjb21wdXRhdGlvblxuXG4gICAgICAgICAgaWYgbm90IG9wdGlvbnM/LmZpbmlzaFN5bmNocm9ub3VzbHkgYW5kICsrcmVjb21wdXRlZENvdW50ID4gMTAwMFxuICAgICAgICAgICAgZmluaXNoZWRUcnkgPSB0cnVlXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICBpZiBAYWZ0ZXJGbHVzaENhbGxiYWNrcy5sZW5ndGhcbiAgICAgICAgICBmdW5jID0gQGFmdGVyRmx1c2hDYWxsYmFja3Muc2hpZnQoKVxuICAgICAgICAgIHRyeVxuICAgICAgICAgICAgZnVuYygpXG4gICAgICAgICAgY2F0Y2ggZXJyb3JcbiAgICAgICAgICAgIEBfdGhyb3dPckxvZyBcImFmdGVyRmx1c2hcIiwgZXJyb3JcblxuICAgICAgZmluaXNoZWRUcnkgPSB0cnVlXG4gICAgZmluYWxseVxuICAgICAgIyBXZSBmaXJzdCBoYXZlIHRvIHNldCBAaW5GbHVzaCB0byBudWxsLCB0aGVuIHdlIGNhbiByZXR1cm4uXG5cbiAgICAgIGluRmx1c2ggPSBAaW5GbHVzaFxuICAgICAgdW5sZXNzIGZpbmlzaGVkVHJ5XG4gICAgICAgIEBpbkZsdXNoID0gbnVsbFxuICAgICAgICBpbkZsdXNoLnJldHVybigpIGlmIGluRmx1c2ggaW5zdGFuY2VvZiBGdXR1cmVcbiAgICAgICAgQF9ydW5GbHVzaFxuICAgICAgICAgIGZpbmlzaFN5bmNocm9ub3VzbHk6IG9wdGlvbnM/LmZpbmlzaFN5bmNocm9ub3VzbHlcbiAgICAgICAgICB0aHJvd0ZpcnN0RXJyb3I6IGZhbHNlXG5cbiAgICAgIEB3aWxsRmx1c2ggPSBmYWxzZVxuICAgICAgQGluRmx1c2ggPSBudWxsXG4gICAgICBpbkZsdXNoLnJldHVybigpIGlmIGluRmx1c2ggaW5zdGFuY2VvZiBGdXR1cmVcbiAgICAgIGlmIEBwZW5kaW5nQ29tcHV0YXRpb25zLmxlbmd0aCBvciBAYWZ0ZXJGbHVzaENhbGxiYWNrcy5sZW5ndGhcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yIFwic3RpbGwgaGF2ZSBtb3JlIHRvIGRvP1wiIGlmIG9wdGlvbnM/LmZpbmlzaFN5bmNocm9ub3VzbHlcbiAgICAgICAgTWV0ZW9yLnNldFRpbWVvdXQgPT5cbiAgICAgICAgICBAcmVxdWlyZUZsdXNoKClcbiAgICAgICAgLFxuICAgICAgICAgIDEwICMgbXNcblxuVHJhY2tlci5fdHJhY2tlckluc3RhbmNlID0gLT5cbiAgTWV0ZW9yLl9ub2RlQ29kZU11c3RCZUluRmliZXIoKVxuICBGaWJlci5jdXJyZW50Ll90cmFja2VySW5zdGFuY2UgPz0gbmV3IFRyYWNrZXJJbnN0YW5jZSgpXG5cblRyYWNrZXIuZmx1c2ggPSAob3B0aW9ucykgLT5cbiAgVHJhY2tlci5fdHJhY2tlckluc3RhbmNlKCkuX3J1bkZsdXNoXG4gICAgZmluaXNoU3luY2hyb25vdXNseTogdHJ1ZVxuICAgIHRocm93Rmlyc3RFcnJvcjogb3B0aW9ucz8uX3Rocm93Rmlyc3RFcnJvclxuXG5UcmFja2VyLmluRmx1c2ggPSAtPlxuICBUcmFja2VyLl90cmFja2VySW5zdGFuY2UoKS5pbkZsdXNoXG5cblRyYWNrZXIuYXV0b3J1biA9IChmdW5jLCBvcHRpb25zKSAtPlxuICB0aHJvdyBuZXcgRXJyb3IgXCJUcmFja2VyLmF1dG9ydW4gcmVxdWlyZXMgYSBmdW5jdGlvbiBhcmd1bWVudFwiIHVubGVzcyB0eXBlb2YgZnVuYyBpcyBcImZ1bmN0aW9uXCJcblxuICBjID0gbmV3IFRyYWNrZXIuQ29tcHV0YXRpb24gZnVuYywgVHJhY2tlci5jdXJyZW50Q29tcHV0YXRpb24sIG9wdGlvbnM/Lm9uRXJyb3IsIHByaXZhdGVPYmplY3RcblxuICBpZiBUcmFja2VyLmFjdGl2ZVxuICAgIFRyYWNrZXIub25JbnZhbGlkYXRlIC0+XG4gICAgICBjLnN0b3AoKVxuXG4gIGNcblxuVHJhY2tlci5ub25yZWFjdGl2ZSA9IChmKSAtPlxuICB0cmFja2VySW5zdGFuY2UgPSBUcmFja2VyLl90cmFja2VySW5zdGFuY2UoKVxuICBwcmV2aW91cyA9IHRyYWNrZXJJbnN0YW5jZS5jdXJyZW50Q29tcHV0YXRpb25cbiAgdHJhY2tlckluc3RhbmNlLnNldEN1cnJlbnRDb21wdXRhdGlvbiBudWxsXG4gIHRyeVxuICAgIHJldHVybiBmKClcbiAgZmluYWxseVxuICAgIHRyYWNrZXJJbnN0YW5jZS5zZXRDdXJyZW50Q29tcHV0YXRpb24gcHJldmlvdXNcblxuVHJhY2tlci5vbkludmFsaWRhdGUgPSAoZikgLT5cbiAgdGhyb3cgbmV3IEVycm9yIFwiVHJhY2tlci5vbkludmFsaWRhdGUgcmVxdWlyZXMgYSBjdXJyZW50Q29tcHV0YXRpb25cIiB1bmxlc3MgVHJhY2tlci5hY3RpdmVcblxuICBUcmFja2VyLmN1cnJlbnRDb21wdXRhdGlvbi5vbkludmFsaWRhdGUgZlxuXG5UcmFja2VyLmFmdGVyRmx1c2ggPSAoZikgLT5cbiAgdHJhY2tlckluc3RhbmNlID0gVHJhY2tlci5fdHJhY2tlckluc3RhbmNlKClcbiAgdHJhY2tlckluc3RhbmNlLmFmdGVyRmx1c2hDYWxsYmFja3MucHVzaCBmXG4gIHRyYWNrZXJJbnN0YW5jZS5yZXF1aXJlRmx1c2goKVxuXG4jIENvbXBhdGliaWxpdHkgd2l0aCB0aGUgY2xpZW50LXNpZGUgVHJhY2tlci4gT24gbm9kZS5qcyB3ZSBjYW4gdXNlIGRlZmluZVByb3BlcnRpZXMgdG8gZGVmaW5lIGdldHRlcnMuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyBUcmFja2VyLFxuICBjdXJyZW50Q29tcHV0YXRpb246XG4gICAgZ2V0OiAtPlxuICAgICAgVHJhY2tlci5fdHJhY2tlckluc3RhbmNlKCkuY3VycmVudENvbXB1dGF0aW9uXG5cbiAgYWN0aXZlOlxuICAgIGdldDogLT5cbiAgICAgIFRyYWNrZXIuX3RyYWNrZXJJbnN0YW5jZSgpLmFjdGl2ZVxuXG5jbGFzcyBUcmFja2VyLkNvbXB1dGF0aW9uXG4gIGNvbnN0cnVjdG9yOiAoZnVuYywgQF9wYXJlbnQsIEBfb25FcnJvciwgX3ByaXZhdGUpIC0+XG4gICAgdGhyb3cgbmV3IEVycm9yIFwiVHJhY2tlci5Db21wdXRhdGlvbiBjb25zdHJ1Y3RvciBpcyBwcml2YXRlOyB1c2UgVHJhY2tlci5hdXRvcnVuXCIgaWYgX3ByaXZhdGUgaXNudCBwcml2YXRlT2JqZWN0XG5cbiAgICBAc3RvcHBlZCA9IGZhbHNlXG4gICAgQGludmFsaWRhdGVkID0gZmFsc2VcbiAgICBAZmlyc3RSdW4gPSB0cnVlXG4gICAgQF9pZCA9IG5leHRJZCsrXG4gICAgQF9vbkludmFsaWRhdGVDYWxsYmFja3MgPSBbXVxuICAgIEBfb25TdG9wQ2FsbGJhY2tzID0gW11cbiAgICBAX2JlZm9yZVJ1bkNhbGxiYWNrcyA9IFtdXG4gICAgQF9hZnRlclJ1bkNhbGxiYWNrcyA9IFtdXG4gICAgQF9yZWNvbXB1dGluZyA9IGZhbHNlXG5cbiAgICBAX3RyYWNrZXJJbnN0YW5jZSA9IFRyYWNrZXIuX3RyYWNrZXJJbnN0YW5jZSgpXG5cbiAgICBvbkV4Y2VwdGlvbiA9IChlcnJvcikgPT5cbiAgICAgIHRocm93IGVycm9yIGlmIEBmaXJzdFJ1blxuXG4gICAgICBpZiBAX29uRXJyb3JcbiAgICAgICAgQF9vbkVycm9yIGVycm9yXG4gICAgICBlbHNlXG4gICAgICAgIEBfdHJhY2tlckluc3RhbmNlLl90aHJvd09yTG9nIFwicmVjb21wdXRlXCIsIGVycm9yXG5cbiAgICBAX2Z1bmMgPSBNZXRlb3IuYmluZEVudmlyb25tZW50IGZ1bmMsIG9uRXhjZXB0aW9uLCBAXG5cbiAgICBlcnJvcmVkID0gdHJ1ZVxuICAgIHRyeVxuICAgICAgQF9jb21wdXRlKClcbiAgICAgIGVycm9yZWQgPSBmYWxzZVxuICAgIGZpbmFsbHlcbiAgICAgIEBmaXJzdFJ1biA9IGZhbHNlXG4gICAgICBAc3RvcCgpIGlmIGVycm9yZWRcblxuICBvbkludmFsaWRhdGU6IChmKSAtPlxuICAgIEZpYmVyVXRpbHMuZW5zdXJlID0+XG4gICAgICB0aHJvdyBuZXcgRXJyb3IgXCJvbkludmFsaWRhdGUgcmVxdWlyZXMgYSBmdW5jdGlvblwiIHVubGVzcyB0eXBlb2YgZiBpcyBcImZ1bmN0aW9uXCJcblxuICAgICAgaWYgQGludmFsaWRhdGVkXG4gICAgICAgIFRyYWNrZXIubm9ucmVhY3RpdmUgPT5cbiAgICAgICAgICBmIEBcbiAgICAgIGVsc2VcbiAgICAgICAgQF9vbkludmFsaWRhdGVDYWxsYmFja3MucHVzaCBmXG5cbiAgb25TdG9wOiAoZikgLT5cbiAgICBGaWJlclV0aWxzLmVuc3VyZSA9PlxuICAgICAgdGhyb3cgbmV3IEVycm9yIFwib25TdG9wIHJlcXVpcmVzIGEgZnVuY3Rpb25cIiB1bmxlc3MgdHlwZW9mIGYgaXMgXCJmdW5jdGlvblwiXG5cbiAgICAgIGlmIEBzdG9wcGVkXG4gICAgICAgIFRyYWNrZXIubm9ucmVhY3RpdmUgPT5cbiAgICAgICAgICBmIEBcbiAgICAgIGVsc2VcbiAgICAgICAgQF9vblN0b3BDYWxsYmFja3MucHVzaCBmXG5cbiAgYmVmb3JlUnVuOiAoZikgLT5cbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJiZWZvcmVSdW4gcmVxdWlyZXMgYSBmdW5jdGlvblwiIHVubGVzcyB0eXBlb2YgZiBpcyBcImZ1bmN0aW9uXCJcblxuICAgIEBfYmVmb3JlUnVuQ2FsbGJhY2tzLnB1c2ggZlxuXG4gIGFmdGVyUnVuOiAoZikgLT5cbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJhZnRlclJ1biByZXF1aXJlcyBhIGZ1bmN0aW9uXCIgdW5sZXNzIHR5cGVvZiBmIGlzIFwiZnVuY3Rpb25cIlxuXG4gICAgQF9hZnRlclJ1bkNhbGxiYWNrcy5wdXNoIGZcblxuICBpbnZhbGlkYXRlOiAtPlxuICAgIEZpYmVyVXRpbHMuZW5zdXJlID0+XG4gICAgICAjIFRPRE86IFdoeSBzb21lIHRlc3RzIGZyZWV6ZSBpZiB3ZSB3cmFwIHRoaXMgbWV0aG9kIGludG8gRmliZXJVdGlscy5zeW5jaHJvbml6ZT9cbiAgICAgIGlmIG5vdCBAaW52YWxpZGF0ZWRcbiAgICAgICAgaWYgbm90IEBfcmVjb21wdXRpbmcgYW5kIG5vdCBAc3RvcHBlZFxuICAgICAgICAgIEBfdHJhY2tlckluc3RhbmNlLnJlcXVpcmVGbHVzaCgpXG4gICAgICAgICAgQF90cmFja2VySW5zdGFuY2UucGVuZGluZ0NvbXB1dGF0aW9ucy5wdXNoIEBcblxuICAgICAgICBAaW52YWxpZGF0ZWQgPSB0cnVlXG5cbiAgICAgICAgZm9yIGNhbGxiYWNrIGluIEBfb25JbnZhbGlkYXRlQ2FsbGJhY2tzXG4gICAgICAgICAgVHJhY2tlci5ub25yZWFjdGl2ZSA9PlxuICAgICAgICAgICAgY2FsbGJhY2sgQFxuICAgICAgICBAX29uSW52YWxpZGF0ZUNhbGxiYWNrcyA9IFtdXG5cbiAgc3RvcDogLT5cbiAgICBGaWJlclV0aWxzLmVuc3VyZSA9PlxuICAgICAgRmliZXJVdGlscy5zeW5jaHJvbml6ZSBndWFyZCwgQF9pZCwgPT5cbiAgICAgICAgcmV0dXJuIGlmIEBzdG9wcGVkXG4gICAgICAgIEBzdG9wcGVkID0gdHJ1ZVxuXG4gICAgICAgIEBpbnZhbGlkYXRlKClcblxuICAgICAgICB3aGlsZSBAX29uU3RvcENhbGxiYWNrcy5sZW5ndGhcbiAgICAgICAgICBjYWxsYmFjayA9IEBfb25TdG9wQ2FsbGJhY2tzLnNoaWZ0KClcbiAgICAgICAgICBUcmFja2VyLm5vbnJlYWN0aXZlID0+XG4gICAgICAgICAgICBjYWxsYmFjayBAXG5cbiAgIyBSdW5zIGFuIGFyYml0cmFyeSBmdW5jdGlvbiBpbnNpZGUgdGhlIGNvbXB1dGF0aW9uLiBUaGlzIGFsbG93cyBicmVha2luZyBtYW55IGFzc3VtcHRpb25zLCBzbyB1c2UgaXQgdmVyeSBjYXJlZnVsbHkuXG4gIF9ydW5JbnNpZGU6IChmdW5jKSAtPlxuICAgIEZpYmVyVXRpbHMuc3luY2hyb25pemUgZ3VhcmQsIEBfaWQsID0+XG4gICAgICBNZXRlb3IuX25vZGVDb2RlTXVzdEJlSW5GaWJlcigpXG4gICAgICBwcmV2aW91c1RyYWNrZXJJbnN0YW5jZSA9IFRyYWNrZXIuX3RyYWNrZXJJbnN0YW5jZSgpXG4gICAgICBGaWJlci5jdXJyZW50Ll90cmFja2VySW5zdGFuY2UgPSBAX3RyYWNrZXJJbnN0YW5jZVxuICAgICAgcHJldmlvdXNDb21wdXRhdGlvbiA9IEBfdHJhY2tlckluc3RhbmNlLmN1cnJlbnRDb21wdXRhdGlvblxuICAgICAgQF90cmFja2VySW5zdGFuY2Uuc2V0Q3VycmVudENvbXB1dGF0aW9uIEBcbiAgICAgIHByZXZpb3VzSW5Db21wdXRlID0gQF90cmFja2VySW5zdGFuY2UuaW5Db21wdXRlXG4gICAgICBAX3RyYWNrZXJJbnN0YW5jZS5pbkNvbXB1dGUgPSB0cnVlXG4gICAgICB0cnlcbiAgICAgICAgZnVuYyBAXG4gICAgICBmaW5hbGx5XG4gICAgICAgIEZpYmVyLmN1cnJlbnQuX3RyYWNrZXJJbnN0YW5jZSA9IHByZXZpb3VzVHJhY2tlckluc3RhbmNlXG4gICAgICAgIEBfdHJhY2tlckluc3RhbmNlLnNldEN1cnJlbnRDb21wdXRhdGlvbiBwcmV2aW91c0NvbXB1dGF0aW9uXG4gICAgICAgIEBfdHJhY2tlckluc3RhbmNlLmluQ29tcHV0ZSA9IHByZXZpb3VzSW5Db21wdXRlXG5cbiAgX2NvbXB1dGU6IC0+XG4gICAgRmliZXJVdGlscy5zeW5jaHJvbml6ZSBndWFyZCwgQF9pZCwgPT5cbiAgICAgIEBpbnZhbGlkYXRlZCA9IGZhbHNlXG5cbiAgICAgIEBfcnVuSW5zaWRlIChjb21wdXRhdGlvbikgPT5cbiAgICAgICAgd2hpbGUgQF9iZWZvcmVSdW5DYWxsYmFja3MubGVuZ3RoXG4gICAgICAgICAgY2FsbGJhY2sgPSBAX2JlZm9yZVJ1bkNhbGxiYWNrcy5zaGlmdCgpXG4gICAgICAgICAgVHJhY2tlci5ub25yZWFjdGl2ZSA9PlxuICAgICAgICAgICAgY2FsbGJhY2sgQFxuXG4gICAgICAgIEBfZnVuYy5jYWxsIG51bGwsIEBcblxuICAgICAgICB3aGlsZSBAX2FmdGVyUnVuQ2FsbGJhY2tzLmxlbmd0aFxuICAgICAgICAgIGNhbGxiYWNrID0gQF9hZnRlclJ1bkNhbGxiYWNrcy5zaGlmdCgpXG4gICAgICAgICAgVHJhY2tlci5ub25yZWFjdGl2ZSA9PlxuICAgICAgICAgICAgY2FsbGJhY2sgQFxuXG4gIF9uZWVkc1JlY29tcHV0ZTogLT5cbiAgICBAaW52YWxpZGF0ZWQgYW5kIG5vdCBAc3RvcHBlZFxuXG4gIF9yZWNvbXB1dGU6IC0+XG4gICAgRmliZXJVdGlscy5zeW5jaHJvbml6ZSBndWFyZCwgQF9pZCwgPT5cbiAgICAgIGFzc2VydCBub3QgQF9yZWNvbXB1dGluZ1xuICAgICAgQF9yZWNvbXB1dGluZyA9IHRydWVcbiAgICAgIHRyeVxuICAgICAgICBpZiBAX25lZWRzUmVjb21wdXRlKClcbiAgICAgICAgICBAX2NvbXB1dGUoKVxuICAgICAgZmluYWxseVxuICAgICAgICBAX3JlY29tcHV0aW5nID0gZmFsc2VcblxuICBmbHVzaDogLT5cbiAgICBGaWJlclV0aWxzLmVuc3VyZSA9PlxuICAgICAgcmV0dXJuIGlmIEBfcmVjb21wdXRpbmdcblxuICAgICAgQF9yZWNvbXB1dGUoKVxuXG4gIHJ1bjogLT5cbiAgICBGaWJlclV0aWxzLmVuc3VyZSA9PlxuICAgICAgQGludmFsaWRhdGUoKVxuICAgICAgQGZsdXNoKClcblxuY2xhc3MgVHJhY2tlci5EZXBlbmRlbmN5XG4gIGNvbnN0cnVjdG9yOiAtPlxuICAgIEBfZGVwZW5kZW50c0J5SWQgPSB7fVxuXG4gIGRlcGVuZDogKGNvbXB1dGF0aW9uKSAtPlxuICAgIHVubGVzcyBjb21wdXRhdGlvblxuICAgICAgcmV0dXJuIGZhbHNlIHVubGVzcyBUcmFja2VyLmFjdGl2ZVxuICAgICAgY29tcHV0YXRpb24gPSBUcmFja2VyLmN1cnJlbnRDb21wdXRhdGlvblxuXG4gICAgaWQgPSBjb21wdXRhdGlvbi5faWRcblxuICAgIGlmIGlkIG5vdCBvZiBAX2RlcGVuZGVudHNCeUlkXG4gICAgICBAX2RlcGVuZGVudHNCeUlkW2lkXSA9IGNvbXB1dGF0aW9uXG4gICAgICBjb21wdXRhdGlvbi5vbkludmFsaWRhdGUgPT5cbiAgICAgICAgZGVsZXRlIEBfZGVwZW5kZW50c0J5SWRbaWRdXG4gICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgZmFsc2VcblxuICBjaGFuZ2VkOiAtPlxuICAgIGZvciBpZCwgY29tcHV0YXRpb24gb2YgQF9kZXBlbmRlbnRzQnlJZFxuICAgICAgY29tcHV0YXRpb24uaW52YWxpZGF0ZSgpXG5cbiAgaGFzRGVwZW5kZW50czogLT5cbiAgICBmb3IgaWQsIGNvbXB1dGF0aW9uIG9mIEBfZGVwZW5kZW50c0J5SWRcbiAgICAgIHJldHVybiB0cnVlXG4gICAgZmFsc2VcblxuZXhwb3J0IHtUcmFja2VyfVxuIiwidmFyIFRyYWNrZXJJbnN0YW5jZSwgZ3VhcmQsIG5leHRJZCwgcHJpdmF0ZU9iamVjdDtcblxuaW1wb3J0IHtcbiAgVHJhY2tlclxufSBmcm9tICdtZXRlb3IvdHJhY2tlcic7XG5cbmltcG9ydCBGaWJlciBmcm9tICdmaWJlcnMnO1xuXG5pbXBvcnQgRnV0dXJlIGZyb20gJ2ZpYmVycy9mdXR1cmUnO1xuXG4vLyBUcmFja2VyLkNvbXB1dGF0aW9uIGNvbnN0cnVjdG9yIGlzIHByaXZhdGUsIHNvIHdlIGFyZSB1c2luZyB0aGlzIG9iamVjdCBhcyBhIGd1YXJkLlxuLy8gRXh0ZXJuYWwgY29kZSBjYW5ub3QgYWNjZXNzIHRoaXMsIGFuZCB3aWxsIG5vdCBiZSBhYmxlIHRvIGRpcmVjdGx5IGNvbnN0cnVjdCBhXG4vLyBUcmFja2VyLkNvbXB1dGF0aW9uIGluc3RhbmNlLlxucHJpdmF0ZU9iamVjdCA9IHt9O1xuXG4vLyBHdWFyZCBvYmplY3QgZm9yIGZpYmVyIHV0aWxzLlxuZ3VhcmQgPSB7fTtcblxubmV4dElkID0gMTtcblxuVHJhY2tlckluc3RhbmNlID0gY2xhc3MgVHJhY2tlckluc3RhbmNlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICB0aGlzLmN1cnJlbnRDb21wdXRhdGlvbiA9IG51bGw7XG4gICAgdGhpcy5wZW5kaW5nQ29tcHV0YXRpb25zID0gW107XG4gICAgdGhpcy53aWxsRmx1c2ggPSBmYWxzZTtcbiAgICB0aGlzLmluRmx1c2ggPSBudWxsO1xuICAgIHRoaXMuaW5SZXF1aXJlRmx1c2ggPSBmYWxzZTtcbiAgICB0aGlzLmluQ29tcHV0ZSA9IGZhbHNlO1xuICAgIHRoaXMudGhyb3dGaXJzdEVycm9yID0gZmFsc2U7XG4gICAgdGhpcy5hZnRlckZsdXNoQ2FsbGJhY2tzID0gW107XG4gIH1cblxuICBzZXRDdXJyZW50Q29tcHV0YXRpb24oY29tcHV0YXRpb24pIHtcbiAgICB0aGlzLmN1cnJlbnRDb21wdXRhdGlvbiA9IGNvbXB1dGF0aW9uO1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZSA9ICEhY29tcHV0YXRpb247XG4gIH1cblxuICAvLyBDb3BpZWQgZnJvbSB0cmFja2VyLmpzLlxuICBfZGVidWdGdW5jKCkge1xuICAgIGlmICh0eXBlb2YgTWV0ZW9yICE9PSBcInVuZGVmaW5lZFwiICYmIE1ldGVvciAhPT0gbnVsbCA/IE1ldGVvci5fZGVidWcgOiB2b2lkIDApIHtcbiAgICAgIHJldHVybiBNZXRlb3IuX2RlYnVnO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZSAhPT0gbnVsbCA/IGNvbnNvbGUuZXJyb3IgOiB2b2lkIDApIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbigpIHt9O1xuICB9XG5cbiAgLy8gQ29waWVkIGZyb20gdHJhY2tlci5qcy5cbiAgX21heWJlU3VwcHJlc3NNb3JlTG9ncyhtZXNzYWdlc0xlbmd0aCkge1xuICAgIGlmICh0eXBlb2YgTWV0ZW9yICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBpZiAoTWV0ZW9yLl9zdXBwcmVzc2VkX2xvZ19leHBlY3RlZCgpKSB7XG4gICAgICAgIHJldHVybiBNZXRlb3IuX3N1cHByZXNzX2xvZyhtZXNzYWdlc0xlbmd0aCAtIDEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENvcGllZCBmcm9tIHRyYWNrZXIuanMuXG4gIF90aHJvd09yTG9nKGZyb20sIGVycm9yKSB7XG4gICAgdmFyIGksIGlkeCwgbGVuLCBtZXNzYWdlLCBwcmludEFyZywgcHJpbnRBcmdzLCByZXN1bHRzO1xuICAgIGlmICh0aGlzLnRocm93Rmlyc3RFcnJvcikge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByaW50QXJncyA9IFtcIkV4Y2VwdGlvbiBmcm9tIFRyYWNrZXIgXCIgKyBmcm9tICsgXCIgZnVuY3Rpb246XCJdO1xuICAgICAgaWYgKGVycm9yLnN0YWNrICYmIGVycm9yLm1lc3NhZ2UgJiYgZXJyb3IubmFtZSkge1xuICAgICAgICBpZHggPSBlcnJvci5zdGFjay5pbmRleE9mKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICBpZiAoaWR4IDwgMCB8fCBpZHggPiBlcnJvci5uYW1lLmxlbmd0aCArIDIpIHtcbiAgICAgICAgICBtZXNzYWdlID0gZXJyb3IubmFtZSArIFwiOiBcIiArIGVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgcHJpbnRBcmdzLnB1c2gobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHByaW50QXJncy5wdXNoKGVycm9yLnN0YWNrKTtcbiAgICAgIHRoaXMuX21heWJlU3VwcHJlc3NNb3JlTG9ncyhwcmludEFyZ3MubGVuZ3RoKTtcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHByaW50QXJncy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBwcmludEFyZyA9IHByaW50QXJnc1tpXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKHRoaXMuX2RlYnVnRnVuYygpKHByaW50QXJnKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG4gIH1cblxuICBfZGVmZXJBbmRUcmFuc2ZlcihmdW5jKSB7XG4gICAgLy8gRGVmZXIgZXhlY3V0aW9uIG9mIGEgZnVuY3Rpb24sIHdoaWNoIHdpbGwgY3JlYXRlIGEgbmV3IGZpYmVyLiBNYWtlIHRoZSByZXN1bHRpbmdcbiAgICAvLyBmaWJlciBzaGFyZSBvd25lcnNoaXAgb2YgdGhlIHNhbWUgdHJhY2tlciBpbnN0YW5jZSBhcyBpdCB3aWxsIHNlcnZlIG9ubHkgYXMgaXRzXG4gICAgLy8gZXh0ZW5zaW9uIGZvciBleGVjdXRpbmcgaXRzIGZsdXNoZXMuXG4gICAgcmV0dXJuIE1ldGVvci5kZWZlcigoKSA9PiB7XG4gICAgICBhc3NlcnQoIUZpYmVyLmN1cnJlbnQuX3RyYWNrZXJJbnN0YW5jZSk7XG4gICAgICB0cnkge1xuICAgICAgICBGaWJlci5jdXJyZW50Ll90cmFja2VySW5zdGFuY2UgPSB0aGlzO1xuICAgICAgICByZXR1cm4gZnVuYygpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgRmliZXIuY3VycmVudC5fdHJhY2tlckluc3RhbmNlID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJlcXVpcmVGbHVzaCgpIHtcbiAgICBpZiAodGhpcy53aWxsRmx1c2gpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZGVmZXJBbmRUcmFuc2ZlcigoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fcnVuRmx1c2goe1xuICAgICAgICBmcm9tUmVxdWlyZUZsdXNoOiB0cnVlXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy53aWxsRmx1c2ggPSB0cnVlO1xuICB9XG5cbiAgX3J1bkZsdXNoKG9wdGlvbnMpIHtcbiAgICB2YXIgY29tcHV0YXRpb24sIGVycm9yLCBmaW5pc2hlZFRyeSwgZnVuYywgaW5GbHVzaCwgcmVjb21wdXRlZENvdW50O1xuICAgIGlmICh0aGlzLmluRmx1c2ggaW5zdGFuY2VvZiBGdXR1cmUpIHtcbiAgICAgIC8vIElmIHRoZXJlIGFyZSB0d28gcnVucyBmcm9tIHJlcXVpcmVGbHVzaCBpbiBzZXF1ZW5jZSwgd2Ugc2ltcGx5IHNraXAgdGhlIHNlY29uZCBvbmUsIHRoZSBmaXJzdFxuICAgICAgLy8gb25lIGlzIHN0aWxsIGluIHByb2dyZXNzLlxuICAgICAgaWYgKG9wdGlvbnMgIT0gbnVsbCA/IG9wdGlvbnMuZnJvbVJlcXVpcmVGbHVzaCA6IHZvaWQgMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBXZSB3YWl0IGZvciB0aGUgcHJldmlvdXMgZmx1c2ggZnJvbSByZXF1aXJlRmx1c2ggdG8gZmluaXNoIGJlZm9yZSBjb250aW51aW5nLlxuICAgICAgdGhpcy5pbkZsdXNoLndhaXQoKTtcbiAgICAgIGFzc2VydCghdGhpcy5pbkZsdXNoKTtcbiAgICB9XG4gICAgLy8gSWYgYWxyZWFkeSBpbiBmbHVzaCBhbmQgdGhpcyBpcyBhIGZsdXNoIGZyb20gcmVxdWlyZUZsdXNoLCBqdXN0IHNraXAgaXQuXG4gICAgaWYgKHRoaXMuaW5GbHVzaCAmJiAob3B0aW9ucyAhPSBudWxsID8gb3B0aW9ucy5mcm9tUmVxdWlyZUZsdXNoIDogdm9pZCAwKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5pbkZsdXNoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBjYWxsIFRyYWNrZXIuZmx1c2ggd2hpbGUgZmx1c2hpbmdcIik7XG4gICAgfVxuICAgIGlmICh0aGlzLmluQ29tcHV0ZSkge1xuICAgICAgaWYgKG9wdGlvbnMgIT0gbnVsbCA/IG9wdGlvbnMuZnJvbVJlcXVpcmVGbHVzaCA6IHZvaWQgMCkge1xuICAgICAgICAvLyBJZiB0aGlzIGZpYmVyIGlzIGN1cnJlbnRseSBydW5uaW5nIGEgY29tcHV0YXRpb24gYW5kIGEgcmVxdWlyZSBmbHVzaCBoYXMgYmVlblxuICAgICAgICAvLyBkZWZlcnJlZCwgd2UgbmVlZCB0byBkZWZlciBhZ2FpbiBhbmQgcmV0cnkuXG4gICAgICAgIHRoaXMuX2RlZmVyQW5kVHJhbnNmZXIoKCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9ydW5GbHVzaChvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IGZsdXNoIGluc2lkZSBUcmFja2VyLmF1dG9ydW5cIik7XG4gICAgfVxuICAgIC8vIElmIHRoaXMgaXMgYSBydW4gZnJvbSByZXF1aXJlRmx1c2gsIHByb3ZpZGUgYSBmdXR1cmUgc28gdGhhdCBjYWxscyB0byBmbHVzaCBjYW4gd2FpdCBvbiBpdC5cbiAgICBpZiAob3B0aW9ucyAhPSBudWxsID8gb3B0aW9ucy5mcm9tUmVxdWlyZUZsdXNoIDogdm9pZCAwKSB7XG4gICAgICB0aGlzLmluRmx1c2ggPSBuZXcgRnV0dXJlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5GbHVzaCA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMud2lsbEZsdXNoID0gdHJ1ZTtcbiAgICB0aGlzLnRocm93Rmlyc3RFcnJvciA9ICEhKG9wdGlvbnMgIT0gbnVsbCA/IG9wdGlvbnMudGhyb3dGaXJzdEVycm9yIDogdm9pZCAwKTtcbiAgICByZWNvbXB1dGVkQ291bnQgPSAwO1xuICAgIGZpbmlzaGVkVHJ5ID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgIHdoaWxlICh0aGlzLnBlbmRpbmdDb21wdXRhdGlvbnMubGVuZ3RoIHx8IHRoaXMuYWZ0ZXJGbHVzaENhbGxiYWNrcy5sZW5ndGgpIHtcbiAgICAgICAgd2hpbGUgKHRoaXMucGVuZGluZ0NvbXB1dGF0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICBjb21wdXRhdGlvbiA9IHRoaXMucGVuZGluZ0NvbXB1dGF0aW9ucy5zaGlmdCgpO1xuICAgICAgICAgIGNvbXB1dGF0aW9uLl9yZWNvbXB1dGUoKTtcbiAgICAgICAgICBpZiAoY29tcHV0YXRpb24uX25lZWRzUmVjb21wdXRlKCkpIHtcbiAgICAgICAgICAgIHRoaXMucGVuZGluZ0NvbXB1dGF0aW9ucy51bnNoaWZ0KGNvbXB1dGF0aW9uKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCEob3B0aW9ucyAhPSBudWxsID8gb3B0aW9ucy5maW5pc2hTeW5jaHJvbm91c2x5IDogdm9pZCAwKSAmJiArK3JlY29tcHV0ZWRDb3VudCA+IDEwMDApIHtcbiAgICAgICAgICAgIGZpbmlzaGVkVHJ5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYWZ0ZXJGbHVzaENhbGxiYWNrcy5sZW5ndGgpIHtcbiAgICAgICAgICBmdW5jID0gdGhpcy5hZnRlckZsdXNoQ2FsbGJhY2tzLnNoaWZ0KCk7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZ1bmMoKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcjEpIHtcbiAgICAgICAgICAgIGVycm9yID0gZXJyb3IxO1xuICAgICAgICAgICAgdGhpcy5fdGhyb3dPckxvZyhcImFmdGVyRmx1c2hcIiwgZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZpbmlzaGVkVHJ5ID0gdHJ1ZTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgLy8gV2UgZmlyc3QgaGF2ZSB0byBzZXQgQGluRmx1c2ggdG8gbnVsbCwgdGhlbiB3ZSBjYW4gcmV0dXJuLlxuICAgICAgaW5GbHVzaCA9IHRoaXMuaW5GbHVzaDtcbiAgICAgIGlmICghZmluaXNoZWRUcnkpIHtcbiAgICAgICAgdGhpcy5pbkZsdXNoID0gbnVsbDtcbiAgICAgICAgaWYgKGluRmx1c2ggaW5zdGFuY2VvZiBGdXR1cmUpIHtcbiAgICAgICAgICBpbkZsdXNoLnJldHVybigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3J1bkZsdXNoKHtcbiAgICAgICAgICBmaW5pc2hTeW5jaHJvbm91c2x5OiBvcHRpb25zICE9IG51bGwgPyBvcHRpb25zLmZpbmlzaFN5bmNocm9ub3VzbHkgOiB2b2lkIDAsXG4gICAgICAgICAgdGhyb3dGaXJzdEVycm9yOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMud2lsbEZsdXNoID0gZmFsc2U7XG4gICAgICB0aGlzLmluRmx1c2ggPSBudWxsO1xuICAgICAgaWYgKGluRmx1c2ggaW5zdGFuY2VvZiBGdXR1cmUpIHtcbiAgICAgICAgaW5GbHVzaC5yZXR1cm4oKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnBlbmRpbmdDb21wdXRhdGlvbnMubGVuZ3RoIHx8IHRoaXMuYWZ0ZXJGbHVzaENhbGxiYWNrcy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgIT0gbnVsbCA/IG9wdGlvbnMuZmluaXNoU3luY2hyb25vdXNseSA6IHZvaWQgMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInN0aWxsIGhhdmUgbW9yZSB0byBkbz9cIik7XG4gICAgICAgIH1cbiAgICAgICAgTWV0ZW9yLnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLnJlcXVpcmVGbHVzaCgpO1xuICAgICAgICB9LCAxMCk7IC8vIG1zXG4gICAgICB9XG4gICAgfVxuICB9XG5cbn07XG5cblRyYWNrZXIuX3RyYWNrZXJJbnN0YW5jZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYmFzZTtcbiAgTWV0ZW9yLl9ub2RlQ29kZU11c3RCZUluRmliZXIoKTtcbiAgcmV0dXJuIChiYXNlID0gRmliZXIuY3VycmVudCkuX3RyYWNrZXJJbnN0YW5jZSAhPSBudWxsID8gYmFzZS5fdHJhY2tlckluc3RhbmNlIDogYmFzZS5fdHJhY2tlckluc3RhbmNlID0gbmV3IFRyYWNrZXJJbnN0YW5jZSgpO1xufTtcblxuVHJhY2tlci5mbHVzaCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgcmV0dXJuIFRyYWNrZXIuX3RyYWNrZXJJbnN0YW5jZSgpLl9ydW5GbHVzaCh7XG4gICAgZmluaXNoU3luY2hyb25vdXNseTogdHJ1ZSxcbiAgICB0aHJvd0ZpcnN0RXJyb3I6IG9wdGlvbnMgIT0gbnVsbCA/IG9wdGlvbnMuX3Rocm93Rmlyc3RFcnJvciA6IHZvaWQgMFxuICB9KTtcbn07XG5cblRyYWNrZXIuaW5GbHVzaCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gVHJhY2tlci5fdHJhY2tlckluc3RhbmNlKCkuaW5GbHVzaDtcbn07XG5cblRyYWNrZXIuYXV0b3J1biA9IGZ1bmN0aW9uKGZ1bmMsIG9wdGlvbnMpIHtcbiAgdmFyIGM7XG4gIGlmICh0eXBlb2YgZnVuYyAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVHJhY2tlci5hdXRvcnVuIHJlcXVpcmVzIGEgZnVuY3Rpb24gYXJndW1lbnRcIik7XG4gIH1cbiAgYyA9IG5ldyBUcmFja2VyLkNvbXB1dGF0aW9uKGZ1bmMsIFRyYWNrZXIuY3VycmVudENvbXB1dGF0aW9uLCBvcHRpb25zICE9IG51bGwgPyBvcHRpb25zLm9uRXJyb3IgOiB2b2lkIDAsIHByaXZhdGVPYmplY3QpO1xuICBpZiAoVHJhY2tlci5hY3RpdmUpIHtcbiAgICBUcmFja2VyLm9uSW52YWxpZGF0ZShmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBjLnN0b3AoKTtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gYztcbn07XG5cblRyYWNrZXIubm9ucmVhY3RpdmUgPSBmdW5jdGlvbihmKSB7XG4gIHZhciBwcmV2aW91cywgdHJhY2tlckluc3RhbmNlO1xuICB0cmFja2VySW5zdGFuY2UgPSBUcmFja2VyLl90cmFja2VySW5zdGFuY2UoKTtcbiAgcHJldmlvdXMgPSB0cmFja2VySW5zdGFuY2UuY3VycmVudENvbXB1dGF0aW9uO1xuICB0cmFja2VySW5zdGFuY2Uuc2V0Q3VycmVudENvbXB1dGF0aW9uKG51bGwpO1xuICB0cnkge1xuICAgIHJldHVybiBmKCk7XG4gIH0gZmluYWxseSB7XG4gICAgdHJhY2tlckluc3RhbmNlLnNldEN1cnJlbnRDb21wdXRhdGlvbihwcmV2aW91cyk7XG4gIH1cbn07XG5cblRyYWNrZXIub25JbnZhbGlkYXRlID0gZnVuY3Rpb24oZikge1xuICBpZiAoIVRyYWNrZXIuYWN0aXZlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVHJhY2tlci5vbkludmFsaWRhdGUgcmVxdWlyZXMgYSBjdXJyZW50Q29tcHV0YXRpb25cIik7XG4gIH1cbiAgcmV0dXJuIFRyYWNrZXIuY3VycmVudENvbXB1dGF0aW9uLm9uSW52YWxpZGF0ZShmKTtcbn07XG5cblRyYWNrZXIuYWZ0ZXJGbHVzaCA9IGZ1bmN0aW9uKGYpIHtcbiAgdmFyIHRyYWNrZXJJbnN0YW5jZTtcbiAgdHJhY2tlckluc3RhbmNlID0gVHJhY2tlci5fdHJhY2tlckluc3RhbmNlKCk7XG4gIHRyYWNrZXJJbnN0YW5jZS5hZnRlckZsdXNoQ2FsbGJhY2tzLnB1c2goZik7XG4gIHJldHVybiB0cmFja2VySW5zdGFuY2UucmVxdWlyZUZsdXNoKCk7XG59O1xuXG4vLyBDb21wYXRpYmlsaXR5IHdpdGggdGhlIGNsaWVudC1zaWRlIFRyYWNrZXIuIE9uIG5vZGUuanMgd2UgY2FuIHVzZSBkZWZpbmVQcm9wZXJ0aWVzIHRvIGRlZmluZSBnZXR0ZXJzLlxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoVHJhY2tlciwge1xuICBjdXJyZW50Q29tcHV0YXRpb246IHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFRyYWNrZXIuX3RyYWNrZXJJbnN0YW5jZSgpLmN1cnJlbnRDb21wdXRhdGlvbjtcbiAgICB9XG4gIH0sXG4gIGFjdGl2ZToge1xuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gVHJhY2tlci5fdHJhY2tlckluc3RhbmNlKCkuYWN0aXZlO1xuICAgIH1cbiAgfVxufSk7XG5cblRyYWNrZXIuQ29tcHV0YXRpb24gPSBjbGFzcyBDb21wdXRhdGlvbiB7XG4gIGNvbnN0cnVjdG9yKGZ1bmMsIF9wYXJlbnQsIF9vbkVycm9yLCBfcHJpdmF0ZSkge1xuICAgIHZhciBlcnJvcmVkLCBvbkV4Y2VwdGlvbjtcbiAgICB0aGlzLl9wYXJlbnQgPSBfcGFyZW50O1xuICAgIHRoaXMuX29uRXJyb3IgPSBfb25FcnJvcjtcbiAgICBpZiAoX3ByaXZhdGUgIT09IHByaXZhdGVPYmplY3QpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRyYWNrZXIuQ29tcHV0YXRpb24gY29uc3RydWN0b3IgaXMgcHJpdmF0ZTsgdXNlIFRyYWNrZXIuYXV0b3J1blwiKTtcbiAgICB9XG4gICAgdGhpcy5zdG9wcGVkID0gZmFsc2U7XG4gICAgdGhpcy5pbnZhbGlkYXRlZCA9IGZhbHNlO1xuICAgIHRoaXMuZmlyc3RSdW4gPSB0cnVlO1xuICAgIHRoaXMuX2lkID0gbmV4dElkKys7XG4gICAgdGhpcy5fb25JbnZhbGlkYXRlQ2FsbGJhY2tzID0gW107XG4gICAgdGhpcy5fb25TdG9wQ2FsbGJhY2tzID0gW107XG4gICAgdGhpcy5fYmVmb3JlUnVuQ2FsbGJhY2tzID0gW107XG4gICAgdGhpcy5fYWZ0ZXJSdW5DYWxsYmFja3MgPSBbXTtcbiAgICB0aGlzLl9yZWNvbXB1dGluZyA9IGZhbHNlO1xuICAgIHRoaXMuX3RyYWNrZXJJbnN0YW5jZSA9IFRyYWNrZXIuX3RyYWNrZXJJbnN0YW5jZSgpO1xuICAgIG9uRXhjZXB0aW9uID0gKGVycm9yKSA9PiB7XG4gICAgICBpZiAodGhpcy5maXJzdFJ1bikge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9vbkVycm9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vbkVycm9yKGVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90cmFja2VySW5zdGFuY2UuX3Rocm93T3JMb2coXCJyZWNvbXB1dGVcIiwgZXJyb3IpO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5fZnVuYyA9IE1ldGVvci5iaW5kRW52aXJvbm1lbnQoZnVuYywgb25FeGNlcHRpb24sIHRoaXMpO1xuICAgIGVycm9yZWQgPSB0cnVlO1xuICAgIHRyeSB7XG4gICAgICB0aGlzLl9jb21wdXRlKCk7XG4gICAgICBlcnJvcmVkID0gZmFsc2U7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMuZmlyc3RSdW4gPSBmYWxzZTtcbiAgICAgIGlmIChlcnJvcmVkKSB7XG4gICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uSW52YWxpZGF0ZShmKSB7XG4gICAgcmV0dXJuIEZpYmVyVXRpbHMuZW5zdXJlKCgpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgZiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIm9uSW52YWxpZGF0ZSByZXF1aXJlcyBhIGZ1bmN0aW9uXCIpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuaW52YWxpZGF0ZWQpIHtcbiAgICAgICAgcmV0dXJuIFRyYWNrZXIubm9ucmVhY3RpdmUoKCkgPT4ge1xuICAgICAgICAgIHJldHVybiBmKHRoaXMpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vbkludmFsaWRhdGVDYWxsYmFja3MucHVzaChmKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG9uU3RvcChmKSB7XG4gICAgcmV0dXJuIEZpYmVyVXRpbHMuZW5zdXJlKCgpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgZiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIm9uU3RvcCByZXF1aXJlcyBhIGZ1bmN0aW9uXCIpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuc3RvcHBlZCkge1xuICAgICAgICByZXR1cm4gVHJhY2tlci5ub25yZWFjdGl2ZSgoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGYodGhpcyk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29uU3RvcENhbGxiYWNrcy5wdXNoKGYpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYmVmb3JlUnVuKGYpIHtcbiAgICBpZiAodHlwZW9mIGYgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYmVmb3JlUnVuIHJlcXVpcmVzIGEgZnVuY3Rpb25cIik7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9iZWZvcmVSdW5DYWxsYmFja3MucHVzaChmKTtcbiAgfVxuXG4gIGFmdGVyUnVuKGYpIHtcbiAgICBpZiAodHlwZW9mIGYgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWZ0ZXJSdW4gcmVxdWlyZXMgYSBmdW5jdGlvblwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2FmdGVyUnVuQ2FsbGJhY2tzLnB1c2goZik7XG4gIH1cblxuICBpbnZhbGlkYXRlKCkge1xuICAgIHJldHVybiBGaWJlclV0aWxzLmVuc3VyZSgoKSA9PiB7XG4gICAgICB2YXIgY2FsbGJhY2ssIGksIGxlbiwgcmVmO1xuICAgICAgLy8gVE9ETzogV2h5IHNvbWUgdGVzdHMgZnJlZXplIGlmIHdlIHdyYXAgdGhpcyBtZXRob2QgaW50byBGaWJlclV0aWxzLnN5bmNocm9uaXplP1xuICAgICAgaWYgKCF0aGlzLmludmFsaWRhdGVkKSB7XG4gICAgICAgIGlmICghdGhpcy5fcmVjb21wdXRpbmcgJiYgIXRoaXMuc3RvcHBlZCkge1xuICAgICAgICAgIHRoaXMuX3RyYWNrZXJJbnN0YW5jZS5yZXF1aXJlRmx1c2goKTtcbiAgICAgICAgICB0aGlzLl90cmFja2VySW5zdGFuY2UucGVuZGluZ0NvbXB1dGF0aW9ucy5wdXNoKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW52YWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgICByZWYgPSB0aGlzLl9vbkludmFsaWRhdGVDYWxsYmFja3M7XG4gICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgIGNhbGxiYWNrID0gcmVmW2ldO1xuICAgICAgICAgIFRyYWNrZXIubm9ucmVhY3RpdmUoKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKHRoaXMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9vbkludmFsaWRhdGVDYWxsYmFja3MgPSBbXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgcmV0dXJuIEZpYmVyVXRpbHMuZW5zdXJlKCgpID0+IHtcbiAgICAgIHJldHVybiBGaWJlclV0aWxzLnN5bmNocm9uaXplKGd1YXJkLCB0aGlzLl9pZCwgKCkgPT4ge1xuICAgICAgICB2YXIgY2FsbGJhY2ssIHJlc3VsdHM7XG4gICAgICAgIGlmICh0aGlzLnN0b3BwZWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pbnZhbGlkYXRlKCk7XG4gICAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgd2hpbGUgKHRoaXMuX29uU3RvcENhbGxiYWNrcy5sZW5ndGgpIHtcbiAgICAgICAgICBjYWxsYmFjayA9IHRoaXMuX29uU3RvcENhbGxiYWNrcy5zaGlmdCgpO1xuICAgICAgICAgIHJlc3VsdHMucHVzaChUcmFja2VyLm5vbnJlYWN0aXZlKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayh0aGlzKTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFJ1bnMgYW4gYXJiaXRyYXJ5IGZ1bmN0aW9uIGluc2lkZSB0aGUgY29tcHV0YXRpb24uIFRoaXMgYWxsb3dzIGJyZWFraW5nIG1hbnkgYXNzdW1wdGlvbnMsIHNvIHVzZSBpdCB2ZXJ5IGNhcmVmdWxseS5cbiAgX3J1bkluc2lkZShmdW5jKSB7XG4gICAgcmV0dXJuIEZpYmVyVXRpbHMuc3luY2hyb25pemUoZ3VhcmQsIHRoaXMuX2lkLCAoKSA9PiB7XG4gICAgICB2YXIgcHJldmlvdXNDb21wdXRhdGlvbiwgcHJldmlvdXNJbkNvbXB1dGUsIHByZXZpb3VzVHJhY2tlckluc3RhbmNlO1xuICAgICAgTWV0ZW9yLl9ub2RlQ29kZU11c3RCZUluRmliZXIoKTtcbiAgICAgIHByZXZpb3VzVHJhY2tlckluc3RhbmNlID0gVHJhY2tlci5fdHJhY2tlckluc3RhbmNlKCk7XG4gICAgICBGaWJlci5jdXJyZW50Ll90cmFja2VySW5zdGFuY2UgPSB0aGlzLl90cmFja2VySW5zdGFuY2U7XG4gICAgICBwcmV2aW91c0NvbXB1dGF0aW9uID0gdGhpcy5fdHJhY2tlckluc3RhbmNlLmN1cnJlbnRDb21wdXRhdGlvbjtcbiAgICAgIHRoaXMuX3RyYWNrZXJJbnN0YW5jZS5zZXRDdXJyZW50Q29tcHV0YXRpb24odGhpcyk7XG4gICAgICBwcmV2aW91c0luQ29tcHV0ZSA9IHRoaXMuX3RyYWNrZXJJbnN0YW5jZS5pbkNvbXB1dGU7XG4gICAgICB0aGlzLl90cmFja2VySW5zdGFuY2UuaW5Db21wdXRlID0gdHJ1ZTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBmdW5jKHRoaXMpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgRmliZXIuY3VycmVudC5fdHJhY2tlckluc3RhbmNlID0gcHJldmlvdXNUcmFja2VySW5zdGFuY2U7XG4gICAgICAgIHRoaXMuX3RyYWNrZXJJbnN0YW5jZS5zZXRDdXJyZW50Q29tcHV0YXRpb24ocHJldmlvdXNDb21wdXRhdGlvbik7XG4gICAgICAgIHRoaXMuX3RyYWNrZXJJbnN0YW5jZS5pbkNvbXB1dGUgPSBwcmV2aW91c0luQ29tcHV0ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIF9jb21wdXRlKCkge1xuICAgIHJldHVybiBGaWJlclV0aWxzLnN5bmNocm9uaXplKGd1YXJkLCB0aGlzLl9pZCwgKCkgPT4ge1xuICAgICAgdGhpcy5pbnZhbGlkYXRlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHRoaXMuX3J1bkluc2lkZSgoY29tcHV0YXRpb24pID0+IHtcbiAgICAgICAgdmFyIGNhbGxiYWNrLCByZXN1bHRzO1xuICAgICAgICB3aGlsZSAodGhpcy5fYmVmb3JlUnVuQ2FsbGJhY2tzLmxlbmd0aCkge1xuICAgICAgICAgIGNhbGxiYWNrID0gdGhpcy5fYmVmb3JlUnVuQ2FsbGJhY2tzLnNoaWZ0KCk7XG4gICAgICAgICAgVHJhY2tlci5ub25yZWFjdGl2ZSgoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sodGhpcyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZnVuYy5jYWxsKG51bGwsIHRoaXMpO1xuICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgIHdoaWxlICh0aGlzLl9hZnRlclJ1bkNhbGxiYWNrcy5sZW5ndGgpIHtcbiAgICAgICAgICBjYWxsYmFjayA9IHRoaXMuX2FmdGVyUnVuQ2FsbGJhY2tzLnNoaWZ0KCk7XG4gICAgICAgICAgcmVzdWx0cy5wdXNoKFRyYWNrZXIubm9ucmVhY3RpdmUoKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKHRoaXMpO1xuICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgX25lZWRzUmVjb21wdXRlKCkge1xuICAgIHJldHVybiB0aGlzLmludmFsaWRhdGVkICYmICF0aGlzLnN0b3BwZWQ7XG4gIH1cblxuICBfcmVjb21wdXRlKCkge1xuICAgIHJldHVybiBGaWJlclV0aWxzLnN5bmNocm9uaXplKGd1YXJkLCB0aGlzLl9pZCwgKCkgPT4ge1xuICAgICAgYXNzZXJ0KCF0aGlzLl9yZWNvbXB1dGluZyk7XG4gICAgICB0aGlzLl9yZWNvbXB1dGluZyA9IHRydWU7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAodGhpcy5fbmVlZHNSZWNvbXB1dGUoKSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9jb21wdXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRoaXMuX3JlY29tcHV0aW5nID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmbHVzaCgpIHtcbiAgICByZXR1cm4gRmliZXJVdGlscy5lbnN1cmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX3JlY29tcHV0aW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLl9yZWNvbXB1dGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJ1bigpIHtcbiAgICByZXR1cm4gRmliZXJVdGlscy5lbnN1cmUoKCkgPT4ge1xuICAgICAgdGhpcy5pbnZhbGlkYXRlKCk7XG4gICAgICByZXR1cm4gdGhpcy5mbHVzaCgpO1xuICAgIH0pO1xuICB9XG5cbn07XG5cblRyYWNrZXIuRGVwZW5kZW5jeSA9IGNsYXNzIERlcGVuZGVuY3kge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9kZXBlbmRlbnRzQnlJZCA9IHt9O1xuICB9XG5cbiAgZGVwZW5kKGNvbXB1dGF0aW9uKSB7XG4gICAgdmFyIGlkO1xuICAgIGlmICghY29tcHV0YXRpb24pIHtcbiAgICAgIGlmICghVHJhY2tlci5hY3RpdmUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgY29tcHV0YXRpb24gPSBUcmFja2VyLmN1cnJlbnRDb21wdXRhdGlvbjtcbiAgICB9XG4gICAgaWQgPSBjb21wdXRhdGlvbi5faWQ7XG4gICAgaWYgKCEoaWQgaW4gdGhpcy5fZGVwZW5kZW50c0J5SWQpKSB7XG4gICAgICB0aGlzLl9kZXBlbmRlbnRzQnlJZFtpZF0gPSBjb21wdXRhdGlvbjtcbiAgICAgIGNvbXB1dGF0aW9uLm9uSW52YWxpZGF0ZSgoKSA9PiB7XG4gICAgICAgIHJldHVybiBkZWxldGUgdGhpcy5fZGVwZW5kZW50c0J5SWRbaWRdO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY2hhbmdlZCgpIHtcbiAgICB2YXIgY29tcHV0YXRpb24sIGlkLCByZWYsIHJlc3VsdHM7XG4gICAgcmVmID0gdGhpcy5fZGVwZW5kZW50c0J5SWQ7XG4gICAgcmVzdWx0cyA9IFtdO1xuICAgIGZvciAoaWQgaW4gcmVmKSB7XG4gICAgICBjb21wdXRhdGlvbiA9IHJlZltpZF07XG4gICAgICByZXN1bHRzLnB1c2goY29tcHV0YXRpb24uaW52YWxpZGF0ZSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cblxuICBoYXNEZXBlbmRlbnRzKCkge1xuICAgIHZhciBjb21wdXRhdGlvbiwgaWQsIHJlZjtcbiAgICByZWYgPSB0aGlzLl9kZXBlbmRlbnRzQnlJZDtcbiAgICBmb3IgKGlkIGluIHJlZikge1xuICAgICAgY29tcHV0YXRpb24gPSByZWZbaWRdO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG59O1xuXG5leHBvcnQge1xuICBUcmFja2VyXG59O1xuIl19
