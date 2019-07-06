import React from 'react';
import AssignedView from './AssignedView';
import Labels from './Labels';

class Card extends React.Component {
    render() {
        return (
            <div className='item'>
                <div className='actionButton'>
                    <div className='checkboxSkeleton' />
                </div>
                <div className='main'>
                    <Labels />
                    <div className='title'>
                        <div className='lineSkeleton' />
                        <div className='lineSkeleton' />
                    </div>
                    <AssignedView />
                </div>
                <div className='clearer' />
            </div>
        );
    }
}

export default Card;
