import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { set } from "lodash";
import language from "react-syntax-highlighter/dist/esm/languages/hljs/1c";
const styles = {
  root: {
    marginBottom: 16,
  },
  descriptionInput: {
    marginBottom: 16,
  },
};

const WoRequestTranslationOrder = ({ title, order }) => {
  const orderClass = "TranslationOrder";

  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  // create state value for MediaCost, serviceFedTotal, serviceCostTotal
  const [language, setLanguage] = useState("English");

  const handleDialogOpen = () => {
    setOpen(true);
  };

  
  const handleDialogClose = () => {
    setOpen(false);
    setDescription("");
  };

  const handleClick = () => {
    handleDialogOpen();
  };


  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  let updatedPublishDate = new Date().toISOString().split("T")[0];
  updatedPublishDate = updatedPublishDate + "T00:00:00";

  let currentDate = new Date();
  console.log(order)
  /* price object example
{
   {
    "_id" : "20240105112419TrDoc",
    "contentId" : "16810",
    "workorderclass" : "TranslateDocumentStandard",
    "payload" : {
        "documentId" : "16810",
        "instructions" : "Please translate this document to Swedish, French and Romanian",
        "sourceLanguage" : "sv",
        "targetLanguage" : [
            "en",
            "fr",
            "ro"
        ]
    },
    "status" : NumberInt(400),
    "created" : ISODate("2024-01-05T11:24:19.311+0000"),
    "modified" : ISODate("2024-01-05T11:24:19.311+0000"),
    "createdBy" : "Svpnq3kPQcjAtXG7A",
    "modifiedBy" : "Svpnq3kPQcjAtXG7A"
}

}*/
  let WoRequestTranslationOrderJson = {
    documentId: order._id.toString(),
    workorderclass: orderClass,
    whyDescription: description,
    instructions: "Please translate this document to " + language,
    procssStatus: 500,
  };

  let WoRequestTranslationOrderJsonString = JSON.stringify(
    WoRequestTranslationOrderJson,
    null,
    2
  );

  return (
    <div>
      <Typography color="secondary" variant="h6">
        {title}
      </Typography>
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
        defaultValue="..."
      />

      <TextField
        onChange={handleLanguageChange}
        id="outlined-multiline-static"
        label="Langugage"
        multiline
        rows={4}
        fullWidth
        value={language}
        defaultValue="..."
      />

      <Button onClick={handleClick} color="primary" variant="outlined">
        Request Translation
      </Button>
      <Dialog open={open} onClose={handleDialogClose}>
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
    </div>
  );
};

WoRequestTranslationOrder.propTypes = {
  title: PropTypes.string.isRequired,
  order: PropTypes.object.isRequired,
};

export default withStyles(styles)(WoRequestTranslationOrder);
