import React, { useRef } from "react";
import { Grid } from "@material-ui/core";
import { useDrag, useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";
const style = {
  cursor: "move"
};
const DraggablePokemon = ({
  id,
  index,
  movePokemon,
  generateExtension,
  url,
  pokemon,
  setSelectedTeam
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
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <Grid
      item
      xs={4}
      md={2}
      className="selected-team-container"
      onDoubleClick={() => setSelectedTeam(pokemon)}
    >
      <img
        draggable={true}
        ref={ref}
        style={{ ...style, opacity }}
        className="selected-pokemon"
        src={`${url}${generateExtension(pokemon)}.gif`}
      />
    </Grid>
  );
};
export default DraggablePokemon;
