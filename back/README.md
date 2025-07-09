# Sistema LEGT Back-end

## Sobre o Projeto

Este é o back-end do sistema LEGT, desenvolvido em Python utilizando o framework FastAPI. Ele fornece uma API para gerenciar produtos, insumos, fornecedores, pedidos e outras entidades relacionadas ao controle de estoque e operações.

## Estrutura do Projeto

- **main.py**: Arquivo principal que inicia o servidor FastAPI e configura as rotas.
- **db.py**: Gerencia a conexão com o banco de dados e fornece funções utilitárias para operações de CRUD.
- **models.py**: Define os modelos de dados utilizados pelo sistema, incluindo esquemas para validação.
- **README.md**: Documentação do projeto.
- **__pycache__/**: Diretório gerado automaticamente pelo Python para armazenar arquivos compilados.

## Como Executar o Projeto

1. Clone o repositório.
2. Certifique-se de ter o Python instalado na versão 3.10 ou superior.
3. Instale as dependências executando:

   ```bash
   pip install -r requirements.txt
   ```

4. Inicie o servidor FastAPI com o comando:

   ```bash
   uvicorn main:app --reload
   ```

5. Acesse a documentação interativa da API em `http://127.0.0.1:8000/docs`.

## Estrutura da API

A API inclui endpoints para gerenciar as seguintes entidades:

- **Categorias**
- **Fornecedores**
- **Produtos**
- **Insumos**
- **Entradas**
- **Saídas**
- **Pedidos**

## Observações

- Certifique-se de configurar corretamente o banco de dados em `db.py` antes de executar o projeto.
- Utilize a documentação interativa para explorar e testar os endpoints disponíveis.