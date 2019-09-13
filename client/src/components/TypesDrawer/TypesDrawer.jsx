import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { types } from '../../constants/filters';
import typeStats from '../../constants/typeStats';
import './TypesDrawer.css';

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
});

const SwipeableTemporaryDrawer = ({ open, onHandleOpen }) => {
  const classes = useStyles();

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
      <div className="data-row">
        {types.map(innerType => (
          <div>{generateBlockData(outerType, innerType)}</div>
        ))}
      </div>
    ));

  return (
    <SwipeableDrawer
      style={{ width: '100%' }}
      anchor="right"
      open={open}
      onClose={() => onHandleOpen(!open)}
    >
      <div className="chart-content">
        <div className="types-scroller">
          <div className="types-chart-top-row">
            {types.map(type => (
              <div className="data-block">
                <img
                  className="type-chart-symbol"
                  alt={type}
                  src={require(`../../assets/images/symbols/${type.toLowerCase()}.png`)}
                />
              </div>
            ))}
          </div>
          {generateTypeChart()}
        </div>
        <div className="types-chart-left-row">
          {types.map(type => (
            <div className="left-symbol-container">
              <img
                className="type-chart-symbol-left"
                alt={type}
                src={require(`../../assets/images/symbols/${type.toLowerCase()}.png`)}
              />
            </div>
          ))}
        </div>
      </div>
    </SwipeableDrawer>
  );
};
export default SwipeableTemporaryDrawer;
