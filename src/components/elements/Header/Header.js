import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import MovieInfoBar from '../MovieInfoBar/MovieInfoBar';

const Header = () => {
    return(
        <div className="movie-header">
        <div className="movie-header-content">
            <Link to="/" style={{textDecoration: 'none'}}>
            <img className="movie-logo" src="./images/reactMovie_logo.png" alt="movie-logo" />
            <h2 className="logo-title">Movie Base</h2>
            </Link>
            {/* <img className="movie-tmdb-logo" src="./images/tmdb_logo.png" alt="tmdb-logo" /> */}
            <h2 className="logo-text">Search From The Movie Database!(TMDb)</h2>
        </div>
        </div>
    )
}

export default Header;