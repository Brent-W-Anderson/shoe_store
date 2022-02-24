
import ReactDOM from 'react-dom';
import App from './components/app';
import Order from './components/order/order';
import Rate from './components/rate/rate';

const root = document.getElementById('root');
if( root ) {
  ReactDOM.render(
    <App />,
    root
  );
}

const order = document.getElementById('orderRoot');
if( order ) {
  ReactDOM.render(
    <Order />,
    order
  );
}

const rate = document.getElementById('rateRoot');
if( rate ) {
  ReactDOM.render(
    <Rate />,
    rate
  );
}
