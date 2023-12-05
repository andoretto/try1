import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStateProvider } from './context/GlobalStateProvider.jsx';
import Registro from "./pages/registro.jsx";
import Home from "./pages/home.jsx";
import Login from "./pages/login.jsx";
import Cliente from "./pages/cliente.jsx";
import Admin from "./pages/Administrador.jsx";



export default function App() {
  return (
  <GlobalStateProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/registro" element={<Registro/>}></Route>
        <Route path="/cliente" element={<Cliente/>}></Route>
        <Route path="/admin" element={<Admin/>}></Route>
      </Routes>
    </Router>
  </GlobalStateProvider>
  )
}

