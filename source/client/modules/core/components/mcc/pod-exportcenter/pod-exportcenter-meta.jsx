import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const MetaForm = ({ open, onClose }) => {
  const [method, setMethod] = useState("");
  const [frequency, setFrequency] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [config, setConfig] = useState({
    mqtt: { broker: "", topic: "" },
    ftp: { server: "", username: "", password: "" },
    mail: { to: "", subject: "", body: "" },
    webhook: { url: "", method: "POST", body: "" },
  });

  const handleChange = (event) => {
    setMethod(event.target.value);
  };

  const handleConfigChange = (field, value) => {
    setConfig((prev) => ({
      ...prev,
      [method.toLowerCase()]: { ...prev[method.toLowerCase()], [field]: value },
    }));
  };

  return (
    <>
      <TextField
        label="Name"
        placeholder="e.g. Daily Weather Data"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        placeholder="e.g. Publishes daily temperature and humidity data"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={2}
      />
    </>
  );
};

export default MetaForm;
