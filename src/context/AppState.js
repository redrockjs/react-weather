import React, {useEffect, useReducer} from "react";
import {AppContext} from "./appContext"
import {appReducer} from "./appReducer";
import {
    ADD_FAVORITES, DELETE_FAVORITES, CLEAR_FAVORITES,
    GET_POSITION, GET_CURRENT_CITY_WEATHER,
    INIT_APP, SET_AUTH_USER_DATA,
    SET_CITY_NAME, SET_IS_AUTH, UPDATE_FAVORITES, SET_AUTH_TOKEN
} from "./types";
import {webAPI as webApi} from "../api/webApi";
import {storageAPI as storageApi} from "../api/localStorageApi";
import {firebaseApi} from "../api/firebaseApi"

export const AppState = ({children}) => {

    const initialState = {
        initApp: false,
        isAuth: !!(localStorage.getItem("authData")),
        authToken: localStorage.getItem("authToken"),
        authUserData: JSON.parse(localStorage.getItem("authData")),
        favoriteCities: [], //[{key: string, id: number, city: string, lat: decimal, lon: decimal}],
        currentPosition: {lat: null, lon: null},
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
    }

    const [state, dispatch] = useReducer(appReducer, initialState)
    window.state = state

    useEffect(()=>{
        if (!!state.isAuth) {
            getFirebase(state.authUserData.uid, state.authToken)
        }
    },[state.authUserData])

    // Actions
    let setInitApp = (payload) => {
        dispatch({type: INIT_APP, payload});
        if (localStorage.length > 0) {
            let payload = storageApi.getAllStorageItem()
            dispatch({type: UPDATE_FAVORITES, payload});
        }
    }
    const setIsAuth = (payload) => {
        dispatch({type: SET_IS_AUTH, payload})
    }
    const setAuthToken = (payload) => {
        dispatch({type: SET_AUTH_TOKEN, payload})
    }
    const setAuthUserData = (payload) => {
        dispatch({type: SET_AUTH_USER_DATA, payload})
    }
    const clearFavorites = () => {
        dispatch({type: CLEAR_FAVORITES})
    }
    let getPosition = () => {
        navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude
                let lon = position.coords.longitude
                let payload = {lat, lon}
                dispatch({type: GET_POSITION, payload})
            }
        )
    }
    let setCityName = (name) => {
        dispatch({type: SET_CITY_NAME, name});
    }
    // WebApi Actions
    let getWeatherByCityName = async (cityName) => {
        let response = await webApi.getWeatherByCityName(cityName)
        let payload = response
        dispatch({type: GET_CURRENT_CITY_WEATHER, payload})
    }
    let getWeatherByCityId = async (cityId) => {
        let response = await webApi.getWeatherByCityId(cityId)
        let payload = response
        dispatch({type: GET_CURRENT_CITY_WEATHER, payload})
        console.log("Make dispatch")
    }
    let getWeatherByPosition = async (lat, lon) => {
        let response = await webApi.getWeatherByPosition(lat, lon)
        let payload = response
        dispatch({type: GET_CURRENT_CITY_WEATHER, payload})
    }

    // FirebaseApi Actions
    let addFirebase = async (uid, authToken, data) => {
        let response = await firebaseApi.addStorageItem(uid, authToken, data)
        if (response.status === 200) {
            let payload = {
                ...data,
                key: response.data.name
            }
            dispatch({type: ADD_FAVORITES, payload})
        } else {
            alert(`Ошибка запроса ${response.statusText}`)
        }
    }
    let delFirebase = async (uid, authToken, id) => {
        let found = state.favoriteCities.filter(v => v.id === Number(id))
        let response = await firebaseApi.delStorageItem(uid, authToken, found[0].key)
        if (response.status === 200) {
            let payload = id
            dispatch({type: DELETE_FAVORITES, payload})
        } else {
            alert(`Ошибка запроса ${response.statusText}`)
        }
    }
    let getFirebase = async (uid, authToken) => {
        let response = await firebaseApi.getStorageItems(uid, authToken)
        if (response.status === 200) {
            if (response.data !== null) {
                let payload = Object.keys(response.data).map(key => {
                    return {
                        ...response.data[key],
                        key: key
                    }
                })
                dispatch({type: UPDATE_FAVORITES, payload});
            } else return
        } else {
            alert(`Ошибка запроса ${response.statusText}`)
        }
    }

    return (
        <AppContext.Provider value={{
            //dispatches
            addFirebase, delFirebase, getFirebase,
            setInitApp,
            setIsAuth,
            setAuthToken,
            setAuthUserData,
            getPosition,
            getWeatherByCityName,
            getWeatherByCityId,
            getWeatherByPosition,
            setCityName,
            clearFavorites,
            //props
            initApp: state.initApp,
            isAuth: state.isAuth,
            authToken: state.authToken,
            authUserData: state.authUserData,
            currentPosition: state.currentPosition,
            currentCityName: state.currentCityName,
            currentCityWeather: state.currentCityWeather,
            favoriteCities: state.favoriteCities
        }}>
            {children}
        </AppContext.Provider>
    )
}
