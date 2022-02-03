
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
    fName: '',
    lName: '',
    delivery: 'delivery',
    street: '',
    city: '',
    state: '',
    zip: ''
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
    let fName = url.searchParams.get( 'fName' );
    let lName = url.searchParams.get( 'lName' );
    let street = url.searchParams.get( 'street' );
    let city = url.searchParams.get( 'city' );
    let state = url.searchParams.get( 'state' );
    let zip = url.searchParams.get( 'zip' );

    // if not, then let's define our own defaults.
    selected ? null : selected = this.state.selected.toString();
    const card = menu[ parseInt( selected ) ];

    qty ? null : qty = this.state.qty.toString();
    const x = parseInt( qty );

    fName ? null : fName = this.state.fName;
    
    lName ? null : lName = this.state.lName;

    delivery ? null : delivery = this.state.delivery;
    
    street ? null : street = this.state.street;

    city ? null : city = this.state.city;

    state ? null : state = this.state.state;

    zip ? null : zip = this.state.zip;

    // set the state:
    this.setState( {
      selected: parseInt( selected ),
      card: {
        asset: card.asset,
        name: card.name,
        price: card.price
      },
      qty: x,
      fName: fName,
      lName: lName,
      delivery: delivery,
      street: street,
      city: city,
      state: state,
      zip: zip
    } );
  }

  handleResize = () => {
    const display = this.contentDisplayRef.current;

    if( display ) { // manages if there's a card shadow or not.
      display.clientWidth >= window.innerWidth ?
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

  selectQty = ( e:React.ChangeEvent<HTMLInputElement> ) => {
    const x = parseInt( e.target.value );

    if( x > 10 ) { // upper limit
      this.setState({
        qty: 10
      });
    }
    else if( x >= 1 ) {
      this.setState({
        qty: x
      });
    }
    else { // lower limit
      this.setState({
        qty: 1
      });
    }
  }

  selectFName = ( e:React.ChangeEvent<HTMLInputElement> ) => {
    this.setState({
      fName: e.target.value
    });
  }

  selectLName = ( e:React.ChangeEvent<HTMLInputElement> ) => {
    this.setState({
      lName: e.target.value
    });
  }

  selectDelivery = ( e:React.ChangeEvent<HTMLSelectElement> ) => {
    this.setState({
      delivery: e.target.value
    });
  }

  selectStreet = ( e:React.ChangeEvent<HTMLInputElement> ) => {
    this.setState({
      street: e.target.value
    });
  }

  selectCity = ( e:React.ChangeEvent<HTMLInputElement> ) => {
    this.setState({
      city: e.target.value
    });
  }

  selectState = ( e:React.ChangeEvent<HTMLInputElement> ) => {
    this.setState({
      state: e.target.value
    });
  }

  selectZip = ( e:React.ChangeEvent<HTMLInputElement> ) => {
    this.setState({
      zip: e.target.value
    });
  }

  handleDelivery = () => {
    const { delivery, street, city, state, zip } = this.state;

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
            value={ street } 
            onChange={ this.selectStreet } 
            required 
          />
          <input 
            type="text" 
            placeholder="City" 
            name="city" 
            maxLength={ 255 } 
            title="Valid city name" 
            value={ city }
            onChange={ this.selectCity } 
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
            value={ state }
            onChange={ this.selectState } 
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
            value={ zip }
            onChange={ this.selectZip } 
            required 
          />
        </div>
      );
    }

    return null;
  }

  render() {
    const { selected, card, hideShadow, qty, fName, lName, delivery, street, city, state, zip } = this.state;

    return (
      <div 
        className="content_display" 
        ref={ this.contentDisplayRef } 
        style={ { 
          boxShadow: hideShadow ? 'none' : '0 max( 8px, min( 2vh, 16px ) ) max( 12px, min( 3vh, 24px ) ) rgba( 0, 0, 0, .3 )' 
        } }
      >
        <div className="content_left">
          <form action={ `./order.php?selected=${ selected }&qty=${ qty }&fName=${ fName }&lName=${ lName }&delivery=${ delivery }&street=${ street }&city=${ city }&state=${ state }&zip=${ zip }` } method="POST">
            <label htmlFor="shoes"> Pick your shoe: </label>
            <select name="shoes" value={ card.name } onChange={ this.selectOption }>
              { menu.map( ( shoe, idx ) => { return this.handleOptions( shoe, idx ) } ) }
            </select>

            <label htmlFor="qty"> Quantity: </label>
            <input name="qty" type="number" min="1" max="10" value={ qty } onChange={ this.selectQty } title="A Value 1 - 10" required />

            <label htmlFor="fName"> First Name: </label>
            <input type="text" name="fName" maxLength={ 255 } value={ fName } onChange={ this.selectFName } title="Valid first name" required />

            <label htmlFor="lName"> Last Name: </label>
            <input type="text" name="lName" maxLength={ 255 } value={ lName } onChange={ this.selectLName } title="Valid last name" required />

            <label htmlFor="delivery"> Delivery: </label>
            <select value={ delivery } onChange={ this.selectDelivery } name="delivery">
              <option value="pick up"> pick up </option>
              <option value="delivery"> ship </option>
            </select>

            { this.handleDelivery() }

            <input name="price" type="number" style={ { display: 'none' } } value={ card.price } readOnly />

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
