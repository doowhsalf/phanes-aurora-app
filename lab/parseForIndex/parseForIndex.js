const glob = require("glob");
const fs = require("fs");
const esprima = require("esprima");

glob("**/*.js", function (er, files) {
  files.forEach((file) => {
    const content = fs.readFileSync(file, "utf8");
    const ast = esprima.parseScript(content, { tolerant: true });

    analyzeAST(ast);
  });
});

function analyzeAST(node) {
  if (node && typeof node === "object") {
    if (
      node.type === "CallExpression" &&
      node.callee &&
      node.callee.property &&
      ["find", "findOne", "update", "delete"].includes(
        node.callee.property.name
      )
    ) {
      console.log("Found a MongoDB query:", node);

      const queryFields = extractQueryFields(node.arguments[0]);

      if (queryFields.length > 0) {
        console.log("Proposed index:", createIndex(queryFields));
      }
    }

    for (let key in node) {
      if (node.hasOwnProperty(key)) {
        analyzeAST(node[key]);
      }
    }
  }
}

function extractQueryFields(node) {
  const fields = [];

  if (node && node.type === "ObjectExpression") {
    node.properties.forEach((prop) => {
      if (prop.key && prop.key.name) {
        fields.push(prop.key.name);
      }
    });
  }

  return fields;
}

function createIndex(fields) {
  const index = {};
  fields.forEach((field) => {
    index[field] = 1; // Here, "1" means ascending order. You might want to analyze the query to determine the best order or index type.
  });
  return index;
}
