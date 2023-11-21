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
import withStyles from "@mui/styles/withStyles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import i18n from "meteor/universe:i18n";
import { desc, stableSort, getSorting } from "./searchhelpers";
import Button from "@mui/material/Button";
import UpdateSensorDialog from "./mcc_table_data_changesensor";
import classNames from "classnames";

import Avatar from "@mui/material/Avatar";
import Flag from "react-world-flags";
import Badge from "@mui/material/Badge";
import { _uniqueKey } from "../helpers/helper";
import { getField, getFieldObject } from "../helpers/getField";
import {
  red,
  yellow,
  blueGrey as bluegrey,
  deepPurple,
  blue as deepBlue,
} from "@mui/material/colors";

/* "_id" : ObjectId("63b0110a8df891000795ecd9"),
    "point_id" : "SF.lora-ota-70B3D580A010BFA4.KW4AL76310.CloudGate",
    "value" : NumberInt(7),
    "brickSensorClass" : "Uknown_Sensor_SF",
    "brickSensorClassQuantity" : "unknown_sensor_quantity_SF",
    "timestamp_read" : "1672483081",
    "time_read_string" : "2022-12-31 11:38:1",
    "timestamp_write" : "1672483082",
    "time_write_string" : "2022-12-31 11:38:2",
    "status" : "active",
    "processStatus" : "suspence.unknown_brickSensorClass",
    "transformedElement" : "SF",
    "transformedElement2" : "SF"*/

const rows = [
  /*{
    id: "priority",
    numeric: false,
    disablePadding: true,
    label: "#"
  },*/
  {
    id: "lastKnownValue",
    numeric: false,
    disablePadding: true,
    label: "lastKnownValue",
  },
  {
    id: "point_id",
    numeric: false,
    disablePadding: false,
    label: "point_id",
  },
  {
    id: "brickSensorClassQuantity",
    numeric: false,
    disablePadding: false,
    label: "brickSensorClassQuantity",
  },
  {
    id: "brickSensorClass",
    numeric: false,
    disablePadding: false,
    label: "brickSensorClass",
  },

  {
    id: "timestamp_read",
    numeric: false,
    disablePadding: false,
    label: "timestamp_read",
  },

  {
    id: "processStatus",
    numeric: false,
    disablePadding: false,
    label: "processStatus",
  },
  {
    id: "lastKnownValue",
    numeric: false,
    disablePadding: false,
    label: "lastKnownValue",
  },
  {
    id: "transformedElement",
    numeric: false,
    disablePadding: false,
    label: "transformedElement",
  },
  {
    id: "command",
    numeric: false,
    disablePadding: false,
    label: "command",
  },
  {
    id: "topic",
    numeric: false,
    disablePadding: false,
    label: "topic",
  },
  {
    id: "update",
    numeric: false,
    disablePadding: false,
    label: "Update",
  },
];

class SearchlistHead extends React.Component {
  createSortHandler = (property) => (event) => {
    this.props.onRequestSort(event, property);
  };

  renderLabel(labelid) {
    let label = "";
    switch (labelid) {
      /* case "priority":
        label = "#";
        break;*/
      case "_id":
        label = "#";
        break;
      case "point_id":
        label = i18n.__("Table_Column_point_id");
        break;
      case "brickSensorClassQuantity":
        label = i18n.__("Table_Column_brickSensorClassQuantity");
        break;
      case "brickSensorClass":
        label = i18n.__("Table_Column_brickSensorClass");
        break;
      case "timestamp_read":
        label = i18n.__("Table_Column_timestamp_read");
        break;
      case "transformedElement":
        label = i18n.__("Table_Column_transformedElement");
        break;
      case "processStatus":
        label = i18n.__("Table_Column_processStatus");
        break;
      case "lastKnownValue":
        label = i18n.__("Table_Column_lastKnownValue");
        break;
      case "command":
        label = i18n.__("Table_Column_command");
        break;
      case "topic":
        label = i18n.__("Table_Column_topic");
        break;
      case "change_sensor_class":
        label = i18n.__("Table_Column_change_sensor_class");
        break;
      default:
        break;
    }
    return label;
  }

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(
            (row) => (
              <TableCell
                key={row.id}
                align={row.numeric ? "right" : "left"}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {this.renderLabel(row.id)}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

SearchlistHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  selectedRow: null,
};

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
    minHeight: 30,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: "auto",
  },

  row: {},
  row_inactive_role: {
    backgroundColor: theme.palette.error.light,
  },
  row_inactive_person: {
    backgroundColor: theme.palette.warning.light,
  },
  row_future_order: {
    backgroundColor: theme.palette.info.light,
  },
  badge: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  avatar_rca_single: {
    display: "inline-grid",

    width: 30,
    height: 30,
    color: "#FFFFFF",
    backgroundColor: deepBlue[500],
  },
  avatar_rca_combined: {
    display: "inline-grid",

    width: 30,
    height: 30,
    color: "#FFFFFF",
    marginLeft: -5,
    backgroundColor: deepBlue[500],
  },
  avatar_pep: {
    display: "inline-grid",

    width: 30,
    height: 30,
    color: "#FFFFFF",
    backgroundColor: deepPurple[500],
  },
  avatar_pr: {
    flexGrow: 1,
    width: 30,
    minWidth: 30,
    height: 30,
    color: "#fff",
    backgroundColor: red[500],
  },
  inline: {
    display: "inline-grid",
  },
  textavatar: {
    color: "#fff",
  },
  cropper_combined: {
    width: 30,
    height: 30,
    marginLeft: -5,
    overflow: "hidden",
    position: "relative",
    borderRadius: "50%",
    display: "inline-grid",
  },
  cropper: {
    width: 30,
    height: 30,
    overflow: "hidden",
    position: "relative",
    borderRadius: "50%",
    display: "inline-grid",
  },
  flag: {
    display: "inline",
    margin: "0 auto",
    height: "100%",
    width: "auto",
  },
});

class Searchlist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: "asc",
      orderBy: "priority",
      selected: [],
      rowsPerPageDefault: 10,
      page: 0,
      isDialogOpen: false,
      openDialog: false,
      selectedRow: null,
    };
  }
  // openDialog = () => {
  //   this.setState({ openDialog: true });
  // };

  closeDialog = () => {
    this.setState({ openDialog: false });
  };
  handleOpenDialog = (row) => {
    this.setState({
      openDialog: true,
      isDialogOpen: true,
      selectedRow: row,
    });
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleClick = (event, id) => {
    if (id) {
      FlowRouter.go(`/point_id/${id}`);
    }
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleSelectAllClick = (event) => {
    if (event.target.checked) {
      this.setState((state) => ({ selected: state.data.map((n) => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };
  handleCellClick = (event, id, cell) => {
    DEFCON5 && console.log("Cliced Cell");
    DEFCON5 && console.log(event);
    DEFCON5 && console.log(id);
    DEFCON5 && console.log(cell);
    let personid = id;
    FlowRouter.go(`/person/${personid}`);
    location.reload();
  };

  isSelected = (id) => this.state.selected.indexOf(id) !== -1;

  render() {
    const { nodeConfigs, classes } = this.props;

    //let data = this.prepareData(searchPersons, organisation_search);
    DEFCON5 && console.log("Render nodeConfigs");
    const { order, orderBy, selected, rowsPerPageDefault, page } = this.state;

    let numOfConfigRows = nodeConfigs !== undefined ? nodeConfigs.length : 0;
    let rowsPerPage = numOfConfigRows ? numOfConfigRows : rowsPerPageDefault;

    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, numOfConfigRows - page * rowsPerPage);

    DEFCON5 && console.log("Person Person List");
    DEFCON5 && console.log(rowsPerPage);
    DEFCON5 && console.log(emptyRows);
    DEFCON5 && console.log(this.state);
    DEFCON5 && console.log(this.props);
    DEFCON5 && console.log(nodeConfigs);

    return (
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            size="small"
            aria-labelledby="tableTitle"
          >
            <SearchlistHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={numOfConfigRows}
            />

            <TableBody>
              {stableSort(nodeConfigs, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n) => {
                  return (
                    <TableRow
                      hover
                      // onClick={(event) => this.handleClick(event, n.point_id)}
                      tabIndex={-1}
                      key={_uniqueKey()}
                      // className={getRowClassNameByPrio(n.priority, classes)}
                      //                         {getFieldObject(n, "_id", "_str")}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        align="left"
                      >
                        {getField(n, "value")}
                      </TableCell>
                      <TableCell align="left">
                        {getField(n, "point_id")}
                      </TableCell>

                      <TableCell align="left">
                        {getField(n, "brickSensorClassQuantity")}
                      </TableCell>
                      <TableCell align="left">
                        {getField(n, "brickSensorClass")}
                      </TableCell>
                      <TableCell align="left">
                        {getField(n, "time_read_string")}
                      </TableCell>
                      <TableCell align="left">
                        {getField(n, "processStatus")}
                      </TableCell>
                      <TableCell align="left">{getField(n, "value")}</TableCell>
                      <TableCell align="left">
                        {getField(n, "transformedElement")}
                      </TableCell>
                      <TableCell align="left">
                        {getField(n, "command")}
                      </TableCell>
                      <TableCell align="left">{getField(n, "topic")}</TableCell>
                      <TableCell align="right">
                        <Button onClick={() => this.handleOpenDialog(n)}>
                          Edit 
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={nodeConfigs.length}
          rowsPerPage={rowsPerPage !== undefined ? rowsPerPage : 0}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page",
          }}
          onPageChange={this.handleChangePage}
          onRowsPerPageChange={this.handleChangeRowsPerPage}
        />
        <UpdateSensorDialog
          open={this.state.openDialog}
          onClose={this.closeDialog}
          row={this.state.selectedRow}
        />
      </Paper>
    );
  }
}

Searchlist.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Searchlist);
