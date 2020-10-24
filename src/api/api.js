import * as axios from "axios";

const ax = axios.create(
    {
        baseURL: "https://api.openweathermap.org/data/2.5/",
        params: {
            appid: "126bf8221872dc70cd14aac2789311f6",
            lang: "ru",
            units: "metric"
        },
    });


//api 126bf8221872dc70cd14aac2789311f6
//url api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

//constructor https://api.openweathermap.org/data/2.5/weather?appid=126bf8221872dc70cd14aac2789311f6&units=metric&q=sochi&lang=ru

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