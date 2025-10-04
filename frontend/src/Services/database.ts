// src/services/database.ts
// src/services/database.ts
import postgres from 'postgres';

const sql = postgres({
  host: 'localhost',
  port: 5432,
  database: 'minha_otica',
  username: 'postgres',
  password: 'root', 
});


type Produto = {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  categoria_nome: string;
};


export async function getProdutos() : Promise<Produto[]> {
  const produtos = await sql<Produto[]>`
    SELECT 
      p.*, 
      c.nome as categoria_nome 
    FROM produtos p 
    JOIN categorias c ON p.categoria_id = c.id 
    WHERE p.disponivel = true
  `;
  return produtos;
}

export async function getProdutoById(id: number): Promise<Produto | null> {
  const [produto] = await sql<Produto[]>`
    SELECT * FROM produtos WHERE id = ${id}
  `;
  return produto ?? null;
}


export default sql;