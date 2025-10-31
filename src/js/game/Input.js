/**
 * Input handler
 * Manages keyboard input for game control
 */

import { Direction } from '../utils/Direction.js';

export class Input {
  /**
   * Create input handler
   * @param {Game} game - Game instance to control
   * @param {Function} onRestart - Callback to restart game loop
   */
  constructor(game, onRestart = null) {
    this.game = game;
    this.onRestart = onRestart;
    this.directionKeysPressed = new Set(); // Track which direction keys are held
    this.setupEventListeners();
  }

  /**
   * Setup keyboard event listeners
   */
  setupEventListeners() {
    document.addEventListener('keydown', (event) => {
      this.handleKeyDown(event.key);
    });

    document.addEventListener('keyup', (event) => {
      this.handleKeyUp(event.key);
    });
  }

  /**
   * Check if key is a direction key
   * @param {string} key - Key to check
   * @returns {boolean}
   */
  isDirectionKey(key) {
    return [
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'w',
      'W',
      'a',
      'A',
      's',
      'S',
      'd',
      'D',
    ].includes(key);
  }

  /**
   * Handle key down events
   * @param {string} key - Key that was pressed
   */
  handleKeyDown(key) {
    // Track direction keys for speed boost
    if (this.isDirectionKey(key)) {
      this.directionKeysPressed.add(key);
      // Enable speed boost when direction key is held
      if (this.game.isRunning() && !this.game.isGameOver()) {
        this.game.enableSpeedBoost();
      }
    }

    // Direction controls (Arrow keys)
    switch (key) {
    case 'ArrowUp':
    case 'w':
    case 'W':
      this.game.changeDirection(Direction.UP);
      break;
    case 'ArrowDown':
    case 's':
    case 'S':
      this.game.changeDirection(Direction.DOWN);
      break;
    case 'ArrowLeft':
    case 'a':
    case 'A':
      this.game.changeDirection(Direction.LEFT);
      break;
    case 'ArrowRight':
    case 'd':
    case 'D':
      this.game.changeDirection(Direction.RIGHT);
      break;

      // Pause/Resume
    case ' ':
    case 'p':
    case 'P':
      if (this.game.isPaused()) {
        this.game.resume();
      } else if (this.game.isRunning() && !this.game.isGameOver()) {
        this.game.pause();
      }
      break;

      // Restart (when game over)
    case 'r':
    case 'R':
    case 'Enter':
      if (this.game.isGameOver() || !this.game.isRunning()) {
        if (this.onRestart) {
          // Use callback to properly restart game loop
          this.onRestart();
        } else {
          // Fallback to basic restart
          this.game.reset();
          this.game.start();
        }
      }
      break;
    }
  }

  /**
   * Handle key up events
   * @param {string} key - Key that was released
   */
  handleKeyUp(key) {
    // Remove from pressed keys
    if (this.isDirectionKey(key)) {
      this.directionKeysPressed.delete(key);

      // Disable speed boost only if no direction keys are held
      if (this.directionKeysPressed.size === 0) {
        this.game.disableSpeedBoost();
      }
    }
  }

  /**
   * Handle key press events (deprecated, kept for compatibility)
   * @param {string} key - Key that was pressed
   */
  handleKeyPress(key) {
    this.handleKeyDown(key);
  }
}
