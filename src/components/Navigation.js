import React from "react"
import {Icon, Navbar, NavItem} from "react-materialize";

export const Navigation = () => {
    return (
        <Navbar
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
            <NavItem href="/">
                Main
                <Icon left>
                    home
                </Icon>
            </NavItem>
            <NavItem href="/favorites">
                Favorites
                <Icon left>
                    view_module
                </Icon>
            </NavItem>
        </Navbar>
    )
}