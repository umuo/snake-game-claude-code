/**
 * Game class
 * Main game orchestration and state management
 */

import { Snake } from './Snake.js';
import { Food } from './Food.js';
import { Collision } from './Collision.js';
import { GameConfig } from '../utils/constants.js';

export class Game {
  constructor() {
    this.reset();
  }

  /**
   * Reset game to initial state
   */
  reset() {
    this.snake = new Snake(
      GameConfig.INITIAL_SNAKE_X,
      GameConfig.INITIAL_SNAKE_Y,
      GameConfig.INITIAL_SNAKE_LENGTH
    );

    this.food = this.spawnFood(false);
    this.score = 0;
    this.speed = GameConfig.INITIAL_SPEED;
    this.speedBoostActive = false; // Track if speed boost is active
    this.running = false;
    this.paused = false;
    this.gameOver = false;
    this.smallFoodCount = 0;
  }

  /**
   * Spawn food at random unoccupied position
   * @param {boolean} isBig - Whether to spawn big food
   * @returns {Food} New food instance
   */
  spawnFood(isBig) {
    const snakePositions = this.snake.getAllPositions();
    let x, y;
    let attempts = 0;
    const maxAttempts = 1000;

    // Find unoccupied position
    do {
      x = Math.floor(Math.random() * GameConfig.BOARD_WIDTH);
      y = Math.floor(Math.random() * GameConfig.BOARD_HEIGHT);
      attempts++;
    } while (
      Collision.isPositionOccupied(
        { x, y, equals: (other) => x === other.x && y === other.y },
        snakePositions
      ) &&
      attempts < maxAttempts
    );

    return new Food(x, y, isBig);
  }

  /**
   * Start the game
   */
  start() {
    this.running = true;
    this.paused = false;
    this.gameOver = false;
  }

  /**
   * Pause the game
   */
  pause() {
    if (this.running && !this.gameOver) {
      this.paused = true;
    }
  }

  /**
   * Resume the game
   */
  resume() {
    if (this.running && this.paused) {
      this.paused = false;
    }
  }

  /**
   * Change snake direction
   * @param {DirectionType} direction - New direction
   */
  changeDirection(direction) {
    if (this.running && !this.paused && !this.gameOver) {
      this.snake.setDirection(direction);
    }
  }

  /**
   * Update game state (main game loop)
   */
  update() {
    if (!this.running || this.paused || this.gameOver) {
      return;
    }

    // Move snake
    this.snake.move(false);

    // Check collisions
    const head = this.snake.getHead();

    // Check wall collision
    if (Collision.isOutOfBounds(head, GameConfig.BOARD_WIDTH, GameConfig.BOARD_HEIGHT)) {
      this.endGame();
      return;
    }

    // Check self collision
    if (Collision.isCollidingWithSelf(head, this.snake.getBodyWithoutHead())) {
      this.endGame();
      return;
    }

    // Check food collision
    if (Collision.isCollidingWithFood(head, this.food.getPosition())) {
      this.handleFoodConsumption();
    }
  }

  /**
   * Handle food being eaten
   */
  handleFoodConsumption() {
    // Add score
    this.score += this.food.getValue();

    // Grow snake
    this.snake.grow(this.food.getGrowthAmount());

    // Handle big food logic
    if (this.food.isBig()) {
      // Increase speed
      this.speed = Math.floor(this.speed * (1 - GameConfig.SPEED_INCREASE));
      // Reset counter
      this.smallFoodCount = 0;
      // Spawn new small food
      this.food = this.spawnFood(false);
    } else {
      // Increment small food counter
      this.smallFoodCount++;

      // Check if we should spawn big food
      if (this.smallFoodCount >= GameConfig.SMALL_FOOD_COUNT) {
        this.food = this.spawnFood(true);
        this.smallFoodCount = 0;
      } else {
        this.food = this.spawnFood(false);
      }
    }
  }

  /**
   * End the game
   */
  endGame() {
    this.gameOver = true;
  }

  /**
   * Trigger game over (for testing)
   */
  triggerGameOver() {
    this.endGame();
  }

  // Getters
  isRunning() {
    return this.running;
  }

  isPaused() {
    return this.paused;
  }

  isGameOver() {
    return this.gameOver;
  }

  getScore() {
    return this.score;
  }

  getSnake() {
    return this.snake;
  }

  getFood() {
    return this.food;
  }

  getSpeed() {
    const baseSpeed = this.speed;
    return this.speedBoostActive ? baseSpeed * GameConfig.SPEED_BOOST_MULTIPLIER : baseSpeed;
  }

  /**
   * Enable speed boost (when holding direction key)
   */
  enableSpeedBoost() {
    this.speedBoostActive = true;
  }

  /**
   * Disable speed boost (when releasing direction key)
   */
  disableSpeedBoost() {
    this.speedBoostActive = false;
  }

  getSmallFoodCount() {
    return this.smallFoodCount;
  }

  getBoardWidth() {
    return GameConfig.BOARD_WIDTH;
  }

  getBoardHeight() {
    return GameConfig.BOARD_HEIGHT;
  }
}
