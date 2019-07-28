import React from 'react';
import BoardsPanel from './BoardsPanel';
import Loader from './Loader';
import { firebaseApp } from '../base';
import { Redirect } from 'react-router-dom';
let observerForProjects;
let authListener;

class App extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            user: this.props.user,
            projects: null,
            boards: null,
            loading: true,
            selectedProject: '',
            redirect: ''
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

                this.getProjects(userData);
            } else {
                this.setState({
                    user: false,
                    redirect: 'login'
                })
            }
        });
    };

    getProjects = async user => {
        const db = firebaseApp.firestore();
        let query = db.collection('projects').where('creator', '==', user.uid).orderBy('name');

        observerForProjects = await query.onSnapshot(querySnapshot => {
            let projects = {};

             querySnapshot.forEach(doc => {
                projects[doc.id] = doc.data();
            });

            this.setState({user, projects, boards: {}});
        }, err => {
            console.log(`Encountered error: ${err}`);
        });
    };

    getBoards = async (projectId) => {
        const db = firebaseApp.firestore();
        const user = this.state.user;

        let query = db.collection('boards')
                        .where('creator', '==', user.uid)
                        .where('project', '==', projectId)
                        .orderBy('name');

        observerForProjects = await query.onSnapshot(querySnapshot => {
            let boards = {};

             querySnapshot.forEach(doc => {
                boards[doc.id] = doc.data();
            });

            this.setState({ boards, loading: false, selectedProject: projectId });
        }, err => {
            console.log(`Encountered error: ${err}`);
        });
    };

    hideLoader = () => {
        this.setState({
            loading: false
        })
    }

    componentDidMount () {
        this.checkUser();
    }

    componentDidUpdate () {
        let selectedProject;

        if (this.props.match.params.projectId) {
            selectedProject = this.props.match.params.projectId;
        } else {
            const projects = this.state.projects;
            selectedProject = Object.keys(projects)[0];
        }

        if (selectedProject !== this.state.selectedProject) {
            this.getBoards(selectedProject);
        }
    }

    componentWillUnmount() {
        if (observerForProjects) {
            observerForProjects();
        }

        authListener();
    }

    render() {
        if (this.state.redirect !== '') {
            return <Redirect to='/login' />
        }

        if (this.state.loading) {
            return <Loader
                        loaded={this.state.loading}
                        theme={this.props.theme}/>;
        } else {
            return <BoardsPanel
                        user={this.state.user}
                        projects={this.state.projects}
                        boards={this.state.boards}
                        hideLoader={this.hideLoader}
                        selectedProject={this.props.match.params.projectId} />
        }
    }
}

export default App;
