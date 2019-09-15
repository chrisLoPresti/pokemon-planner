import React, { useState } from 'react';
import { Fade } from '@material-ui/core';
import { types } from '../../../constants/filters';
import typeStats from '../../../constants/typeStats';
import symbols from '../../../assets/images/symbols';
import Tooltip from '@material-ui/core/Tooltip';
import classNames from 'classnames';

const generateBlockDataAnalysis = (pokemonTypes, typeToCheck) => {
  if (
    typeStats[pokemonTypes[0]].ddt.includes(typeToCheck) &&
    (pokemonTypes.length > 1 &&
      typeStats[pokemonTypes[1]].ddt.includes(typeToCheck))
  ) {
    return <p className="data-block quadruple">4</p>;
  } else if (
    typeStats[pokemonTypes[0]].ddt.includes(typeToCheck) ||
    (pokemonTypes.length > 1 &&
      typeStats[pokemonTypes[1]].ddt.includes(typeToCheck))
  ) {
    return <p className="data-block double">2</p>;
  } else if (
    typeStats[pokemonTypes[0]].hdt.includes(typeToCheck) ||
    (pokemonTypes.length > 1 &&
      typeStats[pokemonTypes[1]].hdt.includes(typeToCheck))
  ) {
    return <p className="data-block half">.5</p>;
  } else if (
    typeStats[pokemonTypes[0]].ndt.includes(typeToCheck) &&
    (!pokemonTypes.length ||
      (pokemonTypes.length > 1 &&
        typeStats[pokemonTypes[1]].ndt.includes(typeToCheck)))
  ) {
    return <p className="data-block zero">0</p>;
  } else {
    return <p className="data-block">1</p>;
  }
};

const generateBlockDataAnalysisWeakness = (pokemonTypes, typeToCheck) => {
  if (
    typeStats[pokemonTypes[0]].ndf.includes(typeToCheck) ||
    (pokemonTypes.length > 1 &&
      typeStats[pokemonTypes[1]].ndf.includes(typeToCheck))
  ) {
    return <p className="data-block zero">0</p>;
  } else if (
    typeStats[pokemonTypes[0]].ddf.includes(typeToCheck) &&
    (pokemonTypes.length > 1 &&
      typeStats[pokemonTypes[1]].ddf.includes(typeToCheck))
  ) {
    return <p className="data-block quadruple">4</p>;
  } else if (
    (typeStats[pokemonTypes[0]].ddf.includes(typeToCheck) &&
      (pokemonTypes.length === 1 ||
        (pokemonTypes.length > 1 &&
          !typeStats[pokemonTypes[1]].ddf.includes(typeToCheck)))) ||
    (!typeStats[pokemonTypes[0]].ddf.includes(typeToCheck) &&
      pokemonTypes.length > 1 &&
      typeStats[pokemonTypes[1]].ddf.includes(typeToCheck))
  ) {
    return <p className="data-block double">2</p>;
  } else if (
    (typeStats[pokemonTypes[0]].hdf.includes(typeToCheck) &&
      (pokemonTypes.length === 1 ||
        (pokemonTypes.length > 1 &&
          !typeStats[pokemonTypes[1]].hdf.includes(typeToCheck)))) ||
    (!typeStats[pokemonTypes[0]].hdf.includes(typeToCheck) &&
      pokemonTypes.length > 1 &&
      typeStats[pokemonTypes[1]].hdf.includes(typeToCheck))
  ) {
    return <p className="data-block half">.5</p>;
  } else {
    return <p className="data-block">1</p>;
  }
};

const generateTypeAnalysis = (type, selectedTeam) =>
  selectedTeam.map(({ name: { english }, type: pokemonTypes }) => (
    <div className="data-row analysis-row" key={`${english}-outer`}>
      {types.map(innerType => (
        <div key={`${innerType}-inner`}>
          {type === 'strength' &&
            generateBlockDataAnalysis(pokemonTypes, innerType)}
          {type === 'weakness' &&
            generateBlockDataAnalysisWeakness(pokemonTypes, innerType)}
        </div>
      ))}
    </div>
  ));

const generateThreats = selectedTeam => {
  const threats = {
    Normal: { threat: 0, strength: 0 },
    Fire: { threat: 0, strength: 0 },
    Water: { threat: 0, strength: 0 },
    Electric: { threat: 0, strength: 0 },
    Grass: { threat: 0, strength: 0 },
    Ice: { threat: 0, strength: 0 },
    Fighting: { threat: 0, strength: 0 },
    Poison: { threat: 0, strength: 0 },
    Ground: { threat: 0, strength: 0 },
    Flying: { threat: 0, strength: 0 },
    Psychic: { threat: 0, strength: 0 },
    Bug: { threat: 0, strength: 0 },
    Rock: { threat: 0, strength: 0 },
    Ghost: { threat: 0, strength: 0 },
    Dragon: { threat: 0, strength: 0 },
    Dark: { threat: 0, strength: 0 },
    Steel: { threat: 0, strength: 0 },
    Fairy: { threat: 0, strength: 0 }
  };
  selectedTeam.forEach(pokemon => {
    const ddfs0 = typeStats[pokemon.type[0]].ddf;
    const ddfs1 = pokemon.type.length > 1 ? typeStats[pokemon.type[1]].ddf : [];
    const ddts0 = typeStats[pokemon.type[0]].ddt;
    const ddts1 = pokemon.type.length > 1 ? typeStats[pokemon.type[1]].ddt : [];
    const ddts = [...ddts0, ...ddts1];
    const ddfs = [...ddfs0, ...ddfs1];
    ddts.forEach(ddt => ++threats[ddt].strength);
    ddfs.forEach(ddf => ++threats[ddf].threat);
    ++threats[pokemon.type[0]].strength;
    if (pokemon.type.length > 1) {
      ++threats[pokemon.type[1]].strength;
    }
  });
  const returnList = {};

  Object.keys(threats).forEach(key => {
    if (threats[key].strength < threats[key].threat) {
      returnList[key] = threats[key];
    }
  });
  return returnList;
};

const TeamAnalysis = ({ selectedTeam, filteredPokemon }) => {
  const [threats] = useState(generateThreats(selectedTeam));
  return (
    <Fade in timeout={500}>
      <div>
        <div className="chart-content">
          <p className="team-strengths">Combined Typing Strengths</p>
          <div className="types-scroller">
            <div className="types-chart-top-row">
              {types.map(type => (
                <div className="data-block" key={`${type}-top-analysis`}>
                  <Tooltip title={type} enterTouchDelay={0}>
                    <img
                      className={`type-chart-symbol ${type}-border`}
                      alt={type}
                      src={symbols[type]}
                    />
                  </Tooltip>
                </div>
              ))}
            </div>
            {generateTypeAnalysis('strength', selectedTeam)}
          </div>
          <div className="types-chart-left-row-analysis ">
            {selectedTeam.map(pokemon => (
              <Tooltip
                title={pokemon.name.english}
                enterTouchDelay={0}
                key={`${pokemon.name.english}-left-analysis`}
              >
                <div
                  className={classNames(
                    'left-pokemon-container',
                    `${pokemon.type[0]}`,
                    {
                      'null-border': pokemon.type.length === 1
                    },
                    {
                      [`${pokemon.type[1]}-border`]: pokemon.type.length === 2
                    }
                  )}
                >
                  <img
                    className="type-chart-pokemon-left"
                    alt={pokemon.name.english}
                    src={require(`../../../assets/images/sprites/pokedex/${pokemon.sprite}`)}
                  />
                </div>
              </Tooltip>
            ))}
          </div>
        </div>
        <div className="chart-content">
          <p className="team-strengths">Combined Typing Weaknesses</p>
          <div className="types-scroller">
            <div className="types-chart-top-row">
              {types.map(type => (
                <div
                  className="data-block"
                  key={`${type}-top-analysis-weaknesses`}
                >
                  <Tooltip title={type} enterTouchDelay={0}>
                    <img
                      className={`type-chart-symbol ${type}-border`}
                      alt={type}
                      src={symbols[type]}
                    />
                  </Tooltip>
                </div>
              ))}
            </div>
            {generateTypeAnalysis('weakness', selectedTeam)}
          </div>
          <div className="types-chart-left-row-analysis-weaknesses">
            {selectedTeam.map(pokemon => (
              <Tooltip
                title={pokemon.name.english}
                enterTouchDelay={0}
                key={`${pokemon.name.english}-left-analysis-weaknesses`}
              >
                <div
                  className={classNames(
                    'left-pokemon-container',
                    `${pokemon.type[0]}`,
                    {
                      'null-border': pokemon.type.length === 1
                    },
                    {
                      [`${pokemon.type[1]}-border`]: pokemon.type.length === 2
                    }
                  )}
                >
                  <img
                    className="type-chart-pokemon-left"
                    alt={pokemon.name.english}
                    src={require(`../../../assets/images/sprites/pokedex/${pokemon.sprite}`)}
                  />
                </div>
              </Tooltip>
            ))}
          </div>
        </div>
        {Object.keys(threats).length > 0 && (
          <div className="threats-container">
            <p className="team-strengths">Example Threats</p>
            <div className="threats-container">
              {[...filteredPokemon]
                .sort((pokemon1, pokemon2) => {
                  let score1 = 0;
                  let score2 = 0;
                  score1 += threats[pokemon1.type[0]]
                    ? threats[pokemon1.type[0]].threat
                    : 0;
                  score1 += threats[pokemon1.type[1]]
                    ? threats[pokemon1.type[1]].threat
                    : 0;
                  score1 += pokemon1.stage;
                  score1 += pokemon1.fullyEvolved ? 3 : 0;
                  score2 += threats[pokemon2.type[0]]
                    ? threats[pokemon2.type[0]].threat
                    : 0;
                  score2 += threats[pokemon2.type[1]]
                    ? threats[pokemon2.type[1]].threat
                    : 0;
                  score2 += pokemon2.stage;
                  score2 += pokemon2.fullyEvolved ? 3 : 0;
                  return score2 - score1;
                })
                .map(pokemon => {
                  if (
                    threats[pokemon.type[0]] ||
                    (pokemon.type.length > 1 && threats[pokemon.type[1]])
                  ) {
                    return (
                      <Tooltip
                        title={pokemon.name.english}
                        enterTouchDelay={0}
                        key={`${pokemon.name.english}-analysis`}
                      >
                        <div
                          className={classNames(
                            `analysis-pokemon ${pokemon.type[0]}`,
                            {
                              [`${pokemon.type[1]}-border`]:
                                pokemon.type.length > 1
                            },
                            { 'null-border': pokemon.type.length === 1 }
                          )}
                        >
                          <img
                            className="pokemon-analysis-image"
                            alt={pokemon.name.english}
                            src={require(`../../../assets/images/sprites/pokedex/${pokemon.sprite}`)}
                          />
                        </div>
                      </Tooltip>
                    );
                  }
                })}
            </div>
          </div>
        )}
      </div>
    </Fade>
  );
};

export default TeamAnalysis;
