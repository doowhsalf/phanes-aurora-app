import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Articles } from "/lib/collections";

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
  DEFCON3 && console.log("Setting up Article stuff");

  Meteor.publish("articles.one", function (articleId) {
    DEFCON3 && console.log("In article  subscribe function");
    check(articleId, String);
    // if (!this.userId) {
    //   throw new Meteor.Error(401, "Access denied");
    // }
    this.autorun(function (computation) {
      DEFCON3 && console.log("Subscribing Article");

      const Selector = {
        "field_article_id.value": articleId,
        status: "active",
      };

      let article = Articles.find(Selector);
      DEFCON3 && console.log(article.fetch());

      return article;
    });
  });
}
