(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;

/* Package-scope variables */
var JSZip;

(function(){

/////////////////////////////////////////////////////////////////////////////
//                                                                         //
// packages/udondan_jszip/packages/udondan_jszip.js                        //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////
                                                                           //
(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/udondan:jszip/lib/saveas.js                              //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
JSZip = Npm.require("jszip");                                        // 1
                                                                     // 2
JSZip.prototype.saveAs = function(name, callback) {                  // 3
  var fs = Npm.require('fs');                                        // 4
  fs.writeFile(                                                      // 5
    name,                                                            // 6
    this.generate({type: "nodebuffer"}),                             // 7
    function(error) {                                                // 8
      if (error) {                                                   // 9
        if(typeof callback === "function") {                         // 10
          callback(error, -1);                                       // 11
        } else {                                                     // 12
          throw error;                                               // 13
        }                                                            // 14
      } else {                                                       // 15
        typeof callback === "function" && callback(null, 1);         // 16
      }                                                              // 17
    }                                                                // 18
  );                                                                 // 19
};                                                                   // 20
                                                                     // 21
///////////////////////////////////////////////////////////////////////

}).call(this);

/////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("udondan:jszip", {
  JSZip: JSZip
});

})();
