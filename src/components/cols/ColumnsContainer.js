import React from 'react';
import Column from './Column';
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

class ColumnsContainer extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            droppedItem: {},
        };
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(item, droppedInList) {
        this.props.moveCardToList(item, droppedInList);
    }

    render() {
        if (!this.props.lists) {
            return <div id='emptyLists'><p>No lists created yet</p></div>;
        }

        return Object.keys(this.props.lists).map(key => (<Column
            key={key}
            index={key}
            listKey={this.props.listKey}
            list={this.props.lists[key]}
            removeList={this.props.removeList}
            updateTitle={this.props.updateTitle}
            updateItem={this.props.updateItem}
            addItem={this.props.addItem}
            droppedItem={this.state.droppedItem}
            onDrop={this.onDrop} />
        ));
    }
}

const ContainerWrapper = DragDropContext(HTML5Backend)(ColumnsContainer);
export default ContainerWrapper;
