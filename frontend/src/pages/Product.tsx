import { useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import type { Produto } from "../../../backend/src/types/product";

export default function Product() {
  const location = useLocation();
  const navigate = useNavigate();
  const produto = location.state as Produto | undefined;
  
  if (!produto) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <h2 className="text-2xl font-bold text-yellow-700 mb-4">Produto não encontrado</h2>
        <button
          className="bg-yellow-400 text-white font-semibold px-6 py-2 rounded-full hover:bg-yellow-500 transition-colors"
          onClick={() => navigate("/")}
        >
          Voltar para Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 pt-26">
      <div className="max-w-3xl mx-auto bg-white border border-yellow-300 rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8">
        <img
          //src={produto.imagem}
          alt={produto.nome}
          className="h-64 w-64 object-cover rounded-lg border-4 border-yellow-400 mb-6 md:mb-0"
        />
        <div className="flex-1 flex flex-col items-start">
          <h1 className="text-3xl font-bold text-yellow-700 mb-2">{produto.nome}</h1>
          <p className="text-lg text-yellow-900 mb-4">{produto.categoria_nome || "Descrição não disponível."}</p>
          <p className="text-yellow-700 font-bold text-2xl mb-6">R$ {produto.preco}</p>
          <div className="flex gap-4">
            <button className="bg-yellow-400 text-white font-semibold px-6 py-2 rounded-full hover:bg-yellow-500 transition-colors flex items-center gap-2">
              <ShoppingCart size={20} />
              Adicionar ao Carrinho
            </button>
            <button
              className="bg-white border border-yellow-400 text-yellow-700 font-semibold px-6 py-2 rounded-full hover:bg-yellow-100 transition-colors"
              onClick={() => navigate("/")}
            >
              Voltar
            </button>
          </div>
          <div className="mt-8">
            <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-medium shadow">
              Categoria: {produto.categoria_nome || "Não informado"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}