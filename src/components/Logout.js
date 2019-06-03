import React from 'react';
import Header from './Header';
import { firebaseApp } from '../base';

class Page extends React.Component {
    constructor (props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout (e) {
        e.preventDefault();
        firebaseApp.auth().signOut();
    }

    handleChange (e) {
        this.setState({ [e.target.name]: e.target.value});
    }

    render() {
        return <button onClick={this.logout} style={{width:'100px'}}>Log out </button>
    }
}

export default Page;
