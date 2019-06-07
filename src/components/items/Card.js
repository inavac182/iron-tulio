import React from 'react';
import AssignedView from './AssignedView';
import Labels from './Labels';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSquare,
    faCheckSquare,
    faUndoAlt
} from '@fortawesome/free-solid-svg-icons';
import { DragSource } from "react-dnd";

class Card extends React.Component {
    constructor (props) {
        super(props);

        let iconInButton = faSquare;
        if (this.props.item.status === 2) {
            iconInButton = faUndoAlt;
        }

        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.state = {
            iconRendered: iconInButton,
            item: { ...this.props.item }
        }
    }

    toggleStatus = () => {
        let item = { ...this.props.item };

        if (item.status === 1) {
            item.status = 2;

            this.setState({
                iconRendered: faUndoAlt,
                item: item
            });
        } else {
            item.status = 1;

            this.setState({
                iconRendered: faSquare,
                item: item
            });
        }

        this.props.updateItem(item, this.props.index, this.props.listKey);
    }

    mouseEnter () {
        if (this.state.item.status === 1) {
            this.setState({
                iconRendered: faCheckSquare
            });
        }
    }

    mouseLeave () {
        if (this.state.item.status === 1) {
            this.setState({
                iconRendered: faSquare
            });
        }
    }

    render() {
        const { connectDragSource } = this.props;

        return connectDragSource(
            <div className={`item status-${this.props.item.status}`}>
                <div className='actionButton'>
                    <button
                        className='accept checkbox'
                        onMouseEnter={this.mouseEnter}
                        onMouseLeave={this.mouseLeave}
                        onClick={this.toggleStatus}>
                            <FontAwesomeIcon icon={this.state.iconRendered} className='icon fa-xs' />
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

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource()
    };
}

const cardSource = {
    beginDrag(props, monitor, component) {
        return props.item;
    }
};


export default DragSource("SOURCE", cardSource, collect)(Card);
