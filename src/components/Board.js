import React, { Fragment } from 'react';
import ColumnsContainer from './cols/ColumnsContainer';
import ListControls from './lists/ListControls';
import base from '../base';

class Board extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            board: {}
        }
    }

    addList = listTitle => {
        let state = { ...this.state.board };

        if (!listTitle) {
            return;
        }

        if (Object.keys(state).length === 0) {
            state.counter = 1;
        } else {
            state.counter = state.counter + 1;
        }

        if (!state.lists) {
            state.lists = {};
        }

        state.lists[state.counter] = {
            title: listTitle,
            itemsObj: {
                counter: 0
            }
        };

        this.setState({ board: state });
    }

    updateTitle = (key, value) => {
        let firebaseLists = { ...this.state.firebaseLists };
        firebaseLists.lists[key].title = value.target.value;
        this.setState({ firebaseLists });
    }

    removeList = key => {
        let lists = { ...this.state.board.lists };

        lists[key] = null;

        this.setState({
            board: {
                lists: lists
            }
        });
    }

    addItem = (itemTitle, listKey) => {
        let lists = this.state.board.lists;
        let list = lists[listKey];
        let itemsObj = { ...list.itemsObj };

        if (!itemTitle) {
            console.error('Can not create an item without title');
            return;
        }

        if (!list) {
            console.error('List key is not recognized');
            return;
        }

        if (itemsObj.counter === 0) {
            itemsObj.items = {};
        }

        itemsObj.counter = itemsObj.counter + 1;

        itemsObj.items[itemsObj.counter] = {
            title: itemTitle,
            status: 1,
            descript: '',
            assignedPeople: {},
            owner: this.props.uid,
            labels: {}
        };

        list.itemsObj = itemsObj;
        lists[listKey] = list;

        this.setState({
            board: {
                lists: lists
            }
        });
    }

    updateItem = (item, itemKey, listKey) => {
        let lists = this.state.board.lists;
        let list = lists[listKey];
        let itemsObj = { ...list.itemsObj };

        itemsObj.items[itemKey] = item;

        list.itemsObj = itemsObj;
        lists[listKey] = list;

        this.setState({
            board: {
                lists: lists
            }
        });
    }

    componentDidMount () {
        this.ref = base.syncState(`board-${this.props.uid}`, {
            context: this,
            state: 'board'
        });
    }

    render() {
        return (
            <Fragment>
                <ListControls addList={this.addList} />
                <div id='board-container'>
                    <div id='board' className='colsView'>
                        <ColumnsContainer
                            lists={this.state.board.lists}
                            removeList={this.removeList}
                            updateTitle={this.updateTitle}
                            addItem={this.addItem}
                            updateItem={this.updateItem} />
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Board;
