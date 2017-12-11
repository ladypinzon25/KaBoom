import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './css/MenuStyle.css';

class Menu extends Component {
  render() {
    return (
      <div id="MenuScreen">
        <button className={"MenuButton PlayButton"+(this.props.playable?" ActiveButton":" InactiveButton")}
          onClick={this.props.playable?() => this.ChangePage("Game"):() => {return;}}>
          Play!
        </button>
        <button className="MenuButton DeckButton ActiveButton" onClick={() => this.ChangePage("DeckSelect")}>
          Choose Your Team
        </button>
        <button className="MenuButton tutorialButton ActiveButton" onClick={() => this.ChangePage("HowTo")}>
          How To Play
        </button>
      </div>
    );
  }

  ChangePage(page) {
    this.props.changeView(page);
  }

}

Menu.propTypes = {
  changeView: PropTypes.func.isRequired,
  playable: PropTypes.bool.isRequired
}

export default Menu;
