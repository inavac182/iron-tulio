import React, { Fragment } from 'react';
import ListsContainer from './list/ListsContainer';
import ControlsContainer from './controls/ControlsContainer';
import Header from '../common/Header';
import { firebaseApp } from '../../base';
import Loader from '../Loader';
import uniqid from 'uniqid';
import { Redirect } from 'react-router-dom';
let authListener;
let observerForLists;

class Board extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            loading: true,
            lists: {},
            user: '',
            redirect: '',
            dragElement: {
                height: 0,
                isDragging: false,
            }
        }
    }

    getLists = async user => {
        const db = firebaseApp.firestore();
        const boardId = this.props.match.params.boardId;

        if (!boardId) {
            console.error('No board ID');
            return;
        }

        let query = db.collection('boards').doc(boardId).collection('lists');

        observerForLists = await query.onSnapshot(querySnapshot => {
            let lists = {};

             querySnapshot.forEach(list => {
                lists[list.id] = list.data();
            });

            this.setState({ user, lists, loading: false});
        }, err => {
            console.log(`Encountered error: ${err}`);
        });
    }

    checkUser = () => {
        authListener = firebaseApp.auth().onAuthStateChanged(user => {
            if (user) {
                if (!user.emailVerified) {
                    this.props.history.push("/checkEmail");
                    return;
                }

                const userData = {
                    name: user.displayName,
                    email: user.email,
                    photoUrl: user.photoURL,
                    uid: user.uid
                }

                this.getLists(userData);
            } else {
                this.setState({
                    user: false,
                    redirect: 'login'
                })
            }
        });
    };

    addList = listTitle => {
        let board = { ...this.state.board };

        if (!listTitle) {
            return;
        }

        if (!board.lists) {
            board.lists = {};
        }

        const listIndex = Object.keys(board.lists).length + 1;
        const listId = uniqid('list-');

        const newList = {
            title: listTitle,
            index: listIndex
        };

        board.lists[listId] = newList;
        this.setState({ board });
    }

    updateTitle = (key, value) => {
        let firebaseLists = { ...this.state.firebaseLists };
        firebaseLists.lists[key].title = value.target.value;
        this.setState({ firebaseLists });
    }

    removeList = key => {
        const board = { ...this.state.board };
        const list = { ...board.lists[key] };
        const indexDeleted = list.index;

        board.lists[key] = null;
        board.counter = board.counter - 1;

        // eslint-disable-next-line
        Object.keys(board.lists).map((key, listIndex) => {
            if (listIndex < indexDeleted) {
                // eslint-disable-next-line
                return;
            }

            board.lists[key].index = board.lists[key].index - 1;
        });

        this.setState({ board });
    }

    addItem = (itemTitle, listKey) => {
        let lists = this.state.board.lists;
        let list = lists[listKey];
        let items = { ...list.items };
        const cardKey = uniqid('card-');

        if (!itemTitle) {
            console.error('Can not create an item without title');
            return;
        }

        if (!list) {
            console.error('List key is not recognized');
            return;
        }

        if (!items) {
            items = {};
        }

        list.counter = list.counter + 1;

        items[cardKey] = {
            index: list.counter,
            title: itemTitle,
            listKey: listKey,
            cardKey: cardKey,
            status: 1,
            description: '',
            assignedPeople: {},
            owner: this.props.uid,
            labels: {}
        };

        list.items = items;
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
        let items = { ...list.items };

        items[itemKey] = item;

        list.items = items;
        lists[listKey] = list;

        this.setState({
            board: {
                lists: lists
            }
        });
    }

    deleteItem = (itemKey, listKey, saveToState = true) => {
        const board = { ...this.state.board };
        const list = board.lists[listKey];
        const items = { ...list.items };

        list.counter = list.counter - 1;
        const indexItemDeleted = items[itemKey].index;
        items[itemKey] = null;

        // eslint-disable-next-line
        Object.keys(items).map((key, itemIndex) => {
            if ((itemIndex + 1) < indexItemDeleted) {
                // eslint-disable-next-line
                return;
            }
            if (items[key] !== null) {
                items[key].index = items[key].index - 1;
            }
        });

        list.items = items;
        board.lists[listKey] = list;

        if (!saveToState) {
            return list;
        }

        this.setState({ board });
    }

    moveItem = (sourceItem, targetListKey, targetIndex) => {
        const board = { ...this.state.board };
        const targetList = board.lists[targetListKey];

        //Delete item from the source list
        const sourceListKey = sourceItem.listKey;
        const sourceCardKey = sourceItem.cardKey;
        const sourceList = this.deleteItem(sourceCardKey, sourceListKey, false);
        board.lists[sourceListKey] = sourceList;

        //Create new item in the target list
        const targetItems = { ...targetList.items };
        const targetListIsEmpty = Object.keys(targetItems).length === 0;
        const newCardKey = uniqid('card-');
        let indexForNewItem = 1;

        if (targetListIsEmpty) {
            targetList.counter = 1;
            indexForNewItem = targetList.counter;
        } else {
            targetList.counter = targetList.counter + 1;

            if (targetIndex === 'last') {
                indexForNewItem = Object.keys(targetItems).length + 1;
            } else {
                // eslint-disable-next-line
                Object.keys(targetItems).map((key, itemIndex) => {
                    if ((itemIndex + 1) < targetIndex) {
                        // eslint-disable-next-line
                        return;
                    }

                    if (targetItems[key] !== null) {
                        targetItems[key].index = targetItems[key].index + 1;
                    }
                });

                indexForNewItem = targetIndex;
            }
        }

        targetItems[newCardKey] = sourceItem;
        const newItem = targetItems[newCardKey];

        newItem.listKey = targetListKey;
        newItem.index = indexForNewItem;
        newItem.cardKey = newCardKey;

        targetList.items = targetItems;
        board.lists[targetListKey] = targetList;

        this.setState({ board });
    }

    setDraggingInfo = dragElement =>{
        this.setState({ dragElement })
    }

    componentDidMount () {
        this.checkUser();
    }

    componentWillUnmount() {
        authListener();
        if (observerForLists) {
            observerForLists();
        }
    }

    render() {
        let classes = 'colsView';

        if (this.state.redirect !== '') {
            return <Redirect to='/login' />
        }

        if (this.state.board === '') {
            return (<h1>This is the board :D</h1>);
        }

        if (this.state.dragElement.isDragging) {
            classes = `${classes} isDragging`;
        }

        if (this.state.loading) {
            return <Loader
                    loaded={this.state.loading}
                    theme={this.props.theme}/>;
        } else {
            return (
                <Fragment>
                    <Header user={this.state.user}/>
                    <ControlsContainer addList={this.addList} />
                    <div id='board-container'>
                        <div id='board' className={classes}>
                            <ListsContainer
                                lists={this.state.lists}
                                removeList={this.removeList}
                                updateTitle={this.updateTitle}
                                addItem={this.addItem}
                                moveItem={this.moveItem}
                                updateItem={this.updateItem}
                                setDraggingInfo={this.setDraggingInfo}
                                draggingInfo={this.state.dragElement} />
                        </div>
                    </div>
                </Fragment>
            )
        }
    }
}

export default Board;
