
import DefaultLayout from "./layouts/DefaultLayout";
import Navbar from "./components/Navbar/Navbar.tsx";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Home from "./pages/Home.tsx";
import Search from "./pages/Search.tsx";
import Product from "./pages/Product.tsx";
import Cart from "./pages/Cart.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import CategoryPage from "./pages/CategoryPage.tsx";


function App() {
  return (


    <DefaultLayout>

      <Navbar></Navbar>
      
  
      <Routes>
              <Route path="/" element={<Home/>}></Route>
              <Route path="/about" element={<About />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path ="/Search" element={<Search/>}></Route>
              <Route path ="/Product" element={<Product/>}></Route>
              <Route path="/carrinho" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/categoria/:slug" element={<CategoryPage />} />
          </Routes>
    </DefaultLayout>
  );
}

export default App;
