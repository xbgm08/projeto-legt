import React, { useEffect, useState } from 'react';
import {
  fetchEntries,
  createEntry,
} from '../services/entradaService';

const Entrada = () => {
  const [entradas, setEntradas] = useState([]);
  const [newEntrada, setNewEntrada] = useState({ id_produto: '', quantidade: '', data_entrada: '' });

  useEffect(() => {
    carregarEntradas();
  }, []);

  const carregarEntradas = async () => {
    try {
      const data = await fetchEntries();
      setEntradas(data);
    } catch (error) {
      console.error("Erro ao carregar entradas:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntrada({ ...newEntrada, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const entradaCriada = await createEntry(newEntrada);
      setEntradas([...entradas, entradaCriada]);
      setNewEntrada({ id_produto: '', quantidade: '', data_entrada: '' });
    } catch (error) {
      console.error("Erro ao adicionar entrada:", error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Registro de Entradas</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="id_produto"
          placeholder="ID do Produto"
          value={newEntrada.id_produto}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="quantidade"
          placeholder="Quantidade"
          value={newEntrada.quantidade}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="data_entrada"
          value={newEntrada.data_entrada}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Adicionar Entrada</button>
      </form>

      <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>ID do Produto</th>
            <th>ID do Insumo</th>
            <th>Quantidade</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {entradas.map(entrada => (
            <tr key={entrada.id_entrada}>
              <td>{entrada.id_entrada}</td>
              <td>{entrada.id_insumo}</td>
              <td>{entrada.id_produto}</td>
              <td>{entrada.quantidade}</td>
              <td>{new Date(entrada.data_entrada).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Entrada;