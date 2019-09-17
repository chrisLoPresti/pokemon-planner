import React from 'react';
import { Fade } from '@material-ui/core';
import { types } from '../../../constants/filters';
import typeStats from '../../../constants/typeStats';
import symbols from '../../../assets/images/symbols';
import Tooltip from '@material-ui/core/Tooltip';

const generateBlockData = (t1, t2) => {
  if (typeStats[t1].ddt.includes(t2)) {
    return <p className="data-block double">2</p>;
  } else if (typeStats[t1].hdt.includes(t2)) {
    return <p className="data-block half">1/2</p>;
  } else if (typeStats[t1].ndt.includes(t2)) {
    return <p className="data-block zero">0</p>;
  } else {
    return <p className="data-block">1</p>;
  }
};

const generateTypeChart = () =>
  types.map(outerType => (
    <div className="data-row chart-row" key={`${outerType}-outer`}>
      {types.map(innerType => (
        <div key={`${innerType}-inner`}>
          {generateBlockData(outerType, innerType)}
        </div>
      ))}
    </div>
  ));

const TypesChart = () => (
  <Fade in timeout={500}>
    <div className="chart-content">
      <div className="types-scroller">
        <div className="types-chart-top-row">
          {types.map(type => (
            <div className="data-block" key={`${type}-top`}>
              <Tooltip title={type} enterTouchDelay={0}>
                <img
                  className={`type-chart-symbol ${type}-border`}
                  alt={type}
                  src={symbols[type]}
                />
              </Tooltip>
            </div>
          ))}
        </div>
        {generateTypeChart()}
      </div>
      <div className="types-chart-left-row">
        {types.map(type => (
          <div className="left-symbol-container" key={`${type}-left`}>
            <Tooltip title={type} enterTouchDelay={0}>
              <img
                className={`type-chart-symbol-left ${type}-border`}
                alt={type}
                src={symbols[type]}
              />
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  </Fade>
);

export default TypesChart;
