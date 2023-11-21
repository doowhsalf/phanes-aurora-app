import React from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";

import withStyles from '@mui/styles/withStyles';
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
  edit: {
    width: "100%",
    background: theme.palette.background.default,

    marginBottom: theme.spacing(1),
  },
  editProps: {
    background: "red",
  },
});
class ChatEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      line: "",
    };
  }
  handleChange = (event) => {
    var text = event.target.value;
    DEFCON5 && console.log("New data ");
    DEFCON5 && console.log(event);

    if (event.keyCode === 13) {
      text = text + "/n";
    }
    this.setState({ line: text });
  };

  handleFocusAndBlur = (event) => {
    var text = event.target.value;
    const { channelId } = this.props;

    DEFCON5 && console.log("Focus and Blur");
    Meteor.call("chatlinelists.focusChatline", channelId, (err, result) => {
      if (!err) {
        DEFCON5 && console.log("Send a focus request for user to server");
        DEFCON5 && console.log(result);
        DEFCON5 && console.log(err);
      } else {
        DEFCON5 && console.log("Some error happend");
        DEFCON5 && console.log(err);
      }
    });
  };

  addCr = () => {
    var text = event.target.value;
    text = text + "\n";
    this.setState({ line: text });
  };

  render() {
    //take onchange to avoid overwrite by ...other
    const { classes, chatLineList, chatUsers, readOnly, ...other } = this.props;
    return (
      <TextField
        className={classes.edit}
        // inputProps={{ className: classes.editProps }}
        // helperText={i18n.__("Tooltip_ChatLineListComponent_Text")}
        fullWidth
        multiline
        variant="outlined"
        value={this.state.line}
        disabled={readOnly}
        placeholder={i18n.__("Label_Chat_Placeholder_Send")}
        label={i18n.__("Label_Chat_Placeholder_Send_Label")}
        onChange={this.handleChange}
        onFocus={this.handleFocusAndBlur}
        onBlurr={this.handleFocusAndBlur}
        onKeyPress={(event) => {
          DEFCON5 && console.log("KeyPress ");
          DEFCON5 && console.log(event);

          if (event.code === "Enter") {
            if (event.ctrlKey) {
              this.addCr();
            } else {
              this.addLine();
            }
          }
        }}
      />
    );
  }

  addLine() {
    DEFCON7 && console.log("new line... ");

    const { line } = this.state;
    DEFCON7 && console.log(line);

    const { addChatLine, channelId } = this.props;
    if (line.length) {
      addChatLine(channelId, line, (error, result) => {
        if (error) {
          // this.handleNotification(error, result);
          DEFCON5 && console.log("ERROR FOR SOME REASON");
          DEFCON5 && console.log(error);
        } else {
          this.setState({ line: "" });
        }
      });
    }
  }
}

ChatEdit.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatEdit);

/* 
if (event.keyCode === 13 && !event.shiftKey) {
              if (event && event.preventDefault) {
                event.preventDefault();
                this.addLine();
              }*/
