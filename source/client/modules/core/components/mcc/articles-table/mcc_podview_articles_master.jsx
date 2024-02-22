import React from "react";
import { DEFCON7, DEFCON5 } from "/debug.json";
import PropTypes from "prop-types";
import withStyles from "@mui/styles/withStyles";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import i18n from "meteor/universe:i18n";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import DebouncedTextField from "../../fields/debouncedtextfield";
import Proxy from "./mcc_podview_articles_proxy";

import { grey } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/sv";
// import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
// import CardContent from "@mui/material/CardContent";
import { _getLogoUrl } from "../../helpers/app-logo";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";

TimeAgo.locale(en);

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  tagsStatus: {
    color: theme.palette.secondary.light,
    "&.Mui-checked": {
      // Style for checked state
      color: theme.palette.secondary.light,
    },
  },
  tagsTypeOfArticle: {
    color: theme.palette.primary.main, // Default color
    "&.Mui-checked": {
      // Style for checked state
      color: theme.palette.primary.main,
    },
  },
  customCheckbox: {
    color: theme.palette.primary.main, // Default color
    "&.Mui-checked": {
      // Style for checked state
      color: theme.palette.secondary.main,
    },
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
      statusFilters: {
        active: false,
        archived: false,
      },
      typeOfArticleFilters: {},
      loading: true,
    };
  }
  componentDidMount() {
    this.initializeFilters();
  }

  // Assuming this function fetches or receives your articles data
  initializeFilters = () => {
    Meteor.call("content.getTypeOfArticles", (error, response) => {
      if (error) {
        console.error("Error getting the type of articles:", error);
      } else {
        // Assuming the server returns an array of distinct types
        // Convert the array to an object with keys as the typeOfArticles and values as false (unchecked)
        const filters = response.reduce((acc, type) => {
          acc[type] = false; // Initialize each filter as unchecked
          return acc;
        }, {});

        this.setState({
          typeOfArticleFilters: filters,
        });
        // get the saved filters from the SystemConfig
        // the key shall using user id + articleFilters
        let key = Meteor.userId() + ".articleFilters";
        Meteor.call("systemconfig.get", key, (error, response) => {
          if (error) {
            console.error("Error getting the system config:", error);
          } else {
            this.setState({
              ...response,
              loading: false, // Data loaded, stop loading
            });
          }
        });
      }
    });
  };

  toggleFilter = (filterType, value) => {
    DEFCON5 && console.log("Toogle filter: ", filterType, value);

    this.setState((prevState) => ({
      ...prevState,
      [filterType]: {
        ...prevState[filterType],
        [value]: !prevState[filterType][value],
      },
    }));
    // save the selected filter to the SystemConfig
    // the key shall using user id + articleFilters
    DEFCON5 && console.log("Save filter: ", filterType, value);

    let key = Meteor.userId() + ".articleFilters";

    // set fields to update to the current state but with the updated filter
    const fieldsToUpdate = {
      [filterType]: {
        ...this.state[filterType],
        [value]: !this.state[filterType][value],
      },
    };
    Meteor.call("systemconfig.put", key, fieldsToUpdate, (error, response) => {
      if (error) {
        console.error("Error updating the system config:", error);
      }
    });
  };

  renderFilters = () => {
    const { statusFilters, typeOfArticleFilters, loading } = this.state;
    const { classes } = this.props;
    if (loading) {
      return null;
    }
    // Wrap the entire filters section in a Grid container
    return (
      <Grid container justifyContent="flex-end" spacing={2}>
        {/* Status Filters Block */}
        <Grid item>
          <Typography
            variant="caption"
            style={{ fontSize: 8, textTransform: "uppercase" }}
          >
            Status
          </Typography>
          <FormGroup row>
            {Object.keys(statusFilters).map((status) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={statusFilters[status]}
                    onChange={() => this.toggleFilter("statusFilters", status)}
                    name={status}
                    className={classes.tagsStatus}
                  />
                }
                label={status.charAt(0).toUpperCase() + status.slice(1)}
                key={status}
              />
            ))}
          </FormGroup>
        </Grid>

        {/* Type Of Article Filters Block */}
        <Grid item>
          <Typography
            variant="caption"
            style={{ fontSize: 8, textTransform: "uppercase" }}
          >
            Type of Article
          </Typography>
          <FormGroup row>
            {Object.keys(typeOfArticleFilters).map((typeOfArticle) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={typeOfArticleFilters[typeOfArticle]}
                    onChange={() =>
                      this.toggleFilter("typeOfArticleFilters", typeOfArticle)
                    }
                    name={typeOfArticle}
                    className={classes.tagsTypeOfArticle}
                  />
                }
                label={typeOfArticle}
                key={typeOfArticle}
              />
            ))}
          </FormGroup>
        </Grid>
      </Grid>
    );
  };

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

    DEFCON5 && console.log(this.state);

    return (
      <div className={classes.root}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid xs={3} item>
            <Typography variant="h4">
              {i18n.__("Label_podview_articles_master_title")}
            </Typography>
          </Grid>
          <Grid item xs={9}>
            {this.renderFilters()}
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Paper variant="outlined" className={classes.card}>
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
            <Paper variant="outlined" className={classes.card}>
              <Proxy
                searchText={this.state.filter}
                statusFilters={this.state.statusFilters}
                typeOfArticleFilters={this.state.typeOfArticleFilters}
              ></Proxy>
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
