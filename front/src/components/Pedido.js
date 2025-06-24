import React, { useEffect, useState } from 'react';
import {
  fetchPedidos,
  createPedido,
  updatePedido,
  deletePedido,
  fetchPedidoById
} from '../services/pedidoService';
import { fetchProdutos } from '../services/produtoService';

const Pedido = () => {
  const [pedidos, setPedidos] = useState([]);
  const [novoPedido, setNovoPedido] = useState({ data_hora: '', valor_total: '', forma_pagamento: '', quantidade_pessoas: '', observacao: '' });
  const [editando, setEditando] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [itensPedido, setItensPedido] = useState([]);

  const calcularValorTotal = () => {
    return itensPedido.reduce(
      (total, item) => total + (Number(item.quantidade) * Number(item.preco_unitario || 0)),
      0
    );
  };

  useEffect(() => {
    carregarPedidos();
    carregarProdutos();
  }, []);

  useEffect(() => {
    setNovoPedido(novo => ({
      ...novo,
      valor_total: calcularValorTotal()
    }));
  }, [itensPedido]);

  const carregarPedidos = async () => {
    try {
      const data = await fetchPedidos();
      setPedidos(data);
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
    }
  };

  const carregarProdutos = async () => {
    try {
      const data = await fetchProdutos();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  };

  const handleAddItem = () => {
    setItensPedido([...itensPedido, { id_produto: '', quantidade: 1, preco_unitario: 0 }]);
  };

  const handleItemChange = (index, field, value) => {
    const novosItens = [...itensPedido];
    novosItens[index][field] = value;
    if (field === 'id_produto') {
      const prod = produtos.find(p => p.id_produto === Number(value));
      novosItens[index].preco_unitario = prod ? prod.preco : 0;
    }
    setItensPedido(novosItens);
  };

  const handleRemoveItem = (index) => {
    const novosItens = [...itensPedido];
    novosItens.splice(index, 1);
    setItensPedido(novosItens);
  };

  const handleInputChange = (e) => {
    setNovoPedido({ ...novoPedido, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const pedidoPayload = {
        ...novoPedido,
        valor_total: Number(calcularValorTotal()),
        quantidade_pessoas: Number(novoPedido.quantidade_pessoas), // <-- conversão aqui!
        items: itensPedido.map(item => ({
          id_produto: Number(item.id_produto),
          quantidade: Number(item.quantidade),
          preco_unitario: Number(item.preco_unitario)
        }))
      };

      if (editando) {
        console.log("Atualizando pedido:", pedidoPayload);
        await updatePedido(editando, pedidoPayload);
      } else {
        console.log("Criando novo pedido:", pedidoPayload);
        await createPedido(pedidoPayload);
      }

      setNovoPedido({ data_hora: '', valor_total: '', forma_pagamento: '', quantidade_pessoas: '', observacao: '' });
      setEditando(null);
      carregarPedidos();
      carregarProdutos();
      setItensPedido([]);
    } catch (error) {
      console.error("Erro ao salvar pedido:", error);
    }
  };

  const handleEditar = async (pedido) => {
    try {
      const pedidoCompleto = await fetchPedidoById(pedido.id_pedido);
      setNovoPedido({
        data_hora: pedidoCompleto.data_hora,
        valor_total: pedidoCompleto.valor_total,
        forma_pagamento: pedidoCompleto.forma_pagamento,
        quantidade_pessoas: pedidoCompleto.quantidade_pessoas,
        observacao: pedidoCompleto.observacao || ''
      });
      setItensPedido(
        (pedidoCompleto.items || []).map(item => ({
          id_produto: item.id_produto,
          quantidade: item.quantidade,
          preco_unitario: item.preco_unitario
        }))
      );
      setEditando(pedido.id_pedido);
    } catch (error) {
      console.error("Erro ao carregar itens do pedido:", error);
    }
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
          readOnly
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
          name="quantidade_pessoas"
          placeholder="Quantidade de visitantes"
          value={novoPedido.quantidade_pessoas}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="observacao"
          placeholder="Observação dos visitantes"
          value={novoPedido.observacao}
          onChange={handleInputChange}
        />
        <h4>Itens do Pedido</h4>
        {itensPedido.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
            <select
              value={item.id_produto}
              onChange={e => handleItemChange(idx, 'id_produto', e.target.value)}
              required
            >
              <option value="">Selecione o produto</option>
              {produtos.map(prod => (
                <option key={prod.id_produto} value={prod.id_produto}>
                  {prod.nome}
                </option>
              ))}
            </select>
            <input
              type="number"
              min="1"
              value={item.quantidade}
              onChange={e => handleItemChange(idx, 'quantidade', e.target.value)}
              placeholder="Quantidade"
              required
            />
            <input
              type="number"
              value={item.preco_unitario}
              readOnly
              placeholder="Preço Unitário"
            />
            <button type="button" onClick={() => handleRemoveItem(idx)}>Remover</button>
          </div>
        ))}
        <button type="button" onClick={handleAddItem}>Adicionar Item</button>
        <button type="submit">{editando ? 'Atualizar' : 'Adicionar'}</button>
        {editando && (
          <button
            type="button"
            onClick={() => {
              setEditando(null);
              setNovoPedido({ data_hora: '', valor_total: '', forma_pagamento: '', quantidade_pessoas: '', observacao: '' });
              setItensPedido([]);
            }}
          >
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
            <th>Quantidade de visitantes</th>
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
              <td>{Number(pedido.quantidade_pessoas)}</td>
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