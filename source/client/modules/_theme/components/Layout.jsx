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
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";

import makeStyles from "@mui/styles/makeStyles";

import MuiThemeDarkx from "/client/configs/muithemedark_pod_controlroom";
import MuiThemeDarkXsss from "/client/configs/muithemedark_pod_spacestation2";
import MuiThemeDark from "/client/configs/muithemedark_pod_controlroom_space";

//
import MuiThemeLight from "/client/configs/muithemelight";
import ListItemIcon from "@mui/material/ListItemIcon";
//import AppToolbar from "./AppToolbarEnkey";
import AppToolbar from "../containers/AppToolbar";

import LanguageItemsList from "./LanguageItemsList";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Meteor } from "meteor/meteor";

// pick a date util library
import MomentUtils from "@date-io/moment";
import DateFnsUtils from "@date-io/date-fns";
import { composeAll, composeWithTracker, useDeps } from "mantra-core-extra";
import Loading from "../../../loading";
import AppVersionDisplay from "./AppVersionDisplay";
import SearchIcon from "@mui/icons-material/Search";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ThemeIconLight from "@mui/icons-material/Brightness4Outlined";
import ThemeIconDark from "@mui/icons-material/Brightness7Outlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutline";
import HelpIcon from "@mui/icons-material/Help";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import DashboardTwoToneIcon from "@mui/icons-material/DashboardTwoTone";
import ListAltTwoToneIcon from "@mui/icons-material/ListAltTwoTone";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
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
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
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
  drawer: {
    zIndex: theme.zIndex.drawer + 2,
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
    zIndex: theme.zIndex.drawer + 1,

    background:
      "linear-gradient(to bottom, rgba(121, 59, 152,0.95) 0%, " +
      "rgba(121, 59, 152,0.66) 70%, rgba(121, 59, 152,.55) 100%)",
  },
});

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

class Layout extends React.Component {
  constructor() {
    super();
    let themeMode = localStorage.getItem("themeMode")
      ? JSON.parse(localStorage.getItem("themeMode"))
      : true;
    const InitialState = {
      navigationIconClicked: false,
      navigationOpen: false,
      chatIconClicked: false,
      callIconClicked: false,
      helpIconClicked: false,
      themeIconClicked: themeMode,
    };

    this.state = InitialState;
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    localStorage.setItem(
      "themeMode",
      JSON.stringify(this.state.themeIconClicked)
    );
  }

  handleNavigation = (state) => {
    this.setState({
      navigationOpen: !this.state.navigationOpen,
    });
  };

  chatIconClicked = () => {
    this.setState({
      chatIconClicked: !this.state.chatIconClicked,
    });
  };

  themeIconClicked = () => {
    this.setState({
      themeIconClicked: !this.state.themeIconClicked,
    });
    localStorage.setItem(
      "themeMode",
      JSON.stringify(!this.state.themeIconClicked)
    );
  };

  callIconClicked = () => {
    this.setState({
      callIconClicked: !this.state.callIconClicked,
    });
  };

  render() {
    const { isAdmin, classes } = this.props;
    const userLoggedIn = !!Meteor.userId();

    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider
          theme={this.state.themeIconClicked ? MuiThemeLight : MuiThemeDark}
        >
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ErrorBoundary>
              <CssBaseline>
                {userLoggedIn ? (
                  <AppToolbar
                    helpIconClicked={this.helpIconClicked}
                    chatIconClicked={this.chatIconClicked}
                    callIconClicked={this.callIconClicked}
                    navigationClicked={this.handleToggle}
                    themeIconClicked={this.themeIconClicked}
                    helpIconClickedState={this.state.helpIconClicked}
                    chatIconClickedState={this.state.chatIconClicked}
                    callIconClickedState={this.state.callIconClicked}
                    themeIconClickedState={this.state.themeIconClicked}
                    navigationOpen={this.navigationOpen}
                    handleNavigation={(state) => this.handleNavigation(state)}
                  />
                ) : null}
                <Drawer
                  // className={classes.drawer}
                  style={{ width: 240, zIndex: 111000 }}
                  open={this.state.navigationOpen}
                  onClose={() => this.handleNavigation(false)}
                >
                  <List style={{ width: 240 }}>{this.menuList()}</List>
                </Drawer>
              </CssBaseline>
              <CssBaseline>
                {React.cloneElement(this.props.content(), {
                  chatIconClicked: this.chatIconClicked,
                  helpIconClicked: this.helpIconClicked,
                  callIconClicked: this.callIconClicked,
                  helpIconClickedState: this.state.helpIconClicked,
                  chatIconClickedState: this.state.chatIconClicked,
                  callIconClickedState: this.state.callIconClicked,
                })}
              </CssBaseline>
            </ErrorBoundary>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </StyledEngineProvider>
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
      this.setState({
        navigationOpen: false,
      });
      FlowRouter.go(value);
    }
  };

  menuList = () => {
    const userLoggedIn = !!Meteor.userId();

    let navigationListElements = [
      userLoggedIn ? (
        <ListItem
          key={_uniqueKey()}
          button
          onClick={() => this.menuElementClicked("/mcc")}
        >
          <ListItemIcon>
            <DashboardOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={i18n.__("Nav_DropDownItem_MCC")} />
        </ListItem>
      ) : null,
      userLoggedIn ? (
        <ListItem
          key={_uniqueKey()}
          button
          onClick={() => this.menuElementClicked("/profile")}
        >
          <ListItemIcon>
            <DashboardOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={i18n.__("Nav_DropDownItem_Profilesettings")} />
        </ListItem>
      ) : null,
      userLoggedIn ? (
        <ListItem
          key={_uniqueKey()}
          button
          onClick={() => this.menuElementClicked("/databrowser")}
        >
          <ListItemIcon>
            <DashboardOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={i18n.__("Nav_DropDownItem_Databrowser")} />
        </ListItem>
      ) : null,
      userLoggedIn ? (
        <ListItem
          key={_uniqueKey()}
          button
          onClick={() => this.menuElementClicked("/suspence")}
        >
          <ListItemIcon>
            <DashboardOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={i18n.__("Nav_DropDownItem_Suspence")} />
        </ListItem>
      ) : null,
      userLoggedIn ? (
        <ListItem
          key={_uniqueKey()}
          button
          onClick={() => this.menuElementClicked("/orderhistory")}
        >
          <ListItemIcon>
            <DashboardOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={i18n.__("Nav_DropDownItem_OrderHistory")} />
        </ListItem>
      ) : null,
      userLoggedIn ? (
        <ListItem
          key={_uniqueKey()}
          button
          onClick={() => this.menuElementClicked("/alarms")}
        >
          <ListItemIcon>
            <DashboardOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={i18n.__("Nav_DropDownItem_Alarmlist")} />
        </ListItem>
      ) : null,
      userLoggedIn ? (
        <ListItem
          key={_uniqueKey()}
          button
          onClick={() => this.menuElementClicked("/chatlines2")}
        >
          <ListItemIcon>
            <ChatOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={i18n.__("Nav_DropDownItem_Livestream")} />
        </ListItem>
      ) : null,
      <ListItem
        key={_uniqueKey()}
        button
        onClick={() => this.menuElementClicked("/about")}
      >
        <ListItemIcon>
          <InfoOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={i18n.__("Nav_DropDownItem_About")} />
      </ListItem>,

      userLoggedIn ? (
        <ListItem
          key={_uniqueKey()}
          button
          onClick={() => this.menuElementClicked("/settings")}
        >
          <ListItemIcon>
            <SettingsOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={i18n.__("Nav_DropDownItem_Settings")} />
        </ListItem>
      ) : null,
      userLoggedIn ? (
        <ListItem
          key={_uniqueKey()}
          button
          onClick={() => this.menuElementClicked("/logout")}
        >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary={i18n.__("Nav_DropDownItem_Logout")} />
        </ListItem>
      ) : null,
      !userLoggedIn ? (
        <ListItem
          key={_uniqueKey()}
          button
          onClick={() => this.menuElementClicked("/login")}
        >
          <ListItemIcon>
            <LockOpenOutlinedIcon />
          </ListItemIcon>
          {i18n.__("Header_Login_Login")}
        </ListItem>
      ) : null,

      // <SettingsItemsList
      //   key={_uniqueKey()}
      //   itemKey={"f"}
      //   themeIconClicked={this.themeIconClicked}
      //   handleNavigation={state => this.handleNavigation(state)}
      //   onItemSelected={() => {
      //     this.setState({ navigationOpen: false });
      //   }}
      // />,
      // <ListItem
      //   key={_uniqueKey()}
      //   button
      //   onClick={() =>
      //     this.setState({ cookieIconClicked: true, navigationOpen: false })
      //   }
      // >
      //   <ListItemIcon>
      //     <InfoOutlinedIcon />
      //   </ListItemIcon>
      //   <ListItemText primary={i18n.__("Label_Content_Cookie")} />
      // </ListItem>,
      <AppVersionDisplay key={_uniqueKey()} />,
    ];
    return navigationListElements;
  };
}

export const composer = ({ context }, onData) => {
  Meteor.call("_users.isAdmin", (error, res) => {
    if (error) {
      DEFCON3 && console.log("Error returned from call to _users.isAdmin");
      console.log(error);
      onData(null, {
        isAdmin: false,
      });
    } else {
      DEFCON3 && console.log("_users.isAdmin: " + res);
      onData(null, {
        isAdmin: res,
      });
    }
  });
};

export const depsMapper = (context) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(Layout);
