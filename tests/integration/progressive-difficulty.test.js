/**
 * Integration tests for progressive difficulty mechanics
 * Tests User Story 2: Big food spawning and speed increase
 */

import { Game } from '../../src/js/game/Game.js';
import { GameConfig } from '../../src/js/utils/constants.js';
import { Direction } from '../../src/js/utils/Direction.js';

describe('Progressive Difficulty Integration Tests - User Story 2', () => {
  let game;

  beforeEach(() => {
    game = new Game();
    game.start();
  });

  describe('Acceptance Scenario 1: Big food spawns after 4 small foods', () => {
    test('should spawn big food after eating exactly 4 small foods', () => {
      // Ensure we start with small food
      expect(game.getFood().isBig()).toBe(false);
      expect(game.getSmallFoodCount()).toBe(0);

      // Manually simulate eating 4 small foods
      for (let i = 0; i < 4; i++) {
        const currentFood = game.getFood();
        expect(currentFood.isBig()).toBe(false);

        // Simulate eating by directly calling handleFoodConsumption
        game.handleFoodConsumption();
      }

      // After 4 small foods, next food should be big
      expect(game.getFood().isBig()).toBe(true);
    });

    test('should reset counter after spawning big food', () => {
      // Eat 4 small foods
      for (let i = 0; i < 4; i++) {
        game.handleFoodConsumption();
      }

      // Counter should reset when big food spawns
      expect(game.getSmallFoodCount()).toBe(0);
      expect(game.getFood().isBig()).toBe(true);
    });

    test('should not spawn big food before eating 4 small foods', () => {
      // Eat 3 small foods
      for (let i = 0; i < 3; i++) {
        expect(game.getFood().isBig()).toBe(false);
        game.handleFoodConsumption();
      }

      // Should still be small food
      expect(game.getFood().isBig()).toBe(false);
      expect(game.getSmallFoodCount()).toBe(3);
    });
  });

  describe('Acceptance Scenario 2: Big food provides bonus growth', () => {
    test('should grow by 3 segments when eating big food', () => {
      // Eat 4 small foods to spawn big food
      for (let i = 0; i < 4; i++) {
        game.handleFoodConsumption();
      }

      const lengthBefore = game.getSnake().getLength();
      expect(game.getFood().isBig()).toBe(true);

      // Eat big food
      game.handleFoodConsumption();

      const lengthAfter = game.getSnake().getLength();
      expect(lengthAfter).toBe(lengthBefore + GameConfig.BIG_FOOD_GROWTH);
      expect(lengthAfter).toBe(lengthBefore + 3);
    });

    test('should grow by 1 segment when eating small food', () => {
      const lengthBefore = game.getSnake().getLength();
      expect(game.getFood().isBig()).toBe(false);

      // Eat small food
      game.handleFoodConsumption();

      const lengthAfter = game.getSnake().getLength();
      expect(lengthAfter).toBe(lengthBefore + GameConfig.SMALL_FOOD_GROWTH);
      expect(lengthAfter).toBe(lengthBefore + 1);
    });
  });

  describe('Acceptance Scenario 3: Big food increases game speed', () => {
    test('should increase speed by 15% when eating big food', () => {
      const initialSpeed = game.getSpeed();
      expect(initialSpeed).toBe(GameConfig.INITIAL_SPEED);

      // Eat 4 small foods to spawn big food
      for (let i = 0; i < 4; i++) {
        game.handleFoodConsumption();
      }

      // Eat big food
      game.handleFoodConsumption();

      const newSpeed = game.getSpeed();
      const expectedSpeed = Math.floor(
        initialSpeed * (1 - GameConfig.SPEED_INCREASE)
      );

      expect(newSpeed).toBe(expectedSpeed);
      expect(newSpeed).toBeLessThan(initialSpeed); // Lower = faster
    });

    test('should accumulate speed increases with multiple big foods', () => {
      const initialSpeed = game.getSpeed();

      // Eat first big food
      for (let i = 0; i < 4; i++) {
        game.handleFoodConsumption();
      }
      game.handleFoodConsumption();
      const speedAfterFirst = game.getSpeed();

      // Eat second big food
      for (let i = 0; i < 4; i++) {
        game.handleFoodConsumption();
      }
      game.handleFoodConsumption();
      const speedAfterSecond = game.getSpeed();

      expect(speedAfterFirst).toBeLessThan(initialSpeed);
      expect(speedAfterSecond).toBeLessThan(speedAfterFirst);
    });

    test('should not change speed when eating small food', () => {
      const initialSpeed = game.getSpeed();

      // Eat small food
      game.handleFoodConsumption();

      expect(game.getSpeed()).toBe(initialSpeed);
    });
  });

  describe('Acceptance Scenario 4: Counter resets after big food', () => {
    test('should reset counter to 0 after eating big food', () => {
      // Eat 4 small foods
      for (let i = 0; i < 4; i++) {
        game.handleFoodConsumption();
      }

      expect(game.getSmallFoodCount()).toBe(0);
      expect(game.getFood().isBig()).toBe(true);

      // Eat big food
      game.handleFoodConsumption();

      // Counter should still be 0
      expect(game.getSmallFoodCount()).toBe(0);
      // Next food should be small
      expect(game.getFood().isBig()).toBe(false);
    });

    test('should require 4 more small foods for next big food', () => {
      // First cycle: eat 4 small + 1 big
      for (let i = 0; i < 4; i++) {
        game.handleFoodConsumption();
      }
      game.handleFoodConsumption(); // Eat big food

      // Second cycle: eat 3 small foods
      for (let i = 0; i < 3; i++) {
        expect(game.getFood().isBig()).toBe(false);
        game.handleFoodConsumption();
      }

      // Should still be small food
      expect(game.getFood().isBig()).toBe(false);
      expect(game.getSmallFoodCount()).toBe(3);

      // Eat 4th small food
      game.handleFoodConsumption();

      // Now should spawn big food
      expect(game.getFood().isBig()).toBe(true);
    });
  });

  describe('Score progression with mixed food types', () => {
    test('should award 10 points for small food and 50 for big food', () => {
      const initialScore = game.getScore();

      // Eat small food
      game.handleFoodConsumption();
      expect(game.getScore()).toBe(initialScore + 10);

      const scoreAfterSmall = game.getScore();

      // Eat 3 more small foods to spawn big food
      for (let i = 0; i < 3; i++) {
        game.handleFoodConsumption();
      }

      // Eat big food
      game.handleFoodConsumption();
      expect(game.getScore()).toBe(scoreAfterSmall + 30 + 50);
    });

    test('should track score correctly over multiple cycles', () => {
      let expectedScore = 0;

      // First cycle: 4 small + 1 big
      for (let i = 0; i < 4; i++) {
        game.handleFoodConsumption();
        expectedScore += 10;
      }
      game.handleFoodConsumption();
      expectedScore += 50;

      expect(game.getScore()).toBe(expectedScore);
      expect(game.getScore()).toBe(90); // 4*10 + 50

      // Second cycle: 4 small + 1 big
      for (let i = 0; i < 4; i++) {
        game.handleFoodConsumption();
        expectedScore += 10;
      }
      game.handleFoodConsumption();
      expectedScore += 50;

      expect(game.getScore()).toBe(expectedScore);
      expect(game.getScore()).toBe(180); // (4*10 + 50) * 2
    });
  });

  describe('Complete progressive difficulty flow', () => {
    test('should handle full game progression correctly', () => {
      const initialSpeed = game.getSpeed();
      const initialLength = game.getSnake().getLength();

      // Cycle 1: Eat 4 small foods
      for (let i = 1; i <= 4; i++) {
        expect(game.getFood().isBig()).toBe(false);
        expect(game.getSmallFoodCount()).toBe(i - 1);
        game.handleFoodConsumption();
      }

      // Verify big food spawned
      expect(game.getFood().isBig()).toBe(true);
      expect(game.getSmallFoodCount()).toBe(0);

      // Eat big food
      const lengthBeforeBig = game.getSnake().getLength();
      game.handleFoodConsumption();

      // Verify effects
      expect(game.getSnake().getLength()).toBe(lengthBeforeBig + 3);
      expect(game.getSpeed()).toBeLessThan(initialSpeed);
      expect(game.getFood().isBig()).toBe(false);

      // Cycle 2: Another 4 small foods
      for (let i = 1; i <= 4; i++) {
        expect(game.getFood().isBig()).toBe(false);
        game.handleFoodConsumption();
      }

      // Verify second big food
      expect(game.getFood().isBig()).toBe(true);
    });
  });
});
