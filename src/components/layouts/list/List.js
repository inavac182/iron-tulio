import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ContentEditable from 'react-contenteditable';
import NewCard from './NewCard';
import CardsContainer from './CardsContainer';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.contentEditable = React.createRef();
    }

    onKeyPressed = e => {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    }

    render() {
        return (
            <div className='column'>
                <div className='listContainer'>
                    <div className='listHeader'>
                        <ContentEditable
                            className='inputTitle'
                            innerRef={this.contentEditable}
                            html={this.props.list.name}
                            disabled={false}
                            onKeyDown={this.onKeyPressed}
                            onChange={value => this.props.updateListName(this.props.listId, value)}
                            tagName='article' />

                        <button className='cancel removeList' type='button'
                            onClick={() => this.props.removeList(this.props.listId)} >
                            <FontAwesomeIcon icon={faTrashAlt} className='icon' />
                        </button>
                    </div>

                    <CardsContainer
                        listKey={this.props.listId}
                        items={this.props.list.items}
                        updateItem={this.props.updateItem}
                        droppedItem={this.props.droppedItem}
                        moveItem={this.props.moveItem}
                        setDraggingInfo={this.props.setDraggingInfo}
                        draggingInfo={this.props.draggingInfo} />

                    <NewCard
                        listIndex={this.props.index}
                        addCard={this.props.addCard}
                    />
                </div>
            </div>
        );
    }
}

export default List;
