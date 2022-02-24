
import { Component } from 'react';
import Shoe from './shoe';

// styling
import './shoes.scss';

// list of shoes
import menu from './shoes.json';

export default class ShoeInventory extends Component {
    state = {
        menu: menu,
        filter: '-- Filter price by --',
        reviews: []
    }

    componentDidMount() {
        const { menu } = this.state;
    
        let array = menu;
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while ( currentIndex != 0 ) {
      
          // Pick a remaining element...
          randomIndex = Math.floor( Math.random() * currentIndex );
          currentIndex --;
      
          // And swap it with the current element.
          [ array[ currentIndex ], array[ randomIndex ] ] = [
            array[ randomIndex ], array[ currentIndex ] ];
        }
      
        let obj = document.getElementById( "data" );
        if( obj && obj.innerHTML ) {
            obj = JSON.parse( obj.innerHTML );

            this.setState( { menu: array, reviews: obj } );
        }
        else {
            this.setState( { menu: array } );
        }
      }

    handleFilter = ( e:React.ChangeEvent<HTMLSelectElement> ) => {
        const filter = e.target.value;
        this.setState( { filter: filter } );

        const { menu } = this.state;

        if( filter === "Lowest to Highest" ) {
            menu.sort( ( a, b ) => {
                if( a.price < b.price ) { return -1; }
                if( a.price > b.price ) { return 1; }
                return 0;
            } );
        }

        if( filter === "Highest to Lowest" ) {
            menu.sort( ( a, b ) => {
                if( a.price > b.price ) { return -1; }
                if( a.price < b.price ) { return 1; }
                return 0;
            } );
        }
    }

    render() {
        const { menu, filter } = this.state;

        return (
            <div className="shoes">
                <select className="filter" value={ filter } onChange={ this.handleFilter }>
                    <option disabled> -- Filter price by -- </option>
                    <option> Lowest to Highest </option>
                    <option> Highest to Lowest </option>
                </select>

                { menu.map( ( card, idx ) => {                    
                    return (
                        <Shoe 
                            key={ idx } 
                            shoe={ card }
                            reviews={ this.state.reviews }
                        />
                    ) 
                } ) }
            </div>
        );
    }
}