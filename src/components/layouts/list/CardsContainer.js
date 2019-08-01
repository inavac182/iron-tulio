import React from 'react';
import Card from '../cards/Card';
import CardDropppingArea from '../cards/CardDropppingArea';

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

    removePlaceHolder = () => {
        this.setState({
            classes: ''
        });
    }

    getCards = () => {
        return this.props.cards.map((card, key) => (
            <div key={key} >
                <Card
                    classes={this.state.classes}
                    listKey={this.props.listKey}
                    updateItem={this.props.updateItem}
                    index={key}
                    card={card}
                    removePlaceHolder={this.removePlaceHolder}
                    moveItem={this.props.moveItem}
                    setDraggingInfo={this.props.setDraggingInfo}
                    draggingInfo={this.props.draggingInfo} />
            </div>
        ))
    }

    render() {
        let classes = "cardsContainer";
        let renderCards = false;

        if (!this.props.items) {
            classes = `noCardsAdded ${classes} ${this.state.classes}`;
        }

        if (this.props.cards && this.props.cards) {
            renderCards = true;
        }

        return (
            <div id={this.state.listId} className={classes}>
                    <div id={this.state.listId} className={classes}>
                        {renderCards ? this.getCards() : ''}
                    </div>
                    <CardDropppingArea
                        index='last'
                        onDrop={this.props.onDrop}
                        listKey={this.props.listKey}
                        removePlaceHolder={this.props.removePlaceHolder}
                        contentHeight={this.state.contentHeight}
                        setDraggingInfo={this.props.setDraggingInfo}
                        draggingInfo={this.props.draggingInfo}
                        moveItem={this.props.moveItem} />
            </div>
        );
    }
}

export default CardsContainer;
