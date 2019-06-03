import React, { Fragment } from 'react';
import ColumnsContainer from './cols/ColumnsContainer';
import Header from './Header';
import Page from './Page';
import Logout from './Logout';
import ListControls from './lists/ListControls';
import base, { firebaseApp } from '../base';

class App extends React.Component {
    constructor (props) {
        super(props); 
        this.state = {
            firebaseLists: {
                lists: {},
                counter: 0
            },
            user: {}
        }
    }

    authListener () {
        firebaseApp.auth().onAuthStateChanged((user) => {
            console.log(user);

            if (user) {
                this.setState({
                    user: user
                });
            } else {
                this.setState({
                    user: null
                });
            }
        });
    }

    addList = listTitle => {
        let state = { ...this.state.firebaseLists };

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

        this.setState({ firebaseLists: state });
    }

    updateTitle = (key, value) => {
        let firebaseLists = { ...this.state.firebaseLists };
        firebaseLists.lists[key].title = value.target.value;
        this.setState({ firebaseLists });
    }

    removeList = key => {
        let lists = { ...this.state.firebaseLists.lists };

        lists[key] = null;

        this.setState({
            firebaseLists: {
                lists: lists
            }
        });
    }

    addItem = (itemTitle, listKey) => {
        let lists = this.state.firebaseLists.lists;
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
            owner: 1,
            labels: {}
        };

        list.itemsObj = itemsObj;
        lists[listKey] = list;

        this.setState({
            firebaseLists: {
                lists: lists
            }
        });
    }

    componentDidMount() {
        this.authListener();
        this.ref = base.syncState('firebaseLists', {
            context: this,
            state: 'firebaseLists'
        });
    }

    updateItem = (item, itemKey, listKey) => {
        let lists = this.state.firebaseLists.lists;
        let list = lists[listKey];
        let itemsObj = { ...list.itemsObj };

        itemsObj.items[itemKey] = item;

        list.itemsObj = itemsObj;
        lists[listKey] = list;

        this.setState({
            firebaseLists: {
                lists: lists
            }
        });
    }

    render() {
        return (
            <div id='content'>
            <Header />
                { this.state.user ? (
                    <Fragment>
                        <Logout />
                        <ListControls addList={this.addList} />
                        <div id='board-container'>
                            <div id='board' className='colsView'>
                                <ColumnsContainer
                                    lists={this.state.firebaseLists.lists}
                                    removeList={this.removeList}
                                    updateTitle={this.updateTitle}
                                    addItem={this.addItem}
                                    updateItem={this.updateItem} />
                            </div>
                        </div>
                    </Fragment>
                    ) :  (<Page />) 
                }
            </div>
        )
    }
}

export default App;
