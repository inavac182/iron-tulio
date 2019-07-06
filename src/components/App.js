import React from 'react';
import Board from './layouts/Board';
import Header from './common/Header';
import { firebaseApp } from '../base';
let authListener;

class App extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            user: null,
            loaded: false,
            theme: 'purple'
        }
    }

    checkUser = () => {
        authListener = firebaseApp.auth().onAuthStateChanged(user => {
            if (user) {
                if (!user.emailVerified) {
                    this.props.history.push("/checkEmail");
                    return;
                }

                const userData = {
                    name: user.displayName,
                    email: user.email,
                    photoUrl: user.photoURL,
                    uid: user.uid
                }

                this.setState({
                    user: userData,
                    loaded: true
                });
            } else {
                this.props.history.push("/login");
            }
        });
    };

    componentDidMount() {
        this.checkUser();
    }

    componentWillUnmount() {
        authListener();
    }

    render() {
        if (!this.state.loaded) {
            return (<h1>Loading App..</h1>);
        }

        return (
            <div id='content' className={this.state.theme}>
                <Header />
                <Board uid={this.state.user.uid} boardId='initial-board'/>
            </div>
        )
    }
}

export default App;
