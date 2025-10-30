import { useState, useEffect } from 'react';
import type { Produto } from '../types/product';
import { adaptProductFromSupabase } from '../types/product';
import { productService, categoryService } from '../services/api';

// Hook para buscar todos os produtos
export function useProducts() {
  const [products, setProducts] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getAll();
      const adaptedProducts = data.map(adaptProductFromSupabase);
      setProducts(adaptedProducts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refetch: fetchProducts };
}

// Hook para buscar produtos por categoria
export function useProductsByCategory(categorySlug: string) {
  const [products, setProducts] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categorySlug) return;

    async function fetchProductsByCategory() {
      try {
        setLoading(true);
        setError(null);
        const data = await productService.getByCategory(categorySlug);
        const adaptedProducts = data.map(adaptProductFromSupabase);
        setProducts(adaptedProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar produtos');
      } finally {
        setLoading(false);
      }
    }

    fetchProductsByCategory();
  }, [categorySlug]);

  return { products, loading, error };
}

// Hook para buscar um produto específico
export function useProduct(productId: string | undefined) {
  const [product, setProduct] = useState<Produto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);
        const data = await productService.getById(productId!);
        const adaptedProduct = adaptProductFromSupabase(data);
        setProduct(adaptedProduct);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar produto');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  return { product, loading, error };
}

// Hook para buscar categorias
export function useCategories() {
  const [categories, setCategories] = useState<{id: string, name: string, slug: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        setError(null);
        const data = await categoryService.getAll();
        setCategories(data.map(cat => ({
          id: cat.id,
          name: cat.name,
          slug: cat.slug
        })));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar categorias');
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { categories, loading, error };
}