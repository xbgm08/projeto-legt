import api from './api';

export const fetchVisitas = async () => {
  const response = await api.get('/visitas');
  return response.data;
};

export const createVisita = async (visita) => {
  const response = await api.post('/visitas', visita);
  return response.data;
};

export const updateVisita = async (id, visita) => {
  const response = await api.put(`/visitas/${id}`, visita);
  return response.data;
};

export const deleteVisita = async (id) => {
  await api.delete(`/visitas/${id}`);
};