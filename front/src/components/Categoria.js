import React, { useEffect, useState } from 'react';
import {
  getCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} from '../services/categoriaService';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../styles/Categoria.css';

const Categoria = () => {
  const [categorias, setCategorias] = useState([]);
  const [novaCategoria, setNovaCategoria] = useState({ nome: '', descricao: '' });
  const [editando, setEditando] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    setLoading(true);
    try {
      const data = await getCategorias();
      setCategorias(data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setNovaCategoria({ ...novaCategoria, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(novaCategoria);
    try {
      if (editando) {
        await updateCategoria(editando, novaCategoria);
      } else {
        await createCategoria(novaCategoria);
      }
      setNovaCategoria({ nome: '', descricao: '' });
      setEditando(null);
      loadCategorias();
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
    }
  };

  const handleEditar = (categoria) => {
    setNovaCategoria({ nome: categoria.nome, descricao: categoria.descricao });
    setEditando(categoria.id_categoria);
  };

  const handleExcluir = async (id) => {
    if (window.confirm('Deseja realmente excluir esta categoria?')) {
      try {
        await deleteCategoria(id);
        loadCategorias();
      } catch (error) {
        console.error("Erro ao excluir categoria:", error);
      }
    }
  };

  return (
    <div className="categoria">
      <h2>Categorias</h2>
      <form onSubmit={handleSubmit}>
        <div className="categoria-form-row">
          <label>
            Nome
            <input
              type="text"
              name="nome"
              placeholder="Digite o nome da categoria"
              value={novaCategoria.nome}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Descrição
            <input
              type="text"
              name="descricao"
              placeholder="Ex: Categoria para produtos alimentícios"
              value={novaCategoria.descricao}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button type="submit">{editando ? 'Atualizar' : 'Salvar'}</button>
        {editando && (
          <button type="button" onClick={() => { setEditando(null); setNovaCategoria({ nome: '', descricao: '' }); }}>
            Cancelar
          </button>
        )}
      </form>
      <div className="categoria-lista-container">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <span className="spinner" />
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {(categorias || []).map(categoria => (
                <tr key={categoria.id_categoria}>
                  <td>{categoria.nome}</td>
                  <td>{categoria.descricao}</td>
                  <td>
                    <button className="btn-acao editar" onClick={() => handleEditar(categoria)} title="Editar">
                      <FaEdit />
                    </button>
                    <button className="btn-acao excluir" onClick={() => handleExcluir(categoria.id_categoria)} title="Excluir">
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

export default Categoria;