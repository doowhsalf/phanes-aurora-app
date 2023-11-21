import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import Order from "../lib/order.js";
import { Persons, SearchLog } from "/lib/collections";

import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1
} from "/debug.json";
import Constants from "/lib/constants";

DEFCON5 && console.log("In Search server part");

/**
 * query:
 {
      firstName: "",
      lastName: "",
      ssnNumber: "",
      year: "",
      month: "",
      day: "",
      field_pep_countries_list,
      field_pep
      field_rca

}
 **/

export default function() {
  Meteor.methods({
    "search.findPerson"(query) {
      check(query, Object);
      if (!this.userId) {
        throw new Meteor.Error(401, "Access denied");
      }
      DEFCON5 && console.log("search.findPerson ");

      let dbQuery = {};

      const nameElemMatch = { NameType: "Primärt namn" };
      // const rStart = /.*\b/;
      //const rEnd = /\b/;
      // const rStart = /^/;
      //const rEnd = /$/;
      const rStart = /\A/;
      const rStartLastName = /\b/;
      //const rEnd = /\Z.*/;
      //const rStart = /\b/;
      const rEnd = /\b/;
      if (query.firstName) {
        const regex = new RegExp(
          rStart.source + query.firstName.toLowerCase().trim() + rEnd.source,
          "i"
        );
        DEFCON3 &&
          console.dir(
            JSON.stringify(
              rStart.source + query.firstName.toLowerCase().trim() + rEnd.source
            )
          );
        nameElemMatch["FirstName"] = { $regex: regex };
      }

      if (query.lastName) {
        const regex = new RegExp(
          rStartLastName.source + query.lastName.toLowerCase() + rEnd.source,
          "i"
        );
        nameElemMatch["LastName"] = { $regex: regex };
        DEFCON3 &&
          console.dir(
            JSON.stringify(
              rStart.source + query.lastName.toLowerCase() + rEnd.source
            )
          );
      }

      DEFCON3 && console.dir(JSON.stringify(nameElemMatch));

      dbQuery["Names"] = { $elemMatch: nameElemMatch };

      if (query.field_pep === false || query.field_pep === 0) {
        dbQuery["PEP"] = "0";
      }

      if (query.field_rca === false || query.field_rca === 0) {
        dbQuery["RCA"] = "0";
      }

      if (query.year) {
        dbQuery["BirthDateYear"] = query.year;
      }

      if (query.month) {
        dbQuery["BirthDateMonth"] = query.month;
      }

      if (query.day) {
        dbQuery["BirthDateDay"] = query.day;
      }

      if (
        Array.isArray(query.field_pep_countries_list) &&
        query.field_pep_countries_list.length > 0
      ) {
        const filteredCountries = query.field_pep_countries_list
          .filter(
            (item, index) =>
              query.field_pep_countries_list[index] &&
              query.field_pep_countries_list[index].selected === true
          )
          .map(item => item.name);

        dbQuery["PEPCountries.PEPCountryName"] = { $in: filteredCountries };
      } else {
        //no results if no countries selected
        return [];
      }

      let searchBySSN = false;

      if (query.ssnNumber) {
        //the rest doesn't matter if we use ssn
        dbQuery = { "SSNs.CurrentSSN": query.ssnNumber };
        searchBySSN = true;
      }

      if (Object.keys(dbQuery).length === 0) {
        return [];
      }

      DEFCON3 && console.log("DebQuery");
      DEFCON3 && console.dir(JSON.stringify(dbQuery));
      DEFCON3 && console.dir(dbQuery);

      const result = Persons.find(dbQuery).fetch();

      SearchLog.insert({
        UserId: this.userId,
        DateTime: new Date(),
        ResultsReturned: result.length > 0
      });

      DEFCON3 && console.log("search.findPerson done yo");
      DEFCON3 && console.log(JSON.stringify(dbQuery));
      return { list: result, searchBySSN };
    }
  });
}
