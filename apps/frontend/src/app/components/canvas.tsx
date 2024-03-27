import { useCallback, useEffect, useState } from 'react';

import Shape from './shape';
import ShapeModel from '../models/shape.model';

import styles from './canvas.module.scss';

export function Canvas() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedShapeId, setSelectedShapeId] = useState<number | undefined>(undefined);

  const [start, setStart] = useState<ShapeModel | undefined>(undefined);

  const [shapes, setShapes] = useState([
    { x: 50, y: 50 },
    { x: 250, y: 350 },
  ]);

  const handleShapeClick = useCallback((shapeId: number, evt: React.PointerEvent) => {
    setIsDragging(true);
    setSelectedShapeId(shapeId);

    const { x, y } = (evt.target as SVGElement).getBoundingClientRect();

    setStart({
      x: Math.trunc(evt.clientX - x),
      y: Math.trunc(evt.clientY - y),
    });
  }, []);

  const handleMouseMove = useCallback(
    (evt: MouseEvent) => {
      if (!isDragging) {
        return;
      }

      if (start && selectedShapeId !== undefined) {
        const newShape = {
          x: Math.trunc(evt.clientX - start.x),
          y: Math.trunc(evt.clientY - start.y),
        };

        setShapes(
          shapes.map((shape, index) => {
            return index !== selectedShapeId ? shape : newShape;
          }),
        );
      }
    },
    [isDragging, start, selectedShapeId, shapes],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setSelectedShapeId(undefined);
    setStart(undefined);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <svg className={styles.canvas}>
      {shapes.map((shape, index) => (
        <Shape key={index} data={shape} onClick={(evt) => handleShapeClick(index, evt)} />
      ))}
    </svg>
  );
}

export default Canvas;
