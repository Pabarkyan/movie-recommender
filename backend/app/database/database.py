from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker, Session

from fastapi import Depends

from typing import Annotated
from dotenv import load_dotenv
import os

load_dotenv()
DB_URL = os.getenv("DB_URL")

engine = create_engine(DB_URL, echo=False) # reducimos la verbosidad con echo false
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
# todas las columnas que hayan heredado de Base, esto es bueno en aplicaciones pequeñas, en aplicaicones
# mas grandes usariamos una aplicacion diferente para establecer columnas

def init_db():
    Base.metadata.create_all(bind=engine) # Con esto nos aseguramos que en la base de datos se crean


def get_db(): # Dependencia para obtener la base de datos
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()