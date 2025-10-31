/**
 * Unit tests for Position utility class
 * Tests coordinate handling and position operations
 */

import { Position } from '../../../src/js/utils/Position.js';

describe('Position', () => {
  describe('constructor', () => {
    test('should create position with valid coordinates', () => {
      const pos = new Position(5, 10);
      expect(pos.x).toBe(5);
      expect(pos.y).toBe(10);
    });

    test('should create position with zero coordinates', () => {
      const pos = new Position(0, 0);
      expect(pos.x).toBe(0);
      expect(pos.y).toBe(0);
    });

    test('should create position with negative coordinates', () => {
      const pos = new Position(-3, -7);
      expect(pos.x).toBe(-3);
      expect(pos.y).toBe(-7);
    });
  });

  describe('equals', () => {
    test('should return true for positions with same coordinates', () => {
      const pos1 = new Position(5, 10);
      const pos2 = new Position(5, 10);
      expect(pos1.equals(pos2)).toBe(true);
    });

    test('should return false for positions with different x', () => {
      const pos1 = new Position(5, 10);
      const pos2 = new Position(6, 10);
      expect(pos1.equals(pos2)).toBe(false);
    });

    test('should return false for positions with different y', () => {
      const pos1 = new Position(5, 10);
      const pos2 = new Position(5, 11);
      expect(pos1.equals(pos2)).toBe(false);
    });

    test('should return false for positions with both different coordinates', () => {
      const pos1 = new Position(5, 10);
      const pos2 = new Position(6, 11);
      expect(pos1.equals(pos2)).toBe(false);
    });
  });

  describe('add', () => {
    test('should add positive coordinates correctly', () => {
      const pos1 = new Position(5, 10);
      const pos2 = new Position(3, 7);
      const result = pos1.add(pos2);
      expect(result.x).toBe(8);
      expect(result.y).toBe(17);
    });

    test('should add negative coordinates correctly', () => {
      const pos1 = new Position(5, 10);
      const pos2 = new Position(-2, -5);
      const result = pos1.add(pos2);
      expect(result.x).toBe(3);
      expect(result.y).toBe(5);
    });

    test('should not modify original positions', () => {
      const pos1 = new Position(5, 10);
      const pos2 = new Position(3, 7);
      pos1.add(pos2);
      expect(pos1.x).toBe(5);
      expect(pos1.y).toBe(10);
      expect(pos2.x).toBe(3);
      expect(pos2.y).toBe(7);
    });
  });

  describe('clone', () => {
    test('should create a new position with same coordinates', () => {
      const original = new Position(5, 10);
      const cloned = original.clone();
      expect(cloned.x).toBe(5);
      expect(cloned.y).toBe(10);
      expect(cloned).not.toBe(original);
    });

    test('should create independent copy', () => {
      const original = new Position(5, 10);
      const cloned = original.clone();
      cloned.x = 20;
      expect(original.x).toBe(5);
      expect(cloned.x).toBe(20);
    });
  });

  describe('toString', () => {
    test('should return string representation', () => {
      const pos = new Position(5, 10);
      expect(pos.toString()).toBe('(5, 10)');
    });

    test('should handle negative coordinates', () => {
      const pos = new Position(-3, -7);
      expect(pos.toString()).toBe('(-3, -7)');
    });
  });
});
