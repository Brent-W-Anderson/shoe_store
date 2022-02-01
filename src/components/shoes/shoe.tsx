
import { Component } from 'react';

export default class Shoe extends Component<{ shoe: { asset:string, name:string, price:number }, idx?:number }> {
    render() {
        const { shoe, idx } = this.props;
        const { asset, name, price } = shoe;

        return (
            <div className="shoe_card">
                <img className="shoe_card_img" src={ asset } />

                <div className="shoe_description">
                    <h2>{ name }</h2>
                    <p className="price">{ price }</p>
                    <a href={ `./order.php?selected=${ idx }` }>
                        <div className="order"> ORDER NOW </div>
                    </a>
                </div>
            </div>
        );
    }
}