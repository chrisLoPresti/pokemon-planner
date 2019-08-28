import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import DexPokemon from "../DexPokemon";
import Filters from "./Filters";
import Toaster from "../Toaster";
import "./SelectPokemon.css";

class SelectPokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTypes: [],
      showNames: false,
      showNumbers: true,
      selectedPokemon: [],
      error: false,
      errorMessage: ""
    };
  }

  onChange = (target, value) => {
    if (Array.isArray(this.state[target])) {
      if (this.state[target].includes(value)) {
        this.setState({
          [target]: [...this.state[target].filter(item => item !== value)],
          error: false,
          errorMessage: ""
        });
      } else {
        if (this.state.selectedTypes.length === 2) {
          this.setState({
            error: true,
            errorMessage: "You can only filter on two types at a time."
          });
          return;
        }
        if (this.state.selectedPokemon.length === 6) {
          this.setState({
            error: true,
            errorMessage: "You can only have six pokemon per team."
          });
          return;
        }
        this.setState({
          [target]: [...this.state[target], value],
          error: false,
          errorMessage: ""
        });
      }
      return;
    }
    this.setState({
      [target]: value,
      error: false,
      errorMessage: ""
    });
  };

  render() {
    const {
      error,
      errorMessage,
      selectedTypes,
      showNames,
      showNumbers,
      selectedPokemon
    } = this.state;
    return (
      <div id="select-pokemon-container">
        <Filters
          showNames={showNames}
          showNumbers={showNumbers}
          selectedTypes={selectedTypes}
          onChange={this.onChange}
        />
        <DexPokemon
          showNames={showNames}
          showNumbers={showNumbers}
          selectedTypes={selectedTypes}
          selectedPokemon={selectedPokemon}
          setSelectedPokemon={this.onChange}
        />
        <Toaster shouldNotify={error} message={errorMessage} />
      </div>
    );
  }
}

export default SelectPokemon;
