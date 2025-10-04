// src/services/database.ts
// src/services/database.ts
import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();

const sql = postgres({
  host: 'localhost',
  port: 5432,
  database: 'minha_otica',
  username: 'postgres',
  password: 'root', 
});
export default sql;