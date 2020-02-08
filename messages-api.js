// 1. Create a new JS file named `messages-api.js`.

// 2. Create an Express app in that file.
// The app should listen for requests on port `3000`.

const express = require("express");
const app = express();
const port = 3000;

// 4. When a request is sent to the endpoint, it should log the `text` property of the body to the console, and it should respond with a JSON object, for example:
//    In order to parse the JSON body of the request, you will need to add the middleware for it.
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// 3. Add a single endpoint to the app responds to `POST` requests to the `/messages`.
app.post("/messages", (request, response, next) => {
  if (!request.body.text || request.body.text === "") {
    response.status(400).send("Bad Request"); //5. Perform the following validation: if the body does NOT have a `text` property or the string is empty, then send a "Bad Request" HTTP status code to the client.
  } else {
    console.log(request.body.text);
  }
  response.json({
    message: "This is the message that was sent!"
  });
  next(error);
});

app.listen(port, () => console.log(`listening on port: ${port}`));

// 6. The API should only log the message five times.
// After receiving five messages, sixth request should be sent a response that indicates the HTTP status for "Too Many Requests".
// Make sure the correct HTTP status code is sent (Google it if you haven't seen this status message before).
// --> I broke my code after trying this, unfortunately I can't get it to work
// 7. Put the message limit logic from the previous step into a middleware function. It should behave the same.
