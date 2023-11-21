// a program that reads a file where a segment contains 5 columns. A segment ends with character ###@@@###.
// the segment has 5 columns, one for each language, separated by the character ###
// write the 5 columns to one json-object with 5 key value pairs, one for each language
var fs = require("fs");
var path = require("path");
var inputFile = "master.csv";
var outputFolder = "output";
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}
// the first line in the master.csv contains the language codes 
// read the first line and split it into an array based on segments and separator ###@@@###
var segmentIndicator = "###@@@###";
var columnSeparator = "###";
var data = fs.readFileSync(inputFile, "utf8");

// just get the first line and create an array of languages
var segments = data.split(segmentIndicator);
var firstSegment = segments[0];
var languagesPair = firstSegment.split(columnSeparator);
// the languages are the value in yml format, make sure to trim the spaces and remove the quotes
var languages = [];
languagesPair.forEach((languagePair) => {
  var language = languagePair.split(":")[1];
  language = language.trim();
  language = language.replace(/"/g, "");
  languages.push(language);
});
console.log("Languges:")
console.log(languages);
// halt the program
// return;
//var languages = ["en", "sv", "no", "fi", "da"];
// recreate language files
for (let i = 0; i < languages.length; i++) {
  const outputFileName = `${languages[i]}.i18n.yml`;
  const outputPath = path.join(outputFolder, outputFileName);
  fs.writeFileSync(outputPath, "");
}
// read the master.csv file
let result = [];
// split the file into segments
var segments = data.split("###@@@###");
// for each segment
segments.forEach((segment) => {
  console.log(segment);
  // split the segment into columns
  var columns = segment.split("###");
  // create an object to hold the key value pairs
  var object = {};
  // for each column
  columns.forEach((column, index) => {
    // add the key value pair to the object
    // object[languages[index]] = column;
    let language = languages[index];
    var outputFileName = `${language}.i18n.yml`;
    // get the file path
    var outputPath = path.join(outputFolder, outputFileName);
    // get the content AND replace any \t\" with "
    var outputContent = column;
    if (outputContent === undefined) {
      outputContent = "";
    }
    // apend a new line to output content
    outputContent = outputContent.replace(/""/g, '"');
    outputContent = outputContent.replace(/""/g, '"');
    outputContent = outputContent.replace(/""/g, '"');
  
    // make sure to clean up error - replace </ P> with </p>
    outputContent = outputContent.replace(/<\/ P>/g, "</p>");
    // replace <P> with <p>
    outputContent = outputContent.replace(/<P>/g, "<p>");
    // replace any newline with a space
    outputContent = outputContent.replace(/\n/g, " ");
    // make the string yml compatible
    // make sure the string has no trailing spaces 
    outputContent = outputContent.trim();
    // if the string is empty, do not write it to the file
    if (outputContent === "") {
      return;
    }
    fs.appendFileSync(outputPath, outputContent + "\n");
  });
  console.log(object);
  result.push(object);
});

// a program that reads a file where a segment contains 5 columns. A segment ends with character ###@@@###.
