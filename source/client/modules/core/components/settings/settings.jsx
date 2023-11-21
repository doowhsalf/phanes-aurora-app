import React from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import Slide from "@mui/material/Slide";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import withStyles from '@mui/styles/withStyles';
import PropTypes from "prop-types";
import SnackBarMessage from "../fields/snackbar-message";
import Paper from "@mui/material/Paper";

import Iframe from "react-iframe";
import { renderGoogleMapCompany } from "../helpers/googlemap-iframe";
import { renderLogo } from "../helpers/app-logo";
import { contactInfo } from "../helpers/contact-info";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import ThemeIconLight from "@mui/icons-material/Brightness4Outlined";
import ThemeIconDark from "@mui/icons-material/Brightness7Outlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Container from "@mui/material/Container";
import SetPW from "../../containers/setpw";
import SetTheme from "./set-theme";
import SetLanguge from "./set-language";

import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

function _uniqueKey() {
  return Math.random() * Math.random();
}

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    marging: theme.spacing(4),
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
    flexGrow: 1,
  },
  dialog: {
    fullWidth: "100%",
  },
  textFieldInput: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  textField: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  iframeBox: {
    marginTop: theme.spacing(2),
    width: "100%",
    height: 600,
  },
  iframe: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    filter: "grayscale(3)",
  },
  textFieldMulti: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  button: {},
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  logo: {
    float: "right",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
});

const initialState = {
  article: [],
  selection: localStorage.getItem("settingsSelection")
    ? JSON.parse(localStorage.getItem("settingsSelection"))
    : 0,
};
function TabTheme(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      component="div"
      role="TabTheme"
      hidden={value !== index}
      id={`simple-TabTheme-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <SetTheme {...other} />
    </div>
  );
}

function TabLanguage(props) {
  const { setLang, children, value, index, ...other } = props;
  return (
    <div
      component="div"
      role="TabTheme"
      hidden={value !== index}
      id={`simple-TabTheme-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <SetLanguge setLang={setLang} embedded={true} />
    </div>
  );
}

function TabSetPW(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      component="div"
      role="TabTheme"
      hidden={value !== index}
      id={`simple-TabTheme-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <SetPW embedded={true} />
    </div>
  );
}
class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleSnackbarClose = () => {
    this.setState({
      openSnackbar: false,
    });
  };
  handleChange = (event, newValue) => {
    this.setState({ selection: newValue });
    localStorage.setItem("settingsSelection", JSON.stringify(newValue));
  };
  render() {
    const { classes } = this.props;
    const {} = this.state;

    const header = [
      <div key={_uniqueKey()}>
        <Typography variant={"h3"}>Settings</Typography>
      </div>,
    ];

    return (
      <div style={{ marginTop: 100 }}>
        <Container maxWidth="md">
          <Grid container={true} spacing={2}>
            <Grid item={true} xs={12} sm={12} md={12} lg={12}>
              <Paper className={classes.paper}>
                <Tabs
                  value={this.state.selection}
                  onChange={this.handleChange}
                  indicatorColor="secondary"
                  textColor="secondary"
                >
                  <Tab
                    icon={<LockOpenIcon />}
                    label={i18n.__("Nav_DropDownItem_ChangePassword")}
                  />{" "}
                  <Tab
                    icon={<LanguageIcon />}
                    label={i18n.__("Label_OpenOrderListItem_Languages")}
                  />
                  <Tab
                    icon={<ThemeIconDark />}
                    label={i18n.__("Nav_DropDownItem_Darkmode")}
                  />
                </Tabs>
              </Paper>
            </Grid>
            <Grid item={true} xs={12} sm={12} md={12} lg={12}>
              <TabSetPW value={this.state.selection} index={0}></TabSetPW>
              <TabLanguage
                value={this.state.selection}
                index={1}
                setLang={this.props.setLang}
              ></TabLanguage>
              <TabTheme value={this.state.selection} index={2}></TabTheme>
            </Grid>
          </Grid>
        </Container>
        <SnackBarMessage
          open={this.state.openSnackbar}
          handleSnackbarClose={this.handleSnackbarClose}
          variant="info"
          message={this.state.snackbarMessage}
        />
      </div>
    );
  }
}

Settings.propTypes = {};

export default withStyles(styles)(Settings);
