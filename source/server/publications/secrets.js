import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Secrets } from "/lib/collections";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";
export default function () {
  DEFCON3 && console.log("Setting up secrets");

  Meteor.publish("secrets.all", function () {
    DEFCON3 && console.log("In the subscribe function");

    // if (!this.userId) {
    //   throw new Meteor.Error(401, "Access denied");
    // }
    this.autorun(function (computation) {
      DEFCON3 && console.log("Subscribing secrets");

      const Selector = {
        status: "active",
      };

      let secrets = Secrets.find(Selector);
      DEFCON3 && console.log(secrets);

      return secrets;
    });
  });
}
