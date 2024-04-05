import { useCallback } from 'react';

import Direction, { getDirections } from '../enums/direction.enum';
import ShapeModel from '../models/shape.model';
import { canvasService } from '../services/canvas.service';
import { useQuarkValue } from '../state';

import ResizeHandler from './resize-handler';

import styles from './controls.module.scss';

function Controls() {
  const selectedShape = useQuarkValue<ShapeModel | undefined>('selectedShape');

  const handleResize = useCallback((direction: Direction) => {
    canvasService.handleShapeResize(direction);
  }, []);

  return (
    selectedShape && (
      <svg className={styles.controls}>
        <g>
          {getDirections().map((direction) => (
            <ResizeHandler
              key={direction}
              direction={direction}
              onResize={(direction) => handleResize(direction)}
            ></ResizeHandler>
          ))}
        </g>
      </svg>
    )
  );
}

export default Controls;
