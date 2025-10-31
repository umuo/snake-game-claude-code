# Quickstart Guide: Snake Game Development

**Feature**: Snake Game with Progressive Difficulty
**Version**: 1.0
**Last Updated**: 2025-10-29

## Overview

This guide will help you set up the development environment and start implementing the Snake game following TDD methodology and project constitution requirements.

## Prerequisites

- **Node.js** 16+ installed
- **npm** or **yarn** package manager
- **Git** for version control
- **Modern code editor** (VS Code recommended)

## Project Setup

### 1. Initialize Vite Project

```bash
# Create new Vite project with vanilla JavaScript template
npm create vite@latest snake-game -- --template vanilla

# Navigate to project directory
cd snake-game

# Install additional dependencies
npm install
```

### 2. Install Development Dependencies

```bash
# Install testing framework
npm install --save-dev jest

# Install code quality tools
npm install --save-dev eslint prettier

# Install lint-staged for pre-commit hooks
npm install --save-dev lint-staged
```

### 3. Configure Jest

Create `jest.config.js`:

```javascript
module.exports = {
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

### 4. Configure ESLint

Create `.eslintrc.json`:

```json
{
  "env": {
    "browser": true,
    "es2020": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "rules": {
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "always"]
  }
}
```

### 5. Configure Prettier

Create `.prettierrc`:

```json
{
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "es5"
}
```

### 6. Setup Package.json Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint src/js/**/*.js",
    "format": "prettier --write src/js/**/*.js",
    "format:check": "prettier --check src/js/**/*.js"
  },
  "lint-staged": {
    "*.js": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

**Note**: Vite's default scripts (dev, build, preview) are already included when initializing with `npm create vite`. Add the testing and linting scripts.

### 7. Vite Configuration

Vite works out-of-the-box with vanilla JavaScript. The default configuration in `vite.config.js` is sufficient for this project:

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // No plugins needed for vanilla JS
  // Config will be auto-discovered
})
```

### 8. Starting Development

```bash
# Start Vite development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# In another terminal, run tests
npm test
```

**Note**: Vite's development server provides hot module replacement (HMR). When you modify JavaScript files, the browser automatically refreshes without losing game state (for CSS changes). For JavaScript changes, you'll need to refresh the page.

## Development Workflow

### Phase 1: Setup (Day 1)

**Tasks**:
1. Create project structure
2. Install and configure tools
3. Write initial tests

**Estimated Time**: 2-4 hours

### Phase 2: Foundational Components (Days 2-3)

**Tasks**:
1. Implement GameConfig (constants)
2. Implement Position and Direction utilities
3. Write unit tests for utilities

**Estimated Time**: 4-6 hours

### Phase 3: Core Game Logic (Days 4-7)

**Tasks**:
1. Implement Snake module with TDD
2. Implement Food module with TDD
3. Implement Collision module with TDD

**Estimated Time**: 12-16 hours

### Phase 4: Game Integration (Days 8-10)

**Tasks**:
1. Implement Game module
2. Implement Board rendering
3. Implement Input handling
4. Integration testing

**Estimated Time**: 10-14 hours

### Phase 5: Polish & Testing (Days 11-12)

**Tasks**:
1. UI/UX improvements
2. Performance optimization
3. Full test coverage validation
4. Documentation

**Estimated Time**: 6-8 hours

## TDD Implementation Pattern

### Example: Implementing Snake Module

**Step 1: Write Failing Test** (RED)

```javascript
// tests/unit/Snake.test.js
const { Snake } = require('../../src/game/Snake');
const { Position, Direction } = require('../../src/game/utils');

describe('Snake', () => {
  test('should initialize with 3 segments', () => {
    const snake = new Snake({x: 10, y: 10}, Direction.RIGHT);
    expect(snake.getSegments().length).toBe(3);
  });

  test('should move forward one cell', () => {
    const snake = new Snake({x: 10, y: 10}, Direction.RIGHT);
    const initialHead = snake.getHeadPosition();

    snake.move();

    const newHead = snake.getHeadPosition();
    expect(newHead.x).toBe(initialHead.x + 1);
    expect(newHead.y).toBe(initialHead.y);
  });
});
```

**Step 2: Run Tests** (RED)

```bash
npm test
# Should see failing tests
```

**Step 3: Write Minimum Implementation** (GREEN)

```javascript
// src/game/Snake.js
const { Position } = require('./utils');

class Snake {
  constructor(startPosition, startDirection) {
    this.segments = [
      { x: startPosition.x, y: startPosition.y },
      { x: startPosition.x - 1, y: startPosition.y },
      { x: startPosition.x - 2, y: startPosition.y }
    ];
    this.direction = startDirection;
    this.pendingGrowth = 0;
  }

  move() {
    const head = this.segments[this.segments.length - 1];
    const newHead = {
      x: head.x + this.direction.x,
      y: head.y + this.direction.y
    };
    this.segments.push(newHead);

    if (this.pendingGrowth > 0) {
      this.pendingGrowth--;
    } else {
      this.segments.shift();
    }
  }

  getSegments() {
    return this.segments;
  }

  getHeadPosition() {
    return this.segments[this.segments.length - 1];
  }
}

module.exports = { Snake };
```

**Step 4: Run Tests** (GREEN)

```bash
npm test
# Should see passing tests
```

**Step 5: Refactor** (REFACTOR)

```bash
npm run lint
npm run format
npm test -- --coverage
# Verify 80%+ coverage
```

## Testing Requirements

### Unit Tests Coverage

**Required Files** (80%+ coverage each):
- `src/game/Game.js`
- `src/game/Snake.js`
- `src/game/Food.js`
- `src/game/Board.js`
- `src/game/Input.js`
- `src/game/Collision.js`

### Test Commands

```bash
# Run all tests
npm test

# Run tests in watch mode (TDD workflow)
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run integration tests only
npm test -- --testPathPattern=integration
```

## Code Quality Gates

Before committing code, verify:

```bash
# All tests pass
npm test

# Code coverage >= 80%
npm run test:coverage

# Linting passes
npm run lint

# Formatting check
npm run format:check
```

## File Structure Reference

```
src/
├── js/
│   ├── game/
│   │   ├── Game.js          # Main game loop
│   │   ├── Snake.js         # Snake entity
│   │   ├── Food.js          # Food spawning/consumption
│   │   ├── Board.js         # Canvas rendering
│   │   ├── Input.js         # Keyboard controls
│   │   └── Collision.js     # Collision detection
│   └── utils/
│       ├── constants.js     # Game constants
│       ├── Position.js      # Position utility
│       └── Direction.js     # Direction enum
├── css/
│   └── styles.css           # Game styling
└── index.html               # Game entry point

tests/
├── unit/
│   ├── Game.test.js
│   ├── Snake.test.js
│   ├── Food.test.js
│   ├── Board.test.js
│   ├── Input.test.js
│   ├── Collision.test.js
│   └── utils/
│       ├── Position.test.js
│       └── Direction.test.js
└── integration/
    └── game-flow.test.js

Configuration Files:
├── vite.config.js          # Vite configuration
├── jest.config.js          # Jest configuration
├── .eslintrc.json          # ESLint configuration
└── .prettierrc             # Prettier configuration
```

**Note**: Vite project structure with source code in `src/` directory. The `index.html` file will import `main.js` (or your entry point) which initializes the game.

## Game Controls

**Player Controls**:
- Arrow Keys or WASD: Change snake direction
- Spacebar: Pause/Resume game
- Enter: Start new game after game over

**Development Controls** (console):
- `game.getGameState()`: View current state
- `game.togglePause()`: Pause/unpause
- `game.gameOver()`: End game (testing)

## Progressive Difficulty Mechanics

### Small Food (Default)
- Size: 1x1 cell
- Color: Green
- Score: 10 points
- Growth: +1 segment
- Speed: No change

### Big Food (Every 4 Small Foods)
- Size: 2x2 cell
- Color: Red
- Score: 50 points
- Growth: +3 segments
- Speed: +15% (cumulative)

### Speed Calculation

```javascript
const baseSpeed = 150; // ms per move
const bigFoodEaten = 0; // counter
const speedMultiplier = 1 + (bigFoodEaten * 0.15);
const currentSpeed = baseSpeed / speedMultiplier;
```

## Troubleshooting

### Tests Failing

**Issue**: `Cannot find module`
**Solution**: Ensure correct relative paths in require statements

**Issue**: Tests timing out
**Solution**: Check for infinite loops in update logic

**Issue**: Coverage below 80%
**Solution**: Add tests for edge cases and error conditions

### Performance Issues

**Issue**: Game running <60 FPS
**Solution**: Optimize collision checks, minimize DOM updates

**Issue**: Memory leaks
**Solution**: Clean up event listeners, use object pooling for food

### Game Logic Bugs

**Issue**: Snake reversing direction
**Solution**: Verify direction change validation in Snake module

**Issue**: Big food spawning incorrectly
**Solution**: Check small food counter reset logic

**Issue**: Collision not detected
**Solution**: Verify collision check order (food → wall → self)

## Next Steps

After completing implementation:

1. Run full test suite: `npm test`
2. Generate coverage report: `npm run test:coverage`
3. Validate code quality: `npm run lint && npm run format:check`
4. Play test the game: Open `index.html` in browser
5. Verify progressive difficulty: Eat 4 small foods, confirm big food appears
6. Submit pull request with all tests passing

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Game Architecture Patterns](https://gameprogrammingpatterns.com/)
