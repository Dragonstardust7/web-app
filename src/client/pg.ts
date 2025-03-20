import "dotenv/config";
import { Client } from "pg";

const { PGUSER, PGHOST, PGDATABASE, PGPASSWORD, PGPORT } = process.env;

const client = new Client({
  user: PGUSER,
  host: PGHOST,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: +PGPORT!,
});


export default client;
