import express, { Request, Response } from "express";

const app = express();
const port = 1955; // ;)

app.use(express.json());

var server = app.listen(port, function () {
  console.log(`Listening on port: ${port}`);
  server.close(function () {
    console.log("Closing");
  });
});

export default app;
