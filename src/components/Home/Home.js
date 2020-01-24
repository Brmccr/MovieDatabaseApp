import React, { Component } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE} from '../../config';
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
import Counter from '../elements/Counter/Counter';
import Spinner from '../elements/Spinner/Spinner';

import './Home.css';

class Home extends Component {
    state = {
        movies: [],
        heroImage: null,
        loading: false,
        currentPage: 0,
        totalPages: 0,
        searchTerm: ''
    }

    componentDidMount() {
        this.setState({ loading: true });
        const endpoint = `${API_URL}movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
        this.fetchItems(endpoint);
    }

    //will be sent to search bar component
    searchItems = (searchTerm) => {
        console.log(searchTerm);
        let endpoint = '';
        this.setState({
        movies: [],
        loading: true,
        searchTerm
    })

    //checking for a search term - if there is none go to popular - if search term trigger else statement
    if (searchTerm === '') {
        endpoint = `${API_URL}movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
        endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
    }
    this.fetchItems(endpoint);
    }

    // will be used on loadmore button
    loadMoreItems = () => {
        let endpoint = '';
        this.setState({ loading: true });

        if (this.state.searchTerm === '') {
            endpoint = `${API_URL}movie/top_rated?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage + 1}`;
            //else is used if there is a searchTerm - Will use url for search term and will add to the currentPage state using that. 
        } else {
            endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${this.state.searchTerm}&page=${this.state.currentPage + 1}`;
        }
        //fill endpoint with information from whichever is triggered - if or else
        this.fetchItems(endpoint);
    }

    fetchItems = (endpoint) => {
        fetch(endpoint)
        .then(result => result.json())
        .then(result => {
            this.setState({
                //es6 syntax - keeping old results and appending new results
                movies: [...this.state.movies, ...result.results],
                //will grab first movie from results and fill heroImage
                heroImage : this.state.heroImage || result.results[0],
                //stops loading
                loading: false,
                //fetches current page from result
                currentPage: result.page,
                totalPages: result.total_pages
            })
        })
    }

    render(){
        return(
            <div className="movie-home">
                {/* // ternary to check if heroImage state is null checks up to div: null */}
                {/* {this.state.heroImage ? 
                <div>

                <HeroImage 
                    image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.state.heroImage.backdrop_path}`}
                    title={this.state.heroImage.original_title}
                    text={this.state.heroImage.overview}/>
                <SearchBar callback={this.searchItems} />
                
                </div> : null } */}
                <SearchBar callback={this.searchItems} />
                <div className="movie-home-grid">
                    <FourColGrid 
                    //props sent to header
                    header={this.state.searchTerm ? 'Search Result' : 'Top Rated Movies'}
                    loading={this.state.loading}
                    >
                {/* //this will show movie thumbs */}
                {this.state.movies.map ( ( element, i) => {
                    return <MovieThumb
                    key={i}
                    //clickable set to true so thumbnails can be clicked
                    clickable={true}
                    //ternary checking for images and setting that - if not null
                    image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}` : './images/no_image.jpg'}
                    movieId={element.id}
                    movieName={element.original_title}
                    />
                })}
                </FourColGrid>
                {/* // if state.loading is active show spinner - if not don't show it  */}
                {this.state.loading ? <Spinner /> : null}
                {/* // if this state loading is false and you aren't on the last page the load more button is shown */}
                {(this.state.currentPage <= this.state.totalPages && !this.state.loading) ?
                <LoadMoreBtn text="Load More" onClick={this.loadMoreItems} />
                : null }
                {/* //otherwise show null */}
                </div>
                {/* //end of ternary check - will render if state has info - if not will show nothing */}
                
                {/* <Counter /> */}
            </div>
        )
    }
}

export default Home;