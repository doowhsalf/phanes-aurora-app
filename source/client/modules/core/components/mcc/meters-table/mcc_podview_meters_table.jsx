import React from "react";
import classNames from "classnames";

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
import { desc, stableSort, getSorting } from "../searchhelpers";

import Avatar from "@mui/material/Avatar";
import Flag from "react-world-flags";
import Badge from "@mui/material/Badge";
import { _uniqueKey } from "../../helpers/helper";
import { getField, getFieldObject, getFieldDate, getFieldDateTime } from "../../helpers/getField";
import {
  red,
  yellow,
  blueGrey as bluegrey,
  deepPurple,
  blue as deepBlue,
} from "@mui/material/colors";

/* 
   
  "_id" : "meter_1191_ljussensor_",
    "confirmed_entity_class" : "meter",
    "agent" : "Enkey",
    "updated_string" : "2023-11-18 16:19:49",
    "status" : "unconfirmed"
}
*/
// create an array of definitions for a table based on the ontology above
// each definition is a column in the table and contains 4 fields, id, numeric, disablePadding, label, the label first letter is a Capital letter

const rows = [
  {
    id: "_id",
    numeric: false,
    disablePadding: false,
    label: "Id",
  },

  {
    id: "confirmed_entity_class",
    numeric: false,
    disablePadding: false,
    label: "Confirmed entity class",
  },
  {
    id: "agent",
    numeric: false,
    disablePadding: false,
    label: "Agent",
  },
  {
    id: "updated_string",
    numeric: false,
    disablePadding: false,
    label: "Updated string",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  }
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
      case "confirmed_entity_class":
        label = "Confirmed entity class";
        break;
      case "agent":
        label = "Agent";
        break;
      case "updated_string":
        label = "Updated string";
        break;
      case "status":
        label = "Status";
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
  tableRowProposed: {
    color: theme.palette.warning.light,
  },
  tableRowApproved: {
    color: theme.palette.success.light,
  },
  tableRowSuspenced: {
    color: theme.palette.error.light,
  },
  tableRowRequested: {
    color: theme.palette.info.light,
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
    const { nodeConfigs, classes } = this.props; // Access the theme object here

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
    /* 
   {
    "_id" : "chilled_water_system",
    "description" : {
        "en" : "The equipment, devices and conduits that handle the production and distribution of chilled water in a building"
    },
    "foldername" : "System",
    "id" : "chilled_water_system",
    "name" : {
        "en" : "Chilled Water System"
    },
    "ontology" : "Brick",
    "superclass" : [
        "water_system"
    ],
    "type" : "system",
    "updated" : "2023-03-22T11:12:03.828Z",
    "updatedAsDateString" : "Wed Mar 22 2023"
}
*/
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
                  const textColorClass =
                    n.status === "approved"
                      ? classes.tableRowApproved
                      : n.status === "proposed"
                      ? classes.tableRowProposed
                      : n.status === "suspense"
                      ? classes.tableRowSuspenced
                      : classes.tableRowRequested;

                  return (
                    <TableRow
                      //className={classNames(textColorClass)}
                      hover
                      // onClick={(event) => this.handleClick(event, n._id)}
                      tabIndex={-1}
                      key={_uniqueKey()}
                      // className={getRowClassNameByPrio(n.priority, classes)}
                    >
                      <TableCell align="left">
                        <span className={classNames(textColorClass)}>
                          {getField(n, "_id") || "-"}
                        </span>
                      </TableCell>
                      <TableCell align="left">
                        <span className={classNames(textColorClass)}>
                          {getField(n, "confirmed_entity_class") || "-"}
                        </span>
                      </TableCell>
                      <TableCell align="left">
                        <span className={classNames(textColorClass)}>
                          {getField(n, "agent") || "-"}
                        </span>
                      </TableCell>
                      <TableCell align="left">
                        <span className={classNames(textColorClass)}>
                          {getFieldDate(n, "updated_string") || "-"}
                        </span>
                      </TableCell>
                      <TableCell align="left">
                        <span className={classNames(textColorClass)}>
                          {getField(n, "status") || "-"}
                        </span>
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
  _renderSuperClass = (n) => {
    if (n.superclass && n.superclass.length > 0) {
      return n.superclass.map((s) => {
        return (
          <div>
            <span>{s}</span>
          </div>
        );
      });
    } else {
      return "none";
    }
  };
}

Searchlist.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Searchlist);
