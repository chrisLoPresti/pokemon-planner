import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import List from "react-virtualized/dist/commonjs/List";
import queryString from "query-string";
import "./PokemonList.css";

const baseUrl = "http://play.pokemonshowdown.com/sprites/xyani/";
const shinyBaseUrl = "http://play.pokemonshowdown.com/sprites/xyani-shiny/";

const generateExtension = mon => {
  const name = mon.name.english
    .toLowerCase()
    .replace("'", "")
    .split(" ");
  if (name[0] === "silvally") {
    return `${name[0]}-${mon.type[0].toLowerCase()}`;
  }
  if (name[0] === "ash-greninja") {
    return "greninja-ash";
  }
  if (name[0] === "mega" || name[0] === "ultra") {
    if (name[1] === "charizard" || name[1] === "mewtwo") {
      return `${name[1]}-${name[0]}${name[2]}`;
    }
    return `${name[1]}-${name[0]}`;
  }
  let extension = mon.sprite
    .replace(mon.nationalNumber, "")
    .replace(".png", "");
  if (name[0] === "alolan") {
    return `${name[1]}${extension}`;
  }
  if (name[1] === "rotom") {
    return `${name[1]}${extension}`;
  }

  if (extension === "-female") {
    extension = "-f";
  }
  return `${name[0]}${extension}`;
};
const PokemonList = React.memo(
  ({
    shiny,
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
    history
  }) => {
    if (!pokemonLoaded && !loadingPokemon) {
      loadPokemonListRequest();
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
        let hasMega = pokemon.hasMega;
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
      if (pokemon.isMega && selectedTeam.hasMega) {
        dispatchError("You can not have more than one mega evolution.");
        return;
      }
      if (selectedTeam.count === 6) {
        dispatchError("You can not have more than six pokemon per team.");
        return;
      }
      return updateSelectedTeam({
        ...selectedTeam,
        [pokemonNumber]: pokemon,
        hasMega: pokemon.isMega,
        count: count + 1
      });
    };

    useEffect(() => {
      setFilteredPokemonTotal(filteredPokemon.length);
    }, [setFilteredPokemonTotal, filteredPokemon]);

    const BOX_WIDTH = showNames ? 150 : 70;
    const BOX_HEIGHT = showNames ? 200 : 100;
    const url = shiny ? shinyBaseUrl : baseUrl;
    return (
      <div id="dex-pokemon-container">
        {selectedTeam.count !== 0 && (
          <div
            style={{
              boxShadow: "0 4px 6px -6px #222",
              padding: 30,
              marginBottom: 20
            }}
          >
            {Object.keys(selectedTeam).length > 2 &&
              Object.keys(selectedTeam).map(key => {
                if (key == "count" || key == "hasMega") {
                  return;
                }
                const mon = selectedTeam[key];
                return (
                  <img
                    key={mon.name.english}
                    style={{ margin: "10px" }}
                    src={`${url}${generateExtension(mon)}.gif`}
                  />
                );
              })}
          </div>
        )}
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
                  outline: "none"
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
                              #{pokemon.nationalNumber}{" "}
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
                    <div
                      className="Row"
                      key={key}
                      style={{
                        ...style,
                        justifyContent:
                          toIndex === totalFilteredPokemon
                            ? "flex-start"
                            : "space-evenly",
                        paddingTop: !showNumbers && !showNames ? 20 : 0
                      }}
                    >
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
