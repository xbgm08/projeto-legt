import React, { useEffect, useState } from 'react';
import {
  fetchInsumos,
  createInsumo,
  updateInsumo,
  deleteInsumo,
} from '../services/insumoService';

const Insumo = () => {
  const [insumos, setInsumos] = useState([]);
  const [novoInsumo, setNovoInsumo] = useState({ nome: '', quantidade_estoque: '', unidade_medida: '', status: true });
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    carregarInsumos();
  }, []);

  const carregarInsumos = async () => {
    try {
      const data = await fetchInsumos();
      setInsumos(data);
    } catch (error) {
      console.error("Erro ao carregar insumos:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNovoInsumo({
      ...novoInsumo,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await updateInsumo(editando, novoInsumo);
      } else {
        await createInsumo(novoInsumo);
      }
      setNovoInsumo({ nome: '', quantidade_estoque: '', unidade_medida: '', status: true });
      setEditando(null);
      carregarInsumos();
    } catch (error) {
      console.error("Erro ao salvar insumo:", error);
    }
  };

  const handleEditar = (insumo) => {
    setNovoInsumo({
      nome: insumo.nome,
      quantidade_estoque: insumo.quantidade_estoque,
      unidade_medida: insumo.unidade_medida,
      status: insumo.status,
    });
    setEditando(insumo.id_insumo);
  };

  const handleExcluir = async (id) => {
    if (window.confirm('Deseja realmente excluir este insumo?')) {
      try {
        await deleteInsumo(id);
        carregarInsumos();
      } catch (error) {
        console.error("Erro ao excluir insumo:", error);
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Insumos</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={novoInsumo.nome}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="quantidade_estoque"
          placeholder="Quantidade"
          value={novoInsumo.quantidade_estoque}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="unidade_medida"
          placeholder="Unidade"
          value={novoInsumo.unidade_medida}
          onChange={handleInputChange}
          required
        />
        <label>
          Ativo
          <input
            type="checkbox"
            name="status"
            checked={novoInsumo.status}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">{editando ? 'Atualizar' : 'Adicionar'}</button>
        {editando && (
          <button type="button" onClick={() => { setEditando(null); setNovoInsumo({ nome: '', quantidade_estoque: '', unidade_medida: '', status: true }); }}>
            Cancelar
          </button>
        )}
      </form>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Unidade</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {insumos.map(insumo => (
            <tr key={insumo.id_insumo}>
              <td>{insumo.id_insumo}</td>
              <td>{insumo.nome}</td>
              <td>{insumo.quantidade_estoque}</td>
              <td>{insumo.unidade_medida}</td>
              <td>{insumo.status ? 'Ativo' : 'Inativo'}</td>
              <td>
                <button onClick={() => handleEditar(insumo)}>Editar</button>
                <button onClick={() => handleExcluir(insumo.id_insumo)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Insumo;