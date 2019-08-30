import React, {Component} from "react";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import {connect} from "react-redux";

class Home extends Component {

    componentDidMount() {
        console.log('Home.componentDidUpdate()');
        console.log('  Properties:', this.props);
        console.log('  State:     ', this.state);
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
                        <p/>
                        <p/>
                        <p>Logged in!</p>
                    </Jumbotron>
                </Container>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(Home);