import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./css/HomeButton.css";
class HomeButton extends Component {

    render() {
        return (
            <div className="buttonH" onClick={() => this.props.action()}>
                <div className="action-button shadow animate blue">{this.props.text}</div>
            </div>);
    }
}

HomeButton.propTypes = {
  action: PropTypes.func  
}

export default HomeButton;
