(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var URL = Package.url.URL;
var URLSearchParams = Package.url.URLSearchParams;
var ECMAScript = Package.ecmascript.ECMAScript;
var fetch = Package.fetch.fetch;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var HTTP, HTTPInternals;

var require = meteorInstall({"node_modules":{"meteor":{"http":{"httpcall_server.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/http/httpcall_server.js                                                                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
module.export({
  HTTP: () => HTTP,
  HTTPInternals: () => HTTPInternals
});
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let fetch, Request;
module.link("meteor/fetch", {
  fetch(v) {
    fetch = v;
  },

  Request(v) {
    Request = v;
  }

}, 1);
let URL, URLSearchParams;
module.link("meteor/url", {
  URL(v) {
    URL = v;
  },

  URLSearchParams(v) {
    URLSearchParams = v;
  }

}, 2);
let HTTP, makeErrorByStatus, populateData;
module.link("./httpcall_common.js", {
  HTTP(v) {
    HTTP = v;
  },

  makeErrorByStatus(v) {
    makeErrorByStatus = v;
  },

  populateData(v) {
    populateData = v;
  }

}, 3);
const hasOwn = Object.prototype.hasOwnProperty;
/**
 * @deprecated
 */

const HTTPInternals = {};

// _call always runs asynchronously; HTTP.call, defined below,
// wraps _call and runs synchronously when no callback is provided.
function _call(method, url, options, callback) {
  ////////// Process arguments //////////
  if (!callback && typeof options === 'function') {
    // support (method, url, callback) argument list
    callback = options;
    options = null;
  }

  options = options || {};

  if (hasOwn.call(options, 'beforeSend')) {
    throw new Error('Option beforeSend not supported on server.');
  }

  method = (method || '').toUpperCase();

  if (!/^https?:\/\//.test(url)) {
    throw new Error('url must be absolute and start with http:// or https://');
  }

  const headers = {};
  let content = options.content;

  if (options.data) {
    content = JSON.stringify(options.data);
    headers['Content-Type'] = 'application/json';
  }

  let paramsForUrl;
  let paramsForBody;

  if (content || method === 'GET' || method === 'HEAD') {
    paramsForUrl = options.params;
  } else {
    paramsForBody = options.params;
  }

  const newUrl = URL._constructUrl(url, options.query, paramsForUrl);

  if (options.auth) {
    if (options.auth.indexOf(':') < 0) {
      throw new Error('auth option should be of the form "username:password"');
    }

    const base64 = Buffer.from(options.auth, 'ascii').toString('base64');
    headers['Authorization'] = "Basic ".concat(base64);
  }

  if (paramsForBody) {
    const data = new URLSearchParams();
    Object.entries(paramsForBody).forEach(_ref => {
      let [key, value] = _ref;
      data.append(key, value);
    });
    content = data;
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }

  if (options.headers) {
    Object.keys(options.headers).forEach(function (key) {
      headers[key] = options.headers[key];
    });
  }

  let caching;

  if (options.caching) {// TODO implement fetch-specific options
  }

  let corsMode;

  if (options.mode) {// TODO implement fetch-specific options
  }

  let credentials; // wrap callback to add a 'response' property on an error, in case
  // we have both (http 4xx/5xx error, which has a response payload)

  callback = function (cb) {
    let called = false;
    return function (error, response) {
      if (!called) {
        called = true;

        if (error && response) {
          error.response = response;
        }

        cb(error, response);
      }
    };
  }(callback); // is false if false, otherwise always true


  const followRedirects = options.followRedirects === false ? 'manual' : 'follow'; ////////// Kickoff! //////////
  // Allow users to override any request option with the npmRequestOptions
  // option.

  const requestOptions = {
    method: method,
    caching: caching,
    mode: corsMode,
    jar: false,
    timeout: options.timeout,
    body: content,
    redirect: followRedirects,
    referrer: options.referrer,
    integrity: options.integrity,
    headers: headers
  };
  const request = new Request(newUrl, requestOptions);
  fetch(request).then(res => Promise.asyncApply(() => {
    const content = Promise.await(res.text());
    const response = {};
    response.statusCode = res.status;
    response.content = '' + content; // fetch headers don't allow simple read using bracket notation
    // so we iterate their entries and assign them to a new Object

    response.headers = {};

    for (const entry of res.headers.entries()) {
      const [key, val] = entry;
      response.headers[key] = val;
    }

    response.ok = res.ok;
    response.redirected = res.redirected;
    populateData(response);

    if (response.statusCode >= 400) {
      const error = makeErrorByStatus(response.statusCode, response.content);
      callback(error, response);
    } else {
      callback(undefined, response);
    }
  })).catch(err => callback(err));
}

HTTP.call = Meteor.wrapAsync(_call);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"httpcall_common.js":function module(require,exports){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/http/httpcall_common.js                                                                                 //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var MAX_LENGTH = 500; // if you change this, also change the appropriate test

var slice = Array.prototype.slice;

exports.makeErrorByStatus = function (statusCode, content) {
  var message = "failed [" + statusCode + "]";

  if (content) {
    var stringContent = typeof content == "string" ? content : content.toString();
    message += ' ' + truncate(stringContent.replace(/\n/g, ' '), MAX_LENGTH);
  }

  return new Error(message);
};

function truncate(str, length) {
  return str.length > length ? str.slice(0, length) + '...' : str;
} // Fill in `response.data` if the content-type is JSON.


exports.populateData = function (response) {
  // Read Content-Type header, up to a ';' if there is one.
  // A typical header might be "application/json; charset=utf-8"
  // or just "application/json".
  var contentType = (response.headers['content-type'] || ';').split(';')[0]; // Only try to parse data as JSON if server sets correct content type.

  if (['application/json', 'text/javascript', 'application/javascript', 'application/x-javascript'].indexOf(contentType) >= 0) {
    try {
      response.data = JSON.parse(response.content);
    } catch (err) {
      response.data = null;
    }
  } else {
    response.data = null;
  }
};

var HTTP = exports.HTTP = {};
/**
 * @summary Send an HTTP `GET` request. Equivalent to calling [`HTTP.call`](#http_call) with "GET" as the first argument.
 * @param {String} url The URL to which the request should be sent.
 * @param {Object} [callOptions] Options passed on to [`HTTP.call`](#http_call).
 * @param {Function} [asyncCallback] Callback that is called when the request is completed. Required on the client.
 * @locus Anywhere
 * @deprecated
 */

HTTP.get = function ()
/* varargs */
{
  return HTTP.call.apply(this, ["GET"].concat(slice.call(arguments)));
};
/**
 * @summary Send an HTTP `POST` request. Equivalent to calling [`HTTP.call`](#http_call) with "POST" as the first argument.
 * @param {String} url The URL to which the request should be sent.
 * @param {Object} [callOptions] Options passed on to [`HTTP.call`](#http_call).
 * @param {Function} [asyncCallback] Callback that is called when the request is completed. Required on the client.
 * @locus Anywhere
 * @deprecated
 */


HTTP.post = function ()
/* varargs */
{
  return HTTP.call.apply(this, ["POST"].concat(slice.call(arguments)));
};
/**
 * @summary Send an HTTP `PUT` request. Equivalent to calling [`HTTP.call`](#http_call) with "PUT" as the first argument.
 * @param {String} url The URL to which the request should be sent.
 * @param {Object} [callOptions] Options passed on to [`HTTP.call`](#http_call).
 * @param {Function} [asyncCallback] Callback that is called when the request is completed. Required on the client.
 * @locus Anywhere
 * @deprecated
 */


HTTP.put = function ()
/* varargs */
{
  return HTTP.call.apply(this, ["PUT"].concat(slice.call(arguments)));
};
/**
 * @summary Send an HTTP `DELETE` request. Equivalent to calling [`HTTP.call`](#http_call) with "DELETE" as the first argument. (Named `del` to avoid conflict with the Javascript keyword `delete`)
 * @param {String} url The URL to which the request should be sent.
 * @param {Object} [callOptions] Options passed on to [`HTTP.call`](#http_call).
 * @param {Function} [asyncCallback] Callback that is called when the request is completed. Required on the client.
 * @locus Anywhere
 * @deprecated
 */


HTTP.del = function ()
/* varargs */
{
  return HTTP.call.apply(this, ["DELETE"].concat(slice.call(arguments)));
};
/**
 * @summary Send an HTTP `PATCH` request. Equivalent to calling [`HTTP.call`](#http_call) with "PATCH" as the first argument.
 * @param {String} url The URL to which the request should be sent.
 * @param {Object} [callOptions] Options passed on to [`HTTP.call`](#http_call).
 * @param {Function} [asyncCallback] Callback that is called when the request is completed. Required on the client.
 * @locus Anywhere
 * @deprecated
 */


HTTP.patch = function ()
/* varargs */
{
  return HTTP.call.apply(this, ["PATCH"].concat(slice.call(arguments)));
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/http/httpcall_server.js");

/* Exports */
Package._define("http", exports, {
  HTTP: HTTP,
  HTTPInternals: HTTPInternals
});

})();

//# sourceURL=meteor://💻app/packages/http.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvaHR0cC9odHRwY2FsbF9zZXJ2ZXIuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL2h0dHAvaHR0cGNhbGxfY29tbW9uLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydCIsIkhUVFAiLCJIVFRQSW50ZXJuYWxzIiwiTWV0ZW9yIiwibGluayIsInYiLCJmZXRjaCIsIlJlcXVlc3QiLCJVUkwiLCJVUkxTZWFyY2hQYXJhbXMiLCJtYWtlRXJyb3JCeVN0YXR1cyIsInBvcHVsYXRlRGF0YSIsImhhc093biIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiX2NhbGwiLCJtZXRob2QiLCJ1cmwiLCJvcHRpb25zIiwiY2FsbGJhY2siLCJjYWxsIiwiRXJyb3IiLCJ0b1VwcGVyQ2FzZSIsInRlc3QiLCJoZWFkZXJzIiwiY29udGVudCIsImRhdGEiLCJKU09OIiwic3RyaW5naWZ5IiwicGFyYW1zRm9yVXJsIiwicGFyYW1zRm9yQm9keSIsInBhcmFtcyIsIm5ld1VybCIsIl9jb25zdHJ1Y3RVcmwiLCJxdWVyeSIsImF1dGgiLCJpbmRleE9mIiwiYmFzZTY0IiwiQnVmZmVyIiwiZnJvbSIsInRvU3RyaW5nIiwiZW50cmllcyIsImZvckVhY2giLCJrZXkiLCJ2YWx1ZSIsImFwcGVuZCIsImtleXMiLCJjYWNoaW5nIiwiY29yc01vZGUiLCJtb2RlIiwiY3JlZGVudGlhbHMiLCJjYiIsImNhbGxlZCIsImVycm9yIiwicmVzcG9uc2UiLCJmb2xsb3dSZWRpcmVjdHMiLCJyZXF1ZXN0T3B0aW9ucyIsImphciIsInRpbWVvdXQiLCJib2R5IiwicmVkaXJlY3QiLCJyZWZlcnJlciIsImludGVncml0eSIsInJlcXVlc3QiLCJ0aGVuIiwicmVzIiwidGV4dCIsInN0YXR1c0NvZGUiLCJzdGF0dXMiLCJlbnRyeSIsInZhbCIsIm9rIiwicmVkaXJlY3RlZCIsInVuZGVmaW5lZCIsImNhdGNoIiwiZXJyIiwid3JhcEFzeW5jIiwiTUFYX0xFTkdUSCIsInNsaWNlIiwiQXJyYXkiLCJleHBvcnRzIiwibWVzc2FnZSIsInN0cmluZ0NvbnRlbnQiLCJ0cnVuY2F0ZSIsInJlcGxhY2UiLCJzdHIiLCJsZW5ndGgiLCJjb250ZW50VHlwZSIsInNwbGl0IiwicGFyc2UiLCJnZXQiLCJhcHBseSIsImNvbmNhdCIsImFyZ3VtZW50cyIsInBvc3QiLCJwdXQiLCJkZWwiLCJwYXRjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjO0FBQUNDLE1BQUksRUFBQyxNQUFJQSxJQUFWO0FBQWVDLGVBQWEsRUFBQyxNQUFJQTtBQUFqQyxDQUFkO0FBQStELElBQUlDLE1BQUo7QUFBV0osTUFBTSxDQUFDSyxJQUFQLENBQVksZUFBWixFQUE0QjtBQUFDRCxRQUFNLENBQUNFLENBQUQsRUFBRztBQUFDRixVQUFNLEdBQUNFLENBQVA7QUFBUzs7QUFBcEIsQ0FBNUIsRUFBa0QsQ0FBbEQ7QUFBcUQsSUFBSUMsS0FBSixFQUFVQyxPQUFWO0FBQWtCUixNQUFNLENBQUNLLElBQVAsQ0FBWSxjQUFaLEVBQTJCO0FBQUNFLE9BQUssQ0FBQ0QsQ0FBRCxFQUFHO0FBQUNDLFNBQUssR0FBQ0QsQ0FBTjtBQUFRLEdBQWxCOztBQUFtQkUsU0FBTyxDQUFDRixDQUFELEVBQUc7QUFBQ0UsV0FBTyxHQUFDRixDQUFSO0FBQVU7O0FBQXhDLENBQTNCLEVBQXFFLENBQXJFO0FBQXdFLElBQUlHLEdBQUosRUFBUUMsZUFBUjtBQUF3QlYsTUFBTSxDQUFDSyxJQUFQLENBQVksWUFBWixFQUF5QjtBQUFDSSxLQUFHLENBQUNILENBQUQsRUFBRztBQUFDRyxPQUFHLEdBQUNILENBQUo7QUFBTSxHQUFkOztBQUFlSSxpQkFBZSxDQUFDSixDQUFELEVBQUc7QUFBQ0ksbUJBQWUsR0FBQ0osQ0FBaEI7QUFBa0I7O0FBQXBELENBQXpCLEVBQStFLENBQS9FO0FBQWtGLElBQUlKLElBQUos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QixFQUFzQixDQUFDLE9BQUQsRUFBVUMsTUFBVixDQUFpQmQsS0FBSyxDQUFDMUQsSUFBTixDQUFXeUUsU0FBWCxDQUFqQixDQUF0QixDQUFQO0FBQ0QsQ0FGRCxDIiwiZmlsZSI6Ii9wYWNrYWdlcy9odHRwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSAnbWV0ZW9yL21ldGVvcic7XG5pbXBvcnQgeyBmZXRjaCwgUmVxdWVzdCB9IGZyb20gJ21ldGVvci9mZXRjaCc7XG5pbXBvcnQgeyBVUkwsIFVSTFNlYXJjaFBhcmFtcyB9IGZyb20gJ21ldGVvci91cmwnO1xuaW1wb3J0IHsgSFRUUCwgbWFrZUVycm9yQnlTdGF0dXMsIHBvcHVsYXRlRGF0YSB9IGZyb20gJy4vaHR0cGNhbGxfY29tbW9uLmpzJztcblxuZXhwb3J0IHsgSFRUUCB9O1xuY29uc3QgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBAZGVwcmVjYXRlZFxuICovXG5leHBvcnQgY29uc3QgSFRUUEludGVybmFscyA9IHt9O1xuXG4vLyBfY2FsbCBhbHdheXMgcnVucyBhc3luY2hyb25vdXNseTsgSFRUUC5jYWxsLCBkZWZpbmVkIGJlbG93LFxuLy8gd3JhcHMgX2NhbGwgYW5kIHJ1bnMgc3luY2hyb25vdXNseSB3aGVuIG5vIGNhbGxiYWNrIGlzIHByb3ZpZGVkLlxuZnVuY3Rpb24gX2NhbGwgKG1ldGhvZCwgdXJsLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAvLy8vLy8vLy8vIFByb2Nlc3MgYXJndW1lbnRzIC8vLy8vLy8vLy9cblxuICBpZiAoIWNhbGxiYWNrICYmIHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gc3VwcG9ydCAobWV0aG9kLCB1cmwsIGNhbGxiYWNrKSBhcmd1bWVudCBsaXN0XG4gICAgY2FsbGJhY2sgPSBvcHRpb25zO1xuICAgIG9wdGlvbnMgPSBudWxsO1xuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgaWYgKGhhc093bi5jYWxsKG9wdGlvbnMsICdiZWZvcmVTZW5kJykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ09wdGlvbiBiZWZvcmVTZW5kIG5vdCBzdXBwb3J0ZWQgb24gc2VydmVyLicpO1xuICB9XG5cbiAgbWV0aG9kID0gKG1ldGhvZCB8fCAnJykudG9VcHBlckNhc2UoKTtcblxuICBpZiAoIS9eaHR0cHM/OlxcL1xcLy8udGVzdCh1cmwpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1cmwgbXVzdCBiZSBhYnNvbHV0ZSBhbmQgc3RhcnQgd2l0aCBodHRwOi8vIG9yIGh0dHBzOi8vJyk7XG4gIH1cblxuICBjb25zdCBoZWFkZXJzID0ge307XG4gIGxldCBjb250ZW50ID0gb3B0aW9ucy5jb250ZW50O1xuXG4gIGlmIChvcHRpb25zLmRhdGEpIHtcbiAgICBjb250ZW50ID0gSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5kYXRhKTtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9ICdhcHBsaWNhdGlvbi9qc29uJztcbiAgfVxuXG4gIGxldCBwYXJhbXNGb3JVcmw7XG4gIGxldCBwYXJhbXNGb3JCb2R5O1xuXG4gIGlmIChjb250ZW50IHx8IG1ldGhvZCA9PT0gJ0dFVCcgfHwgbWV0aG9kID09PSAnSEVBRCcpIHtcbiAgICBwYXJhbXNGb3JVcmwgPSBvcHRpb25zLnBhcmFtcztcbiAgfVxuICBlbHNlIHtcbiAgICBwYXJhbXNGb3JCb2R5ID0gb3B0aW9ucy5wYXJhbXM7XG4gIH1cblxuICBjb25zdCBuZXdVcmwgPSBVUkwuX2NvbnN0cnVjdFVybCh1cmwsIG9wdGlvbnMucXVlcnksIHBhcmFtc0ZvclVybCk7XG5cbiAgaWYgKG9wdGlvbnMuYXV0aCkge1xuICAgIGlmIChvcHRpb25zLmF1dGguaW5kZXhPZignOicpIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdhdXRoIG9wdGlvbiBzaG91bGQgYmUgb2YgdGhlIGZvcm0gXCJ1c2VybmFtZTpwYXNzd29yZFwiJyk7XG4gICAgfVxuXG4gICAgY29uc3QgYmFzZTY0ID0gQnVmZmVyLmZyb20ob3B0aW9ucy5hdXRoLCAnYXNjaWknKS50b1N0cmluZygnYmFzZTY0Jyk7XG4gICAgaGVhZGVyc1snQXV0aG9yaXphdGlvbiddID0gYEJhc2ljICR7YmFzZTY0fWA7XG4gIH1cblxuICBpZiAocGFyYW1zRm9yQm9keSkge1xuICAgIGNvbnN0IGRhdGEgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gICAgT2JqZWN0LmVudHJpZXMocGFyYW1zRm9yQm9keSkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICBkYXRhLmFwcGVuZChrZXksIHZhbHVlKTtcbiAgICB9KTtcbiAgICBjb250ZW50ID0gZGF0YTtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuaGVhZGVycykge1xuICAgIE9iamVjdC5rZXlzKG9wdGlvbnMuaGVhZGVycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBoZWFkZXJzW2tleV0gPSBvcHRpb25zLmhlYWRlcnNba2V5XTtcbiAgICB9KTtcbiAgfVxuXG4gIGxldCBjYWNoaW5nO1xuICBpZiAob3B0aW9ucy5jYWNoaW5nKSB7XG4gICAgLy8gVE9ETyBpbXBsZW1lbnQgZmV0Y2gtc3BlY2lmaWMgb3B0aW9uc1xuICB9XG5cbiAgbGV0IGNvcnNNb2RlO1xuICBpZiAob3B0aW9ucy5tb2RlKSB7XG4gICAgLy8gVE9ETyBpbXBsZW1lbnQgZmV0Y2gtc3BlY2lmaWMgb3B0aW9uc1xuICB9XG5cbiAgbGV0IGNyZWRlbnRpYWxzO1xuXG4gIC8vIHdyYXAgY2FsbGJhY2sgdG8gYWRkIGEgJ3Jlc3BvbnNlJyBwcm9wZXJ0eSBvbiBhbiBlcnJvciwgaW4gY2FzZVxuICAvLyB3ZSBoYXZlIGJvdGggKGh0dHAgNHh4LzV4eCBlcnJvciwgd2hpY2ggaGFzIGEgcmVzcG9uc2UgcGF5bG9hZClcbiAgY2FsbGJhY2sgPSAoZnVuY3Rpb24gKGNiKSB7XG4gICAgbGV0IGNhbGxlZCA9IGZhbHNlO1xuICAgIHJldHVybiBmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbnNlKSB7XG4gICAgICBpZiAoIWNhbGxlZCkge1xuICAgICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgICBpZiAoZXJyb3IgJiYgcmVzcG9uc2UpIHtcbiAgICAgICAgICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgICAgICB9XG4gICAgICAgIGNiKGVycm9yLCByZXNwb25zZSk7XG4gICAgICB9XG4gICAgfVxuICB9KShjYWxsYmFjayk7XG5cbiAgLy8gaXMgZmFsc2UgaWYgZmFsc2UsIG90aGVyd2lzZSBhbHdheXMgdHJ1ZVxuICBjb25zdCBmb2xsb3dSZWRpcmVjdHMgPSBvcHRpb25zLmZvbGxvd1JlZGlyZWN0cyA9PT0gZmFsc2VcbiAgICA/ICdtYW51YWwnXG4gICAgOiAnZm9sbG93JztcblxuICAvLy8vLy8vLy8vIEtpY2tvZmYhIC8vLy8vLy8vLy9cblxuICAvLyBBbGxvdyB1c2VycyB0byBvdmVycmlkZSBhbnkgcmVxdWVzdCBvcHRpb24gd2l0aCB0aGUgbnBtUmVxdWVzdE9wdGlvbnNcbiAgLy8gb3B0aW9uLlxuXG4gIGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgIG1ldGhvZDogbWV0aG9kLFxuICAgIGNhY2hpbmc6IGNhY2hpbmcsXG4gICAgbW9kZTogY29yc01vZGUsXG5cbiAgICBqYXI6IGZhbHNlLFxuICAgIHRpbWVvdXQ6IG9wdGlvbnMudGltZW91dCxcbiAgICBib2R5OiBjb250ZW50LFxuICAgIHJlZGlyZWN0OiBmb2xsb3dSZWRpcmVjdHMsXG4gICAgcmVmZXJyZXI6IG9wdGlvbnMucmVmZXJyZXIsXG4gICAgaW50ZWdyaXR5OiBvcHRpb25zLmludGVncml0eSxcbiAgICBoZWFkZXJzOiBoZWFkZXJzXG4gIH07XG5cbiAgY29uc3QgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KG5ld1VybCwgcmVxdWVzdE9wdGlvbnMpO1xuXG4gIGZldGNoKHJlcXVlc3QpXG4gICAgLnRoZW4oYXN5bmMgcmVzID0+IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCByZXMudGV4dCgpO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSB7fTtcbiAgICAgIHJlc3BvbnNlLnN0YXR1c0NvZGUgPSByZXMuc3RhdHVzO1xuICAgICAgcmVzcG9uc2UuY29udGVudCA9ICcnICsgY29udGVudDtcblxuICAgICAgLy8gZmV0Y2ggaGVhZGVycyBkb24ndCBhbGxvdyBzaW1wbGUgcmVhZCB1c2luZyBicmFja2V0IG5vdGF0aW9uXG4gICAgICAvLyBzbyB3ZSBpdGVyYXRlIHRoZWlyIGVudHJpZXMgYW5kIGFzc2lnbiB0aGVtIHRvIGEgbmV3IE9iamVjdFxuICAgICAgcmVzcG9uc2UuaGVhZGVycyA9IHt9O1xuICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiByZXMuaGVhZGVycy5lbnRyaWVzKCkpIHtcbiAgICAgICAgY29uc3QgW2tleSwgdmFsXSA9IGVudHJ5O1xuICAgICAgICByZXNwb25zZS5oZWFkZXJzW2tleV0gPSB2YWw7XG4gICAgICB9XG5cbiAgICAgIHJlc3BvbnNlLm9rID0gcmVzLm9rO1xuICAgICAgcmVzcG9uc2UucmVkaXJlY3RlZCA9IHJlcy5yZWRpcmVjdGVkO1xuXG4gICAgICBwb3B1bGF0ZURhdGEocmVzcG9uc2UpO1xuXG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA+PSA0MDApIHtcbiAgICAgICAgY29uc3QgZXJyb3IgPSBtYWtlRXJyb3JCeVN0YXR1cyhcbiAgICAgICAgICByZXNwb25zZS5zdGF0dXNDb2RlLFxuICAgICAgICAgIHJlc3BvbnNlLmNvbnRlbnRcbiAgICAgICAgKTtcbiAgICAgICAgY2FsbGJhY2soZXJyb3IsIHJlc3BvbnNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrKHVuZGVmaW5lZCwgcmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH0pXG4gICAgLmNhdGNoKGVyciA9PiBjYWxsYmFjayhlcnIpKTtcbn1cblxuSFRUUC5jYWxsID0gTWV0ZW9yLndyYXBBc3luYyhfY2FsbCk7XG4iLCJ2YXIgTUFYX0xFTkdUSCA9IDUwMDsgLy8gaWYgeW91IGNoYW5nZSB0aGlzLCBhbHNvIGNoYW5nZSB0aGUgYXBwcm9wcmlhdGUgdGVzdFxudmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuXG5leHBvcnRzLm1ha2VFcnJvckJ5U3RhdHVzID0gZnVuY3Rpb24oc3RhdHVzQ29kZSwgY29udGVudCkge1xuICB2YXIgbWVzc2FnZSA9IFwiZmFpbGVkIFtcIiArIHN0YXR1c0NvZGUgKyBcIl1cIjtcblxuICBpZiAoY29udGVudCkge1xuICAgIHZhciBzdHJpbmdDb250ZW50ID0gdHlwZW9mIGNvbnRlbnQgPT0gXCJzdHJpbmdcIiA/XG4gICAgICBjb250ZW50IDogY29udGVudC50b1N0cmluZygpO1xuXG4gICAgbWVzc2FnZSArPSAnICcgKyB0cnVuY2F0ZShzdHJpbmdDb250ZW50LnJlcGxhY2UoL1xcbi9nLCAnICcpLCBNQVhfTEVOR1RIKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgRXJyb3IobWVzc2FnZSk7XG59O1xuXG5mdW5jdGlvbiB0cnVuY2F0ZShzdHIsIGxlbmd0aCkge1xuICByZXR1cm4gc3RyLmxlbmd0aCA+IGxlbmd0aCA/IHN0ci5zbGljZSgwLCBsZW5ndGgpICsgJy4uLicgOiBzdHI7XG59XG5cbi8vIEZpbGwgaW4gYHJlc3BvbnNlLmRhdGFgIGlmIHRoZSBjb250ZW50LXR5cGUgaXMgSlNPTi5cbmV4cG9ydHMucG9wdWxhdGVEYXRhID0gZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgLy8gUmVhZCBDb250ZW50LVR5cGUgaGVhZGVyLCB1cCB0byBhICc7JyBpZiB0aGVyZSBpcyBvbmUuXG4gIC8vIEEgdHlwaWNhbCBoZWFkZXIgbWlnaHQgYmUgXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCJcbiAgLy8gb3IganVzdCBcImFwcGxpY2F0aW9uL2pzb25cIi5cbiAgdmFyIGNvbnRlbnRUeXBlID0gKHJlc3BvbnNlLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddIHx8ICc7Jykuc3BsaXQoJzsnKVswXTtcblxuICAvLyBPbmx5IHRyeSB0byBwYXJzZSBkYXRhIGFzIEpTT04gaWYgc2VydmVyIHNldHMgY29ycmVjdCBjb250ZW50IHR5cGUuXG4gIGlmIChbJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICd0ZXh0L2phdmFzY3JpcHQnLFxuICAgICAgICdhcHBsaWNhdGlvbi9qYXZhc2NyaXB0JyxcbiAgICAgICAnYXBwbGljYXRpb24veC1qYXZhc2NyaXB0JyxcbiAgICAgIF0uaW5kZXhPZihjb250ZW50VHlwZSkgPj0gMCkge1xuICAgIHRyeSB7XG4gICAgICByZXNwb25zZS5kYXRhID0gSlNPTi5wYXJzZShyZXNwb25zZS5jb250ZW50KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJlc3BvbnNlLmRhdGEgPSBudWxsO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXNwb25zZS5kYXRhID0gbnVsbDtcbiAgfVxufTtcblxudmFyIEhUVFAgPSBleHBvcnRzLkhUVFAgPSB7fTtcblxuLyoqXG4gKiBAc3VtbWFyeSBTZW5kIGFuIEhUVFAgYEdFVGAgcmVxdWVzdC4gRXF1aXZhbGVudCB0byBjYWxsaW5nIFtgSFRUUC5jYWxsYF0oI2h0dHBfY2FsbCkgd2l0aCBcIkdFVFwiIGFzIHRoZSBmaXJzdCBhcmd1bWVudC5cbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byB3aGljaCB0aGUgcmVxdWVzdCBzaG91bGQgYmUgc2VudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbY2FsbE9wdGlvbnNdIE9wdGlvbnMgcGFzc2VkIG9uIHRvIFtgSFRUUC5jYWxsYF0oI2h0dHBfY2FsbCkuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbYXN5bmNDYWxsYmFja10gQ2FsbGJhY2sgdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgcmVxdWVzdCBpcyBjb21wbGV0ZWQuIFJlcXVpcmVkIG9uIHRoZSBjbGllbnQuXG4gKiBAbG9jdXMgQW55d2hlcmVcbiAqIEBkZXByZWNhdGVkXG4gKi9cbkhUVFAuZ2V0ID0gZnVuY3Rpb24gKC8qIHZhcmFyZ3MgKi8pIHtcbiAgcmV0dXJuIEhUVFAuY2FsbC5hcHBseSh0aGlzLCBbXCJHRVRcIl0uY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xufTtcblxuLyoqXG4gKiBAc3VtbWFyeSBTZW5kIGFuIEhUVFAgYFBPU1RgIHJlcXVlc3QuIEVxdWl2YWxlbnQgdG8gY2FsbGluZyBbYEhUVFAuY2FsbGBdKCNodHRwX2NhbGwpIHdpdGggXCJQT1NUXCIgYXMgdGhlIGZpcnN0IGFyZ3VtZW50LlxuICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIHdoaWNoIHRoZSByZXF1ZXN0IHNob3VsZCBiZSBzZW50LlxuICogQHBhcmFtIHtPYmplY3R9IFtjYWxsT3B0aW9uc10gT3B0aW9ucyBwYXNzZWQgb24gdG8gW2BIVFRQLmNhbGxgXSgjaHR0cF9jYWxsKS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFthc3luY0NhbGxiYWNrXSBDYWxsYmFjayB0aGF0IGlzIGNhbGxlZCB3aGVuIHRoZSByZXF1ZXN0IGlzIGNvbXBsZXRlZC4gUmVxdWlyZWQgb24gdGhlIGNsaWVudC5cbiAqIEBsb2N1cyBBbnl3aGVyZVxuICogQGRlcHJlY2F0ZWRcbiAqL1xuSFRUUC5wb3N0ID0gZnVuY3Rpb24gKC8qIHZhcmFyZ3MgKi8pIHtcbiAgcmV0dXJuIEhUVFAuY2FsbC5hcHBseSh0aGlzLCBbXCJQT1NUXCJdLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbn07XG5cbi8qKlxuICogQHN1bW1hcnkgU2VuZCBhbiBIVFRQIGBQVVRgIHJlcXVlc3QuIEVxdWl2YWxlbnQgdG8gY2FsbGluZyBbYEhUVFAuY2FsbGBdKCNodHRwX2NhbGwpIHdpdGggXCJQVVRcIiBhcyB0aGUgZmlyc3QgYXJndW1lbnQuXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gd2hpY2ggdGhlIHJlcXVlc3Qgc2hvdWxkIGJlIHNlbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gW2NhbGxPcHRpb25zXSBPcHRpb25zIHBhc3NlZCBvbiB0byBbYEhUVFAuY2FsbGBdKCNodHRwX2NhbGwpLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2FzeW5jQ2FsbGJhY2tdIENhbGxiYWNrIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIHJlcXVlc3QgaXMgY29tcGxldGVkLiBSZXF1aXJlZCBvbiB0aGUgY2xpZW50LlxuICogQGxvY3VzIEFueXdoZXJlXG4gKiBAZGVwcmVjYXRlZFxuICovXG5IVFRQLnB1dCA9IGZ1bmN0aW9uICgvKiB2YXJhcmdzICovKSB7XG4gIHJldHVybiBIVFRQLmNhbGwuYXBwbHkodGhpcywgW1wiUFVUXCJdLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbn07XG5cbi8qKlxuICogQHN1bW1hcnkgU2VuZCBhbiBIVFRQIGBERUxFVEVgIHJlcXVlc3QuIEVxdWl2YWxlbnQgdG8gY2FsbGluZyBbYEhUVFAuY2FsbGBdKCNodHRwX2NhbGwpIHdpdGggXCJERUxFVEVcIiBhcyB0aGUgZmlyc3QgYXJndW1lbnQuIChOYW1lZCBgZGVsYCB0byBhdm9pZCBjb25mbGljdCB3aXRoIHRoZSBKYXZhc2NyaXB0IGtleXdvcmQgYGRlbGV0ZWApXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gd2hpY2ggdGhlIHJlcXVlc3Qgc2hvdWxkIGJlIHNlbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gW2NhbGxPcHRpb25zXSBPcHRpb25zIHBhc3NlZCBvbiB0byBbYEhUVFAuY2FsbGBdKCNodHRwX2NhbGwpLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2FzeW5jQ2FsbGJhY2tdIENhbGxiYWNrIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIHJlcXVlc3QgaXMgY29tcGxldGVkLiBSZXF1aXJlZCBvbiB0aGUgY2xpZW50LlxuICogQGxvY3VzIEFueXdoZXJlXG4gKiBAZGVwcmVjYXRlZFxuICovXG5IVFRQLmRlbCA9IGZ1bmN0aW9uICgvKiB2YXJhcmdzICovKSB7XG4gIHJldHVybiBIVFRQLmNhbGwuYXBwbHkodGhpcywgW1wiREVMRVRFXCJdLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbn07XG5cbi8qKlxuICogQHN1bW1hcnkgU2VuZCBhbiBIVFRQIGBQQVRDSGAgcmVxdWVzdC4gRXF1aXZhbGVudCB0byBjYWxsaW5nIFtgSFRUUC5jYWxsYF0oI2h0dHBfY2FsbCkgd2l0aCBcIlBBVENIXCIgYXMgdGhlIGZpcnN0IGFyZ3VtZW50LlxuICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIHdoaWNoIHRoZSByZXF1ZXN0IHNob3VsZCBiZSBzZW50LlxuICogQHBhcmFtIHtPYmplY3R9IFtjYWxsT3B0aW9uc10gT3B0aW9ucyBwYXNzZWQgb24gdG8gW2BIVFRQLmNhbGxgXSgjaHR0cF9jYWxsKS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFthc3luY0NhbGxiYWNrXSBDYWxsYmFjayB0aGF0IGlzIGNhbGxlZCB3aGVuIHRoZSByZXF1ZXN0IGlzIGNvbXBsZXRlZC4gUmVxdWlyZWQgb24gdGhlIGNsaWVudC5cbiAqIEBsb2N1cyBBbnl3aGVyZVxuICogQGRlcHJlY2F0ZWRcbiAqL1xuSFRUUC5wYXRjaCA9IGZ1bmN0aW9uICgvKiB2YXJhcmdzICovKSB7XG4gIHJldHVybiBIVFRQLmNhbGwuYXBwbHkodGhpcywgW1wiUEFUQ0hcIl0uY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xufTtcbiJdfQ==
