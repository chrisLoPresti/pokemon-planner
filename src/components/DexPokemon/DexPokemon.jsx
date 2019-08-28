import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import PokemonData from "../../assets/pokemon";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./DexPokemon.css";

const initialPokemon = selectedTypes => {
  let pokemonArray = [];

  Object.keys(PokemonData).forEach(number => {
    const pokemon = PokemonData[number];
    pokemonArray.push(pokemon);
    pokemon.variations.map(variation =>
      pokemonArray.push({
        ...pokemon,
        ...variation
      })
    );
  });
  if (selectedTypes.length) {
    pokemonArray = [
      ...pokemonArray.filter(pokemon => {
        if (selectedTypes.length === 1) {
          return (
            selectedTypes.includes(pokemon.type1) ||
            selectedTypes.includes(pokemon.type2)
          );
        }
        if (selectedTypes.length === 2) {
          return (
            selectedTypes.includes(pokemon.type1) &&
            selectedTypes.includes(pokemon.type2)
          );
        }
        return pokemon;
      })
    ];
  }
  return pokemonArray;
};

const generateBubble = (selectedPokemon, showNumbers, showNames, pokemon) => {
  return (
    <li
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
        {/* {showNames && <p className="name-jap">{pokemon.name_jap}</p>} */}
        {showNumbers && <p className="pokemon-number">#{pokemon.number} </p>}
      </div>

      <div
        className={classNames(
          `pokemon-bubble ${pokemon.type1} ${pokemon.type2}-border`,
          { "alolan-line-height": pokemon.generation === 7 }
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
  selectedTypes
}) => {
  const [filteredPokemon, setFilteredPokemon] = useState(
    initialPokemon(selectedTypes)
  );

  useEffect(() => {
    setFilteredPokemon(initialPokemon(selectedTypes));
  }, [selectedTypes]);

  return (
    <div id="dex-pokemon-container">
      <ul className="dex-pokemon-list">
        {filteredPokemon.map(pokemon =>
          generateBubble(selectedPokemon, showNumbers, showNames, pokemon)
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
  selectedTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedPokemon: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setSelectedPokemon: PropTypes.func.isRequired
};

export default DexPokemon;
