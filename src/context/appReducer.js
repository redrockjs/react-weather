import {GET_POSITION, GET_CURRENT_CITY_WEATHER, SET_CITY_NAME, ADD_FAVORITES, DELETE_FAVORITES} from "./types";

const handlers = {
    [GET_POSITION]: (state, {payload}) => ({
        ...state,
        currentPosition: payload
    }),
    // [GET_CURRENT_CITY_WEATHER]: (state, {payload}) => ({
    //     ...state,
    //     currentCityWeather: {
    //         coord: {
    //             ...state.currentCityWeather.coord,
    //             lon: payload.coord.lon,
    //             lat: payload.coord.lat
    //         },
    //         weather: [...state.currentCityWeather.weather,
    //             payload.weather.map( value => value)
    //         ],
    //         base: payload.base,
    //         main: {
    //             ...state.main,
    //             temp: payload.main.temp,
    //             feels_like: payload.main.feels_like,
    //             temp_min: payload.main.temp_min,
    //             temp_max: payload.main.temp_max,
    //             pressure: payload.main.pressure,
    //             humidity: payload.main.humidity
    //         },
    //         visibility: payload.visibility,
    //         wind: {
    //             ...state.currentCityWeather.wind,
    //             speed: payload.wind.speed,
    //             deg: payload.wind.deg,
    //             gust: payload.wind.gust
    //         },
    //         clouds: {
    //             ...state.currentCityWeather.clouds,
    //             all: payload.clouds.all
    //         },
    //         dt: payload.dt,
    //         sys: {
    //             ...state.currentCityWeather.sys,
    //             type: payload.sys.type,
    //             id: payload.sys.id,
    //             country: payload.sys.country,
    //             sunrise: payload.sys.sunrise,
    //             sunset: payload.sys.sunset
    //         },
    //         timezone: payload.time,
    //         id: payload.id,
    //         name: payload.name,
    //         cod: payload.cod
    //     }
    // }),
    [GET_CURRENT_CITY_WEATHER]: (state, {payload}) => ({
        ...state,
        currentCityWeather: JSON.parse(JSON.stringify(payload)),
    }),
    [SET_CITY_NAME]: (state, {name}) => ( {
            ...state,
            currentCityName: name
        }
    ),
    [ADD_FAVORITES]: (state, {payload}) => ( {
            ...state,
            favoriteCities: [...state.favoriteCities, payload]
        }
    ),
    [DELETE_FAVORITES]: (state, {payload}) => ( {
            ...state,
            favoriteCities: state.favoriteCities.filter(favoriteCities => favoriteCities.id !==payload )
        }
    ),

    DEFAULT: state => state
}

export const appReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}
