import React from 'react';
import BoardsPanel from './BoardsPanel';
import Loader from './Loader';
import { firebaseApp } from '../base';
let authListener;
let observerForProjects;

class App extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            user: null,
            projects: null,
            loading: true
        }
    }

    getBoards = async user => {
        const db = firebaseApp.firestore();
        let query = db.collection('projects').where('user', '==', user.uid);

        observerForProjects = await query.onSnapshot(querySnapshot => {
            console.log('A change');
            let projects = {};

             querySnapshot.forEach(doc => {
                projects[doc.id] = doc.data();
            });

            console.log(projects);
            this.setState({ user, projects, loading: false});
        }, err => {
            console.log(`Encountered error: ${err}`);
        });
    };

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

                this.getBoards(userData);
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
        observerForProjects();
    }

    render() {
        if (this.state.loading) {
            return <Loader loaded={this.state.loaded} theme={this.props.theme}/>;
        } else {
            return <BoardsPanel projects={this.state.projects}/>;
        }
    }
}

export default App;
