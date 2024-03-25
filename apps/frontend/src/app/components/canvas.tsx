import styles from './canvas.module.scss';

export function Canvas() {
  return (
    <svg className={styles.canvas}>
      <rect x="50" y="50" height="100" width="100" fill="#646cff" />
    </svg>
  );
}

export default Canvas;
