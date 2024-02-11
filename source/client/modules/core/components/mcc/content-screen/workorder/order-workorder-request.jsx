import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import LanguageAvatar from "../languageAvatar"; // Ensure this path is correct

const styles = {
  root: {
    marginBottom: 16,
  },
  descriptionInput: {
    marginBottom: 16,
  },
};

const availableLanguages = [
  { code: "EN-GB", label: "English" },
  { code: "SV", label: "Swedish" },
  { code: "FI", label: "Finnish" },
  { code: "RO", label: "Romanian" },
];

const WoRequestTranslationOrder = ({
  order,
  language,
  revision,
  open,
  onClose,
  classes,
}) => {
  const [openConfirm, setOpenConfirm] = useState(false); // Corrected state variable name for clarity
  const [description, setDescription] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  // Removed unused handleDialogOpen since it was incorrectly trying to invoke a boolean as a function

  const handleConfirmDialogOpen = () => {
    setOpenConfirm(true); // Correctly manage the confirmation dialog state
  };

  const handleConfirmDialogClose = () => {
    setOpenConfirm(false); // Use this function to close the confirmation dialog
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleLanguageChange = (event) => {
    const value = event.target.value;
    setSelectedLanguages(
      selectedLanguages.includes(value)
        ? selectedLanguages.filter((lang) => lang !== value)
        : [...selectedLanguages, value]
    );
  };
 const handleDialogClose = () => {
   onClose();
   setDescription("");
 };

 
  const orderClass = "TranslationOrder";

  let WoRequestTranslationOrderJson = {
    documentId: order._id.toString(),
    workorderclass: orderClass,
    whyDescription: description,
    sourceLanguage: order.masterLanguage,
    instructions:
      "Please translate this document to " + selectedLanguages.join(", "),
    procssStatus: 500,
    targetLanguage: selectedLanguages,
    version: order.version
  };

  let WoRequestTranslationOrderJsonString = JSON.stringify(
    WoRequestTranslationOrderJson,
    null,
    2
  );

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>{"Request translation"}</DialogTitle>
        <DialogContent>
          {" "}
          {/* <Typography color="secondary" variant="h6">
          {title}
        </Typography> */}
          <Typography variant="caption" component="div" wrap>
            <pre>{WoRequestTranslationOrderJsonString}</pre>
          </Typography>
          <TextField
            onChange={handleDescriptionChange}
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            fullWidth
            value={description}
            margin="normal"
          />
          <FormControl component="fieldset" margin="normal">
            <Typography component="legend">Languages</Typography>
            <FormGroup row>
              {availableLanguages.map((language) => (
                <FormControlLabel
                  key={language.code}
                  control={
                    <Checkbox
                      checked={selectedLanguages.includes(language.code)}
                      onChange={handleLanguageChange}
                      value={language.code}
                    />
                  }
                  label={<LanguageAvatar languageCode={language.code} small />}
                />
              ))}
            </FormGroup>
          </FormControl>
          <Dialog open={openConfirm} onClose={handleDialogClose}>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to proceed with the action?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Cancel</Button>
              <Button
                onClick={() => {
                  // Call the meteor method here
                  Meteor.call(
                    "workorder.new",
                    order._id.toString(),
                    orderClass,
                    WoRequestTranslationOrderJson
                  );
                  handleDialogClose();
                }}
                color="primary"
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </DialogContent>{" "}
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleConfirmDialogOpen} color="primary">
            Request Translation
          </Button>
        </DialogActions>
      </Dialog>

      {/* Separate Dialog for Confirmation */}
      <Dialog open={openConfirm} onClose={handleConfirmDialogClose}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to proceed with the action?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDialogClose}>Cancel</Button>
          <Button
            onClick={() => {
              // Call the meteor method here
              Meteor.call(
                "workorder.new",
                order._id.toString(),
                orderClass,
                WoRequestTranslationOrderJson
              );

              handleConfirmDialogClose(); // Close the confirm dialog
              onClose(); // Close the main dialog
            }}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

WoRequestTranslationOrder.propTypes = {
  order: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default withStyles(styles)(WoRequestTranslationOrder);
