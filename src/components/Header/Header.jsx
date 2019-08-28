import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import "./Header.css";
import home from "../../assets/images/home/home.png";

const Header = () => (
  <AppBar className="header">
    <Toolbar>
      <img alt="home" className="home" src={home} />
      Pokémon Team Planner
    </Toolbar>
  </AppBar>
);

export default Header;
