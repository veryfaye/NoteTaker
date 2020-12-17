// DEPENDENCIES
const path = require("path");

// ROUTING
module.exports = function (app) {
  // display notes.html if url ends with /notes
  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  // otherwise display index.html
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
