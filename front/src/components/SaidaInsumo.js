import React, { useEffect, useState } from 'react';
import {
  fetchSaidaInsumo,
  createSaidaInsumo,
  updateSaidaInsumo,
  deleteSaidaInsumo,
} from '../services/saidaInsumoService';

const SaidaInsumo = () => {
  const [saidas, setSaidas] = useState([]);
  const [novo, setNovo] = useState({ id_insumo: '', quantidade: '', data_saida: '', motivo: '' });
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    carregarSaidas();
  }, []);

  const carregarSaidas = async () => {
    try {
      const data = await fetchSaidaInsumo();
      setSaidas(data);
    } catch (error) {
      console.error("Erro ao carregar saídas de insumos:", error);
    }
  };

  const handleInputChange = (e) => {
    setNovo({ ...novo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await updateSaidaInsumo(editando, novo);
      } else {
        await createSaidaInsumo(novo);
      }
      setNovo({ id_insumo: '', quantidade: '', data_saida: '', motivo: '' });
      setEditando(null);
      carregarSaidas();
    } catch (error) {
      console.error("Erro ao salvar saída de insumo:", error);
    }
  };

  const handleEditar = (saida) => {
    setNovo({
      id_insumo: saida.id_insumo,
      quantidade: saida.quantidade,
      data_saida: saida.data_saida,
      motivo: saida.motivo,
    });
    setEditando(saida.id_saida);
  };

  const handleExcluir = async (id) => {
    if (window.confirm('Deseja realmente excluir esta saída?')) {
      try {
        await deleteSaidaInsumo(id);
        carregarSaidas();
      } catch (error) {
        console.error("Erro ao excluir saída de insumo:", error);
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Saídas de Insumos</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="number"
          name="id_insumo"
          placeholder="ID do Insumo"
          value={novo.id_insumo}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="quantidade"
          placeholder="Quantidade"
          value={novo.quantidade}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="data_saida"
          value={novo.data_saida}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="motivo"
          placeholder="Motivo"
          value={novo.motivo}
          onChange={handleInputChange}
        />
        <button type="submit">{editando ? 'Atualizar' : 'Adicionar'}</button>
        {editando && (
          <button type="button" onClick={() => { setEditando(null); setNovo({ id_insumo: '', quantidade: '', data_saida: '', motivo: '' }); }}>
            Cancelar
          </button>
        )}
      </form>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Insumo</th>
            <th>Quantidade</th>
            <th>Data</th>
            <th>Motivo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {saidas.map(saida => (
            <tr key={saida.id_saida}>
              <td>{saida.id_saida}</td>
              <td>{saida.id_insumo}</td>
              <td>{saida.quantidade}</td>
              <td>{new Date(saida.data_saida).toLocaleDateString()}</td>
              <td>{saida.motivo}</td>
              <td>
                <button onClick={() => handleEditar(saida)}>Editar</button>
                <button onClick={() => handleExcluir(saida.id_saida)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SaidaInsumo;