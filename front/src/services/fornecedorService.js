import api from './api';

export const fetchFornecedores = async () => {
  const response = await api.get('/fornecedores');
  return response.data;
};

export const createFornecedor = async (fornecedor) => {
  const response = await api.post('/fornecedores', fornecedor);
  return response.data;
};

export const updateFornecedor = async (id, fornecedor) => {
  const response = await api.put(`/fornecedores/${id}`, fornecedor);
  return response.data;
};

export const deleteFornecedor = async (id) => {
  await api.delete(`/fornecedores/${id}`);
};