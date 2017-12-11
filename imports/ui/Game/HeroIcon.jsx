import React, { Component } from 'react';
import PropTypes from 'prop-types';

class HeroIcon extends Component {
  render() {
    return (
      <div id="HeroIcon"
        className={(this.props.selected?" selected":"")+" "+this.GetCategory(this.props.hero.serial)}
        onClick={() => this.props.select(this.props.hero.serial)}>
        <div className="nameLabel">
          {this.props.hero.name}
        </div>
        <div className="ImageCrop">
          <img src={"./heroImg/"+this.props.hero.serial+".jpg"} alt={this.props.hero.name+"'s image"}/>
        </div>
      </div>
    );
  }

  GetCategory(serial) {
    if (serial.includes("SS")) {
      return "SS";
    } else if (serial.includes("SP")) {
      return "SP";
    } else {
      return "ST";
    }
  }
}

HeroIcon.propTypes = {
  hero: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  select: PropTypes.func.isRequired
}

export default HeroIcon;
