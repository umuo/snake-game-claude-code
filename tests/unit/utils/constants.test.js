/**
 * Unit tests for GameConfig constants
 * Tests game configuration values
 */

import { GameConfig } from '../../../src/js/utils/constants.js';

describe('GameConfig', () => {
  describe('board dimensions', () => {
    test('should have valid BOARD_WIDTH', () => {
      expect(GameConfig.BOARD_WIDTH).toBeGreaterThanOrEqual(20);
      expect(Number.isInteger(GameConfig.BOARD_WIDTH)).toBe(true);
    });

    test('should have valid BOARD_HEIGHT', () => {
      expect(GameConfig.BOARD_HEIGHT).toBeGreaterThanOrEqual(20);
      expect(Number.isInteger(GameConfig.BOARD_HEIGHT)).toBe(true);
    });

    test('should have valid CELL_SIZE', () => {
      expect(GameConfig.CELL_SIZE).toBeGreaterThan(0);
      expect(Number.isInteger(GameConfig.CELL_SIZE)).toBe(true);
    });
  });

  describe('game speed settings', () => {
    test('should have valid INITIAL_SPEED', () => {
      expect(GameConfig.INITIAL_SPEED).toBeGreaterThan(0);
      expect(Number.isInteger(GameConfig.INITIAL_SPEED)).toBe(true);
    });

    test('should have valid SPEED_INCREASE', () => {
      expect(GameConfig.SPEED_INCREASE).toBeGreaterThan(0);
      expect(GameConfig.SPEED_INCREASE).toBeLessThan(1);
    });

    test('SPEED_INCREASE should be 15%', () => {
      expect(GameConfig.SPEED_INCREASE).toBe(0.15);
    });
  });

  describe('food mechanics', () => {
    test('should have valid SMALL_FOOD_COUNT', () => {
      expect(GameConfig.SMALL_FOOD_COUNT).toBe(4);
      expect(Number.isInteger(GameConfig.SMALL_FOOD_COUNT)).toBe(true);
    });

    test('should have valid SMALL_FOOD_GROWTH', () => {
      expect(GameConfig.SMALL_FOOD_GROWTH).toBe(1);
      expect(Number.isInteger(GameConfig.SMALL_FOOD_GROWTH)).toBe(true);
    });

    test('should have valid BIG_FOOD_GROWTH', () => {
      expect(GameConfig.BIG_FOOD_GROWTH).toBe(3);
      expect(Number.isInteger(GameConfig.BIG_FOOD_GROWTH)).toBe(true);
    });

    test('BIG_FOOD_GROWTH should be greater than SMALL_FOOD_GROWTH', () => {
      expect(GameConfig.BIG_FOOD_GROWTH).toBeGreaterThan(GameConfig.SMALL_FOOD_GROWTH);
    });
  });

  describe('scoring', () => {
    test('should have valid SMALL_FOOD_SCORE', () => {
      expect(GameConfig.SMALL_FOOD_SCORE).toBe(10);
      expect(Number.isInteger(GameConfig.SMALL_FOOD_SCORE)).toBe(true);
    });

    test('should have valid BIG_FOOD_SCORE', () => {
      expect(GameConfig.BIG_FOOD_SCORE).toBe(50);
      expect(Number.isInteger(GameConfig.BIG_FOOD_SCORE)).toBe(true);
    });

    test('BIG_FOOD_SCORE should be greater than SMALL_FOOD_SCORE', () => {
      expect(GameConfig.BIG_FOOD_SCORE).toBeGreaterThan(GameConfig.SMALL_FOOD_SCORE);
    });
  });

  describe('initial snake settings', () => {
    test('should have valid INITIAL_SNAKE_LENGTH', () => {
      expect(GameConfig.INITIAL_SNAKE_LENGTH).toBeGreaterThanOrEqual(3);
      expect(Number.isInteger(GameConfig.INITIAL_SNAKE_LENGTH)).toBe(true);
    });

    test('should have valid INITIAL_SNAKE_X', () => {
      expect(GameConfig.INITIAL_SNAKE_X).toBeGreaterThanOrEqual(0);
      expect(GameConfig.INITIAL_SNAKE_X).toBeLessThan(GameConfig.BOARD_WIDTH);
      expect(Number.isInteger(GameConfig.INITIAL_SNAKE_X)).toBe(true);
    });

    test('should have valid INITIAL_SNAKE_Y', () => {
      expect(GameConfig.INITIAL_SNAKE_Y).toBeGreaterThanOrEqual(0);
      expect(GameConfig.INITIAL_SNAKE_Y).toBeLessThan(GameConfig.BOARD_HEIGHT);
      expect(Number.isInteger(GameConfig.INITIAL_SNAKE_Y)).toBe(true);
    });
  });
});
