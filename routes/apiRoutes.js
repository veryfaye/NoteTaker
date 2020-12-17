// LOAD DATA
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

const noteFile = path.join(__dirname, "../db/db.json")


// ROUTING

module.exports = function(app){
    app.get("/api/notes", function(req, res){
        const noteData = JSON.parse(fs.readFileSync(noteFile,"utf-8"));
        res.json(noteData)
    });

    app.post("/api/notes", function(req, res){
        const noteData = JSON.parse(fs.readFileSync(noteFile,"utf-8"));
        let newNote = req.body;
        newNote.id = uuid.v4();
        noteData.push(newNote);
        fs.writeFileSync(noteFile, JSON.stringify(noteData),"utf-8")
        res.json(true);
    });

    app.delete("/api/notes/:id", function(req,res){
        const noteData = JSON.parse(fs.readFileSync(noteFile,"utf-8"));
        const filteredNotes = noteData.filter((note) => note.id != req.params.id);
        fs.writeFileSync(noteFile, JSON.stringify(filteredNotes),"utf-8");
        res.send(noteFile);
    });
}