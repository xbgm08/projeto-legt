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

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    try {
      const data = await getCategorias();
      setCategorias(data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  };

  const handleInputChange = (e) => {
    setNovaCategoria({ ...novaCategoria, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(novaCategoria);
    try {
      console.log()
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
          <input
            type="text"
            name="nome"
            placeholder="Nome da categoria"
            value={novaCategoria.nome}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="descricao"
            placeholder="Descrição (opcional)"
            value={novaCategoria.descricao}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">{editando ? 'Atualizar' : 'Salvar'}</button>
        {editando && (
          <button type="button" onClick={() => { setEditando(null); setNovaCategoria({ nome: '', descricao: '' }); }}>
            Cancelar
          </button>
        )}
      </form>
      <div className="categoria-lista-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {(categorias || []).map(categoria => (
              <tr key={categoria.id_categoria}>
                <td>{categoria.id_categoria}</td>
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
      </div>
    </div>
  );
};

export default Categoria;