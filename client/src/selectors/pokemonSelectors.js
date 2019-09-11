import { createSelector } from 'reselect';

const allPokemonSelector = state => state.pokemon.allPokemon;
const filtersSelector = state => state.filters;
const selectedPokemonSelector = state => state.pokemon.selectedPokemon;
const selectedTeamSelector = state => state.pokemon.selectedTeam;

const pokemonListErrorSelector = state => state.pokemon.pokemonListError;
const loadingPokemonSelector = state => state.pokemon.loadingPokemon;
const pokemonLoadedSelector = state => state.pokemon.pokemonLoaded;
const totalFilteredPokemonSelector = state =>
  state.pokemon.totalFilteredPokemon;
const excludedPokemon = state => state.filters.excludedPokemon;

export const getExcludedPokemon = createSelector(
  excludedPokemon,
  allExcludedPokemon => allExcludedPokemon
);
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
      .filter(key => key !== 'count' && key !== 'hasMega')
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
      filterByTypes,
      excludedPokemon,
      selectedGame
    } = filters;

    if (
      !showOnlyLegendary &&
      !showOnlyMythic &&
      !showOnlyPseudo &&
      !showOnlyMegas &&
      !search.length &&
      !filterByTypes.length &&
      !filterByRegions.length &&
      !filterByStages.length &&
      !excludedPokemon.length &&
      !selectedGame.length
    ) {
      return allPokemon;
    }

    return allPokemon
      .filter(pokemon => {
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
            (filterByStages.includes('Fully Evolved') && pokemon.fullyEvolved);
        }
        const notExcluded = !excludedPokemon.find(
          ({ name }) => name === pokemon.name.english
        );
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
        let validGame = true;
        if (selectedGame.length > 0) {
          if (pokemon.gamesAvailable) {
            validGame = pokemon.gamesAvailable[selectedGame] !== undefined;

            const preORAS = [
              'Beedrill',
              'Pidgeot',
              'Slowbro',
              'Steelix',
              'Sceptile',
              'Swampert',
              'Sableye',
              'Sharpedo',
              'Camerupt',
              'Altaria',
              'Glalie',
              'Salamence',
              'Metagross',
              'Latias',
              'Latios',
              'Rayquaza',
              'Lopunny',
              'Gallade',
              'Audino',
              'Diancie'
            ];
            if (
              pokemon.name.english.includes('Mega ') &&
              selectedGame !== 'XY' &&
              selectedGame !== 'ORAS' &&
              selectedGame !== 'SM' &&
              selectedGame !== 'USUM'
            ) {
              validGame = false;
            }
            if (
              preORAS.includes(pokemon.name.english.split(' ')[1]) &&
              selectedGame === 'XY'
            ) {
              validGame = false;
            }
          } else {
            validGame = false;
          }
        }
        return (
          validTypes &&
          validLegendary &&
          validMythic &&
          validPseudo &&
          validMega &&
          validRegion &&
          validStage &&
          validSearch &&
          notExcluded &&
          validGame &&
          pokemon
        );
      })
      .sort((pokemon1, pokemon2) => {
        if (selectedGame.length) {
          return (
            +pokemon1.gamesAvailable[selectedGame] -
            +pokemon2.gamesAvailable[selectedGame]
          );
        }
      });
  }
);
