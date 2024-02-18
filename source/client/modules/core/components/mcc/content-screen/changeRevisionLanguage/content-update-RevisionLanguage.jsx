import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import LanguageAvatar from "../languageAvatar"; // Adjust the import path as needed
import Box from "@mui/material/Box";

const ChangeMasterLanguageDialog = ({
  contentId,
  open,
  onClose,
  languages,
  currentLanguage,
  onChange,
  revisonIndex,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleSave = () => {
    onChange(selectedLanguage);

    /*  "content.update": function (_id, fieldsToUpdate) { */
    // call the meteor method to set the new masterLanguage
    const fieldsToUpdate = {
      [`revisions.${revisonIndex}.language`]: selectedLanguage,
    };

    Meteor.call(
      "content.update",
      contentId,
      "Revision language",
      fieldsToUpdate
    );
    onClose(); // Close dialog after changing the language
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Change Revision Language</DialogTitle>
      <DialogContent>
        <RadioGroup
          aria-label="revision-language"
          name="revision-language"
          value={selectedLanguage}
          onChange={handleLanguageChange}
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {languages.map((language) => (
            <FormControlLabel
              key={language.code}
              value={language.code}
              control={<Radio />}
              label={<LanguageAvatar languageCode={language.code} small />}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangeMasterLanguageDialog;
