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
                    <div className="imageDes"><img
                        src={this.props.character.img + '/standard_xlarge.' + this.props.character.ext}/></div>
                    {this.props.character.description ?
                        <div className="description"><b><p><span
                            className="descriptionColor">Description: </span>{this.props.character.description}</p></b>
                        </div>
                        :
                        ''}
                </div>
                <div>
                    {this.props.character && this.props.character.comics && this.props.character.comics.length > 0 ?
                        <div>
                            <div className="comicColor"><b>Comics:</b></div>
                            {this.props.character.comics.map((comic, i) => {
                                return (
                                    <div key={i} className="comicsName">
                                        <b> * {comic.name} </b>
                                    </div>
                                )
                            })}</div>
                        :
                        ''}</div>
                <div>
                    {this.props.character && this.props.character.events && this.props.character.events.length > 0 ?
                        <div>
                            <div className="eventColor"><b>Events:</b></div>
                            {this.props.character.events.map((event, i) => {
                                return (
                                    <div key={i} className="eventsName">
                                        <b> * {event.name} </b>
                                    </div>
                                )
                            })}</div>
                        :
                        ''}</div>
            </div>
        )
    }
}
export default Drawer;