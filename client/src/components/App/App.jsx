import React from "react";
import classNames from "classnames";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SelectPokemon from "../../containers/SelectPokemonContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import typesIcon from "../../assets/images/misc/typesIcon.png";
import region from "../../assets/images/misc/region.png";
import megaSymbol from "../../assets/images/misc/megaSymbol.png";
import evolution from "../../assets/images/misc/evolution.svg";

import home from "../../assets/images/home/home.png";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    fontFamily: "Pokemon Solid",
    backgroundColor: "#313131",
    color: "ghostwhite",
    letterSpacing: "0.1rem"
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    // marginRight: 36
  },
  hide: {
    display: "none"
  },
  home: {
    marginRight: 10,
    height: "50px",
    cursor: "pointer"
  },
  icon: {
    color: "ghostWhite",
    height: 40,
    padding: "10px 20px 10px 0",
    [theme.breakpoints.down("xs")]: {
      height: 30
    }
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
  content: {
    width: "100%",
    backgroundColor: "#525252",
    paddingTop: "60px"
  },
  paper: {
    backgroundColor: "#414141",
    color: "ghostwhite"
  },
  filtersLabel: {
    margin: "auto",
    fontWeight: "bold"
  }
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
            edge="start"
            className={classNames(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <img alt="home" className={classes.home} src={home} />
          Pokémon Team Planner
        </Toolbar>
      </AppBar>
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
          <p className={classes.filtersLabel}>SearchBarToggles</p>
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
          <ListItem button onClick={() => setOpen(true)}>
            <img className={classes.icon} src={region} alt="region filter" />
            <ListItemText
              className={classNames({ [classes.hide]: !open })}
              primary="Filter by region"
            />
          </ListItem>
          <ListItem button onClick={() => setOpen(true)}>
            <img className={classes.icon} src={typesIcon} alt="types filter" />
            <ListItemText
              className={classNames({ [classes.hide]: !open })}
              primary="Filter by types"
            />
          </ListItem>
          <ListItem button onClick={() => setOpen(true)}>
            <img
              className={classes.icon}
              src={megaSymbol}
              alt="region filter"
            />
            <ListItemText
              className={classNames({ [classes.hide]: !open })}
              primary="Filter by megas"
            />
          </ListItem>
          <ListItem button onClick={() => setOpen(true)}>
            <img className={classes.icon} src={evolution} alt="region filter" />
            <ListItemText
              className={classNames({ [classes.hide]: !open })}
              primary="Filter by stages"
            />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <SelectPokemon />
      </main>
    </div>
  );
}
