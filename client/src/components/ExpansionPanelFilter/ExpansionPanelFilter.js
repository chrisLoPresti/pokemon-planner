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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
        <img
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

export default withStyles(styles)(ExpansionPanelFilter);
