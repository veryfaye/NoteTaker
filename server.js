const express = require("express");
const path = require("path");

const app = express();

let PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// ROUTES 
// ---------------------------------------
app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Start Server
//----------------------------------------
app.listen(PORT, function() {
    console.log("App is listening on PORT: " + PORT);
});

