import Article from "../components/content/article";
import Loading from "../../../loading.js";
import { useDeps, composeWithTracker, composeAll } from "mantra-core-extra";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";
import Constants from "/lib/constants";

DEFCON5 && console.log("In about component, kickstarting stuff");

export const composer = ({ context, contentpart, articleId, close }, onData) => {
  const { Meteor, Collections } = context();
  DEFCON5 && console.log("In article component composer");

  if (Meteor.subscribe("articles.one", articleId).ready()) {
    const Selector = {
      "field_article_id.value": articleId,
      status: "active",
    };
    const articles = Collections.Articles.find(Selector).fetch();
    DEFCON3 && console.log("The article is...");
    DEFCON3 && console.log(articles);

    try {
      onData(null, { articles, contentpart });
    } catch (err) {
      DEFCON5 && console.log(err);
    }
  }
};

export const depsMapper = (context, actions) => ({
  getArticle: actions.content.getArticle,
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(Article);
