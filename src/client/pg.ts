import "dotenv/config";
import { Pool } from "pg";

const { PGUSER, PGHOST, PGDATABASE, PGPASSWORD} = process.env

const pool = new Pool({
  user: PGUSER,
  host: PGHOST,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: Number(process.env.PGPORT),
});

export default pool;