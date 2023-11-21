(function () {

/* Imports */
var ECMAScript = Package.ecmascript.ECMAScript;
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var LocalCollection = Package.minimongo.LocalCollection;
var Minimongo = Package.minimongo.Minimongo;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var FindFromPublication;

var require = meteorInstall({"node_modules":{"meteor":{"percolate:find-from-publication":{"server.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                               //
// packages/percolate_find-from-publication/server.js                                            //
//                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                 //
module.export({
  FindFromPublication: () => FindFromPublication
});
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let METADATA_COLLECTION, constructId;
module.link("./utils", {
  METADATA_COLLECTION(v) {
    METADATA_COLLECTION = v;
  },

  constructId(v) {
    constructId = v;
  }

}, 1);
const FindFromPublication = {};

FindFromPublication.publish = function (publicationName, fn) {
  Meteor.publish(publicationName, function () {
    let rank = 0;
    const oldAdded = this.added.bind(this);
    const oldRemoved = this.removed.bind(this);

    this.added = (collectionName, documentId, doc) => {
      oldAdded(collectionName, documentId, doc);
      oldAdded(METADATA_COLLECTION, constructId(collectionName, publicationName, documentId), {
        collectionName,
        documentId,
        publicationName,
        // NOTE: this rank is incremented across all collections
        // probably doesn't matter?
        rank
      });
      rank += 1;
    };

    this.removed = (collectionName, documentId) => {
      // the only way this can get called is when all documents are removed
      // from the subscription as it's torn down, we know that the underlying document
      // will also be removed, and this will pick it up.
      if (collectionName === METADATA_COLLECTION) return;
      oldRemoved(METADATA_COLLECTION, constructId(collectionName, publicationName, documentId));
      oldRemoved(collectionName, documentId);
    };

    return fn.apply(this, arguments);
  });
};
///////////////////////////////////////////////////////////////////////////////////////////////////

},"utils.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                               //
// packages/percolate_find-from-publication/utils.js                                             //
//                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                 //
module.export({
  METADATA_COLLECTION: () => METADATA_COLLECTION,
  constructId: () => constructId
});
const METADATA_COLLECTION = 'subscriptionMetadata';

const constructId = (collectionName, publicationName, id) => "".concat(collectionName, "-").concat(publicationName, "-").concat(id);
///////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/percolate:find-from-publication/server.js");

/* Exports */
Package._define("percolate:find-from-publication", exports, {
  FindFromPublication: FindFromPublication
});

})();

//# sourceURL=meteor://💻app/packages/percolate_find-from-publication.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvcGVyY29sYXRlOmZpbmQtZnJvbS1wdWJsaWNhdGlvbi9zZXJ2ZXIuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL3BlcmNvbGF0ZTpmaW5kLWZyb20tcHVibGljYXRpb24vdXRpbHMuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0IiwiRmluZEZyb21QdWJsaWNhdGlvbiIsIk1ldGVvciIsImxpbmsiLCJ2IiwiTUVUQURBVEFfQ09MTEVDVElPTiIsImNvbnN0cnVjdElkIiwicHVibGlzaCIsInB1YmxpY2F0aW9uTmFtZSIsImZuIiwicmFuayIsIm9sZEFkZGVkIiwiYWRkZWQiLCJiaW5kIiwib2xkUmVtb3ZlZCIsInJlbW92ZWQiLCJjb2xsZWN0aW9uTmFtZSIsImRvY3VtZW50SWQiLCJkb2MiLCJhcHBseSIsImFyZ3VtZW50cyIsImlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjO0FBQUNDLHFCQUFtQixFQUFDLE1BQUlBO0FBQXpCLENBQWQ7QUFBNkQsSUFBSUMsTUFBSjtBQUFXSCxNQUFNLENBQUNJLElBQVAsQ0FBWSxlQUFaLEVBQTRCO0FBQUNELFFBQU0sQ0FBQ0UsQ0FBRCxFQUFHO0FBQUNGLFVBQU0sR0FBQ0UsQ0FBUDtBQUFTOztBQUFwQixDQUE1QixFQUFrRCxDQUFsRDtBQUFxRCxJQUFJQyxtQkFBSixFQUF3QkMsV0FBeEI7QUFBb0NQLE1BQU0sQ0FBQ0ksSUFBUCxDQUFZLFNBQVosRUFBc0I7QUFBQ0UscUJBQW1CLENBQUNELENBQUQsRUFBRztBQUFDQyx1QkFBbUIsR0FBQ0QsQ0FBcEI7QUFBc0IsR0FBOUM7O0FBQStDRSxhQUFXLENBQUNGLENBQUQsRUFBRztBQUFDRSxlQUFXLEdBQUNGLENBQVo7QUFBYzs7QUFBNUUsQ0FBdEIsRUFBb0csQ0FBcEc7QUFHMUosTUFBTUgsbUJBQW1CLEdBQUcsRUFBNUI7O0FBRVBBLG1CQUFtQixDQUFDTSxPQUFwQixHQUE4QixVQUFTQyxlQUFULEVBQTBCQyxFQUExQixFQUE4QjtBQUMxRFAsUUFBTSxDQUFDSyxPQUFQLENBQWVDLGVBQWYsRUFBZ0MsWUFBVztBQUN6QyxRQUFJRSxJQUFJLEdBQUcsQ0FBWDtBQUNBLFVBQU1DLFFBQVEsR0FBRyxLQUFLQyxLQUFMLENBQVdDLElBQVgsQ0FBZ0IsSUFBaEIsQ0FBakI7QUFDQSxVQUFNQyxVQUFVLEdBQUcsS0FBS0MsT0FBTCxDQUFhRixJQUFiLENBQWtCLElBQWxCLENBQW5COztBQUVBLFNBQUtELEtBQUwsR0FBYSxDQUFDSSxjQUFELEVBQWlCQyxVQUFqQixFQUE2QkMsR0FBN0IsS0FBcUM7QUFDaERQLGNBQVEsQ0FBQ0ssY0FBRCxFQUFpQkMsVUFBakIsRUFBNkJDLEdBQTdCLENBQVI7QUFFQVAsY0FBUSxDQUFDTixtQkFBRCxFQUFzQkMsV0FBVyxDQUFDVSxjQUFELEVBQWlCUixlQUFqQixFQUFrQ1MsVUFBbEMsQ0FBakMsRUFBZ0Y7QUFDdEZELHNCQURzRjtBQUV0RkMsa0JBRnNGO0FBR3RGVCx1QkFIc0Y7QUFJdEY7QUFDQTtBQUNBRTtBQU5zRixPQUFoRixDQUFSO0FBU0FBLFVBQUksSUFBSSxDQUFSO0FBQ0QsS0FiRDs7QUFlQSxTQUFLSyxPQUFMLEdBQWUsQ0FBQ0MsY0FBRCxFQUFpQkMsVUFBakIsS0FBZ0M7QUFDN0M7QUFDQTtBQUNBO0FBQ0EsVUFBSUQsY0FBYyxLQUFLWCxtQkFBdkIsRUFBNEM7QUFFNUNTLGdCQUFVLENBQUNULG1CQUFELEVBQXNCQyxXQUFXLENBQUNVLGNBQUQsRUFBaUJSLGVBQWpCLEVBQWtDUyxVQUFsQyxDQUFqQyxDQUFWO0FBQ0FILGdCQUFVLENBQUNFLGNBQUQsRUFBaUJDLFVBQWpCLENBQVY7QUFDRCxLQVJEOztBQVVBLFdBQU9SLEVBQUUsQ0FBQ1UsS0FBSCxDQUFTLElBQVQsRUFBZUMsU0FBZixDQUFQO0FBQ0QsR0EvQkQ7QUFnQ0QsQ0FqQ0QsQzs7Ozs7Ozs7Ozs7QUNMQXJCLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjO0FBQUNLLHFCQUFtQixFQUFDLE1BQUlBLG1CQUF6QjtBQUE2Q0MsYUFBVyxFQUFDLE1BQUlBO0FBQTdELENBQWQ7QUFBTyxNQUFNRCxtQkFBbUIsR0FBRyxzQkFBNUI7O0FBRUEsTUFBTUMsV0FBVyxHQUFHLENBQUNVLGNBQUQsRUFBaUJSLGVBQWpCLEVBQWtDYSxFQUFsQyxlQUN0QkwsY0FEc0IsY0FDSlIsZUFESSxjQUNlYSxFQURmLENBQXBCLEMiLCJmaWxlIjoiL3BhY2thZ2VzL3BlcmNvbGF0ZV9maW5kLWZyb20tcHVibGljYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZXRlb3IgfSBmcm9tIFwibWV0ZW9yL21ldGVvclwiO1xuaW1wb3J0IHsgTUVUQURBVEFfQ09MTEVDVElPTiwgY29uc3RydWN0SWQgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5leHBvcnQgY29uc3QgRmluZEZyb21QdWJsaWNhdGlvbiA9IHt9O1xuXG5GaW5kRnJvbVB1YmxpY2F0aW9uLnB1Ymxpc2ggPSBmdW5jdGlvbihwdWJsaWNhdGlvbk5hbWUsIGZuKSB7XG4gIE1ldGVvci5wdWJsaXNoKHB1YmxpY2F0aW9uTmFtZSwgZnVuY3Rpb24oKSB7XG4gICAgbGV0IHJhbmsgPSAwO1xuICAgIGNvbnN0IG9sZEFkZGVkID0gdGhpcy5hZGRlZC5iaW5kKHRoaXMpO1xuICAgIGNvbnN0IG9sZFJlbW92ZWQgPSB0aGlzLnJlbW92ZWQuYmluZCh0aGlzKTtcblxuICAgIHRoaXMuYWRkZWQgPSAoY29sbGVjdGlvbk5hbWUsIGRvY3VtZW50SWQsIGRvYykgPT4ge1xuICAgICAgb2xkQWRkZWQoY29sbGVjdGlvbk5hbWUsIGRvY3VtZW50SWQsIGRvYyk7XG5cbiAgICAgIG9sZEFkZGVkKE1FVEFEQVRBX0NPTExFQ1RJT04sIGNvbnN0cnVjdElkKGNvbGxlY3Rpb25OYW1lLCBwdWJsaWNhdGlvbk5hbWUsIGRvY3VtZW50SWQpLCB7XG4gICAgICAgIGNvbGxlY3Rpb25OYW1lLFxuICAgICAgICBkb2N1bWVudElkLFxuICAgICAgICBwdWJsaWNhdGlvbk5hbWUsXG4gICAgICAgIC8vIE5PVEU6IHRoaXMgcmFuayBpcyBpbmNyZW1lbnRlZCBhY3Jvc3MgYWxsIGNvbGxlY3Rpb25zXG4gICAgICAgIC8vIHByb2JhYmx5IGRvZXNuJ3QgbWF0dGVyP1xuICAgICAgICByYW5rXG4gICAgICB9KTtcblxuICAgICAgcmFuayArPSAxO1xuICAgIH07XG5cbiAgICB0aGlzLnJlbW92ZWQgPSAoY29sbGVjdGlvbk5hbWUsIGRvY3VtZW50SWQpID0+IHtcbiAgICAgIC8vIHRoZSBvbmx5IHdheSB0aGlzIGNhbiBnZXQgY2FsbGVkIGlzIHdoZW4gYWxsIGRvY3VtZW50cyBhcmUgcmVtb3ZlZFxuICAgICAgLy8gZnJvbSB0aGUgc3Vic2NyaXB0aW9uIGFzIGl0J3MgdG9ybiBkb3duLCB3ZSBrbm93IHRoYXQgdGhlIHVuZGVybHlpbmcgZG9jdW1lbnRcbiAgICAgIC8vIHdpbGwgYWxzbyBiZSByZW1vdmVkLCBhbmQgdGhpcyB3aWxsIHBpY2sgaXQgdXAuXG4gICAgICBpZiAoY29sbGVjdGlvbk5hbWUgPT09IE1FVEFEQVRBX0NPTExFQ1RJT04pIHJldHVybjtcblxuICAgICAgb2xkUmVtb3ZlZChNRVRBREFUQV9DT0xMRUNUSU9OLCBjb25zdHJ1Y3RJZChjb2xsZWN0aW9uTmFtZSwgcHVibGljYXRpb25OYW1lLCBkb2N1bWVudElkKSk7XG4gICAgICBvbGRSZW1vdmVkKGNvbGxlY3Rpb25OYW1lLCBkb2N1bWVudElkKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH0pO1xufTtcbiIsImV4cG9ydCBjb25zdCBNRVRBREFUQV9DT0xMRUNUSU9OID0gJ3N1YnNjcmlwdGlvbk1ldGFkYXRhJztcblxuZXhwb3J0IGNvbnN0IGNvbnN0cnVjdElkID0gKGNvbGxlY3Rpb25OYW1lLCBwdWJsaWNhdGlvbk5hbWUsIGlkKSA9PiBcbiAgYCR7Y29sbGVjdGlvbk5hbWV9LSR7cHVibGljYXRpb25OYW1lfS0ke2lkfWA7Il19
