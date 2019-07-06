import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

class NewList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newTitle: ''
        };

        this.baseState = this.state;
    }

    resetState = () => {
        this.setState(this.baseState);
    }

    addList = event => {
        event.preventDefault();

        const newListTitle = this.state.newTitle;
        this.props.addList(newListTitle);
        this.resetState();
    }

    updateTitle = (input) => {
        this.setState({ newTitle: input.target.value });
    }

    render() {
        return (
            <div className='addListForm'>
                <form onSubmit={this.addList}>
                    <input
                        className='title'
                        type='text'
                        placeholder='New list title'
                        value={this.state.newTitle}
                        onChange={input => this.updateTitle(input)}
                        required/>
                    <div className='buttonCtrl'>
                        <button className='accept' type='submit'>
                            <FontAwesomeIcon icon={faPlus} className='icon' />
                        </button>
                        <button className='cancel' type='button' onClick={this.resetState}>
                            <FontAwesomeIcon icon={faTrashAlt} className='icon' />
                        </button>
                        <div className='clearer' />
                    </div>
                </form>
            </div>
        );
    }
}

export default NewList;
