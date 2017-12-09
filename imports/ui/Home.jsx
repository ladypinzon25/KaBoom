import React, {Component} from 'react';
import "./css/HomeButton.css";
import HomeButton from './HomeButton.jsx';
import Card from './Card.jsx';

class Home extends Component {

    render() {
        return (
            <div className="app">
                <div className="buttons">
                    <HomeButton text="Sign in"></HomeButton>
                    <HomeButton text="Sign up"></HomeButton>
                </div>
                <div className="tittle">
                    <h1>KaBoom</h1>
                </div>
                <div className="cards">
                    <Card image="./img/characters.jpg" text="Characters" option="/characters"/>
                    <Card image="./img/comics.jpg" text="Comics" option="/comics"/>
                    <Card image="./img/game.JPG" text="Game" option="/game"/>
                </div>
            </div>
        )
    }
}
export default Home;