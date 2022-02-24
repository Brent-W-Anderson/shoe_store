
import { Component } from 'react';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

export default class Shoe extends Component<{ shoe: { asset:string, name:string, price:number }, content?:string, setRating?:Function, reviews?:any }> {
    state = {
        ratingHovered: false,
        stars: { // rating stars 1 -> 5
            star_1: "", // fill none, half, or full
            star_2: "",
            star_3: "",
            star_4: "",
            star_5: ""
        },
        savedStars: { // saved star rating after click
            star_1: "",
            star_2: "",
            star_3: "",
            star_4: "",
            star_5: ""
        }
    }

    handleRatingPosition = ( star:string ) => {
        const { ratingHovered, savedStars, stars } = this.state;
        const { star_2, star_3, star_4, star_5 } = savedStars;
        let colorCode = "#BD0026";

        if( ratingHovered ) { // set colors while hovering
            if( stars.star_5 === "half" || stars.star_5 === "full" ) {
                colorCode = "#41B7C5";
            }
            else if( stars.star_4 === "half" || stars.star_4 === "full" ) {
                colorCode = "#78C67A";
            }
            else if( stars.star_3 === "half" || stars.star_3 === "full" ) {
                colorCode = "#FFD98E";
            }
            else if( stars.star_2 === "half" || stars.star_2 === "full" ) {
                colorCode = "#FD8C3C";
            }
        }
        else { // otherwise, set saved rating colors
            if( star_5 === "half" || star_5 === "full" ) {
                colorCode = "#41B7C5";
            }
            else if( star_4 === "half" || star_4 === "full" ) {
                colorCode = "#78C67A";
            }
            else if( star_3 === "half" || star_3 === "full" ) {
                colorCode = "#FFD98E";
            }
            else if( star_2 === "half" || star_2 === "full" ) {
                colorCode = "#FD8C3C";
            }
        }
        
        // star designs: empty, half filled, and full
        if( star === "half" ) {
            return <StarHalfOutlinedIcon htmlColor={ colorCode }></StarHalfOutlinedIcon>;
        }
        else if( star === "full" ) {
            return <StarOutlinedIcon htmlColor={ colorCode }></StarOutlinedIcon>;
        }
        else {
            return <StarOutlineOutlinedIcon></StarOutlineOutlinedIcon>;
        }
    }

    saveStars = () => {
        const { stars } = this.state;

        this.setState( {
            savedStars: stars
        } );
    }

    handleRatingStars = () => {
        const { ratingHovered, stars, savedStars } = this.state;
        const { content, setRating } = this.props;

        if( content === "rating" ) {
            if( ratingHovered ) { // when hovering, if the cursor leaves then reset rating to 0 (unless there's a save to rollback to)
                return (
                    <div className="stars" onClick={ this.saveStars }>
                        <div className="star star_1">
                            { this.handleRatingPosition( stars.star_1 ) }

                            <div 
                                className="half"
                                onMouseLeave={ () => { this.setState({ ratingHovered: false, stars: { star_1: "" } }); } }
                                onClick={ () => { setRating ? setRating( 0.5 ) : null; } }
                            />
                            <div 
                                className="full"
                                onMouseLeave={ () => { this.setState({ ratingHovered: false, stars: { star_1: "" } }); } }
                                onClick={ () => { setRating ? setRating( 1.0 ) : null; } }
                            />
                        </div>

                        <div className="star star_2">
                            { this.handleRatingPosition( stars.star_2 ) }

                            <div 
                                className="half"
                                onMouseLeave={ () => { this.setState({ ratingHovered: false, stars: { star_2: "" } }); } }
                                onClick={ () => { setRating ? setRating( 1.5 ) : null; } }
                            />
                            <div 
                                className="full"
                                onMouseLeave={ () => { this.setState({ ratingHovered: false, stars: { star_2: "" } }); } }
                                onClick={ () => { setRating ? setRating( 2.0 ) : null; } }
                            />
                        </div>

                        <div className="star star_3">
                            { this.handleRatingPosition( stars.star_3 ) }

                            <div 
                                className="half"
                                onMouseLeave={ () => { this.setState({ ratingHovered: false, stars: { star_3: "" } }); } }
                                onClick={ () => { setRating ? setRating( 2.5 ) : null; } }
                            />
                            <div 
                                className="full"
                                onMouseLeave={ () => { this.setState({ ratingHovered: false, stars: { star_3: "" } }); } }
                                onClick={ () => { setRating ? setRating(3.0 ) : null; } }
                            />
                        </div>

                        <div className="star star_4">
                            { this.handleRatingPosition( stars.star_4 ) }

                            <div 
                                className="half"
                                onMouseLeave={ () => { this.setState({ ratingHovered: false, stars: { star_4: "" } }); } }
                                onClick={ () => { setRating ? setRating( 3.5 ) : null; } }
                            />
                            <div 
                                className="full"
                                onMouseLeave={ () => { this.setState({ ratingHovered: false, stars: { star_4: "" } }); } }
                                onClick={ () => { setRating ? setRating( 4.0 ) : null; } }
                            />
                        </div>

                        <div className="star star_5">
                            { this.handleRatingPosition( stars.star_5 ) }

                            <div 
                                className="half"
                                onMouseLeave={ () => { this.setState({ ratingHovered: false, stars: { star_5: "" } }); } }
                                onClick={ () => { setRating ? setRating( 4.5 ) : null; } }
                            />
                            <div 
                                className="full"
                                onMouseLeave={ () => { this.setState({ ratingHovered: false, stars: { star_5: "" } }); } }
                                onClick={ () => { setRating ? setRating( 5.0 ) : null; } }
                            />
                        </div>
                    </div>
                );   
            }
            else if( savedStars.star_1 === "half" || savedStars.star_1 === "full" ) { // See if there's at least half or a full star saved
                return (
                    <div className="stars" onClick={ this.saveStars }>
                        <div className="star star_1">
                            { this.handleRatingPosition( savedStars.star_1 ) }
    
                            <div 
                                className="half"
                                onMouseOver={ () => { this.setState({ ratingHovered: true, stars: { star_1: "half" } }); } }
                            />
                            <div 
                                className="full"
                                onMouseOver={ () => { this.setState({ ratingHovered: true, stars: { star_1: "full" } }); } }
                            />
                        </div>
    
                        <div className="star star_2">
                            { this.handleRatingPosition( savedStars.star_2 ) }
    
                            <div 
                                className="half"
                                onMouseOver={ () => { this.setState({ ratingHovered: true, stars: { star_1: "full", star_2: "half" } }); } }
                            />
                            <div 
                                className="full"
                                onMouseOver={ () => { this.setState({ ratingHovered: true, stars: { star_1: "full", star_2: "full" } }); } }
                            />
                        </div>
    
                        <div className="star star_3">
                            { this.handleRatingPosition( savedStars.star_3 ) }
    
                            <div 
                                className="half"
                                onMouseOver={ () => { this.setState({ ratingHovered: true, stars: { star_1: "full", star_2: "full", star_3: "half" } }); } }
                            />
                            <div 
                                className="full"
                                onMouseOver={ () => { this.setState({ ratingHovered: true, stars: { star_1: "full", star_2: "full", star_3: "full" } }); } }
                            />
                        </div>
    
                        <div className="star star_4">
                            { this.handleRatingPosition( savedStars.star_4 ) }
    
                            <div 
                                className="half"
                                onMouseOver={ () => { this.setState({ ratingHovered: true, stars: { star_1: "full", star_2: "full", star_3: "full", star_4: "half" } }); } }
                            />
                            <div 
                                className="full"
                                onMouseOver={ () => { this.setState({ ratingHovered: true, stars: { star_1: "full", star_2: "full", star_3: "full", star_4: "full" } }); } }
                            />
                        </div>
    
                        <div className="star star_5">
                            { this.handleRatingPosition( savedStars.star_5 ) }
    
                            <div 
                                className="half"
                                onMouseOver={ () => { this.setState({ ratingHovered: true, stars: { star_1: "full", star_2: "full", star_3: "full", star_4: "full", star_5: "half" } }); } }
                            />
                            <div 
                                className="full"
                                onMouseOver={ () => { this.setState({ ratingHovered: true, stars: { star_1: "full", star_2: "full", star_3: "full", star_4: "full", star_5: "full" } }); } }
                            />
                        </div>
                    </div>
                );
            }
            else { // fill stars in, on hover.
                return (
                    <div className="stars">
                        <div className="star star_1">
                            <StarOutlineOutlinedIcon></StarOutlineOutlinedIcon>
                            <div 
                                className="half"
                                onMouseOver={ () => { this.setState({ ratingHovered: true, stars: { star_1: "half" } }); } }
                            />
                            <div 
                                className="full"
                                onMouseOver={ () => { this.setState({ ratingHovered: true, stars: { star_1: "full" } }); } }
                            />
                        </div>

                        <div className="star star_2">
                            <StarOutlineOutlinedIcon></StarOutlineOutlinedIcon>
                            <div 
                                className="half"
                                onMouseOver={ () => { this.setState({ ratingHovered: true, stars: { star_1: "full", star_2: "half" } }); } }
                            />
                            <div 
                                className="full"
                                onMouseOver={ () => { this.setState({ ratingHovered: true, stars: { star_1: "full", star_2: "full" } }); } }
                            />
                        </div>

                        <div className="star star_3">
                            <StarOutlineOutlinedIcon></StarOutlineOutlinedIcon>
                            <div 
                                className="half"
                                onMouseOver={ () => { this.setState({ ratingHovered: true, stars: { star_1: "full", star_2: "full", star_3: "half" } }); } }
                            />
                            <div 
                                className="full"
                                onMouseOver={ () => { this.setState({ ratingHovered: true, stars: { star_1: "full", star_2: "full", star_3: "full" } }); } }
                            />
                        </div>

                        <div className="star star_4">
                            <StarOutlineOutlinedIcon></StarOutlineOutlinedIcon>
                            <div 
                                className="half"
                                onMouseOver={ () => { this.setState({ ratingHovered: true, stars: { star_1: "full", star_2: "full", star_3: "full", star_4: "half" } }); } }
                            />
                            <div 
                                className="full"
                                onMouseOver={ () => { this.setState({ ratingHovered: true, stars: { star_1: "full", star_2: "full", star_3: "full", star_4: "full" } }); } }
                            />
                        </div>

                        <div className="star star_5">
                            <StarOutlineOutlinedIcon></StarOutlineOutlinedIcon>
                            <div 
                                className="half"
                                onMouseOver={ () => { this.setState({ ratingHovered: true, stars: { star_1: "full", star_2: "full", star_3: "full", star_4: "full", star_5: "half" } }); } }
                            />
                            <div 
                                className="full"
                                onMouseOver={ () => { this.setState({ ratingHovered: true, stars: { star_1: "full", star_2: "full", star_3: "full", star_4: "full", star_5: "full" } }); } }
                            />
                        </div>
                    </div>
                );
            }
        }
        else { // Leave a Review star:
            return <StarOutlinedIcon></StarOutlinedIcon>;
        }
    }

    handleRatingClickable = () => { // link to review page, but don't link when already there.
        const { shoe, content } = this.props;
        const { name } = shoe;

        if( content === "rating" ) {
            return (
                <div className="rate_anchor">
                    { this.handleRatingStars() }
                    <p className="rate_text"> Leave a Review </p>
                </div>
            );
        }
        else {
            return (
                <a className="rate_anchor" href={ `./rate.php?selected=${ name }` }>
                    { this.handleRatingStars() }
                    <p className="rate_text"> Leave a Review </p>
                </a>
            );
        }
    }

    handleReviews = () => {
        const { reviews } = this.props;

        return reviews ? reviews.map( ( rating:{ shoe:string, rating:string, message:string }, idx:number ) => {
            if( rating.shoe === this.props.shoe.name ) {
                return (
                    <div key={ idx } className="rating">
                        <p><StarOutlinedIcon></StarOutlinedIcon><span className="star_rating_text">{ rating.rating } star rating</span></p>
                        <p><i>"{ rating.message }"</i></p>
                    </div>
                )
            }
        } ) : null;
    }

    render() {
        const { shoe } = this.props;
        const { asset, name, price } = shoe;

        return (
            <div className="shoe_card">
                { this.handleRatingClickable() }
                <img className="shoe_card_img" src={ asset } />
                <div className="shoe_description">
                    <h2>{ name }</h2>
                    <p className="price">{ price }</p>
                    <div className="reviews">
                        { this.handleReviews() }
                    </div>
                    <a href={ `./order.php?selected=${ name }` }>
                        <div className="order"> ORDER NOW </div>
                    </a>
                </div>
            </div>
        );
    }
}