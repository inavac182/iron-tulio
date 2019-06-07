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

    getCards () {
        if (this.props.itemsObj && this.props.itemsObj.items) {
            return Object.keys(this.props.itemsObj.items).map(key => (
                <Card
                    key={key}
                    index={key}
                    listKey={this.props.listKey}
                    updateItem={this.props.updateItem}
                    item={this.props.itemsObj.items[key]} />
                )
            )
        }
    }

    render() {
        const { isOver, connectDropTarget } = this.props;
        let classes = "cardsContainer";

        if (isOver) {
            classes = `cardHover ${classes}`;
        }

        if (!this.props.itemsObj) {
            classes = `noCardsAdded ${classes}`;
        }

        return connectDropTarget(
            <div id={this.state.listId} className={classes}>
                {this.getCards()}
            </div>
        );
    }
}

const spec = {
    drop(props, monitor, component) {
        const item = monitor.getItem();
        props.onDrop(item, props.listKey);
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
