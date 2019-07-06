import React from 'react';
import { firebaseApp } from '../base';
import queryString from 'query-string'

class VerifyAccnt extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            dark: 'is-dark',
            verified: false,
            errror: ''
        }
    }

    verifyEmail (attrs) {
        const auth = firebaseApp.auth();

        auth.applyActionCode(attrs.oobCode).then(resp => {
            this.setState({
                verified: true
            })
        }).catch(error => {
            console.log(error);
            this.setState({
                error: true
            })
        });
    }

    componentDidMount () {
        const values = queryString.parse(this.props.location.search)
        this.verifyEmail(values);
    }

    render() {
        const { verified } = this.state;
        let title = '';

        if (verified) {
            title = 'Your email has been verified';
        } else {
            title = 'Verifying the email...';
        }

        return (
             <div id='content' className={this.state.dark}>
                <div className='jumbox'>
                    <div className='title'>
                        <h1>{title}</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default VerifyAccnt;
