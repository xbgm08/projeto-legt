import api from './api';

export const fetchEntries = async () => {
  const response = await api.get('/entradas');
  return response.data;
};

export const createEntry = async (entryData) => {
  const response = await api.post('/entradas', entryData);
  return response.data;
};

export const updateEntry = async (entryId, entryData) => {
  const response = await api.put(`/entradas/${entryId}`, entryData);
  return response.data;
};

export const deleteEntry = async (entryId) => {
  const response = await api.delete(`/entradas/${entryId}`);
  return response.data;
};