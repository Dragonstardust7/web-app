import express, { Request, Response } from "express";
import { client } from "../client/client";
import { createRouteHandler } from "../shared/routeHandler";

const userRouter = express.Router();
userRouter.use(express.json());

const isValidId = (id: string): boolean => {
  const parsed = Number(id);
  return Number.isInteger(parsed) && parsed > 0;
};

userRouter.get(
  "/",
  createRouteHandler(async (req: Request, res: Response) => {
    const result = await client.query("SELECT * FROM users");
    res.json(result.rows);
  })
);

userRouter.get(
  "/:id",
  createRouteHandler(async (req: Request, res: Response) => {
    if (!isValidId(req.params.id)) {
      return res
        .status(400)
        .json({ error: "id должен быть положительным числом" });
    }
    const result = await client.query("SELECT * FROM users WHERE id = $1", [
      req.params.id,
    ]);
    res.json(result.rows[0]);
  })
);

userRouter.post(
  "/",
  createRouteHandler(async (req: Request, res: Response) => {
    if (
      !req.body.name ||
      typeof req.body.name !== "string" ||
      req.body.name.trim() === ""
    ) {
      return res
        .status(400)
        .json({ error: "name обязателен и не должен быть пустым" });
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
  createRouteHandler(async (req: Request, res: Response) => {
    if (!isValidId(req.params.id)) {
      return res
        .status(400)
        .json({ error: "id должен быть положительным числом" });
    }
    if (
      !req.body.name ||
      typeof req.body.name !== "string" ||
      req.body.name.trim() === ""
    ) {
      return res
        .status(400)
        .json({ error: "name обязателен и не должен быть пустым" });
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
  createRouteHandler(async (req: Request, res: Response) => {
    if (!isValidId(req.params.id)) {
      return res
        .status(400)
        .json({ error: "id должен быть положительным числом" });
    }
    const result = await client.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [req.params.id]
    );
    res.json(result.rows[0]);
  })
);

export default userRouter;
