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

const styles = (theme) => ({
  root: {
    marginBottom: theme.spacing(1),
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
    fontSize: "0.8em",
    // textTransform: "uppercase",
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
});

class ChannelCard extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handleClick = () => {
    const { channelItem, key, classes } = this.props;

    DEFCON5 && console.log("Did click on url");
    DEFCON5 && console.log(channelItem);

    switch (channelItem.entity) {
      case "article":
        FlowRouter.go(`/article/${channelItem.entityId}`);
        break;
      case "chat":
        FlowRouter.go(`/chatlines/${channelItem.entityId}`);
        break;

      case "user":
        break;

      case "group":
        FlowRouter.go(`/workgroupnewsroom/${channelItem.entityId}`);
        break;

      default:
        break;
    }
    // window.open(channelItem.link, "_blank");
  };

  /*

 id: "x1",
    event: "New",
    entity: "Article",
    entityId: "xx1",
    what: "Created a new article",
    who: "user y",
    when: "2020-03-03:10:23:22",
{this.props.enqueueSnackbar(item.what, {
              variant: "info",
              autoHideDuration: 10000,
            }); }
  */

  render() {
    const { channelItem, key, classes } = this.props;
    DEFCON5 && console.log("Channel item");
    DEFCON5 && console.log(channelItem);
    // let subTitle = channelItem.who;

    let fixedDate = new Date(channelItem.createdAt);

    let published = channelItem.createdAt;

    const createdAtDetailed = DateStringTransformer(
      Meteor.settings.public.listDateTimeFormat
    ).format(fixedDate);
    console.log("DAte check");
    console.log(published);
    console.log(fixedDate);

    TimeAgo.locale(sv);
    // Create relative date/time formatter.
    const timeAgo = new TimeAgo("sv");
    const timeStuff = (
      <span className={classes.renderColumn}>
        <div>
          <TimeAgoLive dateToProcess={fixedDate} renderFormat="mini" />
        </div>

        <div className={classes.renderRowDetailed}>{createdAtDetailed}</div>
      </span>
    );
    const timeStuffx = (
      <div className={classes.renderTime}>
        <TimeAgoLive dateToProcess={fixedDate} renderFormat="mini" />
      </div>
    );

    return (
      <Card
        className={classes.cardTransparent}
        variant="outlined"
        // className={classes.root}
      >
        <CardActionArea
          style={{ padding: 0, margin: 0 }}
          onClick={this.handleClick}
        >
          <CardHeader
            style={{
              padding: 0,
              margin: 0,
              paddingLeft: 4,
              paddingTop: 4,
              paddingBottom: 4,
            }}
            avatar={this.renderEventAvatar()}
            title={
              <div className={classes.renderRowDetailedContent}>
                <Typography
                  style={{
                    padding: 0,
                    margin: 0,
                    marginLeft: -8,
                  }}
                  variant="overline"
                >
                  {channelItem.entity}
                </Typography>
                <Typography
                  style={{
                    marginTop: 3,
                    marginRight: 8,
                  }}
                  variant="overline"
                >
                  {timeStuffx}
                </Typography>
              </div>
            }
          />
          <CardContent
            style={{
              padding: 0,
              margin: 0,
              paddingLeft: 8,
              paddingTop: 2,
              paddingBottom: 8,
            }}
          >
            <div className={classes.renderRowDetailedContentDetails}>
              <Typography
                style={{
                  width: "90%",
                }}
                variant="body2"
              >
                {i18n.__(channelItem.what)}
              </Typography>
            </div>
            <div className={classes.renderRowDetailedContentObject}>
              {channelItem.entityName ? (
                <Typography
                  style={{
                    width: "90%",
                  }}
                  variant="subtitle1"
                >
                  {i18n.__(channelItem.entityName)}
                </Typography>
              ) : null}
              {channelItem.entity_uri ? (
                <Avatar
                  style={{
                    marginRight: 8,
                    marginTop: -8,
                  }}
                  variant="rounded"
                  src={channelItem.entity_uri}
                  aria-label="whom"
                ></Avatar>
              ) : null}
            </div>
            <div className={classes.renderRowDetailedContentSender}>
              <Typography
                style={{
                  width: "100%",
                  marginTop: 12,
                  marginBottom: 0,
                  marginRight: 8,
                  fontSize: "10px",
                }}
                variant="body2"
              >
                {channelItem.event.trim() +
                  " " +
                  i18n.__("Label_by") +
                  " @" +
                  channelItem.createdByName.trim()}
              </Typography>
              {/* <Avatar
                style={{
                  marginRight: 8,
                }}
                className={classes.small}
                src={channelItem.avatar_uri}
                aria-label="whom"
              ></Avatar> */}
            </div>
            <div className={classes.renderRowDetailedContentSender}>
              <Typography
                style={{
                  width: "100%",
                  marginTop: 12,
                  marginBottom: 0,
                  marginRight: 8,
                  fontSize: "10px",
                }}
                variant="body2"
              >
                {channelItem.entityId}
              </Typography>
              {/* <Avatar
                style={{
                  marginRight: 8,
                }}
                className={classes.small}
                src={channelItem.avatar_uri}
                aria-label="whom"
              ></Avatar> */}
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
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

ChannelCard.propTypes = { classes: PropTypes.object.isRequired };
export default withStyles(styles)(ChannelCard);
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
