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

class CardContent extends React.Component {
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
            item: { ...this.props.item },
            classes: null,
            height: 0
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

    componentDidMount() {
        const height = this.divElement.clientHeight;
        this.setState({ height });
    }

    render() {
        const { connectDragSource } = this.props;

        return (
            <div className={`status-${this.props.item.status} cardContent`}>
                {connectDragSource(
                        <div className='cardContent' ref={ divElement => this.divElement = divElement}>
                        <div className='actionButton'>
                            <button
                                className='accept checkbox'
                                onMouseEnter={this.mouseEnter}
                                onMouseLeave={this.mouseLeave}
                                onClick={this.toggleStatus}>
                                    <FontAwesomeIcon
                                        icon={this.state.iconRendered}
                                        className='icon fa-xs' />
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
                )}
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
        props.setDraggingInfo({
            isDragging: true,
            height: component.state.height
        });

        setTimeout (props.showPlaceHolder, 100);
        return props.item;
    }
};


export default DragSource("SOURCE", cardSource, collect)(CardContent);
