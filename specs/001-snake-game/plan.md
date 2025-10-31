# Implementation Plan: Snake Game with Progressive Difficulty

**Branch**: `001-snake-game` | **Date**: 2025-10-29 | **Spec**: [link]
**Input**: Feature specification from `/specs/001-snake-game/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Develop a browser-based Snake game with progressive difficulty mechanics using Vite build tool with vanilla HTML, CSS, and JavaScript. Players control a snake that moves around a game board, eating food to grow. The unique feature is that every 4 consecutive small foods eaten spawns a big food that makes the snake grow by 3 segments and increases game speed by 15%. Technical approach: Vite for development/build, HTML5 Canvas for rendering, vanilla JavaScript for game logic, with comprehensive unit tests following TDD methodology.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: JavaScript ES2020
**Build Tool**: Vite (for development server and bundling)
**Primary Dependencies**: HTML5 Canvas API (native, no game libraries)
**Storage**: LocalStorage for high scores
**Testing**: Jest with jsdom environment
**Target Platform**: Web browser (desktop)
**Project Type**: single (desktop web game)
**Performance Goals**: 60 FPS during gameplay
**Constraints**: Cross-browser compatibility, minimal libraries
**Scale/Scope**: Single-player game, ~400-500 LOC

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Requirement | Status | Justification |
|-----------|------------|---------|---------------|
| I. Unit Testing | Tests written BEFORE implementation (TDD) | ✅ COMPLIANT | Feature spec includes test-first methodology |
| I. Unit Testing | 80%+ code coverage required | ✅ COMPLIANT | Research chose Jest with built-in coverage, config targets 80% |
| II. Code Formatting | Automated formatters and linters configured | ✅ COMPLIANT | Research finalized ESLint + Prettier, config documented in quickstart |
| II. Code Formatting | Configuration committed to version control | ✅ COMPLIANT | .eslintrc.json and .prettierrc defined, ready for commit |
| III. Documentation Retention | Feature specs, plans, tasks documented | ✅ COMPLIANT | spec.md, plan.md, research.md, data-model.md, contracts/, quickstart.md complete |
| IV. Test-First Development | Red-Green-Refactor cycle enforced | ✅ COMPLIANT | TDD pattern documented in quickstart with example |
| V. Continuous Integration | CI/CD validates tests, formatting, linting | ✅ COMPLIANT | Scripts in package.json define validation commands, ready for CI |

**Gate Status**: ✅ PASS - All requirements satisfied after research phase

## Project Structure

### Documentation (this feature)

```text
specs/001-snake-game/
├── plan.md              # This file (/speckit.plan command output)
├── spec.md              # Feature specification
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
src/
├── js/
│   ├── game/
│   │   ├── Game.js          # Main game loop and orchestration
│   │   ├── Snake.js         # Snake entity and movement logic
│   │   ├── Food.js          # Food entity (small and big)
│   │   ├── Board.js         # Game board rendering (Canvas)
│   │   ├── Input.js         # Keyboard input handling
│   │   └── Collision.js     # Collision detection logic
│   └── utils/
│       ├── constants.js     # Game constants (sizes, speeds, etc.)
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
│   ├── Collision.test.js
│   └── utils/
│       ├── Position.test.js
│       └── Direction.test.js
└── integration/
    └── game-flow.test.js

Configuration Files:
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies and scripts
├── .eslintrc.json          # ESLint configuration
├── .prettierrc             # Prettier configuration
└── jest.config.js          # Jest configuration

docs/
├── API.md                  # Game API documentation
└── GAMEPLAY.md             # How to play guide
```

**Structure Decision**: Vite project structure with vanilla JavaScript. Source code in src/js/, styles in src/css/, no external libraries. Tests in tests/ directory. Vite provides development server and build tooling.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
