import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SelectPokemon from "../../containers/SelectPokemonContainer";
import Filters from "../../containers/FiltersContainer";
import Header from "../Header";
import { BrowserRouter as Router, Route } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  content: {
    width: "100%"
  }
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <div className={classes.root}>
      <Header open={open} setOpen={setOpen} />
      <Router>
        <Route
          path={"/"}
          render={props => <Filters {...props} open={open} setOpen={setOpen} />}
        />
        <main className={classes.content}>
          <Route path={"/"} render={props => <SelectPokemon {...props} />} />
        </main>
      </Router>
    </div>
  );
}
