import styles from './canvas.module.scss';

import Shape from './shape';

import { ShapeModel } from '../models/shape.model';

const shapes: ShapeModel[] = [
  { x: 50, y: 50 },
  { x: 250, y: 350 },
];

export function Canvas() {
  return (
    <svg className={styles.canvas}>
      {shapes.map((shape, index) => (
        <Shape key={index} data={shape} />
      ))}
    </svg>
  );
}

export default Canvas;
