import { useCallback, useEffect, useState } from 'react';

import { getDirections } from '../enums/direction.enum';
import PositionModel from '../models/position.model';
import ShapeModel from '../models/shape.model';
import { canvasService } from '../services/canvas.service';

import ResizeHandler from './resize-handler';
import Shape from './shape';

import styles from './canvas.module.scss';

export function Canvas() {
  const [shapes, setShapes] = useState<ShapeModel[]>([]);
  const [isShapeSelected, setIsShapeSelected] = useState(false);

  useEffect(() => {
    const subscription = canvasService.getShapes().subscribe((shapes) => {
      if (shapes) {
        setShapes(shapes);
      }
    });

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  });

  const handleShapeClick = useCallback((shapeId: string, evt: React.PointerEvent) => {
    setIsShapeSelected(true);

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

    canvasService.handleDrag(shapeId, startPosition);
  }, []);

  return (
    <>
      <svg className={styles.canvas}>
        {shapes.map((shape) => (
          <Shape key={shape.id} id={shape.id} onClick={(evt) => handleShapeClick(shape.id, evt)} />
        ))}
      </svg>

      {isShapeSelected && (
        <svg className={styles.controls}>
          <g>
            {getDirections().map((direction) => (
              <ResizeHandler key={direction} direction={direction}></ResizeHandler>
            ))}
          </g>
        </svg>
      )}
    </>
  );
}

export default Canvas;
