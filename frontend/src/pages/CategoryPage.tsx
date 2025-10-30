import { useParams } from 'react-router-dom';
import { useProductsByCategory } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { ShoppingCart } from 'lucide-react';
import Loading from '../components/Loading/Loading';
import EmptyState from '../components/EmptyState/EmptyState';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { products: produtos, loading, error } = useProductsByCategory(slug || '');
  const { adicionarItem } = useCart();

  // Tela de carregamento
  if (loading) {
    return <Loading message={`Carregando produtos da categoria...`} />;
  }

  // Se houver erro
  if (error) {
    return <EmptyState title="Erro ao carregar produtos" message={error} />;
  }

  // Se não houver produtos após carregar
  if (!loading && produtos.length === 0) {
    return <EmptyState title={`Nenhum produto encontrado na categoria`} />;
  }

  // Capitalizar nome da categoria
  const categoryName = slug?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Produtos';

  return (
    <div className="min-h-screen bg-white py-8">
      {/* Título e Descrição */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-yellow-700 mb-4">
          {categoryName}
        </h1>
        <p className="text-lg text-yellow-900 max-w-2xl mx-auto">
          Descubra nossa coleção de {categoryName.toLowerCase()}.
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
            <h3 className="text-xl font-semibold text-yellow-800 mb-2 text-center">
              {produto.nome}
            </h3>
            {produto.description && (
              <p className="text-yellow-600 text-sm mb-2 text-center">
                {produto.description}
              </p>
            )}
            <p className="text-yellow-700 font-bold text-lg mb-4">
              R$ {produto.preco.toFixed(2)}
            </p>
            {produto.stock !== undefined && produto.stock > 0 && (
              <p className="text-green-600 text-sm mb-4">
                {produto.stock} em estoque
              </p>
            )}
            <button 
              className="bg-yellow-400 text-white font-semibold px-6 py-2 rounded-full hover:bg-yellow-500 transition-colors flex items-center gap-2"
              onClick={() => adicionarItem(produto)}
            >
              <ShoppingCart size={18} />
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}