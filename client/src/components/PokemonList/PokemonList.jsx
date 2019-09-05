import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import PropTypes from "prop-types";
import classNames from "classnames";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import List from "react-virtualized/dist/commonjs/List";
import ItemTypes from "../SelectedTeam/ItemTypes";
import "./PokemonList.css";

const PokemonList = React.memo(
  ({
    filteredPokemon,
    selectedPokemon,
    selectedTeam,
    showNumbers,
    showNames,
    pokemonListError,
    loadingPokemon,
    pokemonLoaded,
    loadPokemonListRequest,
    updateSelectedPokemon,
    setPokemonListError,
    updateSelectedTeam,
    setFilteredPokemonTotal,
    totalFilteredPokemon,
    history,
    canDropPokemon
  }) => {
    const [allowPokemonToDrop, setAllowPokemonToDrop] = useState(false);
    useEffect(() => {
      setAllowPokemonToDrop(canDropPokemon);
    }, [canDropPokemon]);

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
      canDrop: () => allowPokemonToDrop,
      collect: monitor => ({
        isOver: monitor.isOver()
        // canDrop: monitor.canDrop()
      })
    });
    const isActive = allowPokemonToDrop && isOver;
    let backgroundColor = "";
    if (isActive) {
      backgroundColor = "#e53935";
    } else if (allowPokemonToDrop) {
      backgroundColor = "#e57373";
    }
    const dispatchError = error => {
      setPokemonListError(error);
      setTimeout(() => {
        setPokemonListError("");
      }, 1500);
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
      if (potentialMatch) {
        return dispatchError(
          "You can not have more than one pokemon with the same national dex number."
        );
      }
      if (pokemon.isMega && plucked.hasMega) {
        dispatchError("You can not have more than one mega evolution.");
        return;
      }
      if (count === 6) {
        dispatchError("You can not have more than six pokemon per team.");
        return;
      }
      return updateSelectedTeam({
        ...selectedTeam,
        [pokemonNumber]: pokemon,
        hasMega: plucked.hasMega || pokemon.isMega,
        count: count + 1
      });
    };

    useEffect(() => {
      setFilteredPokemonTotal(filteredPokemon.length);
    }, [setFilteredPokemonTotal, filteredPokemon]);

    const BOX_WIDTH = showNames ? 150 : 70;
    const BOX_HEIGHT = showNames ? 200 : 120;
    return (
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
                  outline: "none",
                  boxShadow:
                    "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
                  backgroundColor
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

                    const pokemonIsAlolan = pokemon.region === "Alola";
                    const type1 = pokemon.type[0];
                    const type2 =
                      pokemon.type.length === 2 ? pokemon.type[1] : null;
                    items.push(
                      <div
                        key={`${key}+${i}`}
                        onClick={() => setSelectedTeam(pokemon)}
                        className={classNames("dex-pokemon-list-item", {
                          large: showNames
                        })}
                      >
                        {showNumbers && (
                          <div
                            className={classNames({
                              "name-container": showNames
                            })}
                          >
                            {showNames && (
                              <p className="name-eng">{pokemon.name.english}</p>
                            )}

                            <p className="pokemon-number">
                              #{pokemon.nationalNumber}
                            </p>
                          </div>
                        )}

                        <div
                          className={classNames(
                            `pokemon-bubble `,
                            { "alolan-line-height": pokemonIsAlolan },
                            { [type1]: !pokemonIsSelected },
                            { [`${type2}-border`]: !pokemonIsSelected },
                            { selected: pokemonIsSelected }
                          )}
                        >
                          <img
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
            <img
              className="no-results-image"
              alt="no results"
              src={require("../../assets/images/misc/no-results.png")}
            />
          </div>
        )}
      </div>
    );
  }
);

PokemonList.propTypes = {
  showNames: PropTypes.bool.isRequired,
  showNumbers: PropTypes.bool.isRequired,
  selectedTeam: PropTypes.PropTypes.shape({}).isRequired,
  updateSelectedPokemon: PropTypes.func.isRequired
};

export default PokemonList;
