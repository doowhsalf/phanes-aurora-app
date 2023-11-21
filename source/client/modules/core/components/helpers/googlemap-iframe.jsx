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
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import withStyles from '@mui/styles/withStyles';
import PropTypes from "prop-types";
import SnackBarMessage from "../../../core/components/fields/snackbar-message";
import Container from "@mui/material/Container";

import Iframe from "react-iframe";
function _uniqueKey() {
  return Math.random() * Math.random();
}

{
  /* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2037.672237401222!2d18.00279235230268!3d59.28832838155445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f77a8221828f7%3A0x7b6674a3074df04e!2sFolkparksv%C3%A4gen%2093%2C%20126%2077%20H%C3%A4gersten!5e0!3m2!1ssv!2sse!4v1604011377986!5m2!1ssv!2sse" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe> */
}

const generatedKey = _uniqueKey();

export function renderGoogleMap(classes, embedCode) {
  const iframeGoogle = [
    <div className={classes.iframeBox} key={generatedKey}>
      <Iframe
        url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2028.290049473407!2d18.116054277881567!3d59.444914501762625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9b0e8651f50f%3A0xa7444d5a7eae52aa!2sPropellerv%C3%A4gen%208B%2C%20183%2062%20T%C3%A4by!5e0!3m2!1ssv!2sse!4v1692914040126!5m2!1ssv!2sse"
        width="100%"
        height="100%"
        id="googlemaps"
        className={classes.iframe}
        display="initial"
        position="relative"
        frameBorder="0"
        style="border:0, filter: grayscale(3) "
        allowfullscreen="false"
      />
    </div>,
  ];
  return iframeGoogle;
}

export function renderGoogleMapCompany(classes) {
  const embedCode =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2028.290049473407!2d18.116054277881567!3d59.444914501762625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9b0e8651f50f%3A0xa7444d5a7eae52aa!2sPropellerv%C3%A4gen%208B%2C%20183%2062%20T%C3%A4by!5e0!3m2!1ssv!2sse!4v1692914040126!5m2!1ssv!2sse";
  return renderGoogleMap(classes, embedCode);
}
/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2028.290049473407!2d18.116054277881567!3d59.444914501762625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9b0e8651f50f%3A0xa7444d5a7eae52aa!2sPropellerv%C3%A4gen%208B%2C%20183%2062%20T%C3%A4by!5e0!3m2!1ssv!2sse!4v1692914040126!5m2!1ssv!2sse" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */