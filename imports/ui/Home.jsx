import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./css/HomeButton.css";
import HomeButton from './HomeButton.jsx';
import Card from './Card.jsx';

class Home extends Component {

  SignIn() {
    this.props.signIn();
  }
    render() {
        return (
            <div className="app">
                <div className="buttons">
                    <HomeButton text={this.props.user?"Sign out":"Sign in"}
                      action={() => this.SignIn()}></HomeButton>
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

Home.propTypes = {
  signIn: PropTypes.func.isRequired,
  user: PropTypes.object
}

export default Home;
