import { CALL_API } from '../../middleware/api';
export const addPokemonToDb = newPokemon => {
  return {
    [CALL_API]: {
      body: newPokemon,
      endpoint: 'pokemon/pokemonList',
      types: [
        'CREATE_POKEMON_REQUEST',
        'CREATE_POKEMON_SUCCESS',
        'CREATE_POKEMON_FAILURE'
      ],
      useCache: true
    }
  };
};

export const addStatsToDb = newStat => {
  return {
    [CALL_API]: {
      body: newStat,
      endpoint: 'pokemon/pokemonStats',
      types: [
        'CREATE_STATS_REQUEST',
        'CREATE_STATS_SUCCESS',
        'CREATE_STATS_FAILURE'
      ],
      useCache: true
    }
  };
};

export const addGames = game => {
  return {
    [CALL_API]: {
      body: game,
      endpoint: 'pokemon/update',
      types: [
        'CREATE_GAME_REQUEST',
        'CREATE_GAME_SUCCESS',
        'CREATE_GAME_FAILURE'
      ],
      useCache: true
    }
  };
};

export const addAbility = ability => {
  return {
    [CALL_API]: {
      body: ability,
      endpoint: 'abilities/newAbility',
      types: [
        'CREATE_ABILITY_REQUEST',
        'CREATE_ABILITY_SUCCESS',
        'CREATE_ABILITY_FAILURE'
      ],
      useCache: true
    }
  };
};

export const newMove = move => {
  return {
    [CALL_API]: {
      body: move,
      endpoint: 'moves/newMove',
      types: [
        'CREATE_MOVE_REQUEST',
        'CREATE_MOVE_SUCCESS',
        'CREATE_MOVE_FAILURE'
      ],
      useCache: true
    }
  };
};
