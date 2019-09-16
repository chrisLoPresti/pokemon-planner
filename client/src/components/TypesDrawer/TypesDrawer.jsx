import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import TypesChart from './TypesChart';
import classNames from 'classnames';
import { IconButton, Divider, withStyles } from '@material-ui/core';
import TeamAnalysis from './TeamAnalysis';
import { KeyboardReturnRounded } from '@material-ui/icons';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import createTeam from '../../assets/images/misc/createTeam.png';
import './TypesDrawer.css';
import styles from './styles';

const TypesDrawer = ({
  classes,
  open,
  onHandleOpen,
  selectedTeam,
  filteredPokemon
}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = newValue => {
    setValue(newValue);
  };

  const handleClose = () => {
    onHandleOpen(!open);
    handleChange(0);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => handleClose()}
      className="types-drawer"
      classes={{
        paper: classes.paper
      }}
    >
      <div className="types-drawer-fixed-header">
        <div className="types-drawer-header">
          <IconButton
            onClick={() => handleClose()}
            className="types-drawer-return-button"
          >
            <KeyboardReturnRounded className="types-drawer-return-button-image" />
          </IconButton>
          <p className="types-drawer-title"> Typing Breakdown</p>
        </div>
        <Divider className="types-drawer-divider" />
        <Tabs
          variant="fullWidth"
          className="types-drawer-tabs-container"
          value={value}
          aria-label="simple tabs example"
          TabIndicatorProps={{
            style: { backgroundColor: 'ghostwhite' }
          }}
        >
          <Tab
            className={classNames('types-drawer-tab', {
              'types-drawer-tab-active': value === 0
            })}
            onClick={() => handleChange(0)}
            label="Team Analysis"
          />
          <Tab
            className={classNames('types-drawer-tab', {
              'types-drawer-tab-active': value === 1
            })}
            onClick={() => handleChange(1)}
            label="Type Chart"
          />
        </Tabs>
      </div>
      <div hidden={value !== 0}>
        {selectedTeam.length > 0 && (
          <TeamAnalysis
            selectedTeam={selectedTeam}
            filteredPokemon={filteredPokemon}
          />
        )}
        {selectedTeam.length === 0 && (
          <div
            className="create-a-team-container"
            onClick={() => handleClose()}
          >
            <p className="create-a-team-title">Create a Team</p>
            <img
              className="create-a-team"
              alt="create a team"
              src={createTeam}
            />
          </div>
        )}
      </div>
      <div hidden={value !== 1}>
        <TypesChart />
      </div>
    </Drawer>
  );
};
export default withStyles(styles)(TypesDrawer);
