import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { List, Checkbox, withStyles } from '@material-ui/core';
import symbols from '../../assets/images/symbols';
import images from '../../assets/images/misc';
import Suggestions from '../../containers/SuggestionsContainer';
import { types, regions, games, stages } from '../../constants/filters';
import { setQueryString } from '../../utils/queryStringAccess/queryStringAccess';
import ExpansionPanelFilter from '../ExpansionPanelFilter';
import SideMenu from '../SideMenu';
import styles from './styles';

const Filters = ({
  classes,
  setOpen,
  open,
  history,
  updateFilterValue,
  ...redux
}) => {
  const isSelected = (type, value) => {
    if (typeof redux[type] === 'string') {
      return redux[type] === value;
    }
    return redux[type].includes(value);
  };

  const updateRedux = (e, type, value) => {
    let valueToSend = value;
    e.stopPropagation();
    const stateValue = redux[type];
    if (typeof stateValue === 'object') {
      if (stateValue.includes(value)) {
        valueToSend = stateValue.filter(item => item !== value);
      } else {
        valueToSend = [...stateValue, value];
      }
    } else if (typeof stateValue === 'string' && stateValue === value) {
      valueToSend = '';
    }
    updateFilterValue(type, valueToSend);
    setQueryString();
  };

  const [openFilters, updateOpenFilters] = useState([]);

  const setOpenFilters = filter => {
    setOpen(true);
    if (openFilters.includes(filter)) {
      updateOpenFilters(
        openFilters.filter(includedFilter => includedFilter !== filter)
      );
    } else {
      updateOpenFilters([...openFilters, filter]);
    }
  };

  useEffect(() => {
    if (!open) {
      updateOpenFilters([]);
    }
  }, [open]);

  const {
    excludedPokemon,
    onlyTypes,
    onlyRegions,
    onlyStages,
    onlyLegendary,
    onlyMythic,
    onlyPseudo,
    onlyMegas,
    onlyGame
  } = redux;
  return (
    <div className={classes.root}>
      <SideMenu history={history} open={open} setOpen={setOpen}>
        <List>
          <ExpansionPanelFilter
            stopPropagation={true}
            onHandleClick={setOpenFilters}
            filterName="Excluded Pokemon"
            drawerOpen={open}
            active={excludedPokemon.length}
            included={openFilters.includes('Excluded Pokemon')}
            symbol={images.excludeSymbol}
            containsCheckList={false}
            Child={<Suggestions />}
          />
          <ExpansionPanelFilter
            stopPropagation={false}
            onHandleClick={setOpenFilters}
            filterName="Filter By Series"
            drawerOpen={open}
            active={onlyGame.length}
            included={openFilters.includes('Filter By Series')}
            symbol={images.seriesSymbol}
            containsCheckList={true}
            Child={games.map(({ name, abbreviation }) => (
              <div
                key={abbreviation}
                className={classes.checkContainer}
                onClick={e => updateRedux(e, 'onlyGame', abbreviation)}
              >
                <Checkbox
                  checked={isSelected('onlyGame', abbreviation)}
                  value={name}
                  inputProps={{
                    'aria-label': 'primary checkbox'
                  }}
                />
                <p className={classes.filterText}>{name}</p>
              </div>
            ))}
          />
          <ExpansionPanelFilter
            stopPropagation={false}
            onHandleClick={setOpenFilters}
            filterName="Region Filter"
            drawerOpen={open}
            active={onlyRegions.length}
            included={openFilters.includes('Region Filter')}
            symbol={images.regionSymbol}
            containsCheckList={true}
            Child={regions.map(region => (
              <div
                key={region.name}
                className={classes.checkContainer}
                onClick={e => updateRedux(e, 'onlyRegions', region.name)}
              >
                <Checkbox
                  checked={isSelected('onlyRegions', region.name)}
                  value={region.name}
                  inputProps={{
                    'aria-label': 'primary checkbox'
                  }}
                />
                <p className={classes.filterText}>{region.name}</p>
              </div>
            ))}
          />
          <ExpansionPanelFilter
            stopPropagation={false}
            onHandleClick={setOpenFilters}
            filterName="Types Filter"
            drawerOpen={open}
            active={onlyTypes.length}
            included={openFilters.includes('Types Filter')}
            symbol={images.typesSymbol}
            containsCheckList={true}
            Child={types.map(type => (
              <div
                key={type}
                className={classes.checkContainer}
                onClick={e => updateRedux(e, 'onlyTypes', type)}
              >
                <Checkbox
                  checked={isSelected('onlyTypes', type)}
                  value={type}
                  inputProps={{
                    'aria-label': 'primary checkbox'
                  }}
                  checkedIcon={
                    <img
                      alt={type}
                      className={classes.typeSymbol}
                      src={symbols[type]}
                    />
                  }
                />
                <p>{type}</p>
              </div>
            ))}
          />
          <ExpansionPanelFilter
            stopPropagation={false}
            onHandleClick={setOpenFilters}
            filterName="Mega Filter"
            drawerOpen={open}
            active={onlyMegas}
            included={openFilters.includes('Mega Filter')}
            symbol={images.megaSymbol}
            containsCheckList={true}
            Child={
              <div
                className={classes.checkContainer}
                onClick={e => updateRedux(e, 'onlyMegas', !onlyMegas)}
              >
                <Checkbox
                  checked={onlyMegas}
                  value={onlyMegas}
                  inputProps={{
                    'aria-label': 'primary checkbox'
                  }}
                />
                <p>Is mega evolved</p>
              </div>
            }
          />
          <ExpansionPanelFilter
            stopPropagation={false}
            onHandleClick={setOpenFilters}
            filterName="Stages Filter"
            drawerOpen={open}
            active={onlyStages.length}
            included={openFilters.includes('Stages Filter')}
            symbol={images.evolutionSymbol}
            containsCheckList={true}
            Child={stages.map(stage => (
              <div
                key={stage}
                className={classes.checkContainer}
                onClick={e => updateRedux(e, 'onlyStages', stage)}
              >
                <Checkbox
                  checked={isSelected('onlyStages', stage)}
                  value={stage}
                  inputProps={{
                    'aria-label': 'primary checkbox'
                  }}
                />
                <p className={classes.filterText}>{stage}</p>
              </div>
            ))}
          />
          <ExpansionPanelFilter
            stopPropagation={false}
            onHandleClick={setOpenFilters}
            filterName="Legendary Filter"
            drawerOpen={open}
            active={onlyLegendary}
            included={openFilters.includes('Legendary Filter')}
            symbol={images.legendarySymbol}
            containsCheckList={true}
            Child={
              <div
                className={classes.checkContainer}
                onClick={e => updateRedux(e, 'onlyLegendary', !onlyLegendary)}
              >
                <Checkbox
                  checked={onlyLegendary}
                  value={onlyLegendary}
                  inputProps={{
                    'aria-label': 'primary checkbox'
                  }}
                />
                <p>Is a legendary</p>
              </div>
            }
          />
          <ExpansionPanelFilter
            stopPropagation={false}
            onHandleClick={setOpenFilters}
            filterName="Mythic Filter"
            drawerOpen={open}
            active={onlyMythic}
            included={openFilters.includes('Mythic Filter')}
            symbol={images.mythicSymbol}
            containsCheckList={true}
            Child={
              <div
                className={classes.checkContainer}
                onClick={e => updateRedux(e, 'onlyMythic', !onlyMythic)}
              >
                <Checkbox
                  checked={onlyMythic}
                  value={onlyMythic}
                  inputProps={{
                    'aria-label': 'primary checkbox'
                  }}
                />
                <p>Is Mythic</p>
              </div>
            }
          />
          <ExpansionPanelFilter
            stopPropagation={false}
            onHandleClick={setOpenFilters}
            filterName="Pseudo Filter"
            drawerOpen={open}
            active={onlyPseudo}
            included={openFilters.includes('Pseudo Filter')}
            symbol={images.pseudoSymbol}
            containsCheckList={true}
            Child={
              <div
                className={classes.checkContainer}
                onClick={e => updateRedux(e, 'onlyPseudo', !onlyPseudo)}
              >
                <Checkbox
                  checked={onlyPseudo}
                  value={onlyPseudo}
                  inputProps={{
                    'aria-label': 'primary checkbox'
                  }}
                />
                <p>Is a Pseudo</p>
              </div>
            }
          />
        </List>
      </SideMenu>
    </div>
  );
};

Filters.defaultProps = {
  classes: {}
};

Filters.propTypes = {
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  classes: PropTypes.shape({}),
  history: PropTypes.shape({}).isRequired,
  updateFilterValue: PropTypes.func.isRequired
};

export default withStyles(styles)(Filters);
