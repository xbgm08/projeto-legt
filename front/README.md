# Sistema LEGT Front-end

## Sobre o Projeto

Sistema web desenvolvido para facilitar a gestão de produtos, insumos, fornecedores, pedidos e visitas em campo, visando controle de estoque e otimização de operações.

## Estrutura do Projeto

- **public/index.html**: O arquivo HTML principal que serve como ponto de entrada para a aplicação web.
- **src/App.js**: Componente raiz da aplicação React, que configura a estrutura principal e o roteamento.
- **src/index.js**: Ponto de entrada da aplicação React, que renderiza o componente App no DOM.
- **src/components**: Contém os componentes React para gerenciar diferentes entidades do sistema:
  - **Categoria.js**: Gerencia a exibição e o gerenciamento de categorias.
  - **Fornecedor.js**: Gerencia informações sobre fornecedores.
  - **FornecedorCategoria.js**: Gerencia a relação entre fornecedores e categorias.
  - **Produto.js**: Gerencia detalhes e ações relacionadas a produtos.
  - **Insumo.js**: Gerencia insumos, incluindo exibição e ações relacionadas.
  - **Entrada.js**: Gerencia a entrada de produtos e insumos.
  - **SaidaInsumo.js**: Gerencia a saída de insumos.
  - **ProdutoInsumo.js**: Gerencia a relação entre produtos e insumos.
  - **VisitaCliente.js**: Gerencia visitas a clientes.
  - **Pedido.js**: Gerencia pedidos.
  - **ItemPedido.js**: Gerencia itens dentro de um pedido.
- **src/services**: Contém serviços para interagir com a API:
  - **api.js**: Instância Axios configurada para fazer requisições à API.
  - **categoriaService.js**: Funções para interagir com a API de categorias.
  - **fornecedorService.js**: Funções para interagir com a API de fornecedores.
  - **produtoService.js**: Funções para interagir com a API de produtos.
  - **insumoService.js**: Funções para interagir com a API de insumos.
  - **entradaService.js**: Funções para interagir com a API de entradas.
  - **saidaInsumoService.js**: Funções para interagir com a API de saídas.
  - **produtoInsumoService.js**: Funções para gerenciar a relação entre produtos e insumos.
  - **visitaClienteService.js**: Funções para interagir com a API de visitas a clientes.
  - **pedidoService.js**: Funções para interagir com a API de pedidos.
  - **itemPedidoService.js**: Funções para gerenciar itens dentro de um pedido.
- **package.json**: Arquivo de configuração do npm, que lista as dependências e scripts do projeto.

## Como Executar o Projeto

1. Clone o repositório.
2. Navegue até o diretório do projeto.
3. Execute `npm install` para instalar as dependências.
4. Execute `npm start` para iniciar a aplicação.