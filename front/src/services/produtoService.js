import api from './api';

export const fetchProdutos = async () => {
  const response = await api.get('/produtos');
  return response.data;
};

export const createProduto = async (produto) => {
  const response = await api.post('/produtos', produto);
  return response.data;
};

export const updateProduto = async (id, produto) => {
  const response = await api.put(`/produtos/${id}`, produto);
  return response.data;
};

export const deleteProduto = async (id) => {
  await api.delete(`/produtos/${id}`);
};