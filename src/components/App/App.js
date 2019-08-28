import React from "react";
import Header from "../Header";
import SideBar from "../SideBar";
import { Grid } from "@material-ui/core";
import SelectPokemon from "../SelectPokemon";

function App() {
  return (
    <div className="App">
      <Header />
      <Grid container>
        <Grid item xs={2}>
          <SideBar />
        </Grid>
        <Grid item xs={10}>
          <SelectPokemon />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
