/**
 * Unit tests for Direction enum
 * Tests direction vectors and opposite direction logic
 */

import { Direction } from '../../../src/js/utils/Direction.js';

describe('Direction', () => {
  describe('direction vectors', () => {
    test('UP should have correct vector', () => {
      expect(Direction.UP.x).toBe(0);
      expect(Direction.UP.y).toBe(-1);
    });

    test('DOWN should have correct vector', () => {
      expect(Direction.DOWN.x).toBe(0);
      expect(Direction.DOWN.y).toBe(1);
    });

    test('LEFT should have correct vector', () => {
      expect(Direction.LEFT.x).toBe(-1);
      expect(Direction.LEFT.y).toBe(0);
    });

    test('RIGHT should have correct vector', () => {
      expect(Direction.RIGHT.x).toBe(1);
      expect(Direction.RIGHT.y).toBe(0);
    });
  });

  describe('isOpposite', () => {
    test('UP and DOWN should be opposite', () => {
      expect(Direction.UP.isOpposite(Direction.DOWN)).toBe(true);
      expect(Direction.DOWN.isOpposite(Direction.UP)).toBe(true);
    });

    test('LEFT and RIGHT should be opposite', () => {
      expect(Direction.LEFT.isOpposite(Direction.RIGHT)).toBe(true);
      expect(Direction.RIGHT.isOpposite(Direction.LEFT)).toBe(true);
    });

    test('UP and LEFT should not be opposite', () => {
      expect(Direction.UP.isOpposite(Direction.LEFT)).toBe(false);
    });

    test('UP and RIGHT should not be opposite', () => {
      expect(Direction.UP.isOpposite(Direction.RIGHT)).toBe(false);
    });

    test('DOWN and LEFT should not be opposite', () => {
      expect(Direction.DOWN.isOpposite(Direction.LEFT)).toBe(false);
    });

    test('DOWN and RIGHT should not be opposite', () => {
      expect(Direction.DOWN.isOpposite(Direction.RIGHT)).toBe(false);
    });

    test('same direction should not be opposite to itself', () => {
      expect(Direction.UP.isOpposite(Direction.UP)).toBe(false);
      expect(Direction.DOWN.isOpposite(Direction.DOWN)).toBe(false);
      expect(Direction.LEFT.isOpposite(Direction.LEFT)).toBe(false);
      expect(Direction.RIGHT.isOpposite(Direction.RIGHT)).toBe(false);
    });
  });

  describe('direction names', () => {
    test('should have name property for each direction', () => {
      expect(Direction.UP.name).toBe('UP');
      expect(Direction.DOWN.name).toBe('DOWN');
      expect(Direction.LEFT.name).toBe('LEFT');
      expect(Direction.RIGHT.name).toBe('RIGHT');
    });
  });
});
