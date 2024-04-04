import { useEffect, useState } from 'react';

import ShapeModel from '../models/shape.model';
import canvasService from '../services/canvas.service';

type Props = {
  id: string;
};

type Events = {
  onClick: (evt: React.PointerEvent) => void;
};

export function Shape(props: Props & Events) {
  const { id, onClick } = props;
  const [data, setData] = useState<ShapeModel | undefined>(undefined);

  useEffect(() => {
    const subscription = canvasService.getShape(id).subscribe((updatedData) => {
      if (updatedData) {
        setData(updatedData);
      }
    });

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  });

  return (
    data && (
      <rect
        x={data.x}
        y={data.y}
        height={data.height}
        width={data.width}
        fill="#646cff"
        onPointerDown={onClick}
      />
    )
  );
}

export default Shape;
