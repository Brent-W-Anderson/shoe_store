
import ReactDOM from 'react-dom';
import App from './components/app';
import Order from './components/order/order';

const root = document.getElementById('root');
if( root ) {
  ReactDOM.render(
    <App />,
    root
  );
}

const order = document.getElementById('order');
if( order ) {
  ReactDOM.render(
    <Order />,
    order
  );
}
