import React, {Component} from 'react';
import "./css/Drawer.css";
class Drawer extends Component {

    closeNav = () => {
        document.getElementById("mySidenav comic").style.width = "0";
    }

    render() {
        return (
            <div id="mySidenav comic" className="sidenav">
                <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
                <div className="infoCharacter">
                    <div className="name"><b><h1>{this.props.comic.name}</h1></b></div>
                    <div className="imageDes"><img
                        src={this.props.comic.img + '/standard_xlarge.' + this.props.comic.ext}/></div>
                    {this.props.comic.description ?
                        <div className="description"><b><p><span
                            className="descriptionColor">Description: </span>{this.props.comic.description}</p></b>
                        </div>
                        :
                        ''}
                </div>
                <div>
                    {this.props.comic && this.props.comic.characters && this.props.comic.characters.length > 0 ?
                        <div>
                            <div className="comicColor"><b>Characters:</b></div>
                            {this.props.comic.characters.map((character, i) => {
                                return (
                                    <div key={i} className="comicsName">
                                        <b> * {character.name} </b>
                                    </div>
                                )
                            })}</div>
                        :
                        ''}</div>
                <div>
                    {this.props.comic && this.props.comic.events && this.props.comic.events.length > 0 ?
                        <div>
                            <div className="eventColor"><b>Events:</b></div>
                            {this.props.comic.events.map((event, i) => {
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