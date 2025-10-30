import type { Produto } from "../types/product";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useProducts } from "../hooks/useProducts";
import { ShoppingCart } from "lucide-react";
import Loading from "../components/Loading/Loading";
import EmptyState from "../components/EmptyState/EmptyState";

export default function Home() {
  const navigate = useNavigate();
  const { adicionarItem } = useCart();
  const { products: produtos, loading, error } = useProducts();
  
  const showDetails = (product: Produto) => {
    navigate("/Product", { state: product });
  }

  // Tela de carregamento
  if (loading) {
    return <Loading message="Carregando produtos..." />;
  }

  // Se houver erro
  if (error) {
    return <EmptyState title="Erro ao carregar produtos" message={error} />;
  }

  // Se a API retornar vazio após carregar, mostra mensagem
  if (!loading && produtos.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="min-h-screen bg-white py-8">
     {/* Título e Descrição */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-yellow-700 mb-4">
          Nossos Produtos
        </h1>
        <p className="text-lg text-yellow-900 max-w-2xl mx-auto">
          Descubra nossa coleção completa de óculos, lentes e acessórios com a melhor qualidade e design.
        </p>
      </div>

      {/* Grid de Produtos */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {produtos.map(p => (
          <div
            key={p.id}
            className="bg-white border border-yellow-300 rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={p.imagem}
              alt={p.nome}
              className="h-40 w-40 object-cover rounded-lg mb-4 border-4 border-yellow-400"
            />
            <h3 className="text-xl font-semibold text-yellow-800 mb-2">{p.nome}</h3>
            <p className="text-yellow-700 font-bold text-lg mb-4">R${p.preco.toFixed(2)}</p>
            
            <div className="flex flex-col gap-2 w-full">
              <button 
                className="bg-yellow-400 text-white font-semibold px-6 py-2 rounded-full hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2" 
                onClick={() => {
                  adicionarItem(p);
                }}
              >
                <ShoppingCart size={18} />
                Adicionar ao Carrinho
              </button>
              
              <button 
                className="bg-white border-2 border-yellow-400 text-yellow-700 font-semibold px-6 py-2 rounded-full hover:bg-yellow-50 transition-colors" 
                onClick={() => showDetails(p)}
              >
                Mais Detalhes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

