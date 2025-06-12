import api from './api';

export const fetchSaidaInsumo = async () => {
  const response = await api.get('/saida-insumo');
  return response.data;
};

export const createSaidaInsumo = async (saidaInsumoData) => {
  const response = await api.post('/saida-insumo', saidaInsumoData);
  return response.data;
};

export const updateSaidaInsumo = async (id, saidaInsumoData) => {
  const response = await api.put(`/saida-insumo/${id}`, saidaInsumoData);
  return response.data;
};

export const deleteSaidaInsumo = async (id) => {
  const response = await api.delete(`/saida-insumo/${id}`);
  return response.data;
};