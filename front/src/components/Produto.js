import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchProdutos } from '../services/produtoService';

const Produto = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const loadProdutos = async () => {
      try {
        const response = await fetchProdutos();
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };

    loadProdutos();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Produtos</h2>
      <button onClick={() => alert('Abrir formulário de novo produto')}>+ Adicionar Produto</button>

      <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Unidade</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(produto => (
            <tr key={produto.id_produto}>
              <td>{produto.id_produto}</td>
              <td>{produto.nome}</td>
              <td>{produto.categoria_nome}</td>
              <td>R$ {produto.preco.toFixed(2)}</td>
              <td>{produto.quantidade_estoque}</td>
              <td>{produto.unidade_medida}</td>
              <td>{produto.status ? 'Ativo' : 'Inativo'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Produto;