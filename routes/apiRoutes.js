// LOAD DATA
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

const noteFile = path.join(__dirname, "../db/db.json");

// ROUTING

module.exports = function (app) {
  // get note data from db.json
  app.get("/api/notes", function (req, res) {
    const noteData = JSON.parse(fs.readFileSync(noteFile, "utf-8"));
    res.json(noteData);
  });

  // save note data to db.json
  app.post("/api/notes", function (req, res) {
    const noteData = JSON.parse(fs.readFileSync(noteFile, "utf-8"));
    let newNote = req.body;
    // use uuid to generate a unique id
    newNote.id = uuid.v4();
    noteData.push(newNote);
    // update db.json with the added object
    fs.writeFileSync(noteFile, JSON.stringify(noteData), "utf-8");
    res.json(true);
  });

  // delete an object from db.json by unique id
  app.delete("/api/notes/:id", function (req, res) {
    const noteData = JSON.parse(fs.readFileSync(noteFile, "utf-8"));
    // filter out the targeted object
    const filteredNotes = noteData.filter((note) => note.id != req.params.id);
    // update db.json with the updated array that excludes the deleted note
    fs.writeFileSync(noteFile, JSON.stringify(filteredNotes), "utf-8");
    res.json(true);
  });
};
