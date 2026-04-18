from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from recommender import hybrid_recommend, train_collaborative, train_lightfm
from data_loader import load_data
import pickle

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load data and models once at startup
ratings, movies = load_data()
svd, trainset = train_collaborative(ratings)
lfm_model, lfm_dataset, item_features, interactions = train_lightfm(ratings, movies)

@app.get('/recommend')
def recommend(user_id: int = 1, alpha: float = 0.6, top_n: int = 10):
    results = hybrid_recommend(user_id, svd, lfm_model, lfm_dataset,
                                item_features, ratings, movies,
                                alpha=alpha, top_n=top_n)
    return {'user_id': user_id, 'recommendations': results}

@app.get('/users')
def get_users():
    users = ratings['user_id'].unique().tolist()[:50]  # first 50 for demo
    return {'users': users}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=5000, reload=True)