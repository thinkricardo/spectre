export enum Direction {
  NE = 'ne',
  NW = 'nw',
  SE = 'se',
  SW = 'sw',
}

export const getDirections = () => {
  return Object.values(Direction);
};
