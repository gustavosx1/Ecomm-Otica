import type { Request, Response } from "express";
import sql from "../database/connetion.js";

export async function getProdutos(req: Request, res: Response) { 
  try {
    const produtos = await sql`
      SELECT 
        p.*, 
        c.name as categoria_nome 
      FROM products p 
      JOIN categories c ON p.category_id = c.id 
      WHERE p.stock_quantity > 0
    `;
    return res.json(produtos);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return res.status(500).json({ error: "Erro ao buscar produtos" });
  }
}
export async function getOculosEscuros(req: Request, res: Response) {
  try {
    const produtos = await sql`
      SELECT 
        p.id,
        p.name,
        p.description,
        p.price,
        p.image_url,
        p.stock_quantity,
        c.name as categoria
      FROM products p
      JOIN categories c ON p.category_id = c.id  
      WHERE p.category_id = 2 AND p.stock_quantity > 0
    `;
    return res.json(produtos);
  } catch (error) {
    console.error("Erro ao buscar óculos escuros:", error);
    return res.status(500).json({ error: "Erro ao buscar óculos escuros" });
  }
}


export async function getProdutoById(id: number) {
  try {
    const produto = await sql`
      SELECT * FROM products WHERE id = ${id}
    `;
    return produto[0] ?? null;
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return null;
  }
}
