import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import home from "../../assets/images/home/home.png";

const drawerWidth = 260;

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
  home: {
    marginRight: 10,
    height: "50px",
    cursor: "pointer"
  },
  content: {
    width: "100%",
    backgroundColor: "#525252",
    paddingTop: "60px"
  }
}));

export default function Header({ open, setOpen }) {
  const classes = useStyles();

  return (
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
          className={classNames({
            [classes.hide]: open
          })}
        >
          <MenuIcon />
        </IconButton>
        <img alt="home" className={classes.home} src={home} />
        {!open && <p>Pokémon Team Planner</p>}
      </Toolbar>
    </AppBar>
  );
}
