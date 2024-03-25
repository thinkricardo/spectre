import styles from './canvas.module.scss';

const shapes = [
  { x: 50, y: 50 },
  { x: 250, y: 350 },
];

export function Canvas() {
  return (
    <svg className={styles.canvas}>
      {shapes.map((shape) => (
        <rect x={shape.x} y={shape.y} height="100" width="100" fill="#646cff" />
      ))}
    </svg>
  );
}

export default Canvas;
