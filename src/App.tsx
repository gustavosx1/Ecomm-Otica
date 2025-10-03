
import DefaultLayout from "./layouts/DefaultLayout";
import Navbar from "./components/Navbar/Navbar.tsx";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";

function App() {
  return (


    <DefaultLayout>

      <Navbar></Navbar>
      

      <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/Contact" element={<Contact />} />
          </Routes>
    </DefaultLayout>
  );
}

export default App;
