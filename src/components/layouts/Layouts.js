import React from "react";
import * as PropTypes from 'prop-types';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";

import Repositories from "../../views/Repositories";

const Layouts = (props) => {
    return (
        <Container fluid className="pt-3 pb-3">
            <Row>
                <Col sm={1} />
                <Col sm={10} className="card-columns">
                    <Switch>
                        <Route path={`${props.match.path}/repos`}>
                            <Repositories titleSetter={props.titleSetter}/>
                        </Route>
                        <Redirect from={props.match.path} to={`${props.match.path}/repos`} exact push />>
                    </Switch>
                </Col>
                <Col sm={1}/>
            </Row>
        </Container>
    )
};

Layouts.propTypes = {
    titleSetter: PropTypes.func.isRequired
};

export default withRouter(Layouts);