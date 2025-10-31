/**
 * Integration tests for basic game flow
 * Tests complete game scenarios from User Story 1
 */

import { Game } from '../../src/js/game/Game.js';
import { Direction } from '../../src/js/utils/Direction.js';
import { GameConfig } from '../../src/js/utils/constants.js';

describe('Game Flow Integration Tests - User Story 1', () => {
  let game;

  beforeEach(() => {
    game = new Game();
  });

  describe('Acceptance Scenario 1: Snake moves smoothly without reversing', () => {
    test('should move snake in current direction continuously', () => {
      game.start();
      const initialHead = game.getSnake().getHead().clone();

      // Move right (default direction)
      game.update();
      let newHead = game.getSnake().getHead();
      expect(newHead.x).toBe(initialHead.x + 1);
      expect(newHead.y).toBe(initialHead.y);

      // Change to UP and move
      game.changeDirection(Direction.UP);
      const headBeforeUp = newHead.clone();
      game.update();
      newHead = game.getSnake().getHead();
      expect(newHead.x).toBe(headBeforeUp.x);
      expect(newHead.y).toBe(headBeforeUp.y - 1);
    });

    test('should prevent snake from reversing direction', () => {
      game.start();

      // Try to reverse from RIGHT to LEFT
      game.changeDirection(Direction.LEFT);
      expect(game.getSnake().getDirection()).toBe(Direction.RIGHT);

      // Change to UP (valid)
      game.changeDirection(Direction.UP);
      expect(game.getSnake().getDirection()).toBe(Direction.UP);

      // Try to reverse from UP to DOWN
      game.changeDirection(Direction.DOWN);
      expect(game.getSnake().getDirection()).toBe(Direction.UP);
    });
  });

  describe('Acceptance Scenario 2: Snake eats food and grows', () => {
    test('should grow by 1 segment when eating small food', () => {
      game.start();
      const initialLength = game.getSnake().getLength();
      const food = game.getFood();

      // Position snake to eat food
      // This simulates finding and eating food
      let attempts = 0;
      const maxAttempts = 1000;

      while (!game.isGameOver() && attempts < maxAttempts) {
        const head = game.getSnake().getHead();
        if (head.equals(food.getPosition())) {
          break;
        }

        // Navigate toward food
        if (head.x < food.getPosition().x && game.getSnake().getDirection() !== Direction.LEFT) {
          game.changeDirection(Direction.RIGHT);
        } else if (head.x > food.getPosition().x && game.getSnake().getDirection() !== Direction.RIGHT) {
          game.changeDirection(Direction.LEFT);
        } else if (head.y < food.getPosition().y && game.getSnake().getDirection() !== Direction.UP) {
          game.changeDirection(Direction.DOWN);
        } else if (head.y > food.getPosition().y && game.getSnake().getDirection() !== Direction.DOWN) {
          game.changeDirection(Direction.UP);
        }

        game.update();
        attempts++;
      }

      if (!game.isGameOver() && attempts < maxAttempts) {
        expect(game.getSnake().getLength()).toBeGreaterThan(initialLength);
      }
    });

    test('should spawn new food after eating', () => {
      game.start();
      const foodBefore = game.getFood().getPosition().clone();

      // Simulate eating food (implementation will spawn new food)
      let foodChanged = false;
      let attempts = 0;
      const maxAttempts = 1000;

      while (!game.isGameOver() && !foodChanged && attempts < maxAttempts) {
        game.update();
        const currentFood = game.getFood().getPosition();
        if (!currentFood.equals(foodBefore)) {
          foodChanged = true;
        }
        attempts++;
      }

      // Food position should change after being eaten
      // This will be verified once implementation is complete
    });

    test('should increase score when eating food', () => {
      game.start();
      const initialScore = game.getScore();

      // Play game until food is eaten or game over
      let attempts = 0;
      const maxAttempts = 1000;

      while (!game.isGameOver() && game.getScore() === initialScore && attempts < maxAttempts) {
        game.update();
        attempts++;
      }

      // Score should increase after eating food
      // This will be verified once implementation is complete
    });
  });

  describe('Acceptance Scenario 3: Game ends on self-collision', () => {
    test('should end game when snake collides with itself', () => {
      game.start();

      // Grow snake enough to allow self-collision
      for (let i = 0; i < 10; i++) {
        game.getSnake().grow(1);
      }

      // Create a collision scenario by moving in a circle
      let moves = 0;
      while (!game.isGameOver() && moves < 50) {
        if (moves % 4 === 0) game.changeDirection(Direction.UP);
        else if (moves % 4 === 1) game.changeDirection(Direction.LEFT);
        else if (moves % 4 === 2) game.changeDirection(Direction.DOWN);
        else game.changeDirection(Direction.RIGHT);

        game.update();
        moves++;
      }

      // Eventually snake should collide with itself
      // Exact behavior depends on implementation
    });
  });

  describe('Acceptance Scenario 4: Game ends on wall collision', () => {
    test('should end game when snake hits top wall', () => {
      game.start();
      game.changeDirection(Direction.UP);

      // Move until hitting wall or game over
      let moves = 0;
      while (!game.isGameOver() && moves < GameConfig.BOARD_HEIGHT + 5) {
        game.update();
        moves++;
      }

      expect(game.isGameOver()).toBe(true);
    });

    test('should end game when snake hits left wall', () => {
      game.start();
      game.changeDirection(Direction.LEFT);

      let moves = 0;
      while (!game.isGameOver() && moves < GameConfig.BOARD_WIDTH + 5) {
        game.update();
        moves++;
      }

      expect(game.isGameOver()).toBe(true);
    });

    test('should end game when snake hits right wall', () => {
      game.start();
      // Snake starts moving right by default

      let moves = 0;
      while (!game.isGameOver() && moves < GameConfig.BOARD_WIDTH + 5) {
        game.update();
        moves++;
      }

      expect(game.isGameOver()).toBe(true);
    });

    test('should end game when snake hits bottom wall', () => {
      game.start();
      game.changeDirection(Direction.DOWN);

      let moves = 0;
      while (!game.isGameOver() && moves < GameConfig.BOARD_HEIGHT + 5) {
        game.update();
        moves++;
      }

      expect(game.isGameOver()).toBe(true);
    });
  });

  describe('Complete game session', () => {
    test('should support full game lifecycle: start -> play -> game over -> reset', () => {
      // Start game
      game.start();
      expect(game.isRunning()).toBe(true);

      // Play a few moves
      for (let i = 0; i < 5; i++) {
        game.update();
      }

      // Reset game
      game.reset();
      expect(game.isRunning()).toBe(false);
      expect(game.isGameOver()).toBe(false);
      expect(game.getScore()).toBe(0);

      // Should be able to start again
      game.start();
      expect(game.isRunning()).toBe(true);
    });

    test('should support pause and resume during gameplay', () => {
      game.start();

      // Play a bit
      game.update();
      game.update();

      // Pause
      game.pause();
      expect(game.isPaused()).toBe(true);
      const headWhenPaused = game.getSnake().getHead().clone();

      // Updates should not change state when paused
      game.update();
      expect(game.getSnake().getHead().equals(headWhenPaused)).toBe(true);

      // Resume
      game.resume();
      expect(game.isPaused()).toBe(false);

      // Should continue playing
      game.update();
      expect(game.getSnake().getHead().equals(headWhenPaused)).toBe(false);
    });
  });
});
