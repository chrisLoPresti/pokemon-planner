import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import TypesChart from './TypesChart';
import TeamAnalysis from './TeamAnalysis';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './TypesDrawer.css';

const TypesDrawer = ({ open, onHandleOpen, selectedTeam }) => {
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <Drawer
      style={{ width: '100%' }}
      anchor="right"
      open={open}
      onClose={onHandleOpen}
      className="types-drawer"
      PaperProps={{
        style: { backgroundColor: '#525252' }
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab label="Team Analysis" />
        <Tab label="Type Chart" />
      </Tabs>
      {selectedTeam.length > 0 && (
        <div hidden={value !== 0} value={value} index={0}>
          <TeamAnalysis selectedTeam={selectedTeam} />
        </div>
      )}
      <div hidden={value !== 1} value={value} index={1}>
        <TypesChart />
      </div>
    </Drawer>
  );
};
export default TypesDrawer;
