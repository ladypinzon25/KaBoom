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
          <img src={"./heroImg/"+this.props.hero.serial+".jpg"} alt={this.props.hero.name+"'s image"}/>
        </div>
        <div className="heroClass">
          {this.GetCategory()}
        </div>
      </div>
    );
  }

  GetCategory() {
    if (this.props.hero.serial.includes("SS")) {
      return (
        <img src="./icons/SS.svg" alt="Super strength icon"/>
      );
    } else if (this.props.hero.serial.includes("SP")) {
      return (
        <img src="./icons/SP.svg" alt="Super powers icon"/>
      );
    } else {
      return (
        <img src="./icons/ST.svg" alt="Skill and tech icon"/>
      );
    }
  }
}

HeroCard.propTypes = {
  hero: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired
}

export default HeroCard;
