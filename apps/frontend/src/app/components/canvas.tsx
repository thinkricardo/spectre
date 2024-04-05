import { useCallback } from 'react';

import PositionModel from '../models/position.model';
import { canvasService } from '../services/canvas.service';
import { useQuarkValue } from '../state';

import Controls from './controls';
import Shape from './shape';

import styles from './canvas.module.scss';

export function Canvas() {
  const shapeIds = useQuarkValue<string[]>('shapeIds');

  const handleShapeClick = useCallback((shapeId: string, evt: React.PointerEvent) => {
    const { clientX: mouseX, clientY: mouseY } = evt;

    const {
      x: shapeX,
      y: shapeY,
      height: shapeHeight,
      width: shapeWidth,
    } = (evt.target as SVGElement).getBoundingClientRect();

    const startPosition: PositionModel = {
      x: Math.trunc(mouseX - shapeX),
      y: Math.trunc(mouseY - shapeY),
    };

    canvasService.selectShape({
      id: shapeId,
      x: shapeX,
      y: shapeY,
      height: shapeHeight,
      width: shapeWidth,
    });

    canvasService.handleShapeDrag(startPosition);
  }, []);

  return (
    <>
      <svg className={styles.canvas}>
        {shapeIds.map((shapeId) => (
          <Shape key={shapeId} id={shapeId} onClick={(evt) => handleShapeClick(shapeId, evt)} />
        ))}
      </svg>

      <Controls />
    </>
  );
}

export default Canvas;
