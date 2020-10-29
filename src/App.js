import React, {useContext, useEffect} from 'react';
import {Navigation} from "./components/Navigation";
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import 'materialize-css';
import {AppState} from "./context/AppState";
import Main from "./pages/Main";
import FavoriteCities from "./pages/FavoriteCities";
import {AppContext} from "./context/appContext";
import Error404 from "./pages/Error404";

const InitApp = () => {
    const {
        initApp, currentPosition, currentCityName, currentCityWeather, favoriteCities,
        setInitApp, getPosition, getWeatherByPosition
    } = useContext(AppContext)

    if (initApp === false) {
        getPosition()
        setInitApp(true)
    }

    useEffect(() => {
            getWeatherByPosition(currentPosition.lat, currentPosition.lat)
        }, [currentPosition]
    )
    return <div></div>
}

const App = () => {
    return (
        <AppState>
            <InitApp/>
            <BrowserRouter>
                <Navigation/>
                <div className="container">
                    <Switch>
                        <Route path="/city/:cityId'" render={() => <Main/>}/>
                        <Route path="/favorites" render={() => <FavoriteCities/>}/>
                        <Route path="/" exact render={() => <Main/>}/>
                        <Route path="*" render={() => <Error404/>}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </AppState>
    );
}

export default App;
