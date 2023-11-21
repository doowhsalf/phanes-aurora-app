import ClientSearch from "../components/clientsearch/clientsearch";
import Loading from "../../../loading.js";
import { useDeps, composeWithTracker, composeAll } from "mantra-core-extra";
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

DEFCON5 && console.log("In ClientSearch component, kickstarting stuff");

export const composer = ({ context, close }, onData) => {
  const { Meteor, Collections } = context();
  DEFCON5 && console.log("In search component composer");

  let orders = [];
  try {
    const countries = Collections.Countries.find({}).fetch();
    onData(null, {
      countries
    });
  } catch (err) {
    DEFCON5 && console.log(err);
  }
};

export const depsMapper = (context, actions) => ({
  queryPerson: actions.order.queryPerson,
  queryPersonAdvanced: actions.order.queryPersonAdvanced,
  queryRoleAdvanced: actions.order.queryRoleAdvanced,
  queryTermsService: actions.order.queryTermsService,
  getTermsService: actions.order.getTermsService,
  queryTermsCountry: actions.order.queryTermsCountry,
  findPerson: actions.search.findPerson,
  getArticle: actions.content.getArticle,

  context: () => context
});

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(ClientSearch);
