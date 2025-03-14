import express from 'express';
import pool from '../pgdb/pgclient';
import { createRouteHandler } from '../routers/heandlerRoute';

const router = express.Router();

router.get("/users", createRouteHandler(async (req:any, res:any) => {
    const result = await pool.query(`SELECT * FROM users`);
    res.json(result.rows);
}));

router.get("/users/:id", createRouteHandler(async (req:any, res:any) => {
    const id = req.params.id;
    const result = await pool.query(`SELECT * FROM users WHERE id = ${id}`);
    res.json(result.rows[0]);
}));

router.post('/users', createRouteHandler(async (req:any, res:any) => {
    const name = req.body.name;
    const result = await pool.query(`INSERT INTO users (name) VALUES ('${name}') RETURNING *`);
    res.json(result.rows[0]);
}));

router.put('/users/:id', createRouteHandler(async (req:any, res:any) => {
    const id = req.params.id;
    const name = req.body.name;
    const result = await pool.query(`UPDATE users SET name = '${name}' WHERE id = ${id} RETURNING *`);
    res.json(result.rows[0]);
}));

router.delete('/users/:id', createRouteHandler(async (req:any, res:any) => {
    const id = req.params.id;
    const result = await pool.query(`DELETE FROM users WHERE id = ${id} RETURNING *`);
    res.json(result.rows[0]);
}));

export default router;
