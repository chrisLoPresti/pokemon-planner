import { CALL_API } from "../../middleware/api";

export const addPokemonToDb = newPokemon => {
  return {
    [CALL_API]: {
      body: newPokemon,
      endpoint: "pokemon/pokemonList",
      types: [
        "CREATE_POKEMON_REQUEST",
        "CREATE_POKEMON_SUCCESS",
        "CREATE_POKEMON_FAILURE"
      ],
      useCache: true
    }
  };
};

export const addStatsToDb = newStat => {
  return {
    [CALL_API]: {
      body: newStat,
      endpoint: "pokemon/pokemonStats",
      types: [
        "CREATE_STATS_REQUEST",
        "CREATE_STATS_SUCCESS",
        "CREATE_STATS_FAILURE"
      ],
      useCache: true
    }
  };
};
