import queryString from 'query-string';
import _ from 'lodash';
import { createBrowserHistory } from 'history';
import { updateSelectedTeam } from '../../actions/pokemonListActions/pokemonListActions';
import { updateAllFilters } from '../../actions/filterActions/filterActions';
import store from '../../store';

const history = createBrowserHistory();

export const setQueryString = () => {
  const { filters, pokemon } = store.getState();

  const {
    onlyLegendary,
    onlyMythic,
    onlyPseudo,
    onlyTypes,
    onlyMegas,
    onlyRegions,
    onlyStages,
    excludedPokemon,
    onlyGame,
    search
  } = filters;

  const { selectedTeam } = pokemon;
  const team = [];
  Object.keys(selectedTeam).forEach(key => {
    if (key !== 'count' && key !== 'hasMega') {
      team.push(selectedTeam[key].name.english);
    }
  });

  const query = queryString.stringify({
    filters: JSON.stringify({
      onlyLegendary,
      onlyMythic,
      onlyPseudo,
      onlyTypes,
      onlyMegas,
      onlyRegions,
      onlyStages,
      excludedPokemon,
      onlyGame
    }),
    selectedTeam: JSON.stringify(team),
    search
  });
  history.push({
    search: query.length > 7 ? query : ''
  });
};

export const parseQueryString = () => {
  const {
    pokemon: { allPokemon }
  } = store.getState();
  const querySearch = queryString.parse(history.location.search);
  if (!Object.keys(querySearch).length) {
    return;
  }
  const { search, filters, selectedTeam } = querySearch;
  store.dispatch(
    updateSelectedTeam(parseQueryTeam(allPokemon, JSON.parse(selectedTeam)))
  );
  store.dispatch(updateAllFilters({ ...JSON.parse(filters), search }));
};

const parseQueryTeam = (allPokemon, team) => {
  const selectedTeam = {
    count: 0,
    hasMega: false
  };
  allPokemon.forEach(pokemon => {
    if (team.includes(pokemon.name.english)) {
      if (pokemon.hasMega) {
        selectedTeam.hasMega = true;
      }
      ++selectedTeam.count;
      selectedTeam[pokemon.nationalNumber] = pokemon;
    }
  });
  return selectedTeam;
};
