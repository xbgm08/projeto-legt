import React, { useEffect, useState } from 'react';
import {
  fetchSaidaInsumo,
  createSaidaInsumo,
  updateSaidaInsumo,
  deleteSaidaInsumo,
} from '../services/saidaInsumoService';
import { fetchInsumos } from '../services/insumoService';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../styles/SaidaInsumo.css';

const SaidaInsumo = () => {
  const [saidas, setSaidas] = useState([]);
  const [novo, setNovo] = useState({ id_insumo: '', quantidade: '', data_saida: '', motivo: '' });
  const [editando, setEditando] = useState(null);
  const [insumos, setInsumos] = useState([]);

  useEffect(() => {
    carregarSaidas();
    carregarInsumos();
  }, []);

  const carregarSaidas = async () => {
    try {
      const data = await fetchSaidaInsumo();
      setSaidas(data);
    } catch (error) {
      console.error("Erro ao carregar saídas de insumos:", error);
    }
  };

  const carregarInsumos = async () => {
    try {
      const data = await fetchInsumos();
      setInsumos(data);
    } catch (error) {
      console.error("Erro ao carregar insumos:", error);
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
      data_saida: saida.data_saida ? saida.data_saida.slice(0, 10) : '',
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
    <div className="saida-insumo">
      <h2>Saídas de Insumos</h2>
      <form onSubmit={handleSubmit}>
        <div className="saida-insumo-form-row">
          <label>
            Insumo
            <select
              name="id_insumo"
              value={novo.id_insumo}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecione o insumo</option>
              {insumos.map(insumo => (
                <option key={insumo.id_insumo} value={insumo.id_insumo}>
                  {insumo.nome}
                </option>
              ))}
            </select>
          </label>
          <label>
            Quantidade
            <input
              type="number"
              name="quantidade"
              placeholder="Quantidade"
              value={novo.quantidade}
              onChange={handleInputChange}
              required
              min="0"
            />
          </label>
        </div>
        <div className="saida-insumo-form-row">
          <label>
            Data da Saída
            <input
              type="date"
              name="data_saida"
              value={novo.data_saida}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Motivo
            <input
              type="text"
              name="motivo"
              placeholder="Motivo da saída"
              value={novo.motivo}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button type="submit">{editando ? 'Atualizar' : 'Adicionar'}</button>
        {editando && (
          <button
            type="button"
            onClick={() => {
              setEditando(null);
              setNovo({ id_insumo: '', quantidade: '', data_saida: '', motivo: '' });
            }}
          >
            Cancelar
          </button>
        )}
      </form>
      <div className="saida-insumo-lista-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Insumo</th>
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
                <td>
                  {insumos.find(i => i.id_insumo === saida.id_insumo)?.nome || saida.id_insumo}
                </td>
                <td>{saida.quantidade}</td>
                <td>{new Date(saida.data_saida).toLocaleDateString()}</td>
                <td>{saida.motivo}</td>
                <td className="acoes">
                  <button
                    className="btn-acao editar"
                    onClick={() => handleEditar(saida)}
                    title="Editar"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn-acao excluir"
                    onClick={() => handleExcluir(saida.id_saida)}
                    title="Excluir"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SaidaInsumo;