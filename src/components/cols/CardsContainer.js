import React from 'react';
import Card from '../items/Card';
import { DropTarget } from "react-dnd";

class CardsContainer extends React.Component {
    state = {
        listId: ''
    }

    componentDidMount() {
        this.setState({
            listId: `cards-for-list-${this.props.listKey}`
        })
    }

    componentDidUpdate() {
        const listElement = document.getElementById(`cards-for-list-${this.props.listKey}`);

        if (listElement && listElement.scrollHeight) {
            listElement.scrollTop = listElement.scrollHeight;
        }
    }

    render() {
        const { isOver, canDrop, connectDropTarget, droppedItem } = this.props;
        let classes = "cardsContainer";

        if (isOver) {
            classes = `cardHover ${classes}`;
        }

        if (!this.props.itemsObj.items) {
            classes = `noCardsAdded ${classes}`;
        }

        return connectDropTarget(
            <div id={this.state.listId} className={classes}>
                {getCards(this.props)}
            </div>
        );
    }
}

const getCards = (props) => {
    if (props.itemsObj && props.itemsObj.items) {
        return Object.keys(props.itemsObj.items).map(key => (
            <Card
                key={key}
                index={key}
                listKey={props.listKey}
                updateItem={props.updateItem}
                item={props.itemsObj.items[key]} />
            )
        )
    }
}

const spec = {
    drop(props, monitor, component) {
        const item = monitor.getItem();
        props.onDrop(item);
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

export default DropTarget("SOURCE", spec, collect)(CardsContainer);
