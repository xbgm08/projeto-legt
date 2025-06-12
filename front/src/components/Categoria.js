import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCategorias } from '../services/categoriaService';

const Categoria = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const loadCategorias = async () => {
      try {
        const response = await getCategorias();
        setCategorias(response.data);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    };

    loadCategorias();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Categorias</h2>
      <button onClick={() => alert('Abrir formulário de nova categoria')}>+ Adicionar Categoria</button>

      <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map(categoria => (
            <tr key={categoria.id_categoria}>
              <td>{categoria.id_categoria}</td>
              <td>{categoria.nome}</td>
              <td>{categoria.descricao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categoria;