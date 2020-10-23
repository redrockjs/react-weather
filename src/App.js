import React from 'react';
import {Navigation} from "./components/Navigation";
import {Main} from "./pages/Main";
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import {FavoriteCities} from "./pages/FavoriteCities";
import 'materialize-css';
import {AppState} from "./context/AppState";

function App() {
    return (
        <AppState>
            <BrowserRouter>
                <Navigation/>
                <Switch>
                    <div className="container">
                        <Route path={'/'} exact component={Main}/>
                        <Route path={'/favorites'} component={FavoriteCities}/>
                    </div>
                </Switch>
            </BrowserRouter>
        </AppState>
    );
}

export default App;
