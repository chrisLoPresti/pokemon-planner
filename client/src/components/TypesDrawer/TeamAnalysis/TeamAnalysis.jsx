import React from 'react';
import { Fade } from '@material-ui/core';
import { types } from '../../../constants/filters';
import typeStats from '../../../constants/typeStats';
import symbols from '../../../assets/images/symbols';
import Tooltip from '@material-ui/core/Tooltip';

const generateBlockDataAnalysis = (pokemonTypes, typeToCheck) => {
  if (
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
    typeStats[pokemonTypes[0]].ndt.includes(typeToCheck) ||
    (pokemonTypes.length > 1 &&
      typeStats[pokemonTypes[1]].ndt.includes(typeToCheck))
  ) {
    return <p className="data-block zero">0</p>;
  } else {
    return <p className="data-block">1</p>;
  }
};

const generateTypeAnalysis = selectedTeam =>
  selectedTeam.map(({ name: { english }, type: pokemonTypes }) => (
    <div className="data-row" key={`${english}-outer`}>
      {types.map(innerType => (
        <div key={`${innerType}-inner`}>
          {generateBlockDataAnalysis(pokemonTypes, innerType)}
        </div>
      ))}
    </div>
  ));

const TeamAnalysis = ({ selectedTeam }) => (
  <Fade in timeout={500}>
    <div>
      <p className="team-strengths">Team Strengths</p>
      <div className="chart-content">
        <div className="types-scroller">
          <div className="types-chart-top-row">
            {types.map(type => (
              <div className="data-block" key={`${type}-top-analysis`}>
                <Tooltip title={type} enterTouchDelay={0}>
                  <img
                    className="type-chart-symbol"
                    alt={type}
                    src={symbols[type]}
                  />
                </Tooltip>
              </div>
            ))}
          </div>
          {generateTypeAnalysis(selectedTeam)}
        </div>
        <div className="types-chart-left-row-analysis ">
          {selectedTeam.map(pokemon => (
            <Tooltip
              title={pokemon.name.english}
              enterTouchDelay={0}
              key={`${pokemon.name.english}-left-analysis`}
            >
              <div className="left-pokemon-container">
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
    </div>
  </Fade>
);

export default TeamAnalysis;
