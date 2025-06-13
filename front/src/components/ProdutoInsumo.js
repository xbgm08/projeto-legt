import React, { useEffect, useState } from 'react';
import {
  fetchProdutoInsumo,
  createProdutoInsumo,
  updateProdutoInsumo,
  deleteProdutoInsumo,
} from '../services/produtoInsumoService';

const ProdutoInsumo = () => {
  const [produtosInsumos, setProdutosInsumos] = useState([]);
  const [novo, setNovo] = useState({ id_produto: '', id_insumo: '', quantidade_utilizada: '' });
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    carregarProdutoInsumo();
  }, []);

  const carregarProdutoInsumo = async () => {
    try {
      const data = await fetchProdutoInsumo();
      setProdutosInsumos(data);
    } catch (error) {
      console.error(error.message);
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
    <div style={{ padding: '20px' }}>
      <h2>Relação entre Produtos e Insumos</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="number"
          name="id_produto"
          placeholder="ID Produto"
          value={novo.id_produto}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="id_insumo"
          placeholder="ID Insumo"
          value={novo.id_insumo}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="quantidade_utilizada"
          placeholder="Quantidade Utilizada"
          value={novo.quantidade_utilizada}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{editando ? 'Atualizar' : 'Adicionar'}</button>
        {editando && (
          <button type="button" onClick={() => { setEditando(null); setNovo({ id_produto: '', id_insumo: '', quantidade_utilizada: '' }); }}>
            Cancelar
          </button>
        )}
      </form>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>ID Produto</th>
            <th>ID Insumo</th>
            <th>Quantidade Utilizada</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtosInsumos.map(item => (
            <tr key={`${item.id_produto}-${item.id_insumo}`}>
              <td>{item.id_produto}</td>
              <td>{item.id_insumo}</td>
              <td>{item.quantidade_utilizada || item.quantidade}</td>
              <td>
                <button onClick={() => handleEditar(item)}>Editar</button>
                <button onClick={() => handleExcluir(item.id_produto, item.id_insumo)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProdutoInsumo;