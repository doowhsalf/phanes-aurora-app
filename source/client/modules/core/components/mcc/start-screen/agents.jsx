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
import SnackBarMessage from "../../fields/snackbar-message";
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
import {
  getField,
  getFieldDate,
  getFieldDateTime,
} from "../../helpers/getField";
import en from "javascript-time-ago/locale/sv";
import TimeAgoLive from "../../fields/timeagolive/timeagolive";
import sv from "../../fields/timeagolive/timeagolive_sv";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { renderLabel } from "../renderLabel";
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
  textField: {
    marginTop: theme.spacing(1),
    display: "block",
    maxWidth: 300,
  },
  divider: {
    marginTop: theme.spacing(0.5),
    borderTop: "dotted 1px",
    borderColor: "#bdbdbd",
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

class AgentDetails extends React.Component {
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
    const { classes, agents } = this.props;
    const {} = this.state;
    DEFCON5 && console.log("Render Agents");
    DEFCON5 && console.log(agents);
    // make a list of agents and render them card
    let renderStuff = [];
    if (agents) {
      agents.map((agent) => {
        let item = this.inbound(agent);
        renderStuff.push(item);
      });
    }
    return renderStuff;
  }

  /*
"name" : "Demo Customer",
    "description" : "Demo Customer Agent Instance",
    "created" : ISODate("2023-03-19T14:07:00.922+0000"),
    "modified" : ISODate("2023-03-19T14:07:00.922+0000"),
    "createdBy" : "fg9LPNRcBaou5mg4T",
    "modifiedBy" : "fg9LPNRcBaou5mg4T",
    "status" : "active"*/

  inbound(agent) {
    const { classes } = this.props;

    return (
      <Card className={classes.cardTransparent}>
        <CardHeader
          title={getField(agent, "name")}
          subheader={getField(agent, "description")}
        />

        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              {renderLabel(
                "Changed by User",
                getField(agent, "modifiedByUserName"),
                classes
              )}
              {renderLabel("ChangedBy", getField(agent, "modifiedBy"), classes)}
              {renderLabel(
                "Changed",
                getFieldDateTime(agent, "modified"),
                classes
              )}
              {renderLabel(
                "Created by User",
                getField(agent, "createdByUserName"),
                classes
              )}
              {renderLabel("CreatedBy", getField(agent, "createdBy"), classes)}
              {renderLabel(
                "Created",
                getFieldDateTime(agent, "created"),
                classes
              )}
              {renderLabel("Status", getField(agent, "status"), classes)}
            </Grid>
          </Grid>
        </CardContent>
        {/* </CardActionArea> */}
        <CardActions>
          <Button
            size="small"
            color="primary"
            button
            onClick={() =>
              FlowRouter.go("/chatlines/" + getField(agent, "_id"))
            }
          >
            TBD
          </Button>
        </CardActions>
      </Card>
    );
  }
}

AgentDetails.propTypes = {};

export default withStyles(styles)(AgentDetails);
