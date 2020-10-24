import {GET_CURRENT_CITY_WEATHER, GET_POSITION} from "./types";

const handlers = {
    [GET_POSITION]: (state, {payload}) => ({
        ...state,
        currentPosition: payload
    }),
    [GET_CURRENT_CITY_WEATHER]: (state, {payload}) => ( {
         ...state,
        currentCityWeather: payload
        }),
    DEFAULT: state => state
}

export const appReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}
