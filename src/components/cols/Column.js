import React, { Fragment } from 'react';
import Card from '../items/Card';
import NewList from './NewList';

class List extends React.Component {
    render() {
        return (
            <Fragment>
                <div className='list'>
                    <Card />
                </div>
                <NewList />
            </Fragment>
        );
    }
}

export default List;
