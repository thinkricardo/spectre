import { fromEvent, takeUntil } from 'rxjs';

import { Direction } from '../enums';
import { PositionModel, ShapeModel } from '../models';
import { store } from '../store';
import { calculateResize } from '../utils/calculations';

class CanvasService {
  selectShape(shape: ShapeModel) {
    store.setSelectedShape(shape);
  }

  handleShapeDrag(start: PositionModel) {
    const mouseUpEvent = fromEvent(document, 'mouseup');

    fromEvent(document, 'mousemove')
      .pipe(takeUntil(mouseUpEvent))
      .subscribe((evt) => {
        const mouseEvent = evt as MouseEvent;
        const mousePosition: PositionModel = { x: mouseEvent.clientX, y: mouseEvent.clientY };

        const newPosition: PositionModel = {
          x: mousePosition.x - start.x,
          y: mousePosition.y - start.y,
        };

        const shape = store.getSelectedShape();

        if (shape) {
          store.updateShape({ ...shape, ...newPosition });
        }
      });
  }

  handleShapeResize(direction: Direction) {
    const mouseUpEvent = fromEvent(document, 'mouseup');

    fromEvent(document, 'mousemove')
      .pipe(takeUntil(mouseUpEvent))
      .subscribe((evt) => {
        const mouseEvent = evt as MouseEvent;
        const mousePosition: PositionModel = { x: mouseEvent.clientX, y: mouseEvent.clientY };

        const shape = store.getSelectedShape();

        if (shape) {
          const newRect = calculateResize(direction, mousePosition, shape);
          const newShape = { ...shape, ...newRect };

          store.updateShape(newShape);
        }
      });
  }
}

export const canvasService = new CanvasService();
