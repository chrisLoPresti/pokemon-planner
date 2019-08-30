import React from "react";
import { Grid, Input, Switch, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
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

const SearchBarToggles = ({
  classes,
  showNames,
  showNumbers,
  setShowNames,
  setShowNumbers,
  updateSearchCriteria,
  search
}) => {
  return (
    <Grid container className="toggles-container">
      <Grid xs={1} className="toggle-content">
        <p className="toggle-title">Names</p>
        <Switch
          className="switch"
          checked={showNames}
          onChange={() => setShowNames(!showNames)}
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
      </Grid>
      <Grid xs={1} className="toggle-content">
        <p className="toggle-title">Numbers</p>
        <Switch
          className="switch"
          checked={showNumbers}
          onChange={() => setShowNumbers(!showNumbers)}
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
      </Grid>
      <Grid xs={12} sm={8}>
        <p className="toggle-title">Search</p>
        <Input
          value={search}
          onChange={e => updateSearchCriteria(e.currentTarget.value)}
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
};

SearchBarToggles.propTypes = {
  showNames: PropTypes.bool.isRequired,
  showNumbers: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  search: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.string)
};

export default withStyles(styles)(SearchBarToggles);
