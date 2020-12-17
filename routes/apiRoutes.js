// LOAD DATA
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

const noteFile = path.join(__dirname, "../db/db.json")
const noteData = JSON.parse(fs.readFileSync(noteFile,"utf-8"));

// ROUTING

module.exports = function(app){
    app.get("/api/notes", function(req, res){
        res.json(noteData)
    });

    app.post("/api/notes", function(req, res){
        let newNote = req.body;
        newNote.id = uuid.v4();
        noteData.push(newNote);
        fs.writeFileSync(noteFile, JSON.stringify(noteData),"utf-8")
        res.json(true);
    });

    app.delete("/api/notes/:id", function(req,res){
        const filteredNotes = noteData.filter((note) => note.id != req.params.id);
        fs.writeFileSync(noteFile, JSON.stringify(filteredNotes),"utf-8");
        res.json({id: req.params.id,});
    });
}