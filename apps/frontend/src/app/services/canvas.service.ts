import { BehaviorSubject, filter, fromEvent, Subject, takeUntil } from 'rxjs';

import PositionModel from '../models/position.model';
import ShapeModel from '../models/shape.model';

const initialShapes = [
  { id: 'abc', x: 50, y: 50 },
  { id: 'xyz', x: 250, y: 350 },
];

class CanvasService {
  private shapes: Subject<ShapeModel[]> = new BehaviorSubject(initialShapes);
  private updates: Subject<ShapeModel | undefined> = new BehaviorSubject<ShapeModel | undefined>(
    undefined,
  );

  handle(shapeId: string, start: PositionModel) {
    const mouseUpEvent = fromEvent(document, 'mouseup');

    fromEvent(document, 'mousemove')
      .pipe(takeUntil(mouseUpEvent))
      .subscribe((evt) => {
        const mouseEvent = evt as MouseEvent;

        const newPosition: PositionModel = {
          x: mouseEvent.clientX - start.x,
          y: mouseEvent.clientY - start.y,
        };

        this.updates.next({ id: shapeId, ...newPosition });
      });
  }

  getShapes() {
    initialShapes.map((s) => this.updates.next(s));

    return this.shapes;
  }

  getShape(shapeId: string) {
    return this.updates.pipe(filter((s) => s?.id === shapeId));
  }
}

export const canvasService = new CanvasService();
