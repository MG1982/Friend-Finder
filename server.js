// Requires
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Set port number
let PORT = process.env.PORT || 3000;

// Parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// I had major issues trying to get external css and js files to link until I worked out this one!
app.use(express.static('public'))

// Route Requires
require("./routing/htmlRoutes")(app);
require("./routing/apiRoute")(app);

// Starts the port listener
app.listen(PORT, () => {
    console.log("App listening on PORT: " + PORT);
});