import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './css/HowToStyle.css';

class HowTo extends Component {
  render() {
    return (
      <div id="HowToPage">
        <h1>Welcome to the game</h1>
        <p>
          Assemble your team of heroes and fight epic battles. Each hero falls
          into one of three categories:
          <ul>
            <li>Super Powers</li>
            <li>Super Strength</li>
            <li>Skill & Tech</li>
          </ul>
          Choose your time wisely. Once you have your team ready, you'll face
          off against another person team. Your heroes will come at random and
          face one on one with your opponent's heroes. Take into account that each
          category has a strength and a weakness as shown in the image:
        </p>
        <div className="ImgCont">
          <img src="./icons/HowTo.svg" alt="Categories strengths and weakness"/>
        </div>
        <p>
          Heroes with Super Powers can win over the heroes with Skill & Tech abilities.
          Skill & Tech heroes win over Super Strength heroes, and Super Strength
          heroes can beat heroes with SUper Powers.
        </p>
        <button className="ActiveButton" onClick={() => this.props.changeView("Menu")}>
          Go to menu
        </button>
      </div>
    );
  }

}

HowTo.propTypes = {
  changeView: PropTypes.func.isRequired
}

export default HowTo;
