import React, { useState, useEffect } from "react";
import PokemonData from "../../assets/pokemon";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./DexPokemon.css";

const initialPokemon = () => {
  let pokemonArray = [];

  Object.keys(PokemonData).forEach(number => {
    const pokemon = PokemonData[number];
    pokemonArray.push(pokemon);
    pokemon.variations.map(variation =>
      pokemonArray.push({
        ...pokemon,
        variations: [
          ...pokemon.variations.filter(
            pokemon => pokemon.name_eng !== variation.name_eng
          ),
          {
            generation: pokemon.generation,
            name_eng: pokemon.name_eng,
            region: pokemon.region,
            spriteExtension: pokemon.spriteExtension || "",
            type1: pokemon.type1,
            type2: pokemon.type2
          }
        ],
        ...variation
      })
    );
  });
  return pokemonArray;
};

const filterByTypes = (filteredPokemon, types) => {
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
  return filteredPokemon.filter(
    pokemon =>
      pokemon.name_eng.toLowerCase().indexOf(search.trim().toLowerCase()) >= 0
  );
};

const generateBubble = (
  selectedPokemon,
  setSelectedPokemon,
  showNumbers,
  showNames,
  pokemon
) => {
  const pokemonIsSelected = selectedPokemon.find(
    listPokemon => listPokemon.name_eng === pokemon.name_eng
  );
  const pokemonIsAlolan = pokemon.generation === 7;
  return (
    <li
      onClick={() => setSelectedPokemon("selectedPokemon", pokemon)}
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
        {showNumbers && <p className="pokemon-number">#{pokemon.number} </p>}
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
          disabled={selectedPokemon[pokemon.number]}
          src={require(`../../assets/images/sprites/pokedex/${pokemon.number}${
            pokemon.spriteExtension ? pokemon.spriteExtension : ""
          }.png`)}
          alt={pokemon.name}
        />
      </div>
    </li>
  );
};

const DexPokemon = ({
  showNames,
  showNumbers,
  selectedPokemon,
  setSelectedPokemon,
  search,
  types
}) => {
  const [filteredPokemon, setFilteredPokemon] = useState(initialPokemon());

  useEffect(() => {
    if (!types.length) {
      setFilteredPokemon(initialPokemon());
      return;
    }
    if (filteredPokemon => filteredPokemon.length === 0) {
      filterByTypes(filteredPokemon, types);
      setFilteredPokemon(() => filterByTypes(initialPokemon(), types));
      return;
    }
    setFilteredPokemon(filteredPokemon =>
      filterByTypes(filteredPokemon, types)
    );
  }, [filteredPokemon, types]);

  useEffect(() => {
    if (!search.length) {
      setFilteredPokemon(initialPokemon());
      return;
    }
    if (filteredPokemon => filteredPokemon.length === 0) {
      setFilteredPokemon(() => filterBySearch(initialPokemon(), search));
      return;
    }
    setFilteredPokemon(filteredPokemon =>
      filterBySearch(filteredPokemon, search)
    );
  }, [search]);
  return (
    <div id="dex-pokemon-container">
      <p className="total-results">Total Results: {filteredPokemon.length}</p>
      <ul className="dex-pokemon-list">
        {filteredPokemon.map(pokemon =>
          generateBubble(
            selectedPokemon,
            setSelectedPokemon,
            showNumbers,
            showNames,
            pokemon
          )
        )}
      </ul>

      {filteredPokemon.length === 0 && (
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

DexPokemon.propTypes = {
  showNames: PropTypes.bool.isRequired,
  showNumbers: PropTypes.bool.isRequired,
  selectedPokemon: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setSelectedPokemon: PropTypes.func.isRequired,
  search: PropTypes.string,
  type: PropTypes.arrayOf(PropTypes.string)
};

export default DexPokemon;
