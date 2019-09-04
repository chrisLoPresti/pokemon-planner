import React, { useEffect } from "react";
import { Grid, Input, Switch, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import queryString from "query-string";
import "./SearchBarToggles.css";

const styles = {
  root: {
    color: "ghostwhite"
  },
  underline: {
    "&:after": {
      borderBottom: "2px solid #ef4b4b"
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
    history
  }) => {
    useEffect(() => {
      const querySearch = queryString.parse(history.location.search);
      if (!Object.keys(querySearch).length) {
        return;
      }
      if (querySearch.search) {
        updateSearchCriteria(querySearch.search);
      }
    }, []);
    useEffect(() => {
      const querySearch = queryString.parse(history.location.search);

      const filters = querySearch.filters
        ? JSON.parse(querySearch.filters)
        : {};
      const query = queryString.stringify({
        filters: JSON.stringify(filters),
        search
      });
      history.push({
        search: query.length > 7 ? query : ""
      });
    }, [search]);

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
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        </Grid>
        <Grid item xs={2} md={1} className="toggle-content">
          <p className="toggle-title">Numbers</p>
          <Switch
            className="switch"
            checked={showNumbers}
            onChange={() => setShowNumbers(!showNumbers)}
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        </Grid>
        <Grid item xs={2} md={1} className="margin-container">
          <p className="toggle-title">Shiny</p>
          <Switch
            className="switch"
            checked={shiny}
            onChange={() => updateShinySprites(!shiny)}
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        </Grid>
        <Grid item xs={10} sm={6} className="margin-container">
          <p className="toggle-title">Search</p>
          <Input
            value={search}
            onChange={e => {
              updateSearchCriteria(e.currentTarget.value);
            }}
            className="search-bar"
            placeholder="Search by name"
            classes={{
              root: classes.root,
              underline: classes.underline
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </Grid>
      </Grid>
    );
  }
);

SearchBarToggles.propTypes = {
  showNames: PropTypes.bool.isRequired,
  showNumbers: PropTypes.bool.isRequired,
  classes: PropTypes.shape({}).isRequired,
  search: PropTypes.string.isRequired,
  shiny: PropTypes.bool.isRequired
};

export default withStyles(styles)(SearchBarToggles);
