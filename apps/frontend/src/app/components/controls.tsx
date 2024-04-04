import { useEffect, useState } from 'react';

import { getDirections } from '../enums/direction.enum';
import canvasService from '../services/canvas.service';

import ResizeHandler from './resize-handler';

import styles from './controls.module.scss';

function Controls() {
  const [isShapeSelected, setIsShapeSelected] = useState(false);

  useEffect(() => {
    const subscription = canvasService.selectedShape.subscribe(() => {
      setIsShapeSelected(true);
    });

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  });

  return (
    isShapeSelected && (
      <svg className={styles.controls}>
        <g>
          {getDirections().map((direction) => (
            <ResizeHandler key={direction} direction={direction}></ResizeHandler>
          ))}
        </g>
      </svg>
    )
  );
}

export default Controls;
