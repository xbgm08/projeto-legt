import React, { useEffect, useState } from 'react';
import {
  fetchInsumos,
  createInsumo,
  updateInsumo,
  deleteInsumo,
} from '../services/insumoService';
import '../styles/Insumo.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Insumo = () => {
  const [insumos, setInsumos] = useState([]);
  const [novoInsumo, setNovoInsumo] = useState({ nome: '', quantidade_estoque: '', unidade_medida: '', status: true });
  const [editando, setEditando] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarInsumos();
  }, []);

  const carregarInsumos = async () => {
    setLoading(true);
    try {
      const data = await fetchInsumos();
      setInsumos(data);
    } catch (error) {
      console.error("Erro ao carregar insumos:", error);
    }
    setLoading(false);
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
    <div className="insumo">
      <h2>Insumos</h2>
      <form onSubmit={handleSubmit}>
        <div className="insumo-form-row">
          <label>
            Nome
            <input
              type="text"
              name="nome"
              placeholder="Digite o nome do insumo"
              value={novoInsumo.nome}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="insumo-form-row">
          <label>
            Unidade de Medida
            <input
              type="text"
              name="unidade_medida"
              placeholder="Ex: kg, un, l"
              value={novoInsumo.unidade_medida}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Estoque
            <input
              type="number"
              name="quantidade_estoque"
              placeholder="Quantidade em estoque"
              value={novoInsumo.quantidade_estoque}
              onChange={handleInputChange}
              required
              min="0"
            />
          </label>
        </div>
        <div className="insumo-form-row">
          <label style={{ maxWidth: 180 }}>
            Ativo
            <input
              type="checkbox"
              name="status"
              checked={novoInsumo.status}
              onChange={handleInputChange}
              style={{ width: 20, height: 20, marginTop: 8 }}
            />
          </label>
        </div>
        <button type="submit">{editando ? 'Atualizar' : 'Salvar'}</button>
        {editando && (
          <button
            type="button"
            onClick={() => {
              setEditando(null);
              setNovoInsumo({
                nome: '',
                unidade_medida: '',
                quantidade_estoque: '',
                status: true,
              });
            }}
          >
            Cancelar
          </button>
        )}
      </form>
      <div className="insumo-lista-container">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <span className="spinner" />
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Unidade</th>
                <th>Estoque</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {insumos.map(insumo => (
                <tr key={insumo.id_insumo}>
                  <td>{insumo.id_insumo}</td>
                  <td>{insumo.nome}</td>
                  <td>{insumo.unidade_medida}</td>
                  <td>{insumo.quantidade_estoque}</td>
                  <td>{insumo.status ? 'Ativo' : 'Inativo'}</td>
                  <td className="acoes">
                    <button
                      className="btn-acao editar"
                      onClick={() => handleEditar(insumo)}
                      title="Editar"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn-acao excluir"
                      onClick={() => handleExcluir(insumo.id_insumo)}
                      title="Excluir"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Insumo;