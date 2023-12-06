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
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import MuiTheme from "/client/configs/muitheme";
import MuiThemeDark from "/client/configs/muithemedark";
import MuiThemeLight from "/client/configs/muithemelight";
import CssBaseline from "@mui/material/CssBaseline";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import AppNavDrawer from "./AppNavDrawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";

import LanguageItemsList from "./LanguageItemsList";
import Login from "../../_users/components/login/wrapper";

/* theme stuff */
import LoginItemsList from "./LoginListItem";
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
    width: drawerWidth,
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
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigationOpen: false,
      chatIconClicked: false,
      helpIconClicked: false,
    };
  }

  handleNavigation = (state) => {
    this.setState({ navigationOpen: state });
  };
  handleElementSelected = (event, value) => {
    FlowRouter.go(value);
  };

  render() {
    //const muiTheme2 =   getMuiTheme(lightBaseTheme);
    const muiTheme = MuiTheme;

    const isLoginContent =
      (FlowRouter.current().route.name || "").indexOf("users.") > -1;

    DEFCON3 && console.log("GUEST MAIN LAYOUT ...");

    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider
          theme={this.state.themeIconClicked ? MuiThemeLight : MuiThemeDark}
        >
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ErrorBoundary>
              <CssBaseline>
                <div
                  className={
                    isLoginContent ? "tri-not-loggedin" : "tri-content-open"
                  }
                >
                  {/* <IconButton
              onClick={() => this.handleNavigation(true)}
              className={
                this.state.navigationOpen ? "menu-icon-clicked" : "menu-icon"
              }
              size="large"
            >
              <MenuIcon nativecolor="rgba(156,39,176,0.88)" />
            </IconButton> */}

                  {this.getContent(isLoginContent)}

                  {/* <Drawer
              style={{ width: 240, zIndex: 111000 }}
              open={this.state.navigationOpen}
              onClose={() => this.handleNavigation(false)}
            >
              <List
                onItemSelected={(event, value) => {
                  this.setState(
                    {
                      navigationOpen: false,
                    },
                    () => this.handleElementSelected(event, value)
                  );
                }}
                key="1"
              >
                <LanguageItemsList key="2" itemKey="2" />
                <LoginItemsList key="3" itemKey="3" />
              </List>
            </Drawer> */}
                </div>
              </CssBaseline>
            </ErrorBoundary>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    );
  }
  getContent(isLoginContent) {
    return isLoginContent ? (
      <div className="xsplash">{this.props.content()}</div>
    ) : (
      <div className="content-container">{this.props.content()}</div>
    );
  }
}
