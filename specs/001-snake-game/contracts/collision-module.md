# Collision Module Contract

**Module**: `src/game/Collision.js`
**Purpose**: Centralized collision detection logic
**Dependencies**: Position, Direction, Snake, Food, GameConfig

## Interface

```javascript
class Collision {
  /**
   * Check if snake head collides with board boundaries
   * @param {Position} position - Snake head position
   * @param {number} boardWidth - Board width in cells
   * @param {number} boardHeight - Board height in cells
   * @returns {boolean} true if collision detected
   */
  checkWallCollision(position, boardWidth, boardHeight)

  /**
   * Check if snake head collides with its own body
   * @param {Position} headPosition - Snake head position
   * @param {Position[]} segments - All snake segments (tail to head)
   * @returns {boolean} true if collision detected
   */
  checkSelfCollision(headPosition, segments)

  /**
   * Check if snake head reaches food
   * @param {Position} headPosition - Snake head position
   * @param {Food} food - Food entity to check
   * @returns {boolean} true if snake ate food
   */
  checkFoodCollision(headPosition, food)

  /**
   * Comprehensive collision check
   * @param {Position} headPosition - Snake head position
   * @param {Position[]} segments - Snake segments
   * @param {number} boardWidth - Board width
   * @param {number} boardHeight - Board height
   * @param {Food} food - Current food
   * @returns {object} {
   *   hasWallCollision,
   *   hasSelfCollision,
   *   hasFoodCollision,
   *   gameOver
   * }
   */
  checkAllCollisions(headPosition, segments, boardWidth, boardHeight, food)

  /**
   * Check if position is within board bounds
   * @param {Position} position - Position to check
   * @param {number} boardWidth - Board width
   * @param {number} boardHeight - Board height
   * @returns {boolean} true if within bounds
   */
  isWithinBounds(position, boardWidth, boardHeight)

  /**
   * Check if two positions are equal
   * @param {Position} pos1 - First position
   * @param {Position} pos2 - Second position
   * @returns {boolean} true if positions match
   */
  positionsEqual(pos1, pos2)
}
```

## Collision Detection Contract

### checkWallCollision(position, boardWidth, boardHeight)

**Detection Logic**:
```
return position.x < 0 ||
       position.x >= boardWidth ||
       position.y < 0 ||
       position.y >= boardHeight
```

**Returns**: `true` if snake hit wall (game over condition)

### checkSelfCollision(headPosition, segments)

**Detection Logic**:
```
// Check head against all body segments except tail
// (tail moves in same frame, so it's not a collision)
for (let i = 0; i < segments.length - 1; i++) {
  if (positionsEqual(headPosition, segments[i])) {
    return true; // collision with body
  }
}
return false; // no collision
```

**Key Rule**: Tail segment excluded from collision check (moves simultaneously)

**Returns**: `true` if snake hit itself (game over condition)

### checkFoodCollision(headPosition, food)

**Detection Logic**:
```
if (!food || !food.getPosition()) {
  return false; // no food to collide with
}
return positionsEqual(headPosition, food.getPosition());
```

**Returns**: `true` if snake head on food (food consumed)

### checkAllCollisions(headPosition, segments, boardWidth, boardHeight, food)

**Comprehensive Check**:
```
const wallCollision = checkWallCollision(headPosition, boardWidth, boardHeight);
const selfCollision = checkSelfCollision(headPosition, segments);
const foodCollision = checkFoodCollision(headPosition, food);

return {
  hasWallCollision: wallCollision,
  hasSelfCollision: selfCollision,
  hasFoodCollision: foodCollision,
  gameOver: wallCollision || selfCollision
};
```

**Returns**: Object with all collision states and game over flag

## Utility Functions Contract

### isWithinBounds(position, boardWidth, boardHeight)

**Purpose**: Validate position is on game board

**Logic**:
```
return position.x >= 0 &&
       position.x < boardWidth &&
       position.y >= 0 &&
       position.y < boardHeight;
```

### positionsEqual(pos1, pos2)

**Purpose**: Compare two positions for equality

**Logic**:
```
return pos1.x === pos2.x && pos1.y === pos2.y;
```

## Collision Priority

**Order of Checks** (for performance and correctness):

1. **Food Collision** (fastest check, most common)
2. **Wall Collision** (simple boundary check)
3. **Self Collision** (loop through segments, most expensive)

## Error Handling

- `InvalidPositionError`: Position has invalid x/y values (NaN, undefined)
- `InvalidBoardDimensionsError`: Width or height is <= 0
- `InvalidSegmentsError`: Segments array is empty or malformed
- `InvalidFoodError`: Food object is missing required methods

## Performance Requirements

- Wall collision: O(1) constant time
- Food collision: O(1) constant time
- Self collision: O(n) where n = snake segments
- All checks must complete in <1ms for snake length up to 100 segments

## Testing Contract

**Unit Tests Required**:
- checkWallCollision() detects collision at each boundary
- checkWallCollision() returns false for valid positions
- checkSelfCollision() detects head-body collision
- checkSelfCollision() ignores tail segment correctly
- checkSelfCollision() returns false when no collision
- checkFoodCollision() returns true when head on food
- checkFoodCollision() returns false when head not on food
- checkFoodCollision() handles null food gracefully
- checkAllCollisions() returns correct state object
- isWithinBounds() validates all boundary cases
- positionsEqual() matches positions correctly

**Integration Tests Required**:
- Multiple collision types in same frame
- Game over state correctly triggered by wall/self collision
- Food consumption prevents wall/self collision false positives
- Performance with long snake (100+ segments)
