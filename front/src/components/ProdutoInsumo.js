import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProdutoInsumo = () => {
  const [produtosInsumos, setProdutosInsumos] = useState([]);

  useEffect(() => {
    // Fetch the relationship data between products and inputs
    axios.get('http://localhost:8000/produto-insumo')
      .then(response => setProdutosInsumos(response.data))
      .catch(error => console.error("Erro ao carregar produtos e insumos:", error));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Relação entre Produtos e Insumos</h2>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>ID Produto</th>
            <th>Nome Produto</th>
            <th>ID Insumo</th>
            <th>Nome Insumo</th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {produtosInsumos.map(item => (
            <tr key={`${item.id_produto}-${item.id_insumo}`}>
              <td>{item.id_produto}</td>
              <td>{item.nome_produto}</td>
              <td>{item.id_insumo}</td>
              <td>{item.nome_insumo}</td>
              <td>{item.quantidade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProdutoInsumo;