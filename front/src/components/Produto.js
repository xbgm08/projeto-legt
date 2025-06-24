import React, { useEffect, useState } from 'react';
import {
  fetchProdutos,
  createProduto,
  updateProduto,
  deleteProduto,
} from '../services/produtoService';
import { getCategorias } from '../services/categoriaService';
import '../styles/Produto.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

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
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    carregarProdutos();
    loadCategorias();
  }, []);

  const carregarProdutos = async () => {
    try {
      const data = await fetchProdutos();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  };

  const loadCategorias = async () => {
    try {
      const data = await getCategorias();
      setCategorias(data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
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
    <div className="produto">
      <h2>Produtos</h2>
      <form onSubmit={handleSubmit}>
        <div className="produto-form-row">
          <label>
            Nome
            <input
              type="text"
              name="nome"
              placeholder="Digite o nome do produto"
              value={novoProduto.nome}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Descrição
            <input
              type="text"
              name="descricao"
              placeholder="Ex: Produto alimentício"
              value={novoProduto.descricao}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="produto-form-row">
          <label>
            Preço
            <input
              type="number"
              name="preco"
              placeholder="Ex: 10.00"
              value={novoProduto.preco}
              onChange={handleInputChange}
              required
              step="0.01"
              min="0"
            />
          </label>
          <label>
            Estoque
            <input
              type="number"
              name="quantidade_estoque"
              placeholder="Quantidade em estoque"
              value={novoProduto.quantidade_estoque}
              onChange={handleInputChange}
              required
              min="0"
            />
          </label>
        </div>
        <div className="produto-form-row">
          <label>
            Unidade de Medida
            <input
              type="text"
              name="unidade_medida"
              placeholder="Ex: kg, un, l"
              value={novoProduto.unidade_medida}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Categoria
            <select
              name="id_categoria"
              value={novoProduto.id_categoria}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecione a categoria</option>
              {categorias.map(cat => (
                <option key={cat.id_categoria} value={cat.id_categoria}>
                  {cat.nome}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="produto-form-row">
          <label style={{ maxWidth: 180 }}>
            Ativo
            <input
              type="checkbox"
              name="status"
              checked={novoProduto.status}
              onChange={handleInputChange}
              style={{ width: 20, height: 20, marginTop: 8 }}
            />
          </label>
        </div>
        <button type="submit">{editando ? 'Atualizar' : 'Adicionar'}</button>
        {editando && (
          <button type="button" onClick={() => { setEditando(null); setNovoProduto({ nome: '', descricao: '', preco: '', quantidade_estoque: '', unidade_medida: '', id_categoria: '', status: true }); }}>
            Cancelar
          </button>
        )}
      </form>
      <div className="produto-lista-container">
        <table>
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
                <td>
                  {categorias.find(cat => cat.id_categoria === produto.id_categoria)?.nome || produto.id_categoria}
                </td>
                <td>R$ {Number(produto.preco).toFixed(2)}</td>
                <td>{produto.quantidade_estoque}</td>
                <td>{produto.unidade_medida}</td>
                <td>{produto.status ? 'Ativo' : 'Inativo'}</td>
                <td className="acoes">
                  <button
                    className="btn-acao editar"
                    onClick={() => handleEditar(produto)}
                    title="Editar"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn-acao excluir"
                    onClick={() => handleExcluir(produto.id_produto)}
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

export default Produto;