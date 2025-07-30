import { calculateFloatingRouteMarkerOffsets } from '../calculate-offsets';
import { FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS } from '../constants';

describe('calculateFloatingRouteMarkerOffsets', () => {
  const arrowSize = 8;
  const positions = Object.values(FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS);

  positions.forEach((position) => {
    test(`should return correct offsets for ${position} position with default offset`, () => {
      const result = calculateFloatingRouteMarkerOffsets(position);
      let expected;

      switch (position) {
        case 'top-left':
          expected = `translate(calc(${arrowSize}px + 0px), calc(${arrowSize}px + 0px))`;
          break;
        case 'top-center':
          expected = `translate(-50%, calc(${arrowSize}px + 0px))`;
          break;
        case 'top-right':
          expected = `translate(calc(-100% - ${arrowSize}px - 0px), calc(${arrowSize}px + 0px))`;
          break;
        case 'right-center':
          expected = `translate(calc(-100% - ${arrowSize}px - 0px), -50%)`;
          break;
        case 'bottom-right':
          expected = `translate(calc(-100% - ${arrowSize}px - 0px), calc(-100% - ${arrowSize}px - 0px))`;
          break;
        case 'bottom-center':
          expected = `translate(-50%, calc(-100% - ${arrowSize}px - 0px))`;
          break;
        case 'bottom-left':
          expected = `translate(calc(${arrowSize}px + 0px), calc(-100% - ${arrowSize}px - 0px))`;
          break;
        case 'left-center':
          expected = `translate(calc(${arrowSize}px + 0px), -50% )`;
          break;
        default:
          expected = '';
      }

      expect(result).toBe(expected);
    });

    test(`should return correct offsets for ${position} position with offset 5`, () => {
      const offset = 5;
      const result = calculateFloatingRouteMarkerOffsets(position, offset);
      let expected;

      switch (position) {
        case 'top-left':
          expected = `translate(calc(${arrowSize}px + ${offset}px), calc(${arrowSize}px + ${offset}px))`;
          break;
        case 'top-center':
          expected = `translate(-50%, calc(${arrowSize}px + ${offset}px))`;
          break;
        case 'top-right':
          expected = `translate(calc(-100% - ${arrowSize}px - ${offset}px), calc(${arrowSize}px + ${offset}px))`;
          break;
        case 'right-center':
          expected = `translate(calc(-100% - ${arrowSize}px - ${offset}px), -50%)`;
          break;
        case 'bottom-right':
          expected = `translate(calc(-100% - ${arrowSize}px - ${offset}px), calc(-100% - ${arrowSize}px - ${offset}px))`;
          break;
        case 'bottom-center':
          expected = `translate(-50%, calc(-100% - ${arrowSize}px - ${offset}px))`;
          break;
        case 'bottom-left':
          expected = `translate(calc(${arrowSize}px + ${offset}px), calc(-100% - ${arrowSize}px - ${offset}px))`;
          break;
        case 'left-center':
          expected = `translate(calc(${arrowSize}px + ${offset}px), -50% )`;
          break;
        default:
          expected = '';
      }

      expect(result).toBe(expected);
    });
  });
});
