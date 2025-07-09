# Sistema LEGT Front-end

## Sobre o Projeto

Sistema web desenvolvido para facilitar a gestão de produtos, insumos, fornecedores, pedidos e visitas em campo, visando controle de estoque e otimização de operações.

## Estrutura do Projeto

- **public/index.html**: O arquivo HTML principal que serve como ponto de entrada para a aplicação web. Contém a tag `<title>` que define o nome exibido na guia do navegador.
- **src/App.js**: Componente raiz da aplicação React, que configura a estrutura principal e o roteamento. Inclui o menu de navegação com ícones e links para as principais telas.
- **src/index.js**: Ponto de entrada da aplicação React, que renderiza o componente App no DOM.
- **src/components**: Contém os componentes React para gerenciar diferentes entidades do sistema:
  - **Categoria.js**: Gerencia a exibição e o gerenciamento de categorias.
  - **Fornecedor.js**: Gerencia informações sobre fornecedores.
  - **Produto.js**: Gerencia detalhes e ações relacionadas a produtos.
  - **Insumo.js**: Gerencia insumos, incluindo exibição e ações relacionadas.
  - **Entrada.js**: Gerencia a entrada de produtos e insumos.
  - **SaidaInsumo.js**: Gerencia a saída de insumos.
  - **ProdutoInsumo.js**: Gerencia a relação entre produtos e insumos.
  - **Pedido.js**: Gerencia pedidos.
  - **Home.js**: Tela inicial com dashboard e cards padronizados.
- **src/services**: Contém serviços para interagir com a API:
  - **api.js**: Instância Axios configurada para fazer requisições à API.
  - **categoriaService.js**: Funções para interagir com a API de categorias.
  - **fornecedorService.js**: Funções para interagir com a API de fornecedores.
  - **produtoService.js**: Funções para interagir com a API de produtos.
  - **insumoService.js**: Funções para interagir com a API de insumos.
  - **entradaService.js**: Funções para interagir com a API de entradas.
  - **saidaInsumoService.js**: Funções para interagir com a API de saídas.
  - **produtoInsumoService.js**: Funções para gerenciar a relação entre produtos e insumos.
  - **pedidoService.js**: Funções para interagir com a API de pedidos.
- **package.json**: Arquivo de configuração do npm, que lista as dependências e scripts do projeto.

## Como Executar o Projeto

1. Clone o repositório.
2. Navegue até o diretório do projeto.
3. Execute `npm install` para instalar as dependências.
4. Execute `npm start` para iniciar a aplicação.

## Funcionalidades Principais

- Gerenciamento de categorias, fornecedores, produtos e insumos.
- Controle de entradas e saídas de insumos.
- Relacionamento entre produtos e insumos.
- Gerenciamento de pedidos.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Axios**: Cliente HTTP para realizar requisições à API.
- **CSS**: Estilização dos componentes e páginas.