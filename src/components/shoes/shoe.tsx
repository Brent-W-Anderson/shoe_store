
import React, { Component } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default class Shoe extends Component<{ shoe: { asset:string, name:string, price:number }, handleShoePos:Function }> {
    cardRef = React.createRef<HTMLDivElement>();

    componentDidMount() {
        window.addEventListener( 'resize', this.handleResize );

        this.handleResize();
    }

    handleResize = () => {
        const { handleShoePos } = this.props;
        const width = this.cardRef.current?.clientWidth;

        if( width ) {
            handleShoePos( width / 2 );
        }
    }

    render() {
        const { asset, name, price } = this.props.shoe;

        return (
            <div ref={ this.cardRef } className="shoe_card">
                <img src={ asset } />

                <div className="shoe_description">
                    <h2>{ name }</h2>
                    <p className="price">{ price }</p>
                    <a href="./order.php">
                        <div className="order"> ORDER NOW </div>
                    </a>
                </div>

                <div className="arrows">
                    <div className="arrow_left">
                        <ArrowBackIosNewIcon />
                    </div>

                    <div className="arrow_right">
                        <ArrowForwardIosIcon />
                    </div>
                </div>
            </div>
        );
    }
}