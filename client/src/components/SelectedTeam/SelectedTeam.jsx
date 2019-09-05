import React, { useEffect, useState, useCallback } from "react";
import { Grid } from "@material-ui/core";
import Pokemon from "./Pokemon";
import PropTypes from "prop-types";
import update from "immutability-helper";
import _ from "lodash";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import TouchBackend from "react-dnd-touch-backend";
import { isBrowser, isMobile } from "react-device-detect";
import "./SelectedTeam.css";

const backends = {
  HTML5Backend,
  TouchBackend: TouchBackend,
  options: { enableMouseEvents: true, preview: true }
};

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

const SelectedTeam = ({ shiny, selectedTeam, updateSelectedTeam }) => {
  const url = shiny ? shinyBaseUrl : baseUrl;
  const [selectedTeamArray, setSelectedTeamArray] = useState([]);

  useEffect(() => {
    const addDiff = selectedTeam.find(
      pokemon => !selectedTeamArray.includes(pokemon)
    );
    const removeDiff = selectedTeamArray.find(
      pokemon => !selectedTeam.includes(pokemon)
    );

    if (addDiff) {
      setSelectedTeamArray([...selectedTeamArray, addDiff]);
      return;
    } else if (removeDiff) {
      setSelectedTeamArray(
        selectedTeamArray.filter(pokemon => pokemon != removeDiff)
      );
      return;
    }
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
        key={pokemon.nationalNumber}
        index={index}
        id={pokemon.nationalNumber}
        pokemon={pokemon}
        movePokemon={movePokemon}
        generateExtension={generateExtension}
        url={url}
      />
    );
  };

  return (
    selectedTeamArray.length > 0 && (
      <DndProvider
        backend={isBrowser ? backends.HTML5Backend : backends.TouchBackend}
        options={isMobile ? backends.TouchBackend.options : {}}
      >
        <Grid container>
          {selectedTeamArray.map((pokemon, i) => renderTeam(pokemon, i))}
        </Grid>
      </DndProvider>
    )
  );
};

SelectedTeam.defaultProps = {
  selectedTeam: []
};

SelectedTeam.propTypes = {
  selectedTeam: PropTypes.arrayOf(PropTypes.shape({}))
};

export default SelectedTeam;
