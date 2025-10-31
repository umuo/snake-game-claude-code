/**
 * Snake entity
 * Manages snake movement, growth, and state
 */

import { Position } from '../utils/Position.js';
import { Direction } from '../utils/Direction.js';

export class Snake {
  /**
   * Create a new snake
   * @param {number} x - Initial head x position
   * @param {number} y - Initial head y position
   * @param {number} length - Initial snake length
   */
  constructor(x, y, length) {
    this.direction = Direction.RIGHT;
    this.body = [];
    this.growthPending = 0;

    // Create initial body extending left from head
    for (let i = 0; i < length; i++) {
      this.body.push(new Position(x - i, y));
    }
  }

  /**
   * Get snake head position
   * @returns {Position} Head position
   */
  getHead() {
    return this.body[0];
  }

  /**
   * Get current direction
   * @returns {DirectionType} Current direction
   */
  getDirection() {
    return this.direction;
  }

  /**
   * Set new direction (prevents reversing)
   * @param {DirectionType} newDirection - New direction
   */
  setDirection(newDirection) {
    // Prevent reversing direction
    if (!this.direction.isOpposite(newDirection)) {
      this.direction = newDirection;
    }
  }

  /**
   * Get full body array
   * @returns {Position[]} Array of body positions
   */
  getBody() {
    return this.body;
  }

  /**
   * Get body without head
   * @returns {Position[]} Body segments excluding head
   */
  getBodyWithoutHead() {
    return this.body.slice(1);
  }

  /**
   * Get all positions occupied by snake
   * @returns {Position[]} All body positions
   */
  getAllPositions() {
    return this.body;
  }

  /**
   * Get snake length
   * @returns {number} Number of body segments
   */
  getLength() {
    return this.body.length;
  }

  /**
   * Move snake in current direction
   * @param {boolean} shouldGrow - Whether to grow this turn
   */
  move(shouldGrow) {
    // Calculate new head position
    const currentHead = this.getHead();
    const newHead = currentHead.add(new Position(this.direction.x, this.direction.y));

    // Add new head to front
    this.body.unshift(newHead);

    // Remove tail unless growing
    if (!shouldGrow && this.growthPending === 0) {
      this.body.pop();
    } else if (this.growthPending > 0) {
      this.growthPending--;
    }
  }

  /**
   * Add growth to snake
   * @param {number} amount - Number of segments to grow
   */
  grow(amount) {
    // Add segments at tail position immediately
    const tail = this.body[this.body.length - 1];
    for (let i = 0; i < amount; i++) {
      this.body.push(tail.clone());
    }
  }
}
