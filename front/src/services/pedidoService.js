import api from './api';

export const fetchPedidos = async () => {
  const response = await api.get('/pedidos');
  return response.data;
};

export const fetchPedidoById = async (id) => {
  const response = await api.get(`/pedidos/${id}`);
  return response.data;
};

export const createPedido = async (pedido) => {
  const response = await api.post('/pedidos', pedido);
  return response.data;
};

export const updatePedido = async (id, pedido) => {
  const response = await api.put(`/pedidos/${id}`, pedido);
  return response.data;
};

export const deletePedido = async (id) => {
  await api.delete(`/pedidos/${id}`);
};