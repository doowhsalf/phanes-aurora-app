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
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import withStyles from "@mui/styles/withStyles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import SnackBarMessage from "../../fields/snackbar-message";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import i18n from "meteor/universe:i18n";
import DateStringTransformer from "/lib/transformers/dateStringTransformer";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import DebouncedTextField from "../../fields/debouncedtextfield";
import Proxy from "./mcc_podview_meters_proxy";

import { grey } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import BackIcon from "@mui/icons-material/NavigateNext";
import CreateIcon from "@mui/icons-material/Create";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/sv";
import TimeAgoLive from "../../fields/timeagolive/timeagolive";
import sv from "../../fields/timeagolive/timeagolive_sv";
import Toolbar from "@mui/material/Toolbar";
// import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
// import CardContent from "@mui/material/CardContent";
import Drawer from "@mui/material/Drawer";
import Hidden from "@mui/material/Hidden";
import { renderLogo, _getLogoUrl } from "../../helpers/app-logo";

TimeAgo.locale(en);

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
  card: {
    padding: theme.spacing(1),
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
    height: "calc(100vh - 50px)",
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

class MccPodviewDataMaster extends React.Component {
  constructor(props) {
    DEFCON5 && console.log("In McclistComponent constructor...");
    super(props);
    this.state = {
      line: "",
      error: undefined,
      saving: false,
    };
  }

  getAvatar(listItem) {
    return listItem.avatar ? (
      <Avatar src={listItem.avatar} />
    ) : (
      <Avatar>{listItem.name ? listItem.name.substring(0, 2) : "xx"}</Avatar>
    );
  }

  handleNotification(error) {
    if (error === undefined) {
      error = "";
    } else {
      error = error.toString();
    }
    //console.error(error);
    this.setState({ error });
  }
  handleDebouncedChange = (name, value) => {
    this.setState({ [name]: value, success: true });
  };

  onKeyDown = (event) => {
    DEFCON7 && console.log("onKeyDown");
    if (event.keyCode === 13) {
      DEFCON5 && console.log("Pressed the Enter button");
      // this.handleButtonClick();
    }
  };

  render() {
    const { classes, mccConfigs } = this.props;
    const iconButtonElement = (
      <IconButton tooltip="more" tooltipPosition="bottom-left" size="large">
        <MoreVertIcon nativecolor={grey[400]} />
      </IconButton>
    );

    const rightIconMenu = null;

    const { close, readOnly, closeEditMode } = this.props;

    let themeModeDark = localStorage.getItem("themeMode")
      ? JSON.parse(localStorage.getItem("themeMode"))
      : true;

    DEFCON5 && console.log(mccConfigs);

    return (
      <div className={classes.root}>
        <Typography variant="h4">Sensor mapping definitions</Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Paper className={classes.card}>
              <DebouncedTextField
                id="filter"
                label={i18n.__("Entity_Label_Filter")}
                className={classes.textField}
                value={this.state.firstName}
                onChange={(value) =>
                  this.handleDebouncedChange("filter", value)
                }
                onKeyDown={this.onKeyDown}
                fullWidth
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={12}>
            <Paper className={classes.card}>
              <Proxy searchText={this.state.filter}></Proxy>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

MccPodviewDataMaster.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MccPodviewDataMaster);
