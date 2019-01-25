import React, { Fragment } from 'react';
import ColumnsContainer from './cols/ColumnsContainer';
import Header from './Header';
import ListControls from './lists/ListControls';
import base from '../base.js';

class App extends React.Component {
    state = {
        firebaseLists: {
            lists: {},
            counter: 0
        }
    }

    addList = listTitle => {
        let state = { ...this.state.firebaseLists };

        if (!listTitle) {
            return;
        }

        if (Object.keys(state).length === 0) {
            state.counter = 1;
            state.lists = {};
        } else {
            state.counter = state.counter + 1;
        }

        state.lists[state.counter] = {
            title: listTitle,
            items: {}
        };

        this.setState({ firebaseLists: state });
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

    componentDidMount() {
        this.ref = base.syncState('firebaseLists', {
            context: this,
            state: 'firebaseLists'
        });
    }

    render() {
        return (
            <Fragment>
                <Header />
                <ListControls addList={this.addList}/>
                <div id='content' className='colsView'>
                    <ColumnsContainer
                        lists={this.state.firebaseLists.lists}
                        removeList={this.removeList} />
                </div>
            </Fragment>
        );
    }
}

export default App;
