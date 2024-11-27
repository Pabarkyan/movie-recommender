from pathlib import Path
from dotenv import load_dotenv
import os


# Dataset Config
FILE_PATH_RATING = Path(__file__).resolve().parent.parent / 'data' / 'ratings.csv'
FILE_PATH_MOVIES = Path(__file__).resolve().parent.parent / 'data' / 'movies.csv'
MERGIN_ID = 'movieId'
FILE_PATH_COMPLETED_DF = Path(__file__).resolve().parent.parent / 'data' / 'full_df.csv'


# Auth config
load_dotenv()

ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
REFRESH_TOKEN_EXPIRE_DAYS = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS"))
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")