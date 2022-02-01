
import { Component } from 'react';
import Shoe from './shoe';

// styling
import './shoes.scss';

// list of shoes
import menu from '../shoes/shoes.json';

export default class ShoeInventory extends Component {
    render() {
        return (
            <div className="shoes">
                { menu.map( ( shoe, idx ) => { 
                    return (
                        <Shoe 
                            key={ idx } 
                            idx={ idx } 
                            shoe={ shoe } 
                        />
                    ) 
                } ) }
            </div>
        );
    }
}