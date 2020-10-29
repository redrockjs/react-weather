import React from "react"
import {NavLink} from "react-router-dom"
import {Icon, Navbar, NavItem} from "react-materialize"

export const Navigation = () => {
    return (
        <Navbar
            className=" blue darken-3"
            alignLinks="right"
            brand={<a className="brand-logo" href="#">isCloudly?!<Icon>cloud</Icon></a>}
            id="mobile-nav"
            menuIcon={<Icon>menu</Icon>}
            centerChildren={true}
            options={{
                draggable: true,
                edge: 'left',
                inDuration: 250,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                outDuration: 200,
                preventScrolling: true,
            }}>
            <NavLink to="/">
                <NavItem>
                    Main
                    <Icon left>
                        home
                    </Icon>
                </NavItem>
            </NavLink>
            <NavLink to="/favorites">
                <NavItem>
                    Favorites
                    <Icon left>
                        view_module
                    </Icon>
                </NavItem>
            </NavLink>
        </Navbar>
    )
}