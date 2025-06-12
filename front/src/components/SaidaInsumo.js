import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SaidaInsumo = () => {
  const [saidas, setSaidas] = useState([]);

  useEffect(() => {
    // Substituir pela URL real da sua API
    axios.get('http://localhost:8000/saida_insumo')
      .then(response => setSaidas(response.data))
      .catch(error => console.error("Erro ao carregar saídas de insumos:", error));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Saídas de Insumos</h2>
      <button onClick={() => alert('Abrir formulário de nova saída de insumo')}>+ Adicionar Saída de Insumo</button>

      <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Insumo</th>
            <th>Quantidade</th>
            <th>Data</th>
            <th>Observações</th>
          </tr>
        </thead>
        <tbody>
          {saidas.map(saida => (
            <tr key={saida.id_saida_insumo}>
              <td>{saida.id_saida_insumo}</td>
              <td>{saida.insumo_nome}</td>
              <td>{saida.quantidade}</td>
              <td>{new Date(saida.data).toLocaleDateString()}</td>
              <td>{saida.observacoes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SaidaInsumo;