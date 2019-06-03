import React from 'react';
import Card from '../items/Card';

class CardsContainer extends React.Component {
    state = {
        listId: ''
    }

    componentDidMount() {
        this.setState({
            listId: `cards-for-list-${this.props.listKey}`
        })
    }

    componentDidUpdate() {
        const listElement = document.getElementById(`cards-for-list-${this.props.listKey}`);

        if (listElement && listElement.scrollHeight) {
            listElement.scrollTop = listElement.scrollHeight;
        }
    }

    render() {
        if (!this.props.itemsObj.items) {
            return <div className='noCardsAdded' />;
        }

        return (
            <div id={this.state.listId} className='cardsContainer'>
                {Object.keys(this.props.itemsObj.items).map(key => (<Card
                    key={key}
                    index={key}
                    listKey={this.props.listKey}
                    updateItem={this.props.updateItem}
                    item={this.props.itemsObj.items[key]} />
                ))}
            </div>);
    }
}

export default CardsContainer;
