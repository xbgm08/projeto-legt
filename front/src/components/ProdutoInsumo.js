import React, { useEffect, useState } from 'react';
import {
  fetchProdutoInsumo,
  createProdutoInsumo,
  updateProdutoInsumo,
  deleteProdutoInsumo,
} from '../services/produtoInsumoService';
import { fetchProdutos } from '../services/produtoService';
import { fetchInsumos } from '../services/insumoService';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../styles/ProdutoInsumo.css';

const ProdutoInsumo = () => {
  const [produtosInsumos, setProdutosInsumos] = useState([]);
  const [novo, setNovo] = useState({ id_produto: '', id_insumo: '', quantidade_utilizada: '' });
  const [editando, setEditando] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [insumos, setInsumos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarTudo();
  }, []);

  const carregarTudo = async () => {
    setLoading(true);
    try {
      await Promise.all([
        carregarProdutoInsumo(),
        carregarProdutos(),
        carregarInsumos()
      ]);
    } finally {
      setLoading(false);
    }
  };

  const carregarProdutoInsumo = async () => {
    try {
      const data = await fetchProdutoInsumo();
      setProdutosInsumos(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const carregarProdutos = async () => {
    try {
      const data = await fetchProdutos();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
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
        await updateProdutoInsumo(editando, novo);
      } else {
        await createProdutoInsumo(novo);
      }
      setNovo({ id_produto: '', id_insumo: '', quantidade_utilizada: '' });
      setEditando(null);
      carregarProdutoInsumo();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEditar = (item) => {
    setNovo({
      id_produto: item.id_produto,
      id_insumo: item.id_insumo,
      quantidade_utilizada: item.quantidade_utilizada || item.quantidade,
    });
    setEditando({ id_produto: item.id_produto, id_insumo: item.id_insumo });
  };

  const handleExcluir = async (id_produto, id_insumo) => {
    if (window.confirm('Deseja realmente excluir esta relação?')) {
      try {
        await deleteProdutoInsumo(`${id_produto},${id_insumo}`);
        carregarProdutoInsumo();
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <div className="produto-insumo">
      <h2>Relação entre Produtos e Insumos</h2>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <span className="spinner" />
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="produto-insumo-form">
            <div className="produto-insumo-form-row">
              <label>
                Produto
                <select
                  name="id_produto"
                  value={novo.id_produto}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecione o produto</option>
                  {produtos.map(prod => (
                    <option key={prod.id_produto} value={prod.id_produto}>
                      {prod.nome}
                    </option>
                  ))}
                </select>
              </label>
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
                Quantidade Utilizada
                <input
                  type="number"
                  name="quantidade_utilizada"
                  placeholder="Quantidade utilizada"
                  value={novo.quantidade_utilizada}
                  onChange={handleInputChange}
                  required
                  min="0"
                />
              </label>
            </div>
            <button type="submit">{editando ? 'Atualizar' : 'Salvar'}</button>
            {editando && (
              <button
                type="button"
                onClick={() => {
                  setEditando(null);
                  setNovo({ id_produto: '', id_insumo: '', quantidade_utilizada: '' });
                }}
              >
                Cancelar
              </button>
            )}
          </form>
          <div className="produto-insumo-lista-container">
            <table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Insumo</th>
                  <th>Quantidade Utilizada</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtosInsumos.map(item => (
                  <tr key={`${item.id_produto}-${item.id_insumo}`}>
                    <td>
                      {produtos.find(p => p.id_produto === item.id_produto)?.nome || item.id_produto}
                    </td>
                    <td>
                      {insumos.find(i => i.id_insumo === item.id_insumo)?.nome || item.id_insumo}
                    </td>
                    <td>{item.quantidade_utilizada || item.quantidade}</td>
                    <td className="acoes">
                      <button
                        className="btn-acao editar"
                        onClick={() => handleEditar(item)}
                        title="Editar"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn-acao excluir"
                        onClick={() => handleExcluir(item.id_produto, item.id_insumo)}
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
        </>
      )}
    </div>
  );
};

export default ProdutoInsumo;