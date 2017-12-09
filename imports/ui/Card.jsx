import React, {Component} from 'react';
import TweenMax from 'gsap';
import "./css/Card.css";
import {Link} from 'react-router-dom';
class Card extends Component {

    onHover = () =>{

        const card = this.refs.card;
        const duration = 0.3,
            delay = 0.08;
        TweenMax.to(card, duration, {scaleY: 1.6, ease: Expo.easeOut});
        TweenMax.to(card, duration, {scaleX: 1.2, scaleY: 1, ease: Back.easeOut, easeParams: [3], delay: delay});
        TweenMax.to(card, duration * 1.25, {scaleX: 1, scaleY: 1, ease: Back.easeOut, easeParams: [6], delay: delay * 3 });
    };

    render() {
        return (

            <div className="Card" ref="card" onMouseEnter={this.onHover}><Link to={this.props.option}>

                    <img src={this.props.image}/>
                <h1 className="options">{this.props.text}</h1></Link>

            </div>


        );
    }
}
export default Card;