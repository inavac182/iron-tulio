import React from 'react';

class NewList extends React.Component {
    render() {
        return (
            <div className='newList'>
                <form>
                    <span>+</span>
                    <input type='text' placeholder='New list name' />
                </form>
            </div>
        );
    }
}

export default NewList;
