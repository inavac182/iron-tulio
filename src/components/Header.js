import React from 'react';
import icon from '../img/icon.png';

class Header extends React.Component {
    render() {
        return (
            <header>
                <div className='logoContainer'>
                    <img src={icon} alt='Icon' className='icon'/>
                    <h2 className='title'> IronTul.io</h2>
                </div>
            </header>
        );
    }
}

export default Header;
