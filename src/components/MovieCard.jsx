import React from 'react';
import { Calendar, Star, TrendingUp } from 'lucide-react';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown';

  return (
    <div className="movie-card">
      <div className="movie-poster-wrapper">
        <img
          src={imageUrl}
          alt={movie.title}
          className="movie-poster"
          loading="lazy"
        />
        <div className="movie-rating">
          <Star className="rating-icon" size={14} fill="#f59e0b" color="#f59e0b" />
          <span>{movie.vote_average ? movie.vote_average.toFixed(1) : 'NR'}</span>
        </div>
      </div>bg
      <div className="movie-content">
        <h3 className="movie-title">{movie.title}</h3>

        <div className="movie-meta">
          <span className="meta-item">
            <Calendar size={14} />
            {releaseYear}
          </span>
          <span className="meta-item">
            <TrendingUp size={14} />
            {movie.popularity ? Math.round(movie.popularity) : 'N/A'}
          </span>
        </div>
        <p className="movie-overview">
          {movie.overview || 'No overview available for this movie.'}
        </p>
      </div>
    </div>
  );
};
export default MovieCard;