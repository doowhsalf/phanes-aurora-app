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
import { Breadcrumbs } from "@mui/material";
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
import en from "javascript-time-ago/locale/sv";
import TimeAgoLive from "../fields/timeagolive/timeagolive";
import sv from "../fields/timeagolive/timeagolive_sv";
import Fade from "@mui/material/Fade";
import Grow from "@mui/material/Grow";
import Zoom from "@mui/material/Zoom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PowerIcon from "@mui/icons-material/Power";

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
  alarm: {
    color: theme.palette.getContrastText(theme.palette.warning.light),
    backgroundColor: theme.palette.warning.light,
  },
  inboundOk: {
    color: theme.palette.getContrastText(theme.palette.info.light),
    backgroundColor: theme.palette.info.light,
  },

  OutboundOK: {
    color: theme.palette.getContrastText(theme.palette.success.light),
    backgroundColor: theme.palette.success.light,
  },

  image_background: {
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
  cardTransparent: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,1) 0%, " +
      "rgba(0,0,0,0.77) 34%, rgba(0,0,0,0.66) 55%)",
  },
  bgTransparent: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,1) 0%, " +
      "rgba(0,0,0,0.21) 10%, rgba(0,0,0,0,0) 30%)",
  },
});

const initialState = {
  mcc: [],
  loading: false,
  expanded: false,
  setExpanded: false,
  history_value: [],
};

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

class SignalDetails extends React.Component {
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
    const { classes, signal, facility } = this.props;
    const {} = this.state;
    // DEFCON5 && console.log("Render Signal");
    // DEFCON5 && console.log(signal);
    // DEFCON5 && console.log(facility);
    return getField(signal, "route") === "outbound"
      ? this.outbound()
      : getField(signal, "route") === "inbound_control"
      ? this.inboundControl()
      : this.inbound();
  }

  inbound() {
    const { classes, signal, facility } = this.props;

    return (
      <Card className={classes.cardTransparent}>
        <CardHeader
          avatar={
            <Avatar
              className={
                signal.result === 0 ? classes.inboundOk : classes.alarm
              }
            >
              <ArrowBackIcon />
            </Avatar>
          }
          // action={
          //   <IconButton aria-label="settings">
          //     <Badge badgeContent={0} color="primary">
          //       <MailIcon />
          //     </Badge>
          //   </IconButton>
          // }
          title={getField(signal, "id")}
          subheader={"Route: " + getField(signal, "route")}
        />
        {/* <CardActionArea> */}
        {/* <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image="https://alkoholhjalpen.se/sites/default/files/glas.png"
            title="Contemplative Reptile"
          /> */}
        <CardContent>
          <Fade in={true} timeout={1000} style={{ transitionDelay: "200" }}>
            <Typography variant="h5" color="primary" component="p">
              {getField(signal, "value")}
            </Typography>
          </Fade>
          <Typography variant="body2" color="textSecondary" component="p">
            {getField(signal, "result")}
          </Typography>
          {/* <Typography variant="body2" color="textSecondary" component="p">
            {getField(signal, "timehhmmss")}
          </Typography> */}
          <Typography variant="body2" color="textSecondary" component="p">
            {signal.time
              ? new Date(parseInt(getField(signal, "time")) * 1000).toDateString
              : ""}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {signal.time ? (
              <TimeAgoLive
                dateToProcess={
                  new Date(parseInt(getField(signal, "time")) * 1000)
                }
              />
            ) : (
              ""
            )}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            {signal.time
              ? new Date(
                  parseInt(getField(signal, "time")) * 1000
                ).toLocaleTimeString()
              : ""}
          </Typography>
        </CardContent>
        {/* </CardActionArea> */}
        <CardActions>
          <Button
            size="small"
            color="primary"
            button
            onClick={() => FlowRouter.go("/chatlines/202322")}
          >
            History
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => FlowRouter.go("/clientroom/202322")}
          >
            Details
          </Button>
        </CardActions>
      </Card>
    );
  }

  inboundControl() {
    const { classes, signal, facility } = this.props;

    return (
      <Card className={classes.cardTransparent}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={
                signal.result === 0 ? classes.inboundOk : classes.inboundOk
              }
            >
              <PowerIcon />
            </Avatar>
          }
          title={getField(signal.data, "control_mode")}
          subheader={"Route: " + getField(signal, "route")}
        />

        <CardContent>
          <Typography variant="h5" color="primary" component="p">
            {getField(signal.data, "set_value")}
          </Typography>
          <Typography variant="body2" color="primary" component="p">
            {getField(signal.data, "control_mode")}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {getField(signal.data, "dryrun")}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {getField(signal.data, "control_type")}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {getField(signal.data, "heat_circuit_name")}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {"Dry run: "}
            {getField(signal.data, "dry_run")}
          </Typography>
          {/* <Typography variant="body2" color="textSecondary" component="p">
            {getField(signal, "timehhmmss")}
          </Typography> */}
          <Typography variant="body2" color="textSecondary" component="p">
            {signal.created
              ? new Date(parseInt(getField(signal, "created")) * 1000)
                  .toDateString
              : "x"}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {signal.created ? (
              <TimeAgoLive
                dateToProcess={
                  new Date(parseInt(getField(signal, "created")) * 1000)
                }
              />
            ) : (
              ""
            )}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {signal.created
              ? new Date(
                  parseInt(getField(signal, "created")) * 1000
                ).toLocaleTimeString()
              : ""}
          </Typography>
        </CardContent>
        {/* </CardActionArea> */}
        <CardActions>
          <Button
            size="small"
            color="primary"
            button
            onClick={() => FlowRouter.go("/chatlines/202322")}
          >
            History
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => FlowRouter.go("/clientroom/202322")}
          >
            Details
          </Button>
        </CardActions>
      </Card>
    );
  }

  outbound() {
    const { classes, signal, facility } = this.props;

    return (
      <Card className={classes.cardTransparent}>
        <CardHeader
          avatar={
            <Avatar
              className={
                signal.result === 0 ? classes.OutboundOK : classes.alarm
              }
            >
              <ArrowForwardIcon />
            </Avatar>
          }
          // action={
          //   <IconButton aria-label="settings">
          //     <Badge badgeContent={0} color="primary">
          //       <MailIcon />
          //     </Badge>
          //   </IconButton>
          // }
          title={getField(signal, "id")}
          subheader={"Route: " + getField(signal, "route")}
        />
        {/* <CardActionArea> */}
        {/* <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image="https://alkoholhjalpen.se/sites/default/files/glas.png"
            title="Contemplative Reptile"
          /> */}
        <CardContent>
          <Fade in={true} timeout={1000} style={{ transitionDelay: "200" }}>
            <Typography variant="h5" color="primary" component="p">
              {getField(signal, "value")}
            </Typography>
          </Fade>
          <Typography variant="body2" color="textSecondary" component="p">
            {getField(signal, "result")}
          </Typography>
          {/* <Typography variant="body2" color="textSecondary" component="p">
            {getField(signal, "timehhmmss")}
          </Typography> */}
          <Typography variant="body2" color="textSecondary" component="p">
            {signal.time
              ? new Date(parseInt(getField(signal, "time")) * 1000).toDateString
              : ""}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {signal.time ? (
              <TimeAgoLive
                dateToProcess={
                  new Date(parseInt(getField(signal, "time")) * 1000)
                }
              />
            ) : (
              ""
            )}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {signal.time
              ? new Date(
                  parseInt(getField(signal, "time")) * 1000
                ).toLocaleTimeString()
              : ""}
          </Typography>
        </CardContent>
        {/* </CardActionArea> */}
        <CardActions>
          <Button
            size="small"
            color="primary"
            button
            onClick={() => FlowRouter.go("/chatlines/202322")}
          >
            History
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => FlowRouter.go("/clientroom/202322")}
          >
            Details
          </Button>
        </CardActions>
      </Card>
    );
  }
}

SignalDetails.propTypes = {};

export default withStyles(styles)(SignalDetails);
