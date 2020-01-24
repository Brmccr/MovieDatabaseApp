import React from 'react';
import { Link } from 'react-router-dom';
import './MovieThumb.css';

const MovieThumb = (props) => {
    return(
        <div className="movie-moviethumb">
            {/* //ternary making props.clickable available when there is a link that can be clicked. */}
            {props.clickable ? 
            // sending movie id and name along with link through props - Utilizing react router for nav
            <Link to={{ pathname: `/${props.movieId}`, movieName: `${props.movieName}` }}>
                <img src={props.image} alt="moviethumb" />
            </Link>
            :
            <img src={props.image} alt="moviethumb" />
            }
        </div>
    )
}

export default MovieThumb;