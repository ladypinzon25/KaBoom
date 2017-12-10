import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const UsersDB = new Mongo.Collection('users');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('users', ()=>{
    return UsersDB.find();
  });
}

Meteor.methods({
  'users.addUser'({email, name}){
    console.log("Adding user with email "+email)
    return UsersDB.insert({
      email: email,
      name: name,
      stats: {
        wins:0,
        ties:0,
        losses:0
      },
      deck:[]
    });
  },
  'users.updateUserDeck'({id,deck}){
    return UsersDB.update(id,{
      $set: {deck:deck}
    });
  },
  'users.addResult'({id1, id2, result}){
    var p1 = UsersDB.findOne(id1);
    var p2 = UsersDB.findOne(id2);
    var stats1 = p1.stats;
    var stats2 = p2.stats;
    switch (result) {
      case "W":
        stats1.wins = stats1.wins + 1;
        stats2.losses = stats2.losses + 1;
        break;
      case "T":
        stats1.ties = stats1.ties + 1;
        stats2.ties = stats2.ties + 1;
        break;
      case "L":
        stats1.losses = stats1.losses + 1;
        stats2.wins = stats2.wins + 1;
        break;
    }
    var stats = stats2;
    UsersDB.update(id2,{
      $set: {stats:stats}
    });
    stats = stats1;
    return UsersDB.update(id1,{
      $set: {stats:stats}
    });
  },
  'session.deleteUser'({id}){
    return UsersDB.remove(id);
  }
});
