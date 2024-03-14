    const fs = require("fs");
    const { PDFDocument } = require("pdf-lib");

    async function fillPdfTemplate(pdfPath, data, outputPath) {
      // Load the PDF
      const pdfBytes = fs.readFileSync(pdfPath);
      const pdfDoc = await PDFDocument.load(pdfBytes);

      // Get the form from the PDF
      const form = pdfDoc.getForm();

      // Replace each field using data from the JSON object
      Object.keys(data).forEach((key) => {
        const field = form.getField(key);
        if (field) {
          field.setText(data[key]);
        } else {
          console.warn(`No field named '${key}' found in the PDF form.`);
        }
      });

      // Flatten the form (makes the field values part of the PDF content)
      form.flatten();

      // Save the modified PDF
      const newPdfBytes = await pdfDoc.save();
      fs.writeFileSync(outputPath, newPdfBytes);
    }

    // Example usage
    const modelData = {
      // Replace these keys and values with those from your actual model.json
      name: "John Doe",
      completed: "2024-03-02",
      id: "1234567890",
      target: "a store about your target",
      // Add more fields as needed
    };

    fillPdfTemplate(
      "./MITI_4.2.1_protokoll_240301_eng.pdf",
      modelData,
      "./filled.pdf"
    )
      .then(() => console.log("PDF successfully filled and saved."))
      .catch((error) => console.error("Error filling PDF:", error));
