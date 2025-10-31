/**
 * Game configuration constants
 * Contains all game settings and parameters
 */

export const GameConfig = {
  // Board dimensions
  BOARD_WIDTH: 25,
  BOARD_HEIGHT: 20,
  CELL_SIZE: 25,

  // Game speed settings
  INITIAL_SPEED: 150, // milliseconds per frame
  SPEED_INCREASE: 0.15, // 15% speed increase per big food
  SPEED_BOOST_MULTIPLIER: 0.5, // Speed boost when holding direction key (50% faster = half the time)

  // Food mechanics
  SMALL_FOOD_COUNT: 4, // Number of small foods before big food spawns
  SMALL_FOOD_GROWTH: 1, // Segments added when eating small food
  BIG_FOOD_GROWTH: 3, // Segments added when eating big food

  // Scoring
  SMALL_FOOD_SCORE: 10,
  BIG_FOOD_SCORE: 50,

  // Initial snake settings
  INITIAL_SNAKE_LENGTH: 3,
  INITIAL_SNAKE_X: 10,
  INITIAL_SNAKE_Y: 10,
};

// Freeze to prevent modification
Object.freeze(GameConfig);
