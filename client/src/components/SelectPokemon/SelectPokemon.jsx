import React from "react";
import PokemonList from "../../containers/PokemonList";
import PropTypes from "prop-types";
import SearchBarToggles from "../../containers/SearchBarTogglesContainer";
import SelectedTeam from "../../containers/SelectedTeamContainer";
import Toaster from "../Toaster";
import "./SelectPokemon.css";
import LoadingSite from "../LoadingSite";

const SelectPokemon = ({
  loadingPokemon,
  pokemonListError,
  filtersError,
  history
}) => {
  return loadingPokemon ? (
    <LoadingSite />
  ) : (
    <div id="select-pokemon-container">
      <SearchBarToggles history={history} />
      <SelectedTeam history={history} />
      <PokemonList history={history} />
      <Toaster
        shouldNotify={pokemonListError || filtersError}
        message={pokemonListError || filtersError}
      />
    </div>
  );
};

SelectPokemon.propTypes = {
  pokemonListError: PropTypes.string,
  filtersError: PropTypes.string
};

export default SelectPokemon;
