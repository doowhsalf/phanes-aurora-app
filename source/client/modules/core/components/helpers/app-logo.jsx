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

import Image from "material-ui-image";
import { maxWidth } from "@mui/system";
function _uniqueKey() {
  return Math.random() * Math.random();
}

export function renderLogo(
  classes,
  width = 200,
  height = "auto",
  theme = "dark"
) {
  let themeModeDark = localStorage.getItem("themeMode")
    ? JSON.parse(localStorage.getItem("themeMode"))
    : true;

  let logoSource =
    theme === "dark" ? "/images/dark_logo.png" : "/images/light_logo.png";

  const snippet = [
    <div key={_uniqueKey()} className={classes.logo}>
      <img width={width} height={height} src={logoSource} />
    </div>,
  ];
  return snippet;
}

export function _getLogoUrl(classes) {
  let themeModeDark = localStorage.getItem("themeMode")
    ? JSON.parse(localStorage.getItem("themeMode"))
    : true;

  // let logoSource = themeModeDark
  //   ? "/images/dark_logo.png"
  //   : "/images/light_logo.png";

  return logoSource;
}
