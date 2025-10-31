# Data Model: Snake Game

**Feature**: Snake Game with Progressive Difficulty
**Date**: 2025-10-29
**Phase**: 1 - Design and Contracts

## Entities

### 1. Snake

**Purpose**: Represents the player's snake with position, direction, and growth mechanics

**Fields**:
- `segments: Position[]` - Ordered array from tail (index 0) to head (last index)
- `direction: Direction` - Current movement direction (UP, DOWN, LEFT, RIGHT)
- `pendingGrowth: number` - Number of segments to add when food is eaten
- `isAlive: boolean` - Game over state flag

**Relationships**:
- Snake moves based on `direction` vector
- Snake grows by `pendingGrowth` when food is consumed
- Snake checks collision with `Board` boundaries and self in `Collision` service

**State Transitions**:
- On initialization: snake starts with 3 segments, direction = RIGHT
- On movement: new head position added, tail removed unless `pendingGrowth > 0`
- On food eaten: `pendingGrowth += food.growthValue` (1 for small, 3 for big)
- On collision: `isAlive = false`, triggers game over

**Validation Rules**:
- `segments.length >= 3` at game start
- `direction` cannot reverse (no 180-degree turns)
- `pendingGrowth >= 0`

---

### 2. Food

**Purpose**: Represents food items that provide points, growth, and speed bonuses

**Fields**:
- `position: Position` - Grid coordinates (x, y) on the game board
- `type: FoodType` - SMALL or BIG food variant
- `value: number` - Score points (10 for SMALL, 50 for BIG)
- `growthValue: number` - Segments to add to snake (1 for SMALL, 3 for BIG)
- `speedMultiplier: number` - Speed increase factor (1.0 for SMALL, 1.15 for BIG)

**Relationships**:
- Food spawns at random empty positions on the `Board`
- Food is consumed when snake's head reaches `position`
- BIG food spawns after eating 4 consecutive SMALL foods

**Validation Rules**:
- Position must be within board boundaries
- Position cannot overlap with snake segments
- Each food spawn is independent

**State Transitions**:
- On spawn: random valid position generated
- On consumption: triggers snake growth and speed increase

---

### 3. Game Board

**Purpose**: Defines the playable area and visual representation of the game

**Fields**:
- `width: number` - Grid width in cells (default: 20)
- `height: number` - Grid height in cells (default: 20)
- `cellSize: number` - Pixel size of each cell (default: 20px)
- `canvas: CanvasRenderingContext2D` - HTML5 Canvas context for rendering

**Relationships**:
- Board renders snake, food, and UI elements
- Board provides bounds checking for snake movement
- Board coordinates used for collision detection

**Validation Rules**:
- `width >= 20` (minimum playable size)
- `height >= 20` (minimum playable size)
- `cellSize` divisible by 2 for clean rendering

---

### 4. Position

**Purpose**: Represents grid coordinates on the game board

**Fields**:
- `x: number` - Horizontal coordinate (0 to width-1)
- `y: number` - Vertical coordinate (0 to height-1)

**Validation Rules**:
- `x >= 0 && x < board.width`
- `y >= 0 && y < board.height`

---

### 5. Direction

**Purpose**: Enumerates possible movement directions for the snake

**Values**:
- `UP: Position` = { x: 0, y: -1 }
- `DOWN: Position` = { x: 0, y: 1 }
- `LEFT: Position` = { x: -1, y: 0 }
- `RIGHT: Position` = { x: 1, y: 0 }

**Validation Rules**:
- Direction change cannot reverse (e.g., UP cannot change to DOWN)

---

### 6. Game State

**Purpose**: Tracks overall game progress and statistics

**Fields**:
- `score: number` - Current score points
- `level: number` - Current difficulty level (increases with big food eaten)
- `isRunning: boolean` - Game active state
- `isPaused: boolean` - Pause toggle state
- `smallFoodEaten: number` - Counter for consecutive small foods (resets on big food)
- `baseSpeed: number` - Initial game speed (e.g., 150ms per move)
- `currentSpeed: number` - Current speed adjusted for big food bonuses
- `gameSpeedMultiplier: number` - Cumulative speed multiplier (1.0 + 0.15 × bigFoodEaten)

**Relationships**:
- Game State updates when food is consumed
- Game State controls game loop timing

**Validation Rules**:
- `score >= 0`
- `level >= 1`
- `gameSpeedMultiplier >= 1.0`

**State Transitions**:
- On game start: `isRunning = true`, `isPaused = false`, `score = 0`
- On pause: `isPaused = !isPaused`
- On game over: `isRunning = false`
- On small food eaten: `smallFoodEaten++`, `score += 10`
- On big food eaten: `smallFoodEaten = 0`, `score += 50`, `bigFoodEaten++`, update speed

---

### 7. Game Config

**Purpose**: Centralized configuration constants

**Fields**:
- `BOARD_WIDTH: number` = 20
- `BOARD_HEIGHT: number` = 20
- `CELL_SIZE: number` = 20
- `INITIAL_SNAKE_LENGTH: number` = 3
- `BASE_SPEED_MS: number` = 150 (lower = faster)
- `SMALL_FOOD_VALUE: number` = 10
- `BIG_FOOD_VALUE: number` = 50
- `BIG_FOOD_GROWTH: number` = 3
- `BIG_FOOD_SPEED_INCREASE: number` = 0.15 (15%)
- `SMALL_FOOD_PER_BIG: number` = 4
- `SNAKE_COLOR: string` = '#4CAF50'
- `SMALL_FOOD_COLOR: string` = '#FF5722'
- `BIG_FOOD_COLOR: string` = '#E91E63'

---

## Entity Relationships

```
Game (orchestrates everything)
├── Snake (one)
│   └── segments[] → Position[]
├── Food (one at a time)
│   └── position → Position
├── Game Board (one)
│   └── canvas → CanvasRenderingContext2D
├── Game State (one)
│   └── tracks score, speed, counters
└── Input Handler (one)
    └── direction changes → Snake.direction
```

## Key Algorithms

### Collision Detection
- **Snake vs Food**: Snake head position equals food position
- **Snake vs Board**: Snake head x/y within [0, width/height)
- **Snake vs Self**: Snake head position matches any body segment (except tail if moving)

### Food Spawning
1. Check for available empty positions on board
2. Generate random position
3. Verify position doesn't conflict with snake segments
4. Spawn food at position

### Progressive Difficulty
1. Track `smallFoodEaten` counter
2. When counter reaches 4:
   - Spawn BIG food
   - Reset counter to 0
3. When BIG food eaten:
   - Add 3 to snake growth
   - Increase speed by 15% (cumulative)
   - Increment level counter

## Data Flow

```
Player Input → Input Handler → Game State
                    ↓
               Collision Check
                    ↓
              Update Snake Position
                    ↓
              Check Food Collision
                    ↓
           Update Score, Growth, Speed
                    ↓
              Render to Canvas
```

## Validation Summary

All entities have clear validation rules to prevent:
- Invalid game states (impossible snake positions, negative scores)
- Out-of-bounds movement or spawning
- Missing critical data (null/undefined positions, directions)
- Progressively broken game state (speed calculations, growth counters)
