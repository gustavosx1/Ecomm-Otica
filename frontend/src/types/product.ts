// Tipos baseados na estrutura do Supabase
export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
  updated_at: string;
};

export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  image_url: string;
  category_id: string;
  categories?: Category;
  created_at: string;
  updated_at: string;
};

// Tipo adaptado para o frontend
export type Produto = {
  id: number | string;
  nome: string;
  preco: number;
  imagem: string;
  categoria_nome: string;
  categoria?: string;
  stock?: number;
  description?: string;
};

// Função para converter dados da API Supabase para o formato do frontend
export function adaptProductFromSupabase(product: Product): Produto {
  return {
    id: product.id,
    nome: product.name,
    preco: product.price,
    imagem: product.image_url,
    categoria_nome: product.categories?.name || 'Categoria',
    categoria: product.categories?.slug,
    stock: product.stock,
    description: product.description,
  };
}