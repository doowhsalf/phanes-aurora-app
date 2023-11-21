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
import clsx from "clsx";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import withStyles from "@mui/styles/withStyles";
import PropTypes from "prop-types";
import SnackBarMessage from "../fields/snackbar-message";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import CardHeader from "@mui/material/CardHeader";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import CircularProgress from "@mui/material/CircularProgress";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import { getField } from "../helpers/getField";
import SignalCard from "./mcc_signal_v1";
import FacilityDetails from "./mcc_facility_details";
import SignalHistory from "./mcc_signal_history";

function _uniqueKey() {
  return Math.random() * Math.random();
}

const styles = (theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  master: {
    minHeight: 100,
    padding: theme.spacing(2),
  },
  card: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
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
  root: {
    flexGrow: 1,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },

  background_dynamic: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
    top: 0,
    left: 0,
    padding: 0,
    margin: "auto",
    background:
      "url(https://sycorax.tritonite.io/phanes-aurora) no-repeat center center fixed",
    backgroundSize: "cover",
  },

  login_container: {
    top: 250,
    width: 300,
    margin: "auto",
    marginTop: 100,
    backgroundColor: "rgba(255, 255, 255, 0.66)",
    borderRadius: 3,
    padding: 15,
    overflow: "hidden",
  },
  bgTransparent: {
    position: "fixed",
    minWidth: "100%",
    minHeight: "100%",
    right: 0,
    bottom: 0,
    zIndex: -1000,
    background:
      "linear-gradient(to bottom, rgba(0,0,0,1) 0%, " +
      "rgba(0,0,0,0.21) 20%, rgba(0,0,0,0) 30%)",
  },
});

const initialState = {
  mcc: [],
  loading: false,
  expanded: false,
  setExpanded: false,
};

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

class Facility extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.getmcc();
    if (this.video) {
      this.video.addEventListener("loadeddata", () => {
        this.setState({ loading: false });
      });
    }
  }

  componentWillUnmount() {
    if (this.video) {
      this.video.removeEventListener("loadeddata", () => {});
    }
  }

  handleExpandClick = () => {
    this.setState({ expanded: !expanded });
  };

  getmcc = () => {};

  submit = () => {};

  close = () => {};

  handleChange = () => () => {};

  handleSnackbarClose = () => {
    this.setState({
      openSnackbar: false,
      dense: true,
      secondary: true,
    });
  };

  render() {
    const {
      classes,
      signals,
      facility,
      outboundSignals,
      inboundSignals,
      inboundSignalId,
      outboundSignalId,
    } = this.props;
    const {} = this.state;

    const header = [
      <div key={_uniqueKey()}>
        <Typography variant={"h4"}>
          {getField(facility, "facility")} / {getField(facility, "mid_uuid")} /{" "}
          {getField(facility, "address")}
        </Typography>
      </div>,
    ];

    DEFCON5 && console.log("Render Signals & Facility");
    DEFCON5 && console.log(signals);
    DEFCON5 && console.log(facility);
    // let checkSignal = getField(facility, "facility") + "_UC01_GT32_MV_inbound";

    return (
      // <div className={classes.background_dynamic}>
      <div>
        <div
          style={{
            background:
              "url(https://sycorax.tritonite.io/phanes-aurora) no-repeat center center fixed",
            backgroundSize: "cover",
            position: "fixed",
            minWidth: "100%",
            minHeight: "100%",
            right: 0,
            bottom: 0,
            zIndex: -10000,
            left: 0,
            backgroundSize: "cover",
            top: 0,
            opacity: this.state.loading ? 0 : 1,
            transition: "opacity, 2s ease-in-out",
          }}
        >
          <source id="mp4" src="/assets/newsroom1.mp4" type="video/mp4" />
        </div>

        <div className={classes.bgTransparent}></div>
        <Container style={{ marginTop: 100 }} maxWidth="xl">
          <div className={classes.root}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                {header}
              </Grid>
              <Grid item xs={12} md={12}>
                <FacilityDetails facility={facility} />
              </Grid>

              {signals
                ? signals.map((signal, index, array) => {
                    return (
                      <Grid item xs={12} md={3}>
                        <SignalCard
                          className={classes.cardTransparent}
                          signal={signal}
                          facility={facility}
                        ></SignalCard>{" "}
                      </Grid>
                    );
                  })
                : null}
              <Grid item xs={12} md={12}>
                <SignalHistory
                  inboundSignalId={inboundSignalId}
                  outboundSignalId={outboundSignalId}
                  outboundSignals={outboundSignals}
                  inboundSignals={inboundSignals}
                />
              </Grid>
            </Grid>
          </div>
        </Container>
        <SnackBarMessage
          open={this.state.openSnackbar}
          handleSnackbarClose={this.handleSnackbarClose}
          variant="warning"
          message={this.state.snackbarMessage}
        />
      </div>
    );
  }
}

Facility.propTypes = {};

export default withStyles(styles)(Facility);
