import React from 'react';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import classNames from 'classnames';
import Img from 'react-image';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styles from './styles';

const determineAction = (suggestion, excludedPokemon, updateFunction) => {
  const isExcluded = excludedPokemon.find(
    ({ name }) => name === suggestion.name
  );
  if (isExcluded) {
    updateFunction(
      excludedPokemon.filter(({ name }) => name !== isExcluded.name)
    );
  } else {
    updateFunction([...excludedPokemon, suggestion]);
  }
};

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      id="tet"
      fullWidth
      InputLabelProps={{
        style: { color: 'ghostwhite' }
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

function getSuggestions(allPokemon, value, excludedPokemon) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : _.uniqBy(
        allPokemon.filter(suggestion => {
          const suggestedName = suggestion.name.english;

          const keep =
            count < 4 &&
            !excludedPokemon.some(pokemon => pokemon.name === suggestedName) &&
            suggestedName.toLowerCase().includes(inputValue);

          if (keep) {
            count += 1;
          }
          return keep;
        }),
        'name.english'
      );
}

function getSuggestionValue(suggestion) {
  return suggestion.name.english;
}

const IntegrationAutosuggest = ({
  updateFilterByExcluded,
  allPokemon,
  excludedPokemon,
  classes
}) => {
  const [search, setSearch] = React.useState('');

  const [stateSuggestions, setSuggestions] = React.useState([]);

  const handleSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(allPokemon, value, excludedPokemon));
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
            {
              name: suggestedName,
              sprite: suggestedSprite,
              nationalNumber: suggestion.nationalNumber
            },
            excludedPokemon,
            updateFilterByExcluded
          )
        }
        selected={isHighlighted}
        component="div"
        style={{
          background:
            'linear-gradient(to right bottom, #414141 40%, #5d5d5d 60%)'
        }}
      >
        <div className={classes.flexDisplay}>
          <div
            style={{
              width: 180,
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {parts.map(part => (
              <span
                key={part.text}
                style={{
                  fontWeight: part.highlight ? 500 : 400
                }}
              >
                {part.text}
              </span>
            ))}
          </div>
          <Img
            style={{ alignSelf: 'center' }}
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
        onSuggestionSelected={() => setSearch('')}
        inputProps={{
          classes,
          id: 'react-autosuggest-simple',
          label: 'Exclude Pokemon',
          placeholder: 'Search by name (english)',
          value: search,
          onChange: handleChange('single')
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
      <div className={classes.checkBoxContainer}>
        {excludedPokemon.map(({ name, sprite, nationalNumber }) => (
          <div
            key={name}
            className={classes.flexDisplay}
            onClick={() =>
              determineAction(
                { name, sprite, nationalNumber },
                excludedPokemon,
                updateFilterByExcluded
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
                  'aria-label': 'primary checkbox'
                }}
              />
              <p
                style={{
                  width: 120,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {name}
              </p>
            </div>
            <Img
              style={{ alignSelf: 'center' }}
              alt={name}
              src={require(`../../../assets/images/sprites/pokedex/${sprite}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

IntegrationAutosuggest.defaultProps = {
  classes: {}
};

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.shape({}),
  updateFilterByExcluded: PropTypes.func.isRequired,
  allPokemon: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  excludedPokemon: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default withStyles(styles)(IntegrationAutosuggest);
