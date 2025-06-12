import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VisitaCliente = () => {
  const [visitas, setVisitas] = useState([]);

  useEffect(() => {
    // Substituir pela URL real da sua API
    axios.get('http://localhost:8000/visitas')
      .then(response => setVisitas(response.data))
      .catch(error => console.error("Erro ao carregar visitas:", error));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Visitas a Clientes</h2>
      <button onClick={() => alert('Abrir formulário de nova visita')}>+ Adicionar Visita</button>

      <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Data</th>
            <th>Observações</th>
          </tr>
        </thead>
        <tbody>
          {visitas.map(visita => (
            <tr key={visita.id_visita}>
              <td>{visita.id_visita}</td>
              <td>{visita.cliente_nome}</td>
              <td>{new Date(visita.data).toLocaleDateString()}</td>
              <td>{visita.observacoes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VisitaCliente;