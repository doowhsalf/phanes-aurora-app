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

const PublishDataDialog = ({ open, onClose }) => {
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

  const renderConfigFields = () => {
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
        <Box>
          <FormControl fullWidth margin="normal">
            <InputLabel id="frequency-label">Frequency</InputLabel>
            <Select
              labelId="frequency-label"
              label="Frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {method === "MQTT" && (
          <>
            <TextField
              label="Broker"
              placeholder="e.g. mqtt://broker.example.com"
              value={config.mqtt.broker}
              onChange={(e) => handleConfigChange("broker", e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Topic"
              placeholder="e.g. weather/daily"
              value={config.mqtt.topic}
              onChange={(e) => handleConfigChange("topic", e.target.value)}
              fullWidth
              margin="normal"
            />
          </>
        )}

        {method === "FTP" && (
          <>
            <TextField
              label="Server"
              placeholder="e.g. ftp.example.com"
              value={config.ftp.server}
              onChange={(e) => handleConfigChange("server", e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Username"
              placeholder="e.g. username123"
              value={config.ftp.username}
              onChange={(e) => handleConfigChange("username", e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              placeholder="e.g. password123"
              value={config.ftp.password}
              onChange={(e) => handleConfigChange("password", e.target.value)}
              fullWidth
              margin="normal"
              type="password"
            />
          </>
        )}

        {method === "MAIL" && (
          <>
            <TextField
              label="To"
              placeholder="e.g. recipient@example.com"
              value={config.mail.to}
              onChange={(e) => handleConfigChange("to", e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Subject"
              placeholder="e.g. Daily Weather Report"
              value={config.mail.subject}
              onChange={(e) => handleConfigChange("subject", e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Body"
              placeholder="e.g. The temperature today is..."
              value={config.mail.body}
              onChange={(e) => handleConfigChange("body", e.target.value)}
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
          </>
        )}

        {method === "WEBHOOK" && (
          <>
            <TextField
              label="URL"
              placeholder="e.g. https://api.example.com/webhook"
              value={config.webhook.url}
              onChange={(e) => handleConfigChange("url", e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Method"
              placeholder="e.g. POST"
              value={config.webhook.method}
              onChange={(e) => handleConfigChange("method", e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Body"
              placeholder='e.g. {"temp": "25°C", "humidity": "60%"}'
              value={config.webhook.body}
              onChange={(e) => handleConfigChange("body", e.target.value)}
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
          </>
        )}
      </>
    );
  };


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Quick Publish Data</DialogTitle>
      <DialogContent>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="method"
            name="method"
            value={method}
            onChange={handleChange}
            row
          >
            <FormControlLabel value="MQTT" control={<Radio />} label="MQTT" />
            <FormControlLabel value="FTP" control={<Radio />} label="FTP" />
            <FormControlLabel value="MAIL" control={<Radio />} label="MAIL" />
            <FormControlLabel
              value="WEBHOOK"
              control={<Radio />}
              label="WEBHOOK"
            />
          </RadioGroup>
        </FormControl>
        {renderConfigFields()}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() =>
            console.log("Publish via", {
              method,
              frequency,
              name,
              description,
              config: config[method.toLowerCase()],
            })
          }
        >
          Publish
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PublishDataDialog;
