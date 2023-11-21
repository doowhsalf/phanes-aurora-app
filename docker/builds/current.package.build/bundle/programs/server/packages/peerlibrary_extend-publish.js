(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var DDP = Package['ddp-client'].DDP;
var DDPServer = Package['ddp-server'].DDPServer;
var _ = Package.underscore._;
var Promise = Package.promise.Promise;
var meteorInstall = Package.modules.meteorInstall;

/* Package-scope variables */
var __coffeescriptShare, extendPublish;

var require = meteorInstall({"node_modules":{"meteor":{"peerlibrary:extend-publish":{"server.coffee":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/peerlibrary_extend-publish/server.coffee                                                         //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
module.export({
  extendPublish: () => extendPublish
});

var extendPublish = function (newPublishArguments) {
  var Server, originalMeteorPublish, originalPublish; // DDP Server constructor.

  Server = Object.getPrototypeOf(Meteor.server).constructor;
  originalPublish = Server.prototype.publish;

  Server.prototype.publish = function (...args) {
    var newArgs; // If the first argument is an object, we let the original publish function to traverse it.

    if (_.isObject(args[0])) {
      originalPublish.apply(this, args);
      return;
    }

    newArgs = newPublishArguments.apply(this, args);
    return originalPublish.apply(this, newArgs);
  }; // Because Meteor.publish is a bound function it remembers old
  // prototype method so we have wrap it to directly as well.


  originalMeteorPublish = Meteor.publish;
  return Meteor.publish = function (...args) {
    var newArgs; // If the first argument is an object, we let the original publish function to traverse it.

    if (_.isObject(args[0])) {
      originalMeteorPublish.apply(this, args);
      return;
    }

    newArgs = newPublishArguments.apply(this, args);
    return originalMeteorPublish.apply(this, newArgs);
  };
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".coffee"
  ]
});

var exports = require("/node_modules/meteor/peerlibrary:extend-publish/server.coffee");

/* Exports */
Package._define("peerlibrary:extend-publish", exports, {
  extendPublish: extendPublish
});

})();

//# sourceURL=meteor://💻app/packages/peerlibrary_extend-publish.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvcGVlcmxpYnJhcnlfZXh0ZW5kLXB1Ymxpc2gvc2VydmVyLmNvZmZlZSIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyLmNvZmZlZSJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnQiLCJleHRlbmRQdWJsaXNoIiwibmV3UHVibGlzaEFyZ3VtZW50cyIsIlNlcnZlciIsIm9yaWdpbmFsTWV0ZW9yUHVibGlzaCIsIm9yaWdpbmFsUHVibGlzaCIsIk9iamVjdCIsImdldFByb3RvdHlwZU9mIiwiTWV0ZW9yIiwic2VydmVyIiwiY29uc3RydWN0b3IiLCJwcm90b3R5cGUiLCJwdWJsaXNoIiwiYXJncyIsIm5ld0FyZ3MiLCJfIiwiaXNPYmplY3QiLCJhcHBseSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxNQUFBLENBQUFDLE1BQUEsQ0FBTztBQUFBQyxlQUFnQixRQUFBQTtBQUFoQixDQUFQOztBQUFBLElBQU9BLGFBQVAsR0FBdUIsVUFBQ0MsbUJBQUQ7QUFFckIsTUFBQUMsTUFBQSxFQUFBQyxxQkFBQSxFQUFBQyxlQUFBLENBRnFCLENDRXJCOztBREFBRixRQUFBLEdBQVNHLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsTUFBTSxDQUFDQyxNQUE3QixFQUFxQ0MsV0FBOUM7QUFFQUwsaUJBQUEsR0FBa0JGLE1BQU0sQ0FBQVEsU0FBTixDQUFRQyxPQUExQjs7QUFDQVQsUUFBTSxDQUFBUSxTQUFOLENBQVFDLE9BQVIsR0FBa0IsYUFBQ0MsSUFBRDtBQUVoQixRQUFBQyxPQUFBLENBRmdCLENDRWhCOztBREFBLFFBQUdDLENBQUMsQ0FBQ0MsUUFBRixDQUFXSCxJQUFLLEdBQWhCLENBQUg7QUFDRVIscUJBQWUsQ0FBQ1ksS0FBaEIsQ0FBc0IsSUFBdEIsRUFBNEJKLElBQTVCO0FBQ0E7QUNFRDs7QURBREMsV0FBQSxHQUFVWixtQkFBbUIsQ0FBQ2UsS0FBcEIsQ0FBMEIsSUFBMUIsRUFBZ0NKLElBQWhDLENBQVY7QUNFQSxXREFBUixlQUFlLENBQUNZLEtBQWhCLENBQXNCLElBQXRCLEVBQTRCSCxPQUE1QixDQ0FBO0FEUmdCLEdBQWxCLENBTHFCLENDZXJCO0FBQ0E7OztBRENBVix1QkFBQSxHQUF3QkksTUFBTSxDQUFDSSxPQUEvQjtBQ0NBLFNEQUFKLE1BQU0sQ0FBQ0ksT0FBUCxHQUFpQixhQUFDQyxJQUFEO0FBRWYsUUFBQUMsT0FBQSxDQUZlLENDRWY7O0FEQUEsUUFBR0MsQ0FBQyxDQUFDQyxRQUFGLENBQVdILElBQUssR0FBaEIsQ0FBSDtBQUNFVCwyQkFBcUIsQ0FBQ2EsS0FBdEIsQ0FBNEIsSUFBNUIsRUFBa0NKLElBQWxDO0FBQ0E7QUNFRDs7QURBREMsV0FBQSxHQUFVWixtQkFBbUIsQ0FBQ2UsS0FBcEIsQ0FBMEIsSUFBMUIsRUFBZ0NKLElBQWhDLENBQVY7QUNFQSxXREFBVCxxQkFBcUIsQ0FBQ2EsS0FBdEIsQ0FBNEIsSUFBNUIsRUFBa0NILE9BQWxDLENDQUE7QURSZSxHQ0FqQjtBRGxCcUIsQ0FBdkIsQyIsImZpbGUiOiIvcGFja2FnZXMvcGVlcmxpYnJhcnlfZXh0ZW5kLXB1Ymxpc2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZXh0ZW5kUHVibGlzaCA9IChuZXdQdWJsaXNoQXJndW1lbnRzKSAtPlxuICAjIEREUCBTZXJ2ZXIgY29uc3RydWN0b3IuXG4gIFNlcnZlciA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihNZXRlb3Iuc2VydmVyKS5jb25zdHJ1Y3RvclxuXG4gIG9yaWdpbmFsUHVibGlzaCA9IFNlcnZlcjo6cHVibGlzaFxuICBTZXJ2ZXI6OnB1Ymxpc2ggPSAoYXJncy4uLikgLT5cbiAgICAjIElmIHRoZSBmaXJzdCBhcmd1bWVudCBpcyBhbiBvYmplY3QsIHdlIGxldCB0aGUgb3JpZ2luYWwgcHVibGlzaCBmdW5jdGlvbiB0byB0cmF2ZXJzZSBpdC5cbiAgICBpZiBfLmlzT2JqZWN0IGFyZ3NbMF1cbiAgICAgIG9yaWdpbmFsUHVibGlzaC5hcHBseSB0aGlzLCBhcmdzXG4gICAgICByZXR1cm5cblxuICAgIG5ld0FyZ3MgPSBuZXdQdWJsaXNoQXJndW1lbnRzLmFwcGx5IHRoaXMsIGFyZ3NcblxuICAgIG9yaWdpbmFsUHVibGlzaC5hcHBseSB0aGlzLCBuZXdBcmdzXG5cbiAgIyBCZWNhdXNlIE1ldGVvci5wdWJsaXNoIGlzIGEgYm91bmQgZnVuY3Rpb24gaXQgcmVtZW1iZXJzIG9sZFxuICAjIHByb3RvdHlwZSBtZXRob2Qgc28gd2UgaGF2ZSB3cmFwIGl0IHRvIGRpcmVjdGx5IGFzIHdlbGwuXG4gIG9yaWdpbmFsTWV0ZW9yUHVibGlzaCA9IE1ldGVvci5wdWJsaXNoXG4gIE1ldGVvci5wdWJsaXNoID0gKGFyZ3MuLi4pIC0+XG4gICAgIyBJZiB0aGUgZmlyc3QgYXJndW1lbnQgaXMgYW4gb2JqZWN0LCB3ZSBsZXQgdGhlIG9yaWdpbmFsIHB1Ymxpc2ggZnVuY3Rpb24gdG8gdHJhdmVyc2UgaXQuXG4gICAgaWYgXy5pc09iamVjdCBhcmdzWzBdXG4gICAgICBvcmlnaW5hbE1ldGVvclB1Ymxpc2guYXBwbHkgdGhpcywgYXJnc1xuICAgICAgcmV0dXJuXG5cbiAgICBuZXdBcmdzID0gbmV3UHVibGlzaEFyZ3VtZW50cy5hcHBseSB0aGlzLCBhcmdzXG5cbiAgICBvcmlnaW5hbE1ldGVvclB1Ymxpc2guYXBwbHkgdGhpcywgbmV3QXJnc1xuIiwiZXhwb3J0IHZhciBleHRlbmRQdWJsaXNoID0gZnVuY3Rpb24obmV3UHVibGlzaEFyZ3VtZW50cykge1xuICB2YXIgU2VydmVyLCBvcmlnaW5hbE1ldGVvclB1Ymxpc2gsIG9yaWdpbmFsUHVibGlzaDtcbiAgLy8gRERQIFNlcnZlciBjb25zdHJ1Y3Rvci5cbiAgU2VydmVyID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKE1ldGVvci5zZXJ2ZXIpLmNvbnN0cnVjdG9yO1xuICBvcmlnaW5hbFB1Ymxpc2ggPSBTZXJ2ZXIucHJvdG90eXBlLnB1Ymxpc2g7XG4gIFNlcnZlci5wcm90b3R5cGUucHVibGlzaCA9IGZ1bmN0aW9uKC4uLmFyZ3MpIHtcbiAgICB2YXIgbmV3QXJncztcbiAgICAvLyBJZiB0aGUgZmlyc3QgYXJndW1lbnQgaXMgYW4gb2JqZWN0LCB3ZSBsZXQgdGhlIG9yaWdpbmFsIHB1Ymxpc2ggZnVuY3Rpb24gdG8gdHJhdmVyc2UgaXQuXG4gICAgaWYgKF8uaXNPYmplY3QoYXJnc1swXSkpIHtcbiAgICAgIG9yaWdpbmFsUHVibGlzaC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbmV3QXJncyA9IG5ld1B1Ymxpc2hBcmd1bWVudHMuYXBwbHkodGhpcywgYXJncyk7XG4gICAgcmV0dXJuIG9yaWdpbmFsUHVibGlzaC5hcHBseSh0aGlzLCBuZXdBcmdzKTtcbiAgfTtcbiAgLy8gQmVjYXVzZSBNZXRlb3IucHVibGlzaCBpcyBhIGJvdW5kIGZ1bmN0aW9uIGl0IHJlbWVtYmVycyBvbGRcbiAgLy8gcHJvdG90eXBlIG1ldGhvZCBzbyB3ZSBoYXZlIHdyYXAgaXQgdG8gZGlyZWN0bHkgYXMgd2VsbC5cbiAgb3JpZ2luYWxNZXRlb3JQdWJsaXNoID0gTWV0ZW9yLnB1Ymxpc2g7XG4gIHJldHVybiBNZXRlb3IucHVibGlzaCA9IGZ1bmN0aW9uKC4uLmFyZ3MpIHtcbiAgICB2YXIgbmV3QXJncztcbiAgICAvLyBJZiB0aGUgZmlyc3QgYXJndW1lbnQgaXMgYW4gb2JqZWN0LCB3ZSBsZXQgdGhlIG9yaWdpbmFsIHB1Ymxpc2ggZnVuY3Rpb24gdG8gdHJhdmVyc2UgaXQuXG4gICAgaWYgKF8uaXNPYmplY3QoYXJnc1swXSkpIHtcbiAgICAgIG9yaWdpbmFsTWV0ZW9yUHVibGlzaC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbmV3QXJncyA9IG5ld1B1Ymxpc2hBcmd1bWVudHMuYXBwbHkodGhpcywgYXJncyk7XG4gICAgcmV0dXJuIG9yaWdpbmFsTWV0ZW9yUHVibGlzaC5hcHBseSh0aGlzLCBuZXdBcmdzKTtcbiAgfTtcbn07XG4iXX0=
