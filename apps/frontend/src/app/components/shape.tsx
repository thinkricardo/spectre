import { ShapeModel } from '../models/shape.model';

type Props = {
  data: ShapeModel;
};

export function Shape(props: Props) {
  const { x, y } = props.data;

  return <rect x={x} y={y} height="100" width="100" fill="#646cff" />;
}

export default Shape;
