const fs = require("fs");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
// Assuming office-converter is set up correctly and LibreOffice is installed
const OfficeConverter = require("office-converter")();

async function generatePdfFromDocxTemplate(
  docxTemplatePath,
  data,
  outputPdfPath
) {
  try {
    // Load the DOCX file as binary content
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
    fs.writeFileSync(tempDocxPath, buf);

    // Convert the DOCX to PDF
    OfficeConverter.generatePdf(tempDocxPath, (err, result) => {
      if (err) {
        console.error("Error converting document to PDF:", err);
        return;
      }

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

// Example usage
const modelDatax = {
  name: "John Doe",
  qa_completed_date: "2024-03-02",
  id: "1234567890",
  target: "a store about your target",
  m4_cultivating_change_talk: 5,
};
const modelDataz = {
  id: 46489057,
  nid: 3027185,
  user_id: 5429,
  state: 30,
  coder_user_id: 5448,
  coded_completed_date: 1709447353,
  qa_user_id: 7727,
  qa_completed_date: null,
  interview: "Martha Humphreys",
  target: "Smoking cessation",
  organisation: null,
  tag: null,
  code_segment: "4:40-25",
  order_date: 1707951600,
  oe_empathy: 0,
  oe_tease: 0,
  oe_cooperation: 0,
  oe_autonomysupport: 0,
  oe_focus: 0,
  bf_info: 0,
  bf_consistent: 0,
  bf_inconsistent: 0,
  bf_closedquestions: 0,
  bf_openquestions: 0,
  bf_simplereflections: 0,
  bf_complexreflections: 0,
  coder_info: null,
  other_info: null,
  rc_special_info:
    "Organisation: 1234567890\nMember organisation: massmemorial.org\nmassmemorial.org\nDaniel.Mullin@umassmemorial.org",
  rc_billing_address: null,
  rc_delivery_address: null,
  service_nid: 3007847,
  shared_back: null,
  member_experience_nid: null,
  coding_target_date: 1709420400,
  order_target_date: 1709161200,
  shared_with_trainer_uid: null,
  double_coding_user_id: null,
  double_coding_id: null,
  double_coding_date: null,
  callback_for_service_performed_date: null,
  callback_for_service_performed_uid: null,
  callback_for_service_performed_state: null,
  coding_qa_target_date: null,
  cl_neutral: 0,
  cl_commitment_negative: 0,
  cl_reason_negative: 0,
  cl_will_negative: 0,
  cl_ability_negative: 0,
  cl_need_negative: 0,
  cl_actions_negative: 0,
  cl_other_negative: 0,
  cl_commitment_positive: 0,
  cl_reason_positive: 0,
  cl_will_positive: 0,
  cl_ability_positive: 0,
  cl_need_positive: 0,
  cl_actions_positive: 0,
  cl_other_positive: 0,
  order_reference: "-",
  order_reference_not_prebooked: 1,
  qa_to_coder_info: null,
  m4_cultivating_change_talk: 2,
  m4_softening_sustain_talk: 4,
  m4_partnership: 2,
  m4_empathy: 1,
  m4_giving_information: 14,
  m4_persuade: 3,
  m4_persuade_with_permission: 0,
  m4_questions: 15,
  m4_simple_reflection: 1,
  m4_complex_reflection: 1,
  m4_affirm: 2,
  m4_seeking_collaboration: 0,
  m4_emphasizing_autonomy: 0,
  m4_confront: 0,
  qa_to_coder_improvecomment:
    "More reflections on the client´s thoughts and feeling would have affected the Empathy score in a positive way. If some questions had been rephrased as reflections and particularly as Complex reflections the Empathy score had been affected in a positive way.\nThe clinician is giving advice without asking for permission by doing a Persuade, for example “...Maybe even that might be a good time to poke a pice of nicotine gum instead of a cigarette” (10:58) and “...one thought I have is to decreasing your cigarettes by one or two a day …” (23:01) which have negative impact on the Partnership score.\nThe counsellor misses opportunities to encourage the client to elaborate on some potentially important reasons for change, eg (12:42) when he talks about his son and (18:43) when he says that he might sign up in a group” which affect the Cultivating Change Talk score negatively.",
  qa_to_coder_strengthscomment:
    "The counselor asks several evoking questions, eg “What are your biggest concerns around smoking” (11:22) and “If you were going to quit smoking, how might your life be different” (14:04). This contributed to the rating of theCultivating Change talk score positively. The counselor's use of affirmations and seeking collaboration remarks also contributed positively to the Partnership score.",
};

const modelData = {
  id: 46489067,
  nid: 3027195,
  user_id: 5429,
  coder_user_name: "helena.chaomar@hotmail.com",
  practitioner_user_name: "Daniel.Mullin@umassmemorial.org",
  qa_user_name: "lars.QA",
  trainer_user_name: null,
  doublecoding_user_name: null,
  state: 30,
  coder_user_id: 5467,
  coded_completed_date: "2024-03-02 17:26:09",
  qa_completed_date: "2024-03-02 17:26:09",
  qa_user_id: 5437,
  organisation: null,
  interview: "Michael Charles",
  target: "Smoking cessation",
  code_segment: "3:35-21",
  order_date: "2024-02-15 00:00:00",
  oe_empathy: 0,
  oe_tease: 0,
  oe_cooperation: 0,
  oe_autonomysupport: 0,
  oe_focus: 0,
  bf_consistent: 0,
  bf_inconsistent: 0,
  bf_closedquestions: 0,
  bf_openquestions: 0,
  bf_simplereflections: 0,
  bf_complexreflections: 0,
  service_nid: 3007847,
  shared_back: null,
  member_experience_nid: null,
  coding_target_date: "2024-02-29 00:00:00",
  order_target_date: "2024-02-29 00:00:00",
  double_coding_user_id: null,
  double_coding_id: null,
  double_coding_date: null,
  callback_for_service_performed_date: null,
  callback_for_service_performed_uid: null,
  callback_for_service_performed_state: null,
  coding_qa_target_date: null,
  order_reference: "-",
  order_reference_not_prebooked: 1,
  shared_with_trainer_uid: null,
  m4_cultivating_change_talk: 2,
  m4_softening_sustain_talk: 4,
  m4_partnership: 3,
  m4_empathy: 2,
  m4_giving_information: 9,
  m4_persuade: 4,
  m4_persuade_with_permission: 4,
  m4_questions: 10,
  m4_simple_reflection: 2,
  m4_complex_reflection: 1,
  m4_affirm: 0,
  m4_seeking_collaboration: 4,
  m4_emphasizing_autonomy: 0,
  m4_confront: 0,
  m4_sum_l1_reflections_vs_questions: 0.3,
  m4_sum_l2_reflections_vs_totalreflections: 0.3333,
  m4_sum_l3_mi: 4,
  m4_sum_l4_none_mi: 4,
  m4_sum_l5_technical: 3.0,
  m4_sum_l6_relationship: 2.5,
  m4_ct: 2, // m4_cultivating_change_talk
  m4_st: 4, // m4_softening_sustain_talk
  m4_pt: 3, // m4_partnership
  m4_em: 2, // m4_empathy
  m4_gi: 9, // m4_giving_information
  m4_ps: 4, // m4_persuade
  m4_pp: 4, // m4_persuade_with_permission
  m4_qn: 10, // m4_questions
  m4_sr: 2, // m4_simple_reflection
  m4_cr: 1, // m4_complex_reflection
  m4_af: 0, // m4_affirm
  m4_sc: 4, // m4_seeking_collaboration
  m4_ea: 0, // m4_emphasizing_autonomy
  m4_cf: 0, // m4_confront
  m4_l1: "0.3", // m4_sum_l1_reflections_vs_questions
  m4_l2: "0.3", // m4_sum_l2_reflections_vs_totalreflections
  m4_l3: 4, // m4_sum_l3_mi
  m4_l4: 4, // m4_sum_l4_none_mi
  m4_l5: "3.0", // m4_sum_l5_technical
  m4_l6: "2.5", // m4_sum_l6_relationship
  contract_code: "DAN17009",
  invoice_id: null,
  qa_to_coder_improvecomment:
    "06:40 The client mentions reasons for making a change, such as getting back to work, if the clinician had explored the reason for making a change, it would have affected the Cultivating Change positively. The clinician is giving advice without asking for permission by doing a Persuade, for example 17:00 ”…Maybe physical therapy is…” It affects the Partnership Score negatively. 17:20 - 19:00 The clinician is dominating the conversation by talking for almost two minutes without involving the client. It affects the Partnership Score negatively.",
  qa_to_coder_strengthscomment:
    "The clinician is asking evoking Questions, for example 08:50 ”Do you have any concerns about that?” It affects the Cultivating Change Talk Score positively. The clinician is enhancing the client’s concerns with the medication by doing a Simple Reflection, for example 09:30 ”So you are concerned that…” It affects the Cultivating Change Talk Score positively. The clinician gives the client the possibility to decide on the subject by Seeking Collaboration, for example 12:00 ”Would you be open to…” It affects the Partnership Score positively.The clinician is involving the client in the decision making by Seeking Collaboration, for example 12:40 ”What do you think about that?” It affects the Partnership Score positively.",
};

// Update the `generatePdfFromDocxTemplate` function call with the new `modelData`
generatePdfFromDocxTemplate(
  "./template.docx", // Ensure this points to your DOCX template
  modelData, // Updated model data with database values
  "./demo.pdf" // Desired output PDF file path
).catch((error) => console.error("Error:", error));
