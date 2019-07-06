import React from 'react';
import { firebaseApp } from '../base';
import { Link } from 'react-router-dom';

class Signup extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            dark: 'is-dark',
            name: '',
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value});
    }

    signup = async (e) => {
        let user;
        const userName = this.state.name;

        e.preventDefault();
        console.log('Creating user');

        await firebaseApp
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                user = firebaseApp.auth().currentUser;
                user.sendEmailVerification();
            })
            .then(() => {
                user.updateProfile({
                  displayName: userName
                });

                this.props.history.push("/checkEmail");
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div id='content' className={this.state.dark}>
                <form id='signup' className='jumbox'>
                    <h1>Create an iron account</h1>
                    <div className='nameContainer'>
                        <label htmlFor='userName'> Name</label>
                        <input value={this.state.name}
                            onChange={this.handleChange}
                            type='text'
                            name='name'
                            id='name-of-user'
                            placeholder='e.g. Felipe Nava'
                            autoComplete='current-name' />
                    </div>
                    <div className='emailContainer'>
                        <label htmlFor='userEmail'> Email</label>
                        <input value={this.state.email}
                            onChange={this.handleChange}
                            type='email'
                            name='email'
                            id='userEmail'
                            aria-describedby='emailHelp'
                            placeholder='e.g. felipenava@iron.com'
                            autoComplete='current-email' />
                        <small id='emailHelp'>We'll never share your email with anyone else.</small>
                    </div>
                    <div className='passContainer'>
                        <label htmlFor='userPassword'> Password</label>
                        <input value={this.state.password}
                            onChange={this.handleChange}
                            type='password'
                            name='password'
                            id='userPassword'
                            placeholder='e.g. •••••••••••••••••••••'
                            autoComplete='current-password' />
                    </div>
                    <div className='actionButtons'>
                        <button
                            type='submit'
                            className='accept'
                            onClick={this.signup}>
                            Create account
                        </button>
                        <Link to='/login' className='warning'>
                            Or login with existing account
                        </Link>
                    </div>
               </form>
           </div>
        );
    }
}

export default Signup;
