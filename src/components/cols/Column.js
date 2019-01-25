import React, { Fragment } from 'react';
import Card from '../items/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

class List extends React.Component {
    render() {
        return (
            <Fragment>
                <div className='list'>

                    <p className='listTitle'>{this.props.list.title}</p>

                    <button className='cancel removeList' type='button'
                        onClick={() => this.props.removeList(this.props.index)} >
                        <FontAwesomeIcon icon={faTrashAlt} className='icon' />
                    </button>

                    <div className='clearer' />
                    <Card />
                </div>
            </Fragment>
        );
    }
}

export default List;
