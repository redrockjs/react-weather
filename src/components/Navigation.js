import React, {useContext} from "react"
import {NavLink} from "react-router-dom"
import {Icon, Navbar, NavItem} from "react-materialize"
import {AppContext} from "../context/appContext";

export const Navigation = () => {

    const {isAuth, authUserData} = useContext(AppContext)

    return (
        <Navbar
            className=" blue darken-3"
            alignLinks="right"
            brand={<a className="brand-logo" href=""><NavLink to="/">isCloudly?!<Icon>cloud</Icon></NavLink></a>}
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
            {isAuth
                ?
                <NavLink to="/login">
                    <NavItem>
                            <span>{authUserData.displayName} &nbsp;
                                <img src={authUserData.photoURL} style={{"width": "30px", "borderRadius": "50px"}}
                                     alt="" title={authUserData.displayName}/>
                            </span>
                    </NavItem>
                </NavLink>
                :
                <NavLink to="/login">
                    <NavItem>
                        Sign In
                        <Icon left>
                            vpn_key
                        </Icon>
                    </NavItem>
                </NavLink>
            }

        </Navbar>
    )
}