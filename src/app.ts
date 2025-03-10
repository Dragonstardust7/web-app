import express from "express";
import "dotenv/config";
import { Pool } from "pg";

const app = express();
const dbPort = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT),
});

app.listen(dbPort, () => {
  console.log(`Сервер запущен на http://127.0.0.1:${dbPort}`);
});

app.get("/users", async (req, res) => {
  const result = await pool.query(`SELECT * FROM users`);
  res.json(result.rows);
});

app.get("/users/:id", async (req,res) => {
  const result = await pool.query(`SELECT id FROM users`);
  res.json(result.rows);
})

app.post('/users', async (req, res) => {
  const name = req.body.name;
  const result = await pool.query(`INSERT INTO users (name) VALUES ('${name}') RETURNING *`);
  res.json(result.rows[0]);
});

app.put('/users/:id', async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const result = await pool.query(`UPDATE users SET name = '${name}' WHERE id = ${id} RETURNING *`);
  res.json(result.rows[0]);
});

app.delete('/users/:id', async (req, res) => {
  const id = req.params.id;
  const result = await pool.query(`DELETE FROM users WHERE id = ${id} RETURNING *`);
  res.json(result.rows[0]);
});
