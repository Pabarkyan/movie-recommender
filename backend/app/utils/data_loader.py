import pandas as pd
import sys
import os

# simulamos que este archivo esta en la misma carpeta que config para que no haya errores en la importacion
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from config import FILE_PATH_MOVIES, FILE_PATH_RATING, MERGIN_ID


def load_data():
    # Cargar los datasets
    movies = pd.read_csv(FILE_PATH_MOVIES)
    ratings = pd.read_csv(FILE_PATH_RATING)
    
    data = pd.merge(ratings, movies, on=MERGIN_ID)
    return data

print(load_data())