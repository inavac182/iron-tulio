import React from 'react';
import NewList from './NewList';
import FilterList from './FilterList';

class ListControls extends React.Component {
    render() {
        return (
            <section id='controls'>
                <NewList addList={this.props.addList} />
                <FilterList />
                <div className='clearer' />
            </section>
        );
    }
}

export default ListControls;
