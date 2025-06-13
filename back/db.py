import psycopg2

def get_conn():
    return psycopg2.connect(
        user="postgres",
        host="localhost",
        database="LEGT",
        password="03062229",
        port=5433
    )