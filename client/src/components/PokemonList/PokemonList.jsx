import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import List from 'react-virtualized/dist/commonjs/List';
import TypesDrawer from '../../containers/TypesDrawerContainer';
import Img from 'react-image';
import ItemTypes from '../SelectedTeam/ItemTypes';
import _ from 'lodash';
import './PokemonList.css';
const PokemonList = React.memo(
  ({
    filteredPokemon,
    selectedPokemon,
    selectedTeam,
    showNumbers,
    showNames,
    loadingPokemon,
    pokemonLoaded,
    loadPokemonListRequest,
    // updateSelectedPokemon,
    setPokemonListError,
    updateSelectedTeam,
    setFilteredPokemonTotal,
    totalFilteredPokemon,
    canDropPokemon,
    onlyGame
  }) => {
    if (!pokemonLoaded && !loadingPokemon) {
      loadPokemonListRequest();
    }
    const [{ isOver }, drop] = useDrop({
      accept: ItemTypes.POKEMON,
      drop: ({ id }) => {
        const { [id]: match, ...rest } = selectedTeam;
        let hasMega = rest.hasMega;
        if (match.isMega) {
          hasMega = false;
        }
        let count = rest.count - 1;
        updateSelectedTeam({ ...rest, hasMega, count });
      },
      canDrop: () => canDropPokemon,
      collect: monitor => ({
        isOver: monitor.isOver()
      })
    });
    const isActive = canDropPokemon && isOver;
    let backgroundColor = '';
    if (isActive) {
      backgroundColor = '#e53935';
    } else if (canDropPokemon) {
      backgroundColor = '#e57373';
    }
    const dispatchError = error => {
      setPokemonListError(error);
      _.debounce(() => setPokemonListError(''), 1500)();
    };

    const setSelectedTeam = pokemon => {
      const pokemonNumber = pokemon.nationalNumber;
      const {
        [pokemonNumber]: potentialMatch,
        count,
        ...plucked
      } = selectedTeam;

      if (potentialMatch && potentialMatch === pokemon) {
        let hasMega = plucked.hasMega;
        if (pokemon.isMega) {
          hasMega = false;
        }
        return updateSelectedTeam({ ...plucked, count: count - 1, hasMega });
      }

      if (count === 6) {
        dispatchError('You can not have more than six pokemon per team.');
        return;
      }
      if (potentialMatch) {
        return dispatchError(
          'You can not have more than one pokemon with the same national dex number.'
        );
      }
      if (pokemon.isMega && plucked.hasMega) {
        dispatchError('You can not have more than one mega evolution.');
        return;
      }
      updateSelectedTeam({
        ...selectedTeam,
        [pokemonNumber]: pokemon,
        hasMega: plucked.hasMega || pokemon.isMega,
        count: count + 1
      });
    };

    useEffect(() => {
      setFilteredPokemonTotal(filteredPokemon.length);
    }, [filteredPokemon]);

    const randomTeam = () => {
      let currentTeam = { ...selectedTeam };
      if (currentTeam.count === 6) {
        currentTeam = { count: 0, hasMega: false };
      }
      let time = 0;
      while (time < 20 && currentTeam.count !== 6) {
        const index = Math.floor(
          Math.random() * Math.floor(filteredPokemon.length)
        );
        const pokemon = filteredPokemon[index];
        if (
          currentTeam[pokemon.nationalNumber] ||
          (pokemon.isMega && currentTeam.hasMega === true)
        ) {
          ++time;
          continue;
        }
        currentTeam[pokemon.nationalNumber] = pokemon;
        currentTeam.count += 1;
        currentTeam.hasMega = currentTeam.hasMega || pokemon.isMega;
        ++time;
      }
      updateSelectedTeam(currentTeam);
    };

    const [openTypes, setOpenTypes] = useState(false);

    const BOX_WIDTH = showNames ? 150 : 70;
    const BOX_HEIGHT = showNames ? 200 : 120;

    return (
      <>
        <Grid container className="list-button-container">
          <Grid item xs={6}>
            <Button className="random-button" onClick={() => randomTeam()}>
              Randomize
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              className="types-button"
              onClick={() => setOpenTypes(!openTypes)}
            >
              Check Types
            </Button>
          </Grid>
        </Grid>
        <div id="dex-pokemon-container" ref={drop}>
          <AutoSizer>
            {({ height, width }) => {
              const numberOfBoxesPerRow = width
                ? Math.floor(width / BOX_WIDTH)
                : 100;
              const rowCount = Math.ceil(
                totalFilteredPokemon / numberOfBoxesPerRow
              );
              return (
                <List
                  style={{
                    outline: 'none',
                    boxShadow:
                      '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
                    backgroundColor,
                    borderRadius: 10
                  }}
                  height={height}
                  rowCount={rowCount}
                  rowHeight={BOX_HEIGHT}
                  rowRenderer={({ index, isScrolling, key, style }) => {
                    const items = [];
                    const fromIndex = index * numberOfBoxesPerRow;
                    const toIndex = Math.min(
                      fromIndex + numberOfBoxesPerRow,
                      totalFilteredPokemon
                    );
                    for (let i = fromIndex; i < toIndex; i++) {
                      const pokemon = filteredPokemon[i];
                      if (!pokemon) {
                        return;
                      }
                      const pokemonIsSelected =
                        selectedPokemon[pokemon.nationalNumber] === pokemon ||
                        selectedTeam[pokemon.nationalNumber] === pokemon;

                      const type1 = pokemon.type[0];
                      const type2 =
                        pokemon.type.length === 2 ? pokemon.type[1] : null;
                      items.push(
                        <div
                          key={`${key}+${i}`}
                          onClick={() => setSelectedTeam(pokemon)}
                          className={classNames('dex-pokemon-list-item', {
                            large: showNames
                          })}
                        >
                          {showNumbers && (
                            <div
                              className={classNames({
                                'name-container': showNames
                              })}
                            >
                              {showNames && (
                                <p className="name-eng">
                                  {pokemon.name.english}
                                  {(pokemon.name.english === 'Silvally' ||
                                    pokemon.name.english === 'Arceus') &&
                                    ` - ${pokemon.type[0]}`}
                                </p>
                              )}

                              <p className="pokemon-number">
                                #
                                {onlyGame.length
                                  ? pokemon.gamesAvailable[onlyGame]
                                  : pokemon.nationalNumber}
                              </p>
                            </div>
                          )}

                          <div
                            className={classNames(
                              `pokemon-bubble `,
                              { [type1]: !pokemonIsSelected },
                              { [`${type2}-border`]: !pokemonIsSelected },
                              { selected: pokemonIsSelected }
                            )}
                          >
                            <Img
                              className="sprite"
                              src={require(`../../assets/images/sprites/pokedex/${pokemon.sprite}`)}
                              alt={pokemon.name.english}
                            />
                          </div>
                        </div>
                      );
                    }
                    return (
                      <div className="Row" key={key} style={style}>
                        {items}
                      </div>
                    );
                  }}
                  width={width}
                  {...numberOfBoxesPerRow}
                />
              );
            }}
          </AutoSizer>
          {!totalFilteredPokemon && (
            <div className="no-results">
              <h1 className="no-results">Your filters yielded no results!</h1>
              <Img
                className="no-results-image"
                alt="no results"
                src={require('../../assets/images/misc/noResults.png')}
              />
            </div>
          )}
        </div>
        <TypesDrawer open={openTypes} onHandleOpen={setOpenTypes} />
      </>
    );
  }
);

PokemonList.propTypes = {
  showNames: PropTypes.bool.isRequired,
  showNumbers: PropTypes.bool.isRequired,
  setPokemonListError: PropTypes.func.isRequired,
  updateSelectedPokemon: PropTypes.func.isRequired,
  loadPokemonListRequest: PropTypes.func.isRequired,
  filteredPokemon: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedPokemon: PropTypes.shape({}).isRequired,
  selectedTeam: PropTypes.shape({}).isRequired,
  loadingPokemon: PropTypes.bool.isRequired,
  pokemonLoaded: PropTypes.bool.isRequired,
  // updateSelectedPokemon,
  updateSelectedTeam: PropTypes.func.isRequired,
  setFilteredPokemonTotal: PropTypes.func.isRequired,
  totalFilteredPokemon: PropTypes.number.isRequired,
  canDropPokemon: PropTypes.bool.isRequired,
  onlyGame: PropTypes.string.isRequired
};

export default PokemonList;
