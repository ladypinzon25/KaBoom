import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor';
import {Route} from 'react-router-dom';
import "./css/App.css";
import Home from './Home.jsx';
import Characters from './Characters.jsx';
import Comics from './Comics.jsx';
import Game from './Game.jsx';
import firebase, { auth, provider } from '../auth/firebase.js';
import {UsersDB} from '../api/Users.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          userAuth: null,
          user: null,
          userList: []
        }
    }

    Log() {
      if(this.state.userAuth) {
        this.SignOut();
      } else {
        this.SignIn();
      }
    }

    SignIn() {
      auth.signInWithPopup(provider)
      .then((result) => {
        const userAuth = result.user;
        var user = this.InitUser(userAuth);
        var userList = UsersDB.find({}).fetch();
        this.setState({
          userAuth: userAuth,
          user:user,
          userList: userList
        });
      });
    }

    SignOut() {
      auth.signOut()
      .then(() => {
        this.setState({
          userAuth: null,
          user:null,
        });
      });
    }

    InitUser(user) {
    if(user!== null && user!== undefined) {
      let email = user.email;
      let name = user.displayName.split(" ")[0];
      let savedStats = UsersDB.find({email:{$eq: ""+email}}).fetch();
      if(savedStats.length === 0) {
        const result = Meteor.call('users.addUser',{email, name});
        console.log('User added');
        let u = UsersDB.find({email:{$eq: ""+email}}).fetch();
        return u[0];
      } else {
        return savedStats[0];
      }
    }
  }

  render() {
    const HomeComponent = (props) => {
      return (
        <Home
          signIn={() => this.Log()}
          user={this.state.userAuth}
        />
      );
    }
    const GameComponent = (props) => {
      return (
        <Game
          user={this.state.user}
          allUsers={this.state.userList}
        />
      );
    }
    return (
        <div>
        <Route exact path ="/" render ={HomeComponent}/>
        <Route path ="/characters" component ={Characters}/>
        <Route path ="/comics" component ={Comics}/>
        <Route path ="/game" render ={GameComponent}/>
        </div>
    );
  }
}
export default App;
