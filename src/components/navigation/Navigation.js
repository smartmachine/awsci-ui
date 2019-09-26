import React, {useEffect, useState} from "react";
import * as PropTypes from 'prop-types';

import './Navigation.css'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import {LinkContainer} from "react-router-bootstrap";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt, faTools, faUser, faUserCog} from "@fortawesome/free-solid-svg-icons";

const Navigation = (props) => {

    const [userIcon, setUserIcon] = useState(<span><FontAwesomeIcon icon={faUser}/>&nbsp;&nbsp;...&nbsp;&nbsp;</span>);

    useEffect(() => {
        if (props.userName != null) {
            setUserIcon(<span><FontAwesomeIcon icon={faUser}/>&nbsp;&nbsp;{props.userName}&nbsp;&nbsp;</span>);
        }
    }, [props.userName]);

    return (
        <Navbar bg="light" variant="light" expand={true} className="bottom-border">
            <Navbar.Brand>{props.navigationTitle}</Navbar.Brand>
            <Nav className="ml-auto">
                <NavDropdown id='userMenu' title={userIcon}>
                    <LinkContainer to="/admin/profile">
                        <NavDropdown.Item><FontAwesomeIcon icon={faUserCog}/>&nbsp;&nbsp;Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/settings">
                        <NavDropdown.Item><FontAwesomeIcon icon={faTools}/>&nbsp;&nbsp;Settings</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider/>
                    <LinkContainer to="/logout">
                        <NavDropdown.Item><FontAwesomeIcon icon={faSignOutAlt}/>&nbsp;&nbsp;Logout</NavDropdown.Item>
                    </LinkContainer>
                </NavDropdown>
            </Nav>
        </Navbar>
    );
};

Navigation.propTypes = {
    userName:        PropTypes.string,
    navigationTitle: PropTypes.string.isRequired
};

export default Navigation;