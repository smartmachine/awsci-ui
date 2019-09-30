import React, {Fragment, useEffect} from 'react'
import * as PropTypes from 'prop-types';
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

const Settings = (props) => {

    const pageTitle = 'Settings';

    useEffect(() => {
        props.titleSetter(pageTitle);
    }, [props]);

    return (
        <Fragment>
            <Alert variant="info">
                <Alert.Heading>Github Configuration</Alert.Heading>
                <p>
                    Great, you have setup up your account.  Now it is time to add Github permissions.
                </p>
            </Alert>
            <Card>
                <Card.Body>
                    <Card.Title>Settings</Card.Title>
                    <Card.Text>
                        Settings
                    </Card.Text>
                </Card.Body>
            </Card>
        </Fragment>
    )
};

Settings.propTypes = {
    titleSetter: PropTypes.func.isRequired
};

export default Settings;