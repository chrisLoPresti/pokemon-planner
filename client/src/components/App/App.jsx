import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SelectPokemon from '../../containers/SelectPokemonContainer';
import Filters from '../../containers/FiltersContainer';
import Header from '../../containers/HeaderContainer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider, useTheme } from '@material-ui/core';
// import { newMove } from '../../actions/adminActions/adminActions';
// import axios from 'axios';
import store from '../../store';
import { subscribeToUserCount } from '../../actions/socketActions/socketActions';
import { parseQueryString } from '../../utils/queryStringAccess/queryStringAccess';

store.dispatch(subscribeToUserCount());
parseQueryString();

// import data from "../../../../pokemon/moves/data";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  content: {
    width: '100%'
  }
}));

// const func = () => {
// const array = [];
// data.forEach(obj => {
//   axios
//     .get(obj.url)
//     .then(response => {
//       array.push({
//         ...response.data
//       });
//     })
//     .catch(error => {
//       console.error(error);
//     });
// });
// setTimeout(() => {
//   console.log(array);
//   localStorage.setItem("moves", JSON.stringify(array));
// }, 5000);
// };

export default function MiniDrawer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  // func();
  // data.forEach(move => {
  //   store.dispatch(newMove(move));
  // });

  return (
    <MuiThemeProvider theme={useTheme()}>
      <div className={classes.root}>
        <Header open={open} setOpen={setOpen} />
        <Router>
          <Route
            path={'/'}
            render={props => (
              <Filters {...props} open={open} setOpen={setOpen} />
            )}
          />
          <main className={classes.content}>
            <Route path={'/'} render={props => <SelectPokemon {...props} />} />
          </main>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}
