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
  enum ValidationMessages {
    UNDEFINED = "undefined",
    WRONG_TYPE = "wrong type",
    WRONG_FORMAT = "wrong format",
    WRONG_VALUE = "wrong value",
  }

  export const validateParams = () => {
    return [
      param("id", ValidationMessages.UNDEFINED)
        .exists()
        .isInt()
        .withMessage(ValidationMessages.WRONG_TYPE),
    ];
  };

  export const validateBody = () => {
    return [
      body("name", ValidationMessages.UNDEFINED)
        .exists()
        .isString()
        .withMessage(ValidationMessages.WRONG_TYPE)
        .trim()
        .escape(),
      body("isDone", ValidationMessages.UNDEFINED)
        .exists()
        .isBoolean()
        .withMessage(ValidationMessages.WRONG_TYPE),
      body("dueDate", ValidationMessages.UNDEFINED)
        .exists()
        .isString()
        .withMessage(ValidationMessages.WRONG_TYPE)
        .isISO8601()
        .withMessage(ValidationMessages.WRONG_FORMAT),
      body("progress", ValidationMessages.UNDEFINED)
        .exists()
        .isInt()
        .withMessage(ValidationMessages.WRONG_TYPE)
        .isInt({ min: 0, max: 100 })
        .withMessage(ValidationMessages.WRONG_VALUE),
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
      return res
        .status(422)
        .json({ errors: errors.array({ onlyFirstError: true }) });
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

  export const get = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const id = Number.parseInt(req.params.id);

      const todo = await prisma.todo.findUnique({
        where: {
          id: id,
        },
      });

      res.status(200).json(todo);
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

  export const remove = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const id = Number.parseInt(req.params.id);

      const todo = await prisma.todo.delete({
        where: {
          id: id,
        },
      });

      res.status(200).json(todo);
    } catch (err) {
      return next(err);
    }
  };
}

export default TodoController;
