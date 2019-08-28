import React from "react";
import { Switch } from "@material-ui/core";
import PropTypes from "prop-types";
import pokemonTypes from "../../../assets/types";
import classNames from "classnames";
import "./Filters.css";

const Filters = ({ selectedTypes, showNumbers, showNames, onChange }) => {
  return (
    <div container className="filters-container filters-grid-flex">
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
      <div className="filter-content">
        <p className="filter-title">Types</p>
        {pokemonTypes.map(type => (
          <img
            key={type}
            className={classNames("type-symbol", "inactive", {
              active: selectedTypes.includes(type)
            })}
            onClick={() => onChange("selectedTypes", type)}
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
  selectedTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired
};

export default Filters;
