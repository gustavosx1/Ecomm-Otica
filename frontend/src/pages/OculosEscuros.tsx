import { useEffect, useState } from "react";
import type { Produto } from "../../../backend/src/types/product";


export default function OculosEscuros() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const dados = await fetch("http://localhost:3001/api/produtos/oculos-escuros");
        const dadosJson = await dados.json();
        setProdutos(dadosJson);
        
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }
    fetchProdutos();
  }, []);

  return (
    <div className="min-h-screen bg-white py-8">
     {/* Título e Descrição */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-yellow-700 mb-4">
            Óculos Escuros
        </h1>
        <p className="text-lg text-yellow-900 max-w-2xl mx-auto">
          Descubra nossa coleção completa de óculos escuros.
        </p>
      </div>

      {/* Grid de Produtos */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {produtos.map(produtos => (
          <div
            key={produtos.id}
            className="bg-white border border-yellow-300 rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              //src={produtos.imagem}
              alt={produtos.nome}
              className="h-40 w-40 object-cover rounded-lg mb-4 border-4 border-yellow-400"
            />
            <h3 className="text-xl font-semibold text-yellow-800 mb-2">{produtos.nome}</h3>
            <p className="text-yellow-700 font-bold text-lg mb-4">R${produtos.preco}</p>
            <button className="bg-yellow-400 text-white font-semibold px-6 py-2 rounded-full hover:bg-yellow-500 transition-colors">
              Comprar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

