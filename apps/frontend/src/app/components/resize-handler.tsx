import { useEffect, useState } from 'react';

import Direction from '../enums/direction.enum';
import PositionModel from '../models/position.model';
import ShapeModel from '../models/shape.model';
import { useQuarkValue } from '../state';

import styles from './resize-handler.module.scss';

const handlerSize = 10;

type Props = {
  direction: Direction;
};

type Events = {
  onResize: (direction: Direction) => void;
};

export function ResizeHandler(props: Props & Events) {
  const { direction, onResize } = props;

  const [cursor, setCursor] = useState('nesw');
  const [position, setPosition] = useState<PositionModel | undefined>();

  const selectedShape = useQuarkValue<ShapeModel | undefined>('selectedShape');

  useEffect(() => {
    if (selectedShape) {
      let newCursor = 'nesw';

      let x = 0;
      let y = 0;

      if (direction === Direction.NE) {
        newCursor = 'nesw';

        x = selectedShape.x + selectedShape.width;
        y = selectedShape.y;
      }

      if (direction === Direction.NW) {
        newCursor = 'nwse';

        x = selectedShape.x;
        y = selectedShape.y;
      }

      if (direction === Direction.SE) {
        newCursor = 'nwse';

        x = selectedShape.x + selectedShape.width;
        y = selectedShape.y + selectedShape.height;
      }

      if (direction === Direction.SW) {
        newCursor = 'nesw';

        x = selectedShape.x;
        y = selectedShape.y + selectedShape.height;
      }

      setCursor(newCursor);
      setPosition({ x: x, y: y });
    }
  }, [setCursor, setPosition, direction, selectedShape]);

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
