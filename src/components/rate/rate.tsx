
import React, { Component } from 'react';

// list of shoes
import menu from '../shoes/shoes.json';
import Shoe from '../shoes/shoe';

// styling
import './rate.scss';

export default class Order extends Component {
  state = {
    selected: '',
    card: {
      asset: '',
      name: '',
      price: 0
    },
    hideShadow: false,
    rating: 0
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
    selectedUrl ? selected = selectedUrl : null;

    menu.filter( shoe => {
      if( shoe.name === selected ) {
        // set the state:
        this.setState( {
          selected: selected,
          card: {
            asset: shoe.asset,
            name: shoe.name,
            price: shoe.price
          }
        } );
      }
    } );

    // sort the array of shoes so they're alphabetized
    menu.sort( ( a, b ) => {
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
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
    menu.filter( shoe => {
      if( shoe.name === e.target.value ) {
        this.setState( {
          selected: shoe.name,
          card: {
            asset: shoe.asset,
            name: shoe.name,
            price: shoe.price
          }
        } );
      }
    } );
  }

  setRating = ( rating:number ) => {
    this.setState( {
      rating: rating
    } );
  }

  render() {
    const { card, hideShadow, rating } = this.state;
    const display = this.contentDisplayRef.current;

    return (
      <div 
        className="rate"
        onMouseMove={ this.handleResize }
        style={ {
          alignItems: display ? ( display.clientHeight >= window.innerHeight ) ? 'flex-start' : 'center' : 'center',
        } }
      >
        <div 
          className="content_display" 
          ref={ this.contentDisplayRef }
          style={ { 
            boxShadow: hideShadow ? 'none' : '0 max( 8px, min( 2vh, 16px ) ) max( 12px, min( 3vh, 24px ) ) rgba( 0, 0, 0, .3 )' 
          } }
        >
          <div className="content_right">
            <Shoe shoe={ card } content="rating" setRating={ this.setRating } />
          </div>

          <div className="content_left">
            <form action="./rate.php?" method="POST">
              <label htmlFor="shoes"> Pick your shoe: </label>
              <select name="shoes" value={ card.name } onChange={ this.selectOption }>
                { menu.map( ( shoe, idx ) => { return this.handleOptions( shoe, idx ) } ) }
              </select>

              <textarea name="message" />

              <input name="rating" type="number" step="0.5" style={ { display: 'none' } } value={ rating } readOnly />
              
              <button>Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
