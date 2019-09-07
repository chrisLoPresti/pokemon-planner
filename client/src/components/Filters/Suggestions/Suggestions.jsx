import React from "react";
import deburr from "lodash/deburr";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";

const determineAction = (suggestion, excludedPokemon, updateFunction) => {
  const isExcluded = excludedPokemon.find(pokemon => pokemon !== suggestion);
  if (isExcluded) {
    updateFunction(excludedPokemon.filter(pokemon => pokemon !== isExcluded));
  } else {
    updateFunction([...excludedPokemon, suggestion]);
  }
};

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputLabelProps={{
        style: { color: "ghostwhite" }
      }}
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          root: classes.textField,
          input: classes.input,
          underline: classes.underline
        }
      }}
      {...other}
    />
  );
}

function getSuggestions(filteredPokemon, value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : _.uniqBy(
        filteredPokemon.filter(suggestion => {
          const keep =
            count < 4 &&
            suggestion.name.english.slice(0, inputLength).toLowerCase() ===
              inputValue;

          if (keep) {
            count += 1;
          }
          return keep;
        }),
        "name.english"
      );
}

function getSuggestionValue(suggestion) {
  return suggestion.name.english;
}

const useStyles = makeStyles(theme => ({
  root: {
    height: 250,
    flexGrow: 1
  },
  container: {
    position: "relative"
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  suggestion: {
    display: "block"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
  divider: {
    height: theme.spacing(2)
  },
  underline: {
    "&:after": {
      borderBottom: "2px solid #ef4b4b"
    }
  },
  textField: {
    color: "ghostwhite"
  },
  flexDisplay: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "ghostwhite"
  },
  checkDisplay: {
    justifyContent: "start"
  }
}));

export default function IntegrationAutosuggest({
  updateExcludedPokemon,
  filteredPokemon,
  excludedPokemon
}) {
  const classes = useStyles();
  const [search, setSearch] = React.useState("");

  const [stateSuggestions, setSuggestions] = React.useState([]);

  const handleSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(filteredPokemon, value));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleChange = () => (event, { newValue }) => {
    setSearch(newValue);
  };

  function renderSuggestion(suggestion, { query, isHighlighted }) {
    const suggestedName = suggestion.name.english;
    const suggestedSprite = suggestion.sprite;
    const matches = match(suggestedName, query);
    const parts = parse(suggestedName, matches);
    return (
      <MenuItem
        onClick={() =>
          determineAction(
            { name: suggestedName, sprite: suggestedSprite },
            excludedPokemon,
            updateExcludedPokemon
          )
        }
        selected={isHighlighted}
        component="div"
        style={{
          background:
            "linear-gradient(to right bottom, #414141 40%, #5d5d5d 60%)"
        }}
      >
        <div className={classes.flexDisplay}>
          <div>
            {parts.map(part => (
              <span
                key={part.text}
                style={{ fontWeight: part.highlight ? 500 : 400 }}
              >
                {part.text}
              </span>
            ))}
          </div>
          <img
            style={{ alignSelf: "center" }}
            alt={suggestedName}
            src={require(`../../../assets/images/sprites/pokedex/${suggestedSprite}`)}
          />
        </div>
      </MenuItem>
    );
  }

  const autosuggestProps = {
    renderInputComponent,
    suggestions: stateSuggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion
  };

  return (
    <div className={classes.root}>
      <Autosuggest
        {...autosuggestProps}
        onSuggestionSelected={() => setSearch("")}
        inputProps={{
          classes,
          id: "react-autosuggest-simple",
          label: "Exclude Pokemon",
          placeholder: "Search by name (english)",
          value: search,
          onChange: handleChange("single")
        }}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion
        }}
        renderSuggestionsContainer={options => (
          <Paper {...options.containerProps} square>
            {options.children}
          </Paper>
        )}
      />
      <div className={classes.divider} />
      {excludedPokemon.map(({ name, sprite }) => (
        <div
          key={name}
          className={classes.flexDisplay}
          onClick={() =>
            determineAction(
              { name, sprite },
              excludedPokemon,
              updateExcludedPokemon
            )
          }
        >
          <div
            className={classNames(classes.checkDisplay, classes.flexDisplay)}
          >
            <Checkbox
              checked
              value={name}
              inputProps={{
                "aria-label": "primary checkbox"
              }}
            />
            <p>{name}</p>
          </div>
          <img
            style={{ alignSelf: "center" }}
            alt={name}
            src={require(`../../../assets/images/sprites/pokedex/${sprite}`)}
          />
        </div>
      ))}
    </div>
  );
}
