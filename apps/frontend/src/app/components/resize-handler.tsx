import { useEffect, useState } from 'react';

import { merge } from 'rxjs';

import Direction from '../enums/direction.enum';
import PositionModel from '../models/position.model';
import canvasService from '../services/canvas.service';

import styles from './resize-handler.module.scss';

const handlerSize = 10;

type Props = {
  direction: Direction;
};

type Events = {
  onResize: (direction: Direction) => void;
};

export function ResizeHandler(props: Props & Events) {
  const { direction } = props;
  const { onResize } = props;

  const [cursor, setCursor] = useState('nesw');
  const [position, setPosition] = useState<PositionModel | undefined>();

  useEffect(() => {
    const subscription = merge(canvasService.selectedShape, canvasService.updateShape).subscribe(
      (shape) => {
        if (!shape) {
          return;
        }

        let newCursor = 'nesw';

        let x = 0;
        let y = 0;

        if (direction === Direction.NE) {
          newCursor = 'nesw';

          x = shape.x + shape.width;
          y = shape.y;
        }

        if (direction === Direction.NW) {
          newCursor = 'nwse';

          x = shape.x;
          y = shape.y;
        }

        if (direction === Direction.SE) {
          newCursor = 'nwse';

          x = shape.x + shape.width;
          y = shape.y + shape.height;
        }

        if (direction === Direction.SW) {
          newCursor = 'nesw';

          x = shape.x;
          y = shape.y + shape.height;
        }

        setCursor(newCursor);
        setPosition({ x: x, y: y });
      },
    );

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, [setPosition, setCursor, direction]);

  return (
    position && (
      <g>
        <rect
          className={[styles['resize-container'], styles[`resize-container-${cursor}`]].join(' ')}
          x={position.x - handlerSize}
          y={position.y - handlerSize}
          height={handlerSize * 2}
          width={handlerSize * 2}
          onPointerDown={() => onResize(direction)}
        ></rect>

        <rect
          className={styles['resize-handler']}
          x={position.x - handlerSize / 2}
          y={position.y - handlerSize / 2}
          height={handlerSize}
          width={handlerSize}
        ></rect>
      </g>
    )
  );
}

export default ResizeHandler;
