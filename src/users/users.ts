import express, { Request, Response } from 'express';
import pool from '../client/pg';
const UserRouter = express.Router();

UserRouter.use(express.json());

UserRouter.get("/", async (_req: Request, res: Response) => {
  const result = await pool.query("SELECT * FROM users");
  res.json(result.rows);
});

UserRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await pool.query(`SELECT * FROM users WHERE id = ${id}`);
  res.json(result.rows[0]);
});

UserRouter.post('/', async (req: Request, res: Response) => {
  const { name } = req.body;
  const result = await pool.query(
    `INSERT INTO users (name) VALUES ('${name}') RETURNING *`
  );
  res.json(result.rows[0]);
});

UserRouter.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const result = await pool.query(
    `UPDATE users SET name = '${name}' WHERE id = ${id} RETURNING *`
  );
  res.json(result.rows[0]);
});

UserRouter.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await pool.query(
    `DELETE FROM users WHERE id = ${id} RETURNING *`
  );
  res.json(result.rows[0]);
});

export default UserRouter;

