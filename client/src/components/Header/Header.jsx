import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Badge from '@material-ui/core/Badge';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import users from '../../assets/images/misc/users.png';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import './Header.css';

const drawerWidth = 280;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    fontFamily: 'Pokemon Solid',
    backgroundColor: '#313131',
    color: 'ghostwhite',
    letterSpacing: '0.1rem'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  home: {
    marginRight: 10,
    height: '50px',
    cursor: 'pointer'
  },
  content: {
    width: '100%',
    backgroundColor: '#525252',
    paddingTop: '60px'
  }
}));

const Header = ({ open, setOpen, usersOnline }) => {
  const classes = useStyles();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar
      id="nav"
      position="fixed"
      className={classNames(classes.appBar, {
        [classes.appBarShift]: !smallScreen && open
      })}
    >
      <Toolbar className="toolbar">
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
        <p>Pokémon Team Planner</p>
        <Badge className="badge" badgeContent={usersOnline} color="primary">
          <Tooltip title="Users Online" enterTouchDelay={0}>
            <img src={users} alt="users online" className="badge-icon" />
          </Tooltip>
        </Badge>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  usersOnline: PropTypes.number.isRequired
};

export default Header;
