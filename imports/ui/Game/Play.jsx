import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Play extends Component {

  render() {
    return (
      <div></div>
    );
  }

}

Play.propTypes = {
  changeView: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  allUsers: PropTypes.array.isRequired,
  registerResult: PropTypes.func.isRequired
}

export default Play;
