import api from './api';

export const fetchProdutoInsumo = async () => {
  try {
    const response = await api.get('/produtos-insumo');
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar produto-insumo: ' + error.message);
  }
};

export const createProdutoInsumo = async (produtoInsumo) => {
  try {
    const response = await api.post('/produtos-insumo', produtoInsumo);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar produto-insumo: ' + error.message);
  }
};

export const updateProdutoInsumo = async (id, produtoInsumo) => {
  try {
    const response = await api.put(`/produtos-insumo/${id}`, produtoInsumo);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao atualizar produto-insumo: ' + error.message);
  }
};

export const deleteProdutoInsumo = async (id) => {
  try {
    await api.delete(`/produtos-insumo/${id}`);
  } catch (error) {
    throw new Error('Erro ao deletar produto-insumo: ' + error.message);
  }
};