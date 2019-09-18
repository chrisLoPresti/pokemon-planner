import React, { useState } from 'react';
import { Fade } from '@material-ui/core';
import { types } from '../../../constants/filters';
import typeStats from '../../../constants/typeStats';
import symbols from '../../../assets/images/symbols';
import noThreatsSymbol from '../../../assets/images/misc/noThreats.png';
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
    (typeStats[pokemonTypes[0]].hdt.includes(typeToCheck) &&
      (pokemonTypes.length === 1 ||
        (pokemonTypes.length > 1 &&
          !typeStats[pokemonTypes[1]].hdt.includes(typeToCheck)))) ||
    (!typeStats[pokemonTypes[0]].hdt.includes(typeToCheck) &&
      pokemonTypes.length > 1 &&
      typeStats[pokemonTypes[1]].hdt.includes(typeToCheck))
  ) {
    return <p className="data-block half">1/2</p>;
  } else if (
    typeStats[pokemonTypes[0]].hdt.includes(typeToCheck) &&
    (pokemonTypes.length > 1 &&
      typeStats[pokemonTypes[1]].hdt.includes(typeToCheck))
  ) {
    return <p className="data-block quarter">1/4</p>;
  } else if (
    typeStats[pokemonTypes[0]].ndt.includes(typeToCheck) &&
    (pokemonTypes.length > 1 &&
      typeStats[pokemonTypes[1]].ndt.includes(typeToCheck))
  ) {
    return <p className="data-block zero">0</p>;
  } else {
    return <p className="data-block">1</p>;
  }
};

const generateBlockDataAnalysisWeakness = (pokemonTypes, typeToCheck) => {
  const hasTwoTypes = pokemonTypes.length === 2;
  const noDamage =
    typeStats[pokemonTypes[0]].ndf.includes(typeToCheck) ||
    (hasTwoTypes > 1 && typeStats[pokemonTypes[1]].ndf.includes(typeToCheck));
  const quartDamage =
    typeStats[pokemonTypes[0]].hdf.includes(typeToCheck) &&
    (hasTwoTypes && typeStats[pokemonTypes[1]].hdf.includes(typeToCheck));
  const singleDamage =
    hasTwoTypes &&
    ((typeStats[pokemonTypes[0]].hdf.includes(typeToCheck) &&
      typeStats[pokemonTypes[1]].ddf.includes(typeToCheck)) ||
      (typeStats[pokemonTypes[0]].ddf.includes(typeToCheck) &&
        typeStats[pokemonTypes[1]].hdf.includes(typeToCheck)));
  const halfDamage =
    (typeStats[pokemonTypes[0]].hdf.includes(typeToCheck) && !hasTwoTypes) ||
    (hasTwoTypes &&
      ((typeStats[pokemonTypes[0]].hdf.includes(typeToCheck) &&
        !typeStats[pokemonTypes[1]].hdf.includes(typeToCheck)) ||
        (!typeStats[pokemonTypes[0]].hdf.includes(typeToCheck) &&
          typeStats[pokemonTypes[1]].hdf.includes(typeToCheck))));
  const quadDamage =
    typeStats[pokemonTypes[0]].ddf.includes(typeToCheck) &&
    (hasTwoTypes && typeStats[pokemonTypes[1]].ddf.includes(typeToCheck));
  const doubleDamage =
    typeStats[pokemonTypes[0]].ddf.includes(typeToCheck) ||
    (hasTwoTypes && typeStats[pokemonTypes[1]].ddf.includes(typeToCheck));

  if (noDamage) {
    return <p className="data-block zero">0</p>;
  } else if (quartDamage) {
    return <p className="data-block quadruple">1/4</p>;
  } else if (singleDamage) {
    return <p className="data-block">1</p>;
  } else if (halfDamage) {
    return <p className="data-block half">1/2</p>;
  } else if (quadDamage) {
    return <p className="data-block quarter">4</p>;
  } else if (doubleDamage) {
    return <p className="data-block double">2</p>;
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
    ddfs.forEach(ddf => {
      if (!pokemon.type.includes(ddf)) {
        if (pokemon.type.length === 1) {
          threats[ddf].threat += 2;
        } else {
          ++threats[ddf].threat;
        }
      }
    });
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

const generateThreatsList = (
  threats,
  setHasThreats,
  hasThreats,
  filteredPokemon
) => {
  const returnValue = [];
  [...filteredPokemon]
    .filter(
      (ele, ind) =>
        ind ===
        filteredPokemon.findIndex(
          elem =>
            elem.name.english.split(' ')[0] ===
              ele.name.english.split(' ')[0] &&
            elem.nationalNumber === ele.nationalNumber &&
            JSON.stringify(elem.type) === JSON.stringify(ele.type)
        )
    )
    .sort((pokemon1, pokemon2) => {
      let score1 = 0;
      let score2 = 0;
      score1 += threats[pokemon1.type[0]]
        ? threats[pokemon1.type[0]].threat
        : 0;
      score1 += threats[pokemon1.type[1]]
        ? threats[pokemon1.type[1]].threat
        : 0;
      score1 += pokemon1.fullyEvolved ? 3 : pokemon1.stage;
      score2 += threats[pokemon2.type[0]]
        ? threats[pokemon2.type[0]].threat
        : 0;
      score2 += threats[pokemon2.type[1]]
        ? threats[pokemon2.type[1]].threat
        : 0;
      score2 += pokemon2.fullyEvolved ? 3 : pokemon2.stage;
      return score2 - score1;
    })
    .forEach((pokemon, index) => {
      if (
        threats[pokemon.type[0]] ||
        (pokemon.type.length > 1 && threats[pokemon.type[1]])
      ) {
        returnValue.push(
          <Tooltip
            title={pokemon.name.english}
            enterTouchDelay={0}
            key={`${pokemon.name.english}-analysis-${index}`}
          >
            <div
              className={classNames(
                `analysis-pokemon ${pokemon.type[0]}`,
                {
                  [`${pokemon.type[1]}-border`]: pokemon.type.length > 1
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
    });
  if (returnValue.length > 0 && !hasThreats) {
    setHasThreats(true);
  } else if (returnValue.length === 0) {
    setHasThreats(false);
  }
  return returnValue;
};

const TeamAnalysis = ({ selectedTeam, filteredPokemon }) => {
  const [threats] = useState(generateThreats(selectedTeam));
  const [hasThreats, setHasThreats] = useState(true);

  return (
    <Fade in timeout={500}>
      <div>
        <div className="chart-content">
          <div className="types-chart-left-row-analysis ">
            {selectedTeam.map((pokemon, index) => (
              <Tooltip
                title={pokemon.name.english}
                enterTouchDelay={0}
                key={`${pokemon.name.english}-left-analysis-${index}`}
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
          <p className="team-strengths">Combined Typing Offensive</p>
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
        </div>
        <div className="chart-content">
          <p className="team-strengths">Combined Typing Defensive</p>
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
        </div>
        {hasThreats && (
          <div className="threats-container">
            <p className="team-strengths">Example Threats</p>
            <div className="threats-container">
              {generateThreatsList(
                threats,
                setHasThreats,
                hasThreats,
                filteredPokemon
              )}
            </div>
          </div>
        )}
        {!hasThreats && (
          <div className="no-threats-container">
            <p className="no-threats-title">
              No Threats?! Check your filters, search included!
            </p>
            <img
              className="no-threats"
              alt="no threats"
              src={noThreatsSymbol}
            />
          </div>
        )}
      </div>
    </Fade>
  );
};

export default TeamAnalysis;
