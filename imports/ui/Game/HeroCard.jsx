import React, { Component } from 'react';
import PropTypes from 'prop-types';

class HeroCard extends Component {
  render() {
    return (
      <div id="HeroCard">
        <button className="ActiveButton" onClick={() =>this.props.remove(this.props.hero.serial)}>
          X
        </button>
        <div className="nameLabel">
          {this.props.hero.name}
        </div>
        <div className="heroImage">

        </div>
        <div className="heroClass">
          {this.props.hero.category}
        </div>
      </div>
    );
  }
}

HeroCard.propTypes = {
  hero: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired
}

export default HeroCard;
