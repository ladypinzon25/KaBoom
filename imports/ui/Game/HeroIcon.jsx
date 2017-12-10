import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './css/HeroIconStyle.css';

class HeroIcon extends Component {
  render() {
    return (
      <div id="HeroIcon"
        className={this.props.selected?" selected":""}
        onClick={() => this.props.select(this.props.hero.serial)}>
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

HeroIcon.propTypes = {
  hero: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  select: PropTypes.func.isRequired
}

export default HeroIcon;
