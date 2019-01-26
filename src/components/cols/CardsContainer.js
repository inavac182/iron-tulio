import React from 'react';
import Card from '../items/Card';

class CardsContainer extends React.Component {
    render() {
        if (!this.props.itemsObj.items) {
            return <div className='noCardsAdded' />;
        }

        return (Object.keys(this.props.itemsObj.items).map(key => (<Card
            key={key}
            index={key}
            listKey={this.props.listKey}
            updateItem={this.props.updateItem}
            item={this.props.itemsObj.items[key]} />
        )));
    }
}

export default CardsContainer;
