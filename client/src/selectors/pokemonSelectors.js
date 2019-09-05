import { createSelector } from "reselect";
import _ from "lodash";

const allPokemonSelector = state => state.pokemon.allPokemon;
const filtersSelector = state => state.filters;
const selectedPokemonSelector = state => state.pokemon.selectedPokemon;
const selectedTeamSelector = state => state.pokemon.selectedTeam;

const pokemonListErrorSelector = state => state.pokemon.pokemonListError;
const loadingPokemonSelector = state => state.pokemon.loadingPokemon;
const pokemonLoadedSelector = state => state.pokemon.pokemonLoaded;
const totalFilteredPokemonSelector = state =>
  state.pokemon.totalFilteredPokemon;

const getAllPokemon = createSelector(
  allPokemonSelector,
  pokemon => pokemon
);

export const getSelectedPokemon = createSelector(
  selectedPokemonSelector,
  selectedPokemon => selectedPokemon
);

export const getSelectedTeam = createSelector(
  selectedTeamSelector,
  team => team
);

export const getSelectedPokemonArray = createSelector(
  selectedTeamSelector,
  team =>
    Object.keys(team)
      .filter(key => key !== "count" && key !== "hasMega")
      .map(key => team[key])
);

export const getListError = createSelector(
  pokemonListErrorSelector,
  error => error
);

export const getTotalFilteredPokemon = createSelector(
  totalFilteredPokemonSelector,
  totalFilteredPokemon => totalFilteredPokemon
);

export const getLoading = createSelector(
  loadingPokemonSelector,
  loading => loading
);

export const getLoaded = createSelector(
  pokemonLoadedSelector,
  loaded => loaded
);

export const getFilteredPokemon = createSelector(
  [getAllPokemon, filtersSelector],
  (allPokemon, filters) => {
    const {
      search,
      showOnlyLegendary,
      showOnlyMythic,
      showOnlyPseudo,
      showOnlyMegas,
      filterByRegions,
      filterByStages,
      filterByTypes
    } = filters;

    if (
      !showOnlyLegendary &&
      !showOnlyMythic &&
      !showOnlyPseudo &&
      !showOnlyMegas &&
      !search.length &&
      !filterByTypes.length &&
      !filterByRegions.length &&
      !filterByStages.length
    ) {
      return allPokemon;
    }

    return allPokemon.filter(pokemon => {
      const validLegendary = showOnlyLegendary ? pokemon.isLegendary : true;
      const validMythic = showOnlyMythic ? pokemon.isMythic : true;
      const validPseudo = showOnlyPseudo ? pokemon.isPseudo : true;
      const validMega = showOnlyMegas ? pokemon.isMega : true;
      const validRegion = filterByRegions.length
        ? filterByRegions.includes(pokemon.region)
        : true;
      let validStage = true;
      if (filterByStages.length) {
        validStage =
          filterByStages.includes(pokemon.stage) ||
          (filterByStages.includes("Fully Evolved") && pokemon.fullyEvolved);
      }

      let validTypes = true;

      if (filterByTypes.length === 1) {
        validTypes =
          filterByTypes.includes(pokemon.type[0]) ||
          filterByTypes.includes(pokemon.type[1]);
      } else if (filterByTypes.length === 2) {
        validTypes =
          filterByTypes.includes(pokemon.type[0]) &&
          filterByTypes.includes(pokemon.type[1]);
      }

      const validSearch = search.length
        ? pokemon.name.english
            .toLowerCase()
            .indexOf(search.toLowerCase().trim()) >= 0
        : true;
      return (
        validTypes &&
        validLegendary &&
        validMythic &&
        validPseudo &&
        validMega &&
        validRegion &&
        validStage &&
        validSearch &&
        pokemon
      );
    });
  }
);
