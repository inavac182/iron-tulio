import React from 'react';
import CardContent from './CardContent';
import CardDropppingArea from '../cards/CardDropppingArea';

class Card extends React.Component {
    state = {
        classes: null,
        isSelf: false,
    }

    showPlaceHolder = () => {
        this.setState({
            classes: 'childDragging',
            isSelf: true
        });
    }

    render() {
        return (
            <div className={`card status-${this.props.item.status} ${this.state.classes}`}>
                <CardDropppingArea
                    index={this.props.item.index}
                    moveItem={this.props.moveItem}
                    listKey={this.props.listKey}
                    removePlaceHolder={this.props.removePlaceHolder}
                    contentHeight={this.state.contentHeight}
                    setDraggingInfo={this.props.setDraggingInfo}
                    draggingInfo={this.props.draggingInfo}
                    isSelf={this.state.isSelf} />

                <CardContent
                    index={this.props.index}
                    listKey={this.props.listKey}
                    updateItem={this.props.updateItem}
                    item={this.props.item}
                    rotate={this.rotate}
                    showPlaceHolder={this.showPlaceHolder}
                    setDraggingInfo={this.props.setDraggingInfo}
                    isSelf={this.state.isSelf} />
            </div>
        );
    }
}

export default Card;
