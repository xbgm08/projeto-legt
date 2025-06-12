import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Pedido = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/pedidos')
      .then(response => setPedidos(response.data))
      .catch(error => console.error("Erro ao carregar pedidos:", error));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Pedidos</h2>
      <button onClick={() => alert('Abrir formulário de novo pedido')}>+ Adicionar Pedido</button>

      <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Data</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map(pedido => (
            <tr key={pedido.id_pedido}>
              <td>{pedido.id_pedido}</td>
              <td>{pedido.cliente_nome}</td>
              <td>{new Date(pedido.data).toLocaleDateString()}</td>
              <td>{pedido.status}</td>
              <td>R$ {pedido.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pedido;