import React from 'react';
import NewList from './NewList';
import FilterList from './FilterList';

class ListControls extends React.Component {
    render() {
        return (
            <section id='controls'>
            	<div id='controlsContainer'>
	                <NewList addList={this.props.addList} />
	                <FilterList />
	                <div className='clearer' />
                </div>
            </section>
        );
    }
}

export default ListControls;
