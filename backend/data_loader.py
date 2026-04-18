import pandas as pd
import numpy as np

def load_data():
    # Load ratings
    ratings = pd.read_csv('data/ml-100k/u.data', sep='\t',
                          names=['user_id','item_id','rating','timestamp'])

    # Load movies with genres
    genre_cols = ['unknown','Action','Adventure','Animation','Childrens',
                  'Comedy','Crime','Documentary','Drama','Fantasy',
                  'FilmNoir','Horror','Musical','Mystery','Romance',
                  'SciFi','Thriller','War','Western']
    
    movies = pd.read_csv('data/ml-100k/u.item', sep='|', encoding='latin-1',
                         names=['item_id','title','release_date','video_date',
                                'imdb_url'] + genre_cols)
    
    return ratings, movies

def get_genre_matrix(movies):
    genre_cols = ['Action','Adventure','Animation','Childrens','Comedy',
                  'Crime','Documentary','Drama','Fantasy','FilmNoir',
                  'Horror','Musical','Mystery','Romance','SciFi',
                  'Thriller','War','Western']
    return movies[genre_cols].values  # shape: (num_movies, 18)