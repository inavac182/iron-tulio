import React from 'react';
import List from './List';
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

class ListsContainer extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            droppedItem: {},
        };
    }

    render() {
        if (!this.props.lists) {
            return <div id='emptyLists'><p>No lists created yet</p></div>;
        }

        return Object.keys(this.props.lists).map(key => (<List
            key={key}
            listId={key}
            listKey={this.props.listKey}
            list={this.props.lists[key]}
            removeList={this.props.removeList}
            updateListName={this.props.updateListName}
            updateItem={this.props.updateItem}
            addCard={this.props.addCard}
            droppedItem={this.state.droppedItem}
            moveItem={this.props.moveItem}
            setDraggingInfo={this.props.setDraggingInfo}
            draggingInfo={this.props.draggingInfo} />
        ));
    }
}

const ContainerWrapper = DragDropContext(HTML5Backend)(ListsContainer);
export default ContainerWrapper;
