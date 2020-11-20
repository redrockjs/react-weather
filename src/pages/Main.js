import React, {useContext, useEffect} from "react";
import defcity from "../assets/images/salzburg.jpg"
import {AppContext} from "../context/appContext";
import {Button, Col, Icon, Row, TextInput} from "react-materialize";
import {useParams} from "react-router";

/*
       TODO:
        - основная часть выполнена, осталось навести красоту
        - сделать загрузку картинки текущей погоды добавить тучки / облачка / солнце в карточке
        - добавить индикатор направления ветра вместо градусов
 */

const Main = () => {

    const {
        isAuth, authToken, authUserData,
        currentPosition, currentCityName, currentCityWeather, favoriteCities, setCityName,
        getWeatherByCityName, getWeatherByCityId,
        addFirebase, delFirebase
    } = useContext(AppContext)

    let weatherByCityName = () => {
        getWeatherByCityName(currentCityName)
    }
    let {cityId} = useParams()

    useEffect(() => {
        if (typeof (cityId) !== "undefined") {
            console.log("city params " + cityId)
            getWeatherByCityId(cityId)
        }
    }, [])

    let setFavorites = () => {
        let uid = authUserData.uid
        let payload = {
            id: currentCityWeather.id,
            city: currentCityWeather.name,
            lat: currentCityWeather.coord.lat,
            lon: currentCityWeather.coord.lon
        }
        addFirebase(uid, authToken, payload)
    }

    let removeFavorites = () => {
        let uid = authUserData.uid
        delFirebase(uid, authToken, currentCityWeather.id)
    }

    let handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            weatherByCityName()
        }
    }

    return (
        <div className="container">
            <div className="col s12">
                <p style={{"font-weight":"300", "font-size": "14px"}}>Ваши координаты определены,
                    как {Number(currentPosition.lat).toFixed(2)} широты {Number(currentPosition.lon).toFixed(2)} долготы. </p>
                <div className="card-panel hoverable">
                    <div className="card-image">
                        <img className="responsive-img" src={defcity} alt=""/>
                        <TextInput id="TextInput-4" placeholder="Город" onKeyPress={handleKeyPress}
                                   onChange={e => setCityName(e.target.value)}/>
                        <Button className="blue darken-1" node="button" type="submit" waves="light"
                                onClick={weatherByCityName}>
                            Запрос <Icon right> send </Icon>
                        </Button>
                        {   /* проверка, если есть в избранных, то кнопка убирает из избранных, если нет то кнопка добавляет в избранное*/
                            isAuth ?
                                !!favoriteCities && favoriteCities.some(value => value.id === currentCityWeather.id)
                                    ? <i onClick={removeFavorites}>
                                        <a className="secondary-content" href="javascript:void(0)">
                                            <Icon right className="red-text text-darken-2"> favorite </Icon>
                                        </a>
                                    </i>
                                    : <i onClick={setFavorites}>
                                        <a className="secondary-content" href="javascript:void(0)">
                                            <Icon right className="red-text text-darken-2"> favorite_border </Icon>
                                        </a>
                                    </i>

                                : <p></p>
                        }
                    </div>
                    <div className="card-content">
                        <Row>
                            <Col className="" s={6}>
                                <p></p>
                                <span className="card-title">Город {currentCityWeather.name}</span>
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
                </div>
            </div>
        </div>
    )
}

export default Main