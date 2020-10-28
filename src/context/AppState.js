import React, {useReducer} from "react";
import {AppContext} from "./appContext"
import {appReducer} from "./appReducer";
import {ADD_FAVORITES, DELETE_FAVORITES, GET_CURRENT_CITY_WEATHER, GET_POSITION, SET_CITY_NAME} from "./types";
import {webAPI as webApi} from "../api/api";

export const AppState = ({children}) => {
    const initialState = {
        favoriteCities: [{id: null, city: null, lat: null, lng: null}],
        currentPosition: {lat: 0, lng: 0},
        currentCityName: "Not found",
        currentCityWeather: {
            "coord": {"lon": null, "lat": null},
            "weather": [{"id": null, "main": "", "description": "", "icon": ""}],
            "base": "",
            "main": {
                "temp": null,
                "feels_like": null,
                "temp_min": null,
                "temp_max": null,
                "pressure": null,
                "humidity": null
            },
            "visibility": null,
            "wind": {"speed": null, "deg": null, "gust": null},
            "clouds": {"all": null},
            "dt": null,
            "sys": {"type": null, "id": null, "country": "", "sunrise": null, "sunset": null},
            "timezone": null,
            "id": null,
            "name": "",
            "cod": null
        }
        //     currentCityWeather:
        //         {"coord": {
        //                 "lon": null,            // City geo location, longitude
        //                 "lat": null },             // City geo location, latitude
        //             "weather": [
        //                 {   "id": null,         // Weather condition id
        //                     "main": "",         // Group of weather parameters (Rain, Snow, Extreme etc.)
        //                     "description": "",  // Weather condition within the group. You can get the output in your language
        //                     "icon": ""          // Weather icon id
        //                 }
        //             ],
        //             "base": "station",                 // Internal parameter
        //             "main": {
        //                 "temp": null,           // Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
        //                 "feels_like": null,     // Temperature. This temperature parameter accounts for the human perception of weather.
        //                 "temp_min": null,       // Minimum temperature at the moment. This is minimal currently observed temperature (within large megalopolises and urban areas)
        //                 "temp_max": null,       // Maximum temperature at the moment. This is maximal currently observed temperature (within large megalopolises and urban areas)
        //                 "pressure": null,       // Atmospheric pressure (on the sea level, if there is no sea_level or grnd_level data), hPa
        //                 "humidity": null        // Humidity, %
        //             },
        //             "visibility": null,
        //             "wind": {
        //                 "speed": 0,             // Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour.
        //                 "deg": 0                // Wind direction, degrees (meteorological)
        //             },
        //             "clouds": { "all": null             // Cloudiness, %
        //             },
        //             "dt": null,                 // Time of data calculation, unix, UTC
        //             "sys": {
        //                 "type": null,           // Internal parameter
        //                 "id": null,             // Internal parameter
        //                 "message": null,        // Internal parameter
        //                 "country": "",          // Country code (GB, JP etc.)
        //                 "sunrise": null,        // Sunrise time, unix, UTC
        //                 "sunset": null          // Sunset time, unix, UTC
        //             },
        //             "timezone": null,           // Shift in seconds from UTC
        //             "id": null,                 // City ID
        //             "name": "",                 // City name
        //             "cod": null                 // Internal parameter
        //         }
    }

    const [state, dispatch] = useReducer(appReducer, initialState)
    window.state = state

    let getPosition = () => {
        navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude
                let lon = position.coords.longitude
                let payload = {lat, lon}
                dispatch({type: GET_POSITION, payload})
            }
        )
    }

    let getWeatherByCityName = async (cityName) => {
        let response = await webApi.getWeatherByCityName(cityName)
        let payload = response
        dispatch({type: GET_CURRENT_CITY_WEATHER, payload})
    }
    let getWeatherByCityId = async (cityId) => {
        let response = await webApi.getWeatherByCityId(cityId)
        let payload = response
        dispatch({type: GET_CURRENT_CITY_WEATHER, payload})
    }
    let getWeatherByPosition = async (lat, lon) => {
        let response = await webApi.getWeatherByPosition(lat, lon)
        let payload = response
        dispatch({type: GET_CURRENT_CITY_WEATHER, payload})
    }

    let setCityName = (name) => {
        dispatch({type: SET_CITY_NAME, name});
    }

    let addFavorites = (payload) => {
        dispatch({type: ADD_FAVORITES, payload});
    }

    let deleteFavorites = (payload) => {
        dispatch({type: DELETE_FAVORITES, payload});
    }

    return (
        <AppContext.Provider value={{
            //state dispatches
            getPosition, getWeatherByCityName, getWeatherByCityId, getWeatherByPosition, setCityName, addFavorites, deleteFavorites,
            //state props
            currentPosition: state.currentPosition,
            currentCityName: state.currentCityName,
            currentCityWeather: state.currentCityWeather
        }}>
            {children}
        </AppContext.Provider>
    )
}
