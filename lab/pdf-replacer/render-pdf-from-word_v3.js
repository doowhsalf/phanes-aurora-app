const fs = require("fs");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const { queryDatabase } = require("./query-model");

// Assuming office-converter is set up correctly and LibreOffice is installed
const OfficeConverter = require("office-converter")();

async function generatePdfFromDocxTemplate(
  docxTemplatePath,
  data,
  outputPdfPath
) {
  try {
    // Load the DOCX file as binary content
    console.log("Start generating pdf from docx");
    const content = fs.readFileSync(docxTemplatePath, "binary");
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // Apply the data replacements
    doc.render(data);

    // Generate the DOCX content
    const buf = doc.getZip().generate({ type: "nodebuffer" });

    // Save the processed document as a temporary DOCX file
    const tempDocxPath = outputPdfPath.replace(".pdf", "_temp.docx");
    console.log("Write the temp docx file");
    fs.writeFileSync(tempDocxPath, buf);

    // Convert the DOCX to PDF
    OfficeConverter.generatePdf(tempDocxPath, (err, result) => {
      if (err) {
        console.error("Error converting document to PDF:", err);
        return;
      }
      console.log("Start converting docx to pdf");  

      // Assuming result is the path to the generated PDF, move it to desired output path
      // Note: Adjust based on how office-converter returns the path
      fs.renameSync(result, outputPdfPath); // Ensure result is directly usable as a path

      console.log("PDF generated successfully:", outputPdfPath);

      // Cleanup the temporary DOCX file
      fs.unlinkSync(tempDocxPath);
    });
  } catch (error) {
    console.error("Error processing document:", error);
  }
}



queryDatabase((err, model) => {
  if (err) {
    console.error("Failed to query database:", err);
    return;
  }
  //console.log("Model populated with data:", model);
  // make a call for each model in the array
  model.forEach((model) => {

    // update the model and make alias for the fields m4_sum to m4_l
    model.m4_ct = model.m4_cultivating_change_talk;
    model.m4_st = model.m4_softening_sustain_talk;
    model.m4_pt = model.m4_partnership;
    model.m4_em = model.m4_empathy;
    model.m4_gi = model.m4_giving_information;
    model.m4_ps = model.m4_persuade;
    model.m4_pp = model.m4_persuade_with_permission;
    model.m4_qn = model.m4_questions;
    model.m4_sr = model.m4_simple_reflection;
    model.m4_cr = model.m4_complex_reflection;
    model.m4_af = model.m4_affirm;
    model.m4_sc = model.m4_seeking_collaboration;
    model.m4_ea = model.m4_emphasizing_autonomy;
    model.m4_cf = model.m4_confront;
    model.m4_l1 = model.m4_sum_l1;
    model.m4_l2 = model.m4_sum_l2;
    model.m4_l3 = model.m4_sum_l3;
    model.m4_l4 = model.m4_sum_l4;
    model.m4_l5 = model.m4_sum_l5;
    model.m4_l6 = model.m4_sum_l6;

    // update the files with decimal values to string and max 2 decimal places
    model.m4_l1 = model.m4_l1.toFixed(2).toString();
    model.m4_l2 = model.m4_l2.toFixed(2).toString();
    model.m4_l5 = model.m4_l5.toFixed(2).toString();
    model.m4_l6 = model.m4_l6.toFixed(2).toString();



    generatePdfFromDocxTemplate(
      "./template.docx", // Ensure this points to your DOCX template
      model, // Updated model data with database values
      `./render/coding_result_${model.id}_${model.interview}.pdf` // Desired output PDF file path
    ).catch((error) => console.error("Error:", error));
  });
});

// // Update the `generatePdfFromDocxTemplate` function call with the new `modelData`
// generatePdfFromDocxTemplate(
//   "./template.docx", // Ensure this points to your DOCX template
//   modelData, // Updated model data with database values
//   "./demo.pdf" // Desired output PDF file path
// ).catch((error) => console.error("Error:", error));
