
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
    delivery: 'delivery'
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
    let selectedUrl = url.searchParams.get( 'selected' );
    let selected = this.state.selected;

    // if not, then let's define our own defaults.
    selectedUrl ? selected = parseInt( selectedUrl ) : null;
    const card = menu[ selected ];

    // set the state:
    this.setState( {
      selected: selected,
      card: {
        asset: card.asset,
        name: card.name,
        price: card.price
      }
    } );
  }

  handleResize = () => {
    const display = this.contentDisplayRef.current;

    if( display ) { // manages if there's a card shadow or not.
      ( display.clientWidth >= window.innerWidth || display.clientHeight >= window.innerHeight ) ?
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

  selectDelivery = ( e:React.ChangeEvent<HTMLSelectElement> ) => {
    this.setState({
      delivery: e.target.value
    });
  }

  handleDelivery = () => {
    const { delivery } = this.state;

    if( delivery === "delivery" ) {
      return (
        <div className="address" >
          <label htmlFor="address">Address:</label>

          <input 
            type="text" 
            placeholder="Street" 
            name="street" 
            maxLength={ 255 }
            title="Valid street name" 
            required 
          />
          <input 
            type="text" 
            placeholder="City" 
            name="city" 
            maxLength={ 255 } 
            title="Valid city name" 
            required 
          />
          <input 
            type="text" 
            placeholder="State" 
            name="state" 
            pattern="[A-Za-z]{2}" 
            maxLength={ 2 } 
            minLength={ 2 } 
            title="Two letter country code" 
            required 
          />
          <input 
            type="text" 
            placeholder="Zip" 
            name="zip" 
            pattern="\d{5}" 
            maxLength={ 5 } 
            minLength={ 5 } 
            title="Five digit zip code" 
            required 
          />
        </div>
      );
    }

    return null;
  }

  render() {
    const { card, hideShadow, delivery} = this.state;

    return (
      <div 
        className="order"
        style={ {
          alignItems: hideShadow ? 'flex-start' : 'center',
        } }
      >
        <div 
          className="content_display" 
          ref={ this.contentDisplayRef } 
          style={ { 
            boxShadow: hideShadow ? 'none' : '0 max( 8px, min( 2vh, 16px ) ) max( 12px, min( 3vh, 24px ) ) rgba( 0, 0, 0, .3 )' 
          } }
        >
          <div className="content_left">
            <form action="./order.php" method="POST">
              <label htmlFor="shoes"> Pick your shoe: </label>
              <select name="shoes" value={ card.name } onChange={ this.selectOption }>
                { menu.map( ( shoe, idx ) => { return this.handleOptions( shoe, idx ) } ) }
              </select>

              <label htmlFor="qty"> Quantity: </label>
              <input name="qty" type="number" min="1" max="10" title="A Value 1 - 10" defaultValue="1" required />

              <label htmlFor="delivery"> Delivery: </label>
              <select value={ delivery } onChange={ this.selectDelivery } name="delivery">
                <option value="pick up"> pick up </option>
                <option value="delivery"> ship </option>
              </select>

              <label htmlFor="fName"> First Name: </label>
              <input type="text" name="fName" maxLength={ 255 } title="Valid first name" required />

              <label htmlFor="lName"> Last Name: </label>
              <input type="text" name="lName" maxLength={ 255 } title="Valid last name" required />

              { this.handleDelivery() }

              <input name="price" type="number" style={ { display: 'none' } } value={ card.price } readOnly />

              <button>Purchase</button>
            </form>
          </div>

          <div className="content_right">
            <Shoe shoe={ card } />
          </div>
        </div>
      </div>
    );
  }
}
