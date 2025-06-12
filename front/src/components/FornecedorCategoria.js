import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FornecedorCategoria = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [selectedFornecedor, setSelectedFornecedor] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState('');

  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const response = await axios.get('http://localhost:8000/fornecedores');
        setFornecedores(response.data);
      } catch (error) {
        console.error("Erro ao carregar fornecedores:", error);
      }
    };

    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:8000/categorias');
        setCategorias(response.data);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    };

    fetchFornecedores();
    fetchCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/fornecedor_categoria', {
        fornecedorId: selectedFornecedor,
        categoriaId: selectedCategoria,
      });
      alert('Relação criada com sucesso!');
    } catch (error) {
      console.error("Erro ao criar relação:", error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Gerenciar Fornecedores e Categorias</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Fornecedor:</label>
          <select value={selectedFornecedor} onChange={(e) => setSelectedFornecedor(e.target.value)}>
            <option value="">Selecione um fornecedor</option>
            {fornecedores.map(fornecedor => (
              <option key={fornecedor.id} value={fornecedor.id}>{fornecedor.nome}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Categoria:</label>
          <select value={selectedCategoria} onChange={(e) => setSelectedCategoria(e.target.value)}>
            <option value="">Selecione uma categoria</option>
            {categorias.map(categoria => (
              <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
            ))}
          </select>
        </div>
        <button type="submit">Adicionar Relação</button>
      </form>
    </div>
  );
};

export default FornecedorCategoria;