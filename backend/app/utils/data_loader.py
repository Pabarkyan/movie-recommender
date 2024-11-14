import pandas as pd
import sys
import os

from services.recommender import MovieRecommender

# simulamos que este archivo esta en la misma carpeta que config para que no haya errores en la importacion
# sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from config import FILE_PATH_COMPLETED_DF


def load_data():
    movies = pd.read_csv(FILE_PATH_COMPLETED_DF)
    
    return movies 


def example_for_debugging(movie_title='Toy Story (1995)'):
    
    # Cargar datos
    data = load_data()
    
    # Crear instancia del recomendador
    recommender = MovieRecommender(data)
    recommendations = recommender.recommend(movie_title)

    return recommendations

def get_recommendations(title, recommendations_number):
    data = load_data()

    recommender = MovieRecommender(data)
    recommendations = recommender.recommend(movie_title=title, num_recommendations=recommendations_number)

    return recommendations  
