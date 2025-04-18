import express, { Request, Response } from "express";
import { client } from "../client/client";
import { createRouteHandler } from "../shared/routeHandler";
import { body, param, validationResult } from "express-validator";

const userRouter = express.Router();
userRouter.use(express.json());

userRouter.get(
  "/",
  createRouteHandler(async (req: Request, res: Response) => {
    const result = await client.query("SELECT * FROM users");
    res.json(result.rows);
  })
);

userRouter.get(
  "/:id",
  [param("").isInt({ min: 0 }).withMessage("id must be >= 0")],
  createRouteHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw errors.array();

    const result = await client.query("SELECT * FROM users WHERE id = $1", [
      req.params.id,
    ]);
    res.json(result.rows[0]);
  })
);

userRouter.post(
  "/",
  body("name")
    .isString()
    .notEmpty()
    .withMessage("name is required and must not be empty"),
  createRouteHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const result = await client.query(
      "INSERT INTO users (name) VALUES ($1) RETURNING *",
      [req.body.name]
    );
    res.json(result.rows[0]);
  })
);

userRouter.put(
  "/:id",
  param("id").isInt({ min: 0 }).withMessage("id must be a positive integer"),
  body("name")
    .isString()
    .notEmpty()
    .withMessage("name is required and must not be empty"),
  createRouteHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const result = await client.query(
      "UPDATE users SET name = $1 WHERE id = $2 RETURNING *",
      [req.body.name, req.params.id]
    );
    res.json(result.rows[0]);
  })
);

userRouter.delete(
  "/:id",
  param("id").isInt({ min: 0 }).withMessage("id must be a positive integer"),
  createRouteHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const result = await client.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [req.params.id]
    );
    res.json(result.rows[0]);
  })
);

export default userRouter;
