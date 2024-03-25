type Props = {
  x: number;
  y: number;
};

export function Shape(props: Props) {
  const { x, y } = props;

  return <rect x={x} y={y} height="100" width="100" fill="#646cff" />;
}

export default Shape;
