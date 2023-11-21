import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import fetch from "node-fetch";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";

export default  function () {
  Meteor.methods({
    "sycorax.dynamic.async": function (context) {
      check(context, String);
      DEFCON3 && console.log("sycorax.dynamic.async");
      DEFCON3 && console.log(context);

      // Assuming "processLdapLogin" exists somewhere else ...
      var _doFetchSync = Meteor.wrapAsync(_doFetch2);
      var data = _doFetch(context);
      DEFCON3 && console.log("Reply data to Host");
      DEFCON3 && console.log(data);
      return data;
    },
    "sycorax.dynamic"(context) {
      // if (!this.userId) {
      //   throw new Meteor.Error(401, "Access denied");
      // }
      check(context, String);
      DEFCON3 && console.log("sycorax.dynamic");
      DEFCON3 && console.log(context);

      DEFCON3 && console.log("Making request to Sycorax");
       _doFetch(context).then((data) => {
        DEFCON3 && console.log("Reply data to Host");
        DEFCON3 && console.log(data);
        return data;
      });

      DEFCON3 && console.log("Did the request to Sycorax");
    },
  });
}

async function _doFetch(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function _doFetch2(context) {
  fetch(context, {})
    .then((response) => response.json())
    .then((data) => {
      DEFCON3 && console.log("Reply data");
      DEFCON3 && console.log(data);
      return data;
    });
}
