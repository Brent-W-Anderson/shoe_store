
import React, { Component } from 'react';

// styling
import '../app.scss';
import './order.scss';

// list of shoes

import menu from '../shoes/shoes.json';
import Shoe from '../shoes/shoe';

// styling
import '../shoes/shoes.scss';

export default class Order extends Component {
  state = {
    selected: 0,
    card: {
      asset: '',
      name: '',
      price: 0
    },
    hideShadow: false,
    qty: 1,
    delivery: 'pick up'
  }

  contentDisplayRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    // events
    window.addEventListener( 'resize', this.handleResize );
    this.handleResize(); // call once on initial load to check

    // grab data from url passed from our index.html for default values.
    let url_string = window.location.href;
    let url = new URL( url_string );

    // check if any data was passed.
    let selected = url.searchParams.get( 'selected' );
    let qty = url.searchParams.get( 'qty' );
    let delivery = url.searchParams.get( 'delivery' );

    // if not, then let's define our own defaults.
    selected ? null : selected = '0';
    const card = menu[ parseInt( selected ) ];

    qty ? null : qty = '1';
    const x = parseInt( qty );

    delivery ? null : delivery = 'pick up';

    // set the state:
    this.setState( {
      selected: selected,
      card: {
        asset: card.asset,
        name: card.name,
        price: card.price
      },
      qty: x,
      delivery: delivery
    } );
  }

  handleResize = () => {
    const display = this.contentDisplayRef.current;

    if( display ) { // manages if there's a card shadow or not.
      display.clientWidth === window.innerWidth ?
        this.setState({ hideShadow: true }) : this.setState({ hideShadow: false });
    }
  }

  // creates each option based on the number of menu items.
  handleOptions = ( shoe:{ asset:string, name:string, price:number }, idx:number ) => {
    return (
      <option key={ idx } value={ shoe.name }>
        { shoe.name }
      </option>
    );
  }

  // change the selected option.
  selectOption = ( e:React.ChangeEvent<HTMLSelectElement> ) => {
    const selected = menu.filter( ( shoe, idx ) => {
      if( shoe.name === e.target.value ) {
        this.setState( {
          selected: idx
        } );
      }

      return shoe.name === e.target.value;
    } );
    const shoe = selected[ 0 ];

    this.setState( {
      card: {
        asset: shoe.asset,
        name: shoe.name,
        price: shoe.price
      }
    } );
  }

  handleQty = ( e:React.ChangeEvent<HTMLInputElement> ) => {
    const x = parseInt( e.target.value );

    if( x >= 1 ) {
      this.setState({
        qty: x
      });
    }
    else {
      this.setState({
        qty: 1
      });
    }
  }

  selectDelivery = ( e:React.ChangeEvent<HTMLSelectElement> ) => {
    this.setState({
      delivery: e.target.value
    });
  }

  render() {
    const { selected, card, hideShadow, qty, delivery } = this.state;

    return (
      <div 
        className="content_display" 
        ref={ this.contentDisplayRef } 
        style={ { 
          boxShadow: hideShadow ? 'none' : '0 max( 8px, 2vh ) max( 12px, 3vh ) rgba( 0, 0, 0, .3 )' 
        } }
      >
        <div className="content_left">
          <form action={ `./order.php?selected=${ selected }&qty=${ qty }&delivery=${ delivery }` } method="POST">
            <label htmlFor="shoes"> Pick your shoe: </label>
            <select name="shoes" value={ card.name } onChange={ this.selectOption }>
              { menu.map( ( shoe, idx ) => { return this.handleOptions( shoe, idx ) } ) }
            </select>

            <label htmlFor="qty"> Quantity: </label>
            <input name="qty" type="number" value={ qty } onChange={ this.handleQty } />

            <select value={ delivery } onChange={ this.selectDelivery } name="delivery">
              <option value="pick up"> pick up </option>
              <option value="ship"> ship </option>
            </select>

            <input name="price" style={ { display: 'none' } } value={ card.price } readOnly />

            <button>Purchase</button>
          </form>
        </div>

        <div className="content_right">
          <Shoe shoe={ card } />
        </div>
      </div>
    );
  }
}
