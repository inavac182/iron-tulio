import React from 'react';
import AssignedView from './AssignedView';
import Labels from './Labels';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSquare
} from '@fortawesome/free-solid-svg-icons';
import { DragSource } from "react-dnd";

class CardContent extends React.Component {
    constructor (props) {
        super(props);

        let iconInButton = faSquare;

        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.state = {
            iconRendered: iconInButton,
            card: { ...this.props.card },
            classes: null,
            height: 0
        }
    }

    mouseEnter () {

    }

    mouseLeave () {

    }

    componentDidMount() {
        const height = this.divElement.clientHeight;
        this.setState({ height });
    }

    render() {
        const { connectDragSource } = this.props;

        return (
            <div className={`status cardContent`}>
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
                                {this.state.card.title}
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
