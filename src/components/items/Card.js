import React from 'react';
import AssignedView from './AssignedView';
import Labels from './Labels';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faUndoAlt } from '@fortawesome/free-solid-svg-icons';

class Card extends React.Component {
    toggleStatus = () => {
        let item = { ...this.props.item };

        if (item.status === 1) {
            item.status = 2;
        } else {
            item.status = 1;
        }

        this.props.updateItem(item, this.props.index, this.props.listKey);
    }

    render() {
        let iconInButton = faCheckSquare;

        if (this.props.item.status === 2) {
            iconInButton = faUndoAlt;
        }

        return (
            <div className={`item status-${this.props.item.status}`}>
                <div className='actionButton'>
                    <button className='accept checkbox' onClick={this.toggleStatus}>
                        <FontAwesomeIcon icon={iconInButton} className='icon' />
                    </button>
                </div>
                <div className='main'>
                    <Labels />
                    <div className='title wordwrap'>
                        {this.props.item.title}
                    </div>
                    <AssignedView />
                </div>
                <div className='clearer' />
            </div>
        );
    }
}

export default Card;
