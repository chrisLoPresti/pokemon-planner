import { createSelector } from 'reselect';

const allPokemonSelector = state => state.pokemon.allPokemon;
const selectedPokemonSelector = state => state.pokemon.selectedPokemon;
const selectedTeamSelector = state => state.pokemon.selectedTeam;
const pokemonListErrorSelector = state => state.pokemon.pokemonListError;
const loadingPokemonSelector = state => state.pokemon.loadingPokemon;
const pokemonLoadedSelector = state => state.pokemon.pokemonLoaded;
const totalFilteredPokemonSelector = state =>
  state.pokemon.totalFilteredPokemon;

const excludedPokemon = state => state.filters.excludedPokemon;
const filterByTypes = state => state.filters.filterByTypes;
const filterByStages = state => state.filters.filterByStages;
const filterByRegions = state => state.filters.filterByRegions;
const search = state => state.filters.search;
const showOnlyLegendary = state => state.filters.showOnlyLegendary;
const showOnlyMegas = state => state.filters.showOnlyMegas;
const showOnlyMythic = state => state.filters.showOnlyMythic;
const showOnlyPseudo = state => state.filters.showOnlyPseudo;
const shiny = state => state.filters.shiny;
const selectedGame = state => state.filters.selectedGame;
const showNames = state => state.filters.showNames;
const showNumbers = state => state.filters.showNumbers;
const filtersError = state => state.filters.filtersError;

const usersOnline = state => state.users.usersOnline;

export const getUsersOnline = createSelector(
  usersOnline,
  allUsersOnline => allUsersOnline
);

export const getFiltersError = createSelector(
  filtersError,
  allFiltersError => allFiltersError
);

export const getFilterByTypes = createSelector(
  filterByTypes,
  allFilterByTypes => allFilterByTypes
);
export const getFilterByStages = createSelector(
  filterByStages,
  allFilterByStages => allFilterByStages
);
export const getFilterByRegions = createSelector(
  filterByRegions,
  allFilterByRegions => allFilterByRegions
);
export const getSearch = createSelector(
  search,
  allSearch => allSearch
);
export const getShowOnlyLegendary = createSelector(
  showOnlyLegendary,
  allShowOnlyLegendary => allShowOnlyLegendary
);
export const getShowOnlyMegas = createSelector(
  showOnlyMegas,
  allShowOnlyMegas => allShowOnlyMegas
);
export const getShowOnlyMythic = createSelector(
  showOnlyMythic,
  allShowOnlyMythic => allShowOnlyMythic
);
export const getShowOnlyPseudo = createSelector(
  showOnlyPseudo,
  allShowOnlyPseudo => allShowOnlyPseudo
);
export const getShiny = createSelector(
  shiny,
  allShiny => allShiny
);
export const getSelectedGame = createSelector(
  selectedGame,
  allSelectedGame => allSelectedGame
);
export const getShowNames = createSelector(
  showNames,
  allShowNames => allShowNames
);
export const getShowNumbers = createSelector(
  showNumbers,
  allShowNumbers => allShowNumbers
);

export const getExcludedPokemon = createSelector(
  excludedPokemon,
  allExcludedPokemon => allExcludedPokemon
);

export const getAllPokemon = createSelector(
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
  [
    getAllPokemon,
    getSearch,
    getShowOnlyLegendary,
    getShowOnlyMythic,
    getShowOnlyPseudo,
    getShowOnlyMegas,
    getFilterByRegions,
    getFilterByStages,
    getFilterByTypes,
    getExcludedPokemon,
    getSelectedGame
  ],
  (
    allPokemon,
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
  ) => {
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
