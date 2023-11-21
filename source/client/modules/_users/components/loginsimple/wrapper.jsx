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
import i18n from "meteor/universe:i18n";
import dataComposer from "../../composers/account/login.jsx";
import Component from "./_form.jsx";
import Typography from "@mui/material/Typography";
import withStyles from "@mui/styles/withStyles";
const Container = dataComposer(Component);
import Link from "@mui/material/Link";
import PropTypes from "prop-types";
import AppConfig from "/client/configs/app";
import { createTheme } from "@mui/material/styles";
import { isWithinInterval } from "date-fns";

function hexToRGBA(hex, alpha) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// make a background color that shift from dark purple to light purple dynamically

const styles = (theme) => ({
  link: {
    marginTop: theme.spacing(2),
    float: "right",
  },

  login_page: { marginRight: theme.spacing(1) },

  login_container: {
    color: "white",
    border: "1px solid rgba(255, 255, 255, 0.21)",
    width: 480,
    margin: "auto",
    animation:
      "cab-colorShift 100s linear infinite, cab-opacityChange 60s alternate infinite, cab-blurChange 60s alternate infinite ", // Add the float animation
    borderRadius: 3,
    padding: 15,
    
    overflow: "hidden",
    /* Adjust the duration, timing, and other properties as needed */
    background: "linear-gradient(90deg,#552393 5%,  #1A0B2E 50%,#552393 100%)",
    backgroundSize: "200% 100%",
    // Apply a blur effect to the background
    // backdropFilter: "blur(48)", // You can adjust the px value to increase/decrease the blur effect
    // WebkitBackdropFilter: "blur(148px)", // For Safari compatibility
    // "-webkit-backdrop-filter": "blur(148px)",
    // "-o-backdrop-filter": "blur(148px)",
    // "-moz-backdrop-filter": "blur(148px)",
    // "backdrop-filter": "blur(148px)",
  },
});

class UserLogin extends React.Component {
  constructor(props) {
    //console.log("In OrderComponent constructor...");
    super(props);
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.login_page}>
        <div className={classes.login_container}>
          <Typography variant="subtitle1" gutterBottom>
            {i18n.__("Header_Login_Login")}
          </Typography>
          <Typography variant="caption" gutterBottom>
            {i18n.__("Header_Login_EnterHint")}
          </Typography>

          <Container />
          <Typography variant="caption" gutterBottom className={classes.link}>
            {AppConfig.version + " " + AppConfig.version_build_date}
          </Typography>
        </div>
      </div>
    );
  }
}
UserLogin.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(UserLogin);
/*
 <div className="tri-login">
        <div className="bs-docs-section clearfix">
          <div className="ibox-content">
            <div className="ibox-header" />*/
