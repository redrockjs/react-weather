import React, {useContext} from "react";
import {Col, Collection, CollectionItem, Icon, Row} from "react-materialize";
import {AppContext} from "../context/appContext";

const FavoriteCities = () => {
    const {favoriteCities, deleteFavorites} = useContext(AppContext)


    let removeFavorites = (e) => {
        let currentCities=e.currentTarget.dataset.id // берем id из датасета и удаляем по его номеру из стейта
        deleteFavorites(currentCities)
    }

    let weatherList = favoriteCities.map(value => {
        // Тут хитрая штука, присваиваем тэгу А специальный датасет с цифровым id города.
        let dataAttr = {'data-id': value.id}
        return (
            <CollectionItem>
                {value.city}
                <a className="secondary-content" href="javascript:void(0)" {...dataAttr}
                   onClick={removeFavorites}>
                    <Icon className="red-text darken-3"> highlight_off </Icon>
                </a>
            </CollectionItem>)
    });

    return (
        <div className="container">
            <div className="col s12">
                <div className="card-panel hoverable">
                    <Row>
                        <Col l={12} m={12} s={12}>
                            <Collection header="Favorite Cities">
                                {weatherList}
                            </Collection>
                        </Col>
                    </Row>

                </div>
            </div>
        </div>
    )
}

export default FavoriteCities