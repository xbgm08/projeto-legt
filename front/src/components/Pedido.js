import React, { useEffect, useState } from 'react';
import {
  fetchPedidos,
  createPedido,
  updatePedido,
  deletePedido,
} from '../services/pedidoService';

const Pedido = () => {
  const [pedidos, setPedidos] = useState([]);
  const [novoPedido, setNovoPedido] = useState({ data_hora: '', valor_total: '', forma_pagamento: '', id_visita: '' });
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    carregarPedidos();
  }, []);

  const carregarPedidos = async () => {
    try {
      const data = await fetchPedidos();
      setPedidos(data);
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
    }
  };

  const handleInputChange = (e) => {
    setNovoPedido({ ...novoPedido, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await updatePedido(editando, novoPedido);
      } else {
        await createPedido(novoPedido);
      }
      setNovoPedido({ data_hora: '', valor_total: '', forma_pagamento: '', id_visita: '' });
      setEditando(null);
      carregarPedidos();
    } catch (error) {
      console.error("Erro ao salvar pedido:", error);
    }
  };

  const handleEditar = (pedido) => {
    setNovoPedido({
      data_hora: pedido.data_hora,
      valor_total: pedido.valor_total,
      forma_pagamento: pedido.forma_pagamento,
      id_visita: pedido.id_visita,
    });
    setEditando(pedido.id_pedido);
  };

  const handleExcluir = async (id) => {
    if (window.confirm('Deseja realmente excluir este pedido?')) {
      try {
        await deletePedido(id);
        carregarPedidos();
      } catch (error) {
        console.error("Erro ao excluir pedido:", error);
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Pedidos</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="datetime-local"
          name="data_hora"
          placeholder="Data e Hora"
          value={novoPedido.data_hora}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="valor_total"
          placeholder="Valor Total"
          value={novoPedido.valor_total}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="forma_pagamento"
          placeholder="Forma de Pagamento"
          value={novoPedido.forma_pagamento}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="id_visita"
          placeholder="ID da Visita"
          value={novoPedido.id_visita}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{editando ? 'Atualizar' : 'Adicionar'}</button>
        {editando && (
          <button type="button" onClick={() => { setEditando(null); setNovoPedido({ data_hora: '', valor_total: '', forma_pagamento: '', id_visita: '' }); }}>
            Cancelar
          </button>
        )}
      </form>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Data/Hora</th>
            <th>Valor Total</th>
            <th>Forma de Pagamento</th>
            <th>ID Visita</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map(pedido => (
            <tr key={pedido.id_pedido}>
              <td>{pedido.id_pedido}</td>
              <td>{new Date(pedido.data_hora).toLocaleString()}</td>
              <td>R$ {Number(pedido.valor_total).toFixed(2)}</td>
              <td>{pedido.forma_pagamento}</td>
              <td>{pedido.id_visita}</td>
              <td>
                <button onClick={() => handleEditar(pedido)}>Editar</button>
                <button onClick={() => handleExcluir(pedido.id_pedido)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pedido;