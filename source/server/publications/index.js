import _users from "./_users";
import chatlines from "./chatlines";
import chatrooms from "./chatrooms";
import secrets from "./secrets";
import articles from "./articles";
import contents from "./contents";
import workorders from "./workorders";

import mcc from "./mcc_config";
export default function () {
  _users();
  chatlines();
  chatrooms();
  secrets();
  articles();
  mcc();
  contents();
  workorders();
}
