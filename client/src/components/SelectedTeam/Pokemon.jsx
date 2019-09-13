import React, { useRef } from 'react';
import { Grid } from '@material-ui/core';
import { useDrag, useDrop } from 'react-dnd';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ItemTypes from './ItemTypes';
import _ from 'lodash';
const style = {
  cursor: 'move'
};
const DraggablePokemon = ({
  id,
  index,
  movePokemon,
  generateExtension,
  url,
  pokemon,
  setSelectedTeam,
  isAPokemonDragging,
  setIsAPokemonDragging,
  setCanDropPokemon,
  canDropPokemon
}) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.POKEMON,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      movePokemon(dragIndex, hoverIndex);

      item.index = hoverIndex;
    }
  });
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.POKEMON, id, index },
    begin: () => {
      if (!isAPokemonDragging) {
        setIsAPokemonDragging(true);
        _.delay(() => {
          setCanDropPokemon(true);
        }, 300);
      }
    },
    end: () => {
      if (canDropPokemon) {
        setCanDropPokemon(false);
      } else {
        _.delay(() => {
          setCanDropPokemon(false);
        }, 301);
      }

      if (isAPokemonDragging) {
        setIsAPokemonDragging(false);
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
      canDrag: monitor.canDrag()
    })
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <Grid
      item
      xs={4}
      md={2}
      className={classNames('selected-pokemon-container', {
        dragging: isAPokemonDragging
      })}
      onDoubleClick={() => setSelectedTeam(pokemon)}
    >
      <img
        alt={`${pokemon.name.english}`}
        draggable={true}
        ref={ref}
        style={{ ...style, opacity }}
        className="selected-pokemon"
        src={`${url}${generateExtension(pokemon)}.gif`}
      />
    </Grid>
  );
};

DraggablePokemon.propTypes = {
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  movePokemon: PropTypes.func.isRequired,
  generateExtension: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  pokemon: PropTypes.shape({}).isRequired,
  setSelectedTeam: PropTypes.func.isRequired,
  isAPokemonDragging: PropTypes.bool.isRequired,
  setIsAPokemonDragging: PropTypes.func.isRequired,
  setCanDropPokemon: PropTypes.func.isRequired,
  canDropPokemon: PropTypes.bool.isRequired
};

export default DraggablePokemon;
