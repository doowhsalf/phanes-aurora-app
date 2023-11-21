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
import Progress from "./progress";
import { Variants } from "./chatx";
import Sun from "./sun";
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

  login_page: {
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
});

const initialState = {
  ClientRoom: [],
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

class ClientRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.getClientRoom();
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

  getClientRoom = () => {};

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
    const { classes, ClientRoomGetItem } = this.props;
    const {} = this.state;

    const header = [
      <div key={_uniqueKey()}>
        <Typography variant={"h3"}>Om oss</Typography>
      </div>,
    ];

    return (
      <div style={{ marginTop: 100 }}>
        <Container maxWidth="xl">
          <div className={classes.root}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Card>
                  <CardHeader
                    avatar={
                      <div class="progress-circle progress-56">
                        <span>56</span>
                      </div>
                    }
                    action={
                      <IconButton aria-label="settings" size="large">
                        <Badge badgeContent={0} color="primary">
                          <MailIcon />
                        </Badge>
                      </IconButton>
                    }
                    title="Gustav"
                    subheader="Klient: #202322"
                  />
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="140"
                      image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTvCGYNJ_PN8JUEtBfoCEGHB53t8BuipCQCSAJBkeSkAMOTTjfW&usqp=CAU"
                      title="Program Alfa"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Program ALFA
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        At vero eos et accusamus et iusto odio dignissimos
                        ducimus qui blanditiis praesentium voluptatum deleniti
                        atque corrupti quos dolores et quas molestias excepturi
                        sint occaecati cupiditate non provident, similique sunt
                        in culpa qui officia deserunt mollitia animi, id est
                        laborum et dolorum fuga.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      button
                      onClick={() => FlowRouter.go("/chatlines/202322")}
                    >
                      Chatta
                    </Button>
                    <Button size="small" color="primary">
                      Detaljbild
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card>
                  <CardHeader
                    title="Progressplan"
                    subheader="Aktuell nivå: 40"
                  />
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="140"
                      image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTvCGYNJ_PN8JUEtBfoCEGHB53t8BuipCQCSAJBkeSkAMOTTjfW&usqp=CAU"
                      title="Program Alfa"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Progress
                      </Typography>
                      <Progress />
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      button
                      onClick={() => FlowRouter.go("/chatlines/202322")}
                    >
                      Chatta
                    </Button>
                    <Button size="small" color="primary">
                      Detaljbild
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card>
                  <CardHeader
                    title="Chat"
                    subheader="Senast chat meddelande: Tors, 19 2020 Kl 23.22 "
                  />
                  <CardActionArea>
                    <CardContent>
                      {Variants("202322")}
                      {/* <Chat channelId={"202322"} condenced /> */}
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      button
                      onClick={() => FlowRouter.go("/chatlines/202322")}
                    >
                      Chat fönster
                    </Button>
                    <Button size="small" color="primary">
                      Detaljbild
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              {/* <Grid item xs={12} md={3}>
                <Card>
                  <CardHeader
                    title="Graph"
                    subheader="Progress: Tors, 19 2020 Kl 23.22 "
                  />
                  <CardActionArea>
                    <CardContent>
                      <Sun />
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      button
                      onClick={() => FlowRouter.go("/chatlines/discussion02")}
                    >
                      Chat fönster
                    </Button>
                    <Button size="small" color="primary">
                      Detaljbild
                    </Button>
                  </CardActions>
                </Card>
              </Grid> */}
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

ClientRoom.propTypes = {};

export default withStyles(styles)(ClientRoom);
