/**
 * Direction enum
 * Represents the four cardinal directions for snake movement
 */

class DirectionType {
  /**
   * Create a direction
   * @param {string} name - Direction name
   * @param {number} x - X component of direction vector
   * @param {number} y - Y component of direction vector
   */
  constructor(name, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;
  }

  /**
   * Check if this direction is opposite to another direction
   * @param {DirectionType} other - The direction to compare with
   * @returns {boolean} True if directions are opposite
   */
  isOpposite(other) {
    return this.x === -other.x && this.y === -other.y;
  }
}

/**
 * Direction constants
 */
export const Direction = {
  UP: new DirectionType('UP', 0, -1),
  DOWN: new DirectionType('DOWN', 0, 1),
  LEFT: new DirectionType('LEFT', -1, 0),
  RIGHT: new DirectionType('RIGHT', 1, 0),
};

// Freeze to prevent modification
Object.freeze(Direction);
