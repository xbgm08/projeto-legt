import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Insumo = () => {
  const [insumos, setInsumos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/insumos')
      .then(response => setInsumos(response.data))
      .catch(error => console.error("Erro ao carregar insumos:", error));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Insumos</h2>
      <button onClick={() => alert('Abrir formulário de novo insumo')}>+ Adicionar Insumo</button>

      <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Quantidade</th>
            <th>Unidade</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {insumos.map(insumo => (
            <tr key={insumo.id_insumo}>
              <td>{insumo.id_insumo}</td>
              <td>{insumo.nome}</td>
              <td>{insumo.categoria_nome}</td>
              <td>{insumo.quantidade}</td>
              <td>{insumo.unidade_medida}</td>
              <td>{insumo.status ? 'Ativo' : 'Inativo'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Insumo;