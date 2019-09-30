import React from "react";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import {Link} from "react-router-dom";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {faIndustry, faLayerGroup} from "@fortawesome/free-solid-svg-icons";

import './Sidebar.css';

const Sidebar = () => {

    return (
        <Card bg={"dark"} border={"dark"} text={"light"} className="sidebar-square-corners  min-vh-100">
            <Card.Body className="flex-grow-0">
                <Card.Title><Link to="/">AWSci Console</Link></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    Navigation
                </Card.Subtitle>
            </Card.Body>
            <ListGroup className="sidebar-menu flex-grow-1" variant="flush">
                <ListGroupItem>
                    <Link to="/admin/repos">
                        <FontAwesomeIcon icon={faGithub} inverse={true}/>&nbsp;&nbsp;Repositories
                    </Link>
                </ListGroupItem>
                <ListGroupItem>
                    <Link to="/admin/pipelines">
                        <FontAwesomeIcon icon={faIndustry} inverse={true}/>&nbsp;&nbsp;Pipelines
                    </Link>
                </ListGroupItem>
                <ListGroupItem>
                    <Link to="/admin/environments">
                        <FontAwesomeIcon icon={faLayerGroup} inverse={true}/>&nbsp;&nbsp;Environments
                    </Link>
                </ListGroupItem>
            </ListGroup>
            <Card.Footer>
                <Card.Link href="https://smartmachine.io">
                    <small className="text-muted">&copy; 2019 SmartMachine AB</small>
                </Card.Link>
            </Card.Footer>
        </Card>
    )
};

export default Sidebar;
