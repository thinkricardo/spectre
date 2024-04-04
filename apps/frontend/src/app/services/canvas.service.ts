import { BehaviorSubject, filter, fromEvent, takeUntil } from 'rxjs';

import Direction from '../enums/direction.enum';
import PositionModel from '../models/position.model';
import ShapeModel from '../models/shape.model';
import { calculateResize } from '../utils/calculations';

const initialShapes = [
  { id: 'abc', x: 50, y: 50, height: 100, width: 100 },
  { id: 'xyz', x: 250, y: 350, height: 100, width: 100 },
  { id: '123', x: 550, y: 150, height: 100, width: 100 },
];

class CanvasService {
  private shapes: BehaviorSubject<ShapeModel[]> = new BehaviorSubject(initialShapes);

  selectedShape: BehaviorSubject<ShapeModel | undefined> = new BehaviorSubject<
    ShapeModel | undefined
  >(undefined);

  updateShape: BehaviorSubject<ShapeModel | undefined> = new BehaviorSubject<
    ShapeModel | undefined
  >(undefined);

  getShapes() {
    initialShapes.map((s) => this.updateShape.next(s));

    return this.shapes;
  }

  getShape(shapeId: string) {
    return this.updateShape.pipe(filter((s) => s?.id === shapeId));
  }

  selectShape(shape: ShapeModel) {
    this.selectedShape.next(shape);
  }

  handleShapeDrag(start: PositionModel) {
    const mouseUpEvent = fromEvent(document, 'mouseup');

    fromEvent(document, 'mousemove')
      .pipe(takeUntil(mouseUpEvent))
      .subscribe((evt) => {
        const mouseEvent = evt as MouseEvent;

        const newPosition: PositionModel = {
          x: mouseEvent.clientX - start.x,
          y: mouseEvent.clientY - start.y,
        };

        const shape = this.selectedShape.getValue();

        if (shape) {
          this.updateShape.next({ ...shape, ...newPosition });
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

        const shape = this.selectedShape.getValue();

        if (shape) {
          const newRect = calculateResize(direction, mousePosition, shape);

          const newShape = { ...shape, ...newRect };

          this.updateShape.next(newShape);
        }
      });
  }
}

const canvasService = new CanvasService();

export default canvasService;
