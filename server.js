// DEPENDENCIES
const express = require("express");

// EXPRESS CONFIGURATION
const app = express();

let PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(__dirname+"/public"))

// ROUTES 
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// LISTENER
app.listen(PORT, function() {
    console.log("App is listening on PORT: " + PORT);
});

