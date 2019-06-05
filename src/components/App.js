import React from 'react';
import Page from './Page';
import Board from './Board';
import Header from './Header';
import { firebaseApp } from '../base';

class App extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            user: null
        }
    }

    authListener () {
        firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            } else {
                this.setState({
                    user: null
                });
            }
        });
    }

    componentDidMount() {
        this.authListener();
    }


    render() {
        return (
            <div id='content'>
            <Header />
                { this.state.user ? (<Board uid={this.state.user.uid}/>) :  (<Page />) }
            </div>
        )
    }
}

export default App;
