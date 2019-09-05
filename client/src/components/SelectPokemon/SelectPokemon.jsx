import React, { useState } from "react";
import PokemonList from "../../containers/PokemonList";
import PropTypes from "prop-types";
import SearchBarToggles from "../../containers/SearchBarTogglesContainer";
import SelectedTeam from "../../containers/SelectedTeamContainer";
import Toaster from "../Toaster";
import HTML5Backend from "react-dnd-html5-backend";
import TouchBackend from "react-dnd-touch-backend";
import { isBrowser, isMobile } from "react-device-detect";
import { DndProvider } from "react-dnd";

import LoadingSite from "../LoadingSite";
import "./SelectPokemon.css";

const backends = {
  HTML5Backend,
  TouchBackend: TouchBackend,
  options: { enableMouseEvents: true, preview: true }
};
const SelectPokemon = ({
  loadingPokemon,
  pokemonListError,
  filtersError,
  history
}) => {
  const [canDropPokemon, setCanDropPokemon] = useState(false);
  return loadingPokemon ? (
    <LoadingSite />
  ) : (
    <div id="select-pokemon-container">
      <SearchBarToggles history={history} />
      <DndProvider
        backend={isBrowser ? backends.HTML5Backend : backends.TouchBackend}
        options={isMobile ? backends.TouchBackend.options : {}}
      >
        <SelectedTeam history={history} setCanDropPokemon={setCanDropPokemon} />
        <PokemonList history={history} canDropPokemon={canDropPokemon} />
      </DndProvider>
      <Toaster message={pokemonListError || filtersError} />
    </div>
  );
};

SelectPokemon.propTypes = {
  pokemonListError: PropTypes.string,
  filtersError: PropTypes.string
};

export default SelectPokemon;
