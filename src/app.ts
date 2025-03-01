import express from "express";
import "dotenv/config";
import {Pool} from "pg";

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

  app.get("/users", (req, res) => {
    const users = pool.query(`select * from users`);
    res.json
  });

  app.listen(dbPort, () => {
    console.log(`Сервер запущен на http://127.0.0.1:${dbPort}`);
  });
