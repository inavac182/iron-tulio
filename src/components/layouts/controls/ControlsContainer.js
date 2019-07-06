import React from 'react';
import NewList from './NewList';
import FilterLists from './FilterLists';

class ControlsContainer extends React.Component {
    render() {
        return (
            <section id='controls'>
            	<div id='controlsContainer'>
	                <NewList addList={this.props.addList} />
	                <FilterLists />
	                <div className='clearer' />
                </div>
            </section>
        );
    }
}

export default ControlsContainer;
