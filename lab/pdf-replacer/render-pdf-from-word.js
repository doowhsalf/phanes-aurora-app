const fs = require("fs");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const OfficeConverter = require("office-converter")();

async function generatePdfFromDocxTemplate(
  docxTemplatePath,
  data,
  outputPdfPath
) {
  // Load the docx file as binary content
  const content = fs.readFileSync(docxTemplatePath, "binary");

  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

  // Apply the data replacements
  doc.render(data);

  const buf = doc.getZip().generate({ type: "nodebuffer" });

  // Save the processed document as a temporary .docx file
  const tempDocxPath = outputPdfPath.replace(".pdf", "_temp.docx");
  fs.writeFileSync(tempDocxPath, buf);

  // Convert the .docx to .pdf
  // Convert the .docx to .pdf
  OfficeConverter.generatePdf(tempDocxPath, (err, result) => {
    if (err) {
      console.error("Error converting document to PDF:", err);
      return;
    }

    // Ensure the path to the converted PDF is a string
    const resultPdfPath = result.outputFile; // Adjust based on actual structure if different

    console.log("PDF generated successfully:", resultPdfPath);

    // Move the PDF to the desired output path
    fs.renameSync(resultPdfPath, outputPdfPath); // Make sure these are string paths

    // Cleanup the temporary .docx file
    fs.unlinkSync(tempDocxPath);
  });
}

// Example usage
const modelData = {
  name: "John Doe",
  qa_completed_date: "2024-03-02",
  id: "1234567890",
  target: "a store about your target",
};

generatePdfFromDocxTemplate(
  "./MITI_4.2.1_protokoll_240301_eng.docx",
  modelData,
  "./output.pdf"
).catch((error) => console.error("Error processing document:", error));
