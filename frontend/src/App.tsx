
import DefaultLayout from "./layouts/DefaultLayout";
import Navbar from "./components/Navbar/Navbar.tsx";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Home from "./pages/Home.tsx";
import OculosEscuros from "./pages/OculosEscuros.tsx";
import Search from "./pages/Search.tsx";


function App() {
  return (


    <DefaultLayout>

      <Navbar></Navbar>
      
  
      <Routes>
              <Route path="/" element={<Home/>}></Route>
              <Route path="/about" element={<About />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path ="/Oculos-Escuros" element={<OculosEscuros/>}></Route>
              <Route path ="/Search" element={<Search/>}></Route>
          </Routes>
    </DefaultLayout>
  );
}

export default App;
