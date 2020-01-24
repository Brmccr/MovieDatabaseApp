import React, {Component} from 'react';
import { API_URL, API_KEY } from '../../config';
import Navigation from '../elements/Navigation/Navigation';
import MovieInfo from '../elements/MovieInfo/MovieInfo';
import MovieInfoBar from '../elements/MovieInfoBar/MovieInfoBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import Actor from '../elements/Actor/Actor';
import Spinner from '../elements/Spinner/Spinner';
import './Movie.css';

class Movie extends Component {
    state = {
        movie: null,
        actors: null,
        directors: [],
        loading: false
    }

//life cycle method - utilized when the component mounts/initializes
    componentDidMount() {
        //sets loading to true - Spinner
        this.setState({ loading: true })
        // Fetch the movie-
        const endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-US`
        //grabbing movie id from where it was defined in the router
        this.fetchItems(endpoint);

    }

    //fetch items method

    fetchItems = (endpoint) => {
        fetch(endpoint)
        .then(result => result.json())
        .then(result => {
            console.log(result)
            if (result.status_code) {
                this.setState({ loading: false});
            } else {
                this.setState({ movie: result }, () => {
                    // fetch actors in the setState callback function
                const endpoint = `${API_URL}movie/${this.props.match.params.movieId}/credits?api_key=${API_KEY}&language=en-US`
                fetch(endpoint)
                .then(result  => result.json())
                .then(result => {
                    const directors = result.crew.filter( (member) => member.job === "Director");

                    this.setState({
                        actors : result.cast,
                        directors,
                        loading: false
                    })
                })
                })
            }
        })
        .catch(error => console.error('Error', Error))
    }
    render(){
        return(
            <div className ="movie-movie">
                {this.state.movie ?
                <div>
                    <Navigation movie={this.props.location.movieName} />
                    <MovieInfo movie={this.state.movie} directors={this.state.directors} />
                    <MovieInfoBar time={this.state.movie.runtime} budget={this.state.movie.budget} revenue={this.state.movie.revenue} />
                    </div>
                : null }
            {this.state.actors ? 
            <div className="movie-movie-grid">
                <FourColGrid header={'Actors'}>
                {this.state.actors.map( (element, i) => {
                    return <Actor key ={i} actor={element} />
                })}
                </FourColGrid>
            </div>
            : null }
            {!this.state.actors && !this.state.loading ? <h1>No Movie Found</h1> : null}
            {this.state.loading ? <Spinner /> : null}
    </div>
        )
}
}

export default Movie;