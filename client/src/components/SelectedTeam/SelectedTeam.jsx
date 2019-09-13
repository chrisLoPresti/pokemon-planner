import React, { useEffect, useState, useCallback } from 'react';
import { setQueryString } from '../../utils/queryStringAccess/queryStringAccess';
import { Grid, IconButton } from '@material-ui/core';
import Pokemon from './Pokemon';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import TeamPreviewInfo from './TeamPreviewInfo';
import _ from 'lodash';
import './SelectedTeam.css';

const baseUrl = 'http://play.pokemonshowdown.com/sprites/xyani/';
const shinyBaseUrl = 'http://play.pokemonshowdown.com/sprites/xyani-shiny/';

const SelectedTeam = ({
  shiny,
  selectedTeam,
  updateSelectedTeam,
  setCanDropPokemon,
  canDropPokemon,
  excludedPokemon
}) => {
  const url = shiny ? shinyBaseUrl : baseUrl;
  const [selectedTeamArray, setSelectedTeamArray] = useState([]);
  const [infoOpen, handleOpenInfo] = useState(false);
  const [isAPokemonDragging, setIsAPokemonDragging] = useState(false);

  const setSelectedTeam = pokemon => {
    const newTeamObject = {
      hasMega: false,
      count: 0
    };
    selectedTeam.forEach(selectedPokemon => {
      if (selectedPokemon.isMega) {
        newTeamObject.hasMega = true;
      }
      if (selectedPokemon !== pokemon) {
        newTeamObject.count += 1;
        newTeamObject[selectedPokemon.nationalNumber] = selectedPokemon;
      }
    });
    updateSelectedTeam(newTeamObject);
  };

  useEffect(() => {
    setSelectedTeamArray(selectedTeam);
  }, [selectedTeam]);

  const movePokemon = useCallback(
    (dragIndex, hoverIndex) => {
      const dragPokemon = selectedTeamArray[dragIndex];
      setSelectedTeamArray(
        update(selectedTeamArray, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragPokemon]]
        })
      );
    },
    [selectedTeamArray]
  );
  const renderTeam = (pokemon, index) => {
    return (
      <Pokemon
        canDropPokemon={canDropPokemon}
        key={pokemon.nationalNumber}
        index={index}
        id={pokemon.nationalNumber}
        pokemon={pokemon}
        movePokemon={movePokemon}
        generateExtension={generateExtension}
        url={url}
        setSelectedTeam={setSelectedTeam}
        isAPokemonDragging={isAPokemonDragging}
        setIsAPokemonDragging={setIsAPokemonDragging}
        setCanDropPokemon={setCanDropPokemon}
      />
    );
  };

  const generateExtension = mon => {
    const name = mon.name.english
      .toLowerCase()
      .replace(/[.:!@#$%^&*'♀♂-]/g, '')
      .replace(/é+/g, 'e')
      .split(' ');
    if (name[0] === 'silvally' || name[0] === 'arceus') {
      if (mon.type[0] === 'Normal') {
        return `${name[0]}`;
      }
      return `${name[0]}-${mon.type[0].toLowerCase()}`;
    }
    if (
      name[0] === 'tapu' ||
      name[0] === 'mr' ||
      name[0] === 'mime' ||
      name[0] === 'type'
    ) {
      return `${name[0]}${name[1]}`;
    }
    if (name[0] === 'ashgreninja') {
      return 'greninja-ash';
    }
    if (name[0] === 'mega' || name[0] === 'ultra') {
      if (name[1] === 'charizard' || name[1] === 'mewtwo') {
        return `${name[1]}-${name[0]}${name[2]}`;
      }
      return `${name[1]}-${name[0]}`;
    }
    let extension = mon.sprite
      .replace(mon.nationalNumber, '')
      .replace('.png', '');
    if (name[0] === 'alolan' || name[0] === 'primal' || name[1] === 'rotom') {
      return `${name[1]}${extension}`;
    }
    if (name[0] === 'nidoran' && !shiny) {
      if (extension === '_m') {
        return `${name[0]}${extension.replace('_', '')}`;
      } else {
        return `${name[0]}${extension.replace('_', '-')}`;
      }
    }

    return `${name[0]}${extension}`;
  };
  useEffect(() => {
    if (!excludedPokemon.length) {
      return;
    }
    const excludedNames = excludedPokemon.map(excluded => excluded.name);
    setSelectedTeam(
      _.remove(selectedTeam, pokemon =>
        excludedNames.includes(pokemon.name.english)
      )
    );
  }, [excludedPokemon]);

  useEffect(() => {
    setQueryString();
  }, [selectedTeam]);

  return (
    <>
      <Grid container className="selected-team-container">
        <Grid item xs={12} className="team-preview-title">
          Selected Team Preview
          <IconButton
            className="team-preview-icon-container"
            onClick={() => handleOpenInfo(true)}
          >
            <img
              className="team-preview-icon"
              alt="information about the team preview"
              src={
                'http://play.pokemonshowdown.com/sprites/xyani-shiny/unown-question.gif'
              }
            />
          </IconButton>
        </Grid>
        {selectedTeamArray.length === 0 && (
          <Grid item xs={12} className="select-your-team">
            <p>Select your team, or click the Unown for help!</p>
          </Grid>
        )}
        {selectedTeamArray.length > 0 &&
          selectedTeamArray.map((pokemon, i) => renderTeam(pokemon, i))}
      </Grid>
      <TeamPreviewInfo open={infoOpen} setOpen={handleOpenInfo} />
    </>
  );
};

SelectedTeam.defaultProps = {
  selectedTeam: []
};

SelectedTeam.propTypes = {
  selectedTeam: PropTypes.arrayOf(PropTypes.shape({}))
};

export default SelectedTeam;
