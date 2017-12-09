import React, {Component} from 'react';
import "./css/HomeButton.css";
class HomeButton extends Component {

    render() {
        return (
            <div className="buttonH">
                <div className="action-button shadow animate blue">{this.props.text}</div>
            </div>);
    }
}
export default HomeButton;