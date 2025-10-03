export default function Home() {
  // Exemplo de produtos estáticos
  const produtos = [
    {
      id: 1,
      nome: "Óculos Dourado Clássico",
      preco: 299.99,
      imagem: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      nome: "Óculos Branco Moderno",
      preco: 349.99,
      imagem: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      nome: "Óculos Dourado Elegante",
      preco: 399.99,
      imagem: "https://images.unsplash.com/photo-1526178613658-3f1622045544?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-white py-8">
      {/* Título */}
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
        {produtos.map(produto => (
          <div
            key={produto.id}
            className="bg-white border border-yellow-300 rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={produto.imagem}
              alt={produto.nome}
              className="h-40 w-40 object-cover rounded-lg mb-4 border-4 border-yellow-400"
            />
            <h3 className="text-xl font-semibold text-yellow-800 mb-2">{produto.nome}</h3>
            <p className="text-yellow-700 font-bold text-lg mb-4">R$ {produto.preco.toFixed(2)}</p>
            <button className="bg-yellow-400 text-white font-semibold px-6 py-2 rounded-full hover:bg-yellow-500 transition-colors">
              Comprar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}