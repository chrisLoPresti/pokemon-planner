import React from 'react';
import classNames from 'classnames';
import kebabCase from 'lodash/kebabCase';
import {
  ListItem,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  withStyles
} from '@material-ui/core';
import Img from 'react-image';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import styles from './styles';

const ExpansionPanelFilter = ({
  classes,
  onHandleClick,
  filterName,
  included,
  active,
  drawerOpen,
  symbol,
  Child,
  containsCheckList,
  stopPropagation
}) => (
  <ListItem disableGutters button onClick={e => onHandleClick(filterName)}>
    <ExpansionPanel
      expanded={drawerOpen && included}
      className={classNames(classes.panel, {
        [classes.activeFilter]: active
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
        aria-controls={`${kebabCase(filterName)}-panel`}
      >
        <Img
          className={classes.icon}
          src={symbol}
          alt={`${kebabCase(filterName)}-filter`}
        />
        <Typography
          className={classNames(classes.heading, {
            [classes.hide]: !drawerOpen
          })}
        >
          {filterName}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails
        className={classNames({ [classes.details]: containsCheckList })}
        onClick={e => stopPropagation && e.stopPropagation()}
      >
        {Child}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  </ListItem>
);

ExpansionPanelFilter.defaultProps = {
  classes: {}
};

ExpansionPanelFilter.propTypes = {
  classes: PropTypes.shape({}),
  onHandleClick: PropTypes.func.isRequired,
  filterName: PropTypes.string.isRequired,
  included: PropTypes.bool.isRequired,
  active: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
  drawerOpen: PropTypes.bool.isRequired,
  symbol: PropTypes.string.isRequired,
  Child: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.shape({}))
  ]).isRequired,
  containsCheckList: PropTypes.bool.isRequired,
  stopPropagation: PropTypes.bool.isRequired
};

export default withStyles(styles)(ExpansionPanelFilter);
