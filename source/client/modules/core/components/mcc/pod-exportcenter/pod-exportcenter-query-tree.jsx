import React, { useState } from "react";
import { Checkbox, FormControlLabel, Button } from "@mui/material";

function TreeItem({ label, children, isChecked, onItemChange }) {
  const handleCheck = (e) => {
    const checked = e.target.checked;
    onItemChange(label, checked);

    // Propagate changes to children if present
    if (children) {
      children.forEach((child) => {
        onItemChange(child.label, checked); // Update state for child
        if (child.children) {
          // Recursively update for deeper nested children
          child.children.forEach((grandChild) =>
            onItemChange(grandChild.label, checked)
          );
        }
      });
    }
  };

  return (
    <div style={{ marginLeft: "20px" }}>
      <FormControlLabel
        control={<Checkbox checked={isChecked} onChange={handleCheck} />}
        label={label}
      />
      {children &&
        children.map((child) => (
          <TreeItem
            key={child.label}
            label={child.label}
            children={child.children}
            isChecked={isChecked}
            onItemChange={onItemChange}
          />
        ))}
    </div>
  );
}



function TreeViewComponent({ onSelectionChange }) {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleItemChange = (item, isChecked) => {
    if (isChecked && !selectedItems.includes(item)) {
      setSelectedItems((prev) => [...prev, item]);
    } else if (!isChecked) {
      setSelectedItems((prev) => prev.filter((i) => i !== item));
    }
  };

/* */

  return (
    <div>
      
      <TreeItem
        label="Marievik"
        isChecked={selectedItems.includes("Marievik")}
        onItemChange={handleItemChange}
        children={[
          { label: "Elemätare 1" },
          { label: "Elmätare 2" },
          { label: "Elmätare 3" },
          { label: "Elmätare 4" },
          { label: "Elmätare 5" },
          { label: "Elmätare 6" },
          { label: "Elmätare 7" },
          { label: "Elmätare 8" },
          { label: "Elmätare 9" },
        ]}
      />
      
      <Button onClick={() => onSelectionChange(selectedItems)}>Done</Button>
    </div>
  );
}

export default TreeViewComponent;
