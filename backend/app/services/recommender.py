from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from difflib import get_close_matches

class MovieRecommender:
    def __init__(self, data):
        self.data = data
        self._preprocess_data()
    
    def _preprocess_data(self):
        # Crear una representación TF-IDF de los géneros para calcular similitudes
        self.data['genres'] = self.data['genres'].fillna('')
        tfidf = TfidfVectorizer(tokenizer=lambda x: x.split('|'))
        self.genre_matrix = tfidf.fit_transform(self.data['genres'])
        
    def recommend(self, movie_title, num_recommendations=5):
        # Buscar la película en el dataset
        movie_idx = self.data[self.data['title'] == movie_title].index # obtenemos el indice
        if movie_idx.empty:
            movie_idx = self.flexible_matches(movie_title=movie_title)
            print(movie_idx)

            if movie_idx is None: # En caso de que devuelva null
                return f"No se encontró la película '{movie_title}' en el dataset."
                    
        else:
            movie_idx = movie_idx[0] # index value, el primer indice encontrado
        
        # Calcular similitud de coseno basada en géneros
        cosine_sim = cosine_similarity(self.genre_matrix[movie_idx], self.genre_matrix).flatten()
        
        # Ordenar películas por similitud de género, luego por calificación promedio
        similar_indices = cosine_sim.argsort()[::-1] # primero ordenamos los indices de mayor a menor (de mas parecida a menos)
        similar_movies = self.data.iloc[similar_indices] 
        
        # Filtrar películas con un rating promedio similar
        selected_movie = self.data.iloc[movie_idx]
        filtered_movies = similar_movies[
            (similar_movies['movieId'] != selected_movie['movieId']) &
            (similar_movies['rating'] >= selected_movie['rating'] - 0.5) &
            (similar_movies['rating'] <= selected_movie['rating'] + 0.5)
        ]
        
        # Seleccionar las mejores recomendaciones en base a popularidad (rating_count)
        recommendations = filtered_movies.head(num_recommendations)
        
        # Mostrar títulos recomendados
        return recommendations[['title', 'rating', 'rating_count', 'genres']]
    

    def flexible_matches(self, movie_title): # calculamos la distancia de Levenshtein para poder encontrar un resultado aunque el titulo de la pelicula no sea exacto
        all_titles = self.data['title'].tolist()
        close_matches = get_close_matches(movie_title, all_titles, n=1, cutoff=0.4) # lo establecemos con una similitud del 40%
        # Con n=1 establecemos el numero maximo de coincidencias que queremos obtener en la busqueda

        if len(close_matches) == 0: # es decir devuelve una lista vacia
            return None
        
        print(close_matches[0])
        movie_idx = self.data[self.data['title'] == close_matches[0]].index[0]

        return movie_idx


