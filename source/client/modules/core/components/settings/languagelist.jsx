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
import withStyles from '@mui/styles/withStyles';

import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Flag1 from "react-world-flags";
import Flag from "react-country-flag";
import i18n from "meteor/universe:i18n";
import Log from "../../../../../lib/log.js";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { deepPurple, blue as deepBlue, red } from '@mui/material/colors';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
    minHeight: 30,
  },
  card: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  avatar_rca_single: {
    display: "inline-grid",

    width: 30,
    height: 30,
    color: "#FFFFFF",
    backgroundColor: deepBlue[500],
  },
  avatar_rca_combined: {
    display: "inline-grid",

    width: 30,
    height: 30,
    color: "#FFFFFF",
    marginLeft: -5,
    backgroundColor: deepBlue[500],
  },
  avatar_pep: {
    display: "inline-grid",

    width: 30,
    height: 30,
    color: "#FFFFFF",
    backgroundColor: deepPurple[500],
  },
  avatar_pr: {
    flexGrow: 1,
    width: 30,
    minWidth: 30,
    height: 30,
    color: "#fff",
    backgroundColor: red[500],
  },
  inline: {
    display: "inline-grid",
  },
  textavatar: {
    color: "#fff",
  },
  cropper_combined: {
    width: 30,
    height: 30,
    marginLeft: -5,
    overflow: "hidden",
    position: "relative",
    borderRadius: "50%",
    display: "inline-grid",
  },
  cropper: {
    width: 30,
    height: 30,
    overflow: "hidden",
    position: "relative",
    borderRadius: "50%",
    display: "inline-grid",
  },
  flag: {
    display: "inline",
    margin: "0 auto",
    height: "100%",
    width: "auto",
  },
});

class LanguageItemsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClick = () => {
    this.setState((state) => ({
      open: !state.open,
    }));
  };

  handleClickedLocale(locale, e) {
    DEFCON4 && console.log("Setting locale " + locale);
    DEFCON4 && console.log(locale);
    localStorage.setItem("currentLocal", locale);
    i18n.setLocale(locale);
    //FlowRouter.reload();
    i18n.setLocale(locale);
    localStorage.setItem("currentLocal", locale);
    //FlowRouter.reload();
    DEFCON4 && console.log("Get locale ");
    DEFCON4 && console.log(i18n.getLocale());
    // if (Meteor.userId()) {
    //   DEFCON4 && console.log("Set locale in server ");
    //   Meteor.call("_users.setLanguagePreference", Meteor.userId(), locale);
    // }

    this.props.setLang(locale, this.theResult);
  }

  theResult = (error, results) => {
    DEFCON4 && console.log("Set Languge and refresh stuff...");
    //window.location.reload();
    FlowRouter.reload();
    // var anchor = document.createElement("a");
    // anchor.href = window.location.href;
    // //anchor.target = "_blank";
    // anchor.click();
  };

  //FlowRouter.go("/");
  // try {
  //   Log.info(`Setting locale ${locale}`);
  //   i18n
  //     .setLocale(locale)
  //     .then(Log.info(`Locale ${locale} set`))
  //     .then(localStorage.setItem("currentLocal", locale))
  //     .then(FlowRouter.reload())
  //     .catch(error => {
  //       DEFCON4 && console.log(error);
  //       Log.info(error);
  //     });
  // } catch (error) {
  //   DEFCON4 && console.log(error);
  //   Log.info(error);
  // }

  // const onItemSelected = this.props.onItemSelected;
  // if (onItemSelected) {
  //   onItemSelected();
  // }

  render() {
    const { itemKey, embedded, classes } = this.props;

    return (
      <div key={itemKey}>
        <List component="div" disablePadding>
          <ListItem
            button
            key={"en"}
            onClick={(event) => this.handleClickedLocale("en")}
          >
            <ListItemAvatar>
              <Avatar alt="gb" src="/tri-flags/gb.jpg" />
            </ListItemAvatar>
            <ListItemText primary={i18n.__("Nav_DropDownItem_English")} />
          </ListItem>
          <ListItem
            button
            key={"sv"}
            onClick={(event) => this.handleClickedLocale("sv")}
          >
            <ListItemAvatar>
              <Avatar alt="se" src="/tri-flags/se.jpg" />
            </ListItemAvatar>
            <ListItemText primary={i18n.__("Nav_DropDownItem_Swedish")} />
          </ListItem>
          <ListItem
            button
            key={"da"}
            onClick={(event) => this.handleClickedLocale("da")}
          >
            <ListItemAvatar>
              <Avatar alt="da" src="/tri-flags/da.jpg" />
            </ListItemAvatar>
            <ListItemText primary={i18n.__("Nav_DropDownItem_Danish")} />
          </ListItem>
          <ListItem
            button
            key={"fi"}
            onClick={(event) => this.handleClickedLocale("fi")}
          >
            <ListItemAvatar>
              <Avatar alt="fi" src="/tri-flags/fi.jpg" />
            </ListItemAvatar>
            <ListItemText primary={i18n.__("Nav_DropDownItem_Finnish")} />
          </ListItem>
          <ListItem
            button
            key={"no"}
            onClick={(event) => this.handleClickedLocale("no")}
          >
            <ListItemAvatar>
              <Avatar alt="no" src="/tri-flags/no.jpg" />
            </ListItemAvatar>
            <ListItemText primary={i18n.__("Nav_DropDownItem_Norweigan")} />
          </ListItem>
        </List>
      </div>
    );
  }
}
LanguageItemsList.propTypes = {};

export default withStyles(styles)(LanguageItemsList);

//        .then(window.location.reload())
