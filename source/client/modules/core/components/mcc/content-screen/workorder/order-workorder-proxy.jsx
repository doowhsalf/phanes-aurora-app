import React, { useState } from "react";
import Button from "@mui/material/Button";
import WoRequestTranslationOrder from "./order-workorder-request"; // Adjust the import path

const TranslationOrderProxy = ({ order }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleLanguageChange = (newLanguage) => {
    console.log("Language changed to:", newLanguage);
    // Additional logic to handle language change
  };
/*

 title,
  order,
  language,
  revision,
  classes,* */
  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleDialogOpen}>
        Open Translation Order
      </Button>
      <WoRequestTranslationOrder
        order={order}
        classes={{}}
        open={dialogOpen}
        onClose={handleDialogClose}
        onLanguageChange={handleLanguageChange}
      />
    </>
  );
};

export default TranslationOrderProxy;
