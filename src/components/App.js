import React from 'react';
import Page from './Page';
import Board from './Board';
import Header from './Header';
import { firebaseApp } from '../base';

class App extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            user: null,
            verified: false
        }
    }

    authListener () {
        firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    user: user,
                    verified: true
                });
            } else {
                this.setState({
                    user: null,
                    verified: true
                });
            }
        });
    }

    componentDidMount() {
        this.authListener();
    }


    render() {
        if (!this.state.verified) {
            return (<h1>Loading App..</h1>);
        }

        return (
            <div id='content'>
            <Header />
                { this.state.user ? (<Board uid={this.state.user.uid}/>) :  (<Page />) }
            </div>
        )
    }
}

export default App;
