import React from 'react';
import { firebaseApp } from '../base';

class Page extends React.Component {
    constructor (props) {
        super(props);
        this.login = this.login.bind(this);
        this.signUp = this.signUp.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
          email: '',
          password: ''
        }
    }

    login (e) {
        e.preventDefault();
        firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(error => {
            console.log(error);
        });
    }

    signUp (e) {
        e.preventDefault();
        firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(error => {
            console.log(error);
        });
    }

    handleChange (e) {
        this.setState({ [e.target.name]: e.target.value});
    }

    render() {
        return (
               <form id='login'>
                  <h1>Please sign in or sign up</h1>
                    <div className='emailContainer'>
                        <label htmlFor='userEmail' className='visuallyHidden'> Email address</label>
                        <input value={this.state.email} 
                            onChange={this.handleChange} 
                            type='email' 
                            name='email' 
                            id='userEmail' 
                            aria-describedby='emailHelp'
                            placeholder='Enter email' 
                      autoComplete='current-user'/>
                        <small id='emailHelp'>We'll never share your email with anyone else.</small>
                    </div>
                    <div className='passContainer'>
                        <label htmlFor='userPassword' className='visuallyHidden'> Password</label>
                        <input value={this.state.password} 
                            onChange={this.handleChange} 
                            type='password' 
                            name='password' 
                            id='userPassword'
                            placeholder='Password' 
                      autoComplete='current-password'/>
                    </div>
                    <div className='actionButtons'>
                        <button 
                            type='submit' 
                            className='accept'
                            onClick={this.login}>
                            Login
                        </button>
                        <button 
                            onClick={this.signUp}
                            className='warning'>
                            Sign up
                        </button>
                    </div>
               </form>
        );
    }
}

export default Page;
