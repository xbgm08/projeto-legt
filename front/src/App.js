import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Categoria from './components/Categoria';
import Fornecedor from './components/Fornecedor';
import FornecedorCategoria from './components/FornecedorCategoria';
import Produto from './components/Produto';
import Insumo from './components/Insumo';
import Entrada from './components/Entrada';
import SaidaInsumo from './components/SaidaInsumo';
import ProdutoInsumo from './components/ProdutoInsumo';
import Pedido from './components/Pedido';

const App = () => {
  return (
    <BrowserRouter>
      <h1>Bem-vindo ao Sistema LEGT</h1>
        <Routes>
          <Route path="/categorias" element={<Categoria />} />
          <Route path="/fornecedor" element={<Fornecedor/>} />
          <Route path="/fornecedor-categoria" element={<FornecedorCategoria/>} />
          <Route path="/produto" element={<Produto/>} />
          <Route path="/insumo" element={<Insumo/>} />
          <Route path="/entrada" element={<Entrada/>} />
          <Route path="/saida-insumo" element={<SaidaInsumo/>} />
          <Route path="/produto-insumo" element={<ProdutoInsumo/>} />
          <Route path="/pedido" element={<Pedido/>} />
          <Route path="/" exact />
        </Routes>
    </BrowserRouter>
  );
};

export default App;