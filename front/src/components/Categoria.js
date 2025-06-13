import React, { useEffect, useState } from 'react';
import {
  getCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} from '../services/categoriaService';

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
    <div style={{ padding: '20px' }}>
      <h2>Lista de Categorias</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={novaCategoria.nome}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="descricao"
          placeholder="Descrição"
          value={novaCategoria.descricao}
          onChange={handleInputChange}
        />
        <button type="submit">{editando ? 'Atualizar' : 'Adicionar'}</button>
        {editando && (
          <button type="button" onClick={() => { setEditando(null); setNovaCategoria({ nome: '', descricao: '' }); }}>
            Cancelar
          </button>
        )}
      </form>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: '20px', width: '100%' }}>
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
                <button onClick={() => handleEditar(categoria)}>Editar</button>
                <button onClick={() => handleExcluir(categoria.id_categoria)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categoria;