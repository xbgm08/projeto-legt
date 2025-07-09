from pydantic import BaseModel
from typing import Optional

class Categoria(BaseModel):
    id_categoria: Optional[int] = None
    nome: str
    descricao: Optional[str] = None

class Fornecedor(BaseModel):
    id_fornecedor: Optional[int] = None
    nome: str
    porte: Optional[str]
    contato: Optional[str]
    cnpj: Optional[str]
    canal_compra: str
    observacao: Optional[str]

class Produto(BaseModel):
    id_produto: Optional[int] = None
    nome: str
    descricao: Optional[str]
    preco: float
    quantidade_estoque: int
    unidade_medida: str
    id_categoria: int
    status: bool

class Insumo(BaseModel):
    id_insumo: Optional[int] = None
    nome: str
    quantidade_estoque: float
    unidade_medida: str
    status: bool

class Entrada(BaseModel):
    id_entrada: Optional[int] = None
    id_produto: Optional[int] = None
    id_insumo: Optional[int] = None
    id_fornecedor: int
    quantidade: float
    data_entrada: str

class SaidaInsumo(BaseModel):
    id_saida: Optional[int] = None
    id_insumo: int
    quantidade: float
    data_saida: str
    motivo: Optional[str]

class ProdutoInsumo(BaseModel):
    id_produto: int
    id_insumo: int
    quantidade_utilizada: float

class VisitaCliente(BaseModel):
    id_visita: Optional[int] = None
    data_hora: str
    quantidade_pessoas: int
    observacao: Optional[str]

class Pedido(BaseModel):
    id_pedido: Optional[int] = None
    data_hora: str
    valor_total: float
    forma_pagamento: str
    id_visita: Optional[int] = None

class PedidoSuper(Pedido):
    quantidade_pessoas: int
    observacao: Optional[str] = None
    items: list['ItemPedido'] = []

class ItemPedido(BaseModel):
    id_item: Optional[int] = None
    id_pedido: Optional[int] = None
    id_produto: int
    quantidade: int
    preco_unitario: float