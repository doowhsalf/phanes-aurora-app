const mysql = require("mysql");

// Function to query the database and return results
async function queryDatabase(callback) {
  const connection = mysql.createConnection({
    host: "localhost",
    port: 3348,
    user: "root",
    password: "gabbi48ii",
    database: "prod_miclabinc",
  });

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      return callback(err, null);
    }
    console.log("Connected to the database successfully.");

    const query =
      "SELECT * FROM view_codings_for_render where id between 46489050 and 46489078 and state > 29;";
    connection.query(query, (err, results) => {
      connection.end();

      if (err) {
        console.error("Error executing query:", err);
        return callback(err, null);
      }

      const model = JSON.parse(JSON.stringify(results));
      callback(null, model);
    });
  });
}

module.exports = { queryDatabase };
