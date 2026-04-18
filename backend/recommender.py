from surprise import SVD, Dataset, Reader
from surprise.model_selection import train_test_split
from surprise import accuracy
import pickle

def train_collaborative(ratings):
    reader = Reader(rating_scale=(1, 5))
    data = Dataset.load_from_df(ratings[['user_id','item_id','rating']], reader)
    
    trainset, testset = train_test_split(data, test_size=0.2, random_state=42)
    
    svd = SVD(n_factors=50, n_epochs=20, random_state=42)
    svd.fit(trainset)
    
    # Evaluate
    predictions = svd.test(testset)
    print(f"SVD RMSE: {accuracy.rmse(predictions)}")
    
    # Save model
    with open('models/svd_model.pkl', 'wb') as f:
        pickle.dump(svd, f)
    
    return svd, trainset

def get_cf_score(svd, user_id, item_id):
    """Returns predicted rating from collaborative filtering."""
    prediction = svd.predict(user_id, item_id)
    return prediction.est  # value between 1–5

from lightfm import LightFM
from lightfm.data import Dataset as LFMDataset
from lightfm.evaluation import precision_at_k
import numpy as np
import scipy.sparse as sp

def train_lightfm(ratings, movies):
    genre_cols = ['Action','Adventure','Animation','Childrens','Comedy',
                  'Crime','Documentary','Drama','Fantasy','FilmNoir',
                  'Horror','Musical','Mystery','Romance','SciFi',
                  'Thriller','War','Western']
    
    lfm_dataset = LFMDataset()
    lfm_dataset.fit(
        users=ratings['user_id'].unique(),
        items=movies['item_id'].unique(),
        item_features=genre_cols
    )
    
    # Build interaction matrix
    (interactions, weights) = lfm_dataset.build_interactions(
        [(row['user_id'], row['item_id'], row['rating'])
         for _, row in ratings.iterrows()]
    )
    
    # Build item feature matrix from genres
    item_features_data = []
    for _, row in movies.iterrows():
        genres_present = [g for g in genre_cols if row[g] == 1]
        item_features_data.append((row['item_id'], genres_present))
    
    item_features = lfm_dataset.build_item_features(item_features_data)
    
    # Train hybrid model
    lfm_model = LightFM(loss='warp', no_components=30, random_state=42)
    lfm_model.fit(interactions, item_features=item_features,
                  epochs=30, num_threads=2, verbose=True)
    
    return lfm_model, lfm_dataset, item_features, interactions

def get_cb_scores(lfm_model, lfm_dataset, item_features, user_id, item_ids):
    """Returns content-based scores for a list of items."""
    user_map = lfm_dataset.mapping()[0]  # user_id -> internal index
    item_map = lfm_dataset.mapping()[2]  # item_id -> internal index
    
    if user_id not in user_map:
        return {item_id: 0.5 for item_id in item_ids}
    
    u_idx = user_map[user_id]
    scores = {}
    for item_id in item_ids:
        if item_id in item_map:
            i_idx = item_map[item_id]
            score = lfm_model.predict([u_idx], [i_idx],
                                       item_features=item_features)[0]
            scores[item_id] = float(score)
    return scores

def normalize(scores: dict) -> dict:
    """Min-max normalize a dict of scores to [0, 1]."""
    vals = list(scores.values())
    mn, mx = min(vals), max(vals)
    if mx == mn:
        return {k: 0.5 for k in scores}
    return {k: (v - mn) / (mx - mn) for k, v in scores.items()}

def hybrid_recommend(user_id, svd, lfm_model, lfm_dataset,
                     item_features, ratings, movies,
                     alpha=0.6, top_n=10):
    """
    alpha: weight for collaborative filtering (1-alpha for content-based)
    Returns top_n recommended movies.
    """
    # Movies the user has NOT yet rated
    rated_items = set(ratings[ratings['user_id'] == user_id]['item_id'])
    all_items = set(movies['item_id'].unique())
    unrated_items = list(all_items - rated_items)
    
    # Get CF scores (normalize from 1–5 scale)
    cf_scores = {item: get_cf_score(svd, user_id, item)
                 for item in unrated_items}
    
    # Get CB scores from LightFM
    cb_scores = get_cb_scores(lfm_model, lfm_dataset,
                               item_features, user_id, unrated_items)
    
    # Normalize both to [0, 1]
    cf_norm = normalize(cf_scores)
    cb_norm = normalize(cb_scores)
    
    # Weighted hybrid blend
    hybrid_scores = {}
    for item_id in unrated_items:
        cf_val = cf_norm.get(item_id, 0)
        cb_val = cb_norm.get(item_id, 0)
        hybrid_scores[item_id] = alpha * cf_val + (1 - alpha) * cb_val
    
    # Sort and return top N
    top_items = sorted(hybrid_scores, key=hybrid_scores.get, reverse=True)[:top_n]
    
    results = []
    for item_id in top_items:
        movie = movies[movies['item_id'] == item_id].iloc[0]
        results.append({
            'item_id': int(item_id),
            'title': movie['title'],
            'cf_score': round(cf_norm.get(item_id, 0), 3),
            'cb_score': round(cb_norm.get(item_id, 0), 3),
            'hybrid_score': round(hybrid_scores[item_id], 3)
        })
    return results