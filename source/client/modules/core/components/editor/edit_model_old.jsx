import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

export default function EditNodeForm({ node, onSubmit }) {
  const [newNode, setNewNode] = useState({node});
 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNode((prevNode) => ({ ...prevNode, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(newNode);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <TextField
        label="Node Name"
        name="name"
        value={newNode.name}
        onChange={handleInputChange}
      />
      <FormControl>
        <InputLabel>Type</InputLabel>
        <Select name="type" value={newNode.type} onChange={handleInputChange}>
          <MenuItem value="Building">Building</MenuItem>
          <MenuItem value="Room">Room</MenuItem>
          {/* ... other types */}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Parent ID</InputLabel>
        <Select
          name="parentId"
          value={newNode.parentId}
          onChange={handleInputChange}
        >
          <MenuItem value={null}>None</MenuItem>
          <MenuItem value={1}>Building</MenuItem>
          {/* ... other parent nodes */}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Link Type</InputLabel>
        <Select
          name="linkType"
          value={newNode.linkType}
          onChange={handleInputChange}
        >
          <MenuItem value="isLocationOf">isLocationOf</MenuItem>
          <MenuItem value="hasPoint">hasPoint</MenuItem>
          {/* ... other link types */}
        </Select>
      </FormControl>
      <Button type="submit">Create Node</Button>
    </form>
  );
}
