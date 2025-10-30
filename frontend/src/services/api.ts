import type { Product, Category } from '../types/product';

const API_BASE_URL = 'http://localhost:3001/api';

// Função helper para fazer requests
async function apiRequest<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} - ${response.statusText}`);
  }

  return response.json();
}

// Serviços para produtos
export const productService = {
  // Buscar todos os produtos
  getAll: (): Promise<Product[]> => {
    return apiRequest<Product[]>('/products');
  },

  // Buscar produto por ID
  getById: (id: string): Promise<Product> => {
    return apiRequest<Product>(`/products/${id}`);
  },

  // Buscar produtos por categoria
  getByCategory: (category: string): Promise<Product[]> => {
    return apiRequest<Product[]>(`/products/category/${category}`);
  },

  // Criar produto (para admin)
  create: (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>, token?: string): Promise<Product> => {
    return apiRequest<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  },

  // Atualizar produto (para admin)
  update: (id: string, product: Partial<Product>, token?: string): Promise<Product> => {
    return apiRequest<Product>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  },

  // Deletar produto (para admin)
  delete: (id: string, token?: string): Promise<void> => {
    return apiRequest<void>(`/products/${id}`, {
      method: 'DELETE',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  },
};

// Serviços para categorias
export const categoryService = {
  // Buscar todas as categorias
  getAll: (): Promise<Category[]> => {
    return apiRequest<Category[]>('/categories');
  },

  // Buscar categoria por ID
  getById: (id: string): Promise<Category> => {
    return apiRequest<Category>(`/categories/id/${id}`);
  },

  // Buscar categoria por slug
  getBySlug: (slug: string): Promise<Category> => {
    return apiRequest<Category>(`/categories/slug/${slug}`);
  },
};

export default {
  products: productService,
  categories: categoryService,
};