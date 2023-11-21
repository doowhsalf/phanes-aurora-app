import chatlinelists from "./chatlinelists";
import order from "./order";
import search from "./search";
import content from "./content";
import filearea from "./filearea";
import accounts from "./accounts";

import { DEFCON5, DEFCON4, DEFCON3, DEFCON2, DEFCON1 } from "/debug.json";

export default { chatlinelists, order, search, content, filearea, accounts };
DEFCON5 && console.log("Index, setting up actions ");
