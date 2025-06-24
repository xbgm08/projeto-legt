import psycopg2
from dotenv import load_dotenv
import os

load_dotenv() 

def get_conn():
    return psycopg2.connect(
        user=os.getenv("DB_USER"),
        host=os.getenv("DB_HOST"),
        database=os.getenv("DB_NAME"),
        password=os.getenv("DB_PASSWORD"),
        port=os.getenv("DB_PORT")
    )