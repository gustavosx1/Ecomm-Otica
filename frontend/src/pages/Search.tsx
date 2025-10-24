import { useEffect, useState } from "react";
import type { Produto, ProductFromAPI } from "../types/product";
import { adaptProductFromAPI } from "../types/product";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchX, ShoppingCart } from "lucide-react";
import { useCart } from "../hooks/useCart";
import Loading from "../components/Loading/Loading";



export default function Search() {
  
  const location = useLocation();
  const navigate = useNavigate();
  const { adicionarItem } = useCart();
  const termoBusca = location.state?.termoBusca || "";
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  
  const produtosFiltrados = produtos.filter(p =>
    p.nome.toLowerCase().includes(termoBusca.toLowerCase())
  );

  const showDetails = (product: Produto) => {
    navigate("/Product", { state: product });
  };

  useEffect(() => {
    async function fetchProdutos() {
      try {
        setLoading(true);
        const dados = await fetch("http://localhost:3001/api/produtos");
        const dadosJson: ProductFromAPI[] = await dados.json();
        const produtosAdaptados = dadosJson.map(adaptProductFromAPI);
        setProdutos(produtosAdaptados);
        
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProdutos();
  }, []);

  // Tela de carregamento
  if (loading) {
    return <Loading message="Carregando produtos..." />;
  }

  return (
    <div className="min-h-screen bg-white py-8">
     {/* Título e Descrição */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-yellow-700 mb-4">
            Pesquisa
        </h1>
        <p className="text-lg text-yellow-900 max-w-2xl mx-auto">Você pesquisou por: <span className="font-semibold text-yellow-700">{termoBusca}</span></p>
      </div>

      {/* Mensagem de erro se não encontrar nada*/}

      {produtosFiltrados.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <SearchX size={64} className="text-yellow-400 mb-4" />
          <h2 className="text-2xl font-bold text-yellow-700 mb-2">Nenhum produto encontrado</h2>
          <p className="text-lg text-gray-600 mb-4">
            Não encontramos resultados para <span className="font-semibold text-yellow-700">{termoBusca}</span>.
          </p>
          <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-medium shadow">
            Tente pesquisar por outro nome ou categoria!
          </span>
        </div>
      ) : (
        /* Grid de Produtos */
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {produtosFiltrados.map(produto => (
            <div
              key={produto.id}
              className="bg-white border border-yellow-300 rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                //src={produto.imagem}
                alt={produto.nome}
                className="h-40 w-40 object-cover rounded-lg mb-4 border-4 border-yellow-400"
              />
              <h3 className="text-xl font-semibold text-yellow-800 mb-2">{produto.nome}</h3>
              <p className="text-yellow-700 font-bold text-lg mb-4">R${produto.preco.toFixed(2)}</p>
              
              <div className="flex flex-col gap-2 w-full">
                <button 
                  className="bg-yellow-400 text-white font-semibold px-6 py-2 rounded-full hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2" 
                  onClick={() => {
                    adicionarItem(produto);
                  }}
                >
                  <ShoppingCart size={18} />
                  Adicionar ao Carrinho
                </button>
                
                <button 
                  className="bg-white border-2 border-yellow-400 text-yellow-700 font-semibold px-6 py-2 rounded-full hover:bg-yellow-50 transition-colors" 
                  onClick={() => showDetails(produto)}
                >
                  Mais Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
