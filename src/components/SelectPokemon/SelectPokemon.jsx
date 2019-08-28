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
      showNames: false,
      showNumbers: true,
      selectedPokemon: [],
      error: false,
      errorMessage: "",
      search: "",
      types: []
    };
  }

  onChange = (target, value) => {
    const { selectedPokemon, types } = this.state;

    let error = "";
    if (Array.isArray(this.state[target])) {
      if (this.state[target].includes(value)) {
        this.setState({
          [target]: [...this.state[target].filter(item => item !== value)],
          error: false,
          errorMessage: error
        });
        return;
      }
      if (typeof value === "object") {
        if (
          this.state[target].find(
            pokemon => pokemon.name_eng === value.name_eng
          )
        ) {
          this.setState({
            [target]: [
              ...this.state[target].filter(
                item => item.name_eng !== value.name_eng
              )
            ],
            error: false,
            errorMessage: error
          });
          return;
        }
      }
      if (types.length === 2) {
        error = "You can only filter on two types at a time.";
      }

      const duplicate = selectedPokemon.find(
        pokemon => pokemon.number === value.number
      );
      if (duplicate) {
        error =
          "You can not have more than one pokemon with the same dex number.";
      }
      if (selectedPokemon.length === 6) {
        error = "You can only have six pokemon per team.";
      }
      this.setState({
        [target]: error ? this.state[target] : [...this.state[target], value],
        error: error.length > 0,
        errorMessage: error
      });
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
      showNames,
      showNumbers,
      selectedPokemon,
      search,
      types
    } = this.state;
    return (
      <div id="select-pokemon-container">
        <Filters
          search={search}
          types={types}
          showNames={showNames}
          showNumbers={showNumbers}
          onChange={this.onChange}
        />
        <DexPokemon
          search={search}
          types={types}
          showNames={showNames}
          showNumbers={showNumbers}
          selectedPokemon={selectedPokemon}
          setSelectedPokemon={this.onChange}
        />
        <Toaster shouldNotify={error} message={errorMessage} />
      </div>
    );
  }
}

export default SelectPokemon;
