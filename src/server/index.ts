import express from "express";
import path from "path";

import TodoRouter from "./routes/todo";

const app = express();
const port = process.env.PORT || 80;

app.use("/", express.static(__dirname + "/../public"));
app.use("/todos", TodoRouter);

app.get("/impressum", (_, res) =>
  res.sendFile(path.join(__dirname + "/../public/impressum.html"))
);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
