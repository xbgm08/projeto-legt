import React, { useEffect, useState } from 'react';
import {
  fetchEntries,
  createEntry,
  updateEntry,
  deleteEntry,
} from '../services/entradaService';
import { fetchProdutos } from '../services/produtoService';
import { fetchInsumos } from '../services/insumoService';
import { fetchFornecedores } from '../services/fornecedorService';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../styles/Entrada.css';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Entrada = () => {
  const [entradas, setEntradas] = useState([]);
  const [newEntrada, setNewEntrada] = useState({ id_produto: '', id_insumo: '', id_fornecedor: '', quantidade: '', data_entrada: '' });
  const [editando, setEditando] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [insumos, setInsumos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarTudo();
  }, []);

  const carregarTudo = async () => {
    setLoading(true);
    try {
      await Promise.all([
        carregarEntradas(),
        carregarProdutos(),
        carregarInsumos(),
        carregarFornecedores()
      ]);
    } finally {
      setLoading(false);
    }
  };

  const carregarEntradas = async () => {
    try {
      const data = await fetchEntries();
      setEntradas(data);
    } catch (error) {
      console.error("Erro ao carregar entradas:", error);
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

  const carregarFornecedores = async () => {
    try {
      const data = await fetchFornecedores();
      setFornecedores(data);
    } catch (error) {
      console.error("Erro ao carregar fornecedores:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;

    if (name === "id_fornecedor" || name === "id_produto" || name === "id_insumo") {
        parsedValue = value ? parseInt(value) : null;
    } else if (name === "quantidade") {
        parsedValue = parseFloat(value) || "";
    }

    setNewEntrada({ ...newEntrada, [name]: parsedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loadingToastId = toast.loading("Carregando...");
    const temProduto = !!newEntrada.id_produto;
    const temInsumo = !!newEntrada.id_insumo;
    if ((temProduto && temInsumo) || (!temProduto && !temInsumo)) {
      toast.dismiss(loadingToastId);
      toast.error("Selecione apenas um: Produto ou Insumo.");
      return;
    }

    const entradaPayload = {
        ...newEntrada,
        id_produto: Number(newEntrada.id_produto),
        id_insumo:  Number(newEntrada.id_insumo), 
        id_fornecedor:  Number(newEntrada.id_fornecedor), 
        quantidade:  Number(newEntrada.quantidade) || 0,
      };

    try {
      console.log("Salvando entrada:", newEntrada);
      if (editando) {
        await updateEntry(editando, entradaPayload);
      } else {
        await createEntry(entradaPayload);
      }

      toast.dismiss(loadingToastId);
      toast.success("Entrada salva com sucesso!");
      setNewEntrada({ id_produto: '', id_insumo: '', id_fornecedor: '', quantidade: '', data_entrada: '' });
      setEditando(null);
      carregarEntradas();
    } catch (error) {
      toast.dismiss(loadingToastId);
      console.error("Erro ao salvar entrada:", error);
      toast.error("Erro ao salvar entrada.");
    }
  };

  const handleEditar = (entrada) => {
    setNewEntrada({
      id_produto: entrada.id_produto,
      id_insumo: entrada.id_insumo,
      id_fornecedor: entrada.id_fornecedor,
      quantidade: entrada.quantidade,
      data_entrada: entrada.data_entrada ? entrada.data_entrada.slice(0, 10) : '',
    });
    setEditando(entrada.id_entrada);
  };

  const handleExcluir = async (id) => {
    if (window.confirm('Deseja realmente excluir esta entrada?')) {
      try {
        await deleteEntry(id);
        carregarEntradas();
      } catch (error) {
        console.error("Erro ao excluir entrada:", error);
      }
    }
  };

  return (
    <div className="entrada">
      <h2>Registro de Entradas</h2>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <span className="spinner" />
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <div className="entrada-form-row">
              <label>
                Produto
                <select
                  name="id_produto"
                  value={newEntrada.id_produto}
                  onChange={handleInputChange}
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
                  value={newEntrada.id_insumo}
                  onChange={handleInputChange}
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
                Fornecedor
                <select
                  name="id_fornecedor"
                  value={newEntrada.id_fornecedor}
                  onChange={handleInputChange}
                >
                  <option value="">Selecione o fornecedor</option>
                  {fornecedores.map(fornecedor => (
                    <option key={fornecedor.id_fornecedor} value={fornecedor.id_fornecedor}>
                      {fornecedor.nome}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="entrada-form-row">
              <label>
                Quantidade
                <input
                  type="number"
                  name="quantidade"
                  placeholder="Quantidade"
                  value={newEntrada.quantidade}
                  onChange={handleInputChange}
                  required
                  min="0"
                />
              </label>
              <label>
                Data da Entrada
                <input
                  type="date"
                  name="data_entrada"
                  value={newEntrada.data_entrada}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <button type="submit">{editando ? 'Atualizar' : 'Salvar'}</button>
            {editando && (
              <button
                type="button"
                onClick={() => {
                  setEditando(null);
                  setNewEntrada({ id_produto: '', id_insumo: '', id_fornecedor: '', quantidade: '', data_entrada: '' });
                }}
              >
                Cancelar
              </button>
            )}
          </form>
          <div className="entrada-lista-container">
            <table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Insumo</th>
                  <th>Fornecedor</th>
                  <th>Quantidade</th>
                  <th>Data</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {entradas.map(entrada => (
                  <tr key={entrada.id_entrada}>
                    <td>
                      {produtos.find(p => p.id_produto === entrada.id_produto)?.nome || '-'}
                    </td>
                    <td>
                      {insumos.find(i => i.id_insumo === entrada.id_insumo)?.nome || '-'}
                    </td>
                    <td>
                      {fornecedores.find(f => f.id_fornecedor === entrada.id_fornecedor)?.nome || '-'}
                    </td>
                    <td>{entrada.quantidade}</td>
                    <td>{new Date(entrada.data_entrada).toLocaleDateString()}</td>
                    <td className="acoes">
                      <button
                        className="btn-acao editar"
                        onClick={() => handleEditar(entrada)}
                        title="Editar"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn-acao excluir"
                        onClick={() => handleExcluir(entrada.id_entrada)}
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
      <ToastContainer />
    </div>
  );
};

export default Entrada;