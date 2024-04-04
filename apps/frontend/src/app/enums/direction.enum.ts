enum Direction {
  NE = 'ne',
  NW = 'nw',
  SE = 'se',
  SW = 'sw',
}

export default Direction;

export const getDirections = () => {
  return Object.values(Direction);
};
