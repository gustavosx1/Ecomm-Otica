export type Produto = {
  id: number;
  name: string;
  description?: string;
  price: string; // Vem como string do banco
  stock_quantity: number;
  image_url: string;
  categoria_nome: string;
  category_id: number;
  created_at: string;
  updated_at: string;
};
