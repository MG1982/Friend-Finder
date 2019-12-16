const express = require("express");
const app = express();
const bodyParser = require("body-parser");

let PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))

require("./routing/htmlRoutes")(app);
require("./routing/apiRoute")(app);

app.listen(PORT, () => {
    console.log("App listening on PORT: " + PORT);
});