import * as axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

const ax = axios.create(
    {
        baseURL: "https://api.openweathermap.org/data/2.5/",
        params: {
            appid: API_KEY,
            lang: "ru",
            units: "metric"
        },
    });

export const webAPI = {
    // Get Users list from REST API with params
    getWeatherByCityName(cityName) {
        return (
            ax.get(`weather?q=${cityName}`)
                .then(response => {
                    return response.data
                })
        )
    },
    getWeatherByCityId(cityId) {
        return (
            ax.get(`weather?id=${cityId}`)
                .then(response => {
                    return response.data
                })
        )
    },
    getWeatherByPosition(lat, lon) {
        return (
            ax.get(`weather?lat=${lat}&lon=${lon}`)
                .then(response => {
                    return response.data
                })
        )
    }
}