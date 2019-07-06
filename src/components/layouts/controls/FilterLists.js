import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSortDown } from '@fortawesome/free-solid-svg-icons';

class FilterList extends React.Component {
    state = {
        SelectedFilter: 'See all'
    }

    render() {
        return (
            <div id='filterLists'>
                <div className='selectedFilter'>
                    <span>
                        <FontAwesomeIcon icon={faCheckSquare} className='icon' />
                    </span>
                    {this.state.SelectedFilter}
                    <span>
                        <FontAwesomeIcon icon={faSortDown} className='iconOpenFilters' />
                    </span>
                </div>
                <div className='filterContent'>
                    <ul>
                        <li>See all</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default FilterList;
