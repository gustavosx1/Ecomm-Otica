import { useState } from "react";
import { Menu, X, ShoppingCart, SearchIcon, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../contexts/AuthContext";
import { useCategories } from "../../hooks/useProducts";

import logo from "../Assets/images/logo.jpg";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [termoBusca, setTermoBusca] = useState("");
  const navigate = useNavigate();
  const { totalItens } = useCart();
  const { user, signOut } = useAuth();
  const { categories } = useCategories();

  const handleSearch = () => {
    if (termoBusca.trim()) {
      navigate("/Search", { state: { termoBusca } });
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  }

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
          <div className="max-w-5x2 mx-auto px-4 flex items-center justify-between h-20">
              {/* Logo */}
              <Link to="/" className="flex items-center justify-start space-x-2 flex-shrink-0">
                <img src={logo} alt="logo" className="h-16 w-auto object-contain" />
              </Link>

              {/* Botão Mobile */}
              <button
                  onClick={() => setOpen(!open)}
                  className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                  {open ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Links Desktop */}
              <div className="flex-1 flex justify-center">
              <ul className="hidden md:flex space-x-12 font-extralight text-gray-700 ">
                <div className="hidden md:flex items-center space-x-2">
                  {/*Barra de Pesquisa*/}
                    <input
                      type="text"
                      placeholder="Buscar produto..."
                      className="border border-yellow-300 rounded-full px-4 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      value={(termoBusca)}
                      onChange={e => setTermoBusca(e.target.value)}
                    />
                    <button className="ml-2" onClick={() => handleSearch()}>
                      <SearchIcon size={25} className="text-gray-700 hover:text-amber-600 transition-colors duration-200" />
                    </button>
                  </div>
                  {/*Resto da Navbar*/}
                  <li><Link to="/" className="hover:text-amber-600">Página Principal</Link></li>
                  
                  {/* Categorias dinâmicas */}
                  {categories.slice(0, 4).map(category => (
                    <li key={category.id}>
                      <Link to={`/categoria/${category.slug}`} className="hover:text-amber-600 capitalize">
                        {category.name}
                      </Link>
                    </li>
                  ))}
                  
                  <li><Link to="/Contact" className="hover:text-amber-600">Contato</Link></li>
                  <li><Link to="/About" className="hover:text-amber-600">Sobre</Link></li>

              </ul>
              </div>

            {/* Ícone do Carrinho e Auth */}
            <div className="flex items-center justify-end flex-shrink-0 space-x-4">
          
          {/* Auth buttons */}
          {user ? (
            <div className="flex items-center space-x-4">
              {/* Informações do usuário */}
              <div className="hidden md:flex items-center space-x-2">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium text-gray-800">
                    {user.user_metadata?.full_name || user.email?.split('@')[0]}
                  </span>
                  <span className="text-xs text-gray-500">
                    {user.email}
                  </span>
                </div>
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
              </div>

              {/* Botão de logout */}
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-red-50"
              >
                <LogOut size={20} />
                <span className="hidden md:block">Sair</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center space-x-1 text-white bg-yellow-500 hover:bg-yellow-600 transition-colors duration-200 px-4 py-2 rounded-lg font-medium"
            >
              <User size={20} />
              <span className="hidden md:block">Entrar</span>
            </Link>
          )}

          <Link to="/carrinho" className="relative">
            <ShoppingCart size={32} className="text-gray-700 hover:text-amber-600 transition-colors duration-200" />
            {totalItens > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItens}
              </span>
            )}
          </Link>


          {/* Botão Mobile */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 ml-2 text-gray-700"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        </div>


          {/* Menu Mobile */}
          {open && (
              <div className="md:hidden bg-white border-t shadow-md">
                  <ul className="flex flex-col p-4 space-y-4 font-medium text-gray-700">
                    <li><Link to="/" className="hover:text-amber-600"><SearchIcon size={25} className="text-gray-700 hover:text-amber-600 transition-colors duration-200" /></Link></li>
                <li><Link to="/" className="hover:text-amber-600">Página Principal</Link></li>
                <li><a href="#masculino" className="hover:text-amber-600">Masculino</a></li>
                <li><a href="#feminino" className="hover:text-amber-600">Feminino</a></li>
                <li><a href="#infantil" className="hover:text-amber-600">Infantil</a></li>
                <li><a href="/Oculos-Escuros" className="hover:text-amber-600">Óculos Escuros</a></li>
                <li><Link to="/Contact" className="hover:text-amber-600">Contato</Link></li>
                <li><Link to="/About" className="hover:text-amber-600">Sobre</Link></li>
                  </ul>
                
          
              

    
                


              </div>
          )}

          
      </nav>
  );
}