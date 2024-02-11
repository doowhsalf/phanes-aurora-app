import React from "react";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import NotisCard from "./notis-card-like-osx";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";

const styles = (theme) => ({
  label: {
    marginTop: -35,
  },
  clock: {},

  list: {
    marginBottom: theme.spacing(1),
    // padding: theme.spacing(1),
    // overflow: "scroll"
  },

  colorstandard: {
    color: theme.palette.text.primary,
  },
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const dataNotises = [
  {
    id: "x1",
    event: "NewArticle",
    entity: "Article",
    entityId: "xx1",
    entityTitle: "Go West",
    whoUrl: "https://i.pravatar.cc/300",
    what: "Created a new article",
    who: "user y",
    when: "2021-09-05:10:23:22",
  },
  {
    id: "x2",
    event: "EditArticle",
    entity: "Article",
    entityTitle: "Go West",

    whoUrl: "https://i.pravatar.cc/300",

    entityId: "xx2",
    what: "Did an update",
    who: "user x",
    when: "2021-09-06:10:33:22",
  },
  {
    id: "x3",
    event: "Review",
    entity: "Article",
    entityId: "xx2",
    entityTitle: "Go West",

    whoUrl: "https://i.pravatar.cc/300",

    what: "Did a review of article ",
    who: "user x",
    when: "2021-09-07:10:43:22",
  },
  {
    id: "x4",
    event: "StatusUpdate",
    entity: "Chat",
    entityId: "xx2",
    entityTitle: "Chatroom title",
    whoUrl: "https://i.pravatar.cc/300",
    what: "You have a new message",
    who: "Arnold.x",
    when: "2021-09-07:11:23:22",
  },
];

class NotisList extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    this.setState({ dataNotises: dataNotises });
  }
  render() {
    const { classes, notices } = this.props;
    DEFCON5 && console.log("Feed reader state");
    DEFCON5 && console.log(this.state);

    return (
      <Grid container spacing={2}>
        {notices.map((item, i) => (
          <Grid item xs={12} sm={12} md={12} lg={12} key={i}>
            <NotisCard key={i} noticeItem={item}></NotisCard>
          </Grid>
        ))}
      </Grid>
    );
  }
}

NotisList.propTypes = { classes: PropTypes.object.isRequired };
export default withStyles(styles)(NotisList);
