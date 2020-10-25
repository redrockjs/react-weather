import React, {useContext, useEffect} from "react";
import defcity from "../assets/images/salzburg.jpg"
import {NavLink} from "react-router-dom";
import {AppContext} from "../context/appContext";
import {Button, Col, Row} from "react-materialize";

export const Main = () => {

    const {currentPosition, currentCityName, currentCityWeather, getPosition, getWeatherByCityName, getWeatherByCityId, getWeatherByPosition} = useContext(AppContext)

    useEffect(() => {
        getPosition()
    }, [])

    useEffect(() => {
        getWeatherByPosition(currentPosition.lat, currentPosition.lon);
    }, [currentPosition])

    let lat = currentPosition.lat;
    let lon = currentPosition.lon;

    let getWeather = () => {
        //getWeatherByCityName("Sochi");
        // getWeatherByCityId("491422");
        getWeatherByPosition(lat, lon);
    }

    return (
        <div className="container">
            <div className="col s12">
                {/*<h1>Hello</h1>*/}
                {/*<p>Вы находитесь {Number(lat).toFixed(2)} широты {Number(lon).toFixed(2)} долготы. </p>*/}
                <div className="card-panel hoverable">
                    <div className="card-image">
                        <img className="responsive-img" src={defcity} alt=""/>
                        <span className="card-title">Ближайший город: {currentCityWeather.name}</span>
                    </div>
                    <div className="card-content">

                        <Row>
                            <Col className="" s={6}>
                                {/*<p>{JSON.stringify(currentCityWeather.weather[0])}</p>*/}
                                <p></p>
                                <p>Температура воздуха {currentCityWeather.main.temp}&deg;, </p>
                                <p>ощущается как {currentCityWeather.main.feels_like} &deg;</p>
                                <p>Мин-Макс,t&deg; : {currentCityWeather.main.temp_min}&deg;-{currentCityWeather.main.temp_max}&deg;</p>
                            </Col>
                            <Col className="" s={6}>
                                <p></p>
                                <p></p>
                                <p></p>
                                <p>Облачность {currentCityWeather.clouds.all}%</p>
                                <p>Давление {Number(currentCityWeather.main.pressure / 1.3333333).toFixed(2)} мм. рт. ст.</p>
                                <p>Относительная влажность воздуха {currentCityWeather.main.humidity} %</p>
                                <p>Видимость {currentCityWeather.visibility} метров</p>
                                <p>Сила ветра {currentCityWeather.wind.speed} м/с </p>
                                <p>Направление {currentCityWeather.wind.deg}&deg;</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col s={12}>

                            </Col>
                        </Row>

                    </div>
                    <div className="card-action" hidden="true">
                        <NavLink to="#">This is a link</NavLink>
                    </div>
                    <Button node="button"
                            style={{
                                marginRight: '5px'
                            }}
                            waves="light"
                            onClick={getWeather}>
                        Обновить
                    </Button>

                </div>
            </div>
        </div>
    )
}