import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import queryString from "query-string";
import {
  makeStyles,
  useTheme,
  SwipeableDrawer,
  List,
  Divider,
  IconButton,
  ListItem,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Checkbox
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import typesIcon from "../../assets/images/misc/typesIcon.png";
import region from "../../assets/images/misc/region.png";
import megaSymbol from "../../assets/images/misc/megaSymbol.png";
import evolution from "../../assets/images/misc/evolution.svg";
import legendary from "../../assets/images/misc/legendary.svg";
import mythic from "../../assets/images/misc/mythic.png";
import pseudo from "../../assets/images/misc/pseudo.png";
import games from "../../assets/images/misc/games.png";
import exclude from "../../assets/images/misc/exclude.png";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import types from "../../assets/types";
import Suggestions from "../../containers/SuggestionsContainer";
const regions = [
  {
    name: "Kanto",
    generation: 1
  },
  {
    name: "Johto",
    generation: 2
  },
  {
    name: "Hoenn",
    generation: 3
  },
  {
    name: "Sinnoh",
    generation: 4
  },
  {
    name: "Unova",
    generation: 5
  },
  {
    name: "Kalos",
    generation: 6
  },
  {
    name: "Alola",
    generation: 7
  },
  {
    name: "Galar",
    generation: 8
  }
];

const gamesList = [
  { name: "Red, Blue Yellow", abbreviation: "RBY" },
  { name: "Gold, Silver, Crystal", abbreviation: "GSC" },
  { name: "Ruby, Sapphire, Emerald", abbreviation: "RSE" },
  { name: "FireRed, LeafGreen", abbreviation: "FRLG" },
  { name: "Diamond & Pearl", abbreviation: "DP" },
  { name: "Platinum", abbreviation: "PL" },
  { name: "HeartGold & SoulSilver", abbreviation: "HGSS" },
  { name: "Black & White", abbreviation: "BW" },
  { name: "Black 2 & White 2", abbreviation: "B2W2" },
  { name: "X & Y", abbreviation: "XY" },
  { name: "Omega Ruby & Alpha Sapphire", abbreviation: "ORAS" },
  { name: "Sun & Moon", abbreviation: "SM" },
  { name: "Ultra Sun & Ultra Moon", abbreviation: "USUM" }
];

const stages = [1, 2, 3, "Fully Evolved"];

const drawerWidth = 280;

const useStyles = makeStyles(theme => ({
  hide: {
    color: "transparent"
  },
  icon: {
    color: "ghostWhite",
    height: 40,
    padding: "5px 20px 5px 0",
    [theme.breakpoints.down("xs")]: {
      height: 30
    },
    marginLeft: 15
  },
  iconActive: {
    color: "#ef4b4b"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    overFlow: "hidden",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(8) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    borderRadius: 0,
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  paper: {
    backgroundColor: "#414141",
    color: "ghostwhite"
  },
  filtersLabel: {
    margin: "auto",
    fontWeight: "bold"
  },
  panel: {
    width: drawerWidth,
    margin: 0,
    padding: 0,
    color: "ghostwhite",
    backgroundColor: "#414141"
  },
  summary: {
    padding: 0,
    backgroundColor: "#414141"
  },
  heading: {
    margin: "auto 0"
  },
  details: {
    width: "100%",
    display: "inline-grid",
    padding: 0
  },
  checkContainer: {
    display: "flex",
    margin: "5px",
    "&:last-child": {
      borderBottom: "none"
    },
    borderBottom: "1px solid #212121",
    padding: 10
  },
  expandButton: {
    margin: 0
  },
  activeFilter: {
    borderBottom: "2px solid #06A10B"
  },
  typeSymbol: {
    height: "30px"
  },
  excludeSearch: {
    backgroundColor: "ghostwhite",
    borderRadius: 10,
    width: "100%",
    padding: 5
  },
  filterText: {
    maxWidth: 180,
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
}));

const Filters = ({
  setOpen,
  open,
  excludedPokemon,
  filterByTypes,
  showOnlyMegas,
  filterByRegions,
  filterByStages,
  setFilterError,
  updateFilterByTypes,
  updateFilterByMegas,
  updateFilterByRegions,
  updateFilterByStages,
  updateFilterByLegendary,
  updateFilterByMythic,
  updateFilterByPseudo,
  showOnlyLegendary,
  showOnlyMythic,
  showOnlyPseudo,
  updateExcludedPokemon,
  selectedGame,
  updateSelectedGame,
  history
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSelectedRegion = region => {
    return filterByRegions.includes(region);
  };

  const isSelectedStage = stage => {
    return filterByStages.includes(stage);
  };
  const isSelectedGame = game => {
    return selectedGame === game;
  };

  const isSelectedType = type => {
    return filterByTypes.includes(type);
  };

  const updateRegionFilter = (e, region) => {
    e.stopPropagation();
    if (filterByRegions.includes(region)) {
      updateFilterByRegions(
        filterByRegions.filter(includedRegion => includedRegion !== region)
      );
    } else {
      updateFilterByRegions([...filterByRegions, region]);
    }
  };

  const updateTypesFilter = (e, type) => {
    e.stopPropagation();
    if (filterByTypes.includes(type)) {
      updateFilterByTypes(
        filterByTypes.filter(includedType => includedType !== type)
      );
    } else {
      if (filterByTypes.length === 2) {
        setFilterError("You can only filter by two types at a time.");
        return;
      }
      updateFilterByTypes([...filterByTypes, type]);
    }
  };

  const updateShowOnlyMegas = (e, megasOnly) => {
    e.stopPropagation();
    updateFilterByMegas(megasOnly);
  };

  const updateShowOnlyLegendary = (e, legendsOnly) => {
    e.stopPropagation();
    updateFilterByLegendary(legendsOnly);
  };

  const updateChangeSelectedGame = (e, newGame) => {
    e.stopPropagation();

    if (isSelectedGame(newGame)) {
      updateSelectedGame("");
      return;
    }
    updateSelectedGame(newGame);
  };

  const updateShowOnlyMythic = (e, mythicsOnly) => {
    e.stopPropagation();
    updateFilterByMythic(mythicsOnly);
  };

  const updateShowOnlyPseudo = (e, pseudosOnly) => {
    e.stopPropagation();
    updateFilterByPseudo(pseudosOnly);
  };

  const updateStageFilter = (e, stage) => {
    e.stopPropagation();
    if (filterByStages.includes(stage)) {
      updateFilterByStages(
        filterByStages.filter(includedStages => includedStages !== stage)
      );
    } else {
      updateFilterByStages([...filterByStages, stage]);
    }
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

  useEffect(() => {
    const querySearch = queryString.parse(history.location.search);
    if (!Object.keys(querySearch).length) {
      return;
    }
    const filters = JSON.parse(querySearch.filters);
    const {
      showOnlyLegendary = false,
      showOnlyMythic = false,
      showOnlyPseudo = false,
      showOnlyMegas = false,
      filterByTypes = [],
      filterByRegions = [],
      filterByStages = [],
      excludedPokemon = [],
      selectedGame = ""
    } = filters;
    if (showOnlyLegendary) {
      updateFilterByLegendary(showOnlyLegendary);
    }
    if (showOnlyMythic) {
      updateFilterByMythic(showOnlyMythic);
    }
    if (showOnlyPseudo) {
      updateFilterByPseudo(showOnlyPseudo);
    }
    if (showOnlyMegas) {
      updateFilterByMegas(showOnlyMegas);
    }
    if (filterByTypes.length) {
      updateFilterByTypes(filterByTypes);
    }
    if (filterByRegions.length) {
      updateFilterByRegions(filterByRegions);
    }
    if (filterByStages.length) {
      updateFilterByStages(filterByStages);
    }
    if (excludedPokemon.length) {
      updateExcludedPokemon(excludedPokemon);
    }
    if (selectedGame.length) {
      updateSelectedGame(selectedGame);
    }
  }, []);

  useEffect(() => {
    const querySearch = queryString.parse(history.location.search);

    const { search } = querySearch;
    const query = queryString.stringify({
      filters: JSON.stringify({
        showOnlyLegendary,
        showOnlyMythic,
        showOnlyPseudo,
        filterByTypes,
        showOnlyMegas,
        filterByRegions,
        filterByStages,
        excludedPokemon,
        selectedGame
      }),
      search
    });
    history.push({
      search: query.length > 7 ? query : ""
    });
  }, [
    showOnlyLegendary,
    showOnlyMythic,
    showOnlyPseudo,
    filterByTypes,
    showOnlyMegas,
    filterByRegions,
    filterByStages,
    excludedPokemon,
    selectedGame
  ]);

  return (
    <div className={classes.root}>
      <SwipeableDrawer
        onOpen={() => {}}
        anchor="left"
        onClose={() => setOpen(false)}
        variant={smallScreen ? "temporary" : "permanent"}
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: classNames({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
        PaperProps={{
          classes: {
            root: classNames(classes.paper)
          }
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <p className={classes.filtersLabel}>Filters</p>
          <IconButton onClick={() => setOpen(!open)}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            disableGutters
            button
            onClick={e => setOpenFilters("excludeFilter")}
          >
            <ExpansionPanel
              expanded={open && openFilters.includes("excludeFilter")}
              className={classNames(classes.panel, {
                [classes.activeFilter]: excludedPokemon.length > 0
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
                aria-controls="excluded pokemon panel"
              >
                <img
                  className={classes.icon}
                  src={exclude}
                  alt="excluded pokemon filter"
                />
                <Typography
                  className={classNames(classes.heading, {
                    [classes.hide]: !open
                  })}
                >
                  Excluded pokemon
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails onClick={e => e.stopPropagation()}>
                <Suggestions />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </ListItem>
          <ListItem
            disableGutters
            button
            onClick={e => setOpenFilters("selectedGame")}
          >
            <ExpansionPanel
              expanded={open && openFilters.includes("selectedGame")}
              className={classNames(classes.panel, {
                [classes.activeFilter]: selectedGame.length > 0
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
                aria-controls=" Filter by game panel"
              >
                <img
                  className={classes.icon}
                  src={games}
                  alt=" Filter by game filter"
                />
                <Typography
                  className={classNames(classes.heading, {
                    [classes.hide]: !open
                  })}
                >
                  Filter by game
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.details}>
                {gamesList.map(({ name, abbreviation }) => (
                  <div
                    key={abbreviation}
                    className={classes.checkContainer}
                    onClick={e => updateChangeSelectedGame(e, abbreviation)}
                  >
                    <Checkbox
                      checked={isSelectedGame(abbreviation)}
                      value={name}
                      inputProps={{
                        "aria-label": "primary checkbox"
                      }}
                    />
                    <p className={classes.filterText}>{name}</p>
                  </div>
                ))}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </ListItem>
          <ListItem
            disableGutters
            button
            onClick={e => setOpenFilters("regionFilter")}
          >
            <ExpansionPanel
              expanded={open && openFilters.includes("regionFilter")}
              className={classNames(classes.panel, {
                [classes.activeFilter]: filterByRegions.length
              })}
            >
              <ExpansionPanelSummary
                IconButtonProps={{
                  classes: {
                    root: classNames(classes.expandButton)
                  }
                }}
                className={classes.summary}
                expandIcon={<ExpandMoreIcon style={{ margin: 0 }} />}
                aria-controls="region panel"
              >
                <img
                  className={classes.icon}
                  src={region}
                  alt="region filter"
                />
                <Typography
                  className={classNames(classes.heading, {
                    [classes.hide]: !open
                  })}
                >
                  Filter by region
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.details}>
                {regions.map(region => (
                  <div
                    key={region.name}
                    className={classes.checkContainer}
                    onClick={e => updateRegionFilter(e, region.name)}
                  >
                    <Checkbox
                      checked={isSelectedRegion(region.name)}
                      value={region.name}
                      inputProps={{
                        "aria-label": "primary checkbox"
                      }}
                    />
                    <p className={classes.filterText}>{region.name}</p>
                  </div>
                ))}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </ListItem>
          <ListItem
            disableGutters
            button
            onClick={e => setOpenFilters("typesFilter")}
          >
            <ExpansionPanel
              expanded={open && openFilters.includes("typesFilter")}
              className={classNames(classes.panel, {
                [classes.activeFilter]: filterByTypes.length
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
                aria-controls="types panel"
              >
                <img
                  className={classes.icon}
                  src={typesIcon}
                  alt="types filter"
                />
                <Typography
                  className={classNames(classes.heading, {
                    [classes.hide]: !open
                  })}
                >
                  Filter by types
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.details}>
                {types.map(type => (
                  <div
                    key={type}
                    className={classes.checkContainer}
                    onClick={e => updateTypesFilter(e, type)}
                  >
                    <Checkbox
                      checked={isSelectedType(type)}
                      value={type}
                      inputProps={{
                        "aria-label": "primary checkbox"
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
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </ListItem>
          <ListItem
            disableGutters
            button
            onClick={e => setOpenFilters("megaFilter")}
          >
            <ExpansionPanel
              expanded={open && openFilters.includes("megaFilter")}
              className={classNames(classes.panel, {
                [classes.activeFilter]: showOnlyMegas
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
                aria-controls="megas panel"
              >
                <img
                  className={classes.icon}
                  src={megaSymbol}
                  alt="megas filter"
                />
                <Typography
                  className={classNames(classes.heading, {
                    [classes.hide]: !open
                  })}
                >
                  Filter by megas
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div
                  className={classes.checkContainer}
                  onClick={e => updateShowOnlyMegas(e, !showOnlyMegas)}
                >
                  <Checkbox
                    checked={showOnlyMegas}
                    value={showOnlyMegas}
                    inputProps={{
                      "aria-label": "primary checkbox"
                    }}
                  />
                  <p>Is mega evolved</p>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </ListItem>
          <ListItem
            disableGutters
            button
            onClick={e => setOpenFilters("stagesFilter")}
          >
            <ExpansionPanel
              expanded={open && openFilters.includes("stagesFilter")}
              className={classNames(classes.panel, {
                [classes.activeFilter]: filterByStages.length
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
                        "aria-label": "primary checkbox"
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
            onClick={e => setOpenFilters("legendaryFilter")}
          >
            <ExpansionPanel
              expanded={open && openFilters.includes("legendaryFilter")}
              className={classNames(classes.panel, {
                [classes.activeFilter]: showOnlyLegendary
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
                  onClick={e => updateShowOnlyLegendary(e, !showOnlyLegendary)}
                >
                  <Checkbox
                    checked={showOnlyLegendary}
                    value={showOnlyLegendary}
                    inputProps={{
                      "aria-label": "primary checkbox"
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
            onClick={e => setOpenFilters("mythicFilter")}
          >
            <ExpansionPanel
              expanded={open && openFilters.includes("mythicFilter")}
              className={classNames(classes.panel, {
                [classes.activeFilter]: showOnlyMythic
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
                  onClick={e => updateShowOnlyMythic(e, !showOnlyMythic)}
                >
                  <Checkbox
                    checked={showOnlyMythic}
                    value={showOnlyMythic}
                    inputProps={{
                      "aria-label": "primary checkbox"
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
            onClick={e => setOpenFilters("pseudoFilter")}
          >
            <ExpansionPanel
              expanded={open && openFilters.includes("pseudoFilter")}
              className={classNames(classes.panel, {
                [classes.activeFilter]: showOnlyPseudo
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
                  onClick={e => updateShowOnlyPseudo(e, !showOnlyPseudo)}
                >
                  <Checkbox
                    checked={showOnlyPseudo}
                    value={showOnlyPseudo}
                    inputProps={{
                      "aria-label": "primary checkbox"
                    }}
                  />
                  <p>Is a pseudos leg.</p>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </ListItem>
        </List>
      </SwipeableDrawer>
    </div>
  );
};

Filters.propTypes = {
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  filterByTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  showOnlyMegas: PropTypes.bool.isRequired,
  filterByRegions: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterByStages: PropTypes.arrayOf(PropTypes.string).isRequired,
  setFilterError: PropTypes.func.isRequired,
  updateFilterByTypes: PropTypes.func.isRequired,
  updateFilterByMegas: PropTypes.func.isRequired,
  updateFilterByRegions: PropTypes.func.isRequired,
  updateFilterByStages: PropTypes.func.isRequired,
  updateFilterByLegendary: PropTypes.func.isRequired,
  updateFilterByMythic: PropTypes.func.isRequired,
  updateFilterByPseudo: PropTypes.func.isRequired,
  showOnlyLegendary: PropTypes.bool.isRequired,
  showOnlyMythic: PropTypes.bool.isRequired,
  showOnlyPseudo: PropTypes.bool.isRequired
};

export default Filters;
