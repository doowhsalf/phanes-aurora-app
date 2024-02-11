(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var check = Package.check.check;
var Match = Package.check.Match;
var ECMAScript = Package.ecmascript.ECMAScript;
var meteorInstall = Package.modules.meteorInstall;
var Log = Package.logging.Log;
var DDP = Package['ddp-client'].DDP;
var DDPServer = Package['ddp-server'].DDPServer;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var enableDebugLogging, publishComposite;

var require = meteorInstall({"node_modules":{"meteor":{"reywood:publish-composite":{"lib":{"publish_composite.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/reywood_publish-composite/lib/publish_composite.js                                              //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
module.export({
  enableDebugLogging: () => enableDebugLogging,
  publishComposite: () => publishComposite
});
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }
}, 0);
let Publication;
module.link("./publication", {
  default(v) {
    Publication = v;
  }
}, 1);
let Subscription;
module.link("./subscription", {
  default(v) {
    Subscription = v;
  }
}, 2);
let debugLog, enableDebugLogging;
module.link("./logging", {
  debugLog(v) {
    debugLog = v;
  },
  enableDebugLogging(v) {
    enableDebugLogging = v;
  }
}, 3);
function publishComposite(name, options) {
  return Meteor.publish(name, function publish() {
    return Promise.asyncApply(() => {
      const subscription = new Subscription(this);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      const instanceOptions = Promise.await(prepareOptions.call(this, options, args));
      const publications = [];
      for (const opt of instanceOptions) {
        const pub = new Publication(subscription, opt);
        Promise.await(pub.publish());
        publications.push(pub);
      }
      this.onStop(() => {
        publications.forEach(pub => pub.unpublish());
      });

      // wait for all publications to finish processing initial added callbacks
      Promise.await(Promise.all(publications.flatMap(pub => pub.addedPromises)));
      debugLog('Meteor.publish', 'ready');
      this.ready();
    });
  });
}

// For backwards compatibility
Meteor.publishComposite = publishComposite;
function prepareOptions(options, args) {
  return Promise.asyncApply(() => {
    let preparedOptions = options;
    if (typeof preparedOptions === 'function') {
      preparedOptions = Promise.await(preparedOptions.apply(this, args));
    }
    if (!preparedOptions) {
      return [];
    }
    if (!Array.isArray(preparedOptions)) {
      preparedOptions = [preparedOptions];
    }
    return preparedOptions;
  });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"doc_ref_counter.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/reywood_publish-composite/lib/doc_ref_counter.js                                                //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
class DocumentRefCounter {
  constructor(observer) {
    this.heap = {};
    this.observer = observer;
  }
  increment(collectionName, docId) {
    const key = "".concat(collectionName, ":").concat(docId.valueOf());
    if (!this.heap[key]) {
      this.heap[key] = 0;
    }
    this.heap[key] += 1;
  }
  decrement(collectionName, docId) {
    const key = "".concat(collectionName, ":").concat(docId.valueOf());
    if (this.heap[key]) {
      this.heap[key] -= 1;
      this.observer.onChange(collectionName, docId, this.heap[key]);
    }
  }
}
module.exportDefault(DocumentRefCounter);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"logging.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/reywood_publish-composite/lib/logging.js                                                        //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
module.export({
  debugLog: () => debugLog,
  enableDebugLogging: () => enableDebugLogging
});
/* eslint-disable no-console */

let debugLoggingEnabled = false;
function debugLog(source, message) {
  if (!debugLoggingEnabled) {
    return;
  }
  let paddedSource = source;
  while (paddedSource.length < 35) {
    paddedSource += ' ';
  }
  console.log("[".concat(paddedSource, "] ").concat(message));
}
function enableDebugLogging() {
  debugLoggingEnabled = true;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"publication.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/reywood_publish-composite/lib/publication.js                                                    //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
let _objectSpread;
module.link("@babel/runtime/helpers/objectSpread2", {
  default(v) {
    _objectSpread = v;
  }
}, 0);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }
}, 0);
let Match, check;
module.link("meteor/check", {
  Match(v) {
    Match = v;
  },
  check(v) {
    check = v;
  }
}, 1);
let debugLog;
module.link("./logging", {
  debugLog(v) {
    debugLog = v;
  }
}, 2);
let PublishedDocumentList;
module.link("./published_document_list", {
  default(v) {
    PublishedDocumentList = v;
  }
}, 3);
class Publication {
  constructor(subscription, options, args) {
    check(options, {
      find: Function,
      children: Match.Optional(Match.OneOf([Object], Function)),
      collectionName: Match.Optional(String)
    });
    this.subscription = subscription;
    this.options = options;
    this.args = args || [];
    this.childrenOptions = options.children || [];
    this.publishedDocs = new PublishedDocumentList();
    this.collectionName = options.collectionName;
    // property to store promises for added callbacks
    this.addedPromises = [];
  }
  publish() {
    return Promise.asyncApply(() => {
      this.cursor = Promise.await(this._getCursor());
      if (!this.cursor) {
        return;
      }
      const collectionName = this._getCollectionName();

      // Use Meteor.bindEnvironment to make sure the callbacks are run with the same
      // environmentVariables as when publishing the "parent".
      // It's only needed when publish is being recursively run.
      this.observeHandle = this.cursor.observe({
        added: Meteor.bindEnvironment(doc => Promise.asyncApply(() => {
          const addedPromise = new Promise((resolve, reject) => {
            // call the async function to handle the 'added' logic
            this._handleAddedAsync(doc, collectionName).then(resolve) // resolve the promise at the end of the 'added' callback
            .catch(reject);
          });

          // store the promise
          this.addedPromises.push(addedPromise);
        })),
        changed: Meteor.bindEnvironment((newDoc, oldDoc) => {
          debugLog('Publication.observeHandle.changed', "".concat(collectionName, ":").concat(newDoc._id));
          this._republishChildrenOf(newDoc);
          this.subscription.changed(collectionName, newDoc._id, [...new Set([...Object.keys(newDoc), ...Object.keys(oldDoc)])].filter(key => newDoc[key] !== oldDoc[key]).reduce((changes, key) => _objectSpread(_objectSpread({}, changes), {}, {
            [key]: newDoc[key]
          }), {}));
        }),
        removed: doc => {
          debugLog('Publication.observeHandle.removed', "".concat(collectionName, ":").concat(doc._id));
          this._removeDoc(collectionName, doc._id);
        }
      });
    });
  }
  unpublish() {
    debugLog('Publication.unpublish', this._getCollectionName());
    this._stopObservingCursor();
    this._unpublishAllDocuments();
  }
  _handleAddedAsync(doc, collectionName) {
    return Promise.asyncApply(() => {
      const alreadyPublished = this.publishedDocs.has(doc._id);
      if (alreadyPublished) {
        debugLog('Publication.observeHandle.added', "".concat(collectionName, ":").concat(doc._id, " already published"));
        this.publishedDocs.unflagForRemoval(doc._id);
        this._republishChildrenOf(doc);
        this.subscription.changed(collectionName, doc._id, doc);
      } else {
        this.publishedDocs.add(collectionName, doc._id);
        Promise.await(this._publishChildrenOf(doc));
        this.subscription.added(collectionName, doc);
      }
    });
  }
  _republish() {
    return Promise.asyncApply(() => {
      this._stopObservingCursor();
      this.publishedDocs.flagAllForRemoval();
      debugLog('Publication._republish', 'run .publish again');
      Promise.await(this.publish());
      debugLog('Publication._republish', 'unpublish docs from old cursor');
      this._removeFlaggedDocs();
    });
  }
  _getCursor() {
    return Promise.asyncApply(() => {
      return Promise.await(this.options.find.apply(this.subscription.meteorSub, this.args));
    });
  }
  _getCollectionName() {
    return this.collectionName || this.cursor && this.cursor._getCollectionName();
  }
  _publishChildrenOf(doc) {
    return Promise.asyncApply(() => {
      const children = typeof this.childrenOptions === 'function' ? this.childrenOptions(doc, ...this.args) : this.childrenOptions;
      Promise.await(Promise.all(children.map(options => Promise.asyncApply(() => {
        const pub = new Publication(this.subscription, options, [doc].concat(this.args));
        this.publishedDocs.addChildPub(doc._id, pub);
        Promise.await(pub.publish());
      }))));
    });
  }
  _republishChildrenOf(doc) {
    const parentArgs = this.args;
    let newArgs;
    this.publishedDocs.eachChildPub(doc._id, publication => Promise.asyncApply(() => {
      // Check if parent's args are the same length as this publication
      // Intuitively this should not ever be the case! However it does happen sometimes.
      // When it does the first argument of the parent publication is the doc.
      // So we skip this to avoid creating a duplicate of the first argument.
      if (parentArgs.length === publication.args.length) {
        newArgs = parentArgs.slice(1);
      } else {
        newArgs = parentArgs;
      }

      // First argument is the new document
      // Subsequent args are passed down from parent.
      // These may have been updated by a grandparent publication.
      publication.args = [doc, ...newArgs];
      Promise.await(publication._republish());
    }));
  }
  _unpublishAllDocuments() {
    this.publishedDocs.eachDocument(doc => {
      this._removeDoc(doc.collectionName, doc.docId);
    }, this);
  }
  _stopObservingCursor() {
    debugLog('Publication._stopObservingCursor', 'stop observing cursor');
    if (this.observeHandle) {
      this.observeHandle.stop();
      delete this.observeHandle;
    }
  }
  _removeFlaggedDocs() {
    this.publishedDocs.eachDocument(doc => {
      if (doc.isFlaggedForRemoval()) {
        this._removeDoc(doc.collectionName, doc.docId);
      }
    }, this);
  }
  _removeDoc(collectionName, docId) {
    this.subscription.removed(collectionName, docId);
    this._unpublishChildrenOf(docId);
    this.publishedDocs.remove(docId);
  }
  _unpublishChildrenOf(docId) {
    debugLog('Publication._unpublishChildrenOf', "unpublishing children of ".concat(this._getCollectionName(), ":").concat(docId));
    this.publishedDocs.eachChildPub(docId, publication => {
      publication.unpublish();
    });
  }
}
module.exportDefault(Publication);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"subscription.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/reywood_publish-composite/lib/subscription.js                                                   //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
let DocumentRefCounter;
module.link("./doc_ref_counter", {
  default(v) {
    DocumentRefCounter = v;
  }
}, 0);
let debugLog;
module.link("./logging", {
  debugLog(v) {
    debugLog = v;
  }
}, 1);
// eslint-disable-next-line
const isEqual = Npm.require('lodash.isequal');
class Subscription {
  constructor(meteorSub) {
    this.meteorSub = meteorSub;
    this.docHash = {};
    this.refCounter = new DocumentRefCounter({
      onChange: (collectionName, docId, refCount) => {
        debugLog('Subscription.refCounter.onChange', "".concat(collectionName, ":").concat(docId.valueOf(), " ").concat(refCount));
        if (refCount <= 0) {
          meteorSub.removed(collectionName, docId);
          this._removeDocHash(collectionName, docId);
        }
      }
    });
  }
  added(collectionName, doc) {
    this.refCounter.increment(collectionName, doc._id);
    if (this._hasDocChanged(collectionName, doc._id, doc)) {
      debugLog('Subscription.added', "".concat(collectionName, ":").concat(doc._id));
      this.meteorSub.added(collectionName, doc._id, doc);
      this._addDocHash(collectionName, doc);
    }
  }
  changed(collectionName, id, changes) {
    if (this._shouldSendChanges(collectionName, id, changes)) {
      debugLog('Subscription.changed', "".concat(collectionName, ":").concat(id));
      this.meteorSub.changed(collectionName, id, changes);
      this._updateDocHash(collectionName, id, changes);
    }
  }
  removed(collectionName, id) {
    debugLog('Subscription.removed', "".concat(collectionName, ":").concat(id.valueOf()));
    this.refCounter.decrement(collectionName, id);
  }
  _addDocHash(collectionName, doc) {
    this.docHash[buildHashKey(collectionName, doc._id)] = doc;
  }
  _updateDocHash(collectionName, id, changes) {
    const key = buildHashKey(collectionName, id);
    const existingDoc = this.docHash[key] || {};
    this.docHash[key] = Object.assign(existingDoc, changes);
  }
  _shouldSendChanges(collectionName, id, changes) {
    return this._isDocPublished(collectionName, id) && this._hasDocChanged(collectionName, id, changes);
  }
  _isDocPublished(collectionName, id) {
    const key = buildHashKey(collectionName, id);
    return !!this.docHash[key];
  }
  _hasDocChanged(collectionName, id, doc) {
    const existingDoc = this.docHash[buildHashKey(collectionName, id)];
    if (!existingDoc) {
      return true;
    }
    return Object.keys(doc).some(key => !isEqual(doc[key], existingDoc[key]));
  }
  _removeDocHash(collectionName, id) {
    const key = buildHashKey(collectionName, id);
    delete this.docHash[key];
  }
}
function buildHashKey(collectionName, id) {
  return "".concat(collectionName, "::").concat(id.valueOf());
}
module.exportDefault(Subscription);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"published_document.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/reywood_publish-composite/lib/published_document.js                                             //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
class PublishedDocument {
  constructor(collectionName, docId) {
    this.collectionName = collectionName;
    this.docId = docId;
    this.childPublications = [];
    this._isFlaggedForRemoval = false;
  }
  addChildPub(childPublication) {
    this.childPublications.push(childPublication);
  }
  eachChildPub(callback) {
    for (const child of this.childPublications) {
      callback(child);
    }
  }
  isFlaggedForRemoval() {
    return this._isFlaggedForRemoval;
  }
  unflagForRemoval() {
    this._isFlaggedForRemoval = false;
  }
  flagForRemoval() {
    this._isFlaggedForRemoval = true;
  }
}
module.exportDefault(PublishedDocument);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"published_document_list.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/reywood_publish-composite/lib/published_document_list.js                                        //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
let PublishedDocument;
module.link("./published_document", {
  default(v) {
    PublishedDocument = v;
  }
}, 0);
class PublishedDocumentList {
  constructor() {
    this.documents = {};
  }
  add(collectionName, docId) {
    const key = valueOfId(docId);
    if (!this.documents[key]) {
      this.documents[key] = new PublishedDocument(collectionName, docId);
    }
  }
  addChildPub(docId, publication) {
    if (!publication) {
      return;
    }
    const key = valueOfId(docId);
    const doc = this.documents[key];
    if (typeof doc === 'undefined') {
      throw new Error("Doc not found in list: ".concat(key));
    }
    this.documents[key].addChildPub(publication);
  }
  get(docId) {
    const key = valueOfId(docId);
    return this.documents[key];
  }
  remove(docId) {
    const key = valueOfId(docId);
    delete this.documents[key];
  }
  has(docId) {
    return !!this.get(docId);
  }
  eachDocument(callback, context) {
    Object.values(this.documents).forEach(function execCallbackOnDoc(doc) {
      callback.call(this, doc);
    }, context || this);
  }
  eachChildPub(docId, callback) {
    const doc = this.get(docId);
    if (doc) {
      doc.eachChildPub(callback);
    }
  }
  getIds() {
    const docIds = [];
    this.eachDocument(doc => {
      docIds.push(doc.docId);
    });
    return docIds;
  }
  unflagForRemoval(docId) {
    const doc = this.get(docId);
    if (doc) {
      doc.unflagForRemoval();
    }
  }
  flagAllForRemoval() {
    this.eachDocument(doc => {
      doc.flagForRemoval();
    });
  }
}
function valueOfId(docId) {
  if (docId === null) {
    throw new Error('Document ID is null');
  }
  if (typeof docId === 'undefined') {
    throw new Error('Document ID is undefined');
  }
  return docId.valueOf();
}
module.exportDefault(PublishedDocumentList);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".d.ts"
  ]
});

var exports = require("/node_modules/meteor/reywood:publish-composite/lib/publish_composite.js");
require("/node_modules/meteor/reywood:publish-composite/lib/doc_ref_counter.js");
require("/node_modules/meteor/reywood:publish-composite/lib/logging.js");
require("/node_modules/meteor/reywood:publish-composite/lib/publication.js");
require("/node_modules/meteor/reywood:publish-composite/lib/subscription.js");

/* Exports */
Package._define("reywood:publish-composite", exports, {
  enableDebugLogging: enableDebugLogging,
  publishComposite: publishComposite
});

})();

//# sourceURL=meteor://💻app/packages/reywood_publish-composite.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvcmV5d29vZDpwdWJsaXNoLWNvbXBvc2l0ZS9saWIvcHVibGlzaF9jb21wb3NpdGUuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL3JleXdvb2Q6cHVibGlzaC1jb21wb3NpdGUvbGliL2RvY19yZWZfY291bnRlci5qcyIsIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvcmV5d29vZDpwdWJsaXNoLWNvbXBvc2l0ZS9saWIvbG9nZ2luZy5qcyIsIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvcmV5d29vZDpwdWJsaXNoLWNvbXBvc2l0ZS9saWIvcHVibGljYXRpb24uanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL3JleXdvb2Q6cHVibGlzaC1jb21wb3NpdGUvbGliL3N1YnNjcmlwdGlvbi5qcyIsIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvcmV5d29vZDpwdWJsaXNoLWNvbXBvc2l0ZS9saWIvcHVibGlzaGVkX2RvY3VtZW50LmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9yZXl3b29kOnB1Ymxpc2gtY29tcG9zaXRlL2xpYi9wdWJsaXNoZWRfZG9jdW1lbnRfbGlzdC5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnQiLCJlbmFibGVEZWJ1Z0xvZ2dpbmciLCJwdWJsaXNoQ29tcG9zaXRlIiwiTWV0ZW9yIiwibGluayIsInYiLCJQdWJsaWNhdGlvbiIsImRlZmF1bHQiLCJTdWJzY3JpcHRpb24iLCJkZWJ1Z0xvZyIsIm5hbWUiLCJvcHRpb25zIiwicHVibGlzaCIsIlByb21pc2UiLCJhc3luY0FwcGx5Iiwic3Vic2NyaXB0aW9uIiwiX2xlbiIsImFyZ3VtZW50cyIsImxlbmd0aCIsImFyZ3MiLCJBcnJheSIsIl9rZXkiLCJpbnN0YW5jZU9wdGlvbnMiLCJhd2FpdCIsInByZXBhcmVPcHRpb25zIiwiY2FsbCIsInB1YmxpY2F0aW9ucyIsIm9wdCIsInB1YiIsInB1c2giLCJvblN0b3AiLCJmb3JFYWNoIiwidW5wdWJsaXNoIiwiYWxsIiwiZmxhdE1hcCIsImFkZGVkUHJvbWlzZXMiLCJyZWFkeSIsInByZXBhcmVkT3B0aW9ucyIsImFwcGx5IiwiaXNBcnJheSIsIkRvY3VtZW50UmVmQ291bnRlciIsImNvbnN0cnVjdG9yIiwib2JzZXJ2ZXIiLCJoZWFwIiwiaW5jcmVtZW50IiwiY29sbGVjdGlvbk5hbWUiLCJkb2NJZCIsImtleSIsImNvbmNhdCIsInZhbHVlT2YiLCJkZWNyZW1lbnQiLCJvbkNoYW5nZSIsImV4cG9ydERlZmF1bHQiLCJkZWJ1Z0xvZ2dpbmdFbmFibGVkIiwic291cmNlIiwibWVzc2FnZSIsInBhZGRlZFNvdXJjZSIsImNvbnNvbGUiLCJsb2ciLCJfb2JqZWN0U3ByZWFkIiwiTWF0Y2giLCJjaGVjayIsIlB1Ymxpc2hlZERvY3VtZW50TGlzdCIsImZpbmQiLCJGdW5jdGlvbiIsImNoaWxkcmVuIiwiT3B0aW9uYWwiLCJPbmVPZiIsIk9iamVjdCIsIlN0cmluZyIsImNoaWxkcmVuT3B0aW9ucyIsInB1Ymxpc2hlZERvY3MiLCJjdXJzb3IiLCJfZ2V0Q3Vyc29yIiwiX2dldENvbGxlY3Rpb25OYW1lIiwib2JzZXJ2ZUhhbmRsZSIsIm9ic2VydmUiLCJhZGRlZCIsImJpbmRFbnZpcm9ubWVudCIsImRvYyIsImFkZGVkUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJfaGFuZGxlQWRkZWRBc3luYyIsInRoZW4iLCJjYXRjaCIsImNoYW5nZWQiLCJuZXdEb2MiLCJvbGREb2MiLCJfaWQiLCJfcmVwdWJsaXNoQ2hpbGRyZW5PZiIsIlNldCIsImtleXMiLCJmaWx0ZXIiLCJyZWR1Y2UiLCJjaGFuZ2VzIiwicmVtb3ZlZCIsIl9yZW1vdmVEb2MiLCJfc3RvcE9ic2VydmluZ0N1cnNvciIsIl91bnB1Ymxpc2hBbGxEb2N1bWVudHMiLCJhbHJlYWR5UHVibGlzaGVkIiwiaGFzIiwidW5mbGFnRm9yUmVtb3ZhbCIsImFkZCIsIl9wdWJsaXNoQ2hpbGRyZW5PZiIsIl9yZXB1Ymxpc2giLCJmbGFnQWxsRm9yUmVtb3ZhbCIsIl9yZW1vdmVGbGFnZ2VkRG9jcyIsIm1ldGVvclN1YiIsIm1hcCIsImFkZENoaWxkUHViIiwicGFyZW50QXJncyIsIm5ld0FyZ3MiLCJlYWNoQ2hpbGRQdWIiLCJwdWJsaWNhdGlvbiIsInNsaWNlIiwiZWFjaERvY3VtZW50Iiwic3RvcCIsImlzRmxhZ2dlZEZvclJlbW92YWwiLCJfdW5wdWJsaXNoQ2hpbGRyZW5PZiIsInJlbW92ZSIsImlzRXF1YWwiLCJOcG0iLCJyZXF1aXJlIiwiZG9jSGFzaCIsInJlZkNvdW50ZXIiLCJyZWZDb3VudCIsIl9yZW1vdmVEb2NIYXNoIiwiX2hhc0RvY0NoYW5nZWQiLCJfYWRkRG9jSGFzaCIsImlkIiwiX3Nob3VsZFNlbmRDaGFuZ2VzIiwiX3VwZGF0ZURvY0hhc2giLCJidWlsZEhhc2hLZXkiLCJleGlzdGluZ0RvYyIsImFzc2lnbiIsIl9pc0RvY1B1Ymxpc2hlZCIsInNvbWUiLCJQdWJsaXNoZWREb2N1bWVudCIsImNoaWxkUHVibGljYXRpb25zIiwiX2lzRmxhZ2dlZEZvclJlbW92YWwiLCJjaGlsZFB1YmxpY2F0aW9uIiwiY2FsbGJhY2siLCJjaGlsZCIsImZsYWdGb3JSZW1vdmFsIiwiZG9jdW1lbnRzIiwidmFsdWVPZklkIiwiRXJyb3IiLCJnZXQiLCJjb250ZXh0IiwidmFsdWVzIiwiZXhlY0NhbGxiYWNrT25Eb2MiLCJnZXRJZHMiLCJkb2NJZHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE1BQU0sQ0FBQ0MsTUFBTSxDQUFDO0VBQUNDLGtCQUFrQixFQUFDQSxDQUFBLEtBQUlBLGtCQUFrQjtFQUFDQyxnQkFBZ0IsRUFBQ0EsQ0FBQSxLQUFJQTtBQUFnQixDQUFDLENBQUM7QUFBQyxJQUFJQyxNQUFNO0FBQUNKLE1BQU0sQ0FBQ0ssSUFBSSxDQUFDLGVBQWUsRUFBQztFQUFDRCxNQUFNQSxDQUFDRSxDQUFDLEVBQUM7SUFBQ0YsTUFBTSxHQUFDRSxDQUFDO0VB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ekZBbEQsTUFBTSxDQUFDcUQsYUFBYSxDQTJGTFUscUJBM0ZTLENBQUMsQyIsImZpbGUiOiIvcGFja2FnZXMvcmV5d29vZF9wdWJsaXNoLWNvbXBvc2l0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InXG5cbmltcG9ydCBQdWJsaWNhdGlvbiBmcm9tICcuL3B1YmxpY2F0aW9uJ1xuaW1wb3J0IFN1YnNjcmlwdGlvbiBmcm9tICcuL3N1YnNjcmlwdGlvbidcbmltcG9ydCB7IGRlYnVnTG9nLCBlbmFibGVEZWJ1Z0xvZ2dpbmcgfSBmcm9tICcuL2xvZ2dpbmcnXG5cbmZ1bmN0aW9uIHB1Ymxpc2hDb21wb3NpdGUgKG5hbWUsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIE1ldGVvci5wdWJsaXNoKG5hbWUsIGFzeW5jIGZ1bmN0aW9uIHB1Ymxpc2ggKC4uLmFyZ3MpIHtcbiAgICBjb25zdCBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKHRoaXMpXG4gICAgY29uc3QgaW5zdGFuY2VPcHRpb25zID0gYXdhaXQgcHJlcGFyZU9wdGlvbnMuY2FsbCh0aGlzLCBvcHRpb25zLCBhcmdzKVxuICAgIGNvbnN0IHB1YmxpY2F0aW9ucyA9IFtdXG5cbiAgICBmb3IgKGNvbnN0IG9wdCBvZiBpbnN0YW5jZU9wdGlvbnMpIHtcbiAgICAgIGNvbnN0IHB1YiA9IG5ldyBQdWJsaWNhdGlvbihzdWJzY3JpcHRpb24sIG9wdClcbiAgICAgIGF3YWl0IHB1Yi5wdWJsaXNoKClcbiAgICAgIHB1YmxpY2F0aW9ucy5wdXNoKHB1YilcbiAgICB9XG5cbiAgICB0aGlzLm9uU3RvcCgoKSA9PiB7XG4gICAgICBwdWJsaWNhdGlvbnMuZm9yRWFjaChwdWIgPT4gcHViLnVucHVibGlzaCgpKVxuICAgIH0pXG5cbiAgICAvLyB3YWl0IGZvciBhbGwgcHVibGljYXRpb25zIHRvIGZpbmlzaCBwcm9jZXNzaW5nIGluaXRpYWwgYWRkZWQgY2FsbGJhY2tzXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwocHVibGljYXRpb25zLmZsYXRNYXAocHViID0+IHB1Yi5hZGRlZFByb21pc2VzKSlcblxuICAgIGRlYnVnTG9nKCdNZXRlb3IucHVibGlzaCcsICdyZWFkeScpXG4gICAgdGhpcy5yZWFkeSgpXG4gIH0pXG59XG5cbi8vIEZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuTWV0ZW9yLnB1Ymxpc2hDb21wb3NpdGUgPSBwdWJsaXNoQ29tcG9zaXRlXG5cbmFzeW5jIGZ1bmN0aW9uIHByZXBhcmVPcHRpb25zIChvcHRpb25zLCBhcmdzKSB7XG4gIGxldCBwcmVwYXJlZE9wdGlvbnMgPSBvcHRpb25zXG5cbiAgaWYgKHR5cGVvZiBwcmVwYXJlZE9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBwcmVwYXJlZE9wdGlvbnMgPSBhd2FpdCBwcmVwYXJlZE9wdGlvbnMuYXBwbHkodGhpcywgYXJncylcbiAgfVxuXG4gIGlmICghcHJlcGFyZWRPcHRpb25zKSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cblxuICBpZiAoIUFycmF5LmlzQXJyYXkocHJlcGFyZWRPcHRpb25zKSkge1xuICAgIHByZXBhcmVkT3B0aW9ucyA9IFtwcmVwYXJlZE9wdGlvbnNdXG4gIH1cblxuICByZXR1cm4gcHJlcGFyZWRPcHRpb25zXG59XG5cbmV4cG9ydCB7XG4gIGVuYWJsZURlYnVnTG9nZ2luZyxcbiAgcHVibGlzaENvbXBvc2l0ZVxufVxuIiwiY2xhc3MgRG9jdW1lbnRSZWZDb3VudGVyIHtcbiAgY29uc3RydWN0b3IgKG9ic2VydmVyKSB7XG4gICAgdGhpcy5oZWFwID0ge31cbiAgICB0aGlzLm9ic2VydmVyID0gb2JzZXJ2ZXJcbiAgfVxuXG4gIGluY3JlbWVudCAoY29sbGVjdGlvbk5hbWUsIGRvY0lkKSB7XG4gICAgY29uc3Qga2V5ID0gYCR7Y29sbGVjdGlvbk5hbWV9OiR7ZG9jSWQudmFsdWVPZigpfWBcbiAgICBpZiAoIXRoaXMuaGVhcFtrZXldKSB7XG4gICAgICB0aGlzLmhlYXBba2V5XSA9IDBcbiAgICB9XG4gICAgdGhpcy5oZWFwW2tleV0gKz0gMVxuICB9XG5cbiAgZGVjcmVtZW50IChjb2xsZWN0aW9uTmFtZSwgZG9jSWQpIHtcbiAgICBjb25zdCBrZXkgPSBgJHtjb2xsZWN0aW9uTmFtZX06JHtkb2NJZC52YWx1ZU9mKCl9YFxuICAgIGlmICh0aGlzLmhlYXBba2V5XSkge1xuICAgICAgdGhpcy5oZWFwW2tleV0gLT0gMVxuXG4gICAgICB0aGlzLm9ic2VydmVyLm9uQ2hhbmdlKGNvbGxlY3Rpb25OYW1lLCBkb2NJZCwgdGhpcy5oZWFwW2tleV0pXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERvY3VtZW50UmVmQ291bnRlclxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuXG5sZXQgZGVidWdMb2dnaW5nRW5hYmxlZCA9IGZhbHNlXG5cbmZ1bmN0aW9uIGRlYnVnTG9nIChzb3VyY2UsIG1lc3NhZ2UpIHtcbiAgaWYgKCFkZWJ1Z0xvZ2dpbmdFbmFibGVkKSB7IHJldHVybiB9XG4gIGxldCBwYWRkZWRTb3VyY2UgPSBzb3VyY2VcbiAgd2hpbGUgKHBhZGRlZFNvdXJjZS5sZW5ndGggPCAzNSkgeyBwYWRkZWRTb3VyY2UgKz0gJyAnIH1cbiAgY29uc29sZS5sb2coYFske3BhZGRlZFNvdXJjZX1dICR7bWVzc2FnZX1gKVxufVxuXG5mdW5jdGlvbiBlbmFibGVEZWJ1Z0xvZ2dpbmcgKCkge1xuICBkZWJ1Z0xvZ2dpbmdFbmFibGVkID0gdHJ1ZVxufVxuXG5leHBvcnQge1xuICBkZWJ1Z0xvZyxcbiAgZW5hYmxlRGVidWdMb2dnaW5nXG59XG4iLCJpbXBvcnQgeyBNZXRlb3IgfSBmcm9tICdtZXRlb3IvbWV0ZW9yJ1xuaW1wb3J0IHsgTWF0Y2gsIGNoZWNrIH0gZnJvbSAnbWV0ZW9yL2NoZWNrJ1xuXG5pbXBvcnQgeyBkZWJ1Z0xvZyB9IGZyb20gJy4vbG9nZ2luZydcbmltcG9ydCBQdWJsaXNoZWREb2N1bWVudExpc3QgZnJvbSAnLi9wdWJsaXNoZWRfZG9jdW1lbnRfbGlzdCdcblxuY2xhc3MgUHVibGljYXRpb24ge1xuICBjb25zdHJ1Y3RvciAoc3Vic2NyaXB0aW9uLCBvcHRpb25zLCBhcmdzKSB7XG4gICAgY2hlY2sob3B0aW9ucywge1xuICAgICAgZmluZDogRnVuY3Rpb24sXG4gICAgICBjaGlsZHJlbjogTWF0Y2guT3B0aW9uYWwoTWF0Y2guT25lT2YoW09iamVjdF0sIEZ1bmN0aW9uKSksXG4gICAgICBjb2xsZWN0aW9uTmFtZTogTWF0Y2guT3B0aW9uYWwoU3RyaW5nKVxuICAgIH0pXG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHN1YnNjcmlwdGlvblxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgICB0aGlzLmFyZ3MgPSBhcmdzIHx8IFtdXG4gICAgdGhpcy5jaGlsZHJlbk9wdGlvbnMgPSBvcHRpb25zLmNoaWxkcmVuIHx8IFtdXG4gICAgdGhpcy5wdWJsaXNoZWREb2NzID0gbmV3IFB1Ymxpc2hlZERvY3VtZW50TGlzdCgpXG4gICAgdGhpcy5jb2xsZWN0aW9uTmFtZSA9IG9wdGlvbnMuY29sbGVjdGlvbk5hbWVcbiAgICAvLyBwcm9wZXJ0eSB0byBzdG9yZSBwcm9taXNlcyBmb3IgYWRkZWQgY2FsbGJhY2tzXG4gICAgdGhpcy5hZGRlZFByb21pc2VzID0gW11cbiAgfVxuXG4gIGFzeW5jIHB1Ymxpc2ggKCkge1xuICAgIHRoaXMuY3Vyc29yID0gYXdhaXQgdGhpcy5fZ2V0Q3Vyc29yKClcbiAgICBpZiAoIXRoaXMuY3Vyc29yKSB7IHJldHVybiB9XG5cbiAgICBjb25zdCBjb2xsZWN0aW9uTmFtZSA9IHRoaXMuX2dldENvbGxlY3Rpb25OYW1lKClcblxuICAgIC8vIFVzZSBNZXRlb3IuYmluZEVudmlyb25tZW50IHRvIG1ha2Ugc3VyZSB0aGUgY2FsbGJhY2tzIGFyZSBydW4gd2l0aCB0aGUgc2FtZVxuICAgIC8vIGVudmlyb25tZW50VmFyaWFibGVzIGFzIHdoZW4gcHVibGlzaGluZyB0aGUgXCJwYXJlbnRcIi5cbiAgICAvLyBJdCdzIG9ubHkgbmVlZGVkIHdoZW4gcHVibGlzaCBpcyBiZWluZyByZWN1cnNpdmVseSBydW4uXG4gICAgdGhpcy5vYnNlcnZlSGFuZGxlID0gdGhpcy5jdXJzb3Iub2JzZXJ2ZSh7XG4gICAgICBhZGRlZDogTWV0ZW9yLmJpbmRFbnZpcm9ubWVudChhc3luYyAoZG9jKSA9PiB7XG4gICAgICAgIGNvbnN0IGFkZGVkUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAvLyBjYWxsIHRoZSBhc3luYyBmdW5jdGlvbiB0byBoYW5kbGUgdGhlICdhZGRlZCcgbG9naWNcbiAgICAgICAgICB0aGlzLl9oYW5kbGVBZGRlZEFzeW5jKGRvYywgY29sbGVjdGlvbk5hbWUpXG4gICAgICAgICAgICAudGhlbihyZXNvbHZlKSAvLyByZXNvbHZlIHRoZSBwcm9taXNlIGF0IHRoZSBlbmQgb2YgdGhlICdhZGRlZCcgY2FsbGJhY2tcbiAgICAgICAgICAgIC5jYXRjaChyZWplY3QpXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gc3RvcmUgdGhlIHByb21pc2VcbiAgICAgICAgdGhpcy5hZGRlZFByb21pc2VzLnB1c2goYWRkZWRQcm9taXNlKVxuICAgICAgfSksXG4gICAgICBjaGFuZ2VkOiBNZXRlb3IuYmluZEVudmlyb25tZW50KChuZXdEb2MsIG9sZERvYykgPT4ge1xuICAgICAgICBkZWJ1Z0xvZygnUHVibGljYXRpb24ub2JzZXJ2ZUhhbmRsZS5jaGFuZ2VkJywgYCR7Y29sbGVjdGlvbk5hbWV9OiR7bmV3RG9jLl9pZH1gKVxuICAgICAgICB0aGlzLl9yZXB1Ymxpc2hDaGlsZHJlbk9mKG5ld0RvYylcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24uY2hhbmdlZChjb2xsZWN0aW9uTmFtZSwgbmV3RG9jLl9pZCxcbiAgICAgICAgICBbLi4ubmV3IFNldChbLi4uT2JqZWN0LmtleXMobmV3RG9jKSwgLi4uT2JqZWN0LmtleXMob2xkRG9jKV0pXVxuICAgICAgICAgICAgLmZpbHRlcihrZXkgPT4gbmV3RG9jW2tleV0gIT09IG9sZERvY1trZXldKVxuICAgICAgICAgICAgLnJlZHVjZSgoY2hhbmdlcywga2V5KSA9PiAoeyAuLi5jaGFuZ2VzLCBba2V5XTogbmV3RG9jW2tleV0gfSksIHt9KSlcbiAgICAgIH0pLFxuICAgICAgcmVtb3ZlZDogKGRvYykgPT4ge1xuICAgICAgICBkZWJ1Z0xvZygnUHVibGljYXRpb24ub2JzZXJ2ZUhhbmRsZS5yZW1vdmVkJywgYCR7Y29sbGVjdGlvbk5hbWV9OiR7ZG9jLl9pZH1gKVxuICAgICAgICB0aGlzLl9yZW1vdmVEb2MoY29sbGVjdGlvbk5hbWUsIGRvYy5faWQpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHVucHVibGlzaCAoKSB7XG4gICAgZGVidWdMb2coJ1B1YmxpY2F0aW9uLnVucHVibGlzaCcsIHRoaXMuX2dldENvbGxlY3Rpb25OYW1lKCkpXG4gICAgdGhpcy5fc3RvcE9ic2VydmluZ0N1cnNvcigpXG4gICAgdGhpcy5fdW5wdWJsaXNoQWxsRG9jdW1lbnRzKClcbiAgfVxuXG4gIGFzeW5jIF9oYW5kbGVBZGRlZEFzeW5jIChkb2MsIGNvbGxlY3Rpb25OYW1lKSB7XG4gICAgY29uc3QgYWxyZWFkeVB1Ymxpc2hlZCA9IHRoaXMucHVibGlzaGVkRG9jcy5oYXMoZG9jLl9pZClcblxuICAgIGlmIChhbHJlYWR5UHVibGlzaGVkKSB7XG4gICAgICBkZWJ1Z0xvZygnUHVibGljYXRpb24ub2JzZXJ2ZUhhbmRsZS5hZGRlZCcsIGAke2NvbGxlY3Rpb25OYW1lfToke2RvYy5faWR9IGFscmVhZHkgcHVibGlzaGVkYClcbiAgICAgIHRoaXMucHVibGlzaGVkRG9jcy51bmZsYWdGb3JSZW1vdmFsKGRvYy5faWQpXG4gICAgICB0aGlzLl9yZXB1Ymxpc2hDaGlsZHJlbk9mKGRvYylcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLmNoYW5nZWQoY29sbGVjdGlvbk5hbWUsIGRvYy5faWQsIGRvYylcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wdWJsaXNoZWREb2NzLmFkZChjb2xsZWN0aW9uTmFtZSwgZG9jLl9pZClcbiAgICAgIGF3YWl0IHRoaXMuX3B1Ymxpc2hDaGlsZHJlbk9mKGRvYylcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZGVkKGNvbGxlY3Rpb25OYW1lLCBkb2MpXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgX3JlcHVibGlzaCAoKSB7XG4gICAgdGhpcy5fc3RvcE9ic2VydmluZ0N1cnNvcigpXG5cbiAgICB0aGlzLnB1Ymxpc2hlZERvY3MuZmxhZ0FsbEZvclJlbW92YWwoKVxuXG4gICAgZGVidWdMb2coJ1B1YmxpY2F0aW9uLl9yZXB1Ymxpc2gnLCAncnVuIC5wdWJsaXNoIGFnYWluJylcbiAgICBhd2FpdCB0aGlzLnB1Ymxpc2goKVxuXG4gICAgZGVidWdMb2coJ1B1YmxpY2F0aW9uLl9yZXB1Ymxpc2gnLCAndW5wdWJsaXNoIGRvY3MgZnJvbSBvbGQgY3Vyc29yJylcbiAgICB0aGlzLl9yZW1vdmVGbGFnZ2VkRG9jcygpXG4gIH1cblxuICBhc3luYyBfZ2V0Q3Vyc29yICgpIHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5vcHRpb25zLmZpbmQuYXBwbHkodGhpcy5zdWJzY3JpcHRpb24ubWV0ZW9yU3ViLCB0aGlzLmFyZ3MpXG4gIH1cblxuICBfZ2V0Q29sbGVjdGlvbk5hbWUgKCkge1xuICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb25OYW1lIHx8ICh0aGlzLmN1cnNvciAmJiB0aGlzLmN1cnNvci5fZ2V0Q29sbGVjdGlvbk5hbWUoKSlcbiAgfVxuXG4gIGFzeW5jIF9wdWJsaXNoQ2hpbGRyZW5PZiAoZG9jKSB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSB0eXBlb2YgdGhpcy5jaGlsZHJlbk9wdGlvbnMgPT09ICdmdW5jdGlvbidcbiAgICAgID8gdGhpcy5jaGlsZHJlbk9wdGlvbnMoZG9jLCAuLi50aGlzLmFyZ3MpXG4gICAgICA6IHRoaXMuY2hpbGRyZW5PcHRpb25zXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoY2hpbGRyZW4ubWFwKGFzeW5jIChvcHRpb25zKSA9PiB7XG4gICAgICBjb25zdCBwdWIgPSBuZXcgUHVibGljYXRpb24odGhpcy5zdWJzY3JpcHRpb24sIG9wdGlvbnMsIFtkb2NdLmNvbmNhdCh0aGlzLmFyZ3MpKVxuICAgICAgdGhpcy5wdWJsaXNoZWREb2NzLmFkZENoaWxkUHViKGRvYy5faWQsIHB1YilcbiAgICAgIGF3YWl0IHB1Yi5wdWJsaXNoKClcbiAgICB9KSlcbiAgfVxuXG4gIF9yZXB1Ymxpc2hDaGlsZHJlbk9mIChkb2MpIHtcbiAgICBjb25zdCBwYXJlbnRBcmdzID0gdGhpcy5hcmdzXG4gICAgbGV0IG5ld0FyZ3NcbiAgICB0aGlzLnB1Ymxpc2hlZERvY3MuZWFjaENoaWxkUHViKGRvYy5faWQsIGFzeW5jIChwdWJsaWNhdGlvbikgPT4ge1xuICAgICAgLy8gQ2hlY2sgaWYgcGFyZW50J3MgYXJncyBhcmUgdGhlIHNhbWUgbGVuZ3RoIGFzIHRoaXMgcHVibGljYXRpb25cbiAgICAgIC8vIEludHVpdGl2ZWx5IHRoaXMgc2hvdWxkIG5vdCBldmVyIGJlIHRoZSBjYXNlISBIb3dldmVyIGl0IGRvZXMgaGFwcGVuIHNvbWV0aW1lcy5cbiAgICAgIC8vIFdoZW4gaXQgZG9lcyB0aGUgZmlyc3QgYXJndW1lbnQgb2YgdGhlIHBhcmVudCBwdWJsaWNhdGlvbiBpcyB0aGUgZG9jLlxuICAgICAgLy8gU28gd2Ugc2tpcCB0aGlzIHRvIGF2b2lkIGNyZWF0aW5nIGEgZHVwbGljYXRlIG9mIHRoZSBmaXJzdCBhcmd1bWVudC5cbiAgICAgIGlmIChwYXJlbnRBcmdzLmxlbmd0aCA9PT0gcHVibGljYXRpb24uYXJncy5sZW5ndGgpIHtcbiAgICAgICAgbmV3QXJncyA9IHBhcmVudEFyZ3Muc2xpY2UoMSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld0FyZ3MgPSBwYXJlbnRBcmdzXG4gICAgICB9XG5cbiAgICAgIC8vIEZpcnN0IGFyZ3VtZW50IGlzIHRoZSBuZXcgZG9jdW1lbnRcbiAgICAgIC8vIFN1YnNlcXVlbnQgYXJncyBhcmUgcGFzc2VkIGRvd24gZnJvbSBwYXJlbnQuXG4gICAgICAvLyBUaGVzZSBtYXkgaGF2ZSBiZWVuIHVwZGF0ZWQgYnkgYSBncmFuZHBhcmVudCBwdWJsaWNhdGlvbi5cbiAgICAgIHB1YmxpY2F0aW9uLmFyZ3MgPSBbZG9jLCAuLi5uZXdBcmdzXVxuXG4gICAgICBhd2FpdCBwdWJsaWNhdGlvbi5fcmVwdWJsaXNoKClcbiAgICB9KVxuICB9XG5cbiAgX3VucHVibGlzaEFsbERvY3VtZW50cyAoKSB7XG4gICAgdGhpcy5wdWJsaXNoZWREb2NzLmVhY2hEb2N1bWVudCgoZG9jKSA9PiB7XG4gICAgICB0aGlzLl9yZW1vdmVEb2MoZG9jLmNvbGxlY3Rpb25OYW1lLCBkb2MuZG9jSWQpXG4gICAgfSwgdGhpcylcbiAgfVxuXG4gIF9zdG9wT2JzZXJ2aW5nQ3Vyc29yICgpIHtcbiAgICBkZWJ1Z0xvZygnUHVibGljYXRpb24uX3N0b3BPYnNlcnZpbmdDdXJzb3InLCAnc3RvcCBvYnNlcnZpbmcgY3Vyc29yJylcblxuICAgIGlmICh0aGlzLm9ic2VydmVIYW5kbGUpIHtcbiAgICAgIHRoaXMub2JzZXJ2ZUhhbmRsZS5zdG9wKClcbiAgICAgIGRlbGV0ZSB0aGlzLm9ic2VydmVIYW5kbGVcbiAgICB9XG4gIH1cblxuICBfcmVtb3ZlRmxhZ2dlZERvY3MgKCkge1xuICAgIHRoaXMucHVibGlzaGVkRG9jcy5lYWNoRG9jdW1lbnQoKGRvYykgPT4ge1xuICAgICAgaWYgKGRvYy5pc0ZsYWdnZWRGb3JSZW1vdmFsKCkpIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlRG9jKGRvYy5jb2xsZWN0aW9uTmFtZSwgZG9jLmRvY0lkKVxuICAgICAgfVxuICAgIH0sIHRoaXMpXG4gIH1cblxuICBfcmVtb3ZlRG9jIChjb2xsZWN0aW9uTmFtZSwgZG9jSWQpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5yZW1vdmVkKGNvbGxlY3Rpb25OYW1lLCBkb2NJZClcbiAgICB0aGlzLl91bnB1Ymxpc2hDaGlsZHJlbk9mKGRvY0lkKVxuICAgIHRoaXMucHVibGlzaGVkRG9jcy5yZW1vdmUoZG9jSWQpXG4gIH1cblxuICBfdW5wdWJsaXNoQ2hpbGRyZW5PZiAoZG9jSWQpIHtcbiAgICBkZWJ1Z0xvZygnUHVibGljYXRpb24uX3VucHVibGlzaENoaWxkcmVuT2YnLCBgdW5wdWJsaXNoaW5nIGNoaWxkcmVuIG9mICR7dGhpcy5fZ2V0Q29sbGVjdGlvbk5hbWUoKX06JHtkb2NJZH1gKVxuXG4gICAgdGhpcy5wdWJsaXNoZWREb2NzLmVhY2hDaGlsZFB1Yihkb2NJZCwgKHB1YmxpY2F0aW9uKSA9PiB7XG4gICAgICBwdWJsaWNhdGlvbi51bnB1Ymxpc2goKVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHVibGljYXRpb25cbiIsImltcG9ydCBEb2N1bWVudFJlZkNvdW50ZXIgZnJvbSAnLi9kb2NfcmVmX2NvdW50ZXInXG5pbXBvcnQgeyBkZWJ1Z0xvZyB9IGZyb20gJy4vbG9nZ2luZydcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG5jb25zdCBpc0VxdWFsID0gTnBtLnJlcXVpcmUoJ2xvZGFzaC5pc2VxdWFsJylcblxuY2xhc3MgU3Vic2NyaXB0aW9uIHtcbiAgY29uc3RydWN0b3IgKG1ldGVvclN1Yikge1xuICAgIHRoaXMubWV0ZW9yU3ViID0gbWV0ZW9yU3ViXG4gICAgdGhpcy5kb2NIYXNoID0ge31cbiAgICB0aGlzLnJlZkNvdW50ZXIgPSBuZXcgRG9jdW1lbnRSZWZDb3VudGVyKHtcbiAgICAgIG9uQ2hhbmdlOiAoY29sbGVjdGlvbk5hbWUsIGRvY0lkLCByZWZDb3VudCkgPT4ge1xuICAgICAgICBkZWJ1Z0xvZygnU3Vic2NyaXB0aW9uLnJlZkNvdW50ZXIub25DaGFuZ2UnLCBgJHtjb2xsZWN0aW9uTmFtZX06JHtkb2NJZC52YWx1ZU9mKCl9ICR7cmVmQ291bnR9YClcbiAgICAgICAgaWYgKHJlZkNvdW50IDw9IDApIHtcbiAgICAgICAgICBtZXRlb3JTdWIucmVtb3ZlZChjb2xsZWN0aW9uTmFtZSwgZG9jSWQpXG4gICAgICAgICAgdGhpcy5fcmVtb3ZlRG9jSGFzaChjb2xsZWN0aW9uTmFtZSwgZG9jSWQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgYWRkZWQgKGNvbGxlY3Rpb25OYW1lLCBkb2MpIHtcbiAgICB0aGlzLnJlZkNvdW50ZXIuaW5jcmVtZW50KGNvbGxlY3Rpb25OYW1lLCBkb2MuX2lkKVxuXG4gICAgaWYgKHRoaXMuX2hhc0RvY0NoYW5nZWQoY29sbGVjdGlvbk5hbWUsIGRvYy5faWQsIGRvYykpIHtcbiAgICAgIGRlYnVnTG9nKCdTdWJzY3JpcHRpb24uYWRkZWQnLCBgJHtjb2xsZWN0aW9uTmFtZX06JHtkb2MuX2lkfWApXG4gICAgICB0aGlzLm1ldGVvclN1Yi5hZGRlZChjb2xsZWN0aW9uTmFtZSwgZG9jLl9pZCwgZG9jKVxuICAgICAgdGhpcy5fYWRkRG9jSGFzaChjb2xsZWN0aW9uTmFtZSwgZG9jKVxuICAgIH1cbiAgfVxuXG4gIGNoYW5nZWQgKGNvbGxlY3Rpb25OYW1lLCBpZCwgY2hhbmdlcykge1xuICAgIGlmICh0aGlzLl9zaG91bGRTZW5kQ2hhbmdlcyhjb2xsZWN0aW9uTmFtZSwgaWQsIGNoYW5nZXMpKSB7XG4gICAgICBkZWJ1Z0xvZygnU3Vic2NyaXB0aW9uLmNoYW5nZWQnLCBgJHtjb2xsZWN0aW9uTmFtZX06JHtpZH1gKVxuICAgICAgdGhpcy5tZXRlb3JTdWIuY2hhbmdlZChjb2xsZWN0aW9uTmFtZSwgaWQsIGNoYW5nZXMpXG4gICAgICB0aGlzLl91cGRhdGVEb2NIYXNoKGNvbGxlY3Rpb25OYW1lLCBpZCwgY2hhbmdlcylcbiAgICB9XG4gIH1cblxuICByZW1vdmVkIChjb2xsZWN0aW9uTmFtZSwgaWQpIHtcbiAgICBkZWJ1Z0xvZygnU3Vic2NyaXB0aW9uLnJlbW92ZWQnLCBgJHtjb2xsZWN0aW9uTmFtZX06JHtpZC52YWx1ZU9mKCl9YClcbiAgICB0aGlzLnJlZkNvdW50ZXIuZGVjcmVtZW50KGNvbGxlY3Rpb25OYW1lLCBpZClcbiAgfVxuXG4gIF9hZGREb2NIYXNoIChjb2xsZWN0aW9uTmFtZSwgZG9jKSB7XG4gICAgdGhpcy5kb2NIYXNoW2J1aWxkSGFzaEtleShjb2xsZWN0aW9uTmFtZSwgZG9jLl9pZCldID0gZG9jXG4gIH1cblxuICBfdXBkYXRlRG9jSGFzaCAoY29sbGVjdGlvbk5hbWUsIGlkLCBjaGFuZ2VzKSB7XG4gICAgY29uc3Qga2V5ID0gYnVpbGRIYXNoS2V5KGNvbGxlY3Rpb25OYW1lLCBpZClcbiAgICBjb25zdCBleGlzdGluZ0RvYyA9IHRoaXMuZG9jSGFzaFtrZXldIHx8IHt9XG4gICAgdGhpcy5kb2NIYXNoW2tleV0gPSBPYmplY3QuYXNzaWduKGV4aXN0aW5nRG9jLCBjaGFuZ2VzKVxuICB9XG5cbiAgX3Nob3VsZFNlbmRDaGFuZ2VzIChjb2xsZWN0aW9uTmFtZSwgaWQsIGNoYW5nZXMpIHtcbiAgICByZXR1cm4gdGhpcy5faXNEb2NQdWJsaXNoZWQoY29sbGVjdGlvbk5hbWUsIGlkKSAmJlxuICAgICAgICAgICAgdGhpcy5faGFzRG9jQ2hhbmdlZChjb2xsZWN0aW9uTmFtZSwgaWQsIGNoYW5nZXMpXG4gIH1cblxuICBfaXNEb2NQdWJsaXNoZWQgKGNvbGxlY3Rpb25OYW1lLCBpZCkge1xuICAgIGNvbnN0IGtleSA9IGJ1aWxkSGFzaEtleShjb2xsZWN0aW9uTmFtZSwgaWQpXG4gICAgcmV0dXJuICEhdGhpcy5kb2NIYXNoW2tleV1cbiAgfVxuXG4gIF9oYXNEb2NDaGFuZ2VkIChjb2xsZWN0aW9uTmFtZSwgaWQsIGRvYykge1xuICAgIGNvbnN0IGV4aXN0aW5nRG9jID0gdGhpcy5kb2NIYXNoW2J1aWxkSGFzaEtleShjb2xsZWN0aW9uTmFtZSwgaWQpXVxuXG4gICAgaWYgKCFleGlzdGluZ0RvYykgeyByZXR1cm4gdHJ1ZSB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmtleXMoZG9jKS5zb21lKGtleSA9PiAhaXNFcXVhbChkb2Nba2V5XSwgZXhpc3RpbmdEb2Nba2V5XSkpXG4gIH1cblxuICBfcmVtb3ZlRG9jSGFzaCAoY29sbGVjdGlvbk5hbWUsIGlkKSB7XG4gICAgY29uc3Qga2V5ID0gYnVpbGRIYXNoS2V5KGNvbGxlY3Rpb25OYW1lLCBpZClcbiAgICBkZWxldGUgdGhpcy5kb2NIYXNoW2tleV1cbiAgfVxufVxuXG5mdW5jdGlvbiBidWlsZEhhc2hLZXkgKGNvbGxlY3Rpb25OYW1lLCBpZCkge1xuICByZXR1cm4gYCR7Y29sbGVjdGlvbk5hbWV9Ojoke2lkLnZhbHVlT2YoKX1gXG59XG5cbmV4cG9ydCBkZWZhdWx0IFN1YnNjcmlwdGlvblxuIiwiY2xhc3MgUHVibGlzaGVkRG9jdW1lbnQge1xuICBjb25zdHJ1Y3RvciAoY29sbGVjdGlvbk5hbWUsIGRvY0lkKSB7XG4gICAgdGhpcy5jb2xsZWN0aW9uTmFtZSA9IGNvbGxlY3Rpb25OYW1lXG4gICAgdGhpcy5kb2NJZCA9IGRvY0lkXG4gICAgdGhpcy5jaGlsZFB1YmxpY2F0aW9ucyA9IFtdXG4gICAgdGhpcy5faXNGbGFnZ2VkRm9yUmVtb3ZhbCA9IGZhbHNlXG4gIH1cblxuICBhZGRDaGlsZFB1YiAoY2hpbGRQdWJsaWNhdGlvbikge1xuICAgIHRoaXMuY2hpbGRQdWJsaWNhdGlvbnMucHVzaChjaGlsZFB1YmxpY2F0aW9uKVxuICB9XG5cbiAgZWFjaENoaWxkUHViIChjYWxsYmFjaykge1xuICAgIGZvciAoY29uc3QgY2hpbGQgb2YgdGhpcy5jaGlsZFB1YmxpY2F0aW9ucykge1xuICAgICAgY2FsbGJhY2soY2hpbGQpXG4gICAgfVxuICB9XG5cbiAgaXNGbGFnZ2VkRm9yUmVtb3ZhbCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzRmxhZ2dlZEZvclJlbW92YWxcbiAgfVxuXG4gIHVuZmxhZ0ZvclJlbW92YWwgKCkge1xuICAgIHRoaXMuX2lzRmxhZ2dlZEZvclJlbW92YWwgPSBmYWxzZVxuICB9XG5cbiAgZmxhZ0ZvclJlbW92YWwgKCkge1xuICAgIHRoaXMuX2lzRmxhZ2dlZEZvclJlbW92YWwgPSB0cnVlXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHVibGlzaGVkRG9jdW1lbnRcbiIsImltcG9ydCBQdWJsaXNoZWREb2N1bWVudCBmcm9tICcuL3B1Ymxpc2hlZF9kb2N1bWVudCdcblxuY2xhc3MgUHVibGlzaGVkRG9jdW1lbnRMaXN0IHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuZG9jdW1lbnRzID0ge31cbiAgfVxuXG4gIGFkZCAoY29sbGVjdGlvbk5hbWUsIGRvY0lkKSB7XG4gICAgY29uc3Qga2V5ID0gdmFsdWVPZklkKGRvY0lkKVxuXG4gICAgaWYgKCF0aGlzLmRvY3VtZW50c1trZXldKSB7XG4gICAgICB0aGlzLmRvY3VtZW50c1trZXldID0gbmV3IFB1Ymxpc2hlZERvY3VtZW50KGNvbGxlY3Rpb25OYW1lLCBkb2NJZClcbiAgICB9XG4gIH1cblxuICBhZGRDaGlsZFB1YiAoZG9jSWQsIHB1YmxpY2F0aW9uKSB7XG4gICAgaWYgKCFwdWJsaWNhdGlvbikgeyByZXR1cm4gfVxuXG4gICAgY29uc3Qga2V5ID0gdmFsdWVPZklkKGRvY0lkKVxuICAgIGNvbnN0IGRvYyA9IHRoaXMuZG9jdW1lbnRzW2tleV1cblxuICAgIGlmICh0eXBlb2YgZG9jID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBEb2Mgbm90IGZvdW5kIGluIGxpc3Q6ICR7a2V5fWApXG4gICAgfVxuXG4gICAgdGhpcy5kb2N1bWVudHNba2V5XS5hZGRDaGlsZFB1YihwdWJsaWNhdGlvbilcbiAgfVxuXG4gIGdldCAoZG9jSWQpIHtcbiAgICBjb25zdCBrZXkgPSB2YWx1ZU9mSWQoZG9jSWQpXG4gICAgcmV0dXJuIHRoaXMuZG9jdW1lbnRzW2tleV1cbiAgfVxuXG4gIHJlbW92ZSAoZG9jSWQpIHtcbiAgICBjb25zdCBrZXkgPSB2YWx1ZU9mSWQoZG9jSWQpXG4gICAgZGVsZXRlIHRoaXMuZG9jdW1lbnRzW2tleV1cbiAgfVxuXG4gIGhhcyAoZG9jSWQpIHtcbiAgICByZXR1cm4gISF0aGlzLmdldChkb2NJZClcbiAgfVxuXG4gIGVhY2hEb2N1bWVudCAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICBPYmplY3QudmFsdWVzKHRoaXMuZG9jdW1lbnRzKS5mb3JFYWNoKGZ1bmN0aW9uIGV4ZWNDYWxsYmFja09uRG9jIChkb2MpIHtcbiAgICAgIGNhbGxiYWNrLmNhbGwodGhpcywgZG9jKVxuICAgIH0sIGNvbnRleHQgfHwgdGhpcylcbiAgfVxuXG4gIGVhY2hDaGlsZFB1YiAoZG9jSWQsIGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZG9jID0gdGhpcy5nZXQoZG9jSWQpXG5cbiAgICBpZiAoZG9jKSB7XG4gICAgICBkb2MuZWFjaENoaWxkUHViKGNhbGxiYWNrKVxuICAgIH1cbiAgfVxuXG4gIGdldElkcyAoKSB7XG4gICAgY29uc3QgZG9jSWRzID0gW11cblxuICAgIHRoaXMuZWFjaERvY3VtZW50KChkb2MpID0+IHtcbiAgICAgIGRvY0lkcy5wdXNoKGRvYy5kb2NJZClcbiAgICB9KVxuXG4gICAgcmV0dXJuIGRvY0lkc1xuICB9XG5cbiAgdW5mbGFnRm9yUmVtb3ZhbCAoZG9jSWQpIHtcbiAgICBjb25zdCBkb2MgPSB0aGlzLmdldChkb2NJZClcblxuICAgIGlmIChkb2MpIHtcbiAgICAgIGRvYy51bmZsYWdGb3JSZW1vdmFsKClcbiAgICB9XG4gIH1cblxuICBmbGFnQWxsRm9yUmVtb3ZhbCAoKSB7XG4gICAgdGhpcy5lYWNoRG9jdW1lbnQoKGRvYykgPT4ge1xuICAgICAgZG9jLmZsYWdGb3JSZW1vdmFsKClcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIHZhbHVlT2ZJZCAoZG9jSWQpIHtcbiAgaWYgKGRvY0lkID09PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdEb2N1bWVudCBJRCBpcyBudWxsJylcbiAgfVxuICBpZiAodHlwZW9mIGRvY0lkID09PSAndW5kZWZpbmVkJykge1xuICAgIHRocm93IG5ldyBFcnJvcignRG9jdW1lbnQgSUQgaXMgdW5kZWZpbmVkJylcbiAgfVxuICByZXR1cm4gZG9jSWQudmFsdWVPZigpXG59XG5cbmV4cG9ydCBkZWZhdWx0IFB1Ymxpc2hlZERvY3VtZW50TGlzdFxuIl19
