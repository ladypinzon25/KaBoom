import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor';
import {Route} from 'react-router-dom';
import "./css/App.css";
import Home from './Home.jsx';
import Characters from './Characters.jsx';
import Comics from './Comics.jsx';
import Game from './Game.jsx';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
            <Route exact path ="/" component ={Home}/>
            <Route path ="/characters" component ={Characters}/>
            <Route path ="/comics" component ={Comics}/>
            <Route path ="/game" component ={Game}/>
            </div>
        )
    }
}
export default App;