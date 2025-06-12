import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Fornecedor = () => {
  const [fornecedores, setFornecedores] = useState([]);

  useEffect(() => {
    // Substituir pela URL real da sua API
    axios.get('http://localhost:8000/fornecedores')
      .then(response => setFornecedores(response.data))
      .catch(error => console.error("Erro ao carregar fornecedores:", error));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Fornecedores</h2>
      <button onClick={() => alert('Abrir formulário de novo fornecedor')}>+ Adicionar Fornecedor</button>

      <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Contato</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.map(fornecedor => (
            <tr key={fornecedor.id_fornecedor}>
              <td>{fornecedor.id_fornecedor}</td>
              <td>{fornecedor.nome}</td>
              <td>{fornecedor.contato}</td>
              <td>{fornecedor.email}</td>
              <td>{fornecedor.telefone}</td>
              <td>{fornecedor.status ? 'Ativo' : 'Inativo'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Fornecedor;