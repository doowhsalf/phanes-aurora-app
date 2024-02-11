import React from "react";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import makeStyles from '@mui/styles/makeStyles';
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
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
import en from "javascript-time-ago/locale/sv";
import TimeAgoLive from "../fields/timeagolive/timeagolive";
import DateStringTransformer from "/lib/transformers/dateStringTransformer";
import sv from "../fields/timeagolive/timeagolive_sv";
import Grid from "@mui/material/Grid";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PublicIcon from "@mui/icons-material/Public";
import PublishIcon from "@mui/icons-material/Publish";
import { green, pink } from "@mui/material/colors";
import Constants from "/lib/constants";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

let Parser = require("rss-parser");
let parser = new Parser();
//const CORS_PROXY = "http://localhost:58888/";
const CORS_PROXY = Meteor.settings.public.cors_proxy_url;

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
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  renderTime: {
    fontSize: "0.9em",
    color: theme.palette.grey[500],
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(0.2),
    fontFamily: "Poppins",
  },

  renderTitle: {
    width: "60%",
  },
  renderColumnAvatar: {
    // width: "20%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: theme.spacing(0),
    marginRigh: theme.spacing(1),
  },
  renderCardInner: {
    padding: theme.spacing(1.5),
    margin: 0,
  },
  renderColumnContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100%",
    paddingLeft: theme.spacing(1.5),
  },
  renderRowDetailed: {
    // textTransform: "uppercase",
    marginTop: -theme.spacing(0.5),
    paddingLeft: theme.spacing(1),
  },
  renderRowDetailedContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontFamily: "Poppins",
    width: "100%",
  },
  renderRowDetailedContentHeader: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: "0.9em",
    fontFamily: "Poppins",
  },
  renderRowDetailedContentDetails: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -theme.spacing(1.5),
    marginBottom: theme.spacing(5),
    fontSize: "0.85em",
    fontFamily: "Poppins",
    width: "100%",
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
    background:
      theme.palette.mode === "dark"
        ? "linear-gradient(to bottom, rgba(29, 30, 31, 0.89) 0%, " +
          "rgba(29, 30, 31, 0.89) 21%, rgba(29, 30, 31,0.89) 34%)"
        : "white",
    "-webkit-backdrop-filter": "blur(4px)",
    "-o-backdrop-filter": "blur(4px)",
    "-moz-backdrop-filter": "blur(4px)",
    "backdrop-filter": "blur(4px)",
  },
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  avatar_article: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  avatar_chat: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: theme.palette.primary.main,
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
});

class NotisCard extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handleClick = () => {
    const { noticeItem, key, classes } = this.props;

    DEFCON5 && console.log("Did click on url");
    DEFCON5 && console.log(noticeItem);

    switch (noticeItem.entity) {
      case "contents":
        DEFCON5 && console.log("Open content");
        DEFCON5 && console.log(noticeItem.entity);
        FlowRouter.go(`/content/${noticeItem.entityId}`);
        break;
      case "article":
        FlowRouter.go(`/article/${noticeItem.entityId}`);
        break;
      case "chat":
        FlowRouter.go(`/chatlines/${noticeItem.entityId}`);
        break;

      case "user":
        break;

      case "group":
        FlowRouter.go(`/workgroupnewsroom/${noticeItem.entityId}`);
        break;

      default:
        break;
    }
    // window.open(noticeItem.link, "_blank");
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
    const { noticeItem, key, classes } = this.props;
    DEFCON3 && console.log("Notice item");
    DEFCON3 && console.log(noticeItem);
    let subTitle = noticeItem.who;

    let fixedDate = new Date(noticeItem.createdAt);

    let published = noticeItem.createdAt;

    const createdAtDetailed = DateStringTransformer(
      Meteor.settings.public.listDateTimeFormat
    ).format(fixedDate);

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
      <Card className={classes.cardTransparent} variant="outlined">
        <CardActionArea onClick={this.handleClick}>
          <CardContent className={classes.renderCardInner}>
            <div className={classes.renderRow}>
              <div className={classes.renderColumnAvatar}>
                {this.renderEventAvatar()}
              </div>
              <div className={classes.renderColumnContent}>
                <div className={classes.renderRow}>
                  <div className={classes.renderRowDetailedContentHeader}>
                    <Typography
                      className={classes.renderTitle}
                      variant="body2"
                      noWrap
                      style={{ fontFamily: "Poppins" }}
                    >
                      {noticeItem.createdByName.trim()}
                    </Typography>
                    <Typography
                      style={{ fontFamily: "Poppins" }}
                      className={classes.renderTime}
                      variant="body2"
                      noWrap
                    >
                      {timeStuffx}
                    </Typography>
                  </div>
                </div>
                <div className={classes.renderRow}>
                  <div className={classes.renderRowDetailedContent}>
                    <Typography
                      variant="body2"
                      style={{ fontSize: 0.9 + "em", fontFamily: "Poppins" }}
                      noWrap
                    >
                      {noticeItem.entityName}
                    </Typography>
                  </div>
                </div>
                <div className={classes.renderRow}>
                  <div className={classes.renderRowDetailedContent}>
                    <Typography
                      variant="body2"
                      style={{ fontSize: 0.9 + "em", fontFamily: "Poppins" }}
                    >
                      {i18n.__(noticeItem.what)}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }

  renderEventAvatar() {
    const { noticeItem, key, classes } = this.props;

    switch (noticeItem.entity) {
      case "article":
        switch (noticeItem.eventClass) {
          case Constants.NotiseClass.ARTICLE_STATUS_REVIEW:
            return (
              <Avatar
                variant="round"
                aria-label="comment"
                className={classes.avatar_article}
              >
                <RateReviewIcon fontSize="small" />
              </Avatar>
            );
            break;
            break;

          default:
            return (
              <Avatar
                variant="round"
                aria-label="comment"
                className={classes.avatar_article}
              >
                <DescriptionIcon fontSize="small" />
              </Avatar>
            );
            break;
        }

        break;
      case "chat":
        return (
          <Avatar
            variant="round"
            aria-label="preview"
            className={classes.avatar_chat}
          >
            <CommentIcon fontSize="small" />
          </Avatar>
        );
        break;

      case "user":
        return (
          <Avatar
            variant="round"
            aria-label="publish"
            className={classes.avatar_article}
          >
            <CommentIcon />
          </Avatar>
        );
        break;
      case "group":
        return (
          <Avatar
            variant="round"
            aria-label="public"
            className={classes.avatar_article}
          >
            <CommentIcon fontSize="small" />
          </Avatar>
        );
        break;

      default:
        return (
          <Avatar
            variant="round"
            aria-label="default"
            className={classes.avatar_article}
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

NotisCard.propTypes = { classes: PropTypes.object.isRequired };
export default withStyles(styles)(NotisCard);

/*
 <CardContent
            style={{
              padding: 0,
              margin: 0,
              paddingLeft: 4,
              paddingTop: 4,
              paddingBottom: 4,
            }}
          >
            <div className={classes.renderRow}>
              <div className={classes.renderColumnAvatar}>
                {this.renderEventAvatar()}
              </div>
            </div>
            <div className={classes.renderRowDetailedContentHeader}>
              <Typography
                style={{
                  padding: 0,
                  margin: 0,
                  marginLeft: 0,
                  fontSize: "0.8em",
                  color: "grey",
                }}
                variant="overline"
              >
                {noticeItem.entity}
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
          </CardContent>

          <div
            style={{
              marginTop: -14,
              marginLeft: 40,
              marginBottom: 12,
            }}
          >
            <div className={classes.renderRowDetailedContentObject}>
              {noticeItem.entityName ? (
                <Typography
                  style={{
                    // width: "90%",
                    fontStyle: "italic",
                    fontSize: "0.8em",
                  }}
                  variant="body2"
                >
                  {i18n.__(noticeItem.entityName)}
                </Typography>
              ) : null}
            </div>
          </div>
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
                  width: "100%",
                }}
                variant="body2"
              >
                {i18n.__(noticeItem.what)}
              </Typography>
            </div>

            <div className={classes.renderRowDetailedContentSender}>
              <Typography
                style={{
                  width: "80%",
                  position: "absolute",
                  left: 8,
                  bottom: 6,
                  fontSize: "0.8em",
                  color: "grey",
                }}
                variant="body2"
              >
                {noticeItem.event.trim() +
                  " " +
                  i18n.__("Label_by") +
                  " @" +
                  noticeItem.createdByName.trim()}
              </Typography>
              {
                <div
                  style={{
                    width: "20%",
                  }}
                >
                  {noticeItem.avatar_uri ? (
                    <Avatar
                      style={{
                        position: "absolute",
                        right: 8,
                        bottom: 8,
                      }}
                      className={classes.small}
                      variant="round"
                      src={noticeItem.avatar_uri}
                      aria-label="whom"
                    ></Avatar>
                  ) : null}
                </div>
              }
              
            </div>
          </CardContent>
          */