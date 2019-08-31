import React, { useEffect } from "react";
import classNames from "classnames";
import {
  makeStyles,
  useTheme,
  Drawer,
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
import types from "../../assets/types";

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

const stages = [1, 2, 3, "Fully Evolved"];

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  hide: {
    color: "transparent"
  },
  icon: {
    color: "ghostWhite",
    height: 40,
    padding: "10px 20px 10px 0",
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
  }
}));

const Filters = ({
  setOpen,
  open,
  allPokemon,
  filterByTypes,
  showOnlyMegas,
  filterByRegions,
  filterByStages,
  // filtersError,
  setFilterError,
  setTypeFilters,
  setShowOnlyMegas,
  setRegionsFilter,
  setStagesFilter,
  filterPokemonList
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const isSelectedRegion = region => {
    return filterByRegions.includes(region);
  };

  const isSelectedStage = stage => {
    return filterByStages.includes(stage);
  };

  const isSelectedType = type => {
    return filterByTypes.includes(type);
  };

  const updateRegionFilter = (e, region) => {
    e.stopPropagation();
    if (filterByRegions.includes(region)) {
      setRegionsFilter(
        filterByRegions.filter(includedRegion => includedRegion !== region)
      );
    } else {
      setRegionsFilter([...filterByRegions, region]);
    }
  };

  const updateTypesFilter = (e, type) => {
    e.stopPropagation();
    if (filterByTypes.includes(type)) {
      setTypeFilters(
        filterByTypes.filter(includedType => includedType !== type)
      );
    } else {
      if (filterByTypes.length === 2) {
        setFilterError("You can only filter by two types at a time.");
        return;
      }
      setTypeFilters([...filterByTypes, type]);
    }
  };

  const updateShowOnlyMegas = (e, megasOnly) => {
    e.stopPropagation();
    setShowOnlyMegas(megasOnly);
  };

  const updateStageFilter = (e, stage) => {
    e.stopPropagation();
    if (filterByStages.includes(stage)) {
      setStagesFilter(
        filterByStages.filter(includedStages => includedStages !== stage)
      );
    } else {
      setStagesFilter([...filterByStages, stage]);
    }
  };

  const massFilter = () => {
    const newlyFilteredPokemon = allPokemon.filter(pokemon => {
      let validRegion = true;
      let validTypes = true;
      let validMega = true;
      let validStage = true;
      if (filterByRegions.length) {
        validRegion = filterByRegions.includes(pokemon.region);
      }
      if (filterByTypes.length) {
        let type1Confirmed = filterByTypes.includes(pokemon.type1);
        let type2Confirmed = filterByTypes.includes(pokemon.type2);
        if (filterByTypes.length === 1) {
          validTypes = type1Confirmed || type2Confirmed;
        } else {
          validTypes = type1Confirmed && type2Confirmed;
        }
      }

      if (showOnlyMegas) {
        validMega = pokemon.name_eng.indexOf("Mega") >= 0;
      }

      if (filterByStages.length) {
        validStage =
          filterByStages.includes(pokemon.stage) ||
          (filterByStages.includes("Fully Evolved") && pokemon.fullyEvolved);
      }
      if (validRegion && validTypes && validMega && validStage) {
        return pokemon;
      }
    });
    filterPokemonList(newlyFilteredPokemon);
  };

  useEffect(() => {
    massFilter();
  }, [filterByTypes, showOnlyMegas, filterByRegions, filterByStages]);
  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
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
          <ListItem disableGutters button onClick={() => setOpen(true)}>
            <ExpansionPanel
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
                    <p>{region.name}</p>
                  </div>
                ))}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </ListItem>
          <ListItem disableGutters button onClick={() => setOpen(true)}>
            <ExpansionPanel
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
          <ListItem disableGutters button onClick={() => setOpen(true)}>
            <ExpansionPanel
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
                  alt="region filter"
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
          <ListItem disableGutters button onClick={() => setOpen(true)}>
            <ExpansionPanel
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
                    <p>{stage}</p>
                  </div>
                ))}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Filters;
