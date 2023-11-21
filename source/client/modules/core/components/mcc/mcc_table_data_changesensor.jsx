import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
const availableSensorClasses = [
  "SensorClass1",
  "SensorClass2",
  // ... add all available sensor classes
];
export default class UpdateSensorDialog extends React.Component {
  state = {
    filter: "",
    filteredClasses: availableSensorClasses,
  };
  handleUpdate = () => {
    // Your update logic here

    this.handleCloseDialog();
  };

  handleCloseDialog = () => {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  };

  handleFilterChange = (e) => {
    const filter = e.target.value;
    const filteredClasses = availableSensorClasses.filter((cls) =>
      cls.toLowerCase().includes(filter.toLowerCase())
    );
    this.setState({ filter, filteredClasses });
  };

  render() {
    const { open, onClose } = this.props;
    const { filteredClasses } = this.state;

    return (
      <Dialog open={open} onClose={this.handleCloseDialog}>
        <DialogTitle>Update Sensor Class</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select a sensor class from the list below:
          </DialogContentText>
          <TextField
            label="Filter"
            value={this.state.filter}
            onChange={this.handleFilterChange}
            fullWidth
          />
          <ul>
            {filteredClasses.map((cls) => (
              <li key={cls}>{cls}</li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
