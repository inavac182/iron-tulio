import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class NewItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        };
        this.baseState = this.state;
        this.contentEditable = React.createRef();
    }

    onKeyPressed = e => {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    }

    resetState = () => {
        this.setState(this.baseState);
    }

    onSubmitForm = e => {
        e.preventDefault();
        this.props.addCard(this.state.title, this.props.listIndex);
        this.resetState();
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
                    value={this.state.title}
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
