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
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import i18n from "meteor/universe:i18n";
import Log from "../../../../lib/log.js";

export default class LanguageItemsList extends React.Component {
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

  render() {
    const { itemKey } = this.props;

    return (
      <div key={itemKey}>
        <ListItem key={itemKey} onClick={this.handleClick}>
          <ListItemText
            primary={i18n.__("Label_OpenOrderListItem_Languages")}
          />{" "}
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              key={"en"}
              onClick={(event) => this._onLocaleClicked("en")}
            >
              <ListItemText
                inset
                primary={i18n.__("Nav_DropDownItem_English")}
              />
            </ListItem>
            <ListItem
              button
              key={"sv"}
              onClick={(event) => this._onLocaleClicked("sv")}
            >
              <ListItemText
                inset
                primary={i18n.__("Nav_DropDownItem_Swedish")}
              />
            </ListItem>
            <ListItem
              button
              key={"da"}
              onClick={(event) => this._onLocaleClicked("da")}
            >
              <ListItemText
                inset
                primary={i18n.__("Nav_DropDownItem_Danish")}
              />
            </ListItem>
            <ListItem
              button
              key={"fi"}
              onClick={(event) => this._onLocaleClicked("fi")}
            >
              <ListItemText
                inset
                primary={i18n.__("Nav_DropDownItem_Finnish")}
              />
            </ListItem>
            <ListItem
              button
              key={"no"}
              onClick={(event) => this._onLocaleClicked("no")}
            >
              <ListItemText
                inset
                primary={i18n.__("Nav_DropDownItem_Norweigan")}
              />
            </ListItem>
          </List>
        </Collapse>
      </div>
    );
  }

  _onLocaleClicked(locale, e) {
    DEFCON7 && console.log("Setting locale " + locale);
    DEFCON7 && console.log(locale);
    try {
      Log.info(`Setting locale ${locale}`);
      i18n
        .setLocale(locale)
        .then(Log.info(`Locale ${locale} set`))
        .catch((error) => {
          DEFCON7 && console.log(error);
          Log.info(error);
        });
    } catch (error) {
      DEFCON7 && console.log(error);
      Log.info(error);
    }

    const onItemSelected = this.props.onItemSelected;
    if (onItemSelected) {
      onItemSelected();
    }
  }
}
