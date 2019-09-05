import React from "react";
import { Grid } from "@material-ui/core";
import "./SelectedTeam.css";

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

  return (
    <Grid container>
      {Object.keys(selectedTeam).length > 2 &&
        Object.keys(selectedTeam).map(key => {
          if (key == "count" || key == "hasMega") {
            return;
          }
          const mon = selectedTeam[key];
          return (
            <Grid item xs={4} md={2} className="selected-team-container">
              <img
                className="selected-pokemon"
                key={mon.name.english}
                src={`${url}${generateExtension(mon)}.gif`}
              />
            </Grid>
          );
        })}
    </Grid>
  );
};

export default SelectedTeam;
