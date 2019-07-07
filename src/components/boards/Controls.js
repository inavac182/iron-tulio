import React from 'react';

class Controls extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            boardName: ''
        }
    }

    componentDidMount () {

    }

    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    addBoard = e => {
        e.preventDefault();
    }

    render() {
        return (
            <div id='board-controls'>
                <form onSubmit={this.addBoard} >
                     <div className='input-row'>
                        <label htmlFor='board-name'> New board</label>
                        <input value={this.state.name}
                            onChange={this.updateInput}
                            type='text'
                            name='boardName'
                            id='board-name'
                            placeholder='e.g. To Do for launch rocket' />
                    </div>
                </form>
            </div>
        )
    }
}

export default Controls;
