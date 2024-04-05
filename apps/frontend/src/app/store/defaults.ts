import ShapeModel from '../models/shape.model';
import { generateId } from '../utils/generators';

export const initialShapes: ShapeModel[] = [
  { id: generateId(), x: 50, y: 50, height: 100, width: 100 },
  { id: generateId(), x: 250, y: 350, height: 150, width: 100 },
  { id: generateId(), x: 550, y: 150, height: 100, width: 200 },
];
