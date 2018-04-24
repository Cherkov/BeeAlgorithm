const express = require("express");
const os = require("os");
const app = express();
const bodyParser = require('body-parser')
app.use(express.static("dist"));
app.use(bodyParser.json()); // for parsing application/json
app.post("/api/getUsername", function(req, res) {

  console.log(req.body);
  res.send({ username: os.userInfo().username })
} );
app.listen(8080, () => console.log("Listening on port 8080!"));