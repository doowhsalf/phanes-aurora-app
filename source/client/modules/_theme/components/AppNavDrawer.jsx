import React, { Component } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import PropTypes from "prop-types";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";

import typography from "/client/configs/typography.js";
import zIndex from "/client/configs/zindex.js";
import spacing from "/client/configs/spacing.js";
import { cyan } from "@mui/material/colors";

import AppConfig from "/client/configs/app";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1
} from "/debug.json";

const styles = {
  logo: {
    cursor: "pointer",
    fontSize: 24,
    color: typography.textFullWhite,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightLight,
    backgroundColor: cyan[500],
    paddingLeft: spacing.desktopGutter,
    marginBottom: 8
  },
  version: {
    paddingLeft: spacing.desktopGutterLess,
    fontSize: 16
  }
};

class AppNavDrawer extends Component {
  constructor() {
    super();
    this.state = {
      drawopen: false
    };
  }
  static propTypes = {
    menuElementClicked: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    style: PropTypes.object
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      drawopen: open
    });
  };

  handleClick = () => {
    this.setState(state => ({
      drawopen: !state.drawopen
    }));
  };

  handleHeaderClick = () => {
    FlowRouter.go("/");
  };

  handleClickAway = () => {
    DEFCON7 && console.log("CLICK AWAY");
    this.setState({
      navigationOpen: false
    });
  };

  render() {
    const { docked, open, style, listElements } = this.props;

    return (
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <Drawer
          style={style}
          open={open}
          onKeyDown={this.toggleDrawer("drawopen", false)}
          onClick={this.toggleDrawer("drawopen", false)}
        >
          <List onKeyDown={this.toggleDrawer("drawopen", false)}>
            {listElements}
          </List>
        </Drawer>
      </ClickAwayListener>
    );
  }
}

export default AppNavDrawer;
