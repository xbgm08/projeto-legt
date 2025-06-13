import React, { useEffect, useState } from 'react';
import {
  fetchProdutos,
  createProduto,
  updateProduto,
  deleteProduto,
} from '../services/produtoService';

const Produto = () => {
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({
    nome: '',
    descricao: '',
    preco: '',
    quantidade_estoque: '',
    unidade_medida: '',
    id_categoria: '',
    status: true,
  });
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const data = await fetchProdutos();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNovoProduto({
      ...novoProduto,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await updateProduto(editando, novoProduto);
      } else {
        await createProduto(novoProduto);
      }
      setNovoProduto({
        nome: '',
        descricao: '',
        preco: '',
        quantidade_estoque: '',
        unidade_medida: '',
        id_categoria: '',
        status: true,
      });
      setEditando(null);
      carregarProdutos();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
  };

  const handleEditar = (produto) => {
    setNovoProduto({
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      quantidade_estoque: produto.quantidade_estoque,
      unidade_medida: produto.unidade_medida,
      id_categoria: produto.id_categoria,
      status: produto.status,
    });
    setEditando(produto.id_produto);
  };

  const handleExcluir = async (id) => {
    if (window.confirm('Deseja realmente excluir este produto?')) {
      try {
        await deleteProduto(id);
        carregarProdutos();
      } catch (error) {
        console.error("Erro ao excluir produto:", error);
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Produtos</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={novoProduto.nome}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="descricao"
          placeholder="Descrição"
          value={novoProduto.descricao}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="preco"
          placeholder="Preço"
          value={novoProduto.preco}
          onChange={handleInputChange}
          required
          step="0.01"
        />
        <input
          type="number"
          name="quantidade_estoque"
          placeholder="Estoque"
          value={novoProduto.quantidade_estoque}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="unidade_medida"
          placeholder="Unidade"
          value={novoProduto.unidade_medida}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="id_categoria"
          placeholder="ID Categoria"
          value={novoProduto.id_categoria}
          onChange={handleInputChange}
          required
        />
        <label>
          Ativo
          <input
            type="checkbox"
            name="status"
            checked={novoProduto.status}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">{editando ? 'Atualizar' : 'Adicionar'}</button>
        {editando && (
          <button type="button" onClick={() => { setEditando(null); setNovoProduto({ nome: '', descricao: '', preco: '', quantidade_estoque: '', unidade_medida: '', id_categoria: '', status: true }); }}>
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
            <th>Categoria</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Unidade</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(produto => (
            <tr key={produto.id_produto}>
              <td>{produto.id_produto}</td>
              <td>{produto.nome}</td>
              <td>{produto.descricao}</td>
              <td>{produto.id_categoria}</td>
              <td>R$ {Number(produto.preco).toFixed(2)}</td>
              <td>{produto.quantidade_estoque}</td>
              <td>{produto.unidade_medida}</td>
              <td>{produto.status ? 'Ativo' : 'Inativo'}</td>
              <td>
                <button onClick={() => handleEditar(produto)}>Editar</button>
                <button onClick={() => handleExcluir(produto.id_produto)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Produto;