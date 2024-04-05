import ShapeModel from '../models/shape.model';
import { quark } from '../state';
import { quarkState } from '../state/quark.state';

import { initialShapes } from './defaults';

class Store {
  private shapeIds = quark<string[]>('shapeIds', []);
  private selectedShape = quark<ShapeModel | undefined>('selectedShape', undefined);

  initStore() {
    this.shapeIds.set(initialShapes.map((shape) => shape.id));
    initialShapes.forEach((shape) => quark<ShapeModel>(shape.id, shape));
  }

  getSelectedShape(): ShapeModel | undefined {
    return this.selectedShape.get();
  }

  setSelectedShape(shape: ShapeModel) {
    this.selectedShape.set(shape);
  }

  getShape(shapeId: string) {
    quarkState.get(shapeId);
  }

  updateShape(shape: ShapeModel) {
    quarkState.set(shape.id, { ...shape });
    this.setSelectedShape(shape);
  }
}

export const store = new Store();
