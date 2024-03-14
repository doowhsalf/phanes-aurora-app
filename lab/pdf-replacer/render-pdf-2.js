const PDFDocument = require("pdfkit");
const fs = require("fs");

function createPdfWithReplacements(outputPath, replacements) {
  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(outputPath));

  // Example content with placeholders replaced
  // This is a simplistic approach; you'd dynamically construct your content based on your requirements
  let content = "Hello, {{name}}. Your ID is {{id}}. Target: {{target}}.";
  Object.keys(replacements).forEach((key) => {
    const placeholder = `{{${key}}}`;
    content = content.replace(new RegExp(placeholder, "g"), replacements[key]);
  });

  doc.fontSize(12).text(content, 100, 100);
  doc.end();

  console.log(`PDF saved to ${outputPath}`);
}

// Example usage
const replacements = {
  name: "John Doe",
  id: "1234567890",
  target: "a store about your target",
};

createPdfWithReplacements("./output.pdf", replacements);
