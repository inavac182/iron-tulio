import React, { Component } from 'react';
import { DropTarget } from "react-dnd";

class CardDropppingArea extends Component {

    render () {
        const { isOver, connectDropTarget, isSelf } = this.props;
        let classes = 'droppableArea';

        if (isOver) {
            classes = `isHover ${classes}`;
        }

        if (isSelf) {
            classes = `isSelf ${classes}`;
        }

        return connectDropTarget(
            <div className={classes} >
                <div className='dropPlaceHolder' style={{height: this.props.draggingInfo.height}}></div>
            </div>)
    }
}

const spec = {
    drop(props, monitor, component) {
        const item = monitor.getItem();

        if (props.removePlaceHolder) {
            props.removePlaceHolder();
        }

        props.moveItem(item, props.listKey, props.index);
        props.setDraggingInfo({
            isDragging: false,
            height: 0
        });
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop()
    };
}

export default DropTarget("SOURCE", spec, collect)(CardDropppingArea);
