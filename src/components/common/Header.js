import React from 'react';
import icon from '../../img/icon.png';
import Logout from '../Logout';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    render() {
        return (
            <header>
                <div className='logoContainer'>
                    <img src={icon} alt='Icon' className='icon'/>
                    <h2 className='title'> IronTulio</h2>
                </div>
                <div className='logOutContainer'>
                    {
                        this.props.user ?
                            <Logout /> :
                            <Link to='/login' className='success'> Log in </Link>
                    }
                </div>
            </header>
        );
    }
}

export default Header;
