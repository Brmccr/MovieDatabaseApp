import React from 'react';
import FontAwesome from 'react-fontawesome';
import { calcTime, convertMoney } from '../../../helpers.js';
import './MovieInfoBar.css';

const MovieInfoBar = (props) => {
    return(
        <div className="movie-movieinfobar">
            <div className="movie-movieinfobar-content">
                <div className="movie-movieinfobar-content-col">
                    <FontAwesome className="fa-time" name="clock-o" size="2x" />
                    <span className="movie-movieinfobar-info">Running time: {calcTime(props.time)}</span>
                </div>
                <div className="movie-movieinfobar-content-col">
                    <FontAwesome  className="fa-budget" name="money" size="2x" />
                    <span className="movie-movieinfobar-info">Budget: {convertMoney(props.budget)}</span>
                </div>
                <div className="movie-movieinfobar-col">
                    <FontAwesome className="fa-revenue" name="ticket" size="2x" />
                    <span className="movie-movieinfobar-revenue">Revenue: {convertMoney(props.revenue)}</span>
                </div>
            </div>
        </div>
    )
}

export default MovieInfoBar;