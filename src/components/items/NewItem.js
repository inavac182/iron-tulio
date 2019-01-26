import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class NewItem extends React.Component {
    state = {
        title: ''
    }

    constructor(props) {
        super(props);
        this.contentEditable = React.createRef();
    }

    onKeyPressed = e => {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    }

    onSubmitForm = e => {
        e.preventDefault();
        this.props.addItem(this.state.title, this.props.listIndex);
    }

    updateTitle = input => {
        this.setState({ title: input.target.value });
    }

    render() {
        return (
            <form className='newItemForm' onSubmit={this.onSubmitForm}>
                <input
                    type='text'
                    placeholder='New card title'
                    defaultValue={this.state.title}
                    onChange={this.updateTitle}
                    required />
                <button type='submit' className='accept'>
                    <FontAwesomeIcon icon={faPlus} className='icon' />
                </button>
                <div className='clearer' />
            </form>
        );
    }
}

export default NewItem;
