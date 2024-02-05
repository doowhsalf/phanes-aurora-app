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

function _isStringValue(value) {
  return typeof value === "string" || value instanceof String;
}

export function getField(row, field) {
  if (row) {
    return row[field];
  }
  return "";
}

export function getFieldBoolean(row, field) {
  if (row) {
    if (row[field]) return "true";
  }
  return "false";
}
export function getFieldDate(row, field) {
  if (row) {
    if (getField(row, field)) {
      let dateStr = getField(row, field);

      return !_isStringValue(dateStr)
        ? dateStr.toISOString().slice(0, 10)
        : dateStr.substr(0, 10);
    }
  }
  return "";
}

export function getFieldDateTime(row, field) {
  if (row) {
    if (getField(row, field)) {
      let dateStr = getField(row, field);
      DEFCON5 && console.log("Datestring");
      DEFCON5 && console.log(dateStr);

      return dateStr;
      // return !_isStringValue(dateStr)
      //   ? dateStr.toISOString().slice(0, 10) +
      //       dateStr.toISOString().slice(12, 5)
      //   : dateStr.substr(0, 10) + dateStr.substr(12, 5);
    }
  }
  return "";
}

export function getFieldObject(row, entityObject, field) {
  if (row) {
    return row[entityObject][field];
  }
  return "";
}

export function getFieldObjectDetailed(row, entityObject, field, detailed) {
  //   DEFCON4 && console.log("getFieldObjectDetailed");
  //   DEFCON4 && console.log(entityObject);
  if (row) {
    return row[entityObject][field][detailed];
  }
  return "";
}
