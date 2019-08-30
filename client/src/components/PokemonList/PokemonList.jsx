import React from "react";
import PokemonData from "../../assets/pokemon";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./PokemonList.css";

const initialPokemon = addPokemonToDb => {
  let pokemonArray = [];

  Object.keys(PokemonData).forEach(number => {
    const pokemon = PokemonData[number];
    pokemonArray.push(pokemon);
    pokemon.variations.map(variation =>
      pokemonArray.push({
        ...pokemon,
        // variations: [
        //   ...pokemon.variations.filter(
        //     pokemon => pokemon.name_eng !== variation.name_eng
        //   ),
        //   {
        //     generation: pokemon.generation,
        //     name_eng: pokemon.name_eng,
        //     region: pokemon.region,
        //     spriteExtension: pokemon.spriteExtension || "",
        //     type1: pokemon.type1,
        //     type2: pokemon.type2
        //   }
        // ],
        ...variation
      })
    );
  });

  // pokemonArray
  //   .sort(
  //     (pokemon1, pokemon2) =>
  //       +pokemon1.nationalNumber - +pokemon2.nationalNumber
  //   )
  //   .forEach(pokemon => {
  //     const { variations, ...rest } = pokemon;
  //     addPokemonToDb(rest);
  //   });

  return pokemonArray.sort(
    (pokemon1, pokemon2) => +pokemon1.nationalNumber - +pokemon2.nationalNumber
  );
};

const filterByTypes = (filteredPokemon, types) => {
  if (!types.length) {
    return filteredPokemon;
  }
  return filteredPokemon.filter(pokemon => {
    if (types.length === 1) {
      return types.includes(pokemon.type1) || types.includes(pokemon.type2);
    }
    if (types.length === 2) {
      return types.includes(pokemon.type1) && types.includes(pokemon.type2);
    }
    return pokemon;
  });
};

const filterBySearch = (filteredPokemon, search) => {
  if (!search.length) {
    return filteredPokemon;
  }
  return filteredPokemon.filter(
    pokemon =>
      pokemon.name_eng.toLowerCase().indexOf(search.trim().toLowerCase()) >= 0
  );
};

const generateBubble = (
  selectedTeam,
  selectedPokemon,
  setSelectedPokemon,
  showNumbers,
  showNames,
  pokemon
) => {
  const pokemonIsSelected =
    selectedPokemon.name_eng === pokemon.name_eng ||
    selectedTeam.find(({ name_eng }) => name_eng === pokemon.name_eng);
  const pokemonIsAlolan = pokemon.generation === 7;
  return (
    <li
      onClick={() => setSelectedPokemon(pokemon)}
      key={pokemon.name_eng}
      className={classNames(
        "dex-pokemon-list-item",
        {
          small: !showNames
        },
        { large: showNames }
      )}
    >
      <div>
        {showNames && <p className="name-eng">{pokemon.name_eng}</p>}
        {showNames && <p className="name-jap">{pokemon.name_jap}</p>}
        {showNumbers && (
          <p className="pokemon-number">#{pokemon.nationalNumber} </p>
        )}
      </div>

      <div
        className={classNames(
          `pokemon-bubble `,
          { "alolan-line-height": pokemonIsAlolan },
          { [pokemon.type1]: !pokemonIsSelected },
          { [`${pokemon.type2}-border`]: !pokemonIsSelected },
          { selected: pokemonIsSelected }
        )}
      >
        <img
          className="sprite"
          disabled={selectedTeam[pokemon.nationalNumber]}
          src={require(`../../assets/images/sprites/pokedex/${
            pokemon.nationalNumber
          }${pokemon.spriteExtension ? pokemon.spriteExtension : ""}.png`)}
          alt={pokemon.name}
        />
      </div>
    </li>
  );
};

const PokemonList = ({
  showNames,
  showNumbers,
  selectedTeam,
  setSelectedPokemon,
  // addPokemonToDb,
  selectedPokemon,
  filteredPokemon,
  search
}) => {
  const activeList = search.trim().length
    ? filteredPokemon.filter(
        pokemon =>
          pokemon.name_eng.toLowerCase().indexOf(search.trim().toLowerCase()) >=
          0
      )
    : filteredPokemon;

  return (
    <div id="dex-pokemon-container">
      <p className="total-results">Total Results: {activeList.length}</p>
      <ul className="dex-pokemon-list">
        {activeList.map(pokemon =>
          generateBubble(
            selectedTeam,
            selectedPokemon,
            setSelectedPokemon,
            showNumbers,
            showNames,
            pokemon
          )
        )}
      </ul>

      {activeList.length === 0 && (
        <div className="no-results">
          <h1 className="no-results">Your filters yielded no results!</h1>
          <img
            className="no-results-image"
            alt="no results"
            src={require("../../assets/images/misc/no-results.png")}
          />
        </div>
      )}
    </div>
  );
};

PokemonList.propTypes = {
  addPokemonToDb: PropTypes.func.isRequired,
  showNames: PropTypes.bool.isRequired,
  showNumbers: PropTypes.bool.isRequired,
  selectedTeam: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setSelectedPokemon: PropTypes.func.isRequired
};

export default PokemonList;
