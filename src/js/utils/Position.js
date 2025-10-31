/**
 * Position utility class
 * Represents a 2D coordinate on the game board
 */

export class Position {
  /**
   * Create a new position
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Check if this position equals another position
   * @param {Position} other - The position to compare with
   * @returns {boolean} True if positions are equal
   */
  equals(other) {
    return this.x === other.x && this.y === other.y;
  }

  /**
   * Add another position to this position
   * @param {Position} other - The position to add
   * @returns {Position} A new position with the sum
   */
  add(other) {
    return new Position(this.x + other.x, this.y + other.y);
  }

  /**
   * Create a copy of this position
   * @returns {Position} A new position with the same coordinates
   */
  clone() {
    return new Position(this.x, this.y);
  }

  /**
   * Get string representation of this position
   * @returns {string} String in format "(x, y)"
   */
  toString() {
    return `(${this.x}, ${this.y})`;
  }
}
