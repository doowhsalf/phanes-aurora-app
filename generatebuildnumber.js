var fs = require("fs");
console.log("Incrementing build number...");
fs.readFile("source/metadata.json", function (err, content) {
  if (err) throw err;
  var metadata = JSON.parse(content);
  metadata.build = metadata.build + 1;
  fs.writeFile("source/metadata.json", JSON.stringify(metadata), function (
    err
  ) {
    if (err) throw err;
    console.log("Current build number: " + metadata.build);
  });
});
