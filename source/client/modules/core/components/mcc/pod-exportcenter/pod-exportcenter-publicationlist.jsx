import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "description", label: "Description", minWidth: 250 },
  {
    id: "dataSelection",
    label: "Data Selection",
    minWidth: 250,
  },
  {
    id: "frequenze",
    label: "Frequency",
    minWidth: 100,
    align: "center",
  },
  { id: "format", label: "Format", minWidth: 100 },
  { id: "method", label: "Method", minWidth: 100 },
];

function createData(id, name, description, method, format, frequenze, dataSelection) {
  return { id, name, description, method, format, frequenze, dataSelection };
}

const rows = [
  createData(
    1,
    "Publication A",
    "Sensor data from plant A",
    "MQTT",

    "CSV",
    "Daily",
    "Temperature, Humidity for meters..."
  ),
  createData(
    2,
    "Publication B",
    "Electrical data",
    "OPC/UA",

    "JSON",
    "Hourly",
    "Voltage, Current for meters..."
  ),
  createData(
    3,
    "Publication C",
    "Environmental stats",
    "Mail",
    "Excel",
    "Weekly",
    "Air quality, Radiation for meters..."
  ),
  // ... add more sample data as needed
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
