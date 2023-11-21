import React from "react";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";

import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";
import { CardHeader } from "@mui/material";
import TimeAgo from "javascript-time-ago";
import TimeAgoLive from "../fields/timeagolive/timeagolive";
import DateStringTransformer from "/lib/transformers/dateStringTransformer";
import sv from "../fields/timeagolive/timeagolive_sv";
import CommentIcon from "@mui/icons-material/Comment";
import DescriptionIcon from "@mui/icons-material/Description";
import PublicIcon from "@mui/icons-material/Public";
import { pink } from "@mui/material/colors";
import Badge from "@mui/material/Badge";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import Gravatar from "react-gravatar";

const styles = (theme) => ({
  root: {
    display: "flex",
    "& > *": {
      marginRight: theme.spacing(0),
    },
    overflow: "auto",
  },
  label: {},
  clock: {},

  colorstandard: {
    color: theme.palette.text.primary,
  },
  renderRow: {
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "flex-start",
  },
  renderTime: {
    fontSize: "0.8em",
  },
  renderColumn: {
    fontSize: "0.8em",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  renderRowDetailed: {
    fontSize: "0.6em",
    textAlign: "center",
    marginTop: -theme.spacing(0.5),
    paddingLeft: theme.spacing(1),
  },
  renderRowDetailedContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  renderRowDetailedContentDetails: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -theme.spacing(0.5),
  },
  renderRowDetailedContentObject: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  renderRowDetailedContentSender: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -theme.spacing(1.5),
  },
  cardTransparent: {
    marginBottom: theme.spacing(1),

    background:
      theme.palette.mode === "dark"
        ? "linear-gradient(to bottom, rgba(29, 30, 31, 0.89) 0%, " +
          "rgba(29, 30, 31, 0.89) 21%, rgba(29, 30, 31,0.89) 34%)"
        : "white",
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  article_card: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  chat_card: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: theme.palette.primary.main,
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  userOnlineBadge: {
    backgroundColor: theme.palette.success.light,
    color: "white",
  },
});

class ChatSearchCard extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handleClick = () => {
    const { channelItem, key, classes } = this.props;
  };

  render() {
    const { chatUsers, classes } = this.props;
    DEFCON5 && console.log("Users");
    DEFCON5 && console.log(chatUsers);

    let user = {
      _id: "user_x_8",
      name: "johan.editor",
      uid: "8",
      avatar_uri: "",
      status: "active",
      emails: [
        {
          address: "glimskog@me.com",
          verified: true,
        },
      ],
      isOnline: false,
    };
    let stuff = [];
    chatUsers.map((user, index, array) => {
      stuff.push(this.renderAvatar(user));
    });

    return (
      <div className={classes.root}>
        <div>
          <IconButton color="primary" aria-label="add" size="large">
            <Avatar>
              <PersonAddIcon />
            </Avatar>
          </IconButton>
          <Typography
            className={classes.renderRowDetailed}
            style={{
              padding: 0,
              margin: 0,
            }}
            variant="body2"
          >
            {"Create room"}
          </Typography>
        </div>
        {stuff}
      </div>
    );
  }

  renderAvatar(user) {
    const { users, classes } = this.props;

    let stuff = (
      <div>
        <IconButton color="primary" aria-label="add" size="large">
          <Badge
            color={!user.isOnline ? "secondary" : ""}
            classes={user.isOnline ? { badge: classes.userOnlineBadge } : ""}
            overlap="circular"
            badgeContent=" "
            variant="dot"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            {this.getAvatar(user)}
          </Badge>
        </IconButton>
        <Typography
          className={classes.renderRowDetailed}
          style={{
            padding: 0,
            margin: 0,
          }}
          variant="body2"
        >
          {user.name}
        </Typography>
      </div>
    );
    return stuff;
  }

  getAvatar(user) {
    const { classes } = this.props;
    DEFCON7 && console.log("Listitem to render as Avatar ");
    DEFCON7 && console.log(listItem);

    //TODO: make gravatar, get it once
    return user.avatar_uri ? (
      <Avatar src={user.avatar_uri} />
    ) : (
      <Avatar>
        {user.emails[0].address ? (
          <Gravatar email={user.emails[0].address} />
        ) : user.name ? (
          user.name.substring(0, 2)
        ) : (
          "--"
        )}
      </Avatar>

      // <Avatar className={classes.chatAvatar}>
      //   {listItem.name ? listItem.name.substring(0, 2) : "xx"}
      // </Avatar>
    );
  }
  renderEventAvatar() {
    const { channelItem, key, classes } = this.props;

    switch (channelItem.entity) {
      case "article":
        return (
          <Avatar
            variant="rounded"
            aria-label="comment"
            className={classes.article_card}
          >
            <DescriptionIcon fontSize="small" />
          </Avatar>
        );
        break;
      case "chat":
        return (
          <Avatar
            variant="rounded"
            aria-label="preview"
            className={classes.chat_card}
          >
            <CommentIcon fontSize="small" />
          </Avatar>
        );
        break;

      case "user":
        return (
          <Avatar
            variant="rounded"
            aria-label="publish"
            className={classes.article_card}
          >
            <CommentIcon />
          </Avatar>
        );
        break;
      case "group":
        return (
          <Avatar
            variant="rounded"
            aria-label="public"
            className={classes.article_card}
          >
            <CommentIcon fontSize="small" />
          </Avatar>
        );
        break;

      default:
        return (
          <Avatar
            variant="rounded"
            aria-label="default"
            className={classes.article_card}
          >
            <PublicIcon fontSize="small" />
          </Avatar>
        );
        break;
    }
  }
}
/*
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PublicIcon from "@mui/icons-material/Public";
import PublishIcon from "@mui/icons-material/Publish";
*/

ChatSearchCard.propTypes = { classes: PropTypes.object.isRequired };
export default withStyles(styles)(ChatSearchCard);
/*

<CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      />*/

/*

<Grid
            style={{ paddingLeft: 8, paddingTop: 8 }}
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item>
              <Avatar
                src={channelItem.whoUrl}
                className={classes.small}
              ></Avatar>
            </Grid>
            <Grid item>
              <Grid
                item
                container
                direction="row"
                justifyContent="space-between"
                spacing={1}
              >
                <Grid item>
                  <Typography variant="overline">{channelItem.who}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="overline">{timeStuff}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

      */
