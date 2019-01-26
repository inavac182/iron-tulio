import React from 'react';
import Column from './Column';

class ColumnsContainer extends React.Component {
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
            addItem={this.props.addItem} />
        ));
    }
}

export default ColumnsContainer;
