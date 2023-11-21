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
import PropTypes from "prop-types";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import CallIcon from "@mui/icons-material/Call";
import ThemeIconLight from "@mui/icons-material/Brightness4Outlined";
import ThemeIconDark from "@mui/icons-material/Brightness7Outlined";
import AdbIcon from "@mui/icons-material/Adb";

import HelpIcon from "@mui/icons-material/Help";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AppConfig from "/client/configs/app";
import Icon from "@mui/material/Icon";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import SearchIcon from "@mui/icons-material/Search";
import { alpha } from "@mui/material/styles";
import withStyles from "@mui/styles/withStyles";
import LanguageItemsList from "./LanguageItemsList";
import ContactDialog from "../containers/ContactDialog";
function _uniqueKey() {
  return Math.random() * Math.random();
}

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    width: "100%",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(50),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  // titleBar: {
  //   // background:
  //   //   "linear-gradient(to bottom, " +
  //   //   theme.palette.secondary.dark +
  //   //   " 0%, " +
  //   //   theme.palette.secondary.light +
  //   //   " 70%, " +
  //   //   theme.palette.secondary.light +
  //   //   " 100%)",
  // },
  titleBar: {
    "-webkit-backdrop-filter": "blur(4px)",
    "-o-backdrop-filter": "blur(4px)",
    "-moz-backdrop-filter": "blur(4px)",
    "backdrop-filter": "blur(4px)",
    minHeight: "65px",
    maxHeight: "65px",
    zIndex: theme.zIndex.drawer + 1,
    // background:
    //   theme.palette.mode === "dark"
    //     ? "linear-gradient(to bottom, " +
    //       alpha(theme.palette.primary.dark, 0.9) +
    //       " 0%, " +
    //       alpha(theme.palette.primary.main, 0.55) +
    //       " 100%)"
    //     : "linear-gradient(to bottom, " +
    //       alpha(theme.palette.primary.dark, 0.95) +
    //       " 0%, " +
    //       alpha(theme.palette.primary.main, 0.95) +
    //       " 100%)",
  },
});

class AppToolbar extends React.Component {
  constructor() {
    super();
    this.state = {
      menuAnchor: null,
      navigationOpen: false,
      globalSearch: "",
    };
  }

  handleMenuClick = (event) => {
    this.setState({ menuAnchor: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ menuAnchor: null });
  };

  handleNavigation = (state) => {
    const { handleNavigation } = this.props;
    this.setState({ navigationOpen: state });
    handleNavigation(state);
  };

  onChange = (e) => {
    DEFCON7 && console.log("Search " + e.target.value);
    this.setState({ globalSearch: e.target.value });
  };

  handleClick = () => {
    this.setState({ navigationOpen: false });
  };

  onKeyDown = (e) => {
    if (e.keyCode === 13) {
      DEFCON7 && console.log("Pressed the Enter button");
      let value = "";
      if (this.state.globalSearch.indexOf("#") == 0) {
        DEFCON7 && console.log("order-search...");
        value =
          "/order/" +
          this.state.globalSearch.substr(1, this.state.globalSearch.length - 1);
      } else {
        DEFCON7 && console.log("person-search...");

        value = "/person/" + this.state.globalSearch;
      }

      if (FlowRouter.current().path === value) {
        location.reload();
      } else {
        FlowRouter.go(value);
        location.reload();
      }
    } else {
      DEFCON7 && console.log("other-stuff " + e.keyCode);
    }
  };

  render() {
    const {
      classes,
      callIconClicked,
      themeIconClicked,
      themeIconClickedState,

      callIconClickedState,
      chatIconClickedState,
      email,
      submitQuestion,
    } = this.props;

    let themeIcon = [];
    if (themeIconClickedState) {
      themeIcon = [
        <IconButton
          key={_uniqueKey()}
          color="inherit"
          onClick={themeIconClicked}
          className={themeIconClicked ? "menu-icon-clicked" : "menu-icon"}
          size="large"
        >
          <ThemeIconDark nativecolor="white" />
        </IconButton>,
      ];
    } else {
      themeIcon = [
        <IconButton
          key={_uniqueKey()}
          color="inherit"
          onClick={themeIconClicked}
          className={themeIconClicked ? "menu-icon-clicked" : "menu-icon"}
          size="large"
        >
          <ThemeIconLight nativecolor="white" />
        </IconButton>,
      ];
    }
    return (
      <div>
        <AppBar
          variant="outlined"
          position="fixed"
          className={classes.titleBar}
        >
          <Toolbar>
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="inherit"
                onClick={() => this.handleNavigation(true)}
                className={
                  this.state.navigationOpen ? "menu-icon-clicked" : "menu-icon"
                }
                size="large"
              >
                <MenuIcon nativecolor="white" />
              </IconButton>
              <Typography
                className="app-title"
                variant="subtitle1"
                color="inherit"
                onClick={() => FlowRouter.go("/")}
              >
                {i18n.__("Label_AppName")}
              </Typography>
            </div>
            <div style={{ flexGrow: 1 }} />{" "}
            <Typography type="title" color="inherit">
              {email}
            </Typography>
            {/* This pushes the remaining elements to the right */}
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* ... Your other buttons and icons go here ... */}
              {themeIcon}
              <IconButton
                onClick={this.handleMenuClick}
                color="inherit"
                size="large"
              >
                <AccountCircleIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <ContactDialog
          isOpen={callIconClickedState}
          onClose={callIconClicked}
        />
      </div>
    );
  }

  handleToggle = () =>
    this.setState({
      navigationOpen: !this.state.navigationOpen,
    });
  handleClose = () => this.setState({ navigationOpen: false });

  menuElementClicked = (value) => {
    if (FlowRouter.current().path === value) {
      FlowRouter.reload();
    } else {
      DEFCON7 && console.log("Closing stuff ");
      this.setState({
        navigationOpen: false,
      });
      FlowRouter.go(value);
    }
  };
}

AppToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppToolbar);
