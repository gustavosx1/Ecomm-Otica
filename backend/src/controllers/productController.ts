import type { Request, Response } from "express";
import sql from "../database/connetion.js";


export async function getProdutos(req: Request, res: Response) { 
  try{
    const produtos = await sql`
    SELECT 
      p.*, 
      c.nome as categoria_nome 
    FROM produtos p 
    JOIN categorias c ON p.categoria_id = c.id 
    WHERE p.disponivel = true
  `;
  return res.json(produtos);
  }catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
}
export async function getOculosEscuros(req: Request, res: Response) {
  try {
  const produtos = await sql`
    SELECT 
    p.nome,
    p.marca,
    p.preco,
    c.nome as categoria,
    p.destaque
    FROM produtos p
  JOIN categorias c ON p.categoria_id = c.id  
  WHERE p.categoria_id = 2;`

    return res.json(produtos);
  }catch (error) {
    console.error("Erro ao buscar produtos:", error);
  }
  
}


export async function getProdutoById(id: number) {
    try{
        const produto= await sql`
    SELECT * FROM produtos WHERE id = ${id}
  `;
  return produto ?? null;
}catch (error) {
    console.error("Erro ao buscar produto:", error);
    return null;

}
}
