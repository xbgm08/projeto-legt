import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaHome, FaList, FaTruck, FaBoxOpen, FaCubes, FaArrowDown, FaArrowUp, FaLink, FaClipboardList, FaChartBar } from 'react-icons/fa';
import Home from './components/Home';
import Categoria from './components/Categoria';
import Fornecedor from './components/Fornecedor';
import Produto from './components/Produto';
import Insumo from './components/Insumo';
import Entrada from './components/Entrada';
import SaidaInsumo from './components/SaidaInsumo';
import ProdutoInsumo from './components/ProdutoInsumo';
import Pedido from './components/Pedido';
import './styles/Menu.css';

const menuItems = [
  { to: "/", label: "Home", icon: <FaHome /> },
  { to: "/categorias", label: "Categorias", icon: <FaList /> },
  { to: "/fornecedor", label: "Fornecedor", icon: <FaTruck /> },
  { to: "/produto", label: "Produto", icon: <FaBoxOpen /> },
  { to: "/insumo", label: "Insumo", icon: <FaCubes /> },
  { to: "/entrada", label: "Entrada", icon: <FaArrowDown /> },
  { to: "/saida-insumo", label: "Saída Insumo", icon: <FaArrowUp /> },
  { to: "/produto-insumo", label: "Produto Insumo", icon: <FaLink /> },
  { to: "/pedido", label: "Pedido", icon: <FaClipboardList /> },
  //{ to: "https://app.powerbi.com/view?r=eyJrIjoiZTE4NmE1ZGEtYzExZS00MmY0LTliNzktYWQ5YTgzNzA2ZDViIiwidCI6ImNmNzJlMmJkLTdhMmItNDc4My1iZGViLTM5ZDU3YjA3Zjc2ZiIsImMiOjR9", label: "Dashboards", icon: <FaChartBar />, target: "_blank" },
];

const Menu = () => {
  const location = useLocation();
  return (
    <nav className="menu-nav">
      {menuItems.map(item => (
        <Link
          key={item.to}
          to={item.to}
          className={`menu-link${location.pathname === item.to ? ' active' : ''}`}
          target={item.target}
        >
          <span className="menu-icon">{item.icon}</span>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/categorias" element={<Categoria />} />
        <Route path="/fornecedor" element={<Fornecedor />} />
        <Route path="/produto" element={<Produto />} />
        <Route path="/insumo" element={<Insumo />} />
        <Route path="/entrada" element={<Entrada />} />
        <Route path="/saida-insumo" element={<SaidaInsumo />} />
        <Route path="/produto-insumo" element={<ProdutoInsumo />} />
        <Route path="/pedido" element={<Pedido />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;