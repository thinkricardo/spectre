import ShapeModel from '../models/shape.model';

type Props = {
  data: ShapeModel;
};

type Events = {
  onClick: (evt: React.PointerEvent) => void;
};

export function Shape(props: Props & Events) {
  const { x, y } = props.data;
  const { onClick } = props;

  return <rect x={x} y={y} height="100" width="100" fill="#646cff" onPointerDown={onClick} />;
}

export default Shape;
