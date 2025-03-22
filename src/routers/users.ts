import express, { Request, Response } from 'express';
import { client } from '../client/client';
import { createRouteHandler } from '../shared/routeHandler';

const userRouter = express.Router();
userRouter.use(express.json());

userRouter.get("/", createRouteHandler(async (req: Request, res: Response) => {
  const result = await client.query("SELECT * FROM users");
  res.json(result.rows);
}));

userRouter.get("/:id", createRouteHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await client.query(`SELECT * FROM users WHERE id = ${id}`);
  res.json(result.rows[0]);
}));

userRouter.post('/', createRouteHandler(async (req: Request, res: Response) => {
  const { name } = req.body;
  const result = await client.query(
    `INSERT INTO users (name) VALUES ('${name}') RETURNING *`
  );
  res.json(result.rows[0]);
}));

userRouter.put('/:id', createRouteHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const result = await client.query(
    `UPDATE users SET name = '${name}' WHERE id = ${id} RETURNING *`
  );
  res.json(result.rows[0]);
}));

userRouter.delete('/:id', createRouteHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await client.query(
    `DELETE FROM users WHERE id = ${id} RETURNING *`
  );
  res.json(result.rows[0]);
}));

export default userRouter;
