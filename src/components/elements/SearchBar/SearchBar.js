import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import './SearchBar.css'

class SearchBar extends Component {
    //state will be determined based off of input field - 
    state = {
        //value from input field
    value: ''
    }

    //timeout declared - can be accessed in another function
    timeout = null;

    doSearch = (event) => {
        //fill state with input from what is typed
        this.setState({ value: event.target.value })
        //don't want search feature to trigger too often - set timeout
        clearTimeout(this.timeout);

        this.timeout = setTimeout( () => {
            this.props.callback(this.state.value)
        }, 500);
        // the 500 sets this so it triggers every half second - calling state.value each half second
    } 

    render(){
        return(
            <div className="movie-searchbar">
                <div className="movie-searchbar-content">
                    <FontAwesome className="movie-fa-search" name="search" size="2x" />
                    <input
                    type="text"
                    className="movie-searchbar-input"
                    placeholder="Search"
                    onChange={this.doSearch}
                    value={this.state.value}
                    />
                </div>
            </div>
        )
    }
}

export default SearchBar;