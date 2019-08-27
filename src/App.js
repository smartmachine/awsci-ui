import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";

class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { githubURL: '' };
    }
    
    componentDidMount() {

        let host = "https://github.com/login/oauth/authorize?";

        let queryData = {
            client_id: "9ba972db1d356346f618",
            redirect_uri: "https://awsci.io",
            scope: "read:user repo",
            allow_signup: "false"
        };

        this.setState({githubURL: host + App.encodeQueryData(queryData)});
    }

    static encodeQueryData(data) {
        const ret = [];
        for (let d in data)
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        return ret.join('&');
    }

    render() {
        return (
            <div>
                <Container className="p-3">
                    <Jumbotron>
                        <h1 className="header">Welcome To AWSci</h1>
                        <Button href={this.state.githubURL}>Login with Github</Button>
                    </Jumbotron>
                </Container>

            </div>
        );
    }
}

export default App;
