import postgres from 'postgres';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carregue o .env do diretório raiz do backend
dotenv.config({ path: join(__dirname, '../../.env') });

const sql = postgres({
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  max: 20, // Máximo de conexões no pool
  idle_timeout: 20, // Tempo limite para conexões ociosas
  connect_timeout: 10, // Tempo limite para conectar
});

export default sql;