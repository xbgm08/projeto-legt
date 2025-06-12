import api from './api';

export const fetchInsumos = async () => {
  const response = await api.get('/insumos');
  return response.data;
};

export const createInsumo = async (insumo) => {
  const response = await api.post('/insumos', insumo);
  return response.data;
};

export const updateInsumo = async (id, insumo) => {
  const response = await api.put(`/insumos/${id}`, insumo);
  return response.data;
};

export const deleteInsumo = async (id) => {
  await api.delete(`/insumos/${id}`);
};