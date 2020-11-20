import {
    INIT_APP,
    GET_POSITION,
    GET_CURRENT_CITY_WEATHER,
    SET_CITY_NAME,
    ADD_FAVORITES,
    UPDATE_FAVORITES,
    DELETE_FAVORITES,
    CLEAR_FAVORITES,
    SET_IS_AUTH,
    SET_AUTH_TOKEN,
    SET_AUTH_USER_DATA
} from "./types";

const handlers = {
    [GET_POSITION]: (state, {payload}) => ({
        ...state,
        currentPosition: payload
    }),
    [GET_CURRENT_CITY_WEATHER]: (state, {payload}) => ({
        ...state,
        currentCityWeather: JSON.parse(JSON.stringify(payload)),
    }),
    [SET_CITY_NAME]: (state, {name}) => ({
        ...state,
        currentCityName: name
    }),
    [INIT_APP]: (state, {payload}) => ({
        ...state,
        initApp: payload
    }),
    [SET_IS_AUTH]: (state, {payload}) => ({
        ...state,
        isAuth: payload
    }),
    [SET_AUTH_TOKEN]: (state, {payload}) => ({
        ...state,
        authToken: payload
    }),
    [SET_AUTH_USER_DATA]: (state, {payload}) => ({
        ...state,
        authUserData: payload,
    }),
    [ADD_FAVORITES]: (state, {payload}) => ({
        ...state,
        favoriteCities: [...state.favoriteCities, payload]
    }),
    [UPDATE_FAVORITES]: (state, {payload}) => ({
        ...state,
        favoriteCities: payload
    }),
    [DELETE_FAVORITES]: (state, {payload}) => ({
        ...state,
        favoriteCities: state.favoriteCities.filter(favoriteCities => favoriteCities.id !== Number(payload))
    }),
    [CLEAR_FAVORITES]: (state) => ({
        ...state,
        favoriteCities: []
    }),
    DEFAULT: state => state
}

export const appReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}
