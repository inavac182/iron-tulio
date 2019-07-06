import React from 'react';
import { firebaseApp } from '../base';
import { Link } from 'react-router-dom'

class Login extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            dark: 'is-dark',
            email: '',
            password: ''
        }
    }

    login = (e) => {
        e.preventDefault();
        firebaseApp
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(resp => {
                if (resp.user.emailVerified) {
                    this.props.history.push("/");
                } else {
                    this.props.history.push("/checkEmail");
                }
            })
            .catch(error => {
                console.log(error);
            });
    }


    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value});
    }

    render() {
        return (
            <div id='content' className={this.state.dark}>
                <form id='login' className='jumbox'>
                  <h1>Please sign in with your iron account</h1>
                    <div className='emailContainer'>
                        <label htmlFor='userEmail'> Email</label>
                        <input value={this.state.email}
                            onChange={this.handleChange}
                            type='email'
                            name='email'
                            id='userEmail'
                            aria-describedby='emailHelp'
                            placeholder='e.g. felipenava@iron.com'
                            autoComplete='current-email'/>
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
                            autoComplete='current-password'/>
                    </div>
                    <div className='actionButtons'>
                        <button
                            type='submit'
                            className='accept'
                            onClick={this.login}>
                            Login
                        </button>
                        <Link to='/signup' className='warning'>
                            Create iron account
                        </Link>
                    </div>
               </form>
           </div>
        );
    }
}

export default Login;
