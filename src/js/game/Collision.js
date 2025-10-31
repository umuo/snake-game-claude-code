/**
 * Collision detection service
 * Handles all collision detection logic for the game
 */

export class Collision {
  /**
   * Check if a position is out of bounds
   * @param {Position} position - The position to check
   * @param {number} width - Board width
   * @param {number} height - Board height
   * @returns {boolean} True if position is out of bounds
   */
  static isOutOfBounds(position, width, height) {
    return position.x < 0 || position.x >= width || position.y < 0 || position.y >= height;
  }

  /**
   * Check if snake head collides with its own body
   * @param {Position} head - Snake head position
   * @param {Position[]} body - Array of snake body positions
   * @returns {boolean} True if head collides with body
   */
  static isCollidingWithSelf(head, body) {
    return body.some((segment) => head.equals(segment));
  }

  /**
   * Check if a position collides with food
   * @param {Position} position - The position to check
   * @param {Position} foodPosition - The food position
   * @returns {boolean} True if positions match
   */
  static isCollidingWithFood(position, foodPosition) {
    return position.equals(foodPosition);
  }

  /**
   * Check if a position is occupied by any position in a list
   * @param {Position} position - The position to check
   * @param {Position[]} occupiedPositions - Array of occupied positions
   * @returns {boolean} True if position is occupied
   */
  static isPositionOccupied(position, occupiedPositions) {
    return occupiedPositions.some((occupied) => position.equals(occupied));
  }
}
