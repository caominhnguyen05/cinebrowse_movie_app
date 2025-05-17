import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com?apikey=8d96a48a'

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // Start with an empty search term

    const searchMovies = async (title) => {
        if (!title || title.trim() === '') {
            setMovies([]);
            return;
        }
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        if (data.Search) {
            setMovies(data.Search);
        } else {
            setMovies([]); // Set to empty array if no results
        }
    }
    
    useEffect(() => {
        searchMovies('Spiderman');
    }, []);

    // useEffect for debounced search as the user types
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm) { 
                searchMovies(searchTerm);
            } else {
                searchMovies('You');
            }
        }, 60); // 60ms delay

        return () => clearTimeout(delayDebounceFn);

    }, [searchTerm]); // This effect depends on searchTerm. It re-runs whenever searchTerm changes.

    return (
        <div className="app">
            <h1>CineBrowse - Search and Discover Movies</h1>
            <p className="subtitle">
                Search and discover movies by typing in keywords from their titles.
            </p>

            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                        searchMovies(searchTerm);
                        }
                    }}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>
            
            {
                movies?.length > 0 ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }
        </div>
    );
}

export default App;