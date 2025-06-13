import React, { useEffect, useState } from 'react';
import {
  fetchFornecedores,
  createFornecedor,
  updateFornecedor,
  deleteFornecedor,
} from '../services/fornecedorService';

const Fornecedor = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [novoFornecedor, setNovoFornecedor] = useState({ nome: '', contato: '', porte: '', cnpj: '', canal_compra: '', observacao: '' });
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    carregarFornecedores();
  }, []);

  const carregarFornecedores = async () => {
    try {
      const data = await fetchFornecedores();
      setFornecedores(data);
    } catch (error) {
      console.error("Erro ao carregar fornecedores:", error);
    }
  };

  const handleInputChange = (e) => {
    setNovoFornecedor({ ...novoFornecedor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await updateFornecedor(editando, novoFornecedor);
      } else {
        await createFornecedor(novoFornecedor);
      }
      setNovoFornecedor({ nome: '', contato: '', porte: '', cnpj: '', canal_compra: '', observacao: '' });
      setEditando(null);
      carregarFornecedores();
    } catch (error) {
      console.error("Erro ao salvar fornecedor:", error);
    }
  };

  const handleEditar = (fornecedor) => {
    setNovoFornecedor({
      nome: fornecedor.nome,
      contato: fornecedor.contato,
      porte: fornecedor.porte,
      cnpj: fornecedor.cnpj,
      canal_compra: fornecedor.canal_compra,
      observacao: fornecedor.observacao,
    });
    setEditando(fornecedor.id_fornecedor);
  };

  const handleExcluir = async (id) => {
    if (window.confirm('Deseja realmente excluir este fornecedor?')) {
      try {
        await deleteFornecedor(id);
        carregarFornecedores();
      } catch (error) {
        console.error("Erro ao excluir fornecedor:", error);
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Fornecedores</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={novoFornecedor.nome}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="contato"
          placeholder="Contato"
          value={novoFornecedor.contato}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="porte"
          placeholder="Porte"
          value={novoFornecedor.porte}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="cnpj"
          placeholder="CNPJ"
          value={novoFornecedor.cnpj}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="canal_compra"
          placeholder="Canal de Compra"
          value={novoFornecedor.canal_compra}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="observacao"
          placeholder="Observação"
          value={novoFornecedor.observacao}
          onChange={handleInputChange}
        />
        <button type="submit">{editando ? 'Atualizar' : 'Adicionar'}</button>
        {editando && (
          <button type="button" onClick={() => { setEditando(null); setNovoFornecedor({ nome: '', contato: '', porte: '', cnpj: '', canal_compra: '', observacao: '' }); }}>
            Cancelar
          </button>
        )}
      </form>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Contato</th>
            <th>Porte</th>
            <th>CNPJ</th>
            <th>Canal de Compra</th>
            <th>Observação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.map(fornecedor => (
            <tr key={fornecedor.id_fornecedor}>
              <td>{fornecedor.id_fornecedor}</td>
              <td>{fornecedor.nome}</td>
              <td>{fornecedor.contato}</td>
              <td>{fornecedor.porte}</td>
              <td>{fornecedor.cnpj}</td>
              <td>{fornecedor.canal_compra}</td>
              <td>{fornecedor.observacao}</td>
              <td>
                <button onClick={() => handleEditar(fornecedor)}>Editar</button>
                <button onClick={() => handleExcluir(fornecedor.id_fornecedor)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Fornecedor;