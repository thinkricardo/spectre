import { BehaviorSubject, filter, fromEvent, Subject, takeUntil } from 'rxjs';

import PositionModel from '../models/position.model';
import ShapeModel from '../models/shape.model';

const initialShapes = [
  { id: 'abc', x: 50, y: 50, height: 100, width: 100 },
  { id: 'xyz', x: 250, y: 350, height: 100, width: 100 },
  { id: '123', x: 550, y: 150, height: 100, width: 100 },
];

class CanvasService {
  private shapes: Subject<ShapeModel[]> = new BehaviorSubject(initialShapes);

  selectedShape: Subject<ShapeModel | undefined> = new BehaviorSubject<ShapeModel | undefined>(
    undefined,
  );

  updateShape: Subject<ShapeModel | undefined> = new BehaviorSubject<ShapeModel | undefined>(
    undefined,
  );

  selectShape(shape: ShapeModel) {
    this.selectedShape.next(shape);
  }

  getShapes() {
    initialShapes.map((s) => this.updateShape.next(s));

    return this.shapes;
  }

  getShape(shapeId: string) {
    return this.updateShape.pipe(filter((s) => s?.id === shapeId));
  }

  handleDrag(shapeId: string, start: PositionModel) {
    const mouseUpEvent = fromEvent(document, 'mouseup');

    fromEvent(document, 'mousemove')
      .pipe(takeUntil(mouseUpEvent))
      .subscribe((evt) => {
        const mouseEvent = evt as MouseEvent;

        const newPosition: PositionModel = {
          x: mouseEvent.clientX - start.x,
          y: mouseEvent.clientY - start.y,
        };

        this.updateShape.next({ id: shapeId, ...newPosition, height: 100, width: 100 });
      });
  }
}

export const canvasService = new CanvasService();
