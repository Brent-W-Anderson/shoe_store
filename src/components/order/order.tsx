
import { Component } from 'react';

// styling
import '../app.scss';
import './order.scss';

// list of shoes
import menu from '../shoes/shoes.json';

export default class Order extends Component {
  render() {
    return (
      <form method="POST">
        <input name="xName" />
      </form>
    );
  }
}
