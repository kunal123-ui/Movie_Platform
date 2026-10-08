import { useState, useEffect } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { Film, AlertCircle, Loader2 } from 'lucide-react';
import { fetchCollectionDetails } from './api';
import MovieCard from './components/MovieCard';
import './App.css';

function App() {
  const [collection, setCollection] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        // Using 86311 (The Avengers Collection) as default
        const data = await fetchCollectionDetails(86311);
        setCollection(data);
        
        // Sort movies by release date for a better timeline view
        const sortedMovies = (data.parts || []).sort((a, b) => {
          return new Date(a.release_date) - new Date(b.release_date);
        });
        
        setMovies(sortedMovies);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <Loader2 className="spinner" size={48} />
        <p>Loading collection...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <AlertCircle size={48} className="error-icon" />
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <div className="api-key-hint">
          <p>Did you forget to add your TMDB API key?</p>
          <code>Create a .env file with VITE_TMDB_API_KEY=your_key_here</code>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div 
          className="header-bg" 
          style={{ 
            backgroundImage: collection?.backdrop_path ? `url(https://image.tmdb.org/t/p/original${collection.backdrop_path})` : 'none' 
          }}
        >
          <div className="header-overlay"></div>
        </div>
        
        <div className="header-content">
          <div className="logo-container">
            <Film size={32} className="logo-icon" />
            <h1>{collection?.name || 'Movie Collection'}</h1>
          </div>
          <p className="collection-overview">
            {collection?.overview}
          </p>
          <div className="stats">
            <span className="stat-pill">{movies.length} Movies in Collection</span>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="list-header">
          <h2>Collection Timeline</h2>
        </div>

        {/* 
          Here we implement the 'RecyclerView' pattern in React using Virtuoso.
          It only renders the items currently visible in the DOM, allowing for 
          extremely smooth scrolling even with thousands of items.
        */}
        <div className="recyclerview-container">
          <Virtuoso
            useWindowScroll
            data={movies}
            itemContent={(index, movie) => (
              <div style={{ padding: '16px 0' }}>
                <MovieCard key={movie.id} movie={movie} />
              </div>
            )}
            components={{
              Footer: () => <div style={{ height: '40px' }} />
            }}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
