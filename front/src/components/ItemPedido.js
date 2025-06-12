import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ItemPedido = () => {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    // Substituir pela URL real da sua API
    axios.get('http://localhost:8000/item-pedido')
      .then(response => setItens(response.data))
      .catch(error => console.error("Erro ao carregar itens do pedido:", error));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Itens do Pedido</h2>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Preço</th>
          </tr>
        </thead>
        <tbody>
          {itens.map(item => (
            <tr key={item.id_item}>
              <td>{item.id_item}</td>
              <td>{item.produto_nome}</td>
              <td>{item.quantidade}</td>
              <td>R$ {item.preco.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemPedido;