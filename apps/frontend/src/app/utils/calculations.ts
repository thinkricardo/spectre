import Direction from '../enums/direction.enum';
import PositionModel from '../models/position.model';
import RectModel from '../models/rect.model';
import ShapeModel from '../models/shape.model';

export const calculateResize = (
  direction: Direction,
  mousePosition: PositionModel,
  shape: ShapeModel,
): RectModel => {
  const deltaX = (mousePosition.x - shape.x) * -1;
  const deltaY = (mousePosition.y - shape.y) * -1;

  let newHeight = shape.height;
  let newWidth = shape.width;

  let newX = shape.x;
  let newY = shape.y;

  if (direction === Direction.SE) {
    newHeight = mousePosition.y - shape.y;
    newWidth = mousePosition.x - shape.x;
  }

  if (direction === Direction.SW) {
    newHeight = mousePosition.y - shape.y;
    newWidth = shape.width + deltaX;

    newX = shape.x - deltaX;
  }

  if (direction === Direction.NW) {
    newHeight = shape.height + deltaY;
    newWidth = shape.width + deltaX;

    newX = shape.x - deltaX;
    newY = shape.y - deltaY;
  }

  if (direction === Direction.NE) {
    newHeight = shape.height + deltaY;
    newWidth = mousePosition.x - shape.x;

    newY = shape.y - deltaY;
  }

  return { height: newHeight, width: newWidth, x: newX, y: newY };
};
