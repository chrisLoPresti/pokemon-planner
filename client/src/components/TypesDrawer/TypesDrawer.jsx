import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import TypesChart from './TypesChart';
import TeamAnalysis from './TeamAnalysis';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import createTeam from '../../assets/images/misc/createTeam.png';
import './TypesDrawer.css';

const TypesDrawer = ({ open, onHandleOpen, selectedTeam }) => {
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
      style={{ width: '100%' }}
      anchor="right"
      open={open}
      onClose={() => handleClose()}
      className="types-drawer"
      PaperProps={{
        style: { backgroundColor: '#525252' }
      }}
    >
      <Tabs
        className="types-drawer-tabs-container"
        value={value}
        aria-label="simple tabs example"
        TabIndicatorProps={{
          style: { backgroundColor: 'ghostwhite' }
        }}
      >
        <Tab
          className="types-drawer-tab"
          onClick={() => handleChange(0)}
          label="Team Analysis"
        />
        <Tab
          className="types-drawer-tab"
          onClick={() => handleChange(1)}
          label="Type Chart"
        />
      </Tabs>
      <div hidden={value !== 0}>
        {selectedTeam.length > 0 && (
          <TeamAnalysis selectedTeam={selectedTeam} />
        )}
        {selectedTeam.length === 0 && (
          <div className="create-a-team-container">
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
export default TypesDrawer;
