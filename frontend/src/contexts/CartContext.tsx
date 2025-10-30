import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Produto } from "../types/product";

export type CartItem = {
  id: number | string;
  nome: string;
  preco: number;
  quantidade: number;
  imagem: string;
  categoria_nome: string;
};

type CartContextType = {
  itens: CartItem[];
  adicionarItem: (produto: Produto, quantidade?: number) => void;
  removerItem: (id: number | string) => void;
  atualizarQuantidade: (id: number | string, quantidade: number) => void;
  limparCarrinho: () => void;
  totalItens: number;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "ecom-otica-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<CartItem[]>(() => {
    // Carrega do localStorage na inicialização
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  // Salva no localStorage quando o carrinho muda
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(itens));
    }
  }, [itens]);

  const adicionarItem = (produto: Produto, quantidade: number = 1) => {
    setItens((prevItens) => {
      const itemExistente = prevItens.find((item) => item.id === produto.id);
      
      if (itemExistente) {
        // Se já existe, aumenta a quantidade
        return prevItens.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item
        );
      } else {
        // Se não existe, adiciona novo item
        const novoItem: CartItem = {
          id: produto.id,
          nome: produto.nome,
          preco: produto.preco,
          quantidade,
          imagem: produto.imagem || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
          categoria_nome: produto.categoria_nome,
        };
        return [...prevItens, novoItem];
      }
    });
  };

  const removerItem = (id: number | string) => {
    setItens((prevItens) => prevItens.filter((item) => item.id !== id));
  };

  const atualizarQuantidade = (id: number | string, quantidade: number) => {
    if (quantidade < 1) return;
    setItens((prevItens) =>
      prevItens.map((item) =>
        item.id === id ? { ...item, quantidade } : item
      )
    );
  };

  const limparCarrinho = () => {
    setItens([]);
  };

  const totalItens = itens.reduce((acc, item) => acc + item.quantidade, 0);
  const total = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  return (
    <CartContext.Provider
      value={{
        itens,
        adicionarItem,
        removerItem,
        atualizarQuantidade,
        limparCarrinho,
        totalItens,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext };
