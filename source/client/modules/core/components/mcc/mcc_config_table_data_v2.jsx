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
import { red, yellow, blueGrey as bluegrey, deepPurple, blue as deepBlue } from '@mui/material/colors';
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
    id: "facility",
    numeric: false,
    disablePadding: true,
    label: "facility",
  },
  {
    id: "mid",
    numeric: false,
    disablePadding: false,
    label: "mid",
  },
  {
    id: "mid_uuid",
    numeric: false,
    disablePadding: false,
    label: "mid_uuid",
  },

  { id: "address", numeric: false, disablePadding: false, label: "address" },

  {
    id: "valve_type",
    numeric: false,
    disablePadding: false,
    label: "valve_type",
  },
  {
    id: "sv21_manual_signal_method",
    numeric: false,
    disablePadding: false,
    label: "sv21_manual_signal_method",
  },
  {
    id: "energy_delivery_method",
    numeric: false,
    disablePadding: false,
    label: "energy_delivery_method",
  },
  {
    id: "read_proc_status",
    numeric: false,
    disablePadding: false,
    label: "read_proc_status",
  },
  {
    id: "write_heat_proc_status",
    numeric: false,
    disablePadding: false,
    label: "write_heat_proc_status",
  },

  {
    id: "write_power_proc_status",
    numeric: false,
    disablePadding: false,
    label: "write_power_proc_status",
  },

  {
    id: "subcircuit",
    numeric: false,
    disablePadding: false,
    label: "subcircuit",
  },
];

class SearchlistHead extends React.Component {
  createSortHandler = (property) => (event) => {
    this.props.onRequestSort(event, property);
  };

  /*
address: "Årstavägen 106 / Ullungen 1"
dispatchgroup: "1"
energy_delivery_method: "VP"
facility: "035_07"
facility_orginal: "035-07"
mid: "9387"
mid_uuid: "9387_01"
read_proc_status: "OK"
signalgroup: "SECONDARY"
status: "active"
subcircuit: "01"
sv21_manual_signal_method: "1"
ttc: "60"
valve_type: "SV21"
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
      case "facility":
        label = i18n.__("Table_searchpersonList_Column_facility");
        break;
      case "mid":
        label = i18n.__("Table_searchpersonList_Column_mid");
        break;
      case "mid_uuid":
        label = i18n.__("Table_searchpersonList_Column_mid_uuid");
        break;
      case "address":
        label = i18n.__("Table_searchpersonList_Column_address");
        break;
      case "energy_delivery_method":
        label = i18n.__("Table_searchpersonList_Column_energy_delivery_method");
        break;
      case "valve_type":
        label = i18n.__("Table_searchpersonList_Column_valve_type");
        break;
      case "sv21_manual_signal_method":
        label = i18n.__(
          "Table_searchpersonList_Column_sv21_manual_signal_method"
        );
        break;
      case "write_power_proc_status":
        label = i18n.__(
          "Table_searchpersonList_Column_write_power_proc_status"
        );
        break;
      case "write_heat_proc_status":
        label = i18n.__("Table_searchpersonList_Column_write_heat_proc_status");
        break;
      case "read_proc_status":
        label = i18n.__("Table_searchpersonList_Column_write_read_proc_status");
        break;
      case "subcircuit":
        label = i18n.__("Table_searchpersonList_Column_subcircuit");
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
      FlowRouter.go(`/facility/${id}`);
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
    const { mccConfigs, classes } = this.props;

    //let data = this.prepareData(searchPersons, organisation_search);
    DEFCON5 && console.log("Render mccConfigs");
    const { order, orderBy, selected, rowsPerPageDefault, page } = this.state;

    let numOfConfigRows = mccConfigs !== undefined ? mccConfigs.length : 0;
    let rowsPerPage = numOfConfigRows ? numOfConfigRows : rowsPerPageDefault;

    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, numOfConfigRows - page * rowsPerPage);

    DEFCON5 && console.log("Person Person List");
    DEFCON5 && console.log(rowsPerPage);
    DEFCON5 && console.log(emptyRows);
    DEFCON5 && console.log(this.state);
    DEFCON5 && console.log(this.props);

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
              {stableSort(mccConfigs, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n) => {
                  return (
                    <TableRow
                      hover
                      onClick={(event) => this.handleClick(event, n.facility)}
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
                        {getField(n, "facility")}
                      </TableCell>

                      <TableCell align="left">{getField(n, "mid")}</TableCell>
                      <TableCell align="left">
                        {getField(n, "mid_uuid")}
                      </TableCell>
                      <TableCell align="left">
                        {getField(n, "address")}
                      </TableCell>
                      <TableCell align="left">
                        {getField(n, "valve_type")}
                      </TableCell>
                      <TableCell align="left">
                        {getField(n, "sv21_manual_signal_method")}
                      </TableCell>
                      <TableCell align="left">
                        {getField(n, "energy_delivery_method")}
                      </TableCell>
                      <TableCell align="left">
                        {getField(n, "read_proc_status")}
                      </TableCell>
                      <TableCell align="left">
                        {getField(n, "write_heat_proc_status")}
                      </TableCell>
                      <TableCell align="left">
                        {getField(n, "write_power_proc_status")}
                      </TableCell>
                      <TableCell align="left">
                        {getField(n, "subcircuit")}
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
          count={mccConfigs.length}
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
