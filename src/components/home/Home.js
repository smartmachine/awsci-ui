import React, {Component} from "react";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import {connect} from "react-redux";

import {getUserInfo} from "../../actions/userInfoActions";

class Home extends Component {

    componentDidMount() {
        console.log('Home.componentDidMount()');
        console.log('  Properties:', this.props);
        console.log('  State:     ', this.state);
        if (!this.props.hasProfile) {
            this.props.getUserInfo(this.props.accessToken);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('Home.componentDidUpdate()');
        console.log('  Properties:', this.props);
        console.log('  State:     ', this.state);
    }

    render() {
        return (
            <div>
                <Container className="p-3">
                    <Jumbotron>
                        <h1 className="header">Welcome To AWSci</h1>
                        <p>Hello {this.props.firstName} {this.props.lastName}!</p>
                        <p>We can reach you at {this.props.email}.</p>
                        <p>Logged in!</p>
                    </Jumbotron>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    firstName: state.userInfo.name,
    lastName: state.userInfo.family_name,
    hasProfile: state.userInfo.hasContent,
    email: state.userInfo.email,
    accessToken: state.session.access_token
});

const mapDispatchToProps = dispatch => ({
    getUserInfo: (accessToken) => dispatch(getUserInfo(accessToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);