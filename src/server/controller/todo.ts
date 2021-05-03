import express from "express";
import { body, param, validationResult } from "express-validator/check";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createTodo = (
  name: string,
  isDone: boolean,
  dueDate: string,
  progress: number
) => {
  return Prisma.validator<Prisma.TodoCreateInput>()({
    name,
    isDone,
    dueDate,
    progress,
  });
};

const updateTodo = (
  name: string,
  isDone: boolean,
  dueDate: string,
  progress: number
) => {
  return Prisma.validator<Prisma.TodoUpdateInput>()({
    name,
    isDone,
    dueDate,
    progress,
  });
};

namespace TodoController {
  export const validateParams = () => {
    return [param("id", "id doesn't exist").exists().isInt()];
  };

  export const validateBody = () => {
    return [
      body("name", "name doesn't exist")
        .exists()
        .isString()
        .withMessage("name is not string")
        .trim()
        .escape(),
      body("isDone", "isDone doesn't exist")
        .exists()
        .isBoolean()
        .withMessage("isDone is not boolean"),
      body("dueDate", "dueDate doesn't exist")
        .exists()
        .isString()
        .withMessage("dueDate is not String")
        .isISO8601()
        .withMessage("dueDate is not in ISO8601 format"),
      body("progress", "progress doesn't exist")
        .exists()
        .isInt({ min: 0, max: 100 })
        .withMessage("progress is not int"),
    ];
  };

  export const handleValidationResult = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.log("here");
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    next();
  };

  export const list = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const todos = await prisma.todo.findMany();

      res.status(200).json(todos);
    } catch (err) {
      return next(err);
    }
  };

  export const edit = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const id = Number.parseInt(req.params.id);
      const { name, isDone, dueDate, progress } = req.body;

      const todo = await prisma.todo.update({
        where: {
          id: id,
        },
        data: updateTodo(name, isDone, dueDate, progress),
      });

      res.status(200).json(todo);
    } catch (err) {
      return next(err);
    }
  };

  export const create = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { name, isDone, dueDate, progress } = req.body;

      const todo = await prisma.todo.create({
        data: createTodo(name, isDone, dueDate, progress),
      });

      res.status(200).json(todo);
    } catch (err) {
      return next(err);
    }
  };
}

export default TodoController;
