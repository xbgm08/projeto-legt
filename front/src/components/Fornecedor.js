import React, { useEffect, useState } from 'react';
import {
  fetchFornecedores,
  createFornecedor,
  updateFornecedor,
  deleteFornecedor,
} from '../services/fornecedorService';
import { FaEdit, FaTrash } from 'react-icons/fa';
import InputMask from 'react-input-mask';
import '../styles/Fornecedor.css';

const Fornecedor = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [novoFornecedor, setNovoFornecedor] = useState({
    nome: '', contato: '', porte: '', cnpj: '', canal_compra: '', observacao: ''
  });
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
    <div className="fornecedor">
      <h2>Fornecedores</h2>
      <form onSubmit={handleSubmit}>
        <div className="fornecedor-form-row">
          <label>
            Nome
            <input
              type="text"
              name="nome"
              placeholder="Digite o nome do fornecedor"
              value={novoFornecedor.nome}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Contato
            <input
              type="text"
              name="contato"
              placeholder="Telefone, e-mail ou responsável"
              value={novoFornecedor.contato}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="fornecedor-form-row">
          <label>
            Porte
            <input
              type="text"
              name="porte"
              placeholder="Ex: Pequeno, Médio, Grande"
              value={novoFornecedor.porte}
              onChange={handleInputChange}
            />
          </label>
          <label>
            CNPJ
            <InputMask
              mask="99.999.999/9999-99"
              value={novoFornecedor.cnpj}
              onChange={handleInputChange}
            >
              {(inputProps) => (
                <input
                  {...inputProps}
                  type="text"
                  name="cnpj"
                  placeholder="00.000.000/0000-00"
                  required
                />
              )}
            </InputMask>
          </label>
        </div>
        <div className="fornecedor-form-row">
          <label>
            Canal de Compra
            <input
              type="text"
              name="canal_compra"
              placeholder="Ex: WhatsApp, site, telefone"
              value={novoFornecedor.canal_compra}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Observação (opcional)
            <input
              type="text"
              name="observacao"
              placeholder="Informações adicionais"
              value={novoFornecedor.observacao}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button type="submit">{editando ? 'Atualizar' : 'Salvar'}</button>
        {editando && (
          <button
            type="button"
            onClick={() => {
              setEditando(null);
              setNovoFornecedor({
                nome: '', contato: '', porte: '', cnpj: '', canal_compra: '', observacao: ''
              });
            }}
          >
            Cancelar
          </button>
        )}
      </form>
      <div className="fornecedor-lista-container">
        <table>
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
                <td className="acoes">
                  <button
                    className="btn-acao editar"
                    onClick={() => handleEditar(fornecedor)}
                    title="Editar"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn-acao excluir"
                    onClick={() => handleExcluir(fornecedor.id_fornecedor)}
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

export default Fornecedor;