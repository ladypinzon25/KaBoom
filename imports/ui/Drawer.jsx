import React, {Component} from 'react';
import "./css/Drawer.css";
class Drawer extends Component {

    closeNav = () => {
        document.getElementById("mySidenav").style.width = "0";
    }

    render() {
        return (
            <div id="mySidenav" className="sidenav">
                <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
                <div className="infoCharacter">
                    <div className="name"><b><h1>{this.props.character.name}</h1></b></div>
                    <div className="imageDes"><img src={this.props.character.img + '/standard_xlarge.' + this.props.character.ext}/></div>
                    {this.props.character.description?
                        <div className="description"><b><p><span className="descriptionColor">Description: </span>{this.props.character.description}</p></b></div>
                    :
                    ''}
                    </div>
            </div>
        )
    }
}
export default Drawer;