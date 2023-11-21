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

/* stuff to make sorting eaiser */
export function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function stableSort(array, cmp) {
  DEFCON7 && console.log("Before Sort");
  DEFCON7 && console.log(array);
  DEFCON7 && console.log(cmp);

  // check if array is empty and if so return empty array
  if (array  === undefined) {
    return [];
  }

  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    DEFCON7 && console.log("Sort");
    DEFCON7 && console.log(a);
    DEFCON7 && console.log(b);

    if (a[0].priority > b[0].priority) return 1;
    if (a[0].priority < b[0].priority) return -1;

    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  DEFCON7 && console.log("After Sort");
  DEFCON7 && console.log(stabilizedThis.map((el) => el[0]));
  return stabilizedThis.map((el) => el[0]);
}

export function getSorting(order, orderBy) {
  DEFCON7 && console.log("getSorting");
  DEFCON7 && console.log(orderBy);
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}
