# Game Module Contract

**Module**: `src/game/Game.js`
**Purpose**: Main game orchestration and loop
**Dependencies**: Snake, Food, Board, Collision, Input, GameConfig, GameState

## Interface

```javascript
class Game {
  /**
   * Initialize new game instance
   * @param {HTMLCanvasElement} canvas - Game board canvas element
   */
  constructor(canvas)

  /**
   * Start a new game session
   * Resets all state and begins game loop
   */
  startNewGame()

  /**
   * Pause or resume the game
   * @param {boolean} forceState - Optional: true to pause, false to resume
   */
  togglePause(forceState)

  /**
   * End current game session
   * Stops loop and shows game over screen
   */
  gameOver()

  /**
   * Main game loop - called via requestAnimationFrame
   * @param {number} timestamp - Current timestamp for frame calculation
   */
  gameLoop(timestamp)

  /**
   * Update game state (snake movement, collision, food)
   * @param {number} deltaTime - Time elapsed since last update
   */
  update(deltaTime)

  /**
   * Render current game state to canvas
   */
  render()

  /**
   * Get current game state for UI display
   * @returns {object} { score, level, isRunning, isPaused, speedMultiplier }
   */
  getGameState()

  /**
   * Cleanup resources when game ends
   */
  destroy()
}
```

## State Management Contract

### Game State Machine

```
NOT_STARTED → RUNNING → PAUSED → RUNNING
                    ↓
                  GAME_OVER
                    ↓
                (back to) NOT_STARTED
```

### State Transitions

| From State | Event | To State | Action |
|------------|-------|----------|---------|
| NOT_STARTED | startNewGame() | RUNNING | Initialize game objects |
| RUNNING | togglePause() | PAUSED | Stop game loop |
| PAUSED | togglePause() | RUNNING | Resume game loop |
| RUNNING | collision detected | GAME_OVER | Stop loop, save high score |
| GAME_OVER | startNewGame() | RUNNING | Reset and restart |

## Constraints

1. **Frame Rate**: Must maintain 60 FPS using `requestAnimationFrame`
2. **Update Frequency**: Game state updates only when `isRunning && !isPaused`
3. **Collision Order**: Must check boundaries before self-collision
4. **Speed Calculation**: `currentSpeed = BASE_SPEED_MS / (1 + bigFoodEaten * 0.15)`

## Error Handling

- `InvalidCanvasError`: Canvas element is null or invalid
- `GameLoopError`: Multiple game loops running simultaneously
- `StateError`: Invalid state transition attempted

## Performance Requirements

- Game loop executes in <16ms per frame (60 FPS)
- Update logic executes in <5ms per frame
- Render executes in <10ms per frame
- Memory usage <50MB during gameplay

## Testing Contract

**Unit Tests Required**:
- startNewGame() initializes all components correctly
- togglePause() properly changes state
- gameLoop() calls update() and render() in sequence
- getGameState() returns current values
- State transitions follow defined state machine

**Integration Tests Required**:
- Full game session from start to game over
- Pause/resume during gameplay
- Multiple game sessions (no memory leaks)
- High score persistence
