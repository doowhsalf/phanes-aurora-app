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

import classNames from "classnames";

import Avatar from "@mui/material/Avatar";
import Flag from "react-world-flags";
import Badge from "@mui/material/Badge";
import { _uniqueKey } from "../helpers/helper";
import { getField } from "../helpers/getField";
import {
  red,
  yellow,
  blueGrey as bluegrey,
  deepPurple,
  blue as deepBlue,
} from "@mui/material/colors";

/* "_id" : "Tvättmaskin.57",
    "entity_class" : "point",
    "point_class" : "sensor",
    "brickSensorClass" : "Active_Power_Sensor",
    "gatewayClassId" : "FIBARO",
    "gatewayId" : "robert.rennel",
    "lastKnownValue" : "0.4",
    "time_read" : "1672159765",
    "time_read_string" : "2022-12-27 17:49:25",
    "timestamp_write" : "1672159765",
    "time_write_string" : "2022-12-27 17:49:25"*/

const rows = [
  /*{
    id: "priority",
    numeric: false,
    disablePadding: true,
    label: "#"
  },*/
  {
    id: "_id",
    numeric: false,
    disablePadding: true,
    label: "#",
  },
  {
    id: "entity_class",
    numeric: false,
    disablePadding: false,
    label: "entity_class",
  },
  {
    id: "point_class",
    numeric: false,
    disablePadding: false,
    label: "point_class",
  },
  {
    id: "brickSensorClass",
    numeric: false,
    disablePadding: false,
    label: "brickSensorClass",
  },

  {
    id: "gatewayClassId",
    numeric: false,
    disablePadding: false,
    label: "gatewayClassId",
  },

  {
    id: "gatewayId",
    numeric: false,
    disablePadding: false,
    label: "gatewayId",
  },
  {
    id: "lastKnownValue",
    numeric: false,
    disablePadding: false,
    label: "lastKnownValue",
  },
  {
    id: "time_read_string",
    numeric: false,
    disablePadding: false,
    label: "time_read_string",
  },
];

class SearchlistHead extends React.Component {
  createSortHandler = (property) => (event) => {
    this.props.onRequestSort(event, property);
  };

  /*
gatewayClassId: "Årstavägen 106 / Ullungen 1"
dispatchgroup: "1"
time_read_string: "VP"
entity_class: "035_07"
entity_class_orginal: "035-07"
point_class: "9387"
brickSensorClass: "9387_01"
time_write_string: "OK"
signalgroup: "SECONDARY"
status: "active"
subcircuit: "01"
lastKnownValue: "1"
ttc: "60"
gatewayId: "SV21"
write_heat_proc_status: null
write_power_proc_status: "OK"

*/

  renderLabel(labelid) {
    let label = "";
    switch (labelid) {
      /* case "priority":
        label = "#";
        break;*/
      case "_id":
        label = "#";
        break;
      case "entity_class":
        label = i18n.__("Table_Column_entity_class");
        break;
      case "point_class":
        label = i18n.__("Table_Column_point_class");
        break;
      case "brickSensorClass":
        label = i18n.__("Table_Column_brickSensorClass");
        break;
      case "gatewayClassId":
        label = i18n.__("Table_Column_gatewayClassId");
        break;
      case "time_read_string":
        label = i18n.__("Table_Column_time_read_string");
        break;
      case "gatewayId":
        label = i18n.__("Table_Column_gatewayId");
        break;
      case "lastKnownValue":
        label = i18n.__("Table_Column_lastKnownValue");
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
    };
  }

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
      FlowRouter.go(`/entity_class/${id}`);
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
                      onClick={(event) =>
                        this.handleClick(event, n.entity_class)
                      }
                      tabIndex={-1}
                      key={_uniqueKey()}
                      // className={getRowClassNameByPrio(n.priority, classes)}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        align="left"
                      >
                        {getField(n, "_id")}
                      </TableCell>
                      <TableCell align="left">
                        {getField(n, "entity_class")}
                      </TableCell>

                      <TableCell align="left">
                        {getField(n, "point_class")}
                      </TableCell>
                      <TableCell align="left">
                        {getField(n, "brickSensorClass")}
                      </TableCell>
                      <TableCell align="left">
                        {getField(n, "gatewayClassId")}
                      </TableCell>
                      <TableCell align="left">
                        {getField(n, "gatewayId")}
                      </TableCell>
                      <TableCell align="left">
                        {getField(n, "lastKnownValue")}
                      </TableCell>
                      <TableCell align="left">
                        {getField(n, "time_read_string")}
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
      </Paper>
    );
  }
}

Searchlist.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Searchlist);
