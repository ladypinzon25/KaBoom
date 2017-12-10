import React, { Component } from 'react';
import PropTypes from 'prop-types';

class HowTo extends Component {
  render() {
    return (
      <div id="HowToPage">
        Welcome to the game
        <div className="ActiveButton" onClick={() => this.props.changeView("Menu")}>
          Go to menu
        </div>
      </div>
    );
  }

}

HowTo.propTypes = {
  changeView: PropTypes.func.isRequired
}

export default HowTo;
