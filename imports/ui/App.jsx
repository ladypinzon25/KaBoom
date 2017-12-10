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
        var user = {
          email: "@.com",
          name: "Sebastian",
          deck: ["13-SS04", "03-ST03", "05-SS01", "07-ST05", "10-ST07"],
          stats: {
            wins: 0,
            ties: 0,
            losses: 0
          }
        };
        var userList = [
          {
            email: "@.com",
            name: "Martin",
            deck: ["13-SS04", "03-ST03", "05-SS01", "07-ST05", "10-ST07"],
            stats: {
              wins: 0,
              ties: 0,
              losses: 0
            }
          },
          {
            email: "@.com",
            name: "Fernanda",
            deck: ["01-ST01", "17-SS05", "19-SS07", "07-ST05", "23-SP06"],
            stats: {
              wins: 0,
              ties: 0,
              losses: 0
            }
          },
          {
            email: "@.com",
            name: "Juana",
            deck: ["29-SP10", "25-ST10", "24-SS09", "07-ST05", "27-SP08"],
            stats: {
              wins: 0,
              ties: 0,
              losses: 0
            }
          },
          {
            email: "@.com",
            name: "Julian",
            deck: ["01-ST01", "06-SS02", "11-SP02", "16-SP04", "21-ST09"],
            stats: {
              wins: 0,
              ties: 0,
              losses: 0
            }
          },
          {
            email: "@.com",
            name: "Nicolas",
            deck: ["02-ST02", "07-ST05", "12-SS03", "17-SS05", "22-SS08"],
            stats: {
              wins: 0,
              ties: 0,
              losses: 0
            }
          },
          {
            email: "@.com",
            name: "Esteban",
            deck: ["03-ST03", "08-ST06", "13-SS04", "18-SS06", "23-SP06"],
            stats: {
              wins: 0,
              ties: 0,
              losses: 0
            }
          },
          {
            email: "@.com",
            name: "Oscar",
            deck: ["04-ST04", "09-SP01", "14-SP03", "19-SS07", "24-SS09"],
            stats: {
              wins: 0,
              ties: 0,
              losses: 0
            }
          },
          {
            email: "@.com",
            name: "Sara",
            deck: ["05-SS01", "10-ST07", "15-ST08", "20-SP05", "25-ST10"],
            stats: {
              wins: 0,
              ties: 0,
              losses: 0
            }
          },
          {
            email: "@.com",
            name: "Luisa",
            deck: ["26-SP07", "27-SP08", "28-SP09", "29-SP10", "30-SS10"],
            stats: {
              wins: 0,
              ties: 0,
              losses: 0
            }
          },
        ];
        this.state = {
          userAuth: null,
          user: user,
          userList: userList
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
        var userList = [
          {
            email: "@.com",
            name: "Martin",
            deck: ["13-SS04", "03-ST03", "05-SS01", "07-ST05", "10-ST07"],
            stats: {
              wins: 0,
              ties: 0,
              losses: 0
            }
          },
          {
            email: "@.com",
            name: "Seb",
            deck: ["01-ST01", "17-SS05", "19-SS07", "07-ST05", "23-SP06"],
            stats: {
              wins: 0,
              ties: 0,
              losses: 0
            }
          },
          {
            email: "@.com",
            name: "Juana",
            deck: ["29-SP10", "25-ST10", "24-SS09", "07-ST05", "27-SP08"],
            stats: {
              wins: 0,
              ties: 0,
              losses: 0
            }
          },
        ];
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
      let savedStats = UsersDB.findOne({email: email});
      if(savedStats === undefined) {
        const result = Meteor.call('users.addUser',{email, name});
        console.log('User added');
        let u = UsersDB.find({email:{$eq: ""+email}}).fetch();
        return u[0];
      } else {
        return savedStats;
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
