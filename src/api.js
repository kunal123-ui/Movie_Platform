const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchCollectionDetails = async (collectionId = 86311) => {
  if (!API_KEY) {
    throw new Error('TMDB API Key is missing. Please add VITE_TMDB_API_KEY to your .env file.');
  }
  
  const response = await fetch(`${BASE_URL}/collection/${collectionId}?api_key=${API_KEY}&language=en-US`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch collection details');
  }
  
  return response.json();
};
