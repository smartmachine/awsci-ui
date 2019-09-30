import React, {useState} from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useSelector} from "react-redux";

import Sidebar from "../../components/sidebar/Sidebar";
import Navigation from "../../components/navigation/Navigation";
import Layouts from "../../components/layouts/Layouts";

import "./Admin.css"

const Admin = () => {

    const [title, setTitle] = useState('Admin');
    const firstName = useSelector(state => state.userInfo.name);

    return (
        <Container fluid className="px-0">
            <Row className="mr-0">
                <Col sm={2} className="pr-0">
                    <Sidebar/>
                </Col>
                <Col sm={10} className="mr-0 px-0 content-panel">
                    <Navigation navigationTitle={title} userName={firstName}/>
                    <Layouts titleSetter={setTitle}/>
                </Col>
            </Row>
        </Container>
    );
};

export default Admin;