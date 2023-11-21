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
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import CloudDownload from "@mui/icons-material/CloudDownload";
import { Card, CardHeader, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import SnackBarMessage from "../fields/snackbar-message";

const styles = (theme) => ({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    minWidth: 650,
  },
  paper: {
    zIndex: 1,
    position: "relative",
    margin: theme.spacing(2),
    marginTop: theme.spacing(0),
  },
  avatar: {},
});

class FileareaList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      approveDialogVisible: false,
      selectedUser: null,
      updateTime: Date.now(),
      openSnackbar: false,
      snackbarMessage: "",
      snackbarMessageVariant: "warning",
    };
  }

  downloadFile = (filename) => {
    DEFCON3 && console.log("Clicked for downlaod");
    DEFCON3 && console.log(filename);
    const { fileareaGetItem } = this.props;
    var query = {
      field_filename: filename,
    };

    fileareaGetItem(query, (err, response) => {
      if (err) {
        DEFCON5 && console.log("fileareaQuery: Error getting Filearea");
        DEFCON5 && console.log(err);
      } else {
        DEFCON3 && console.log("Getting download link to file");
        DEFCON3 && console.log(response);
        // display Snackbar...
        this.setState({
          snackbarMessage: i18n.__("Entity_Label_Download_Success"),
          openSnackbar: true,
          snackbarMessageVariant: "success",
        });
        //TODO: ADD File-stuff here
        //window.open(response.file_link);
        // const link = document.createElement("a");
        // link.href = response.file_link;
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
        var anchor = document.createElement("a");
        anchor.href = response.file_link;
        anchor.target = "_blank";
        anchor.download = filename;
        anchor.click();
      }
    });
  };

  handleSnackbarClose = () => {
    this.setState({
      openSnackbar: false,
    });
  };

  render() {
    const { classes, filearea } = this.props;

    return (
      <div className={classes.root}>
        <Card className={classes.paper}>
          <CardHeader
            title={
              <Typography variant="h5" id="adminsListTitle">
                {i18n.__("Entity_FileareaList_AdminsTitle")}
              </Typography>
            }
          />
          <CardContent>
            <Table className={classes.table} size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    {i18n.__("Entity_FileareaList_Download")}
                  </TableCell>
                  <TableCell align="left">
                    {i18n.__("Entity_FileareaList_Name")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filearea
                  ? filearea.map((fileItem) => (
                      <TableRow key={fileItem}>
                        <TableCell padding="normal" align="left">
                          <IconButton
                            className={classes.button}
                            aria-label="download"
                            onClick={() => {
                              this.downloadFile(fileItem);
                            }}
                            size="large">
                            <CloudDownload />
                          </IconButton>
                        </TableCell>

                        <TableCell align="left">{fileItem}</TableCell>
                      </TableRow>
                    ))
                  : ""}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <SnackBarMessage
          open={this.state.openSnackbar}
          handleSnackbarClose={this.handleSnackbarClose}
          variant={
            this.state.snackbarMessageVariant
              ? this.state.snackbarMessageVariant
              : "information"
          }
          message={this.state.snackbarMessage}
        />
      </div>
    );
  }
}

FileareaList.propTypes = {
  classes: PropTypes.object.isRequired,
  fileareas: PropTypes.array.isRequired,
};

export default withStyles(styles)(FileareaList);
