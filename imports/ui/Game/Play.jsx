import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './css/PlayStyle.css';

class Play extends Component {
  constructor(props) {
    super(props);
    var p2 = props.allUsers[Math.floor(Math.random() * props.allUsers.length)];
    var deckP1 = this.Shuffle(props.user.deck);
    var deckP2 = this.Shuffle(p2.deck);
    this.state = {
      oponent: p2,
      deckP1: deckP1,
      deckP2: deckP2,
      turn: 0,
      phase: 0,
      hpP1: 3,
      hpP2: 3,
      p1Moves: ['-', '-', '-', '-', '-'],
      p2Moves: ['-', '-', '-', '-', '-']
    }
  }

  Shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  render() {
    return (
      <div id="PlayPage">
        {this.RenderHeader()}
        {this.RenderBoard()}
      </div>
    );
  }

  RenderHeader() {
    return (
      <div className="Header">
        <div className="PlayerHeader HeaderP1">
          <div className="Name">
            <h1>{this.props.user.name}</h1>
          </div>
          <div className="HealthPoints">
            <div className={"hp"+(this.state.hpP1>0?" Active":" Inactive")}></div>
            <div className={"hp"+(this.state.hpP1>1?" Active":" Inactive")}></div>
            <div className={"hp"+(this.state.hpP1>2?" Active":" Inactive")}></div>
          </div>
        </div>
        <div className="label">
          <h1>VS</h1>
        </div>
        <div className="PlayerHeader HeaderP2">
          <div className="Name">
            <h1>{this.state.oponent.name}</h1>
          </div>
          <div className="HealthPoints">
            <div className={"hp"+(this.state.hpP2>2?" Active":" Inactive")}></div>
            <div className={"hp"+(this.state.hpP2>1?" Active":" Inactive")}></div>
            <div className={"hp"+(this.state.hpP2>0?" Active":" Inactive")}></div>
          </div>
        </div>
      </div>
    );
  }

  RenderBoard() {
    return (
      <div className="Board">
        <div className="deckP1">
          {this.ShowDeck("P1")}
        </div>
        {this.ShowCard("P1")}
        <div className="WinIcon">
          {this.SelectIcon()}
        </div>
        {this.CreateButton()}
        <div className="deckP2">
          {this.ShowDeck("P2")}
        </div>
        {this.ShowCard("P2")}
      </div>
    );
  }

  ShowDeck(p) {
    var moves = this.state.p1Moves;
    if (p === "P2") {
      moves = this.state.p2Moves;
    }

    return moves.map((m, i) => {
      switch(m) {
        case "-":
          return (
            <div key={i} className="deckCard none"></div>
          );
          break;
        case "W":
        return (
            <div key={i} className="deckCard win"></div>
          );
          break;
        case "L":
        return (
            <div key={i} className="deckCard loss"></div>
          );
          break;
        case "T":
        return (
            <div key={i} className="deckCard tie"></div>
          );
          break;
      }
    });
  }

  ShowCard(p) {
    if (this.state.phase === 0) {
      return (
        <div className={"playingCard playingCard"+p+" back"}></div>
      );
    } else {
      var cardSerial = this.state.deckP1[this.state.turn];
      if (p === "P2") {
        cardSerial = this.state.deckP2[this.state.turn];
      }
      var card = this.props.roster.cards[cardSerial];
      return (
        <div className={"playingCard playingCard"+p+" front"}>
          <div className="nameLabel">
            {card.name}
          </div>
          <div className="heroImage">
            <img src={"./heroImg/"+card.serial+".jpg"} alt={card.name+"'s image"}/>
          </div>
          <div className="heroClass">
            {this.GetCategory(card.serial)}
          </div>
        </div>
      );
    }
  }

  SelectIcon() {
    if (this.state.phase === 1) {
      var r = this.state.p1Moves[this.state.turn];
      return (
        <img src={"./icons/"+r+".svg"} alt=""/>
      );
    }
  }
  
  GetCategory(serial) {
    if (serial.includes("SS")) {
      return (
        <img src="./icons/SS.svg" alt="Super strength icon"/>
      );
    } else if (serial.includes("SP")) {
      return (
        <img src="./icons/SP.svg" alt="Super powers icon"/>
      );
    } else {
      return (
        <img src="./icons/ST.svg" alt="Skill and tech icon"/>
      );
    }
  }

  CreateButton() {
    if (this.state.hpP1 === 0 || this.state.hpP2 === 0 || (this.state.turn === 4 && this.state.phase === 1)) {
      var result = "T";
      var message = "It's a draw!";
      if (this.state.hpP1 > this.state.hpP2) {
        result = "W";
        message = this.props.user.name+"'s team wins!!!'";
      } else if (this.state.hpP1 < this.state.hpP2) {
        result = "L";
        message = this.state.oponent.name+"'s team wins!!!'";
      }
      return (
        <div className="EndCard">
          <h1>{message}</h1>
          <button className="ActionButton ActiveButton"
            onClick={() => this.props.registerResult(this.state.oponent, result)}>
            <h1>Back to menu</h1>
          </button>
        </div>
      );
    } else if (this.state.phase === 0) {
      return (
        <button className="ActionButton ActiveButton"
          onClick={() => this.Figth()}>
          <h1>Figth!</h1>
        </button>
      );
    } else {
      return (
        <button className="ActionButton ActiveButton"
          onClick={() => this.Next()}>
          <h1>Next round</h1>
        </button>
      );
    }
  }

  Next() {
    var turn = this.state.turn + 1;
    this.setState({
      turn: turn,
      phase: 0,
    });
  }

  Figth() {
    var card1 = this.state.deckP1[this.state.turn];
    var card2 = this.state.deckP2[this.state.turn];
    if ((card1.includes("SP") && card2.includes("ST")) ||
    (card1.includes("ST") && card2.includes("SS")) ||
    (card1.includes("SS") && card2.includes("SP"))) {
      //P1 Wins
      var hpP2 = this.state.hpP2 - 1;
      var p1Moves = this.state.p1Moves;
      p1Moves[this.state.turn] = "W";
      var p2Moves = this.state.p2Moves;
      p2Moves[4 - this.state.turn] = "L";
      this.setState({
        phase: 1,
        hpP2: hpP2,
        p1Moves: p1Moves,
        p2Moves: p2Moves
      });
    } else if ((card1.includes("ST") && card2.includes("SP")) ||
    (card1.includes("SS") && card2.includes("ST")) ||
    (card1.includes("SP") && card2.includes("SS"))) {
      //P2 Wins
      var hpP1 = this.state.hpP1 - 1;
      var p1Moves = this.state.p1Moves;
      p1Moves[this.state.turn] = "L";
      var p2Moves = this.state.p2Moves;
      p2Moves[4 - this.state.turn] = "W";
      this.setState({
        phase: 1,
        hpP1: hpP1,
        p1Moves: p1Moves,
        p2Moves: p2Moves
      });
    } else {
      //Tie
      var p1Moves = this.state.p1Moves;
      p1Moves[this.state.turn] = "T";
      var p2Moves = this.state.p2Moves;
      p2Moves[4 - this.state.turn] = "T";
      this.setState({
        phase: 1,
        p1Moves: p1Moves,
        p2Moves: p2Moves
      });
    }
  }
}

Play.propTypes = {
  changeView: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  allUsers: PropTypes.array.isRequired,
  registerResult: PropTypes.func.isRequired,
  roster: PropTypes.object.isRequired
}

export default Play;
