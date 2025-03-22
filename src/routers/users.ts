import express, { Request, Response } from 'express';
import { client } from '../client/client';
const userRouter = express.Router();

userRouter.use(express.json());

userRouter.get("/", async (_req: Request, res: Response) => {
  const result = await client.query("SELECT * FROM users");
  res.json(result.rows);
});

userRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await client.query(`SELECT * FROM users WHERE id = ${id}`);
  res.json(result.rows[0]);
});

userRouter.post('/', async (req: Request, res: Response) => {
  const { name } = req.body;
  const result = await client.query(
    `INSERT INTO users (name) VALUES ('${name}') RETURNING *`
  );
  res.json(result.rows[0]);
});

userRouter.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const result = await client.query(
    `UPDATE users SET name = '${name}' WHERE id = ${id} RETURNING *`
  );
  res.json(result.rows[0]);
});

userRouter.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await client.query(
    `DELETE FROM users WHERE id = ${id} RETURNING *`
  );
  res.json(result.rows[0]);
});

export default userRouter;

