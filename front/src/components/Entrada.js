import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Entrada = () => {
  const [entradas, setEntradas] = useState([]);
  const [newEntrada, setNewEntrada] = useState({ produtoId: '', quantidade: '', data: '' });

  useEffect(() => {
    axios.get('http://localhost:8000/entradas')
      .then(response => setEntradas(response.data))
      .catch(error => console.error("Erro ao carregar entradas:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntrada({ ...newEntrada, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/entradas', newEntrada)
      .then(response => {
        setEntradas([...entradas, response.data]);
        setNewEntrada({ produtoId: '', quantidade: '', data: '' });
      })
      .catch(error => console.error("Erro ao adicionar entrada:", error));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Registro de Entradas</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="produtoId"
          placeholder="ID do Produto"
          value={newEntrada.produtoId}
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
          name="data"
          value={newEntrada.data}
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
            <th>Quantidade</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {entradas.map(entrada => (
            <tr key={entrada.id}>
              <td>{entrada.id}</td>
              <td>{entrada.produtoId}</td>
              <td>{entrada.quantidade}</td>
              <td>{new Date(entrada.data).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Entrada;