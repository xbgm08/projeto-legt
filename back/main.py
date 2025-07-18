from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from db import get_conn
from models import *
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Categoria
@app.get("/categorias", response_model=List[Categoria])
def listar_categorias():
    con = get_conn()
    try:
        with con:
            with con.cursor() as cur:
                cur.execute("SELECT id_categoria, nome, descricao FROM categoria")
                rows = cur.fetchall()
                return [Categoria(id_categoria=r[0], nome=r[1], descricao=r[2]) for r in rows]
    finally:
        con.close()

@app.get("/categorias/{id}", response_model=Categoria)
def get_categoria_by_id(id: int):
    con = get_conn()
    try:
        with con:
            with con.cursor() as cur:
                cur.execute("SELECT id_categoria, nome, descricao FROM categoria WHERE id_categoria = %s", (id,))
                row = cur.fetchone()
                if row:
                    return Categoria(id_categoria=row[0], nome=row[1], descricao=row[2])
                else:
                    raise HTTPException(status_code=404, detail="Categoria não encontrada")
    finally:
        con.close()

@app.post("/categorias", response_model=Categoria)
def criar_categoria(cat: Categoria):
    con = get_conn()
    try:
        with con:
            with con.cursor() as cur:
                cur.execute(
                    "INSERT INTO categoria (nome, descricao) VALUES (%s, %s) RETURNING id_categoria",
                    (cat.nome, cat.descricao)
                )
                cat.id_categoria = cur.fetchone()[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        con.close()
    return cat

@app.put("/categorias/{id}", response_model=Categoria)
def update_categoria(id: int, cat: Categoria):
    con = get_conn()
    try:
        with con:
            with con.cursor() as cur:
                cur.execute(
                    "UPDATE categoria SET nome = %s, descricao = %s WHERE id_categoria = %s RETURNING id_categoria",
                    (cat.nome, cat.descricao, id)
                )
                if cur.rowcount == 0:
                    raise HTTPException(status_code=404, detail="Categoria não encontrada")
                cat.id_categoria = id
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        con.close()
    return cat

@app.delete("/categorias/{id}")
def delete_categoria(id: int):
    con = get_conn()
    try:
        with con:
            with con.cursor() as cur:
                cur.execute("DELETE FROM categoria WHERE id_categoria = %s", (id,))
                if cur.rowcount == 0:
                    raise HTTPException(status_code=404, detail="Categoria não encontrada")
    finally:
        con.close()
    return {"detail": "Categoria excluída com sucesso"}

# Fornecedor
@app.get("/fornecedores", response_model=List[Fornecedor])
def listar_fornecedores():
    con = get_conn()
    try:
        with con:
            with con.cursor() as cur:
                cur.execute("SELECT id_fornecedor, nome, porte, contato, cnpj, canal_compra, observacao FROM fornecedor")
                rows = cur.fetchall()
                return [
                    Fornecedor(
                        id_fornecedor=r[0], nome=r[1], porte=r[2], contato=r[3],
                        cnpj=r[4], canal_compra=r[5], observacao=r[6]
                    ) for r in rows
                ]
    finally:
        con.close()

@app.get("/fornecedores/{id}", response_model=Fornecedor)
def get_fornecedor_by_id(id: int):
    con = get_conn()
    try:
        with con:
            with con.cursor() as cur:
                cur.execute("SELECT id_fornecedor, nome, porte, contato, cnpj, canal_compra, observacao FROM fornecedor WHERE id_fornecedor = %s", (id,))
                row = cur.fetchone()
                if row:
                    return Fornecedor(
                        id_fornecedor=row[0], nome=row[1], porte=row[2], contato=row[3],
                        cnpj=row[4], canal_compra=row[5], observacao=row[6]
                    )
                else:
                    raise HTTPException(status_code=404, detail="Fornecedor não encontrado")
    finally:
        con.close()

@app.post("/fornecedores", response_model=Fornecedor)
def criar_fornecedor(f: Fornecedor):
    con = get_conn()
    try:
        with con:
            with con.cursor() as cur:
                cur.execute(
                    "INSERT INTO fornecedor (nome, porte, contato, cnpj, canal_compra, observacao) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id_fornecedor",
                    (f.nome, f.porte, f.contato, f.cnpj, f.canal_compra, f.observacao)
                )
                f.id_fornecedor = cur.fetchone()[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        con.close()
    return f

@app.put("/fornecedores/{id}", response_model=Fornecedor)
def update_fornecedor(id: int, f: Fornecedor):
    con = get_conn()
    try:
        with con:
            with con.cursor() as cur:
                cur.execute(
                    "UPDATE fornecedor SET nome = %s, porte = %s, contato = %s, cnpj = %s, canal_compra = %s, observacao = %s WHERE id_fornecedor = %s RETURNING id_fornecedor",
                    (f.nome, f.porte, f.contato, f.cnpj, f.canal_compra, f.observacao, id)
                )
                if cur.rowcount == 0:
                    raise HTTPException(status_code=404, detail="Fornecedor não encontrado")
                f.id_fornecedor = id
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        con.close()
    return f

@app.delete("/fornecedores/{id}")
def delete_fornecedor(id: int):
    con = get_conn()
    try:
        with con:
            with con.cursor() as cur:
                cur.execute("DELETE FROM fornecedor WHERE id_fornecedor = %s", (id,))
                if cur.rowcount == 0:
                    raise HTTPException(status_code=404, detail="Fornecedor não encontrado")
    finally:
        con.close()
    return {"detail": "Fornecedor excluído com sucesso"}

# Produto
@app.get("/produtos", response_model=List[Produto])
def listar_produtos():
    con = get_conn()
    try:
        with con:
            with con.cursor() as cur:
                cur.execute("SELECT id_produto, nome, descricao, preco, quantidade_estoque, unidade_medida, id_categoria, status FROM produto")
                rows = cur.fetchall()
                return [
                    Produto(
                        id_produto=r[0], nome=r[1], descricao=r[2], preco=float(r[3]),
                        quantidade_estoque=r[4], unidade_medida=r[5], id_categoria=r[6], status=r[7]
                    ) for r in rows
                ]
    finally:
        con.close()

@app.get("/produtos/{id}", response_model=Produto)
def get_produto_by_id(id: int):
    con = get_conn()
    try:
        with con:
            with con.cursor() as cur:
                cur.execute("SELECT id_produto, nome, descricao, preco, quantidade_estoque, unidade_medida, id_categoria, status FROM produto WHERE id_produto = %s", (id,))
                row = cur.fetchone()
                if row:
                    return Produto(
                        id_produto=row[0], nome=row[1], descricao=row[2], preco=float(row[3]),
                        quantidade_estoque=row[4], unidade_medida=row[5], id_categoria=row[6], status=row[7]
                    )
                else:
                    raise HTTPException(status_code=404, detail="Produto não encontrado")
    finally:
        con.close()

@app.post("/produtos", response_model=Produto)
def criar_produto(p: Produto):
    con = get_conn()
    try:
        with con:
            with con.cursor() as cur:
                cur.execute(
                    "INSERT INTO produto (nome, descricao, preco, quantidade_estoque, unidade_medida, id_categoria, status) VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id_produto",
                    (p.nome, p.descricao, p.preco, p.quantidade_estoque, p.unidade_medida, p.id_categoria, p.status)
                )
                p.id_produto = cur.fetchone()[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        con.close()
    return p

@app.put("/produtos/{id}", response_model=Produto)
def update_produto(id: int, p: Produto):
    con = get_conn()
    try:
        with con:
            with con.cursor() as cur:
                cur.execute(
                    "UPDATE produto SET nome = %s, descricao = %s, preco = %s, quantidade_estoque = %s, unidade_medida = %s, id_categoria = %s, status = %s WHERE id_produto = %s RETURNING id_produto",
                    (p.nome, p.descricao, p.preco, p.quantidade_estoque, p.unidade_medida, p.id_categoria, p.status, id)
                )
                if cur.rowcount == 0:
                    raise HTTPException(status_code=404, detail="Produto não encontrado")
                p.id_produto = id
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        con.close()
    return p

@app.delete("/produtos/{id}")
def delete_produto(id: int):
    con = get_conn()
    try:
        with con:
            with con.cursor() as cur:
                cur.execute("DELETE FROM produto WHERE id_produto = %s", (id,))
                if cur.rowcount == 0:
                    raise HTTPException(status_code=404, detail="Produto não encontrado")
    finally:
        con.close()
    return {"detail": "Produto excluído com sucesso"}

# Insumo
@app.get("/insumos", response_model=List[Insumo])
def listar_insumos():
    con = get_conn()
    try:
        with con:
            with con.cursor() as cur:
                cur.execute("SELECT id_insumo, nome, quantidade_estoque, unidade_medida, status FROM insumo")
                rows = cur.fetchall()
                return [
                    Insumo(
                        id_insumo=r[0], nome=r[1], quantidade_estoque=float(r[2]),
                        unidade_medida=r[3], status=r[4]
                    ) for r in rows
                ]
    finally:
        con.close()

@app.get("/insumos/{id}", response_model=Insumo)
def get_insumo_by_id(id: int):
    con = get_conn()
    try:
        with con:
            with con.cursor() as cur:
                cur.execute("SELECT id_insumo, nome, quantidade_estoque, unidade_medida, status FROM insumo WHERE id_insumo = %s", (id,))
                row = cur.fetchone()
                if row:
                    return Insumo(
                        id_insumo=row[0], nome=row[1], quantidade_estoque=float(row[2]),
                        unidade_medida=row[3], status=row[4]
                    )
                else:
                    raise HTTPException(status_code=404, detail="Insumo não encontrado")
    finally:
        con.close()

@app.post("/insumos", response_model=Insumo)
def criar_insumo(i: Insumo):
    con = get_conn()
    try:
        with con:
            with con.cursor() as cur:
                cur.execute(
                    "INSERT INTO insumo (nome, quantidade_estoque, unidade_medida, status) VALUES (%s, %s, %s, %s) RETURNING id_insumo",
                    (i.nome, i.quantidade_estoque, i.unidade_medida, i.status)
                )
                i.id_insumo = cur.fetchone()[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        con.close()
    return i

@app.put("/insumos/{id}", response_model=Insumo)
def update_insumo(id: int, i: Insumo):
    con = get_conn()
    try:
        with con:
            with con.cursor() as cur:
                cur.execute(
                    "UPDATE insumo SET nome = %s, quantidade_estoque = %s, unidade_medida = %s, status = %s WHERE id_insumo = %s RETURNING id_insumo",
                    (i.nome, i.quantidade_estoque, i.unidade_medida, i.status, id)
                )
                if cur.rowcount == 0:
                    raise HTTPException(status_code=404, detail="Insumo não encontrado")
                i.id_insumo = id
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        con.close()
    return i

@app.delete("/insumos/{id}")
def delete_insumo(id: int):
    con = get_conn()
    try:
        with con:
            with con.cursor() as cur:
                cur.execute("DELETE FROM insumo WHERE id_insumo = %s", (id,))
                if cur.rowcount == 0:
                    raise HTTPException(status_code=404, detail="Insumo não encontrado")
    finally:
        con.close()
    return {"detail": "Insumo excluído com sucesso"}

# Entrada
@app.get("/entradas", response_model=List[Entrada])
def listar_entradas():
    con = get_conn()
    try:
        with con:
            with con.cursor() as cur:
                cur.execute("SELECT id_entrada, id_produto, id_insumo, id_fornecedor, quantidade, data_entrada FROM entrada")
                rows = cur.fetchall()
                return [
                    Entrada(
                        id_entrada=r[0], id_produto=r[1], id_insumo=r[2], id_fornecedor=r[3],
                        quantidade=float(r[4]), data_entrada=str(r[5])
                    ) for r in rows
                ]
    finally:
        con.close()

@app.post("/entradas", response_model=Entrada)
def criar_entrada(e: Entrada):
    print("Criando Entrada:", e)
    con = get_conn()
    try:
        with con:
            with con.cursor() as cur:     
                if e.id_insumo:
                    cur.execute(
                        "INSERT INTO entrada (id_insumo, id_fornecedor, quantidade, data_entrada) VALUES (%s, %s, %s, %s) RETURNING id_entrada",
                        (e.id_insumo, e.id_fornecedor, e.quantidade, e.data_entrada)
                    )
                    e.id_entrada = cur.fetchone()[0]
                    
                    cur.execute(
                        "UPDATE insumo SET quantidade_estoque = quantidade_estoque + %s WHERE id_insumo = %s",
                        (e.quantidade, e.id_insumo)
                    )
                elif e.id_produto:
                    cur.execute(
                        "INSERT INTO entrada (id_produto, id_fornecedor, quantidade, data_entrada) VALUES (%s, %s, %s, %s) RETURNING id_entrada",
                        (e.id_produto, e.id_fornecedor, e.quantidade, e.data_entrada)
                    )
                    e.id_entrada = cur.fetchone()[0]
                    
                    cur.execute(
                        "UPDATE produto SET quantidade_estoque = quantidade_estoque + %s WHERE id_produto = %s",
                        (e.quantidade, e.id_produto)
                    )
                
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex))
    finally:
        con.close()
    return e

# Saida Insumo
@app.get("/saidas-insumo", response_model=List[SaidaInsumo])
def listar_saidas_insumo():
    con = get_conn()
    try:
        with con:
            with con.cursor() as cur:
                cur.execute("SELECT id_saida, id_insumo, quantidade, data_saida, motivo FROM saida_insumo")
                rows = cur.fetchall()
                return [
                    SaidaInsumo(
                        id_saida=r[0], id_insumo=r[1], quantidade=float(r[2]),
                        data_saida=str(r[3]), motivo=r[4]
                    ) for r in rows
                ]
    finally:
        con.close()

@app.post("/saidas-insumo", response_model=SaidaInsumo)
def criar_saida_insumo(s: SaidaInsumo):
    con = get_conn()
    try:
        with con:
            with con.cursor() as cur:
                cur.execute(
                    "INSERT INTO saida_insumo (id_insumo, quantidade, data_saida, motivo) VALUES (%s, %s, %s, %s) RETURNING id_saida",
                    (s.id_insumo, s.quantidade, s.data_saida, s.motivo)
                )
                s.id_saida = cur.fetchone()[0]
                
                cur.execute(
                    "UPDATE insumo SET quantidade_estoque = quantidade_estoque - %s WHERE id_insumo = %s",
                    (s.quantidade, s.id_insumo)
                )
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex))
    finally:
        con.close()
    return s

# Produto Insumo
@app.get("/produtos-insumo", response_model=List[ProdutoInsumo])
def listar_produtos_insumo():
    con = get_conn()
    try:
        with con:
            with con.cursor() as cur:
                cur.execute("SELECT id_produto, id_insumo, quantidade_utilizada FROM produto_insumo")
                rows = cur.fetchall()
                return [
                    ProdutoInsumo(
                        id_produto=r[0], id_insumo=r[1], quantidade_utilizada=float(r[2])
                    ) for r in rows
                ]
    finally:
        con.close()

@app.post("/produtos-insumo", response_model=ProdutoInsumo)
def criar_produto_insumo(pi: ProdutoInsumo):
    print("Criando Produto Insumo:", pi)
    con = get_conn()
    try:
        with con:
            with con.cursor() as cur:
                cur.execute(
                    "INSERT INTO produto_insumo (id_produto, id_insumo, quantidade_utilizada) VALUES (%s, %s, %s)",
                    (pi.id_produto, pi.id_insumo, pi.quantidade_utilizada)
                )
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex))
    finally:
        con.close()
    return pi

# Visita Cliente
@app.post("/visita-cliente", response_model=VisitaCliente)
def criar_visita_cliente(v: VisitaCliente):
    con = get_conn()
    try:
        with con:
            with con.cursor() as cur:
                cur.execute(
                    "INSERT INTO visita_cliente (data_hora, quantidade_pessoas, observacao) VALUES (%s, %s, %s) RETURNING id_visita",
                    (v.data_hora, v.quantidade_pessoas, v.observacao)
                )
                v.id_visita = cur.fetchone()[0]
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex))
    finally:
        con.close()
    return v

@app.put("/visita-cliente/{id}", response_model=VisitaCliente)
def update_visita_cliente(id: int, v: VisitaCliente):
    con = get_conn()
    try:
        with con:
            with con.cursor() as cur:
                cur.execute(
                    "UPDATE visita_cliente SET data_hora = %s, quantidade_pessoas = %s, observacao = %s WHERE id_visita = %s RETURNING id_visita",
                    (v.data_hora, v.quantidade_pessoas, v.observacao, id)
                )
                if cur.rowcount == 0:
                    raise HTTPException(status_code=404, detail="Visita não encontrada")
                v.id_visita = id
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        con.close()
    return v

# Pedido
@app.get("/pedidos", response_model=List[PedidoSuper])
def listar_pedidos():
    con = get_conn()
    try:
        with con:
            with con.cursor() as cur:
                cur.execute("" \
                    "SELECT p.id_pedido, p.data_hora, p.valor_total, p.forma_pagamento, vc.quantidade_pessoas " \
                    "FROM pedido p " \
                    "LEFT JOIN visita_cliente vc ON p.id_visita = vc.id_visita " \
                    "ORDER BY p.data_hora DESC"
                )
                rows = cur.fetchall()
                return [
                   PedidoSuper(
                        id_pedido=r[0], data_hora=str(r[1]), valor_total=float(r[2]),
                        forma_pagamento=r[3], quantidade_pessoas=r[4]
                    ) for r in rows
                ]
    finally:
        con.close()

@app.get("/pedidos/{id}", response_model=PedidoSuper)
def get_pedido_by_id(id: int):
    con = get_conn()
    try:
        with con:
            with con.cursor() as cur:
                cur.execute(
                    "SELECT p.id_pedido, p.data_hora, p.valor_total, p.forma_pagamento, vc.quantidade_pessoas, vc.observacao " \
                    "FROM pedido p " \
                    "LEFT JOIN visita_cliente vc ON p.id_visita = vc.id_visita " \
                    "WHERE id_pedido = %s",
                    (id,)
                )
                row = cur.fetchone()

                itens = listar_itens_pedido(id)
                if row:
                    return PedidoSuper(
                        id_pedido=row[0], data_hora=str(row[1]), valor_total=float(row[2]),
                        forma_pagamento=row[3], quantidade_pessoas=row[4], observacao=row[5],
                        items=itens
                    )
                else:
                    raise HTTPException(status_code=404, detail="Pedido não encontrado")
    finally:
        con.close()

@app.post("/pedidos", response_model=PedidoSuper)
def criar_pedido(p: PedidoSuper):
    con = get_conn()
    try:
        visita = VisitaCliente(
            data_hora=p.data_hora,
            quantidade_pessoas=p.quantidade_pessoas,
            observacao=p.observacao
        )
        visita_obj = criar_visita_cliente(visita)
        p.id_visita = visita_obj.id_visita

        with con:
            with con.cursor() as cur:
                cur.execute(
                    "INSERT INTO pedido (data_hora, valor_total, forma_pagamento, id_visita) VALUES (%s, %s, %s, %s) RETURNING id_pedido",
                    (p.data_hora, p.valor_total, p.forma_pagamento, p.id_visita)
                )
                p.id_pedido = cur.fetchone()[0]

                for item in p.items:
                    cur.execute(
                        "INSERT INTO item_pedido (id_pedido, id_produto, quantidade, preco_unitario) VALUES (%s, %s, %s, %s)",
                        (p.id_pedido, item.id_produto, item.quantidade, item.preco_unitario)
                    )
                    
                    cur.execute(
                        "UPDATE produto SET quantidade_estoque = quantidade_estoque - %s WHERE id_produto = %s",
                        (item.quantidade, item.id_produto)
                    )
                    
                    cur.execute(
                        "SELECT id_insumo, quantidade_utilizada FROM produto_insumo WHERE id_produto = %s",
                        (item.id_produto,)
                    )
                    insumos_usados = cur.fetchall()
                    for id_insumo, quantidade_utilizada in insumos_usados:
                        cur.execute(
                            "UPDATE insumo SET quantidade_estoque = quantidade_estoque - %s WHERE id_insumo = %s",
                            (quantidade_utilizada * item.quantidade, id_insumo)
                        )
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex))
    finally:
        con.close()
    return p

@app.put("/pedidos/{id}", response_model=PedidoSuper)
def update_pedido(id: int, p: PedidoSuper):
    con = get_conn()
    try:
        with con:
            with con.cursor() as cur:
                cur.execute(
                    "UPDATE pedido SET data_hora = %s, valor_total = %s, forma_pagamento = %s WHERE id_pedido = %s RETURNING id_pedido, id_visita",
                    (p.data_hora, p.valor_total, p.forma_pagamento, id)
                )
                if cur.rowcount == 0:
                    raise HTTPException(status_code=404, detail="Pedido não encontrado")
                
                cur.execute(
                    "DELETE FROM item_pedido WHERE id_pedido = %s",
                    (id,)
                )

                p.id_pedido = id

                visita = VisitaCliente(
                    data_hora=p.data_hora,
                    quantidade_pessoas=p.quantidade_pessoas,
                    observacao=p.observacao,
                    id_visita=p.id_visita
                )
                update_visita_cliente(p.id_visita, visita)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        con.close()
    return p

@app.delete("/pedidos/{id}")
def delete_pedido(id: int):
    con = get_conn()
    try:
        with con:
            with con.cursor() as cur:
                cur.execute("DELETE FROM pedido WHERE id_pedido = %s", (id,))
                if cur.rowcount == 0:
                    raise HTTPException(status_code=404, detail="Pedido não encontrado")
    finally:
        con.close()
    return {"detail": "Pedido excluído com sucesso"}

# Item Pedido
@app.get("/itens_pedido", response_model=List[ItemPedido])
def listar_itens_pedido(id_pedido: int):
    con = get_conn()
    try:
        with con:
            with con.cursor() as cur:
                cur.execute(
                    "SELECT id_item, id_pedido, id_produto, quantidade, preco_unitario FROM item_pedido " \
                    "WHERE id_pedido = %s", (id_pedido,)
                )
                rows = cur.fetchall()
                return [
                    ItemPedido(
                        id_item=r[0], id_pedido=r[1], id_produto=r[2], quantidade=r[3], preco_unitario=float(r[4])
                    ) for r in rows
                ]
    finally:
        con.close()