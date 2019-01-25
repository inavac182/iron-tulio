import React from 'react';
import Column from './Column';

class ColumnsContainer extends React.Component {
    render() {
        if (!this.props.lists) {
            return <p>No lists created yet</p>;
        }

        return Object.keys(this.props.lists).map(key => (<Column
            key={key}
            index={key}
            list={this.props.lists[key]}
            removeList={this.props.removeList} />
        ));
    }
}

export default ColumnsContainer;
