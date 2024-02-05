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
import { desc, stableSort, getSorting } from "../../searchhelpers";

import classNames from "classnames";

import Avatar from "@mui/material/Avatar";
import Flag from "react-world-flags";
import Badge from "@mui/material/Badge";
import {
  getField,
  getFieldObject,
  getFieldDate,
  getFieldDateTime,
} from "../../../helpers/getField";
import {
  red,
  yellow,
  blueGrey as bluegrey,
  deepPurple,
  blue as deepBlue,
} from "@mui/material/colors";

/* 
{
    "_id" : "20230628201844Tran",
    "workorderclass" : "TransmitResetWo",
    "customerOrder": "20230628201844Tran",
    "payload" : {
        "orderid" : NumberInt(29690),
        "workorderclass" : "TransmitResetWo",
        "whyDescription" : "testing again"
    },
    "status" : "pending",
    "created" : ISODate("2023-06-28T20:18:44.196+0000"),
    "modified" : ISODate("2023-06-28T20:18:44.196+0000"),
    "createdBy" : null,
    "modifiedBy" : null
}
*/
// create an array of definitions for a table based on the ontology above
// each definition is a column in the table and contains 4 fields, id, numeric, disablePadding, label, the label first letter is a Capital letter

const rows = [
  {
    id: "_id",
    numeric: false,
    disablePadding: false,
    label: "Workorder Id",
  },
  {
    id: "customerOrderId",
    numeric: false,
    disablePadding: false,
    label: "Customer Order",
  },
  {
    id: "workorderclass",
    numeric: false,
    disablePadding: false,
    label: "Workorder Class",
  },
  {
    id: "payload",
    numeric: false,
    disablePadding: false,
    label: "Payload",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "created",
    numeric: false,
    disablePadding: false,
    label: "Created",
  },
  {
    id: "modified",
    numeric: false,
    disablePadding: false,
    label: "Modified",
  },
  {
    id: "createdBy",
    numeric: false,
    disablePadding: false,
    label: "Created By",
  },
  {
    id: "modifiedBy",
    numeric: false,
    disablePadding: false,
    label: "Modified By",
  },
];

class SearchlistHead extends React.Component {
  createSortHandler = (property) => (event) => {
    this.props.onRequestSort(event, property);
  };

  renderLabel(labelid) {
    DEFCON5 && console.log("SearchlistHead");
    DEFCON5 && console.log(labelid);
    let label = "";

    switch (labelid) {
      case "_id":
        label = "Id";
        break;
      case "customerOrderId":
        label = "Customer Workorder";
        break;
      case "workorderclass":
        label = "Workorder Class";
        break;
      case "payload":
        label = "Payload";
        break;
      case "status":
        label = "Status";
        break;
      case "created":
        label = "Created";
        break;
      case "modified":
        label = "Modified";
        break;
      case "createdBy":
        label = "Created By";
        break;
      case "modifiedBy":
        label = "Modified By";
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
      order: "desc",
      orderBy: "Modified",
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
      FlowRouter.go(`/customerorder/${id}`);
      // check if the new url is not the same as the current url, and if it is not then reload the page
      location.reload();
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
  // handleCellClick = (event, id, cell) => {
  //   DEFCON5 && console.log("Cliced Cell");
  //   DEFCON5 && console.log(event);
  //   DEFCON5 && console.log(id);
  //   DEFCON5 && console.log(cell);
  //   FlowRouter.go(`/order/${id}`);
  //   location.reload();
  // };

  isSelected = (id) => this.state.selected.indexOf(id) !== -1;

  render() {
    const { orders, classes, title } = this.props;
    const { order, orderBy, selected, rowsPerPageDefault, page } = this.state;

    let numOfConfigRows = orders !== undefined ? orders.length : 0;
    let rowsPerPage = numOfConfigRows ? numOfConfigRows : rowsPerPageDefault;

    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, numOfConfigRows - page * rowsPerPage);

    DEFCON5 && console.log("orders");

    const colors = [
      "#FF5C47",
      "#FF6B47",
      "#FF8347",
      "#FF958B",
      "#FFAA47",
      "#FFC247",
      "#FFC847",
      "#FFD67A",
      "#FFE447",
      "#FFEE47",
      "#A8FF47",
      "#8AFF47",
      "#55FF47",
      "#47FF69",
      "#47FF92",
      "#47FFC2",
      "#47FFF6",
      "#47E2FF",
      "#47A3FF",
      "#4779FF",
      "#4757FF",
      "#5D4EFF",
      "#6F47FF",
      "#8D47FF",
      "#A747FF",
    ];

    // sort the incoming data by the date
    const sortedData = orders.sort((a, b) => {
      const aDate = a !== undefined ? getFieldDate(a, "Modified") : "";

      const bDate = b !== undefined ? getFieldDate(b, "Modified") : "";
      return new Date(bDate) - new Date(aDate);
    });

    // update each item with a color staring with the first color in the array. keep the color the same if the date is the same, if the date is different then use the next color in the array. keep the colorindex and add + 1 to it each time the date is different
    let colorIndex = 0;
    let prevDate = "";
    const updatedData = sortedData.map((item, index) => {
      const date = item !== undefined ? getFieldDate(item, "Modified") : "";
      // check if the date is different from the previous date
      if (date !== prevDate) {
        // if it is different then increment the color index
        colorIndex++;
        // makesure colorIndex is an integer
        colorIndex = Math.floor(colorIndex * 1.5);
      }

      // start over if index is greater than the length of the colors array
      colorIndex = colorIndex === colors.length ? 0 : colorIndex;
      const textColor = colors[colorIndex];
      //const color = colors[index % colors.length];
      prevDate = date;

      return {
        ...item,
        textColor,
      };
    });

    DEFCON5 && console.log("updatedData");

    DEFCON5 && console.log(updatedData);

    return (
      <Paper className={classes.paper}>
        <Typography color="secondary" variant="h6">
          {title}
        </Typography>
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
              {stableSort(updatedData, getSorting(order, orderBy), orderBy)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => {
                  const textColor = item.textColor ? item.textColor : "white";

                  return (
                    <TableRow
                      hover
                      onClick={(event) =>
                        this.handleClick(
                          event,
                          item.InputContentParsed.TimecutTurnkeyOrderNumber
                        )
                      }
                      tabIndex={-1}
                      key={item._id}
                    >
                      <TableCell align="left">
                        <span style={{}}>{getField(item, "_id") || "-"}</span>
                      </TableCell>
                      <TableCell align="left">
                        <span style={{}}>
                          {getField(item, "customerOrderId") || "-"}
                        </span>
                      </TableCell>
                      <TableCell align="left">
                        <span style={{}}>
                          {getField(item, "workorderclass") || "-"}
                        </span>
                      </TableCell>
                      <TableCell align="left">
                        <span style={{}}>
                          {item.payload ? JSON.stringify(item.payload) : "-"}
                        </span>
                      </TableCell>
                      <TableCell align="left">
                        <span style={{}}>
                          {getField(item, "status") || "-"}
                        </span>
                      </TableCell>
                      <TableCell align="left">
                        <span style={{}}>
                          {new Date(item.created).toISOString().slice(0, 16)}
                        </span>
                      </TableCell>
                      <TableCell align="left">
                        <span style={{}}>
                          {new Date(item.modified).toISOString().slice(0, 16)}
                        </span>
                      </TableCell>
                      <TableCell align="left">
                        <span style={{}}>
                          {getField(item, "createdBy") || "-"}
                        </span>
                      </TableCell>
                      <TableCell align="left">
                        <span style={{}}>
                          {getField(item, "modifiedBy") || "-"}
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
          count={orders.length}
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
