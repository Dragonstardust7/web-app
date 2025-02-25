import express from 'express';
import 'dotenv/config';
import pg from 'pg';

const { Client } = pg;
const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: parseInt(process.env.PGPORT || 'Ошибка при получении порта.'),
});

async function main() {
  await client.connect();

  const app = express();
  const dbPort = process.env.PORT;

  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Привет Мага!');
  });

  app.listen(dbPort, () => {
    console.log(`Сервер запущен на http://127.0.0.1:${dbPort}`);
  });

  const result = await client.query('SELECT \$1::text as message', ['Hello world!']);
  console.log(result.rows[0].message);
  await client.end();
}

main();
