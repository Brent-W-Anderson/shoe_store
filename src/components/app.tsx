
import { Component } from 'react';

// styling
import './app.scss';

// shoe collection:
import Shoes from './shoes/shoeInventory';

export default class App extends Component {
  state = {
    shoePos:Number
  }

  handleShoePos = ( x:number ) => {
    this.setState({
      shoePos: x
    });
  }

  render() {
    return (
      <div id='store' style={ { left: `calc( 50% - 20px - ${ this.state.shoePos ? 'calc(' + this.state.shoePos + 'px + max( 6.5vh, 26px ))' : '0' } )` } }>
        <Shoes handleShoePos={ this.handleShoePos } />
      </div>
    );
  }
}
