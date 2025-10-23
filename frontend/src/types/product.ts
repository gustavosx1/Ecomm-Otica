// Tipo baseado na estrutura real do banco de dados
export type ProductFromAPI = {
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

// Tipo adaptado para o frontend (mantém compatibilidade)
export type Produto = {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  categoria_nome: string;
};

// Função para converter dados da API para o formato do frontend
export function adaptProductFromAPI(product: ProductFromAPI): Produto {
  return {
    id: product.id,
    nome: product.name,
    preco: parseFloat(product.price),
    imagem: product.image_url,
    categoria_nome: product.categoria_nome,
  };
}