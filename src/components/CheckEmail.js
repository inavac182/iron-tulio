import React from 'react';

class CheckEmail extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            dark: 'is-dark'
        }
    }

    render () {
        return (
            <div id='content' className={this.state.dark}>
                <div className='jumbox'>
                    <div className='title'>
                        <h1>A verification email has been sent to your mail, please verify it by clicking in the link inside the email. </h1>
                    </div>
                    <p>If you didn't get the email, you can fire it again in this button:</p>
                    <button className='warning sendAgainButton'>
                        Send again the email
                    </button>
                </div>
            </div>
        );
    }
}

export default CheckEmail;
