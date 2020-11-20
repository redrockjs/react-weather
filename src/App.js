import React, {useContext, useEffect} from 'react';
import {Navigation} from "./components/Navigation";
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import 'materialize-css';
import {AppState} from "./context/AppState";
import {AppContext} from "./context/appContext";
import Main from "./pages/Main";
import FavoriteCities from "./pages/FavoriteCities";
import {Login} from "./pages/Login";
import Error404 from "./pages/Error404";

const InitApp = () => {

    const { initApp, currentPosition, setInitApp, getPosition, getWeatherByPosition } = useContext(AppContext)

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
                        <Route path="/" exact render={() => <Main/>}/>
                        <Route path="/city/:cityId" render={() => <Main/>}/>
                        <Route path="/favorites" exact render={() => <FavoriteCities/>}/>
                        <Route path="/login" exact render={() => <Login/>}/>
                        <Route path="*" render={() => <Error404/>}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </AppState>
    );
}

export default App;
