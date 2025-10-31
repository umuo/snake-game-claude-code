/**
 * Food entity
 * Manages food position, type, and properties
 */

import { Position } from '../utils/Position.js';
import { GameConfig } from '../utils/constants.js';

export class Food {
  /**
   * Create new food
   * @param {number} x - X position
   * @param {number} y - Y position
   * @param {boolean} isBig - Whether this is big food
   */
  constructor(x, y, isBig = false) {
    this.position = new Position(x, y);
    this.big = isBig;
  }

  /**
   * Check if this is big food
   * @returns {boolean} True if big food
   */
  isBig() {
    return this.big;
  }

  /**
   * Get food position
   * @returns {Position} Food position
   */
  getPosition() {
    return this.position;
  }

  /**
   * Set food position
   * @param {number} x - New x position
   * @param {number} y - New y position
   */
  setPosition(x, y) {
    this.position = new Position(x, y);
  }

  /**
   * Set food type
   * @param {boolean} isBig - Whether food should be big
   */
  setType(isBig) {
    this.big = isBig;
  }

  /**
   * Get score value for this food
   * @returns {number} Score points
   */
  getValue() {
    return this.big ? GameConfig.BIG_FOOD_SCORE : GameConfig.SMALL_FOOD_SCORE;
  }

  /**
   * Get growth amount for this food
   * @returns {number} Number of segments to grow
   */
  getGrowthAmount() {
    return this.big ? GameConfig.BIG_FOOD_GROWTH : GameConfig.SMALL_FOOD_GROWTH;
  }
}
