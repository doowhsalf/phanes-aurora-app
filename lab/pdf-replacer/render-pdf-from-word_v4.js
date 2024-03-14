const fs = require("fs");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const util = require("util");
const OfficeConverter = require("office-converter")();
const { queryDatabase } = require("./query-model");
const { convertDocxToPdf } = require("./convertDocxToPdf");
const path = require("path");

// Convert callback-based OfficeConverter.generatePdf to return a Promise
const generatePdfAsync = util
  .promisify(OfficeConverter.generatePdf)
  .bind(OfficeConverter);

const queryDatabaseAsync = util.promisify(queryDatabase);

async function generatePdfFromDocxTemplate(
  docxTemplatePath,
  data,
  outputPdfPath
) {
  try {
    console.log("Start generating pdf from docx");
    const content = fs.readFileSync(docxTemplatePath, "binary");
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.render(data);
    const buf = doc.getZip().generate({ type: "nodebuffer" });
    const pdfPath = outputPdfPath;
    const tempDocxPath = outputPdfPath.replace(".pdf", ".docx");
    console.log("Write the temp docx file");
    fs.writeFileSync(tempDocxPath, buf);

    console.log("Start converting docx to pdf");

    // Manually wrapping OfficeConverter's generatePdf in a Promise
    // set a timeout to wait for the file to be written
    await new Promise((resolve) => setTimeout(resolve, 800));
    await convertDocxToPdf(tempDocxPath, pdfPath);
    // await new Promise((resolve, reject) => {
    //   console.log("Start the inside promise");
    //   console.log("tempDocxPath", tempDocxPath);

    //   OfficeConverter.generatePdf(tempDocxPath, (err, result) => {
    //     if (err) {
    //       console.error("Error converting document to PDF:", err);
    //       return reject(err);
    //     }
    //     // Ensure the correct result handling here based on how your converter provides the output
    //     console.log("Renaming the result to outputPdfPath");
    //     console.log("Result from PDF conversion:", result);

    //     fs.renameSync(result, outputPdfPath);
    //     //fs.writeFileSync(outputPdfPath, result);
    //     console.log("PDF generated successfully:", outputPdfPath);
    //     resolve();
    //   });
    //   resolve();
    // });

    // Cleanup the temporary DOCX file
    //fs.unlinkSync(tempDocxPath);
  } catch (error) {
    console.error("Error processing document:", error);
  }
}

async function main() {
  try {
    const models = await queryDatabaseAsync();
    for (const model of models) {
      // Update model fields as required here...
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

      // save model.interview to interview_fixed without any spaces- replace with underscore
      // also remove any trailing spaces
      model.interview = model.interview.trim();
      model.interview_fixed = model.interview.replace(/\s/g, "_");
      // set qa_completed_date to current date as yyyy-mm-dd
      model.qa_completed_date = new Date().toISOString().split("T")[0];
      // Set qa_completed_date to current date as yyyy-mm-dd
      model.qa_completed_date = new Date().toISOString().split("T")[0];

      // Define paths
      const absolutePath = __dirname;
      const outputPdfPath = path.join(
        absolutePath,
        "render",
        `coding_result_${model.id}_${model.interview_fixed}.pdf`
      );

      try {
        // wait 8888 ms to allow the file to be written
        await new Promise((resolve) => setTimeout(resolve, 8888));
        await generatePdfFromDocxTemplate(
          path.join(absolutePath, "template.docx"),
          model,
          outputPdfPath
        );
        console.log(`Successfully generated PDF for model ID: ${model.id}`);
      } catch (error) {
        console.error(`Error generating PDF for model ID: ${model.id}:`, error);
      }
    }
  } catch (error) {
    console.error("Failed to process models:", error);
  }
}

main();
