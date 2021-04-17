const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 80;

app.use("/", express.static(__dirname + "/../public"));

app.get("/", (_, res) =>
  res.sendFile(path.join(__dirname + "/../public/index.html"))
);

app.get("/impressum", (_, res) =>
  res.sendFile(path.join(__dirname + "/../public/impressum.html"))
);

app.get("/edit", (_, res) =>
  res.sendFile(path.join(__dirname + "/../public/edit.html"))
);

app.get("/add", (_, res) =>
  res.sendFile(path.join(__dirname + "/../public/add.html"))
);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
