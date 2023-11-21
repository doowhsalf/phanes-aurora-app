import {Mongo} from 'meteor/mongo';
import * as Collections from '/lib/collections';
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1
} from "/package.json";

export default function () {
  DEFCON5 && console.log("Getting the terms in initial_countries... ");

  Meteor.call("orders.getTerms", "pep_country", (err, result) => {
    if (!err) {
      DEFCON5 && console.log("Result in client to handle ");
      DEFCON5 && console.log(result);

      result.taxonomies.forEach(t => {
        Collections.Countries.insert({name: t.name});
      });


    }
  });


}
