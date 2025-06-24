import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Categoria from './components/Categoria';
import Fornecedor from './components/Fornecedor';
import FornecedorCategoria from './components/FornecedorCategoria';
import Produto from './components/Produto';
import Insumo from './components/Insumo';
import Entrada from './components/Entrada';
import SaidaInsumo from './components/SaidaInsumo';
import ProdutoInsumo from './components/ProdutoInsumo';
import Pedido from './components/Pedido';

const Menu = () => (
  <nav style={{ marginBottom: '20px' }}>
    <Link to="/categorias" style={{ marginRight: 10 }}>Categorias</Link>
    <Link to="/fornecedor" style={{ marginRight: 10 }}>Fornecedor</Link>
    <Link to="/produto" style={{ marginRight: 10 }}>Produto</Link>
    <Link to="/insumo" style={{ marginRight: 10 }}>Insumo</Link>
    <Link to="/entrada" style={{ marginRight: 10 }}>Entrada</Link>
    <Link to="/saida-insumo" style={{ marginRight: 10 }}>Saída Insumo</Link>
    <Link to="/produto-insumo" style={{ marginRight: 10 }}>Produto Insumo</Link>
    <Link to="/pedido" style={{ marginRight: 10 }}>Pedido</Link>
  </nav>
);

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
        <Route path="/" exact />
      </Routes>
    </BrowserRouter>
  );
};

export default App;