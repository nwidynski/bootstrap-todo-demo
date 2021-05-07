import express from "express";
import TodoController from "../controller/todo";

const router = express.Router();

router.use(express.json());

router.get("/", TodoController.list);

router.post(
  "/",
  TodoController.validateBody(),
  TodoController.handleValidationResult,
  TodoController.create
);

router.get(
  "/:id",
  TodoController.validateParams(),
  TodoController.handleValidationResult,
  TodoController.get
);

router.put(
  "/:id",
  TodoController.validateParams(),
  TodoController.validateBody(),
  TodoController.handleValidationResult,
  TodoController.edit
);

router.delete(
  "/:id",
  TodoController.validateParams(),
  TodoController.handleValidationResult,
  TodoController.remove
);

export default router;
