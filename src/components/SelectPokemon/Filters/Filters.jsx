import React from "react";
import { Input, Switch, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import pokemonTypes from "../../../assets/types";
import classNames from "classnames";
import "./Filters.css";

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

const Filters = ({
  classes,
  showNumbers,
  showNames,
  onChange,
  search,
  types
}) => {
  return (
    <div className="filters-container filters-grid-flex">
      <div className="filter-content">
        <p className="filter-title">Names</p>
        <Switch
          className="switch"
          checked={showNames}
          onChange={() => onChange("showNames", !showNames)}
          value="checkedA"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
      </div>
      <div className="filter-content">
        <p className="filter-title">Numbers</p>
        <Switch
          className="switch"
          checked={showNumbers}
          onChange={() => onChange("showNumbers", !showNumbers)}
          value="checkedA"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
      </div>
      <div className="search-bar-container">
        <p className="filter-title">Search</p>
        <Input
          value={search}
          onChange={e => onChange("search", e.currentTarget.value)}
          className="search-bar"
          placeholder="Search by name"
          classes={{
            root: classes.root,
            underline: classes.underline
          }}
          inputProps={{ "aria-label": "search" }}
        />
        {pokemonTypes.map(type => (
          <img
            key={type}
            className={classNames("type-symbol", "inactive", {
              active: types.includes(type)
            })}
            onClick={() => onChange("types", type)}
            alt={type}
            src={require(`../../../assets/images/symbols/${type.toLowerCase()}.png`)}
          />
        ))}
      </div>
    </div>
  );
};

Filters.propTypes = {
  showNames: PropTypes.bool.isRequired,
  showNumbers: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  search: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.string)
};

export default withStyles(styles)(Filters);
