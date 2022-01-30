
import { Component } from 'react';
import Shoe from './shoe';

// styling
import './shoes.scss';

// list of shoes
import menu from '../shoes/shoes.json';

export default class ShoeInventory extends Component<{ handleShoePos:Function }> {
    state = {
        selectedImg: 0 // TO DO for left/right functionality
    }

    render() {
        const { handleShoePos } = this.props;

        return (
            <div className="shoes">
                { menu.map( ( shoe, idx ) => { return <Shoe key={ idx } shoe={ shoe } handleShoePos={ handleShoePos } /> } ) }
            </div>
        );
    }
}