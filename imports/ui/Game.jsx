import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./css/HomeButton.css";

import Menu from './Game/Menu.jsx';
import HowTo from './Game/HowTo.jsx';
import DeckSelect from './Game/DeckSelect.jsx';
import Play from './Game/Play.jsx';

import roster from '../data/cards.js';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "Menu"
    };
  }

  render() {
    return (
      <div className="App">
        {this.RenderPage()}
      </div>
    );
  }

  RenderPage() {
    switch (this.state.view) {
      case "Menu":
        return (
          <Menu
          changeView={(v) => this.ChangeView(v)}
          playable={this.props.user.deck.length === 5}/>
        );
        break;
      case "DeckSelect":
        return (
          <DeckSelect
          changeView={(v) => this.ChangeView(v)}
          deck={this.props.user.deck}
          changeDeck={(d) => this.ChangeDeck(d)}
          roster={roster}/>
        );
        break;
      case "Game":
        return (
          <Play
          changeView={(v) => this.ChangeView(v)}
          user={this.props.user}
          allUsers={this.props.allUsers}
          registerResult={(oponent, result) => this.GameResult(oponent, result)}
          roster={roster}/>
        );
        break;
      case "HowTo":
        return (
          <HowTo
          changeView={(v) => this.ChangeView(v)}/>
        );
        break;
      }
    }

  ChangeView(view) {
    this.setState({
      view: view
    });
  }

  ChangeDeck(deck) {
    var id = this.props.user._id;
    Meteor.call('users.updateUserDeck',{
      id,
      deck
    }, (error, response) => {
      if (error) {
        console.log(error);
      } else {
        console.log('User deck updated');
        var u = UserDB.findOne(id);
        this.setState({
          user: u,
          view: "Menu"
        });
      }
    });
  }

  GameResult(oponent, result) {
    var id1 = this.props.user._id;
    var id2 = oponent._id;
    Meteor.call('users.addResult',{
      id1,
      id2,
      result
    }, (error, response) => {
      if (error) {
        console.log(error);
      } else {
        console.log('User stats updated');
        var u = UserDB.findOne(id);
        this.setState({
          user: u
        });
      }
    });
  }
}

Game.propTypes = {
  user: PropTypes.object.isRequired,
  allUsers: PropTypes.array.isRequired
}

export default Game;
