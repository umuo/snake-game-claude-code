# Snake Module Contract

**Module**: `src/game/Snake.js`
**Purpose**: Snake entity with movement, growth, and collision
**Dependencies**: Position, Direction, GameConfig

## Interface

```javascript
class Snake {
  /**
   * Initialize new snake
   * @param {Position} startPosition - Starting head position
   * @param {Direction} startDirection - Initial movement direction
   */
  constructor(startPosition, startDirection)

  /**
   * Move snake one step in current direction
   * Adds new head, removes tail unless growing
   */
  move()

  /**
   * Change snake direction (cannot reverse)
   * @param {Direction} newDirection - New movement direction
   * @returns {boolean} true if direction changed, false if invalid
   */
  changeDirection(newDirection)

  /**
   * Add segments to snake growth queue
   * @param {number} count - Number of segments to add
   */
  grow(count)

  /**
   * Get snake head position
   * @returns {Position} Current head coordinates
   */
  getHeadPosition()

  /**
   * Get all snake segments
   * @returns {Position[]} Array from tail [0] to head [last]
   */
  getSegments()

  /**
   * Check if position collides with snake body
   * @param {Position} position - Position to check
   * @returns {boolean} true if collision
   */
  collidesWithSelf(position)

  /**
   * Get current movement direction
   * @returns {Direction} Current direction
   */
  getDirection()

  /**
   * Check if snake is alive
   * @returns {boolean} Snake life state
   */
  isAlive()
}
```

## Movement Contract

### Movement Algorithm

```
For each move:
1. Calculate new head position = current head + direction
2. Add new head to segments array (unshift)
3. If pendingGrowth > 0:
   - Decrement pendingGrowth
   - Do NOT remove tail
4. Else:
   - Remove tail segment (pop)
```

### Direction Rules

- **Allowed**: UP → RIGHT, UP → LEFT, DOWN → RIGHT, DOWN → LEFT, etc.
- **Forbidden**: UP → DOWN, DOWN → UP, LEFT → RIGHT, RIGHT → LEFT
- **Validation**: Change direction only if not reversing

## Growth Contract

### Growth Trigger
- Called by Food module when food is consumed
- Small food: `snake.grow(1)`
- Big food: `snake.grow(3)`

### Growth Behavior
- Growth is queued (pendingGrowth counter)
- Actual growth happens over subsequent moves
- Each move consumes 1 pending growth
- No immediate length change (smooth animation)

## Collision Contract

### Self-Collision Detection
```javascript
positionToCheck = new head position
for (let i = 0; i < segments.length - 1; i++) { // exclude tail if moving
  if (segments[i].x === positionToCheck.x && segments[i].y === positionToCheck.y) {
    return true; // collision
  }
}
return false; // no collision
```

**Important**: Tail is excluded from collision check because it moves in same frame

## Constraints

1. **Minimum Length**: Snake must always have at least 3 segments
2. **No Reversal**: Direction cannot reverse (180-degree turn)
3. **Valid Positions**: All segments must be within board boundaries
4. **Ordered Segments**: segments[0] = tail, segments[last] = head

## Error Handling

- `InvalidDirectionError`: Attempted to reverse direction
- `InvalidPositionError`: Position outside board boundaries
- `CollisionError`: Snake collides with itself (should trigger game over)

## Testing Contract

**Unit Tests Required**:
- move() correctly adds head and removes tail when not growing
- move() keeps tail when growing (pendingGrowth > 0)
- changeDirection() allows valid direction changes
- changeDirection() rejects invalid direction changes (reversal)
- collidesWithSelf() detects collision correctly
- collidesWithSelf() ignores tail during movement
- grow() increments pendingGrowth correctly
- getHeadPosition() returns current head coordinates
- getSegments() returns ordered array (tail to head)

**Integration Tests Required**:
- Snake grows correctly over multiple moves
- Direction changes work during gameplay
- Self-collision detection with various movement patterns
