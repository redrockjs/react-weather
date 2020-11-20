import React from "react";
import {Row} from "react-materialize";
import {NavLink} from "react-router-dom";

const Error404 = () => {
    return <Row>
        <div className="col s12">
            <h1>Error 404: Page not found</h1>
        </div>
        <div className="col s12">
            <p>Something went wrong. But we will not leave you, click the button below.</p>
            <NavLink to="/" className="waves-effect waves-light btn blue darken-1"> <i className="material-icons right">cloud</i> На главную </NavLink>
        </div>
    </Row>
}

export default Error404