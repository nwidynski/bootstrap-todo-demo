import "core-js/stable";
import "regenerator-runtime/runtime";
import express from "express";

import TodoRouter from "@server/routes/todo";

const app = express();
const port = process.env.PORT || 80;

app.use("/todos", TodoRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
