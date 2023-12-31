import _users from "./_users";
import chatlinelists from "./chatlinelists";
import orders from "./orders";
import search from "./search";
import log from "./log";
import contact from "./contact";
import content from "./content";
import filearea from "./filearea";
import account from "./account";
import sycorax from "./sycorax";
import nodes from "./nodes";
import chatrooms from "./chatrooms";
import events from "./events";

export default function() {
  _users();
  chatlinelists();
  orders();
  search();
  contact();
  content();
  filearea();
  account();
  sycorax();
  nodes();
  chatrooms();
  events();
}
