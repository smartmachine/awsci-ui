import React, {Fragment, useEffect} from 'react'
import * as PropTypes from 'prop-types';
import Card from "react-bootstrap/Card";

const Repositories = (props) => {

    const pageTitle = 'Repositories';

    useEffect(() => {
        props.titleSetter(pageTitle);
    }, [props]);

    return (
        <Fragment>
            <Card>
                <Card.Body>
                    <Card.Title>Repositories</Card.Title>
                    <Card.Text>
                        All github repos I have access to.
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <Card.Title>Repositories</Card.Title>
                    <Card.Text>
                        All github repos I have access to.
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <Card.Title>Repositories</Card.Title>
                    <Card.Text>
                        All github repos I have access to.
                    </Card.Text>
                </Card.Body>
            </Card>
        </Fragment>
    )
};

Repositories.propTypes = {
    titleSetter: PropTypes.func.isRequired
};

export default Repositories;