import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import type { Produto } from "../types/product";
import { useCart } from "../hooks/useCart";

export default function Product() {
  const location = useLocation();
  const navigate = useNavigate();
  const produto = location.state as Produto | undefined;
  const { adicionarItem } = useCart();
  const [quantidade, setQuantidade] = useState(1);
  const [mensagem, setMensagem] = useState("");
  const imagemPrincipal =
    produto?.imagem ??
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80";

  const precoFormatado = produto
    ? produto.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    : "";

  const valorParcela = produto
    ? (produto.preco / 10).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      })
    : "";

  const beneficios = produto
    ? [
        `Design ${produto.categoria_nome?.toLowerCase() ?? "exclusivo"} pensado para combinar com qualquer estilo.`,
        `Acabamento premium que valoriza cada detalhe de ${produto.nome}.`,
        "Garantia de origem e procedência verificada pela nossa equipe.",
        "Envio rápido para todo o Brasil com embalagem segura.",
        "Assistência especializada sempre que você precisar.",
      ]
    : [];

  const miniaturas = (produto?.imagem ? [produto.imagem] : []).concat([
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1524781289445-ddf92be80875?auto=format&fit=crop&w=300&q=80",
  ]);
  
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
    <div className="bg-[#f3f3f3] min-h-screen py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        

        <div className="mt-6 grid gap-8 lg:grid-cols-[2fr_3fr_2fr]">
          <section className="bg-white rounded-lg shadow-sm p-6">
            <div className="border border-gray-200 rounded-lg h-[420px] flex items-center justify-center bg-white">
              <img
                src={imagemPrincipal}
                alt={produto.nome}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="mt-6 grid grid-cols-4 gap-3">
              {miniaturas.map((imagem, index) => (
                <div
                  key={`${imagem}-${index}`}
                  className="border border-gray-200 rounded-lg p-2 h-20 w-full flex items-center justify-center hover:border-yellow-500 transition-colors"
                >
                  <img src={imagem} alt={`Prévia ${index + 1}`} className="h-full object-cover rounded" />
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            <div>
              <span className="text-sm text-blue-600 font-semibold">Visite a loja oficial</span>
              <h1 className="text-3xl font-semibold text-gray-900 mt-2 leading-tight">{produto.nome}</h1>
              <p className="text-sm text-gray-500 mt-1">Categoria: {produto.categoria_nome || "Coleção exclusiva"}</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="text-yellow-500 text-lg">★★★★★</div>
                <button className="text-sm text-blue-600 hover:text-blue-500">Ver avaliações</button>
              </div>
            </div>

            <div className="border-y border-gray-200 py-4 space-y-1">
              <p className="text-sm text-gray-700">
                Preço: <span className="text-2xl text-[#B12704] font-semibold">{precoFormatado}</span>
              </p>
              <p className="text-sm text-gray-600">Em até 10x de {valorParcela} sem juros</p>
              <p className="text-sm text-green-600 font-medium">Frete grátis para clientes no Renascença e Turu</p>
            </div>

            <div className="space-y-3 text-sm text-gray-700">
              <p>
                Envio rápido por <span className="font-medium">Amazon Logística</span>. Receba entre
                <span className="font-medium"> amanhã </span>e
                <span className="font-medium"> sexta-feira </span>com entrega expressa.
              </p>
              <p>
                Vendido e entregue por <span className="font-medium">Ótica São Luís</span>. Nota fiscal e garantia legal de 90 dias.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Sobre este item</h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                {beneficios.map((beneficio, index) => (
                  <li key={index}>{beneficio}</li>
                ))}
              </ul>
            </div>
          </section>

          <aside className="bg-white rounded-lg shadow-sm p-6 h-fit space-y-4">
            <div className="border-b border-gray-200 pb-4 space-y-2">
              <p className="text-3xl font-semibold text-[#B12704] leading-none">{precoFormatado}</p>
              <p className="text-sm text-gray-600">{valorParcela} em até 10x sem juros</p>
              <p className="text-sm text-green-600 font-semibold">Em estoque</p>
            </div>

            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <label htmlFor="quantidade" className="font-medium">Quantidade</label>
                <select
                  id="quantidade"
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  value={quantidade}
                  onChange={(e) => setQuantidade(Number(e.target.value))}
                >
                  {Array.from({ length: 10 }).map((_, index) => (
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>

              <p>
                Entrega <span className="font-semibold">GRÁTIS</span>: Receba entre <span className="font-semibold">23 e 25 de outubro</span>.
              </p>
              <p>
                Enviado de <span className="font-semibold">Amazon Fulfillment</span>.
              </p>
            </div>

            {mensagem && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-md text-sm">
                {mensagem}
              </div>
            )}

            <button 
              onClick={() => {
                adicionarItem(produto, quantidade);
                setMensagem(`${quantidade} ${quantidade === 1 ? 'item adicionado' : 'itens adicionados'} ao carrinho!`);
                setTimeout(() => setMensagem(""), 3000);
              }}
              className="w-full bg-[#ffd814] hover:bg-[#f7ca00] transition-colors text-gray-900 font-medium py-2 rounded-full flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} />
              Adicionar ao carrinho
            </button>
            <button 
              onClick={() => {
                adicionarItem(produto, quantidade);
                navigate("/carrinho");
              }}
              className="w-full bg-[#ffa41c] hover:bg-[#fa8900] transition-colors text-white font-medium py-2 rounded-full"
            >
              Comprar agora
            </button>

            <div className="text-xs text-gray-500 leading-relaxed">
              Transação segura. Selecione o endereço de entrega ao finalizar a compra. Política de devolução em até 30 dias após o recebimento.
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}