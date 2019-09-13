import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  useTheme,
  SwipeableDrawer,
  Divider,
  IconButton,
  withStyles
} from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import styles from './styles';

const SideMenu = ({ classes, setOpen, open, history, children }) => {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={classes.root}>
      <SwipeableDrawer
        onOpen={() => {}}
        anchor="left"
        onClose={() => setOpen(false)}
        variant={smallScreen ? 'temporary' : 'permanent'}
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
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        {children}
      </SwipeableDrawer>
    </div>
  );
};

SideMenu.defaultProps = {
  classes: {}
};

SideMenu.propTypes = {
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  history: PropTypes.shape({}).isRequired,
  children: PropTypes.PropTypes.shape({}).isRequired
};

export default withStyles(styles)(SideMenu);
