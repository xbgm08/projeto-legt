import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => (
    <div className="home-container">
        <div className="home-header">
            <h1>Bem-vindo ao Sistema LEGT</h1>
            <p className="home-subtitle">
                Gerencie facilmente produtos, insumos, fornecedores, pedidos e muito mais!
            </p>
        </div>
        <div className="home-cards">
            {/* <Link to="/dashboard" className="home-card">
                <span className="home-card-icon">📊</span>
                <h3>Dashboard</h3>
                <p>Visualize gráficos e indicadores do sistema.</p>
            </Link> */}
            <Link to="/produto" className="home-card">
                <span role="img" aria-label="Produto" className="home-card-icon">📦</span>
                <h3>Produtos</h3>
                <p>Cadastre e gerencie seus produtos.</p>
            </Link>
            <Link to="/insumo" className="home-card">
                <span role="img" aria-label="Insumo" className="home-card-icon">🧪</span>
                <h3>Insumos</h3>
                <p>Controle o estoque de insumos.</p>
            </Link>
            <Link to="/fornecedor" className="home-card">
                <span role="img" aria-label="Fornecedor" className="home-card-icon">🚚</span>
                <h3>Fornecedores</h3>
                <p>Gerencie seus fornecedores.</p>
            </Link>
            <Link to="/pedido" className="home-card">
                <span role="img" aria-label="Pedido" className="home-card-icon">📝</span>
                <h3>Pedidos</h3>
                <p>Registre e acompanhe pedidos.</p>
            </Link>
            <Link to="/entrada" className="home-card">
                <span role="img" aria-label="Entrada" className="home-card-icon">➕</span>
                <h3>Entradas</h3>
                <p>Lance entradas de produtos e insumos.</p>
            </Link>
            <Link to="/saida-insumo" className="home-card">
                <span role="img" aria-label="Saída" className="home-card-icon">➖</span>
                <h3>Saídas de Insumos</h3>
                <p>Registre saídas de insumos do estoque.</p>
            </Link>
            <Link to="/produto-insumo" className="home-card">
                <span role="img" aria-label="Produto-Insumo" className="home-card-icon">🔗</span>
                <h3>Produto x Insumo</h3>
                <p>Relacione insumos utilizados em cada produto.</p>
            </Link>
            <Link to="/categorias" className="home-card">
                <span role="img" aria-label="Categoria" className="home-card-icon">🏷️</span>
                <h3>Categorias</h3>
                <p>Organize produtos e insumos por categoria.</p>
            </Link>
        </div>
    </div>
);

export default Home;