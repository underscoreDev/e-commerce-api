import { Pool } from "pg";
import { config } from "dotenv";
config();

const {
  ENV,
  LOCAL_HOST,
  POSTGRES_USER,
  POSTGRES_PORT,
  POSTGRES_DEV_DB,
  POSTGRES_TEST_DB,
  POSTGRES_PASSWORD,
} = process.env;

const pgClient = new Pool({
  host: LOCAL_HOST,
  port: Number(POSTGRES_PORT),
  database: ENV === "dev" ? POSTGRES_DEV_DB : POSTGRES_TEST_DB,
  password: POSTGRES_PASSWORD,
  user: POSTGRES_USER,
});

export default pgClient;
