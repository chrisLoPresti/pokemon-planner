import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { List, Checkbox, withStyles } from '@material-ui/core';
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
                      src={require(`../../assets/images/symbols/${type.toLowerCase()}.png`)}
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

          {/*
       
       
          
      
          <ListItem
            disableGutters
            button
            onClick={e => setOpenFilters('stagesFilter')}
          >
            <ExpansionPanel
              expanded={open && openFilters.includes('stagesFilter')}
              className={classNames(classes.panel, {
                [classes.activeFilter]: onlyStages.length
              })}
            >
              <ExpansionPanelSummary
                IconButtonProps={{
                  classes: {
                    root: classNames(classes.expandButton)
                  }
                }}
                className={classes.summary}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="evolution panel"
              >
                <img
                  className={classes.icon}
                  src={evolution}
                  alt="evolution filter"
                />
                <Typography
                  className={classNames(classes.heading, {
                    [classes.hide]: !open
                  })}
                >
                  Filter by stages
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.details}>
                {stages.map(stage => (
                  <div
                    key={stage}
                    className={classes.checkContainer}
                    onClick={e => updateStageFilter(e, stage)}
                  >
                    <Checkbox
                      checked={isSelectedStage(stage)}
                      value={stage}
                      inputProps={{
                        'aria-label': 'primary checkbox'
                      }}
                    />
                    <p className={classes.filterText}>{stage}</p>
                  </div>
                ))}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </ListItem>
          <ListItem
            disableGutters
            button
            onClick={e => setOpenFilters('legendaryFilter')}
          >
            <ExpansionPanel
              expanded={open && openFilters.includes('legendaryFilter')}
              className={classNames(classes.panel, {
                [classes.activeFilter]: onlyLegendary
              })}
            >
              <ExpansionPanelSummary
                IconButtonProps={{
                  classes: {
                    root: classNames(classes.expandButton)
                  }
                }}
                className={classes.summary}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="legendary panel"
              >
                <img
                  className={classes.icon}
                  src={legendary}
                  alt="legendary filter"
                />
                <Typography
                  className={classNames(classes.heading, {
                    [classes.hide]: !open
                  })}
                >
                  Filter by legendary
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div
                  className={classes.checkContainer}
                  onClick={e => updateShowOnlyLegendary(e, !onlyLegendary)}
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
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </ListItem>
          <ListItem
            disableGutters
            button
            onClick={e => setOpenFilters('mythicFilter')}
          >
            <ExpansionPanel
              expanded={open && openFilters.includes('mythicFilter')}
              className={classNames(classes.panel, {
                [classes.activeFilter]: onlyMythic
              })}
            >
              <ExpansionPanelSummary
                IconButtonProps={{
                  classes: {
                    root: classNames(classes.expandButton)
                  }
                }}
                className={classes.summary}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="mythic panel"
              >
                <img
                  className={classes.icon}
                  src={mythic}
                  alt="mythic filter"
                />
                <Typography
                  className={classNames(classes.heading, {
                    [classes.hide]: !open
                  })}
                >
                  Filter by mythic
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div
                  className={classes.checkContainer}
                  onClick={e => updateShowOnlyMythic(e, !onlyMythic)}
                >
                  <Checkbox
                    checked={onlyMythic}
                    value={onlyMythic}
                    inputProps={{
                      'aria-label': 'primary checkbox'
                    }}
                  />
                  <p>Is a mythic</p>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </ListItem>
          <ListItem
            disableGutters
            button
            onClick={e => setOpenFilters('pseudoFilter')}
          >
            <ExpansionPanel
              expanded={open && openFilters.includes('pseudoFilter')}
              className={classNames(classes.panel, {
                [classes.activeFilter]: onlyPseudo
              })}
            >
              <ExpansionPanelSummary
                IconButtonProps={{
                  classes: {
                    root: classNames(classes.expandButton)
                  }
                }}
                className={classes.summary}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="pseudo panel"
              >
                <img
                  className={classes.icon}
                  src={pseudo}
                  alt="pseudo filter"
                />
                <Typography
                  className={classNames(classes.heading, {
                    [classes.hide]: !open
                  })}
                >
                  Filter by pseudos
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div
                  className={classes.checkContainer}
                  onClick={e => updateShowOnlyPseudo(e, !onlyPseudo)}
                >
                  <Checkbox
                    checked={onlyPseudo}
                    value={onlyPseudo}
                    inputProps={{
                      'aria-label': 'primary checkbox'
                    }}
                  />
                  <p>Is a pseudos leg.</p>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </ListItem> */}
        </List>
      </SideMenu>
    </div>
  );
};

Filters.propTypes = {
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default withStyles(styles)(Filters);
