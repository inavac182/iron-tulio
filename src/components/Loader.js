import React from 'react';
import loader from '../img/loader.gif';
import darkLoader from '../img/dark-loading.gif';

class Loader extends React.Component {
    render () {
        return <div id='loader'>
            <div id='loader-content'>
                <img
                    className='loading-image'
                    src={this.props.theme === 'is-datk' ? loader : darkLoader}
                    alt='Loading application...' />
                <h2>Loading your irons</h2>
            </div>
        </div>
    }
}

export default Loader;
