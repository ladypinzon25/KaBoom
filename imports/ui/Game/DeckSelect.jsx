import React, { Component } from 'react';
import PropTypes from 'prop-types';

import HeroIcon from './HeroIcon.jsx';
import HeroCard from './HeroCard.jsx';

import './css/DeckSelectStyle.css';

class DeckSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "All",
      selection: props.deck
    }
  }
  render() {
    return (
      <div id="DeckSelectPage">
        <div className="filter">
            <label><input type="checkbox" value="All" readOnly
              checked={this.state.filter==="All"} onClick={() => this.ChangeFilter("All")}/>All</label>
            <label><input type="checkbox" value="Superpowers" readOnly
              checked={this.state.filter==="SP"} onClick={() => this.ChangeFilter("SP")}/>Superpowers</label>
            <label><input type="checkbox" value="SuperStrength" readOnly
              checked={this.state.filter==="SS"} onClick={() => this.ChangeFilter("SS")}/>Super Strength</label>
            <label><input type="checkbox" value="Skill&Tech" readOnly
              checked={this.state.filter==="ST"} onClick={() => this.ChangeFilter("ST")}/>Skill & Tech</label>
        </div>
        <div className="Roster">
          {this.RenderRoster()}
        </div>
        <div className="Selection">
          {this.RenderSelection()}
        </div>
        <div className="Option">
          <button className="ActiveButton"
            onClick={() => this.props.changeView("Menu")}>
            Cancel
          </button>
          <button className={this.state.selection.length===5?"ActiveButton":"InactiveButton"}
            onClick={this.state.selection.length===5?() => this.props.changeDeck(this.state.selection):() => {return;}}>
            Use this team
          </button>
        </div>
      </div>
    );
  }

  RenderRoster() {
    return this.props.roster.serials.map((h, i) => {
      if (this.state.filter === "All" || h.includes(this.state.filter)) {
        return (
          <HeroIcon key={i}
            hero={this.props.roster.cards[h]}
            selected={this.state.selection.includes(h)}
            select={(hero) => this.ToggleHero(hero)}/>
        );
      }
    });
  }

  RenderSelection() {
    return this.state.selection.map((h, i) => {
      return (
        <HeroCard key={i}
          hero={this.props.roster.cards[h]}
          remove={(hero) => this.ToggleHero(hero)}/>
      );
    });
  }

  ChangeFilter(filter) {
    this.setState({
      filter: filter
    });
  }

  ToggleHero(hero) {
    var current = this.state.selection;
    if (current.includes(hero)) {
      var index = current.indexOf(hero);
      current.splice(index, 1);
    } else if (current.length!==5) {
      current.push(hero);
    }
    this.setState({
      selection: current
    });
  }
}

DeckSelect.propTypes = {
  changeView: PropTypes.func.isRequired,
  deck: PropTypes.array.isRequired,
  changeDeck: PropTypes.func.isRequired,
  roster: PropTypes.object.isRequired
}

export default DeckSelect;
