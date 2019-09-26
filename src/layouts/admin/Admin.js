import React, {useState} from "react";

// Important to load local CSS first so it actually overrides bootstrap
import "./Admin.css"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useSelector} from "react-redux";

import Sidebar from "../../components/sidebar/Sidebar";
import Navigation from "../../components/navigation/Navigation";
import Layouts from "../../components/layouts/Layouts";

const Admin = () => {

    const [title, setTitle] = useState('Admin');
    const firstName = useSelector(state => state.userInfo.name);

    return (
        <Container fluid={true} className="pl-0 pr-0">
            <Row>
                <Col sm={2} className="pr-0">
                    <Sidebar/>
                </Col>
                <Col sm={10} className="pl-0 content-panel">
                    <Navigation navigationTitle={title} userName={firstName}/>
                    <Layouts titleSetter={setTitle}/>
                </Col>
            </Row>
        </Container>
    );
};

export default Admin;