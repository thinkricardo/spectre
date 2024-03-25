import styles from './canvas.module.scss';

import Shape from './shape';

const shapes = [
  { x: 50, y: 50 },
  { x: 250, y: 350 },
];

export function Canvas() {
  return (
    <svg className={styles.canvas}>
      {shapes.map((shape) => (
        <Shape x={shape.x} y={shape.y} />
      ))}
    </svg>
  );
}

export default Canvas;
