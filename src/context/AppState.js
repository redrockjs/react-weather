import React, {useReducer} from "react";
import {AppContext} from "./appContext"
import {appReducer} from "./appReducer";
import {GET_POSITION} from "./types";

export const AppState = ({children}) => {
    const initialState = {
        favoriteCities: [{id:null, city:null, lat:null, lng:null}],
        currentPosition: {lat: 0, lng: 0},
        currentCityName: "defaultCity"
    }

    const [state, dispatch] = useReducer(appReducer, initialState)
    window.state = state

    let getPosition = () => {
        navigator.geolocation.getCurrentPosition((position) => {
                // Текущие координаты.
                let lat = position.coords.latitude
                let lng = position.coords.longitude
                let payload = {lat,lng}
                dispatch({type: GET_POSITION, payload })
            }
        )
    }

    return (
        <AppContext.Provider value={{
            getPosition,
            currentPosition: state.currentPosition
        }}>
            {children}
        </AppContext.Provider>
    )
}
