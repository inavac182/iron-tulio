import React from 'react';
import { Link } from 'react-router-dom';

class BoardsList extends React.Component {
    render() {
        if (Object.keys(this.props.boards).length === 0) {
            return (<div id='boards-list'>
                    <p className='no-boards-message'>No boards created in this project</p>
                </div>);
        }

        return (
            <div id='boards-list'>
                {
                    Object.keys(this.props.boards).map((k, v) => {
                        const board = this.props.boards[k];
                        return <div key={k}>
                                <Link to={`/board/${k}`} className={`board-box ${board.theme}`}>
                                    {board.name}
                                </Link>
                            </div>
                    })
                }
            </div>
        )
    }
}

export default BoardsList;
