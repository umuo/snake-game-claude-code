/**
 * Unit tests for Collision detection service
 * Tests wall collision, self-collision, and food collision detection
 */

import { Collision } from '../../src/js/game/Collision.js';
import { Position } from '../../src/js/utils/Position.js';

describe('Collision', () => {
  describe('isOutOfBounds', () => {
    test('should return false for position within bounds', () => {
      const pos = new Position(10, 10);
      expect(Collision.isOutOfBounds(pos, 20, 20)).toBe(false);
    });

    test('should return true for negative x', () => {
      const pos = new Position(-1, 10);
      expect(Collision.isOutOfBounds(pos, 20, 20)).toBe(true);
    });

    test('should return true for negative y', () => {
      const pos = new Position(10, -1);
      expect(Collision.isOutOfBounds(pos, 20, 20)).toBe(true);
    });

    test('should return true for x >= width', () => {
      const pos = new Position(20, 10);
      expect(Collision.isOutOfBounds(pos, 20, 20)).toBe(true);
    });

    test('should return true for y >= height', () => {
      const pos = new Position(10, 20);
      expect(Collision.isOutOfBounds(pos, 20, 20)).toBe(true);
    });

    test('should return false for position at (0, 0)', () => {
      const pos = new Position(0, 0);
      expect(Collision.isOutOfBounds(pos, 20, 20)).toBe(false);
    });

    test('should return false for position at bottom-right edge', () => {
      const pos = new Position(19, 19);
      expect(Collision.isOutOfBounds(pos, 20, 20)).toBe(false);
    });
  });

  describe('isCollidingWithSelf', () => {
    test('should return false when head does not collide with body', () => {
      const head = new Position(5, 5);
      const body = [
        new Position(4, 5),
        new Position(3, 5),
        new Position(2, 5)
      ];
      expect(Collision.isCollidingWithSelf(head, body)).toBe(false);
    });

    test('should return true when head collides with body segment', () => {
      const head = new Position(3, 5);
      const body = [
        new Position(4, 5),
        new Position(3, 5),
        new Position(2, 5)
      ];
      expect(Collision.isCollidingWithSelf(head, body)).toBe(true);
    });

    test('should return false for empty body', () => {
      const head = new Position(5, 5);
      const body = [];
      expect(Collision.isCollidingWithSelf(head, body)).toBe(false);
    });

    test('should return false for single segment body (no collision possible)', () => {
      const head = new Position(5, 5);
      const body = [new Position(4, 5)];
      expect(Collision.isCollidingWithSelf(head, body)).toBe(false);
    });

    test('should detect collision at any body position', () => {
      const head = new Position(1, 1);
      const body = [
        new Position(5, 5),
        new Position(4, 4),
        new Position(3, 3),
        new Position(2, 2),
        new Position(1, 1)
      ];
      expect(Collision.isCollidingWithSelf(head, body)).toBe(true);
    });
  });

  describe('isCollidingWithFood', () => {
    test('should return true when position equals food position', () => {
      const pos = new Position(10, 10);
      const foodPos = new Position(10, 10);
      expect(Collision.isCollidingWithFood(pos, foodPos)).toBe(true);
    });

    test('should return false when positions differ in x', () => {
      const pos = new Position(10, 10);
      const foodPos = new Position(11, 10);
      expect(Collision.isCollidingWithFood(pos, foodPos)).toBe(false);
    });

    test('should return false when positions differ in y', () => {
      const pos = new Position(10, 10);
      const foodPos = new Position(10, 11);
      expect(Collision.isCollidingWithFood(pos, foodPos)).toBe(false);
    });

    test('should return false when positions differ in both coordinates', () => {
      const pos = new Position(10, 10);
      const foodPos = new Position(11, 11);
      expect(Collision.isCollidingWithFood(pos, foodPos)).toBe(false);
    });
  });

  describe('isPositionOccupied', () => {
    test('should return false for unoccupied position', () => {
      const pos = new Position(10, 10);
      const occupiedPositions = [
        new Position(5, 5),
        new Position(6, 6),
        new Position(7, 7)
      ];
      expect(Collision.isPositionOccupied(pos, occupiedPositions)).toBe(false);
    });

    test('should return true for occupied position', () => {
      const pos = new Position(6, 6);
      const occupiedPositions = [
        new Position(5, 5),
        new Position(6, 6),
        new Position(7, 7)
      ];
      expect(Collision.isPositionOccupied(pos, occupiedPositions)).toBe(true);
    });

    test('should return false for empty occupied positions array', () => {
      const pos = new Position(10, 10);
      const occupiedPositions = [];
      expect(Collision.isPositionOccupied(pos, occupiedPositions)).toBe(false);
    });

    test('should check all positions in array', () => {
      const pos = new Position(9, 9);
      const occupiedPositions = [
        new Position(5, 5),
        new Position(6, 6),
        new Position(7, 7),
        new Position(8, 8),
        new Position(9, 9)
      ];
      expect(Collision.isPositionOccupied(pos, occupiedPositions)).toBe(true);
    });
  });
});
