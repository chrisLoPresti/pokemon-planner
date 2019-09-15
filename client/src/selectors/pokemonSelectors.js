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
const onlyTypes = state => state.filters.onlyTypes;
const onlyStages = state => state.filters.onlyStages;
const onlyRegions = state => state.filters.onlyRegions;
const search = state => state.filters.search;
const onlyLegendary = state => state.filters.onlyLegendary;
const onlyMegas = state => state.filters.onlyMegas;
const onlyMythic = state => state.filters.onlyMythic;
const onlyPseudo = state => state.filters.onlyPseudo;
const shiny = state => state.filters.shiny;
const onlyGame = state => state.filters.onlyGame;
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
  onlyTypes,
  allFilterByTypes => allFilterByTypes
);
export const getFilterByStages = createSelector(
  onlyStages,
  allFilterByStages => allFilterByStages
);
export const getFilterByRegions = createSelector(
  onlyRegions,
  allFilterByRegions => allFilterByRegions
);
export const getSearch = createSelector(
  search,
  allSearch => allSearch
);
export const getShowOnlyLegendary = createSelector(
  onlyLegendary,
  allShowOnlyLegendary => allShowOnlyLegendary
);
export const getShowOnlyMegas = createSelector(
  onlyMegas,
  allShowOnlyMegas => allShowOnlyMegas
);
export const getShowOnlyMythic = createSelector(
  onlyMythic,
  allShowOnlyMythic => allShowOnlyMythic
);
export const getShowOnlyPseudo = createSelector(
  onlyPseudo,
  allShowOnlyPseudo => allShowOnlyPseudo
);
export const getShiny = createSelector(
  shiny,
  allShiny => allShiny
);
export const getSelectedGame = createSelector(
  onlyGame,
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
    onlyLegendary,
    onlyMythic,
    onlyPseudo,
    onlyMegas,
    onlyRegions,
    onlyStages,
    onlyTypes,
    excludedPokemon,
    onlyGame
  ) => {
    if (
      !onlyLegendary &&
      !onlyMythic &&
      !onlyPseudo &&
      !onlyMegas &&
      !search.length &&
      !onlyTypes.length &&
      !onlyRegions.length &&
      !onlyStages.length &&
      !excludedPokemon.length &&
      !onlyGame.length
    ) {
      return allPokemon;
    }

    let returnList = allPokemon.filter(pokemon => {
      const validLegendary = onlyLegendary ? pokemon.isLegendary : true;
      const validMythic = onlyMythic ? pokemon.isMythic : true;
      const validPseudo = onlyPseudo ? pokemon.isPseudo : true;
      const validMega = onlyMegas ? pokemon.isMega : true;
      const validRegion = onlyRegions.length
        ? onlyRegions.includes(pokemon.region)
        : true;
      let validStage = true;
      if (onlyStages.length) {
        validStage =
          onlyStages.includes(pokemon.stage) ||
          (onlyStages.includes('Fully Evolved') && pokemon.fullyEvolved);
      }
      const notExcluded = !excludedPokemon.find(
        ({ name }) => name === pokemon.name.english
      );
      let validTypes = true;

      if (onlyTypes.length === 1) {
        validTypes =
          onlyTypes.includes(pokemon.type[0]) ||
          onlyTypes.includes(pokemon.type[1]);
      } else if (onlyTypes.length === 2) {
        validTypes =
          onlyTypes.includes(pokemon.type[0]) &&
          onlyTypes.includes(pokemon.type[1]);
      }

      const validSearch = search.length
        ? pokemon.name.english
            .toLowerCase()
            .indexOf(search.toLowerCase().trim()) >= 0
        : true;
      let validGame = true;
      if (onlyGame.length > 0) {
        if (pokemon.gamesAvailable) {
          validGame = pokemon.gamesAvailable[onlyGame] !== undefined;

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
            onlyGame !== 'XY' &&
            onlyGame !== 'ORAS' &&
            onlyGame !== 'SM' &&
            onlyGame !== 'USUM' &&
            onlyGame !== 'POLGO'
          ) {
            validGame = false;
          }
          if (
            preORAS.includes(pokemon.name.english.split(' ')[1]) &&
            onlyGame === 'XY'
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
    });
    if (onlyGame.length) {
      returnList = returnList.sort((pokemon1, pokemon2) => {
        return (
          +pokemon1.gamesAvailable[onlyGame] -
          +pokemon2.gamesAvailable[onlyGame]
        );
      });
    }
    return returnList;
  }
);
