
import { Component } from 'react';

// styling
import './app.scss';

// shoe component collection:
import Shoes from './shoes/shoeInventory';

export default class App extends Component {
  render() {
    return (
      <div id='store'>
        <Shoes />
      </div>
    );
  }
}
