import React, { Fragment } from 'react';
import Header from './common/Header';

const Home = () => (
    <Fragment>
        <Header />
        <div className='jumbox colored small'>
            <div className='title'>
                <h1>We are building something awesomee!! :v</h1>
            </div>
            <small>Wait for it :P </small>
        </div>
    </Fragment>
);

export default Home;
