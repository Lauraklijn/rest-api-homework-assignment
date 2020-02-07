const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/", (request, response, next) => {
  console.log(request.body);
  response.json({
    message: "This is the message that was sent!"
  });
});

app.listen(port, () => console.log("listening on port " + port));
