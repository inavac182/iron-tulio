import React, { Fragment } from 'react';
import ColumnsContainer from './cols/ColumnsContainer';
import Header from './Header';

class App extends React.Component {
    render() {
        return (
            <Fragment>
                <Header />
                <div id='content' className='colsView'>
                    <ColumnsContainer />
                </div>
            </Fragment>
        );
    }
}

export default App;
