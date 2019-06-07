import React, { Fragment } from 'react';
import ColumnsContainer from './cols/ColumnsContainer';
import ListControls from './lists/ListControls';
import base from '../base';
import uniqid from 'uniqid';

class Board extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            board: ''
        }
    }

    addList = listTitle => {
        let state = { ...this.state.board };

        if (!listTitle) {
            return;
        }

        if (!state.lists) {
            state.lists = {};
        }

        state.lists[uniqid('list-')] = {
            title: listTitle,
            id: uniqid('list-'),
            itemsObj: {}
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
        const cardKey = uniqid('card-');

        if (!itemTitle) {
            console.error('Can not create an item without title');
            return;
        }

        if (!list) {
            console.error('List key is not recognized');
            return;
        }

        if (!itemsObj.items) {
            itemsObj.items = {};
        }

        itemsObj.items[cardKey] = {
            title: itemTitle,
            listKey: listKey,
            cardKey: cardKey,
            status: 1,
            description: '',
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

    moveCardToList = (card, newListKey) => {
        if (card.listKey === newListKey) {
            console.log('Same list');
            return;
        }

        let board = { ...this.state.board };
        const newListObj = board.lists[newListKey];

        if (!newListObj.itemsObj) {
            newListObj.itemsObj = {
                items: {}
            };
        }

        newListObj.itemsObj.items[card.cardKey] = card;

        const prevListObj = board.lists[card.listKey];
        prevListObj.itemsObj.items[card.cardKey] = null;
        board.lists[card.listKey] = prevListObj;

        newListObj.itemsObj.items[card.cardKey].listKey = newListKey;
        board.lists[newListKey] = newListObj;

        this.setState({ board })
    }

    componentDidMount () {
        this.ref = base.syncState(`board-${this.props.uid}`, {
            context: this,
            state: 'board'
        });
    }

    render() {
        if (this.state.board === '') {
            return (<h1>Loading Board...</h1>);
        }

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
                            moveCardToList={this.moveCardToList}
                            updateItem={this.updateItem} />
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Board;
