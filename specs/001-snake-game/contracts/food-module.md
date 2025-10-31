# Food Module Contract

**Module**: `src/game/Food.js`
**Purpose**: Food spawning, type management, and consumption
**Dependencies**: Position, Snake, Board, GameConfig

## Interface

```javascript
class Food {
  /**
   * Initialize food entity
   */
  constructor()

  /**
   * Spawn new food on game board
   * @param {Position[]} snakeSegments - Current snake segments to avoid
   * @param {number} boardWidth - Board width in cells
   * @param {number} boardHeight - Board height in cells
   * @param {number} smallFoodCounter - Number of small foods eaten consecutively
   * @returns {boolean} true if food spawned successfully
   */
  spawn(snakeSegments, boardWidth, boardHeight, smallFoodCounter)

  /**
   * Get current food position
   * @returns {Position|null} Current food coordinates or null if no food
   */
  getPosition()

  /**
   * Get food type
   * @returns {'SMALL' | 'BIG'} Type of current food
   */
  getType()

  /**
   * Get food value (score points)
   * @returns {number} Point value
   */
  getValue()

  /**
   * Get food growth effect
   * @returns {number} Segments to add to snake
   */
  getGrowthValue()

  /**
   * Get food speed multiplier
   * @returns {number} Speed multiplier (1.0 for small, 1.15 for big)
   */
  getSpeedMultiplier()

  /**
   * Check if position matches food location
   * @param {Position} position - Position to check
   * @returns {boolean} true if food is at position
   */
  isAtPosition(position)

  /**
   * Check if food should spawn as big food
   * @param {number} smallFoodCounter - Number of small foods eaten
   * @returns {boolean} true if should spawn big food
   */
  shouldSpawnBigFood(smallFoodCounter)
}
```

## Food Type Contract

### SMALL Food
- **Type**: `'SMALL'`
- **Value**: 10 points
- **Growth**: 1 segment
- **Speed Multiplier**: 1.0 (no change)
- **Spawn Condition**: Default food type

### BIG Food
- **Type**: `'BIG'`
- **Value**: 50 points
- **Growth**: 3 segments
- **Speed Multiplier**: 1.15 (15% faster)
- **Spawn Condition**: After eating 4 consecutive SMALL foods

## Spawning Contract

### Spawning Algorithm

```
spawn(snakeSegments, boardWidth, boardHeight, smallFoodCounter):
1. Determine food type:
   - If smallFoodCounter >= 4: type = BIG
   - Else: type = SMALL

2. Find available position:
   - Get all empty cells (not in snakeSegments, within board)
   - If no empty cells: return false (cannot spawn)

3. Select random position from empty cells

4. Set food properties based on type

5. Return true
```

### Validation Rules

- Position cannot be occupied by snake segments
- Position must be within board boundaries (0 to width-1, 0 to height-1)
- BIG food only spawns after exactly 4 SMALL foods consumed
- If board is full, spawning fails (returns false)

## Consumption Contract

### Food Eaten Flow

```
When snake head reaches food position:
1. food.isAtPosition(snake.head) returns true
2. Game calls food.getValue(), getGrowthValue(), getSpeedMultiplier()
3. Game updates score and snake growth
4. Food is marked as consumed
5. Next game tick spawns new food
```

### BIG Food Effects

When BIG food is consumed:
- Score increases by 50 points (not 10)
- Snake grows by 3 segments (not 1)
- Speed increases by 15% (cumulative)
- `smallFoodCounter` resets to 0 (for next BIG food cycle)

## Spawning Validation

**SUCCESS Criteria**:
- Food position not in snakeSegments
- Food position within board bounds
- Type correctly determined based on counter

**FAILURE Criteria**:
- No empty positions available on board
- Position overlaps with snake
- Board dimensions invalid

## Error Handling

- `NoSpaceAvailableError`: Board is full, cannot spawn food
- `InvalidBoardSizeError`: Board dimensions are invalid
- `InvalidCounterError`: smallFoodCounter is negative

## Testing Contract

**Unit Tests Required**:
- spawn() places SMALL food at valid position
- spawn() places BIG food after 4 small foods
- spawn() fails when board is full
- spawn() never places food on snake
- getType() returns correct type for each food
- getValue() returns 10 for SMALL, 50 for BIG
- getGrowthValue() returns 1 for SMALL, 3 for BIG
- getSpeedMultiplier() returns 1.0 for SMALL, 1.15 for BIG
- isAtPosition() correctly detects food location
- shouldSpawnBigFood() returns false for counter 0-3, true for 4+

**Integration Tests Required**:
- Food respawns correctly after consumption
- BIG food spawns exactly every 4 small foods
- Food counter resets after BIG food consumption
- Game handles inability to spawn food (edge case)
