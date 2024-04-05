import ShapeModel from '../models/shape.model';
import { useQuarkValue } from '../state';

type Props = {
  id: string;
};

type Events = {
  onClick: (evt: React.PointerEvent) => void;
};

export function Shape(props: Props & Events) {
  const { id, onClick } = props;

  const shape = useQuarkValue<ShapeModel>(id);

  return (
    shape && (
      <rect
        x={shape.x}
        y={shape.y}
        height={shape.height}
        width={shape.width}
        fill="#646cff"
        onPointerDown={onClick}
      />
    )
  );
}

export default Shape;
