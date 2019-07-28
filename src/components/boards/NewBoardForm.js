
import React from 'react';

class NewBoardForm extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            boardName: ''
        }
    }

    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    addBoard = e => {
        e.preventDefault();
        const boardName = this.state.boardName;

        this.props.addBoard(boardName);
        this.setState({
            boardName: ''
        });
    }

    render() {
        return (
            <div className='inline-form new-board-form'>
                <form onSubmit={this.addBoard} >
                     <div className='input-row'>
                        <label htmlFor='board-name' className='visuallyHidden'> New board</label>
                        <input value={this.state.boardName}
                            onChange={this.updateInput}
                            type='text'
                            name='boardName'
                            id='board-name'
                            placeholder='New board title' />
                    </div>
                </form>
            </div>
        )
    }
}

export default NewBoardForm;
