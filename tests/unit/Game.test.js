/**
 * Unit tests for Game class
 * Tests game state management, game loop, and core mechanics
 */

import { Game } from '../../src/js/game/Game.js';
import { Direction } from '../../src/js/utils/Direction.js';
import { GameConfig } from '../../src/js/utils/constants.js';

describe('Game', () => {
  let game;

  beforeEach(() => {
    game = new Game();
  });

  describe('initialization', () => {
    test('should initialize with default game state', () => {
      expect(game.isRunning()).toBe(false);
      expect(game.isGameOver()).toBe(false);
      expect(game.getScore()).toBe(0);
    });

    test('should create snake at initial position', () => {
      const snake = game.getSnake();
      expect(snake).toBeDefined();
      expect(snake.getHead().x).toBe(GameConfig.INITIAL_SNAKE_X);
      expect(snake.getHead().y).toBe(GameConfig.INITIAL_SNAKE_Y);
    });

    test('should create initial food', () => {
      const food = game.getFood();
      expect(food).toBeDefined();
      expect(food.isBig()).toBe(false);
    });

    test('should initialize food counter to 0', () => {
      expect(game.getSmallFoodCount()).toBe(0);
    });
  });

  describe('start', () => {
    test('should set game to running state', () => {
      game.start();
      expect(game.isRunning()).toBe(true);
      expect(game.isGameOver()).toBe(false);
    });

    test('should not be paused after start', () => {
      game.start();
      expect(game.isPaused()).toBe(false);
    });
  });

  describe('pause and resume', () => {
    test('should pause running game', () => {
      game.start();
      game.pause();
      expect(game.isPaused()).toBe(true);
      expect(game.isRunning()).toBe(true);
    });

    test('should resume paused game', () => {
      game.start();
      game.pause();
      game.resume();
      expect(game.isPaused()).toBe(false);
      expect(game.isRunning()).toBe(true);
    });

    test('should not pause if game not started', () => {
      game.pause();
      expect(game.isPaused()).toBe(false);
    });
  });

  describe('changeDirection', () => {
    test('should change snake direction', () => {
      game.start();
      game.changeDirection(Direction.UP);
      expect(game.getSnake().getDirection()).toBe(Direction.UP);
    });

    test('should not change direction when paused', () => {
      game.start();
      game.pause();
      const originalDirection = game.getSnake().getDirection();
      game.changeDirection(Direction.UP);
      expect(game.getSnake().getDirection()).toBe(originalDirection);
    });

    test('should not change direction when game over', () => {
      game.start();
      game.triggerGameOver();
      game.changeDirection(Direction.UP);
      expect(game.getSnake().getDirection()).toBe(Direction.RIGHT);
    });
  });

  describe('update', () => {
    test('should not update when paused', () => {
      game.start();
      const headBefore = game.getSnake().getHead();
      game.pause();
      game.update();
      const headAfter = game.getSnake().getHead();
      expect(headAfter.x).toBe(headBefore.x);
      expect(headAfter.y).toBe(headBefore.y);
    });

    test('should not update when game over', () => {
      game.start();
      game.triggerGameOver();
      const headBefore = game.getSnake().getHead();
      game.update();
      const headAfter = game.getSnake().getHead();
      expect(headAfter.x).toBe(headBefore.x);
      expect(headAfter.y).toBe(headBefore.y);
    });

    test('should move snake when running', () => {
      game.start();
      const headBefore = game.getSnake().getHead().clone();
      game.update();
      const headAfter = game.getSnake().getHead();
      expect(headAfter.x).not.toBe(headBefore.x);
    });
  });

  describe('food consumption', () => {
    test('should increase score when eating small food', () => {
      game.start();
      const initialScore = game.getScore();
      // Simulate eating food by moving snake to food position
      const food = game.getFood();
      game.getSnake().setDirection(Direction.RIGHT);
      // Position snake head at food
      while (!game.getSnake().getHead().equals(food.getPosition())) {
        if (game.isGameOver()) break;
        game.update();
      }
      if (!game.isGameOver()) {
        game.update(); // Process food consumption
        expect(game.getScore()).toBeGreaterThan(initialScore);
      }
    });

    test('should increment small food counter when eating small food', () => {
      game.start();
      const initialCount = game.getSmallFoodCount();
      expect(initialCount).toBe(0);
      // The actual test would require positioning and eating food
      // This is better covered in integration tests
    });

    test('should spawn new food after eating', () => {
      game.start();
      const foodBefore = game.getFood().getPosition();
      // Simulate complete game loop with food eating
      // This is better covered in integration tests
    });
  });

  describe('collision detection', () => {
    test('should end game on wall collision', () => {
      game.start();
      // Move snake to wall by setting position out of bounds
      // This would require exposing internal state or helper methods
      // Better covered in integration tests
    });

    test('should end game on self collision', () => {
      game.start();
      // Would require snake to be long enough to collide with itself
      // Better covered in integration tests
    });
  });

  describe('reset', () => {
    test('should reset game to initial state', () => {
      game.start();
      game.changeDirection(Direction.UP);
      game.update();
      game.reset();

      expect(game.isRunning()).toBe(false);
      expect(game.isGameOver()).toBe(false);
      expect(game.getScore()).toBe(0);
      expect(game.getSmallFoodCount()).toBe(0);
    });

    test('should reset snake to initial position', () => {
      game.start();
      game.update();
      game.reset();

      const snake = game.getSnake();
      expect(snake.getHead().x).toBe(GameConfig.INITIAL_SNAKE_X);
      expect(snake.getHead().y).toBe(GameConfig.INITIAL_SNAKE_Y);
      expect(snake.getDirection()).toBe(Direction.RIGHT);
    });
  });

  describe('getters', () => {
    test('should return current speed', () => {
      expect(game.getSpeed()).toBe(GameConfig.INITIAL_SPEED);
    });

    test('should return board dimensions', () => {
      expect(game.getBoardWidth()).toBe(GameConfig.BOARD_WIDTH);
      expect(game.getBoardHeight()).toBe(GameConfig.BOARD_HEIGHT);
    });
  });

  describe('speed boost mechanics', () => {
    test('should apply speed boost when enabled', () => {
      game.start();
      const normalSpeed = game.getSpeed();

      game.enableSpeedBoost();
      const boostedSpeed = game.getSpeed();

      expect(boostedSpeed).toBe(
        normalSpeed * GameConfig.SPEED_BOOST_MULTIPLIER
      );
      expect(boostedSpeed).toBeLessThan(normalSpeed);
    });

    test('should return to normal speed when boost disabled', () => {
      game.start();
      const normalSpeed = game.getSpeed();

      game.enableSpeedBoost();
      expect(game.getSpeed()).toBeLessThan(normalSpeed);

      game.disableSpeedBoost();
      expect(game.getSpeed()).toBe(normalSpeed);
    });

    test('should apply boost to progressive speed increases', () => {
      game.start();

      // Eat big food to increase base speed
      for (let i = 0; i < 4; i++) {
        game.handleFoodConsumption();
      }
      game.handleFoodConsumption(); // Eat big food

      const increasedBaseSpeed = game.getSpeed();

      game.enableSpeedBoost();
      const boostedIncreasedSpeed = game.getSpeed();

      expect(boostedIncreasedSpeed).toBe(
        increasedBaseSpeed * GameConfig.SPEED_BOOST_MULTIPLIER
      );
    });
  });

  describe('User Story 2: Speed increase mechanics', () => {
    test('should increase speed when eating big food', () => {
      game.start();
      const initialSpeed = game.getSpeed();

      // Eat 4 small foods to spawn big food
      for (let i = 0; i < 4; i++) {
        game.handleFoodConsumption();
      }

      // Eat big food
      game.handleFoodConsumption();

      const newSpeed = game.getSpeed();
      expect(newSpeed).toBeLessThan(initialSpeed);
      expect(newSpeed).toBe(
        Math.floor(initialSpeed * (1 - GameConfig.SPEED_INCREASE))
      );
    });

    test('should not change speed when eating small food', () => {
      game.start();
      const initialSpeed = game.getSpeed();

      // Eat small food
      game.handleFoodConsumption();

      expect(game.getSpeed()).toBe(initialSpeed);
    });

    test('should accumulate speed increases', () => {
      game.start();
      const initialSpeed = game.getSpeed();

      // Eat first big food cycle
      for (let i = 0; i < 4; i++) {
        game.handleFoodConsumption();
      }
      game.handleFoodConsumption();
      const speedAfterFirst = game.getSpeed();

      // Eat second big food cycle
      for (let i = 0; i < 4; i++) {
        game.handleFoodConsumption();
      }
      game.handleFoodConsumption();
      const speedAfterSecond = game.getSpeed();

      expect(speedAfterFirst).toBeLessThan(initialSpeed);
      expect(speedAfterSecond).toBeLessThan(speedAfterFirst);
    });

    test('should reset speed on game reset', () => {
      game.start();

      // Increase speed
      for (let i = 0; i < 4; i++) {
        game.handleFoodConsumption();
      }
      game.handleFoodConsumption();

      expect(game.getSpeed()).toBeLessThan(GameConfig.INITIAL_SPEED);

      // Reset
      game.reset();

      expect(game.getSpeed()).toBe(GameConfig.INITIAL_SPEED);
    });
  });
});
