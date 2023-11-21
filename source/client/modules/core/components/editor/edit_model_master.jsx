import React from "react";
import {
  DEFCON5,
} from "/debug.json";
import PropTypes from "prop-types";
import withStyles from "@mui/styles/withStyles";


import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/sv";
import { _getLogoUrl } from "../helpers/app-logo";
// add icons for menu
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import Typography from "@mui/material/Typography";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";

//import EditModel from "./archive/edit_model";
import EditModelRender from "./edit_model_render";
TimeAgo.locale(en);
const drawerWidth = 240;
function _uniqueKey() {
  return Math.random() * Math.random();
}
const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    top: "auto",
    bottom: 0,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.white,
  },
  inline: {
    display: "inline",
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  paper: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  BottomNavigation: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  cardDark: {
    marginRight: theme.spacing(0),
    minHeight: 72,
    backgroundColor: "rgba(29, 30, 31,1)",
  },
  cardLight: {
    marginRight: theme.spacing(0),
    minHeight: 72,
  },

  MccWindow: { overflow: "auto" },
  MccLineText: {
    backgroundColor: theme.palette.secondary.light,
    padding: 0,
    marginLeft: 10,
    borderRadius: 5,
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    height: "calc(100vh - 75px)",
    backgroundColor: theme.palette.background.default,
  },
  channelList: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    borderRight: "1px solid",
    borderImage:
      "linear-gradient( to bottom, " +
      theme.palette.secondary.light +
      ", rgba(0, 0, 0, 0)) 1 100%",
    marginRight: 0,
    padding: theme.spacing(0),
    [theme.breakpoints.down("xl")]: {
      display: "none",
    },
    [theme.breakpoints.up("sm")]: {
      minWidth: 270,
      maxWidth: 270,
    },
    [theme.breakpoints.up("md")]: {
      minWidth: 270,
      maxWidth: 270,
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  mcc: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  cardTransparent: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, " +
      "rgba(0,0,0,0.77) 34%, rgba(0,0,0,0.66) 55%)",
  },
  MccDark: {
    display: "flex",
    flex: 3,
    flexDirection: "column",
    backgroundColor: "rgba(29, 30, 31,1)",
    // borderWidth: "1px",
    // borderColor: "#ccc",
    // borderRightStyle: "solid",
    // borderLeftStyle: "solid",
  },
  MccLight: {
    display: "flex",
    flex: 3,
    flexDirection: "column",
    // borderWidth: "1px",
    // borderColor: "#ccc",
    // borderRightStyle: "solid",
    // borderLeftStyle: "solid",
  },

  textEditArea: {
    position: "fixed",
    // [theme.breakpoints.down("xs")]: {
    //   width: "calc(100vh - 290px)",
    // },
    // [theme.breakpoints.up("sm")]: {
    //   width: "calc(100vh - 350px)",
    // },
    // [theme.breakpoints.up("md")]: {
    //   width: "calc(100vh - 350px)",
    //   width: "100%",
    // },
    width: "100%",

    bottom: 0,
    // backgroundColor: "red",
    padding: theme.spacing(1),
  },
});

class EditModelMaster extends React.Component {
  constructor(props) {
    DEFCON5 && console.log("In EditModelMaster constructor...");
    super(props);
    this.state = {
      line: "",
      error: undefined,
      saving: false,
      selectedIndex: 1,
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div style={{ marginTop: 70 }}>
        <div className={classes.container}>
          <EditModelRender />
        </div>
      </div>
    );
  }
}

EditModelMaster.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditModelMaster);
