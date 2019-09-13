import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { types } from '../../constants/filters';
import typeStats from '../../constants/typeStats';
import symbols from '../../assets/images/symbols';
import './TypesDrawer.css';

const TypesDrawer = ({ open, onHandleOpen }) => {
  const generateBlockData = (t1, t2) => {
    if (typeStats[t1].ddt.includes(t2)) {
      return <p className="data-block double">2</p>;
    } else if (typeStats[t1].hdt.includes(t2)) {
      return <p className="data-block half">.5</p>;
    } else if (typeStats[t1].ndt.includes(t2)) {
      return <p className="data-block zero">0</p>;
    } else {
      return <p className="data-block">1</p>;
    }
  };

  const generateTypeChart = () =>
    types.map(outerType => (
      <div className="data-row" key={`${outerType}-outer`}>
        {types.map(innerType => (
          <div key={`${innerType}-inner`}>
            {generateBlockData(outerType, innerType)}
          </div>
        ))}
      </div>
    ));

  return (
    <Drawer
      style={{ width: '100%' }}
      anchor="right"
      open={open}
      onClose={() => onHandleOpen(!open)}
      className="types-drawer"
      PaperProps={{
        style: { backgroundColor: '#525252' }
      }}
    >
      <div className="chart-content">
        <div className="types-scroller">
          <div className="types-chart-top-row">
            {types.map(type => (
              <div className="data-block" ke={`${type}-top`}>
                <img
                  className="type-chart-symbol"
                  alt={type}
                  src={symbols[type]}
                />
              </div>
            ))}
          </div>
          {generateTypeChart()}
        </div>
        <div className="types-chart-left-row">
          {types.map(type => (
            <div className="left-symbol-container" key={`${type}-left`}>
              <img
                className="type-chart-symbol-left"
                alt={type}
                src={symbols[type]}
              />
            </div>
          ))}
        </div>
      </div>
    </Drawer>
  );
};
export default TypesDrawer;