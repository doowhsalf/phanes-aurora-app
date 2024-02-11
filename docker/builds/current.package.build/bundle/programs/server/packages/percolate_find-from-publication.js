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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvcGVyY29sYXRlOmZpbmQtZnJvbS1wdWJsaWNhdGlvbi9zZXJ2ZXIuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL3BlcmNvbGF0ZTpmaW5kLWZyb20tcHVibGljYXRpb24vdXRpbHMuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0IiwiRmluZEZyb21QdWJsaWNhdGlvbiIsIk1ldGVvciIsImxpbmsiLCJ2IiwiTUVUQURBVEFfQ09MTEVDVElPTiIsImNvbnN0cnVjdElkIiwicHVibGlzaCIsInB1YmxpY2F0aW9uTmFtZSIsImZuIiwicmFuayIsIm9sZEFkZGVkIiwiYWRkZWQiLCJiaW5kIiwib2xkUmVtb3ZlZCIsInJlbW92ZWQiLCJjb2xsZWN0aW9uTmFtZSIsImRvY3VtZW50SWQiLCJkb2MiLCJhcHBseSIsImFyZ3VtZW50cyIsImlkIiwiY29uY2F0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE1BQU0sQ0FBQ0MsTUFBTSxDQUFDO0VBQUNDLG1CQUFtQixFQUFDQSxDQUFBLEtBQUlBO0FBQW1CLENBQUMsQ0FBQztBQUFDLElBQUlDLE1BQU07QUFBQ0gsTUFBTSxDQUFDSSxJQUFJLENBQUMsZUFBZSxFQUFDO0VBQUNELE1BQU1BLENBQUNFLENBQUMsRUFBQztJQUFDRixNQUFNLEdBQUNFLENBQUM7RUFBQTtBQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7QUFBQyxJQUFJQyxtQkFBbUIsRUFBQ0MsV0FBVztBQUFDUCxNQUFNLENBQUNJLElBQUksQ0FBQyxTQUFTLEVBQUM7RUFBQ0UsbUJBQW1CQSxDQUFDRCxDQUFDLEVBQUM7SUFBQ0MsbUJBQW1CLEdBQUNELENBQUM7RUFBQSxDQUFDO0VBQUNFLFdBQVdBLENBQUNGLENBQUMsRUFBQztJQUFDRSxXQUFXLEdBQUNGLENBQUM7RUFBQTtBQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7QUFHaFEsTUFBTUgsbUJBQW1CLEdBQUcsQ0FBQyxDQUFDO0FBRXJDQSxtQkFBbUIsQ0FBQ00sT0FBTyxHQUFHLFVBQVNDLGVBQWUsRUFBRUMsRUFBRSxFQUFFO0VBQzFEUCxNQUFNLENBQUNLLE9BQU8sQ0FBQ0MsZUFBZSxFQUFFLFlBQVc7SUFDekMsSUFBSUUsSUFBSSxHQUFHLENBQUM7SUFDWixNQUFNQyxRQUFRLEdBQUcsSUFBSSxDQUFDQyxLQUFLLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDdEMsTUFBTUMsVUFBVSxHQUFHLElBQUksQ0FBQ0MsT0FBTyxDQUFDRixJQUFJLENBQUMsSUFBSSxDQUFDO0lBRTFDLElBQUksQ0FBQ0QsS0FBSyxHQUFHLENBQUNJLGNBQWMsRUFBRUMsVUFBVSxFQUFFQyxHQUFHLEtBQUs7TUFDaERQLFFBQVEsQ0FBQ0ssY0FBYyxFQUFFQyxVQUFVLEVBQUVDLEdBQUcsQ0FBQztNQUV6Q1AsUUFBUSxDQUFDTixtQkFBbUIsRUFBRUMsV0FBVyxDQUFDVSxjQUFjLEVBQUVSLGVBQWUsRUFBRVMsVUFBVSxDQUFDLEVBQUU7UUFDdEZELGNBQWM7UUFDZEMsVUFBVTtRQUNWVCxlQUFlO1FBQ2Y7UUFDQTtRQUNBRTtNQUNGLENBQUMsQ0FBQztNQUVGQSxJQUFJLElBQUksQ0FBQztJQUNYLENBQUM7SUFFRCxJQUFJLENBQUNLLE9BQU8sR0FBRyxDQUFDQyxjQUFjLEVBQUVDLFVBQVUsS0FBSztNQUM3QztNQUNBO01BQ0E7TUFDQSxJQUFJRCxjQUFjLEtBQUtYLG1CQUFtQixFQUFFO01BRTVDUyxVQUFVLENBQUNULG1CQUFtQixFQUFFQyxXQUFXLENBQUNVLGNBQWMsRUFBRVIsZUFBZSxFQUFFUyxVQUFVLENBQUMsQ0FBQztNQUN6RkgsVUFBVSxDQUFDRSxjQUFjLEVBQUVDLFVBQVUsQ0FBQztJQUN4QyxDQUFDO0lBRUQsT0FBT1IsRUFBRSxDQUFDVSxLQUFLLENBQUMsSUFBSSxFQUFFQyxTQUFTLENBQUM7RUFDbEMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDOzs7Ozs7Ozs7OztBQ3RDRHJCLE1BQU0sQ0FBQ0MsTUFBTSxDQUFDO0VBQUNLLG1CQUFtQixFQUFDQSxDQUFBLEtBQUlBLG1CQUFtQjtFQUFDQyxXQUFXLEVBQUNBLENBQUEsS0FBSUE7QUFBVyxDQUFDLENBQUM7QUFBakYsTUFBTUQsbUJBQW1CLEdBQUcsc0JBQXNCO0FBRWxELE1BQU1DLFdBQVcsR0FBR0EsQ0FBQ1UsY0FBYyxFQUFFUixlQUFlLEVBQUVhLEVBQUUsUUFBQUMsTUFBQSxDQUMxRE4sY0FBYyxPQUFBTSxNQUFBLENBQUlkLGVBQWUsT0FBQWMsTUFBQSxDQUFJRCxFQUFFLENBQUUsQyIsImZpbGUiOiIvcGFja2FnZXMvcGVyY29sYXRlX2ZpbmQtZnJvbS1wdWJsaWNhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1ldGVvciB9IGZyb20gXCJtZXRlb3IvbWV0ZW9yXCI7XG5pbXBvcnQgeyBNRVRBREFUQV9DT0xMRUNUSU9OLCBjb25zdHJ1Y3RJZCB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmV4cG9ydCBjb25zdCBGaW5kRnJvbVB1YmxpY2F0aW9uID0ge307XG5cbkZpbmRGcm9tUHVibGljYXRpb24ucHVibGlzaCA9IGZ1bmN0aW9uKHB1YmxpY2F0aW9uTmFtZSwgZm4pIHtcbiAgTWV0ZW9yLnB1Ymxpc2gocHVibGljYXRpb25OYW1lLCBmdW5jdGlvbigpIHtcbiAgICBsZXQgcmFuayA9IDA7XG4gICAgY29uc3Qgb2xkQWRkZWQgPSB0aGlzLmFkZGVkLmJpbmQodGhpcyk7XG4gICAgY29uc3Qgb2xkUmVtb3ZlZCA9IHRoaXMucmVtb3ZlZC5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5hZGRlZCA9IChjb2xsZWN0aW9uTmFtZSwgZG9jdW1lbnRJZCwgZG9jKSA9PiB7XG4gICAgICBvbGRBZGRlZChjb2xsZWN0aW9uTmFtZSwgZG9jdW1lbnRJZCwgZG9jKTtcblxuICAgICAgb2xkQWRkZWQoTUVUQURBVEFfQ09MTEVDVElPTiwgY29uc3RydWN0SWQoY29sbGVjdGlvbk5hbWUsIHB1YmxpY2F0aW9uTmFtZSwgZG9jdW1lbnRJZCksIHtcbiAgICAgICAgY29sbGVjdGlvbk5hbWUsXG4gICAgICAgIGRvY3VtZW50SWQsXG4gICAgICAgIHB1YmxpY2F0aW9uTmFtZSxcbiAgICAgICAgLy8gTk9URTogdGhpcyByYW5rIGlzIGluY3JlbWVudGVkIGFjcm9zcyBhbGwgY29sbGVjdGlvbnNcbiAgICAgICAgLy8gcHJvYmFibHkgZG9lc24ndCBtYXR0ZXI/XG4gICAgICAgIHJhbmtcbiAgICAgIH0pO1xuXG4gICAgICByYW5rICs9IDE7XG4gICAgfTtcblxuICAgIHRoaXMucmVtb3ZlZCA9IChjb2xsZWN0aW9uTmFtZSwgZG9jdW1lbnRJZCkgPT4ge1xuICAgICAgLy8gdGhlIG9ubHkgd2F5IHRoaXMgY2FuIGdldCBjYWxsZWQgaXMgd2hlbiBhbGwgZG9jdW1lbnRzIGFyZSByZW1vdmVkXG4gICAgICAvLyBmcm9tIHRoZSBzdWJzY3JpcHRpb24gYXMgaXQncyB0b3JuIGRvd24sIHdlIGtub3cgdGhhdCB0aGUgdW5kZXJseWluZyBkb2N1bWVudFxuICAgICAgLy8gd2lsbCBhbHNvIGJlIHJlbW92ZWQsIGFuZCB0aGlzIHdpbGwgcGljayBpdCB1cC5cbiAgICAgIGlmIChjb2xsZWN0aW9uTmFtZSA9PT0gTUVUQURBVEFfQ09MTEVDVElPTikgcmV0dXJuO1xuXG4gICAgICBvbGRSZW1vdmVkKE1FVEFEQVRBX0NPTExFQ1RJT04sIGNvbnN0cnVjdElkKGNvbGxlY3Rpb25OYW1lLCBwdWJsaWNhdGlvbk5hbWUsIGRvY3VtZW50SWQpKTtcbiAgICAgIG9sZFJlbW92ZWQoY29sbGVjdGlvbk5hbWUsIGRvY3VtZW50SWQpO1xuICAgIH07XG5cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfSk7XG59O1xuIiwiZXhwb3J0IGNvbnN0IE1FVEFEQVRBX0NPTExFQ1RJT04gPSAnc3Vic2NyaXB0aW9uTWV0YWRhdGEnO1xuXG5leHBvcnQgY29uc3QgY29uc3RydWN0SWQgPSAoY29sbGVjdGlvbk5hbWUsIHB1YmxpY2F0aW9uTmFtZSwgaWQpID0+IFxuICBgJHtjb2xsZWN0aW9uTmFtZX0tJHtwdWJsaWNhdGlvbk5hbWV9LSR7aWR9YDsiXX0=
