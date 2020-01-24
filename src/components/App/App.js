import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from '../elements/Header/Header';
import Home from '../Home/Home';
import Movie from '../Movie/Movie';
import NotFound from '../elements/NotFound/NotFound';

const App =() => {
    return (
        <BrowserRouter>
        {/* //using react fragment tag to avoid div wrapping better not to use excessive divs*/}
        <React.Fragment>
        <Header />
        <Switch>
            {/* //exact path to the home component  */}
            <Route path="/" component={Home} exact />
            <Route path="/:movieId" component={Movie} exact/>
            <Route component={NotFound} />
        </Switch>
        </React.Fragment>

        </BrowserRouter>
    )
}

export default App;