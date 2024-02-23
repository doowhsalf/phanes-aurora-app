import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import {
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
// Ensure the correct import path for EditArticleCode and services
import EditArticleCode from "../editArticleCode/editArticleCode"; // Update the path as needed

const NewArticleForm = () => {
  const [typesOfArticles, setTypesOfArticles] = useState([]);
  const [codes, setCodes] = useState(["INITCODE"]); // Initial codes

  useEffect(() => {
    const loadTypesOfArticles = async () => {
      // Simulated fetch call. Replace with your actual call to fetch types of articles.
      const fetchedTypes = await fetchTypesOfArticles(); // This should be your actual fetch call.
      setTypesOfArticles(fetchedTypes);
    };

    loadTypesOfArticles();
  }, []);

  const initialValues = {
    masterLanguage: "",
    typeOfArticle: "",
    articleCode: codes,
  };

  const validateForm = (values) => {
    const errors = {};
    // Add validation logic here
    return errors;
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    // Integration with your saveArticle function
    setSubmitting(false);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validateForm}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <FormControl component="fieldset" fullWidth margin="normal">
            <FormLabel component="legend">Master Language</FormLabel>
            <RadioGroup row name="masterLanguage">
              {["SV", "EN-GB", "RO", "FI"].map((language) => (
                <FormControlLabel
                  key={language}
                  value={language}
                  control={<Radio />}
                  label={language}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset" fullWidth margin="normal">
            <FormLabel component="legend">Type of Article</FormLabel>
            <RadioGroup row name="typeOfArticle">
              {typesOfArticles.map((type) => (
                <FormControlLabel
                  key={type}
                  value={type}
                  control={<Radio />}
                  label={type}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <EditArticleCode
            existingCodes={codes}
            onUpdate={(updatedCodes) => {
              setCodes(updatedCodes);
              setFieldValue("articleCode", updatedCodes); // Update formik's state
            }}
          />
          <Button
            type="submit"
            color="primary"
            disabled={isSubmitting}
            fullWidth
          >
            Save Article
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default NewArticleForm;
