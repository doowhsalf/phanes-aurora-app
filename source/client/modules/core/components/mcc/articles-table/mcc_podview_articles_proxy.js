import NodesTableData from "./mcc_podview_articles_table.jsx";
import Loading from "/client/loading.js";
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

DEFCON5 && console.log("In meters ");
/* 
    searchText={this.state.filter}
                statusFilters={this.statusFilters}
                typeOfArticleFilters={this.typeOfArticleFilters}
}*/
export const composer = (
  { context, searchText, statusFilters, typeOfArticleFilters },
  onData
) => {
  const { Meteor, Collections } = context();
  DEFCON5 &&
    console.log(
      "Incomming filter data: ",
      searchText,
      statusFilters,
      typeOfArticleFilters
    );

  const filterArticles = (
    articles,
    searchText = "",
    statusFilters = {},
    typeOfArticleFilters = {}
  ) => {
    // Convert filter objects to arrays of active filter names
    const activeStatusFilters = Object.keys(statusFilters).filter(
      (key) => statusFilters[key]
    );
    const activeTypeOfArticleFilters = Object.keys(typeOfArticleFilters).filter(
      (key) => typeOfArticleFilters[key]
    );

    return articles.filter((article) => {
      // Apply status filter if any status filter is active
      const statusMatch =
        !activeStatusFilters.length ||
        activeStatusFilters.includes(
          article.status.toLowerCase().replace(/\s/g, "")
        );
      // Apply type of article filter if any type of article filter is active
      const typeOfArticleMatch =
        !activeTypeOfArticleFilters.length ||
        activeTypeOfArticleFilters.includes(
          article.typeOfArticle.toLowerCase().replace(/\s/g, "")
        );
      // Apply text search filter
      const regex = new RegExp(searchText, "i");
      // Simplify search string creation
      const searchString = `${article.revisions
        ?.map(
          (rev) =>
            `${rev.description} ${rev.title} ${rev.body} ${rev.subheader} ${rev.summary}`
        )
        .join(" ")} ${article._id} ${article.ingress} ${article.status} ${
        article.language
      } ${article.originalLanguage} ${article.title} ${article.body} ${
        article.subheader
      } ${article.weight} ${article.articleCode} ${article.typeOfArticle} ${
        article.contentType
      } ${article.nid}`;
      // Return articles that match all active filters
      return statusMatch && typeOfArticleMatch && regex.test(searchString);
    });
  };

  if (Meteor.subscribe("contents.all").ready()) {
    const articles = Collections.Contents.find({}).fetch();
    const filteredArticles = filterArticles(
      articles,
      searchText,
      statusFilters,
      typeOfArticleFilters
    );
    onData(null, { nodeConfigs: filteredArticles });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(NodesTableData);
