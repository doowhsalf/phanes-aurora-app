const { exec } = require("child_process");

async function convertDocxToPdf(docxPath, pdfPath) {
  const command = `libreoffice --headless --convert-to pdf --outdir "${pdfPath}" "${docxPath}"`;
  console.log("Start converting docx to pdf");
  const command2 = `unoconv -f pdf ${docxPath}`;
  exec(command2, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
}

// Example usage
// convertDocxToPdf("/path/to/document.docx", "/path/to/output/directory");
module.exports = { convertDocxToPdf };
