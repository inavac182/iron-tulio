import React, { Fragment } from 'react';
import ListsContainer from './list/ListsContainer';
import ControlsContainer from './controls/ControlsContainer';
import Header from '../common/Header';
import { firebaseApp } from '../../base';
import Loader from '../Loader';
import { Redirect } from 'react-router-dom';
let authListener;
let observerForLists;
let observerForBoard;

class Board extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            loading: true,
            board: {},
            lists: {},
            user: '',
            redirect: '',
            dragElement: {
                height: 0,
                isDragging: false
            }
        }
    }

    addList = title => {
        const db = firebaseApp.firestore();
        const lists = this.state.lists;
        const lastIndex = Object.keys(lists).length;
        const boardId = this.props.match.params.boardId;

        db.collection('boards').doc(boardId).collection('lists').add({
            name: title,
            index: lastIndex
        });
    }

    updateListName = (listId, value) => {
        const db = firebaseApp.firestore();
        const boardId = this.props.match.params.boardId;

        db.collection('boards').doc(boardId).collection('lists').doc(listId).set({
            name: value.target.value
        });
    }


    getBoard = async user => {
        const db = firebaseApp.firestore();
        const boardId = this.props.match.params.boardId;
        let board;
        const getDoc = await db.collection('boards').doc(boardId).get().then(doc => {
                if (!doc.exists) {
                  console.error('No such document!');
                } else {
                  board = doc.data();
                }
            }).catch(err => {
                console.log('Error getting document', err);
            });

            this.getLists(board, user);
    }

    getLists = async (board,user) => {
        const db = firebaseApp.firestore();
        const boardId = this.props.match.params.boardId;
        let query = db.collection('boards').doc(boardId).collection('lists').orderBy('index');;

        observerForLists = await query.onSnapshot(querySnapshot => {
            let lists = {};

             querySnapshot.forEach(list => {
                lists[list.id] = list.data();
            });

            this.setState({user, board, lists, loading: false});
        }, err => {
            console.log(`Encountered error: ${err}`);
        });
    }

    removeList = async listId => {
        const db = firebaseApp.firestore();
        const boardId = this.props.match.params.boardId;

        db.collection('boards').doc(boardId).collection('lists').doc(listId).delete();
    }

    addCard = async (cardName, listId) => {

    }

    moveItem = (sourceItem, targetListKey, targetIndex) => {
        console.log('Move Item');
    }

    setDraggingInfo = dragElement => {
        console.log('set Dragging info');
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

                this.getBoard(userData);
            } else {
                this.setState({
                    user: false,
                    redirect: 'login'
                });
            }
        });
    };

    componentDidMount () {
        this.checkUser();
    }

    componentWillUnmount() {
        authListener();

        if (observerForLists) {
            observerForLists();
            observerForBoard();
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
            const themeClass = this.state.board.theme;

            return (
                <Fragment>
                    <Header user={this.state.user}/>
                    <div id='board-container' className={themeClass}>
                        <ControlsContainer addList={this.addList} />
                        <div id='board' className={classes}>
                            <ListsContainer
                                lists={this.state.lists}
                                removeList={this.removeList}
                                updateListName={this.updateListName}
                                addCard={this.addCard}
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
