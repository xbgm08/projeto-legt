import api from './api';

export const fetchSaidaInsumo = async () => {
  const response = await api.get('/saidas-insumo');
  return response.data;
};

export const createSaidaInsumo = async (saidaInsumoData) => {
  const response = await api.post('/saidas-insumo', saidaInsumoData);
  return response.data;
};

export const updateSaidaInsumo = async (id, saidaInsumoData) => {
  const response = await api.put(`/saidas-insumo/${id}`, saidaInsumoData);
  return response.data;
};

export const deleteSaidaInsumo = async (id) => {
  const response = await api.delete(`/saidas-insumo/${id}`);
  return response.data;
};