import React from "react";
import { useDrop } from "react-dnd";
import { Grid } from "@material-ui/core";
import "./App.css";

const style = {
  color: "white"
};

const removePokemon = (
  e,
  oldTeam,
  setTeam,
  setSelectedPokemon,
  selectedPokemon
) => {
  setSelectedPokemon(
    selectedPokemon.filter(pokemon => pokemon !== e.currentTarget.name)
  );
  setTeam({
    ...oldTeam,
    team: oldTeam.team.filter(pokemon => pokemon.name !== e.currentTarget.name)
  });
};

const Team = ({
  accept,
  lastDroppedItem,
  selectedPokemon,
  setSelectedPokemon,
  setTeam,
  team,
  onDrop
}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });
  const isActive = isOver && canDrop;
  let backgroundColor;
  if (isActive) {
    backgroundColor = "darkgreen";
  } else if (canDrop) {
    backgroundColor = "darkkhaki";
  }
  return (
    <div ref={drop} style={{ ...style, backgroundColor }} className="right">
      {isActive ? "Release to add" : `My team: ${accept.join(", ")}`}
      <Grid container style={{ padding: "0" }}>
        {team.team.map(pokemon => (
          <Grid item xs={4} key={pokemon.name}>
            <img
              name={pokemon.name}
              onDoubleClick={e =>
                removePokemon(
                  e,
                  team,
                  setTeam,
                  setSelectedPokemon,
                  selectedPokemon
                )
              }
              alt=""
              className="sprite"
              src={require(`${pokemon.image}`)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
export default Team;
