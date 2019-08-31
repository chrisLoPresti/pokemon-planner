import React, { useState } from "react";
import PokemonList from "../PokemonList";
import PropTypes from "prop-types";
import SearchBarToggles from "../../containers/SearchBarTogglesContainer";
import Toaster from "../Toaster";
import "./SelectPokemon.css";
import LoadingSite from "../LoadingSite";

const SelectPokemon = ({
  allPokemon,
  selectedPokemon,
  filteredPokemon,
  pokemonListError,
  loadingPokemon,
  updateSelectedTeam,
  showNames,
  showNumbers,
  search,
  filtersError,
  // addPokemonToDb,
  loadPokemonListRequest,
  updateSelectedPokemon,
  setPokemonListError,
  selectedTeam
}) => {
  if (!allPokemon.length && !loadingPokemon) {
    loadPokemonListRequest();
  }

  const setSelectedPokemon = pokemon => {
    if (selectedPokemon.name_eng === pokemon.name_eng) {
      updateSelectedPokemon({});
      return;
    }
    updateSelectedPokemon(pokemon);
  };

  const setSelectedTeam = pokemon => {
    let alreadyPicked = false;
    let isDuplicate = false;
    selectedTeam.forEach(teamMember => {
      if (teamMember.name_eng === pokemon.name_eng) {
        alreadyPicked = true;
        return;
      }
      if (teamMember.nationalNumber === pokemon.nationalNumber) {
        isDuplicate = true;
        return;
      }
    });

    if (alreadyPicked) {
      updateSelectedTeam(
        selectedTeam.filter(
          teamMember => teamMember.name_eng !== pokemon.name_eng
        )
      );
      return;
    }

    if (isDuplicate) {
      dispatchError(
        "You can not have more than one pokemon with the same national dex number."
      );
      return;
    }
    if (selectedTeam.length === 6) {
      dispatchError("You can not have more than six pokemon per team.");
      return;
    }
    updateSelectedTeam([...selectedTeam, pokemon]);
  };

  const dispatchError = error => {
    setPokemonListError(error);
    setTimeout(() => {
      setPokemonListError(null);
    }, 3000);
  };

  const [resultsTotal, setResultsTotal] = useState(filteredPokemon.length);

  return !allPokemon.length && loadingPokemon ? (
    <LoadingSite />
  ) : (
    <div id="select-pokemon-container">
      <SearchBarToggles
        totalResults={resultsTotal}
        showNames={showNames}
        showNumbers={showNumbers}
      />
      <PokemonList
        search={search}
        showNames={showNames}
        showNumbers={showNumbers}
        selectedPokemon={selectedPokemon}
        setSelectedPokemon={setSelectedTeam}
        filteredPokemon={filteredPokemon}
        selectedTeam={selectedTeam}
        setResultsTotal={setResultsTotal}
      />
      <Toaster
        shouldNotify={pokemonListError || filtersError}
        message={pokemonListError || filtersError}
      />
    </div>
  );
};

SelectPokemon.propTypes = {
  addPokemonToDb: PropTypes.func.isRequired,
  loadPokemonListRequest: PropTypes.func.isRequired,
  updateSelectedPokemon: PropTypes.func.isRequired,
  filterPokemonList: PropTypes.func.isRequired,
  setPokemonListError: PropTypes.func.isRequired,
  updateSelectedTeam: PropTypes.func.isRequired
};

export default SelectPokemon;
