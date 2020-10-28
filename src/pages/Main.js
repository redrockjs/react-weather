import React, {useContext, useEffect} from "react";
import defcity from "../assets/images/salzburg.jpg"
import {NavLink} from "react-router-dom";
import {AppContext} from "../context/appContext";
import {Button, Col, Icon, Row, TextInput} from "react-materialize";

export const Main = () => {

    const {currentPosition, currentCityName, currentCityWeather, getPosition, getWeatherByCityName, addFavorites, deleteFavorites, getWeatherByPosition, setCityName} = useContext(AppContext)

    useEffect(() => {
        getPosition()
    }, [])

    useEffect(() => {
        getWeatherByPosition(currentPosition.lat, currentPosition.lon);
    }, [currentPosition])

    let lat = currentPosition.lat;
    let lon = currentPosition.lon;

    let weatherByCityName = () => {
        getWeatherByCityName(currentCityName);
    }

    let setFavorites = () => {

    }

    return (
        <div className="container">
            <div className="col s12">
                {/*<h1>Hello</h1>*/}
                {/*<p>Вы находитесь {Number(lat).toFixed(2)} широты {Number(lon).toFixed(2)} долготы. </p>*/}
                <div className="card-panel hoverable">
                    <div className="card-image">
                        <img className="responsive-img" src={defcity} alt=""/>
                        <TextInput id="TextInput-4" placeholder="Город" onChange={e => setCityName(e.target.value)}/>
                        <Button node="button" type="submit" waves="light" onClick={weatherByCityName}>
                            Запрос <Icon right> send </Icon>
                        </Button>
                        <i onClick={setFavorites}>
                            <a className="secondary-content" href="javascript:void(0)">
                                <Icon right className="red-text text-darken-2"> favorite_border </Icon>
                            </a>
                        </i>

                    </div>
                    <div className="card-content">
                        <Row>
                            <Col className="" s={6}>
                                <p></p>
                                <span className="card-title">Ближайший город: {currentCityWeather.name}</span>
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
                                <p>Давление {Number(currentCityWeather.main.pressure / 1.3333333).toFixed(2)} мм. рт.
                                    ст.</p>
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
                </div>
            </div>
        </div>
    )
}