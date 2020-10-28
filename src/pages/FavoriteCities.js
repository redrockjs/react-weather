import React from "react";
import {Col, Collection, CollectionItem, Icon, Row} from "react-materialize";

export const FavoriteCities = () => {
    return (
        <div className="container">
            <div className="col s12">
                <div className="card-panel hoverable">
                    <Row>
                        <Col l={12} m={12} s={12} >
                            <Collection header="Favorite Cities">
                                <CollectionItem>
                                    Alvin
                                    <a className="secondary-content"  href="javascript:void(0)" >
                                        <Icon className="red-text darken-3"> highlight_off </Icon>
                                    </a>
                                </CollectionItem>
                                <CollectionItem>
                                    Alvin
                                    <a className="secondary-content" href="javascript:void(0)" >
                                        <Icon className="red-text darken-3">
                                            highlight_off
                                        </Icon>
                                    </a>
                                </CollectionItem>
                                <CollectionItem>
                                    Alvin
                                    <a className="secondary-content" href="javascript:void(0)" >
                                        <Icon className="red-text darken-3">
                                            highlight_off
                                        </Icon>
                                    </a>
                                </CollectionItem>
                                <CollectionItem>
                                    Alvin
                                    <a className="secondary-content" href="javascript:void(0)">
                                        <Icon className="red-text darken-3">
                                            highlight_off
                                        </Icon>
                                    </a>
                                </CollectionItem>
                            </Collection>
                        </Col>
                    </Row>

                </div>
            </div>
        </div>
    )
}