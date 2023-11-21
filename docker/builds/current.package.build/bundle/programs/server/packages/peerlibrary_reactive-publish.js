(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var LocalCollection = Package.minimongo.LocalCollection;
var Minimongo = Package.minimongo.Minimongo;
var _ = Package.underscore._;
var Tracker = Package['peerlibrary:server-autorun'].Tracker;
var extendPublish = Package['peerlibrary:extend-publish'].extendPublish;
var Promise = Package.promise.Promise;
var meteorInstall = Package.modules.meteorInstall;

/* Package-scope variables */
var __coffeescriptShare;

var require = meteorInstall({"node_modules":{"meteor":{"peerlibrary:reactive-publish":{"server.coffee":function module(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/peerlibrary_reactive-publish/server.coffee                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Fiber,
    checkNames,
    getCollectionNames,
    iterateObjectOrMapKeys,
    originalLocalCollectionCursorObserveChanges,
    originalObserveChanges,
    wrapCallbacks,
    indexOf = [].indexOf;
Fiber = Npm.require('fibers');

getCollectionNames = function (result) {
  var cursor, resultNames;

  if (result && _.isArray(result)) {
    resultNames = function () {
      var i, len, results;
      results = [];

      for (i = 0, len = result.length; i < len; i++) {
        cursor = result[i];

        if (_.isObject(cursor) && '_getCollectionName' in cursor) {
          results.push(cursor._getCollectionName());
        }
      }

      return results;
    }();
  } else if (result && _.isObject(result) && '_getCollectionName' in result) {
    resultNames = [result._getCollectionName()];
  } else {
    resultNames = [];
  }

  return resultNames;
};

checkNames = function (publish, allCollectionNames, id, collectionNames) {
  var collectionName, computationId, i, len, names;

  for (computationId in allCollectionNames) {
    names = allCollectionNames[computationId];

    if (computationId !== id) {
      for (i = 0, len = names.length; i < len; i++) {
        collectionName = names[i];

        if (!(indexOf.call(collectionNames, collectionName) >= 0)) {
          continue;
        }

        publish.error(new Error(`Multiple cursors for collection '${collectionName}'`));
        return false;
      }
    }
  }

  return true;
};

iterateObjectOrMapKeys = function (objectOrMap, fn) {
  var key, results, results1, x;

  if (objectOrMap instanceof Map) {
    results = [];

    for (x of objectOrMap) {
      [key] = x;
      results.push(fn(key));
    }

    return results;
  } else {
    results1 = [];

    for (key in objectOrMap) {
      results1.push(fn(key));
    }

    return results1;
  }
};

wrapCallbacks = function (callbacks, initializingReference) {
  var callback, callbackName, currentComputation; // If observeChanges is called inside a reactive context we have to make extra effort to pass the computation to the
  // observeChanges callbacks so that the computation is available to the "added" publish method, if it is called. We use
  // fiber object for that. observeChanges callbacks are not called in a reactive context. Additionally, we want this to
  // be passed only during the observeChanges initialization (when it is calling "added" callbacks in a blocking manner).

  if (Tracker.active) {
    Meteor._nodeCodeMustBeInFiber();

    currentComputation = Tracker.currentComputation;
    callbacks = _.clone(callbacks);

    for (callbackName in callbacks) {
      callback = callbacks[callbackName];

      if (callbackName === 'added' || callbackName === 'changed' || callbackName === 'removed' || callbackName === 'addedBefore' || callbackName === 'movedBefore') {
        (function (callbackName, callback) {
          return callbacks[callbackName] = function (...args) {
            var previousPublishComputation;

            if (initializingReference.initializing) {
              previousPublishComputation = Fiber.current._publishComputation;
              Fiber.current._publishComputation = currentComputation;

              try {
                return callback.apply(null, args);
              } finally {
                Fiber.current._publishComputation = previousPublishComputation;
              }
            } else {
              return callback.apply(null, args);
            }
          };
        })(callbackName, callback);
      }
    }
  }

  return callbacks;
};

originalObserveChanges = MongoInternals.Connection.prototype._observeChanges;

MongoInternals.Connection.prototype._observeChanges = function (cursorDescription, ordered, callbacks) {
  var handle, initializing;
  initializing = true;
  callbacks = wrapCallbacks(callbacks, {
    initializing: initializing
  });
  handle = originalObserveChanges.call(this, cursorDescription, ordered, callbacks);
  initializing = false;
  return handle;
};

originalLocalCollectionCursorObserveChanges = LocalCollection.Cursor.prototype.observeChanges;

LocalCollection.Cursor.prototype.observeChanges = function (options) {
  var handle, initializing;
  initializing = true;
  options = wrapCallbacks(options, {
    initializing: initializing
  });
  handle = originalLocalCollectionCursorObserveChanges.call(this, options);
  initializing = false;
  return handle;
};

extendPublish(function (name, publishFunction, options) {
  var newPublishFunction;

  newPublishFunction = function (...args) {
    var allCollectionNames, collectionNames, documents, handles, oldDocuments, originalAdded, originalReady, publish, ready, result;
    publish = this;
    oldDocuments = {};
    documents = {};
    allCollectionNames = {};

    publish._currentComputation = function () {
      if (Tracker.active) {
        return Tracker.currentComputation;
      } else {
        // Computation can also be passed through current fiber in the case the "added" method is called
        // from the observeChanges callback from an observeChanges called inside a reactive context.
        return Fiber.current._publishComputation;
      }

      return null;
    };

    publish._installCallbacks = function () {
      var computation;
      computation = this._currentComputation();

      if (!computation) {
        return;
      }

      if (!computation._publishOnStopSet) {
        computation._publishOnStopSet = true;
        computation.onStop(() => {
          delete oldDocuments[computation._id];
          return delete documents[computation._id];
        });
      }

      if (!computation._publishAfterRunSet) {
        computation._publishAfterRunSet = true;
        computation.afterRun(() => {
          // We remove those which are not published anymore.
          iterateObjectOrMapKeys(this._documents, collectionName => {
            var computationId, currentComputationAddedDocumentIds, currentlyPublishedDocumentIds, docs, i, id, len, otherComputationsAddedDocumentsIds, otherComputationsPreviouslyAddedDocumentsIds, ref, ref1, results;

            if (this._documents instanceof Map) {
              currentlyPublishedDocumentIds = Array.from(this._documents.get(collectionName));
            } else {
              currentlyPublishedDocumentIds = _.keys(this._documents[collectionName] || {});
            }

            currentComputationAddedDocumentIds = _.keys(((ref = documents[computation._id]) != null ? ref[collectionName] : void 0) || {}); // If afterRun for other autoruns in the publish function have not yet run, we have to look in "documents" as well.

            otherComputationsAddedDocumentsIds = _.union(...function () {
              var results;
              results = [];

              for (computationId in documents) {
                docs = documents[computationId];

                if (computationId !== `${computation._id}`) {
                  results.push(_.keys(docs[collectionName] || {}));
                }
              }

              return results;
            }()); // But after afterRun, "documents" is empty to be ready for next rerun of the computation, so we look into "oldDocuments".

            otherComputationsPreviouslyAddedDocumentsIds = _.union(...function () {
              var results;
              results = [];

              for (computationId in oldDocuments) {
                docs = oldDocuments[computationId];

                if (computationId !== `${computation._id}`) {
                  results.push(_.keys(docs[collectionName] || {}));
                }
              }

              return results;
            }());
            ref1 = _.difference(currentlyPublishedDocumentIds, currentComputationAddedDocumentIds, otherComputationsAddedDocumentsIds, otherComputationsPreviouslyAddedDocumentsIds); // We ignore IDs found in both otherComputationsAddedDocumentsIds and otherComputationsPreviouslyAddedDocumentsIds
            // which might ignore more IDs then necessary (an ID might be previously added which has not been added in this
            // iteration) but this is OK because in afterRun of other computations this will be corrected and documents
            // with those IDs removed.

            results = [];

            for (i = 0, len = ref1.length; i < len; i++) {
              id = ref1[i];
              results.push(this.removed(collectionName, this._idFilter.idParse(id)));
            }

            return results;
          });
          computation.beforeRun(() => {
            oldDocuments[computation._id] = documents[computation._id] || {};
            return documents[computation._id] = {};
          });
          return computation._publishAfterRunSet = false;
        });

        computation._trackerInstance.requireFlush();
      }
    };

    originalAdded = publish.added;

    publish.added = function (collectionName, id, fields) {
      var _documents, currentComputation, dataByKey, oldFields, ref, ref1, ref2, ref3, ref4, ref5, stringId;

      stringId = this._idFilter.idStringify(id);

      this._installCallbacks();

      currentComputation = this._currentComputation();

      if (currentComputation) {
        Meteor._ensure(documents, currentComputation._id, collectionName)[stringId] = true;
      } // If document as already present in publish then we call changed to send updated fields (Meteor sends only a diff).
      // This can hide some errors in publish functions if they one calls "added" on an existing document and we could
      // make it so that this behavior works only inside reactive computation (if "currentComputation" is set), but we
      // can also make it so that publish function tries to do something smarter (sending a diff) in all cases, as we do.


      if (this._documents instanceof Map && ((ref = this._documents.get(collectionName)) != null ? ref.has(stringId) : void 0) || ((ref1 = this._documents[collectionName]) != null ? ref1[stringId] : void 0)) {
        oldFields = {}; // If some field existed before, but does not exist anymore, we have to remove it by calling "changed"
        // with value set to "undefined". So we look into current session's state and see which fields are currently
        // known and create an object of same fields, just all values set to "undefined". We then override some fields
        // with new values. Only top-level fields matter.

        _documents = ((ref2 = this._session) != null ? (ref3 = ref2.getCollectionView(collectionName)) != null ? ref3.documents : void 0 : void 0) || {};

        if (_documents instanceof Map) {
          dataByKey = ((ref4 = _documents.get(stringId)) != null ? ref4.dataByKey : void 0) || {};
        } else {
          dataByKey = (_documents != null ? (ref5 = _documents[stringId]) != null ? ref5.dataByKey : void 0 : void 0) || {};
        }

        iterateObjectOrMapKeys(dataByKey, field => {
          return oldFields[field] = void 0;
        });
        return this.changed(collectionName, id, _.extend(oldFields, fields));
      } else {
        return originalAdded.call(this, collectionName, id, fields);
      }
    };

    ready = false;
    originalReady = publish.ready;

    publish.ready = function () {
      this._installCallbacks();

      if (!ready) {
        // Mark it as ready only the first time.
        originalReady.call(this);
      }

      ready = true;
    }; // To return nothing.


    handles = []; // This autorun is nothing special, just that it makes sure handles are stopped when publish stops,
    // and that you can return cursors from the function which would be automatically published.

    publish.autorun = function (runFunc) {
      var handle;
      handle = Tracker.autorun(function (computation) {
        var collectionNames, error, result;
        computation.onInvalidate(function () {
          return delete allCollectionNames[computation._id];
        });

        try {
          result = runFunc.call(publish, computation);
        } catch (error1) {
          error = error1;
          computation.stop();

          if (computation.firstRun) {
            throw error;
          } else {
            publish.error(error);
            return;
          }
        }

        collectionNames = getCollectionNames(result);
        allCollectionNames[computation._id] = collectionNames;

        if (!checkNames(publish, allCollectionNames, `${computation._id}`, collectionNames)) {
          computation.stop();
          return;
        } // Specially handle if computation has been returned.


        if (result instanceof Tracker.Computation) {
          if (publish._isDeactivated()) {
            return result.stop();
          } else {
            return handles.push(result);
          }
        } else {
          if (!publish._isDeactivated()) {
            return publish._publishHandlerResult(result);
          }
        }
      });

      if (publish._isDeactivated()) {
        handle.stop();
      } else {
        handles.push(handle);
      }

      return handle;
    };

    publish.onStop(function () {
      var handle, results;
      results = [];

      while (handles.length) {
        handle = handles.shift();
        results.push(handle != null ? handle.stop() : void 0);
      }

      return results;
    });
    result = publishFunction.apply(publish, args);
    collectionNames = getCollectionNames(result);
    allCollectionNames[''] = collectionNames;

    if (!checkNames(publish, allCollectionNames, '', collectionNames)) {
      return;
    } // Specially handle if computation has been returned.


    if (result instanceof Tracker.Computation) {
      if (publish._isDeactivated()) {
        result.stop();
      } else {
        handles.push(result);
      }
    } else {
      // Do not return anything.
      return result;
    }
  };

  return [name, newPublishFunction, options];
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".coffee"
  ]
});

require("/node_modules/meteor/peerlibrary:reactive-publish/server.coffee");

/* Exports */
Package._define("peerlibrary:reactive-publish");

})();

//# sourceURL=meteor://💻app/packages/peerlibrary_reactive-publish.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvcGVlcmxpYnJhcnlfcmVhY3RpdmUtcHVibGlzaC9zZXJ2ZXIuY29mZmVlIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIuY29mZmVlIl0sIm5hbWVzIjpbIkZpYmVyIiwiY2hlY2tOYW1lcyIsImdldENvbGxlY3Rpb25OYW1lcyIsIml0ZXJhdGVPYmplY3RPck1hcEtleXMiLCJvcmlnaW5hbExvY2FsQ29sbGVjdGlvbkN1cnNvck9ic2VydmVDaGFuZ2VzIiwib3JpZ2luYWxPYnNlcnZlQ2hhbmdlcyIsIndyYXBDYWxsYmFja3MiLCJpbmRleE9mIiwiTnBtIiwicmVxdWlyZSIsInJlc3VsdCIsImN1cnNvciIsInJlc3VsdE5hbWVzIiwiXyIsImlzQXJyYXkiLCJpIiwibGVuIiwicmVzdWx0cyIsImxlbmd0aCIsImlzT2JqZWN0IiwicHVzaCIsIl9nZXRDb2xsZWN0aW9uTmFtZSIsInB1Ymxpc2giLCJhbGxDb2xsZWN0aW9uTmFtZXMiLCJpZCIsImNvbGxlY3Rpb25OYW1lcyIsImNvbGxlY3Rpb25OYW1lIiwiY29tcHV0YXRpb25JZCIsIm5hbWVzIiwiY2FsbCIsImVycm9yIiwiRXJyb3IiLCJvYmplY3RPck1hcCIsImZuIiwia2V5IiwicmVzdWx0czEiLCJ4IiwiTWFwIiwiY2FsbGJhY2tzIiwiaW5pdGlhbGl6aW5nUmVmZXJlbmNlIiwiY2FsbGJhY2siLCJjYWxsYmFja05hbWUiLCJjdXJyZW50Q29tcHV0YXRpb24iLCJUcmFja2VyIiwiYWN0aXZlIiwiTWV0ZW9yIiwiX25vZGVDb2RlTXVzdEJlSW5GaWJlciIsImNsb25lIiwiYXJncyIsInByZXZpb3VzUHVibGlzaENvbXB1dGF0aW9uIiwiaW5pdGlhbGl6aW5nIiwiY3VycmVudCIsIl9wdWJsaXNoQ29tcHV0YXRpb24iLCJhcHBseSIsIk1vbmdvSW50ZXJuYWxzIiwiQ29ubmVjdGlvbiIsInByb3RvdHlwZSIsIl9vYnNlcnZlQ2hhbmdlcyIsImN1cnNvckRlc2NyaXB0aW9uIiwib3JkZXJlZCIsImhhbmRsZSIsIkxvY2FsQ29sbGVjdGlvbiIsIkN1cnNvciIsIm9ic2VydmVDaGFuZ2VzIiwib3B0aW9ucyIsImV4dGVuZFB1Ymxpc2giLCJuYW1lIiwicHVibGlzaEZ1bmN0aW9uIiwibmV3UHVibGlzaEZ1bmN0aW9uIiwiZG9jdW1lbnRzIiwiaGFuZGxlcyIsIm9sZERvY3VtZW50cyIsIm9yaWdpbmFsQWRkZWQiLCJvcmlnaW5hbFJlYWR5IiwicmVhZHkiLCJfY3VycmVudENvbXB1dGF0aW9uIiwiX2luc3RhbGxDYWxsYmFja3MiLCJjb21wdXRhdGlvbiIsIl9wdWJsaXNoT25TdG9wU2V0Iiwib25TdG9wIiwiX2lkIiwiX3B1Ymxpc2hBZnRlclJ1blNldCIsImFmdGVyUnVuIiwiX2RvY3VtZW50cyIsImN1cnJlbnRDb21wdXRhdGlvbkFkZGVkRG9jdW1lbnRJZHMiLCJjdXJyZW50bHlQdWJsaXNoZWREb2N1bWVudElkcyIsImRvY3MiLCJvdGhlckNvbXB1dGF0aW9uc0FkZGVkRG9jdW1lbnRzSWRzIiwib3RoZXJDb21wdXRhdGlvbnNQcmV2aW91c2x5QWRkZWREb2N1bWVudHNJZHMiLCJyZWYiLCJyZWYxIiwiQXJyYXkiLCJmcm9tIiwiZ2V0Iiwia2V5cyIsInVuaW9uIiwiZGlmZmVyZW5jZSIsInJlbW92ZWQiLCJfaWRGaWx0ZXIiLCJpZFBhcnNlIiwiYmVmb3JlUnVuIiwiX3RyYWNrZXJJbnN0YW5jZSIsInJlcXVpcmVGbHVzaCIsImFkZGVkIiwiZmllbGRzIiwiZGF0YUJ5S2V5Iiwib2xkRmllbGRzIiwicmVmMiIsInJlZjMiLCJyZWY0IiwicmVmNSIsInN0cmluZ0lkIiwiaWRTdHJpbmdpZnkiLCJfZW5zdXJlIiwiaGFzIiwiX3Nlc3Npb24iLCJnZXRDb2xsZWN0aW9uVmlldyIsImZpZWxkIiwiY2hhbmdlZCIsImV4dGVuZCIsImF1dG9ydW4iLCJydW5GdW5jIiwib25JbnZhbGlkYXRlIiwiZXJyb3IxIiwic3RvcCIsImZpcnN0UnVuIiwiQ29tcHV0YXRp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QWhCLENBQXNCL0IsT0FBdEIsRUFBK0IwQixJQUEvQixDQUFUO0FBRUF2QixtQkFBQSxHQUFrQnZCLGtCQUFBLENBQW1CUSxNQUFuQixDQUFsQjtBQUNBYSxzQkFBbUIsSUFBbkIsR0FBeUJFLGVBQXpCOztBQUNBLFNBQWN4QixVQUFBLENBQVdxQixPQUFYLEVBQW9CQyxrQkFBcEIsRUFBd0MsRUFBeEMsRUFBNENFLGVBQTVDLENBQWQ7QUFBQTtBQS9KQSxLQURtQixDQ3NQbkI7OztBRG5GQSxRQUFHZixNQUFBLFlBQWtCaUMsT0FBTyxDQUFDbUYsV0FBN0I7QUFDRSxVQUFHeEcsT0FBTyxDQUFDeUcsY0FBUixFQUFIO0FBQ0VySCxjQUFNLENBQUNrSCxJQUFQO0FBREY7QUFHRXRELGVBQU8sQ0FBQ2xELElBQVIsQ0FBYVYsTUFBYjtBQUpKO0FBQUE7QUMyRkU7QUFDQSxhRGxGQUEsTUNrRkE7QUFDRDtBRGhRa0IsR0FBckI7O0FDa1FBLFNEbkZBLENBQUN3RCxJQUFELEVBQU9FLGtCQUFQLEVBQTJCSixPQUEzQixDQ21GQTtBRG5RRixHIiwiZmlsZSI6Ii9wYWNrYWdlcy9wZWVybGlicmFyeV9yZWFjdGl2ZS1wdWJsaXNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiRmliZXIgPSBOcG0ucmVxdWlyZSAnZmliZXJzJ1xuXG5nZXRDb2xsZWN0aW9uTmFtZXMgPSAocmVzdWx0KSAtPlxuICBpZiByZXN1bHQgYW5kIF8uaXNBcnJheSByZXN1bHRcbiAgICByZXN1bHROYW1lcyA9IChjdXJzb3IuX2dldENvbGxlY3Rpb25OYW1lKCkgZm9yIGN1cnNvciBpbiByZXN1bHQgd2hlbiBfLmlzT2JqZWN0KGN1cnNvcikgYW5kICdfZ2V0Q29sbGVjdGlvbk5hbWUnIG9mIGN1cnNvcilcbiAgZWxzZSBpZiByZXN1bHQgYW5kIF8uaXNPYmplY3QocmVzdWx0KSBhbmQgJ19nZXRDb2xsZWN0aW9uTmFtZScgb2YgcmVzdWx0XG4gICAgcmVzdWx0TmFtZXMgPSBbcmVzdWx0Ll9nZXRDb2xsZWN0aW9uTmFtZSgpXVxuICBlbHNlXG4gICAgcmVzdWx0TmFtZXMgPSBbXVxuXG4gIHJlc3VsdE5hbWVzXG5cbmNoZWNrTmFtZXMgPSAocHVibGlzaCwgYWxsQ29sbGVjdGlvbk5hbWVzLCBpZCwgY29sbGVjdGlvbk5hbWVzKSAtPlxuICBmb3IgY29tcHV0YXRpb25JZCwgbmFtZXMgb2YgYWxsQ29sbGVjdGlvbk5hbWVzIHdoZW4gY29tcHV0YXRpb25JZCBpc250IGlkXG4gICAgZm9yIGNvbGxlY3Rpb25OYW1lIGluIG5hbWVzIHdoZW4gY29sbGVjdGlvbk5hbWUgaW4gY29sbGVjdGlvbk5hbWVzXG4gICAgICBwdWJsaXNoLmVycm9yIG5ldyBFcnJvciBcIk11bHRpcGxlIGN1cnNvcnMgZm9yIGNvbGxlY3Rpb24gJyN7Y29sbGVjdGlvbk5hbWV9J1wiXG4gICAgICByZXR1cm4gZmFsc2VcblxuICB0cnVlXG5cbml0ZXJhdGVPYmplY3RPck1hcEtleXMgPSAob2JqZWN0T3JNYXAsIGZuKSAtPlxuICBpZiAob2JqZWN0T3JNYXAgaW5zdGFuY2VvZiBNYXApXG4gICAgZm9yIFsga2V5IF0gZnJvbSBvYmplY3RPck1hcFxuICAgICAgZm4oa2V5KVxuICBlbHNlXG4gICAgZm9yIGtleSBvZiBvYmplY3RPck1hcFxuICAgICAgZm4oa2V5KVxuXG53cmFwQ2FsbGJhY2tzID0gKGNhbGxiYWNrcywgaW5pdGlhbGl6aW5nUmVmZXJlbmNlKSAtPlxuICAjIElmIG9ic2VydmVDaGFuZ2VzIGlzIGNhbGxlZCBpbnNpZGUgYSByZWFjdGl2ZSBjb250ZXh0IHdlIGhhdmUgdG8gbWFrZSBleHRyYSBlZmZvcnQgdG8gcGFzcyB0aGUgY29tcHV0YXRpb24gdG8gdGhlXG4gICMgb2JzZXJ2ZUNoYW5nZXMgY2FsbGJhY2tzIHNvIHRoYXQgdGhlIGNvbXB1dGF0aW9uIGlzIGF2YWlsYWJsZSB0byB0aGUgXCJhZGRlZFwiIHB1Ymxpc2ggbWV0aG9kLCBpZiBpdCBpcyBjYWxsZWQuIFdlIHVzZVxuICAjIGZpYmVyIG9iamVjdCBmb3IgdGhhdC4gb2JzZXJ2ZUNoYW5nZXMgY2FsbGJhY2tzIGFyZSBub3QgY2FsbGVkIGluIGEgcmVhY3RpdmUgY29udGV4dC4gQWRkaXRpb25hbGx5LCB3ZSB3YW50IHRoaXMgdG9cbiAgIyBiZSBwYXNzZWQgb25seSBkdXJpbmcgdGhlIG9ic2VydmVDaGFuZ2VzIGluaXRpYWxpemF0aW9uICh3aGVuIGl0IGlzIGNhbGxpbmcgXCJhZGRlZFwiIGNhbGxiYWNrcyBpbiBhIGJsb2NraW5nIG1hbm5lcikuXG4gIGlmIFRyYWNrZXIuYWN0aXZlXG4gICAgTWV0ZW9yLl9ub2RlQ29kZU11c3RCZUluRmliZXIoKVxuICAgIGN1cnJlbnRDb21wdXRhdGlvbiA9IFRyYWNrZXIuY3VycmVudENvbXB1dGF0aW9uXG4gICAgY2FsbGJhY2tzID0gXy5jbG9uZSBjYWxsYmFja3NcbiAgICBmb3IgY2FsbGJhY2tOYW1lLCBjYWxsYmFjayBvZiBjYWxsYmFja3Mgd2hlbiBjYWxsYmFja05hbWUgaW4gWydhZGRlZCcsICdjaGFuZ2VkJywgJ3JlbW92ZWQnLCAnYWRkZWRCZWZvcmUnLCAnbW92ZWRCZWZvcmUnXVxuICAgICAgZG8gKGNhbGxiYWNrTmFtZSwgY2FsbGJhY2spIC0+XG4gICAgICAgIGNhbGxiYWNrc1tjYWxsYmFja05hbWVdID0gKGFyZ3MuLi4pIC0+XG4gICAgICAgICAgaWYgaW5pdGlhbGl6aW5nUmVmZXJlbmNlLmluaXRpYWxpemluZ1xuICAgICAgICAgICAgcHJldmlvdXNQdWJsaXNoQ29tcHV0YXRpb24gPSBGaWJlci5jdXJyZW50Ll9wdWJsaXNoQ29tcHV0YXRpb25cbiAgICAgICAgICAgIEZpYmVyLmN1cnJlbnQuX3B1Ymxpc2hDb21wdXRhdGlvbiA9IGN1cnJlbnRDb21wdXRhdGlvblxuICAgICAgICAgICAgdHJ5XG4gICAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5IG51bGwsIGFyZ3NcbiAgICAgICAgICAgIGZpbmFsbHlcbiAgICAgICAgICAgICAgRmliZXIuY3VycmVudC5fcHVibGlzaENvbXB1dGF0aW9uID0gcHJldmlvdXNQdWJsaXNoQ29tcHV0YXRpb25cbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBjYWxsYmFjay5hcHBseSBudWxsLCBhcmdzXG5cbiAgY2FsbGJhY2tzXG5cbm9yaWdpbmFsT2JzZXJ2ZUNoYW5nZXMgPSBNb25nb0ludGVybmFscy5Db25uZWN0aW9uOjpfb2JzZXJ2ZUNoYW5nZXNcbk1vbmdvSW50ZXJuYWxzLkNvbm5lY3Rpb246Ol9vYnNlcnZlQ2hhbmdlcyA9IChjdXJzb3JEZXNjcmlwdGlvbiwgb3JkZXJlZCwgY2FsbGJhY2tzKSAtPlxuICBpbml0aWFsaXppbmcgPSB0cnVlXG5cbiAgY2FsbGJhY2tzID0gd3JhcENhbGxiYWNrcyBjYWxsYmFja3MsIGluaXRpYWxpemluZzogaW5pdGlhbGl6aW5nXG5cbiAgaGFuZGxlID0gb3JpZ2luYWxPYnNlcnZlQ2hhbmdlcy5jYWxsIEAsIGN1cnNvckRlc2NyaXB0aW9uLCBvcmRlcmVkLCBjYWxsYmFja3NcbiAgaW5pdGlhbGl6aW5nID0gZmFsc2VcbiAgaGFuZGxlXG5cbm9yaWdpbmFsTG9jYWxDb2xsZWN0aW9uQ3Vyc29yT2JzZXJ2ZUNoYW5nZXMgPSBMb2NhbENvbGxlY3Rpb24uQ3Vyc29yOjpvYnNlcnZlQ2hhbmdlc1xuTG9jYWxDb2xsZWN0aW9uLkN1cnNvcjo6b2JzZXJ2ZUNoYW5nZXMgPSAob3B0aW9ucykgLT5cbiAgaW5pdGlhbGl6aW5nID0gdHJ1ZVxuXG4gIG9wdGlvbnMgPSB3cmFwQ2FsbGJhY2tzIG9wdGlvbnMsIGluaXRpYWxpemluZzogaW5pdGlhbGl6aW5nXG5cbiAgaGFuZGxlID0gb3JpZ2luYWxMb2NhbENvbGxlY3Rpb25DdXJzb3JPYnNlcnZlQ2hhbmdlcy5jYWxsIEAsIG9wdGlvbnNcbiAgaW5pdGlhbGl6aW5nID0gZmFsc2VcbiAgaGFuZGxlXG5cbmV4dGVuZFB1Ymxpc2ggKG5hbWUsIHB1Ymxpc2hGdW5jdGlvbiwgb3B0aW9ucykgLT5cbiAgbmV3UHVibGlzaEZ1bmN0aW9uID0gKGFyZ3MuLi4pIC0+XG4gICAgcHVibGlzaCA9IEBcblxuICAgIG9sZERvY3VtZW50cyA9IHt9XG4gICAgZG9jdW1lbnRzID0ge31cblxuICAgIGFsbENvbGxlY3Rpb25OYW1lcyA9IHt9XG5cbiAgICBwdWJsaXNoLl9jdXJyZW50Q29tcHV0YXRpb24gPSAtPlxuICAgICAgaWYgVHJhY2tlci5hY3RpdmVcbiAgICAgICAgcmV0dXJuIFRyYWNrZXIuY3VycmVudENvbXB1dGF0aW9uXG4gICAgICBlbHNlXG4gICAgICAgICMgQ29tcHV0YXRpb24gY2FuIGFsc28gYmUgcGFzc2VkIHRocm91Z2ggY3VycmVudCBmaWJlciBpbiB0aGUgY2FzZSB0aGUgXCJhZGRlZFwiIG1ldGhvZCBpcyBjYWxsZWRcbiAgICAgICAgIyBmcm9tIHRoZSBvYnNlcnZlQ2hhbmdlcyBjYWxsYmFjayBmcm9tIGFuIG9ic2VydmVDaGFuZ2VzIGNhbGxlZCBpbnNpZGUgYSByZWFjdGl2ZSBjb250ZXh0LlxuICAgICAgICByZXR1cm4gRmliZXIuY3VycmVudC5fcHVibGlzaENvbXB1dGF0aW9uXG5cbiAgICAgIG51bGxcblxuICAgIHB1Ymxpc2guX2luc3RhbGxDYWxsYmFja3MgPSAtPlxuICAgICAgY29tcHV0YXRpb24gPSBAX2N1cnJlbnRDb21wdXRhdGlvbigpXG5cbiAgICAgIHJldHVybiB1bmxlc3MgY29tcHV0YXRpb25cblxuICAgICAgdW5sZXNzIGNvbXB1dGF0aW9uLl9wdWJsaXNoT25TdG9wU2V0XG4gICAgICAgIGNvbXB1dGF0aW9uLl9wdWJsaXNoT25TdG9wU2V0ID0gdHJ1ZVxuXG4gICAgICAgIGNvbXB1dGF0aW9uLm9uU3RvcCA9PlxuICAgICAgICAgIGRlbGV0ZSBvbGREb2N1bWVudHNbY29tcHV0YXRpb24uX2lkXVxuICAgICAgICAgIGRlbGV0ZSBkb2N1bWVudHNbY29tcHV0YXRpb24uX2lkXVxuXG4gICAgICB1bmxlc3MgY29tcHV0YXRpb24uX3B1Ymxpc2hBZnRlclJ1blNldFxuICAgICAgICBjb21wdXRhdGlvbi5fcHVibGlzaEFmdGVyUnVuU2V0ID0gdHJ1ZVxuXG4gICAgICAgIGNvbXB1dGF0aW9uLmFmdGVyUnVuID0+XG4gICAgICAgICAgIyBXZSByZW1vdmUgdGhvc2Ugd2hpY2ggYXJlIG5vdCBwdWJsaXNoZWQgYW55bW9yZS5cbiAgICAgICAgICBpdGVyYXRlT2JqZWN0T3JNYXBLZXlzIEBfZG9jdW1lbnRzLCAoY29sbGVjdGlvbk5hbWUpID0+XG4gICAgICAgICAgICBpZiBAX2RvY3VtZW50cyBpbnN0YW5jZW9mIE1hcFxuICAgICAgICAgICAgICBjdXJyZW50bHlQdWJsaXNoZWREb2N1bWVudElkcyA9IEFycmF5LmZyb20oQF9kb2N1bWVudHMuZ2V0KGNvbGxlY3Rpb25OYW1lKSlcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgY3VycmVudGx5UHVibGlzaGVkRG9jdW1lbnRJZHMgPSBfLmtleXMoQF9kb2N1bWVudHNbY29sbGVjdGlvbk5hbWVdIG9yIHt9KVxuXG4gICAgICAgICAgICBjdXJyZW50Q29tcHV0YXRpb25BZGRlZERvY3VtZW50SWRzID0gXy5rZXlzKGRvY3VtZW50c1tjb21wdXRhdGlvbi5faWRdP1tjb2xsZWN0aW9uTmFtZV0gb3Ige30pXG4gICAgICAgICAgICAjIElmIGFmdGVyUnVuIGZvciBvdGhlciBhdXRvcnVucyBpbiB0aGUgcHVibGlzaCBmdW5jdGlvbiBoYXZlIG5vdCB5ZXQgcnVuLCB3ZSBoYXZlIHRvIGxvb2sgaW4gXCJkb2N1bWVudHNcIiBhcyB3ZWxsLlxuICAgICAgICAgICAgb3RoZXJDb21wdXRhdGlvbnNBZGRlZERvY3VtZW50c0lkcyA9IF8udW5pb24gKF8ua2V5cyhkb2NzW2NvbGxlY3Rpb25OYW1lXSBvciB7fSkgZm9yIGNvbXB1dGF0aW9uSWQsIGRvY3Mgb2YgZG9jdW1lbnRzIHdoZW4gY29tcHV0YXRpb25JZCBpc250IFwiI3tjb21wdXRhdGlvbi5faWR9XCIpLi4uXG4gICAgICAgICAgICAjIEJ1dCBhZnRlciBhZnRlclJ1biwgXCJkb2N1bWVudHNcIiBpcyBlbXB0eSB0byBiZSByZWFkeSBmb3IgbmV4dCByZXJ1biBvZiB0aGUgY29tcHV0YXRpb24sIHNvIHdlIGxvb2sgaW50byBcIm9sZERvY3VtZW50c1wiLlxuICAgICAgICAgICAgb3RoZXJDb21wdXRhdGlvbnNQcmV2aW91c2x5QWRkZWREb2N1bWVudHNJZHMgPSBfLnVuaW9uIChfLmtleXMoZG9jc1tjb2xsZWN0aW9uTmFtZV0gb3Ige30pIGZvciBjb21wdXRhdGlvbklkLCBkb2NzIG9mIG9sZERvY3VtZW50cyB3aGVuIGNvbXB1dGF0aW9uSWQgaXNudCBcIiN7Y29tcHV0YXRpb24uX2lkfVwiKS4uLlxuXG4gICAgICAgICAgICAjIFdlIGlnbm9yZSBJRHMgZm91bmQgaW4gYm90aCBvdGhlckNvbXB1dGF0aW9uc0FkZGVkRG9jdW1lbnRzSWRzIGFuZCBvdGhlckNvbXB1dGF0aW9uc1ByZXZpb3VzbHlBZGRlZERvY3VtZW50c0lkc1xuICAgICAgICAgICAgIyB3aGljaCBtaWdodCBpZ25vcmUgbW9yZSBJRHMgdGhlbiBuZWNlc3NhcnkgKGFuIElEIG1pZ2h0IGJlIHByZXZpb3VzbHkgYWRkZWQgd2hpY2ggaGFzIG5vdCBiZWVuIGFkZGVkIGluIHRoaXNcbiAgICAgICAgICAgICMgaXRlcmF0aW9uKSBidXQgdGhpcyBpcyBPSyBiZWNhdXNlIGluIGFmdGVyUnVuIG9mIG90aGVyIGNvbXB1dGF0aW9ucyB0aGlzIHdpbGwgYmUgY29ycmVjdGVkIGFuZCBkb2N1bWVudHNcbiAgICAgICAgICAgICMgd2l0aCB0aG9zZSBJRHMgcmVtb3ZlZC5cbiAgICAgICAgICAgIGZvciBpZCBpbiBfLmRpZmZlcmVuY2UgY3VycmVudGx5UHVibGlzaGVkRG9jdW1lbnRJZHMsIGN1cnJlbnRDb21wdXRhdGlvbkFkZGVkRG9jdW1lbnRJZHMsIG90aGVyQ29tcHV0YXRpb25zQWRkZWREb2N1bWVudHNJZHMsIG90aGVyQ29tcHV0YXRpb25zUHJldmlvdXNseUFkZGVkRG9jdW1lbnRzSWRzXG4gICAgICAgICAgICAgIEByZW1vdmVkIGNvbGxlY3Rpb25OYW1lLCBAX2lkRmlsdGVyLmlkUGFyc2UgaWRcblxuICAgICAgICAgIGNvbXB1dGF0aW9uLmJlZm9yZVJ1biA9PlxuICAgICAgICAgICAgb2xkRG9jdW1lbnRzW2NvbXB1dGF0aW9uLl9pZF0gPSBkb2N1bWVudHNbY29tcHV0YXRpb24uX2lkXSBvciB7fVxuICAgICAgICAgICAgZG9jdW1lbnRzW2NvbXB1dGF0aW9uLl9pZF0gPSB7fVxuXG4gICAgICAgICAgY29tcHV0YXRpb24uX3B1Ymxpc2hBZnRlclJ1blNldCA9IGZhbHNlXG5cbiAgICAgICAgY29tcHV0YXRpb24uX3RyYWNrZXJJbnN0YW5jZS5yZXF1aXJlRmx1c2goKVxuXG4gICAgICByZXR1cm5cblxuICAgIG9yaWdpbmFsQWRkZWQgPSBwdWJsaXNoLmFkZGVkXG4gICAgcHVibGlzaC5hZGRlZCA9IChjb2xsZWN0aW9uTmFtZSwgaWQsIGZpZWxkcykgLT5cbiAgICAgIHN0cmluZ0lkID0gQF9pZEZpbHRlci5pZFN0cmluZ2lmeSBpZFxuXG4gICAgICBAX2luc3RhbGxDYWxsYmFja3MoKVxuXG4gICAgICBjdXJyZW50Q29tcHV0YXRpb24gPSBAX2N1cnJlbnRDb21wdXRhdGlvbigpXG4gICAgICBNZXRlb3IuX2Vuc3VyZShkb2N1bWVudHMsIGN1cnJlbnRDb21wdXRhdGlvbi5faWQsIGNvbGxlY3Rpb25OYW1lKVtzdHJpbmdJZF0gPSB0cnVlIGlmIGN1cnJlbnRDb21wdXRhdGlvblxuXG4gICAgICAjIElmIGRvY3VtZW50IGFzIGFscmVhZHkgcHJlc2VudCBpbiBwdWJsaXNoIHRoZW4gd2UgY2FsbCBjaGFuZ2VkIHRvIHNlbmQgdXBkYXRlZCBmaWVsZHMgKE1ldGVvciBzZW5kcyBvbmx5IGEgZGlmZikuXG4gICAgICAjIFRoaXMgY2FuIGhpZGUgc29tZSBlcnJvcnMgaW4gcHVibGlzaCBmdW5jdGlvbnMgaWYgdGhleSBvbmUgY2FsbHMgXCJhZGRlZFwiIG9uIGFuIGV4aXN0aW5nIGRvY3VtZW50IGFuZCB3ZSBjb3VsZFxuICAgICAgIyBtYWtlIGl0IHNvIHRoYXQgdGhpcyBiZWhhdmlvciB3b3JrcyBvbmx5IGluc2lkZSByZWFjdGl2ZSBjb21wdXRhdGlvbiAoaWYgXCJjdXJyZW50Q29tcHV0YXRpb25cIiBpcyBzZXQpLCBidXQgd2VcbiAgICAgICMgY2FuIGFsc28gbWFrZSBpdCBzbyB0aGF0IHB1Ymxpc2ggZnVuY3Rpb24gdHJpZXMgdG8gZG8gc29tZXRoaW5nIHNtYXJ0ZXIgKHNlbmRpbmcgYSBkaWZmKSBpbiBhbGwgY2FzZXMsIGFzIHdlIGRvLlxuICAgICAgaWYgKChAX2RvY3VtZW50cyBpbnN0YW5jZW9mIE1hcCAmJiBAX2RvY3VtZW50cy5nZXQoY29sbGVjdGlvbk5hbWUpPy5oYXMoc3RyaW5nSWQpKSB8fCBAX2RvY3VtZW50c1tjb2xsZWN0aW9uTmFtZV0/W3N0cmluZ0lkXSlcbiAgICAgICAgb2xkRmllbGRzID0ge31cbiAgICAgICAgIyBJZiBzb21lIGZpZWxkIGV4aXN0ZWQgYmVmb3JlLCBidXQgZG9lcyBub3QgZXhpc3QgYW55bW9yZSwgd2UgaGF2ZSB0byByZW1vdmUgaXQgYnkgY2FsbGluZyBcImNoYW5nZWRcIlxuICAgICAgICAjIHdpdGggdmFsdWUgc2V0IHRvIFwidW5kZWZpbmVkXCIuIFNvIHdlIGxvb2sgaW50byBjdXJyZW50IHNlc3Npb24ncyBzdGF0ZSBhbmQgc2VlIHdoaWNoIGZpZWxkcyBhcmUgY3VycmVudGx5XG4gICAgICAgICMga25vd24gYW5kIGNyZWF0ZSBhbiBvYmplY3Qgb2Ygc2FtZSBmaWVsZHMsIGp1c3QgYWxsIHZhbHVlcyBzZXQgdG8gXCJ1bmRlZmluZWRcIi4gV2UgdGhlbiBvdmVycmlkZSBzb21lIGZpZWxkc1xuICAgICAgICAjIHdpdGggbmV3IHZhbHVlcy4gT25seSB0b3AtbGV2ZWwgZmllbGRzIG1hdHRlci5cbiAgICAgICAgX2RvY3VtZW50cyA9IEBfc2Vzc2lvbj8uZ2V0Q29sbGVjdGlvblZpZXcoY29sbGVjdGlvbk5hbWUpPy5kb2N1bWVudHMgb3Ige31cbiAgICAgICAgaWYgX2RvY3VtZW50cyBpbnN0YW5jZW9mIE1hcFxuICAgICAgICAgIGRhdGFCeUtleSA9IF9kb2N1bWVudHMuZ2V0KHN0cmluZ0lkKT8uZGF0YUJ5S2V5IG9yIHt9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBkYXRhQnlLZXkgPSBfZG9jdW1lbnRzP1tzdHJpbmdJZF0/LmRhdGFCeUtleSBvciB7fVxuXG4gICAgICAgIGl0ZXJhdGVPYmplY3RPck1hcEtleXMgZGF0YUJ5S2V5LCAoZmllbGQpID0+XG4gICAgICAgICAgb2xkRmllbGRzW2ZpZWxkXSA9IHVuZGVmaW5lZFxuXG4gICAgICAgIEBjaGFuZ2VkIGNvbGxlY3Rpb25OYW1lLCBpZCwgXy5leHRlbmQgb2xkRmllbGRzLCBmaWVsZHNcbiAgICAgIGVsc2VcbiAgICAgICAgb3JpZ2luYWxBZGRlZC5jYWxsIEAsIGNvbGxlY3Rpb25OYW1lLCBpZCwgZmllbGRzXG5cbiAgICByZWFkeSA9IGZhbHNlXG5cbiAgICBvcmlnaW5hbFJlYWR5ID0gcHVibGlzaC5yZWFkeVxuICAgIHB1Ymxpc2gucmVhZHkgPSAtPlxuICAgICAgQF9pbnN0YWxsQ2FsbGJhY2tzKClcblxuICAgICAgIyBNYXJrIGl0IGFzIHJlYWR5IG9ubHkgdGhlIGZpcnN0IHRpbWUuXG4gICAgICBvcmlnaW5hbFJlYWR5LmNhbGwgQCB1bmxlc3MgcmVhZHlcbiAgICAgIHJlYWR5ID0gdHJ1ZVxuXG4gICAgICAjIFRvIHJldHVybiBub3RoaW5nLlxuICAgICAgcmV0dXJuXG5cbiAgICBoYW5kbGVzID0gW11cbiAgICAjIFRoaXMgYXV0b3J1biBpcyBub3RoaW5nIHNwZWNpYWwsIGp1c3QgdGhhdCBpdCBtYWtlcyBzdXJlIGhhbmRsZXMgYXJlIHN0b3BwZWQgd2hlbiBwdWJsaXNoIHN0b3BzLFxuICAgICMgYW5kIHRoYXQgeW91IGNhbiByZXR1cm4gY3Vyc29ycyBmcm9tIHRoZSBmdW5jdGlvbiB3aGljaCB3b3VsZCBiZSBhdXRvbWF0aWNhbGx5IHB1Ymxpc2hlZC5cbiAgICBwdWJsaXNoLmF1dG9ydW4gPSAocnVuRnVuYykgLT5cbiAgICAgIGhhbmRsZSA9IFRyYWNrZXIuYXV0b3J1biAoY29tcHV0YXRpb24pIC0+XG4gICAgICAgIGNvbXB1dGF0aW9uLm9uSW52YWxpZGF0ZSAtPlxuICAgICAgICAgIGRlbGV0ZSBhbGxDb2xsZWN0aW9uTmFtZXNbY29tcHV0YXRpb24uX2lkXVxuXG4gICAgICAgIHRyeVxuICAgICAgICAgIHJlc3VsdCA9IHJ1bkZ1bmMuY2FsbCBwdWJsaXNoLCBjb21wdXRhdGlvblxuICAgICAgICBjYXRjaCBlcnJvclxuICAgICAgICAgIGNvbXB1dGF0aW9uLnN0b3AoKVxuXG4gICAgICAgICAgaWYgY29tcHV0YXRpb24uZmlyc3RSdW5cbiAgICAgICAgICAgIHRocm93IGVycm9yXG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgcHVibGlzaC5lcnJvcihlcnJvcilcbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIGNvbGxlY3Rpb25OYW1lcyA9IGdldENvbGxlY3Rpb25OYW1lcyByZXN1bHRcbiAgICAgICAgYWxsQ29sbGVjdGlvbk5hbWVzW2NvbXB1dGF0aW9uLl9pZF0gPSBjb2xsZWN0aW9uTmFtZXNcblxuICAgICAgICB1bmxlc3MgY2hlY2tOYW1lcyBwdWJsaXNoLCBhbGxDb2xsZWN0aW9uTmFtZXMsIFwiI3tjb21wdXRhdGlvbi5faWR9XCIsIGNvbGxlY3Rpb25OYW1lc1xuICAgICAgICAgIGNvbXB1dGF0aW9uLnN0b3AoKVxuICAgICAgICAgIHJldHVyblxuXG4gICAgICAgICMgU3BlY2lhbGx5IGhhbmRsZSBpZiBjb21wdXRhdGlvbiBoYXMgYmVlbiByZXR1cm5lZC5cbiAgICAgICAgaWYgcmVzdWx0IGluc3RhbmNlb2YgVHJhY2tlci5Db21wdXRhdGlvblxuICAgICAgICAgIGlmIHB1Ymxpc2guX2lzRGVhY3RpdmF0ZWQoKVxuICAgICAgICAgICAgcmVzdWx0LnN0b3AoKVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGhhbmRsZXMucHVzaCByZXN1bHRcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHB1Ymxpc2guX3B1Ymxpc2hIYW5kbGVyUmVzdWx0IHJlc3VsdCB1bmxlc3MgcHVibGlzaC5faXNEZWFjdGl2YXRlZCgpXG5cbiAgICAgIGlmIHB1Ymxpc2guX2lzRGVhY3RpdmF0ZWQoKVxuICAgICAgICBoYW5kbGUuc3RvcCgpXG4gICAgICBlbHNlXG4gICAgICAgIGhhbmRsZXMucHVzaCBoYW5kbGVcblxuICAgICAgaGFuZGxlXG5cbiAgICBwdWJsaXNoLm9uU3RvcCAtPlxuICAgICAgd2hpbGUgaGFuZGxlcy5sZW5ndGhcbiAgICAgICAgaGFuZGxlID0gaGFuZGxlcy5zaGlmdCgpXG4gICAgICAgIGhhbmRsZT8uc3RvcCgpXG5cbiAgICByZXN1bHQgPSBwdWJsaXNoRnVuY3Rpb24uYXBwbHkgcHVibGlzaCwgYXJnc1xuXG4gICAgY29sbGVjdGlvbk5hbWVzID0gZ2V0Q29sbGVjdGlvbk5hbWVzIHJlc3VsdFxuICAgIGFsbENvbGxlY3Rpb25OYW1lc1snJ10gPSBjb2xsZWN0aW9uTmFtZXNcbiAgICByZXR1cm4gdW5sZXNzIGNoZWNrTmFtZXMgcHVibGlzaCwgYWxsQ29sbGVjdGlvbk5hbWVzLCAnJywgY29sbGVjdGlvbk5hbWVzXG5cbiAgICAjIFNwZWNpYWxseSBoYW5kbGUgaWYgY29tcHV0YXRpb24gaGFzIGJlZW4gcmV0dXJuZWQuXG4gICAgaWYgcmVzdWx0IGluc3RhbmNlb2YgVHJhY2tlci5Db21wdXRhdGlvblxuICAgICAgaWYgcHVibGlzaC5faXNEZWFjdGl2YXRlZCgpXG4gICAgICAgIHJlc3VsdC5zdG9wKClcbiAgICAgIGVsc2VcbiAgICAgICAgaGFuZGxlcy5wdXNoIHJlc3VsdFxuXG4gICAgICAjIERvIG5vdCByZXR1cm4gYW55dGhpbmcuXG4gICAgICByZXR1cm5cblxuICAgIGVsc2VcbiAgICAgIHJlc3VsdFxuXG4gIFtuYW1lLCBuZXdQdWJsaXNoRnVuY3Rpb24sIG9wdGlvbnNdXG4iLCJ2YXIgRmliZXIsIGNoZWNrTmFtZXMsIGdldENvbGxlY3Rpb25OYW1lcywgaXRlcmF0ZU9iamVjdE9yTWFwS2V5cywgb3JpZ2luYWxMb2NhbENvbGxlY3Rpb25DdXJzb3JPYnNlcnZlQ2hhbmdlcywgb3JpZ2luYWxPYnNlcnZlQ2hhbmdlcywgd3JhcENhbGxiYWNrcyxcbiAgaW5kZXhPZiA9IFtdLmluZGV4T2Y7XG5cbkZpYmVyID0gTnBtLnJlcXVpcmUoJ2ZpYmVycycpO1xuXG5nZXRDb2xsZWN0aW9uTmFtZXMgPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgdmFyIGN1cnNvciwgcmVzdWx0TmFtZXM7XG4gIGlmIChyZXN1bHQgJiYgXy5pc0FycmF5KHJlc3VsdCkpIHtcbiAgICByZXN1bHROYW1lcyA9IChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSByZXN1bHQubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgY3Vyc29yID0gcmVzdWx0W2ldO1xuICAgICAgICBpZiAoXy5pc09iamVjdChjdXJzb3IpICYmICdfZ2V0Q29sbGVjdGlvbk5hbWUnIGluIGN1cnNvcikge1xuICAgICAgICAgIHJlc3VsdHMucHVzaChjdXJzb3IuX2dldENvbGxlY3Rpb25OYW1lKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICB9IGVsc2UgaWYgKHJlc3VsdCAmJiBfLmlzT2JqZWN0KHJlc3VsdCkgJiYgJ19nZXRDb2xsZWN0aW9uTmFtZScgaW4gcmVzdWx0KSB7XG4gICAgcmVzdWx0TmFtZXMgPSBbcmVzdWx0Ll9nZXRDb2xsZWN0aW9uTmFtZSgpXTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHROYW1lcyA9IFtdO1xuICB9XG4gIHJldHVybiByZXN1bHROYW1lcztcbn07XG5cbmNoZWNrTmFtZXMgPSBmdW5jdGlvbihwdWJsaXNoLCBhbGxDb2xsZWN0aW9uTmFtZXMsIGlkLCBjb2xsZWN0aW9uTmFtZXMpIHtcbiAgdmFyIGNvbGxlY3Rpb25OYW1lLCBjb21wdXRhdGlvbklkLCBpLCBsZW4sIG5hbWVzO1xuICBmb3IgKGNvbXB1dGF0aW9uSWQgaW4gYWxsQ29sbGVjdGlvbk5hbWVzKSB7XG4gICAgbmFtZXMgPSBhbGxDb2xsZWN0aW9uTmFtZXNbY29tcHV0YXRpb25JZF07XG4gICAgaWYgKGNvbXB1dGF0aW9uSWQgIT09IGlkKSB7XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBuYW1lcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBjb2xsZWN0aW9uTmFtZSA9IG5hbWVzW2ldO1xuICAgICAgICBpZiAoIShpbmRleE9mLmNhbGwoY29sbGVjdGlvbk5hbWVzLCBjb2xsZWN0aW9uTmFtZSkgPj0gMCkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaXNoLmVycm9yKG5ldyBFcnJvcihgTXVsdGlwbGUgY3Vyc29ycyBmb3IgY29sbGVjdGlvbiAnJHtjb2xsZWN0aW9uTmFtZX0nYCkpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufTtcblxuaXRlcmF0ZU9iamVjdE9yTWFwS2V5cyA9IGZ1bmN0aW9uKG9iamVjdE9yTWFwLCBmbikge1xuICB2YXIga2V5LCByZXN1bHRzLCByZXN1bHRzMSwgeDtcbiAgaWYgKG9iamVjdE9yTWFwIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgcmVzdWx0cyA9IFtdO1xuICAgIGZvciAoeCBvZiBvYmplY3RPck1hcCkge1xuICAgICAgW2tleV0gPSB4O1xuICAgICAgcmVzdWx0cy5wdXNoKGZuKGtleSkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfSBlbHNlIHtcbiAgICByZXN1bHRzMSA9IFtdO1xuICAgIGZvciAoa2V5IGluIG9iamVjdE9yTWFwKSB7XG4gICAgICByZXN1bHRzMS5wdXNoKGZuKGtleSkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0czE7XG4gIH1cbn07XG5cbndyYXBDYWxsYmFja3MgPSBmdW5jdGlvbihjYWxsYmFja3MsIGluaXRpYWxpemluZ1JlZmVyZW5jZSkge1xuICB2YXIgY2FsbGJhY2ssIGNhbGxiYWNrTmFtZSwgY3VycmVudENvbXB1dGF0aW9uO1xuICAvLyBJZiBvYnNlcnZlQ2hhbmdlcyBpcyBjYWxsZWQgaW5zaWRlIGEgcmVhY3RpdmUgY29udGV4dCB3ZSBoYXZlIHRvIG1ha2UgZXh0cmEgZWZmb3J0IHRvIHBhc3MgdGhlIGNvbXB1dGF0aW9uIHRvIHRoZVxuICAvLyBvYnNlcnZlQ2hhbmdlcyBjYWxsYmFja3Mgc28gdGhhdCB0aGUgY29tcHV0YXRpb24gaXMgYXZhaWxhYmxlIHRvIHRoZSBcImFkZGVkXCIgcHVibGlzaCBtZXRob2QsIGlmIGl0IGlzIGNhbGxlZC4gV2UgdXNlXG4gIC8vIGZpYmVyIG9iamVjdCBmb3IgdGhhdC4gb2JzZXJ2ZUNoYW5nZXMgY2FsbGJhY2tzIGFyZSBub3QgY2FsbGVkIGluIGEgcmVhY3RpdmUgY29udGV4dC4gQWRkaXRpb25hbGx5LCB3ZSB3YW50IHRoaXMgdG9cbiAgLy8gYmUgcGFzc2VkIG9ubHkgZHVyaW5nIHRoZSBvYnNlcnZlQ2hhbmdlcyBpbml0aWFsaXphdGlvbiAod2hlbiBpdCBpcyBjYWxsaW5nIFwiYWRkZWRcIiBjYWxsYmFja3MgaW4gYSBibG9ja2luZyBtYW5uZXIpLlxuICBpZiAoVHJhY2tlci5hY3RpdmUpIHtcbiAgICBNZXRlb3IuX25vZGVDb2RlTXVzdEJlSW5GaWJlcigpO1xuICAgIGN1cnJlbnRDb21wdXRhdGlvbiA9IFRyYWNrZXIuY3VycmVudENvbXB1dGF0aW9uO1xuICAgIGNhbGxiYWNrcyA9IF8uY2xvbmUoY2FsbGJhY2tzKTtcbiAgICBmb3IgKGNhbGxiYWNrTmFtZSBpbiBjYWxsYmFja3MpIHtcbiAgICAgIGNhbGxiYWNrID0gY2FsbGJhY2tzW2NhbGxiYWNrTmFtZV07XG4gICAgICBpZiAoY2FsbGJhY2tOYW1lID09PSAnYWRkZWQnIHx8IGNhbGxiYWNrTmFtZSA9PT0gJ2NoYW5nZWQnIHx8IGNhbGxiYWNrTmFtZSA9PT0gJ3JlbW92ZWQnIHx8IGNhbGxiYWNrTmFtZSA9PT0gJ2FkZGVkQmVmb3JlJyB8fCBjYWxsYmFja05hbWUgPT09ICdtb3ZlZEJlZm9yZScpIHtcbiAgICAgICAgKGZ1bmN0aW9uKGNhbGxiYWNrTmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2tzW2NhbGxiYWNrTmFtZV0gPSBmdW5jdGlvbiguLi5hcmdzKSB7XG4gICAgICAgICAgICB2YXIgcHJldmlvdXNQdWJsaXNoQ29tcHV0YXRpb247XG4gICAgICAgICAgICBpZiAoaW5pdGlhbGl6aW5nUmVmZXJlbmNlLmluaXRpYWxpemluZykge1xuICAgICAgICAgICAgICBwcmV2aW91c1B1Ymxpc2hDb21wdXRhdGlvbiA9IEZpYmVyLmN1cnJlbnQuX3B1Ymxpc2hDb21wdXRhdGlvbjtcbiAgICAgICAgICAgICAgRmliZXIuY3VycmVudC5fcHVibGlzaENvbXB1dGF0aW9uID0gY3VycmVudENvbXB1dGF0aW9uO1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcmdzKTtcbiAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBGaWJlci5jdXJyZW50Ll9wdWJsaXNoQ29tcHV0YXRpb24gPSBwcmV2aW91c1B1Ymxpc2hDb21wdXRhdGlvbjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pKGNhbGxiYWNrTmFtZSwgY2FsbGJhY2spO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY2FsbGJhY2tzO1xufTtcblxub3JpZ2luYWxPYnNlcnZlQ2hhbmdlcyA9IE1vbmdvSW50ZXJuYWxzLkNvbm5lY3Rpb24ucHJvdG90eXBlLl9vYnNlcnZlQ2hhbmdlcztcblxuTW9uZ29JbnRlcm5hbHMuQ29ubmVjdGlvbi5wcm90b3R5cGUuX29ic2VydmVDaGFuZ2VzID0gZnVuY3Rpb24oY3Vyc29yRGVzY3JpcHRpb24sIG9yZGVyZWQsIGNhbGxiYWNrcykge1xuICB2YXIgaGFuZGxlLCBpbml0aWFsaXppbmc7XG4gIGluaXRpYWxpemluZyA9IHRydWU7XG4gIGNhbGxiYWNrcyA9IHdyYXBDYWxsYmFja3MoY2FsbGJhY2tzLCB7XG4gICAgaW5pdGlhbGl6aW5nOiBpbml0aWFsaXppbmdcbiAgfSk7XG4gIGhhbmRsZSA9IG9yaWdpbmFsT2JzZXJ2ZUNoYW5nZXMuY2FsbCh0aGlzLCBjdXJzb3JEZXNjcmlwdGlvbiwgb3JkZXJlZCwgY2FsbGJhY2tzKTtcbiAgaW5pdGlhbGl6aW5nID0gZmFsc2U7XG4gIHJldHVybiBoYW5kbGU7XG59O1xuXG5vcmlnaW5hbExvY2FsQ29sbGVjdGlvbkN1cnNvck9ic2VydmVDaGFuZ2VzID0gTG9jYWxDb2xsZWN0aW9uLkN1cnNvci5wcm90b3R5cGUub2JzZXJ2ZUNoYW5nZXM7XG5cbkxvY2FsQ29sbGVjdGlvbi5DdXJzb3IucHJvdG90eXBlLm9ic2VydmVDaGFuZ2VzID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICB2YXIgaGFuZGxlLCBpbml0aWFsaXppbmc7XG4gIGluaXRpYWxpemluZyA9IHRydWU7XG4gIG9wdGlvbnMgPSB3cmFwQ2FsbGJhY2tzKG9wdGlvbnMsIHtcbiAgICBpbml0aWFsaXppbmc6IGluaXRpYWxpemluZ1xuICB9KTtcbiAgaGFuZGxlID0gb3JpZ2luYWxMb2NhbENvbGxlY3Rpb25DdXJzb3JPYnNlcnZlQ2hhbmdlcy5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICBpbml0aWFsaXppbmcgPSBmYWxzZTtcbiAgcmV0dXJuIGhhbmRsZTtcbn07XG5cbmV4dGVuZFB1Ymxpc2goZnVuY3Rpb24obmFtZSwgcHVibGlzaEZ1bmN0aW9uLCBvcHRpb25zKSB7XG4gIHZhciBuZXdQdWJsaXNoRnVuY3Rpb247XG4gIG5ld1B1Ymxpc2hGdW5jdGlvbiA9IGZ1bmN0aW9uKC4uLmFyZ3MpIHtcbiAgICB2YXIgYWxsQ29sbGVjdGlvbk5hbWVzLCBjb2xsZWN0aW9uTmFtZXMsIGRvY3VtZW50cywgaGFuZGxlcywgb2xkRG9jdW1lbnRzLCBvcmlnaW5hbEFkZGVkLCBvcmlnaW5hbFJlYWR5LCBwdWJsaXNoLCByZWFkeSwgcmVzdWx0O1xuICAgIHB1Ymxpc2ggPSB0aGlzO1xuICAgIG9sZERvY3VtZW50cyA9IHt9O1xuICAgIGRvY3VtZW50cyA9IHt9O1xuICAgIGFsbENvbGxlY3Rpb25OYW1lcyA9IHt9O1xuICAgIHB1Ymxpc2guX2N1cnJlbnRDb21wdXRhdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKFRyYWNrZXIuYWN0aXZlKSB7XG4gICAgICAgIHJldHVybiBUcmFja2VyLmN1cnJlbnRDb21wdXRhdGlvbjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIENvbXB1dGF0aW9uIGNhbiBhbHNvIGJlIHBhc3NlZCB0aHJvdWdoIGN1cnJlbnQgZmliZXIgaW4gdGhlIGNhc2UgdGhlIFwiYWRkZWRcIiBtZXRob2QgaXMgY2FsbGVkXG4gICAgICAgIC8vIGZyb20gdGhlIG9ic2VydmVDaGFuZ2VzIGNhbGxiYWNrIGZyb20gYW4gb2JzZXJ2ZUNoYW5nZXMgY2FsbGVkIGluc2lkZSBhIHJlYWN0aXZlIGNvbnRleHQuXG4gICAgICAgIHJldHVybiBGaWJlci5jdXJyZW50Ll9wdWJsaXNoQ29tcHV0YXRpb247XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIHB1Ymxpc2guX2luc3RhbGxDYWxsYmFja3MgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBjb21wdXRhdGlvbjtcbiAgICAgIGNvbXB1dGF0aW9uID0gdGhpcy5fY3VycmVudENvbXB1dGF0aW9uKCk7XG4gICAgICBpZiAoIWNvbXB1dGF0aW9uKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICghY29tcHV0YXRpb24uX3B1Ymxpc2hPblN0b3BTZXQpIHtcbiAgICAgICAgY29tcHV0YXRpb24uX3B1Ymxpc2hPblN0b3BTZXQgPSB0cnVlO1xuICAgICAgICBjb21wdXRhdGlvbi5vblN0b3AoKCkgPT4ge1xuICAgICAgICAgIGRlbGV0ZSBvbGREb2N1bWVudHNbY29tcHV0YXRpb24uX2lkXTtcbiAgICAgICAgICByZXR1cm4gZGVsZXRlIGRvY3VtZW50c1tjb21wdXRhdGlvbi5faWRdO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmICghY29tcHV0YXRpb24uX3B1Ymxpc2hBZnRlclJ1blNldCkge1xuICAgICAgICBjb21wdXRhdGlvbi5fcHVibGlzaEFmdGVyUnVuU2V0ID0gdHJ1ZTtcbiAgICAgICAgY29tcHV0YXRpb24uYWZ0ZXJSdW4oKCkgPT4ge1xuICAgICAgICAgIC8vIFdlIHJlbW92ZSB0aG9zZSB3aGljaCBhcmUgbm90IHB1Ymxpc2hlZCBhbnltb3JlLlxuICAgICAgICAgIGl0ZXJhdGVPYmplY3RPck1hcEtleXModGhpcy5fZG9jdW1lbnRzLCAoY29sbGVjdGlvbk5hbWUpID0+IHtcbiAgICAgICAgICAgIHZhciBjb21wdXRhdGlvbklkLCBjdXJyZW50Q29tcHV0YXRpb25BZGRlZERvY3VtZW50SWRzLCBjdXJyZW50bHlQdWJsaXNoZWREb2N1bWVudElkcywgZG9jcywgaSwgaWQsIGxlbiwgb3RoZXJDb21wdXRhdGlvbnNBZGRlZERvY3VtZW50c0lkcywgb3RoZXJDb21wdXRhdGlvbnNQcmV2aW91c2x5QWRkZWREb2N1bWVudHNJZHMsIHJlZiwgcmVmMSwgcmVzdWx0cztcbiAgICAgICAgICAgIGlmICh0aGlzLl9kb2N1bWVudHMgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgICAgICAgY3VycmVudGx5UHVibGlzaGVkRG9jdW1lbnRJZHMgPSBBcnJheS5mcm9tKHRoaXMuX2RvY3VtZW50cy5nZXQoY29sbGVjdGlvbk5hbWUpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGN1cnJlbnRseVB1Ymxpc2hlZERvY3VtZW50SWRzID0gXy5rZXlzKHRoaXMuX2RvY3VtZW50c1tjb2xsZWN0aW9uTmFtZV0gfHwge30pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VycmVudENvbXB1dGF0aW9uQWRkZWREb2N1bWVudElkcyA9IF8ua2V5cygoKHJlZiA9IGRvY3VtZW50c1tjb21wdXRhdGlvbi5faWRdKSAhPSBudWxsID8gcmVmW2NvbGxlY3Rpb25OYW1lXSA6IHZvaWQgMCkgfHwge30pO1xuICAgICAgICAgICAgLy8gSWYgYWZ0ZXJSdW4gZm9yIG90aGVyIGF1dG9ydW5zIGluIHRoZSBwdWJsaXNoIGZ1bmN0aW9uIGhhdmUgbm90IHlldCBydW4sIHdlIGhhdmUgdG8gbG9vayBpbiBcImRvY3VtZW50c1wiIGFzIHdlbGwuXG4gICAgICAgICAgICBvdGhlckNvbXB1dGF0aW9uc0FkZGVkRG9jdW1lbnRzSWRzID0gXy51bmlvbiguLi4oKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB2YXIgcmVzdWx0cztcbiAgICAgICAgICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgICAgICAgICBmb3IgKGNvbXB1dGF0aW9uSWQgaW4gZG9jdW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgZG9jcyA9IGRvY3VtZW50c1tjb21wdXRhdGlvbklkXTtcbiAgICAgICAgICAgICAgICBpZiAoY29tcHV0YXRpb25JZCAhPT0gYCR7Y29tcHV0YXRpb24uX2lkfWApIHtcbiAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChfLmtleXMoZG9jc1tjb2xsZWN0aW9uTmFtZV0gfHwge30pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgICAgICB9KSgpKSk7XG4gICAgICAgICAgICAvLyBCdXQgYWZ0ZXIgYWZ0ZXJSdW4sIFwiZG9jdW1lbnRzXCIgaXMgZW1wdHkgdG8gYmUgcmVhZHkgZm9yIG5leHQgcmVydW4gb2YgdGhlIGNvbXB1dGF0aW9uLCBzbyB3ZSBsb29rIGludG8gXCJvbGREb2N1bWVudHNcIi5cbiAgICAgICAgICAgIG90aGVyQ29tcHV0YXRpb25zUHJldmlvdXNseUFkZGVkRG9jdW1lbnRzSWRzID0gXy51bmlvbiguLi4oKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB2YXIgcmVzdWx0cztcbiAgICAgICAgICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgICAgICAgICBmb3IgKGNvbXB1dGF0aW9uSWQgaW4gb2xkRG9jdW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgZG9jcyA9IG9sZERvY3VtZW50c1tjb21wdXRhdGlvbklkXTtcbiAgICAgICAgICAgICAgICBpZiAoY29tcHV0YXRpb25JZCAhPT0gYCR7Y29tcHV0YXRpb24uX2lkfWApIHtcbiAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChfLmtleXMoZG9jc1tjb2xsZWN0aW9uTmFtZV0gfHwge30pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgICAgICB9KSgpKSk7XG4gICAgICAgICAgICByZWYxID0gXy5kaWZmZXJlbmNlKGN1cnJlbnRseVB1Ymxpc2hlZERvY3VtZW50SWRzLCBjdXJyZW50Q29tcHV0YXRpb25BZGRlZERvY3VtZW50SWRzLCBvdGhlckNvbXB1dGF0aW9uc0FkZGVkRG9jdW1lbnRzSWRzLCBvdGhlckNvbXB1dGF0aW9uc1ByZXZpb3VzbHlBZGRlZERvY3VtZW50c0lkcyk7XG4gICAgICAgICAgICAvLyBXZSBpZ25vcmUgSURzIGZvdW5kIGluIGJvdGggb3RoZXJDb21wdXRhdGlvbnNBZGRlZERvY3VtZW50c0lkcyBhbmQgb3RoZXJDb21wdXRhdGlvbnNQcmV2aW91c2x5QWRkZWREb2N1bWVudHNJZHNcbiAgICAgICAgICAgIC8vIHdoaWNoIG1pZ2h0IGlnbm9yZSBtb3JlIElEcyB0aGVuIG5lY2Vzc2FyeSAoYW4gSUQgbWlnaHQgYmUgcHJldmlvdXNseSBhZGRlZCB3aGljaCBoYXMgbm90IGJlZW4gYWRkZWQgaW4gdGhpc1xuICAgICAgICAgICAgLy8gaXRlcmF0aW9uKSBidXQgdGhpcyBpcyBPSyBiZWNhdXNlIGluIGFmdGVyUnVuIG9mIG90aGVyIGNvbXB1dGF0aW9ucyB0aGlzIHdpbGwgYmUgY29ycmVjdGVkIGFuZCBkb2N1bWVudHNcbiAgICAgICAgICAgIC8vIHdpdGggdGhvc2UgSURzIHJlbW92ZWQuXG4gICAgICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYxLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgIGlkID0gcmVmMVtpXTtcbiAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHRoaXMucmVtb3ZlZChjb2xsZWN0aW9uTmFtZSwgdGhpcy5faWRGaWx0ZXIuaWRQYXJzZShpZCkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGNvbXB1dGF0aW9uLmJlZm9yZVJ1bigoKSA9PiB7XG4gICAgICAgICAgICBvbGREb2N1bWVudHNbY29tcHV0YXRpb24uX2lkXSA9IGRvY3VtZW50c1tjb21wdXRhdGlvbi5faWRdIHx8IHt9O1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50c1tjb21wdXRhdGlvbi5faWRdID0ge307XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIGNvbXB1dGF0aW9uLl9wdWJsaXNoQWZ0ZXJSdW5TZXQgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbXB1dGF0aW9uLl90cmFja2VySW5zdGFuY2UucmVxdWlyZUZsdXNoKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBvcmlnaW5hbEFkZGVkID0gcHVibGlzaC5hZGRlZDtcbiAgICBwdWJsaXNoLmFkZGVkID0gZnVuY3Rpb24oY29sbGVjdGlvbk5hbWUsIGlkLCBmaWVsZHMpIHtcbiAgICAgIHZhciBfZG9jdW1lbnRzLCBjdXJyZW50Q29tcHV0YXRpb24sIGRhdGFCeUtleSwgb2xkRmllbGRzLCByZWYsIHJlZjEsIHJlZjIsIHJlZjMsIHJlZjQsIHJlZjUsIHN0cmluZ0lkO1xuICAgICAgc3RyaW5nSWQgPSB0aGlzLl9pZEZpbHRlci5pZFN0cmluZ2lmeShpZCk7XG4gICAgICB0aGlzLl9pbnN0YWxsQ2FsbGJhY2tzKCk7XG4gICAgICBjdXJyZW50Q29tcHV0YXRpb24gPSB0aGlzLl9jdXJyZW50Q29tcHV0YXRpb24oKTtcbiAgICAgIGlmIChjdXJyZW50Q29tcHV0YXRpb24pIHtcbiAgICAgICAgTWV0ZW9yLl9lbnN1cmUoZG9jdW1lbnRzLCBjdXJyZW50Q29tcHV0YXRpb24uX2lkLCBjb2xsZWN0aW9uTmFtZSlbc3RyaW5nSWRdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8vIElmIGRvY3VtZW50IGFzIGFscmVhZHkgcHJlc2VudCBpbiBwdWJsaXNoIHRoZW4gd2UgY2FsbCBjaGFuZ2VkIHRvIHNlbmQgdXBkYXRlZCBmaWVsZHMgKE1ldGVvciBzZW5kcyBvbmx5IGEgZGlmZikuXG4gICAgICAvLyBUaGlzIGNhbiBoaWRlIHNvbWUgZXJyb3JzIGluIHB1Ymxpc2ggZnVuY3Rpb25zIGlmIHRoZXkgb25lIGNhbGxzIFwiYWRkZWRcIiBvbiBhbiBleGlzdGluZyBkb2N1bWVudCBhbmQgd2UgY291bGRcbiAgICAgIC8vIG1ha2UgaXQgc28gdGhhdCB0aGlzIGJlaGF2aW9yIHdvcmtzIG9ubHkgaW5zaWRlIHJlYWN0aXZlIGNvbXB1dGF0aW9uIChpZiBcImN1cnJlbnRDb21wdXRhdGlvblwiIGlzIHNldCksIGJ1dCB3ZVxuICAgICAgLy8gY2FuIGFsc28gbWFrZSBpdCBzbyB0aGF0IHB1Ymxpc2ggZnVuY3Rpb24gdHJpZXMgdG8gZG8gc29tZXRoaW5nIHNtYXJ0ZXIgKHNlbmRpbmcgYSBkaWZmKSBpbiBhbGwgY2FzZXMsIGFzIHdlIGRvLlxuICAgICAgaWYgKCh0aGlzLl9kb2N1bWVudHMgaW5zdGFuY2VvZiBNYXAgJiYgKChyZWYgPSB0aGlzLl9kb2N1bWVudHMuZ2V0KGNvbGxlY3Rpb25OYW1lKSkgIT0gbnVsbCA/IHJlZi5oYXMoc3RyaW5nSWQpIDogdm9pZCAwKSkgfHwgKChyZWYxID0gdGhpcy5fZG9jdW1lbnRzW2NvbGxlY3Rpb25OYW1lXSkgIT0gbnVsbCA/IHJlZjFbc3RyaW5nSWRdIDogdm9pZCAwKSkge1xuICAgICAgICBvbGRGaWVsZHMgPSB7fTtcbiAgICAgICAgLy8gSWYgc29tZSBmaWVsZCBleGlzdGVkIGJlZm9yZSwgYnV0IGRvZXMgbm90IGV4aXN0IGFueW1vcmUsIHdlIGhhdmUgdG8gcmVtb3ZlIGl0IGJ5IGNhbGxpbmcgXCJjaGFuZ2VkXCJcbiAgICAgICAgLy8gd2l0aCB2YWx1ZSBzZXQgdG8gXCJ1bmRlZmluZWRcIi4gU28gd2UgbG9vayBpbnRvIGN1cnJlbnQgc2Vzc2lvbidzIHN0YXRlIGFuZCBzZWUgd2hpY2ggZmllbGRzIGFyZSBjdXJyZW50bHlcbiAgICAgICAgLy8ga25vd24gYW5kIGNyZWF0ZSBhbiBvYmplY3Qgb2Ygc2FtZSBmaWVsZHMsIGp1c3QgYWxsIHZhbHVlcyBzZXQgdG8gXCJ1bmRlZmluZWRcIi4gV2UgdGhlbiBvdmVycmlkZSBzb21lIGZpZWxkc1xuICAgICAgICAvLyB3aXRoIG5ldyB2YWx1ZXMuIE9ubHkgdG9wLWxldmVsIGZpZWxkcyBtYXR0ZXIuXG4gICAgICAgIF9kb2N1bWVudHMgPSAoKHJlZjIgPSB0aGlzLl9zZXNzaW9uKSAhPSBudWxsID8gKHJlZjMgPSByZWYyLmdldENvbGxlY3Rpb25WaWV3KGNvbGxlY3Rpb25OYW1lKSkgIT0gbnVsbCA/IHJlZjMuZG9jdW1lbnRzIDogdm9pZCAwIDogdm9pZCAwKSB8fCB7fTtcbiAgICAgICAgaWYgKF9kb2N1bWVudHMgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgICBkYXRhQnlLZXkgPSAoKHJlZjQgPSBfZG9jdW1lbnRzLmdldChzdHJpbmdJZCkpICE9IG51bGwgPyByZWY0LmRhdGFCeUtleSA6IHZvaWQgMCkgfHwge307XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGF0YUJ5S2V5ID0gKF9kb2N1bWVudHMgIT0gbnVsbCA/IChyZWY1ID0gX2RvY3VtZW50c1tzdHJpbmdJZF0pICE9IG51bGwgPyByZWY1LmRhdGFCeUtleSA6IHZvaWQgMCA6IHZvaWQgMCkgfHwge307XG4gICAgICAgIH1cbiAgICAgICAgaXRlcmF0ZU9iamVjdE9yTWFwS2V5cyhkYXRhQnlLZXksIChmaWVsZCkgPT4ge1xuICAgICAgICAgIHJldHVybiBvbGRGaWVsZHNbZmllbGRdID0gdm9pZCAwO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlZChjb2xsZWN0aW9uTmFtZSwgaWQsIF8uZXh0ZW5kKG9sZEZpZWxkcywgZmllbGRzKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gb3JpZ2luYWxBZGRlZC5jYWxsKHRoaXMsIGNvbGxlY3Rpb25OYW1lLCBpZCwgZmllbGRzKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJlYWR5ID0gZmFsc2U7XG4gICAgb3JpZ2luYWxSZWFkeSA9IHB1Ymxpc2gucmVhZHk7XG4gICAgcHVibGlzaC5yZWFkeSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5faW5zdGFsbENhbGxiYWNrcygpO1xuICAgICAgaWYgKCFyZWFkeSkge1xuICAgICAgICAvLyBNYXJrIGl0IGFzIHJlYWR5IG9ubHkgdGhlIGZpcnN0IHRpbWUuXG4gICAgICAgIG9yaWdpbmFsUmVhZHkuY2FsbCh0aGlzKTtcbiAgICAgIH1cbiAgICAgIHJlYWR5ID0gdHJ1ZTtcbiAgICB9O1xuICAgIC8vIFRvIHJldHVybiBub3RoaW5nLlxuICAgIGhhbmRsZXMgPSBbXTtcbiAgICAvLyBUaGlzIGF1dG9ydW4gaXMgbm90aGluZyBzcGVjaWFsLCBqdXN0IHRoYXQgaXQgbWFrZXMgc3VyZSBoYW5kbGVzIGFyZSBzdG9wcGVkIHdoZW4gcHVibGlzaCBzdG9wcyxcbiAgICAvLyBhbmQgdGhhdCB5b3UgY2FuIHJldHVybiBjdXJzb3JzIGZyb20gdGhlIGZ1bmN0aW9uIHdoaWNoIHdvdWxkIGJlIGF1dG9tYXRpY2FsbHkgcHVibGlzaGVkLlxuICAgIHB1Ymxpc2guYXV0b3J1biA9IGZ1bmN0aW9uKHJ1bkZ1bmMpIHtcbiAgICAgIHZhciBoYW5kbGU7XG4gICAgICBoYW5kbGUgPSBUcmFja2VyLmF1dG9ydW4oZnVuY3Rpb24oY29tcHV0YXRpb24pIHtcbiAgICAgICAgdmFyIGNvbGxlY3Rpb25OYW1lcywgZXJyb3IsIHJlc3VsdDtcbiAgICAgICAgY29tcHV0YXRpb24ub25JbnZhbGlkYXRlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBkZWxldGUgYWxsQ29sbGVjdGlvbk5hbWVzW2NvbXB1dGF0aW9uLl9pZF07XG4gICAgICAgIH0pO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlc3VsdCA9IHJ1bkZ1bmMuY2FsbChwdWJsaXNoLCBjb21wdXRhdGlvbik7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yMSkge1xuICAgICAgICAgIGVycm9yID0gZXJyb3IxO1xuICAgICAgICAgIGNvbXB1dGF0aW9uLnN0b3AoKTtcbiAgICAgICAgICBpZiAoY29tcHV0YXRpb24uZmlyc3RSdW4pIHtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwdWJsaXNoLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29sbGVjdGlvbk5hbWVzID0gZ2V0Q29sbGVjdGlvbk5hbWVzKHJlc3VsdCk7XG4gICAgICAgIGFsbENvbGxlY3Rpb25OYW1lc1tjb21wdXRhdGlvbi5faWRdID0gY29sbGVjdGlvbk5hbWVzO1xuICAgICAgICBpZiAoIWNoZWNrTmFtZXMocHVibGlzaCwgYWxsQ29sbGVjdGlvbk5hbWVzLCBgJHtjb21wdXRhdGlvbi5faWR9YCwgY29sbGVjdGlvbk5hbWVzKSkge1xuICAgICAgICAgIGNvbXB1dGF0aW9uLnN0b3AoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gU3BlY2lhbGx5IGhhbmRsZSBpZiBjb21wdXRhdGlvbiBoYXMgYmVlbiByZXR1cm5lZC5cbiAgICAgICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFRyYWNrZXIuQ29tcHV0YXRpb24pIHtcbiAgICAgICAgICBpZiAocHVibGlzaC5faXNEZWFjdGl2YXRlZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LnN0b3AoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGhhbmRsZXMucHVzaChyZXN1bHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIXB1Ymxpc2guX2lzRGVhY3RpdmF0ZWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHB1Ymxpc2guX3B1Ymxpc2hIYW5kbGVyUmVzdWx0KHJlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChwdWJsaXNoLl9pc0RlYWN0aXZhdGVkKCkpIHtcbiAgICAgICAgaGFuZGxlLnN0b3AoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhhbmRsZXMucHVzaChoYW5kbGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGhhbmRsZTtcbiAgICB9O1xuICAgIHB1Ymxpc2gub25TdG9wKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGhhbmRsZSwgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIHdoaWxlIChoYW5kbGVzLmxlbmd0aCkge1xuICAgICAgICBoYW5kbGUgPSBoYW5kbGVzLnNoaWZ0KCk7XG4gICAgICAgIHJlc3VsdHMucHVzaChoYW5kbGUgIT0gbnVsbCA/IGhhbmRsZS5zdG9wKCkgOiB2b2lkIDApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSk7XG4gICAgcmVzdWx0ID0gcHVibGlzaEZ1bmN0aW9uLmFwcGx5KHB1Ymxpc2gsIGFyZ3MpO1xuICAgIGNvbGxlY3Rpb25OYW1lcyA9IGdldENvbGxlY3Rpb25OYW1lcyhyZXN1bHQpO1xuICAgIGFsbENvbGxlY3Rpb25OYW1lc1snJ10gPSBjb2xsZWN0aW9uTmFtZXM7XG4gICAgaWYgKCFjaGVja05hbWVzKHB1Ymxpc2gsIGFsbENvbGxlY3Rpb25OYW1lcywgJycsIGNvbGxlY3Rpb25OYW1lcykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gU3BlY2lhbGx5IGhhbmRsZSBpZiBjb21wdXRhdGlvbiBoYXMgYmVlbiByZXR1cm5lZC5cbiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgVHJhY2tlci5Db21wdXRhdGlvbikge1xuICAgICAgaWYgKHB1Ymxpc2guX2lzRGVhY3RpdmF0ZWQoKSkge1xuICAgICAgICByZXN1bHQuc3RvcCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGFuZGxlcy5wdXNoKHJlc3VsdCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIERvIG5vdCByZXR1cm4gYW55dGhpbmcuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIFtuYW1lLCBuZXdQdWJsaXNoRnVuY3Rpb24sIG9wdGlvbnNdO1xufSk7XG4iXX0=
