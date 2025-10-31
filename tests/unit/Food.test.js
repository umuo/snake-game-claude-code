/**
 * Unit tests for Food entity
 * Tests food creation, positioning, and type management
 */

import { Food } from '../../src/js/game/Food.js';
import { Position } from '../../src/js/utils/Position.js';
import { GameConfig } from '../../src/js/utils/constants.js';

describe('Food', () => {
  describe('constructor', () => {
    test('should create small food by default', () => {
      const food = new Food(5, 5);
      expect(food.getPosition().x).toBe(5);
      expect(food.getPosition().y).toBe(5);
      expect(food.isBig()).toBe(false);
    });

    test('should create big food when specified', () => {
      const food = new Food(5, 5, true);
      expect(food.isBig()).toBe(true);
    });

    test('should create small food when explicitly false', () => {
      const food = new Food(5, 5, false);
      expect(food.isBig()).toBe(false);
    });
  });

  describe('getValue', () => {
    test('should return small food score for small food', () => {
      const food = new Food(5, 5, false);
      expect(food.getValue()).toBe(GameConfig.SMALL_FOOD_SCORE);
    });

    test('should return big food score for big food', () => {
      const food = new Food(5, 5, true);
      expect(food.getValue()).toBe(GameConfig.BIG_FOOD_SCORE);
    });
  });

  describe('getGrowthAmount', () => {
    test('should return small growth for small food', () => {
      const food = new Food(5, 5, false);
      expect(food.getGrowthAmount()).toBe(GameConfig.SMALL_FOOD_GROWTH);
    });

    test('should return big growth for big food', () => {
      const food = new Food(5, 5, true);
      expect(food.getGrowthAmount()).toBe(GameConfig.BIG_FOOD_GROWTH);
    });
  });

  describe('getPosition', () => {
    test('should return position object', () => {
      const food = new Food(10, 15);
      const pos = food.getPosition();
      expect(pos).toBeInstanceOf(Position);
      expect(pos.x).toBe(10);
      expect(pos.y).toBe(15);
    });
  });

  describe('setPosition', () => {
    test('should update food position', () => {
      const food = new Food(5, 5);
      food.setPosition(10, 15);
      const pos = food.getPosition();
      expect(pos.x).toBe(10);
      expect(pos.y).toBe(15);
    });

    test('should maintain food type when repositioning', () => {
      const food = new Food(5, 5, true);
      food.setPosition(10, 15);
      expect(food.isBig()).toBe(true);
    });
  });

  describe('setType', () => {
    test('should change small food to big food', () => {
      const food = new Food(5, 5, false);
      food.setType(true);
      expect(food.isBig()).toBe(true);
    });

    test('should change big food to small food', () => {
      const food = new Food(5, 5, true);
      food.setType(false);
      expect(food.isBig()).toBe(false);
    });

    test('should update value when type changes', () => {
      const food = new Food(5, 5, false);
      expect(food.getValue()).toBe(GameConfig.SMALL_FOOD_SCORE);
      food.setType(true);
      expect(food.getValue()).toBe(GameConfig.BIG_FOOD_SCORE);
    });

    test('should update growth amount when type changes', () => {
      const food = new Food(5, 5, false);
      expect(food.getGrowthAmount()).toBe(GameConfig.SMALL_FOOD_GROWTH);
      food.setType(true);
      expect(food.getGrowthAmount()).toBe(GameConfig.BIG_FOOD_GROWTH);
    });
  });
});
