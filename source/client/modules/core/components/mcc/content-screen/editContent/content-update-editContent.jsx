import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import Showdown from "showdown";

const ContentEditDialog = ({
  open,
  onClose,
  contentId,
  content,
  revisionIndex,
}) => {
  const [formData, setFormData] = useState({
    title: content.title || "",
    summary: content.summary || "",
    body: content.body || "",
    meta: content.meta || "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    const converter = new Showdown.Converter();

    // const fieldsToUpdate = {
    //   [`revisions.${revisonIndex}.language`]: selectedLanguage,
    // };
    const fieldsToUpdate = {
      [`revisions.${revisionIndex}.title`]: converter.makeHtml(formData.title),
      [`revisions.${revisionIndex}.summary`]: converter.makeHtml(
        formData.summary
      ),
      [`revisions.${revisionIndex}.body`]: converter.makeHtml(formData.body),
      [`revisions.${revisionIndex}.meta`]: converter.makeHtml(formData.meta),
    };
    // const fieldsToUpdate = { status: isArchived ? "active" : "archived" };
    // Update the content status based on current status
    Meteor.call(
      "content.update",
      contentId,
      "Update edit fields ",
      fieldsToUpdate,
      (error) => {
        if (error) {
          alert("Error updating content edit fields.");
        } else {
          onClose(); // Close dialog after changing the status
        }
      }
    );
    // Call your update function here, using contentId and htmlData
    console.log("Saving data:", fieldsToUpdate);
    onClose(); // Close dialog after save
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl">
      <DialogTitle>Edit Content</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              margin="dense"
              name="title"
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.title}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="summary"
              label="Summary"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              value={formData.summary}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="body"
              label="Body"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              value={formData.body}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="meta"
              label="Meta"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              value={formData.meta}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <div>
              <h2>Preview</h2>
              {/* Render Markdown as HTML */}
              <div
                dangerouslySetInnerHTML={{
                  __html: new Showdown.Converter().makeHtml(formData.summary),
                }}
              />
              <div
                dangerouslySetInnerHTML={{
                  __html: new Showdown.Converter().makeHtml(formData.body),
                }}
              />
              <div
                dangerouslySetInnerHTML={{
                  __html: new Showdown.Converter().makeHtml(formData.meta),
                }}
              />
            </div>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContentEditDialog;
