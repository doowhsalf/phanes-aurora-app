import React from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";

export function _fixZero(n) {
  // special case if the field is "", in that case the return shall be empty
  if (n == "") return n;
  return n.length > 1 ? "" + n : "0" + n;
}
