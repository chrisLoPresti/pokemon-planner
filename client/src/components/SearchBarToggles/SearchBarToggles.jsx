import React from 'react';
import {
  Grid,
  Button,
  Input,
  IconButton,
  Switch,
  withStyles
} from '@material-ui/core';
import Img from 'react-image';
import PropTypes from 'prop-types';
import clearImage from '../../assets/images/misc/clear.png';
import { setQueryString } from '../../utils/queryStringAccess/queryStringAccess';
import './SearchBarToggles.css';

const styles = {
  root: {
    color: 'ghostwhite'
  },
  underline: {
    '&:after': {
      borderBottom: '2px solid #ef4b4b'
    }
  }
};

const SearchBarToggles = React.memo(
  ({
    classes,
    showNames,
    showNumbers,
    setShowNames,
    setShowNumbers,
    updateSearchCriteria,
    totalFilteredPokemon,
    search,
    shiny,
    updateShinySprites,
    updateSelectedTeam
  }) => {
    const updateSearch = value => {
      updateSearchCriteria(value);
      setQueryString();
    };
    return (
      <Grid container className="toggles-container">
        <Grid item xs={12} className="margin-container">
          <p className="total-results">Total Results: {totalFilteredPokemon}</p>
        </Grid>
        <Grid item xs={2} md={1} className="toggle-content">
          <p className="toggle-title">Names</p>
          <Switch
            className="switch"
            checked={showNames}
            onChange={() => setShowNames(!showNames)}
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </Grid>
        <Grid item xs={2} md={1} className="toggle-content">
          <p className="toggle-title">Numbers</p>
          <Switch
            className="switch"
            checked={showNumbers}
            onChange={() => setShowNumbers(!showNumbers)}
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </Grid>
        <Grid item xs={2} md={1} className="margin-container">
          <p className="toggle-title">Shiny</p>
          <Switch
            className="switch"
            checked={shiny}
            onChange={() => updateShinySprites(!shiny)}
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </Grid>
        <Grid item xs={10} md={9} className="margin-container">
          <p className="toggle-title">Search</p>
          <Input
            value={search}
            onChange={e => updateSearch(e.currentTarget.value)}
            className="search-bar"
            placeholder="Search by name"
            classes={{
              root: classes.root,
              underline: classes.underline
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
          <IconButton
            className="clear-search-image-container"
            onClick={() => updateSearch('')}
          >
            <Img
              className="clear-search-image"
              src={clearImage}
              alt="clear search"
            />
          </IconButton>
        </Grid>
        <Grid item xs={12} className="button-container">
          <Button disabled className="specs-button">
            Set Specs
          </Button>
          <Button
            className="clear-team-button"
            onClick={() => updateSelectedTeam({ count: 0, hasMega: false })}
          >
            Clear Team
          </Button>
        </Grid>
      </Grid>
    );
  }
);
SearchBarToggles.defaultProps = {
  classes: {}
};

SearchBarToggles.propTypes = {
  showNames: PropTypes.bool.isRequired,
  showNumbers: PropTypes.bool.isRequired,
  classes: PropTypes.shape({}),
  search: PropTypes.string.isRequired,
  shiny: PropTypes.bool.isRequired,
  updateSelectedTeam: PropTypes.func.isRequired,
  setShowNames: PropTypes.func.isRequired,
  setShowNumbers: PropTypes.func.isRequired,
  updateSearchCriteria: PropTypes.func.isRequired,
  totalFilteredPokemon: PropTypes.number.isRequired,
  updateShinySprites: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(SearchBarToggles);
