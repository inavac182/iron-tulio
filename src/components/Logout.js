import React from 'react';
import { firebaseApp } from '../base';

class Logout extends React.Component {
    logout (e) {
        e.preventDefault();
        firebaseApp.auth().signOut();
    }

    handleChange (e) {
        this.setState({ [e.target.name]: e.target.value});
    }

    render() {
        return (
            <button onClick={this.logout} style={{width:'100px'}} className='cancel'>
                Log out
            </button>
        )
    }
}

export default Logout;
