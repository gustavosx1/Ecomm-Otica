import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export default function Carrinho() {
  const navigate = useNavigate();
  const { itens, atualizarQuantidade, removerItem, limparCarrinho, totalItens, total } = useCart();

  if (itens.length === 0) {
    return (
      <div className="min-h-screen bg-white py-12 pt-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ShoppingBag size={80} className="text-yellow-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-yellow-700 mb-4">Seu carrinho está vazio</h1>
          <p className="text-lg text-yellow-900 mb-8">Adicione alguns produtos para começar suas compras!</p>
          <button
            onClick={() => navigate("/")}
            className="bg-yellow-400 text-white font-semibold px-8 py-3 rounded-full hover:bg-yellow-500 transition-colors"
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 pt-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-700 mb-4">Carrinho de Compras</h1>
          <p className="text-lg text-yellow-900">{totalItens} {totalItens === 1 ? 'item' : 'itens'} no seu carrinho</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Produtos */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {itens.map(item => (
                <div key={item.id} className="bg-white border border-yellow-300 rounded-xl shadow-lg p-6 flex items-center gap-4">
                  <img
                    src={item.imagem}
                    alt={item.nome}
                    className="h-20 w-20 object-cover rounded-lg border-2 border-yellow-400"
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-yellow-800">{item.nome}</h3>
                    <p className="text-yellow-700 font-bold text-lg">R$ {item.preco.toFixed(2)}</p>
                  </div>

                  {/* Controles de Quantidade */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                      className="bg-yellow-100 text-yellow-700 p-1 rounded-full hover:bg-yellow-200 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-lg font-semibold text-yellow-800 w-8 text-center">
                      {item.quantidade}
                    </span>
                    <button
                      onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                      className="bg-yellow-100 text-yellow-700 p-1 rounded-full hover:bg-yellow-200 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Subtotal e Remover */}
                  <div className="text-right">
                    <p className="text-lg font-bold text-yellow-700 mb-2">
                      R$ {(item.preco * item.quantidade).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removerItem(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <div className="bg-yellow-50 border border-yellow-300 rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-yellow-700 mb-6">Resumo do Pedido</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-yellow-800">
                  <span>Subtotal:</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-yellow-800">
                  <span>Frete:</span>
                  <span>Grátis</span>
                </div>
                <hr className="border-yellow-300" />
                <div className="flex justify-between text-xl font-bold text-yellow-700">
                  <span>Total:</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-yellow-400 text-white font-semibold py-3 rounded-full hover:bg-yellow-500 transition-colors mb-4">
                Finalizar Compra
              </button>

              <button
                onClick={limparCarrinho}
                className="w-full bg-white border border-red-400 text-red-700 font-semibold py-3 rounded-full hover:bg-red-50 transition-colors mb-4"
              >
                Limpar Carrinho
              </button>
              
              <button
                onClick={() => navigate("/")}
                className="w-full bg-white border border-yellow-400 text-yellow-700 font-semibold py-3 rounded-full hover:bg-yellow-100 transition-colors"
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}