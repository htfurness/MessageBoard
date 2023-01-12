import express, { Request, Response } from "express";
import messageRouter from "./routers/messageRouter";
import threadRouter from "./routers/threadRouter";

const app = express();
const port = 1955; // ;)

app.use(express.json());

app.use("/message", messageRouter);
app.use("/thread", threadRouter);

var server = app.listen(port, function () {
  if (process.env.NODE_ENV) {
    server.close();
  } else {
    console.log(`Listening on port: ${port}`);
  }
});

export default app;
