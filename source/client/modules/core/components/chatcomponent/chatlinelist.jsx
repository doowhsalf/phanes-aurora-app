import React from "react";
import {
  DEFCON9,
  DEFCON7,
  DEFCON5,
  DEFCON4,
  DEFCON3,
  DEFCON2,
  DEFCON1,
} from "/debug.json";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";

import i18n from "meteor/universe:i18n";
import DateStringTransformer from "/lib/transformers/dateStringTransformer";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";

import { grey } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import BackIcon from "@mui/icons-material/NavigateNext";
import CreateIcon from "@mui/icons-material/Create";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/sv";
import TimeAgoLive from "../fields/timeagolive/timeagolive";
import sv from "../fields/timeagolive/timeagolive_sv";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import ChatEdit from "./chatedit";
import Fade from "@mui/material/Fade";
import Grow from "@mui/material/Grow";
import Zoom from "@mui/material/Zoom";
import { renderLogo, _getLogoUrl } from "../helpers/app-logo";
import Gravatar from "react-gravatar";
import { ReactTinyLink } from "react-tiny-link";

TimeAgo.locale(en);

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },

  inline: {
    whiteSpace: "pre-line",
  },
  chatlineText: {
    zIindex: +1,
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(8),
    },
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(10),
    },
    [theme.breakpoints.up("md")]: {
      marginBottom: theme.spacing(10),
    },
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  },
  listItem: {
    "align-items": "flex-end",
    maxWidth: "100%",
  },
  chatLineDate: {
    marginTop: 10,
    fontSize: "0.8em",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },

  chatLinePerson: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "left",
    fontSize: "0.9em",
    // paddingTop: theme.spacing(0.8),
    // paddingLeft: theme.spacing(1),
    // paddingRight: theme.spacing(1),
    // paddingBottom: theme.spacing(0.5),
    marginTop: 0,
    marginBottom: 0,
    width: "auto",
  },

  chatLineTextMyline: {
    backgroundColor: theme.palette.background.default,
  },

  chatLineMyline: {
    display: "none",
  },
  chatClear: {
    clear: "both",
  },

  chatAvatarOuter: {
    zIndex: 1000,
    // marginBottom: theme.spacing(1),
  },

  messages: {
    // "border-radius": 15,
  },

  fromMe: {
    // marginRight: theme.spacing(2),
    float: "right",
    color: "white",
    [theme.breakpoints.down('sm')]: {
      marginLeft: "20%",
      float: "right",
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: "20%",
      maxWidth: "80%",
      marginRight: theme.spacing(5),
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: "25%",
      maxWidth: "75%",
      marginRight: theme.spacing(5),
    },
    "border-bottom-left-radius": 15,
    "border-top-left-radius": 15,
    "border-top-right-radius": 3,
    "border-bottom-right-radius": 3,
    clear: "both",
    // background:
    //   "linear-gradient(to bottom, " +
    //   "rgba(142, 44, 246, 1)" +
    //   " 0%, " +
    //   "rgb(54, 115, 246, 1)" +
    //   " 100%)",
    "background-attachment": "fixed",
    position: "relative",
  },

  fromMeBackgroundText: {
    background:
      "linear-gradient(to bottom, " +
      "rgba(142, 44, 246, 1)" +
      " 0%, " +
      "rgb(54, 115, 246, 1)" +
      " 100%)",
    "background-attachment": "fixed",
    position: "relative",
    marginBottom: theme.spacing(1) * 0.3,
  },

  imageMessage: {
    background:
      "linear-gradient(to bottom, " +
      "rgba(0, 0, 0, 0)" +
      " 0%, " +
      "rgb(0,0,0,0)" +
      " 100%)",
    "background-attachment": "fixed",
    position: "relative",
  },

  fromMeFirst: {
    "border-top-right-radius": 15,
    marginTop: theme.spacing(0.2),
  },
  fromMeLast: {
    "border-bottom-right-radius": 15,
  },
  // fromThemLight: {
  //   float: "left",
  //   clear: "both",
  //   position: "relative",
  //   "background-attachment": "fixed",
  //   marginRight: "25%",
  //   background: "#3F4041",
  //   marginLeft: theme.spacing(5.5),
  //   "border-bottom-left-radius": 3,
  //   "border-top-left-radius": 3,
  //   "border-top-right-radius": 15,
  //   "border-bottom-right-radius": 15,
  //   marginBottom: theme.spacing(1) * 0.3,
  // },
  fromThemLight: {
    float: "left",
    clear: "both",
    position: "relative",
    "background-attachment": "fixed",
    marginRight: "25%",
    maxWidth: "75%",
    // background: "#3F4041",
    marginLeft: theme.spacing(7),
    "border-bottom-left-radius": 3,
    "border-top-left-radius": 3,
    "border-top-right-radius": 15,
    "border-bottom-right-radius": 15,
    marginBottom: theme.spacing(1) * 0.3,
  },
  fromThemDark: {
    float: "left",
    clear: "both",
    color: theme.palette.common.white,
    position: "relative",
    "background-attachment": "fixed",
    // background: theme.palette.grey[500],
    marginLeft: theme.spacing(7),
    marginRight: "25%",
    maxWidth: "75%",
    "border-bottom-left-radius": 3,
    "border-top-left-radius": 3,
    "border-top-right-radius": 15,
    "border-bottom-right-radius": 15,
    marginBottom: theme.spacing(1) * 0.3,
  },
  fromThemFirst: {
    "border-top-left-radius": 15,
    marginTop: theme.spacing(0.2),
  },
  fromThemLast: {
    "border-bottom-left-radius": 15,
  },

  fromThemDarkBg: {
    "background-attachment": "fixed",
    background: theme.palette.grey[500],
  },

  fromThemLightBg: {
    "background-attachment": "fixed",
    background: "#3F4041",
  },

  chatAvatar: {
    // top: theme.spacing(0.3),
    marginLeft: theme.spacing(0.5),
    width: theme.spacing(4),
    height: theme.spacing(4),
  },

  chatAvatarTextAdjust: {
    marginTop: -theme.spacing(4),
  },

  otherUserName: {
    marginTop: theme.spacing(1.5),
    marginLeft: theme.spacing(7),
    fontSize: "0.7em",
    color: "#5D5D5E",
  },
});

class ChatLineList extends React.Component {
  constructor(props) {
    DEFCON5 && console.log("In ChatlistComponent constructor...");
    super(props);
    this.state = {
      line: "",
      error: undefined,
      saving: false,
    };
  }

  getAvatar(listItem) {
    const { classes } = this.props;
    DEFCON7 && console.log("Listitem to render as Avatar ");
    DEFCON7 && console.log(listItem);

    //TODO: make gravatar, get it once
    return listItem.avatar ? (
      <Avatar src={listItem.avatar} className={classes.chatAvatar} />
    ) : (
      // <Gravatar email={listItem.email} />
      <Avatar className={classes.chatAvatar}>
        {listItem.email ? (
          <Gravatar email={listItem.email} />
        ) : listItem.name ? (
          listItem.name.substring(0, 2)
        ) : (
          "xx"
        )}
      </Avatar>

      // <Avatar className={classes.chatAvatar}>
      //   {listItem.name ? listItem.name.substring(0, 2) : "xx"}
      // </Avatar>
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

  // handleChange = (event, newValue) => {
  //   //setValue(newValue);
  // };

  handleChange = (event) => {
    const text = event.target.value;
    DEFCON7 && console.log("New data ");
    DEFCON7 && console.log(text);
    this.setState({ line: text });
  };

  render() {
    return this.renderList2();
  }

  renderList2() {
    const { classes } = this.props;
    const iconButtonElement = (
      <IconButton tooltip="more" tooltipPosition="bottom-left" size="large">
        <MoreVertIcon nativecolor={grey[400]} />
      </IconButton>
    );

    const rightIconMenu = null;

    const {
      channelId,
      addChatLine,
      chatLineList,
      chatUsers,
      closeEditMode,
      readOnly,
      preview,
    } = this.props;

    DEFCON5 && console.log("In chatLine list component ");
    DEFCON5 && console.log(chatUsers);
    DEFCON7 && console.log("do list...");

    let chatLinesWithAvatars = chatLineList.slice().map((line) => {
      let userWithAvatar = chatUsers.find(
        (user) => user._id === line.createdBy
      );

      DEFCON7 && console.log("User object...");
      DEFCON7 && console.log(userWithAvatar);

      if (userWithAvatar === undefined) {
        return {
          _id: line._id,
          text: line.text,
          createdByName: line.username,
          createdBy: line.createdBy,
          createdAt: line.createdAt,
        };
      } else {
        return {
          _id: line._id,
          avatar:
            userWithAvatar.avatar_uri !== undefined
              ? userWithAvatar.avatar_uri
              : null,
          createdByName:
            userWithAvatar.name !== undefined ? userWithAvatar.name : "voff",
          text: line.text,
          email: userWithAvatar.emails[0].address,
          createdBy: line.createdBy,
          createdAt: line.createdAt,
        };
      }
    });

    DEFCON7 && console.log("do list done...");

    const canBeClosed = closeEditMode !== null && closeEditMode !== undefined;
    let createdAtLocal = "";
    let sameMinute4User = false;
    let prevUser = null;
    let prevDate = new Date("1900-01-01 12:00:00");
    let isFirst = true;
    let isLast = true;
    let newList = this._prepare_messages(chatLinesWithAvatars);
    let sectionStuff = [];

    newList.map((group, index, array) => {
      DEFCON7 && console.log("Group..");
      DEFCON7 && console.log(group);

      if (group[0]) {
        let diff = this._calcSeconds(prevDate, group[0].createdAt);
        DEFCON7 && console.log(diff);
        prevDate = group[0].createdAt;

        if (diff > 120) {
          let dateSection = this.renderLineDate2(
            group[0],
            rightIconMenu,
            index === array.length - 1
          );
          sectionStuff.push(dateSection);
        }
      }

      let section = (
        <div className={classes.messages}>
          {group.map((listItem, index, array) => {
            return this.renderLine2(
              listItem,
              rightIconMenu,
              index === 0,
              index === array.length - 1,
              !preview
            );
          })}
        </div>
      );
      sectionStuff.push(section);
    });

    return (
      <Fade in={true} timeout={500} style={{ transitionDelay: "100" }}>
        <div className={classes.chatlineText}>{sectionStuff}</div>
      </Fade>
    );
  }
  renderLine2(line, menuComponent, firstLine, lastLine, autoscroll) {
    const { classes, preview } = this.props;

    const myLine = line.createdBy === Meteor.userId();

    let themeModeDark = localStorage.getItem("themeMode")
      ? JSON.parse(localStorage.getItem("themeMode"))
      : false;
    const timeAgo = new TimeAgo("sv");
    const createdAt = timeAgo.format(line.createdAt);

    const avatar = myLine ? null : this.getAvatar(line);
    const lineDateClassName = myLine
      ? classes.chatLineMyline + " " + classes.chatLinePerson
      : classes.chatLinePerson;

    let myLineGroup = firstLine ? classes.fromMeFirst + " " : " ";
    myLineGroup = myLineGroup + (lastLine ? classes.fromMeLast : " ");

    let theirGroup = firstLine ? classes.fromThemFirst + " " : " ";
    theirGroup = theirGroup + (lastLine ? classes.fromThemLast : " ");

    const lineTextClassNameText = myLine
      ? classes.chatLinePerson +
        " " +
        classes.chatLineTextMyline +
        " " +
        classes.fromMe +
        " " +
        classes.fromMeBackgroundText +
        " " +
        myLineGroup
      : classes.chatLinePerson +
        " " +
        theirGroup +
        " " +
        (themeModeDark === true
          ? classes.fromThemDark + " " + classes.fromThemDarkBg
          : classes.fromThemLight + " " + classes.fromThemLightBg);

    const lineTextClassNameImage = myLine
      ? classes.chatLinePerson +
        " " +
        classes.chatLineTextMyline +
        " " +
        classes.fromMe +
        " " +
        classes.imageMessage +
        " " +
        myLineGroup
      : classes.chatLinePerson +
        " " +
        theirGroup +
        " " +
        (themeModeDark === true
          ? classes.fromThemDark + " " + classes.imageMessage
          : classes.fromThemLight + " " + classes.imageMessage);

    DEFCON7 && console.log("RENDER LINE");
    DEFCON7 && console.log(firstLine);
    DEFCON7 && console.log(lastLine);
    DEFCON7 && console.log(lineTextClassName);
    DEFCON7 && console.log(line);

    const AdjustClass = myLine ? null : classes.chatAvatarTextAdjust;

    /**
     * Analyse line and create array of text-object based on the line-type
     */

    let messages = this._prepareRenderText(line.text);

    let stuffToRender = [];
    let stuff;
    let indexKey = 0;
    messages.forEach((message) => {
      let lineTextClassName =
        message.type === "image"
          ? lineTextClassNameImage
          : lineTextClassNameText;
      stuff = (
        <div
          className={classes.listItem}
          key={line._id + "user" + indexKey}
          ref={
            autoscroll
              ? (component) => {
                  if (lastLine && component) {
                    let node = ReactDom.findDOMNode(component);
                    if (node) {
                      node.scrollIntoView();
                    }
                  }
                }
              : null
          }
        >
          {firstLine && lastLine && indexKey === 0 ? (
            <div>
              {myLine ? null : (
                <div className={classes.otherUserName}>
                  {line.createdByName}
                </div>
              )}
              <React.Fragment>
                {myLine ? null : indexKey === 0 && firstLine ? (
                  <div className={classes.chatAvatar}>{avatar}</div>
                ) : null}
                <div className={AdjustClass}>
                  <React.Fragment>
                    <span
                      key={line._id + "user" + indexKey}
                      className={lineTextClassName}
                    >
                      <Typography variant="body2" className={classes.inline}>
                        {this._renderText(message)}
                      </Typography>
                    </span>
                  </React.Fragment>
                </div>
              </React.Fragment>
            </div>
          ) : (
            <div>
              {myLine ? null : lastLine && indexKey === 0 ? (
                <div className={classes.chatAvatar}>{avatar}</div>
              ) : null}
              {myLine ? null : firstLine && indexKey === 0 ? (
                <div className={classes.otherUserName}>
                  {line.createdByName}
                </div>
              ) : null}
              <React.Fragment>
                <span
                  key={line._id + "user" + indexKey}
                  className={lineTextClassName}
                >
                  <Typography variant="body2" className={classes.inline}>
                    {this._renderText(message)}
                  </Typography>
                </span>
              </React.Fragment>
            </div>
          )}
        </div>
      );
      stuffToRender.push(stuff);
      indexKey = indexKey + 1;
    });

    return (
      <Fade in={true} timeout={1000} style={{ transitionDelay: "500ms" }}>
        <div>{stuffToRender}</div>
      </Fade>
    );
  }

  renderLineDate2(line, menuComponent, lastLine, autoscroll) {
    const { classes } = this.props;

    const myLine = line.createdBy === Meteor.userId();

    const createdAtDetailed = DateStringTransformer(
      Meteor.settings.public.listDateTimeFormat
    ).format(line.createdAt);
    DEFCON7 && console.log("DAte check");
    DEFCON7 && console.log(line.createdAt);
    TimeAgo.locale(sv);
    // Create relative date/time formatter.
    const timeAgo = new TimeAgo("sv");
    // const createdAt = timeAgo.format(line.createdAt);

    //if (myLine) {
    return (
      <Fade in={true} timeout={1000} style={{ transitionDelay: "500ms" }}>
        <div
          key={line._id + "date"}
          ref={
            autoscroll
              ? (component) => {
                  if (lastLine && component) {
                    let node = ReactDom.findDOMNode(component);
                    if (node) {
                      node.scrollIntoView();
                    }
                  }
                }
              : null
          }
        >
          <span className={classes.chatLineDate}>
            <TimeAgoLive dateToProcess={line.createdAt} /> ({createdAtDetailed})
          </span>
        </div>
      </Fade>
    );
  }
  _calcSeconds(dateA, dateB) {
    var a = new Date(dateA);
    var b = new Date(dateB);
    var difference = (b - a) / 1000;
    return difference;
  }

  _prepare_messages(chatLinesWithAvatars) {
    let groups = [];
    let newItem = true;
    let item = null;
    let newList = [];
    DEFCON7 && console.log("do list done...");

    let createdAtLocal = "";
    let sameMinute4User = false;
    let prevUser = null;
    let prevDate = new Date("1900-01-01 12:00:00");
    let isFirst = true;
    let isLast = true;
    // checka lista
    // kolla first att det är inom samma tidsgrupp
    // kolla sen om det samma användare och om den är det lägg in i en grupp

    chatLinesWithAvatars.map((listItem, index, array) => {
      DEFCON7 && console.log(listItem.createdAt);
      let diff = this._calcSeconds(prevDate, listItem.createdAt);
      DEFCON7 && console.log(diff);
      prevDate = listItem.createdAt;

      // A group is 2 minutes atm
      if (diff > 120) {
        newList.push(groups);
        groups = [];
        prevUser = listItem.createdBy;
        groups.push(listItem);
      } else {
        sameMinute4User = prevUser === listItem.createdBy;
        prevUser = listItem.createdBy;
        if (sameMinute4User) {
          groups.push(listItem);
        } else {
          // Create a new group
          newList.push(groups);
          groups = [];
          groups.push(listItem);
        }
      }
    });
    newList.push(groups);
    DEFCON7 && console.log("PrepList");
    DEFCON7 && console.log(newList);
    return newList;
  }

  _aLinkImage(imageUrl) {
    var pathArray = imageUrl.split("/");
    var protocol = pathArray[0];
    var host = pathArray[2];
    var baseUrl = protocol + "//" + host;
    let imageLink =
      '<a href="' +
      baseUrl +
      '" target="_blank" >' +
      '<img src="' +
      imageUrl +
      '" width="380" height="auto"' +
      "</a>";
    DEFCON5 && console.log("Result url in linkify");
    DEFCON5 && console.log(imageLink);
    return imageLink;
  }
  _linkify(text) {
    var urlRegex =
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    return text.replace(urlRegex, function (url) {
      DEFCON5 && console.log("Testing url");
      var pathArray = url.split("/");
      var protocol = pathArray[0];
      var host = pathArray[2];
      var baseUrl = protocol + "//" + host;
      DEFCON5 && console.log(url);
      if (url !== undefined) {
        let isAnImage =
          url.toLowerCase().match(/\.(jpeg|jpg|gif|png)$/) != null;
        if (isAnImage) {
          let imageLink =
            '<a href="' +
            baseUrl +
            '" target="_blank" >' +
            '<img src="' +
            url +
            '" class="rounded-corners-me" width="380" height="auto"' +
            "</a>";
          DEFCON5 && console.log("Result url in linkify");
          DEFCON5 && console.log(imageLink);
          return imageLink;
        } else {
          return '<a href="' + url + '" target="_blank" >' + baseUrl + "</a>";
        }
      }
    });
  }

  _detectURLs(message) {
    var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    return message.match(urlRegex);
  }
  isHTML(str) {
    var a = document.createElement("div");
    a.innerHTML = str;

    for (var c = a.childNodes, i = c.length; i--; ) {
      if (c[i].nodeType == 1) return true;
    }

    return false;
  }

  _replaceURLs(message) {
    if (!message) return message;

    // do not process if message already is a html object
    if (this.isHTML(message)) return message;

    var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    return message.replace(urlRegex, function (url) {
      var pathArray = url.split("/");
      var protocol = pathArray[0];
      var host = pathArray[2];
      var baseUrl = protocol + "//" + host;
      var hyperlink = url;
      if (!hyperlink.match("^https?://")) {
        hyperlink = "http://" + hyperlink;
      }

      return (
        '<a href="' +
        hyperlink +
        '" target="_blank" rel="noopener noreferrer">' +
        baseUrl +
        "</a>"
      );
    });
  }

  _prepareRenderText(message) {
    DEFCON5 && console.log("Creating array of text-objects ");
    DEFCON5 && console.log("Incomming message ");
    DEFCON5 && console.log(message);

    let messages = [];
    /**
     * Special case: Check if there is a iframe in the string. in that case just return one string atm
     */
    if (message.search("<iframe") !== -1) {
      let aMessage = {
        text: message,
        type: "image",
      };
      messages.push(aMessage);
      return messages;
    }

    let aMessage = {};
    let urls = this._detectURLs(message);
    DEFCON5 && console.log("checking url result");
    DEFCON5 && console.log(urls);

    if (urls !== null) {
      urls.forEach((url) => {
        let newText = this._linkify(url);
        let isAnImage = newText.search("<img") !== -1;
        if (isAnImage) {
          aMessage = {
            text: newText,
            type: isAnImage ? "image" : "link",
          };
          messages.push(aMessage);
        }
      });
    }
    aMessage = {
      text: this._replaceURLs(message),
      type: "text",
    };

    messages.push(aMessage);

    let newMessage = this._replaceURLs(message);
    let imageUrl = this._linkify(message);
    DEFCON5 && console.log(message);
    DEFCON5 && console.log(urls);
    DEFCON5 && console.log(newMessage);
    DEFCON5 && console.log(imageUrl);
    DEFCON5 && console.log(messages);
    return messages;
  }

  _renderText(message) {
    let data_text = message.text;
    DEFCON5 && console.log("Checking data html from mdp ");
    DEFCON5 && console.log(message);

    DEFCON5 && console.log(data_text);

    let output =
      message.type === "nada"
        ? this._aLinkImage(data_text)
        : data_text.replace(/(\r\n|\n|\r)/gm, "");
    DEFCON5 && console.log("After linkify");
    DEFCON5 && console.log(output);

    return (
      <div
        className="rounded-corners chat"
        style={{
          h1: { "font-size": "2rem" },
          opacity: this.state.loading ? 0 : 1,
          transition: "opacity, 2s ease-in-out",
          "overflow-wrap": "anywhere",
          borderRadius: "15%",
          paddingTop: message.type !== "image" ? 6 : 0,
          paddingLeft: message.type !== "image" ? 12 : 0,
          paddingRight: message.type !== "image" ? 12 : 0,
          paddingBottom: message.type !== "image" ? 6 : 0,
          // a: {
          //   "&:link": {
          //     color: "#006600",
          //     "text-decoration": "none",
          //   },
          //   "&:visited": {
          //     color: "#006600",
          //     "text-decoration": "none",
          //   },
          //   "&:hover": {
          //     color: "#006600",
          //     "text-decoration": "none",
          //   },
          //   "&:active": {
          //     color: "#006600",
          //     "text-decoration": "none",
          //   },
          // },
          p: { margin: 0, marginBottom: 0 },
        }}
        dangerouslySetInnerHTML={{
          __html: output,
        }}
      />
    );
  }

  removeItem(itemId) {
    const { removeChatLine, channelId } = this.props;
    removeChatLine(channelId, itemId);
  }

  // addLine() {
  //   DEFCON7 && console.log("new line... ");

  //   const { line } = this.state;
  //   DEFCON7 && console.log(line);

  //   const { addChatLine, channelId } = this.props;
  //   if (line.length) {
  //     addChatLine(channelId, line, (error, result) => {
  //       if (error) {
  //         this.handleNotification(error, result);
  //       } else {
  //         this.setState({ line: "" });
  //       }
  //     });
  //   }
  // }
}

ChatLineList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatLineList);
{
  /* <ChatEdit
          className={classes.sub_div}
          chatLineList={chatLineList}
          chatUsers={chatUsers}
          readOnly={readOnly}
          addChatLine={addChatLine}
          channelId={channelId}
        /> */
}
{
  /* <TextField
            helperText={i18n.__("Tooltip_ChatLineListComponent_Text")}
            fullWidth={true}
            inputProps={{
              multiline: "true",
            }}
            value={this.state.line}
            disabled={readOnly}
            placeholder={i18n.__("Label_Chat_Placeholder_Send")}
            label={i18n.__("Label_Chat_Placeholder_Send_Label")}
            onChange={this.handleChange}
            onKeyPress={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                if (event && event.preventDefault) {
                  event.preventDefault();
                  this.addLine();
                }
              }
            }}
          /> */
}
// appBar: {
//   top: "auto",
//   bottom: 0,
//   padding: theme.spacing(2),
//   zIndex: 100000,
//   // backgroundColor: theme.palette.white,
// },
// inline: {
//   display: "inline",
// },
// divider: {
//   marginTop: theme.spacing(2),
//   marginBottom: theme.spacing(2),
// },
// paper: {
//   paddingLeft: theme.spacing(1),
//   paddingRight: theme.spacing(1),
//   color: theme.palette.text.secondary,
// },
// BottomNavigation: {
//   paddingLeft: theme.spacing(1),
//   paddingRight: theme.spacing(1),
// },
// card: {
//   padding: theme.spacing(2),
//   textAlign: "left",
//   color: theme.palette.text.secondary,
// },

// //chatWindow: { marginBottom: 100, overflow: "auto" },
// chatLineText: {
//   // backgroundColor: theme.palette.secondary.light,
//   padding: 0,
//   marginLeft: 10,
//   borderRadius: 5,
//   whiteSpace: "pre-wrap",
//   wordWrap: "break-word",
// },
// chatWindow: {
//   display: "flex",
//   flex: 3,
//   flexDirection: "column",
//   borderWidth: "1px",
//   borderColor: "#ccc",
//   borderRightStyle: "solid",
//   borderLeftStyle: "solid",
//   backgroundColor: "green",
//   marginBottom: 0,
//   overflow: "auto",
// },
