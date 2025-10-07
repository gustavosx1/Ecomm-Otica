import { useState } from "react";
import { Menu, X, ShoppingCart, SearchIcon} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";



import logo from "../Assets/images/logo.jpg";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [termoBusca, setTermoBusca] = useState("");
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
          <div className="max-w-5x2 mx-auto px-4 flex items-center justify-between h-20">
              {/* Logo */}
              <div className="flex items-center justify-start space-x-2 flex-shrink-0">
                <img src={logo} alt="logo" className="h-16 w-auto object-contain" />
                 
                </div>

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
                      value={termoBusca}
                      onChange={e => setTermoBusca(e.target.value)}
                    />
                    <button className="ml-2" onClick={() =>navigate("/Search", { state: { termoBusca } })}>
                      <SearchIcon size={25} className="text-gray-700 hover:text-amber-600 transition-colors duration-200" />
                    </button>
                  </div>
                  {/*Resto da Navar*/}
                  <li><Link to="/" className="hover:text-amber-600">Home</Link></li>
                <li><a href="#masculino" className="hover:text-amber-600">Masculino</a></li>
                <li><a href="#feminino" className="hover:text-amber-600">Feminino</a></li>
                <li><a href="#infantil" className="hover:text-amber-600">Infantil</a></li>
                <li><a href="/Oculos-Escuros" className="hover:text-amber-600">Óculos Escuros</a></li>
                <li><Link to="/Contact" className="hover:text-amber-600">Contato</Link></li>
                <li><Link to="/About" className="hover:text-amber-600">Sobre</Link></li>

              </ul>
              </div>

            {/* Ícone do Carrinho */}
            <div className="flex items-center justify-end flex-shrink-0">
          <Link to="/carrinho" className="ml-4">
            <ShoppingCart size={32} className="text-gray-700 hover:text-amber-600 transition-colors duration-200" />
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
                <li><Link to="/" className="hover:text-amber-600">Home</Link></li>
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


/*<nav className="flex gap-4 p-4 bg-slate-800 text-white">
        <Link to="/">Home</Link>
        <Link to="/about">Sobre</Link>
        <Link to="/Contact">Contato</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>*/