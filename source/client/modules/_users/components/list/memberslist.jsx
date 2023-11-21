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
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { USER_STATUS_ACTIVE, USER_STATUS_INACTIVE } from "/lib/constants";
import { Card, CardHeader, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";

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

class MembersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, users, onAction, title } = this.props;
    return (
      <div className={classes.root}>
        <Card className={classes.paper}>
          <CardHeader
            title={
              <Typography variant="h5" id="membersListTitle">
                {title}
              </Typography>
            }
          />
          <CardContent>
            <Table className={classes.table} size="small">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" align="left">
                    {i18n.__("Entity_UsersList_Active")}
                  </TableCell>
                  <TableCell padding="checkbox" align="left">
                    {i18n.__("Entity_UserList_Pic")}
                  </TableCell>
                  <TableCell padding="checkbox" align="left">
                    {i18n.__("Entity_UsersList_Email")}
                  </TableCell>
                  <TableCell align="left">
                    {i18n.__("Entity_UsersList_Name")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.uid}>
                    <TableCell align="left">
                      <Checkbox
                        checked={user.status === USER_STATUS_ACTIVE}
                        onChange={() => onAction(user)}
                      />
                    </TableCell>
                    <TableCell align="left">
                      <Avatar alt="uri" src={user.uri} />
                    </TableCell>
                    <TableCell align="left">{user.mail}</TableCell>
                    <TableCell align="left">{user.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }
}

MembersList.propTypes = {
  classes: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  onAction: PropTypes.func.isRequired,
  title: PropTypes.string,
  actionName: PropTypes.string,
};

export default withStyles(styles)(MembersList);
