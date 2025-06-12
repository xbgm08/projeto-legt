import api from './api';

export const getItemsByOrderId = async (orderId) => {
  const response = await api.get(`/pedido/${orderId}/itens`);
  return response.data;
};

export const createItem = async (item) => {
  const response = await api.post('/item-pedido', item);
  return response.data;
};

export const updateItem = async (itemId, item) => {
  const response = await api.put(`/item-pedido/${itemId}`, item);
  return response.data;
};

export const deleteItem = async (itemId) => {
  await api.delete(`/item-pedido/${itemId}`);
};