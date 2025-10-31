# Tasks: Snake Game with Progressive Difficulty

**Input**: Design documents from `/specs/001-snake-game/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Tests are included per Constitution requirement for TDD methodology.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Vite project**: `src/js/`, `src/css/`, `tests/` at repository root
- All paths follow Vite project structure as defined in plan.md

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create Vite project with vanilla JavaScript template
- [X] T002 Install Jest testing framework and dev dependencies
- [X] T003 [P] Configure ESLint for code quality
- [X] T004 [P] Configure Prettier for code formatting
- [X] T005 [P] Configure Jest with jsdom and coverage thresholds
- [X] T006 [P] Create project structure (src/js, src/css, tests, docs)
- [X] T007 Setup package.json scripts (dev, build, test, lint, format)

**Checkpoint**: Development environment ready with all tools configured

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T008 [P] Implement Position utility class in src/js/utils/Position.js
- [ ] T009 [P] Implement Direction enum in src/js/utils/Direction.js
- [ ] T010 [P] Create GameConfig constants in src/js/utils/constants.js
- [ ] T011 [P] Write unit tests for Position in tests/unit/utils/Position.test.js
- [ ] T012 [P] Write unit tests for Direction in tests/unit/utils/Direction.test.js
- [ ] T013 Write unit tests for constants in tests/unit/utils/constants.test.js
- [ ] T014 Implement Collision detection service in src/js/game/Collision.js
- [ ] T015 Write unit tests for Collision in tests/unit/Collision.test.js

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Basic Snake Movement and Food Collection (Priority: P1) 🎯 MVP

**Goal**: Implement core Snake game mechanics with movement, food consumption, and collision detection

**Independent Test**: Can be fully tested by starting the game, moving the snake in all directions, and eating food to verify the snake length increases by 1 unit per food.

### Tests for User Story 1 (TDD Required)

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T016 [P] [US1] Write unit tests for Snake class in tests/unit/Snake.test.js
- [ ] T017 [P] [US1] Write unit tests for Food class in tests/unit/Food.test.js
- [ ] T018 [P] [US1] Write unit tests for Game class in tests/unit/Game.test.js
- [ ] T019 [US1] Write integration test for basic gameplay in tests/integration/game-flow.test.js

### Implementation for User Story 1

- [ ] T020 [P] [US1] Implement Snake entity in src/js/game/Snake.js
- [ ] T021 [P] [US1] Implement Food entity in src/js/game/Food.js
- [ ] T022 [P] [US1] Implement Input handler in src/js/game/Input.js
- [ ] T023 [US1] Implement Board rendering in src/js/game/Board.js (depends on T020, T021, T022)
- [ ] T024 [US1] Implement Game orchestration in src/js/game/Game.js (depends on T014, T023)
- [ ] T025 [P] [US1] Create HTML entry point in index.html
- [ ] T026 [P] [US1] Create basic CSS styles in src/css/styles.css
- [ ] T027 [US1] Integrate main.js entry point and verify game runs

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Progressive Difficulty: Big Food Every 4 Small Foods (Priority: P2)

**Goal**: Add progressive difficulty with big food spawning after 4 small foods, big food provides bonus growth and speed increase

**Independent Test**: Can be fully tested by eating 4 small foods in sequence and verifying a big food spawns, then eating the big food to verify increased growth and speed.

### Tests for User Story 2 (TDD Required)

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T028 [P] [US2] Write unit tests for big food spawning logic in tests/unit/Food.test.js
- [ ] T029 [P] [US2] Write unit tests for speed increase mechanics in tests/unit/Game.test.js
- [ ] T030 [US2] Write integration test for progressive difficulty in tests/integration/progressive-difficulty.test.js

### Implementation for User Story 2

- [ ] T031 [P] [US2] Implement big food spawning logic in src/js/game/Food.js
- [ ] T032 [P] [US2] Implement food counter tracking in src/js/game/Game.js
- [ ] T033 [US2] Implement speed increase mechanics (depends on T031, T032)
- [ ] T034 [P] [US2] Update Board rendering for big food visual in src/js/game/Board.js
- [ ] T035 [US2] Update GameState to track consecutive food count (depends on T032)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Game State Management and Scoring (Priority: P3)

**Goal**: Add score tracking, level progression, pause/restart functionality

**Independent Test**: Can be fully tested by verifying score increases correctly with both food types, pausing and resuming the game, and restarting after game over.

### Tests for User Story 3 (TDD Required)

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T036 [P] [US3] Write unit tests for score tracking in tests/unit/Game.test.js
- [ ] T037 [P] [US3] Write unit tests for pause/resume functionality in tests/unit/Game.test.js
- [ ] T038 [P] [US3] Write unit tests for restart mechanics in tests/unit/Game.test.js
- [ ] T039 [US3] Write integration test for game state management in tests/integration/game-state.test.js

### Implementation for User Story 3

- [ ] T040 [P] [US3] Implement score tracking system in src/js/game/Game.js
- [ ] T041 [P] [US3] Implement pause/resume functionality in src/js/game/Game.js
- [ ] T042 [P] [US3] Implement restart mechanics in src/js/game/Game.js
- [ ] T043 [P] [US3] Implement LocalStorage for high score persistence in src/js/game/Game.js
- [ ] T044 [US3] Update Input handler for pause/restart controls (depends on T041, T042)
- [ ] T045 [P] [US3] Update Board rendering for score display in src/js/game/Board.js

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently

---

## Phase 6: User Story 4 - Visual Feedback and Polish (Priority: P4)

**Goal**: Enhance visual feedback with different food types, progress indicators, and polished UI

**Independent Test**: Can be fully tested by observing visual differences between small and big food, seeing progress indicators, and recognizing game states (playing, paused, game over).

### Tests for User Story 4 (TDD Required)

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T046 [P] [US4] Write unit tests for visual rendering in tests/unit/Board.test.js
- [ ] T047 [P] [US4] Write unit tests for UI state display in tests/unit/Game.test.js
- [ ] T048 [US4] Write integration test for visual feedback in tests/integration/visual-feedback.test.js

### Implementation for User Story 4

- [ ] T049 [P] [US4] Enhance Board rendering with distinct food visuals in src/js/game/Board.js
- [ ] T050 [P] [US4] Implement progress indicator for next big food in src/js/game/Board.js
- [ ] T051 [P] [US4] Add game over screen with restart button in src/js/game/Board.js
- [ ] T052 [P] [US4] Enhance CSS styling for polished look in src/css/styles.css
- [ ] T053 [P] [US4] Add visual effects for food consumption in src/js/game/Board.js
- [ ] T054 [US4] Update main UI layout and game state displays (depends on T049-T053)

**Checkpoint**: At this point, all user stories should be independently functional

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T055 [P] Add comprehensive API documentation in docs/API.md
- [ ] T056 [P] Create gameplay guide in docs/GAMEPLAY.md
- [ ] T057 [P] Run full test suite and achieve 80%+ coverage
- [ ] T058 [P] Performance optimization: ensure 60 FPS gameplay
- [ ] T059 [P] Add responsive design for different screen sizes
- [ ] T060 [P] Code cleanup and refactoring for maintainability
- [ ] T061 [P] Verify all linting and formatting rules pass

**Checkpoint**: Game is production-ready with all features complete

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3 → P4)
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable
- **User Story 4 (P4)**: Can start after Foundational (Phase 2) - May integrate with US1/US2/US3 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Utilities before core game logic
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can be written in parallel
- Models/entities within a story marked [P] can be implemented in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Write unit tests for Snake class in tests/unit/Snake.test.js"
Task: "Write unit tests for Food class in tests/unit/Food.test.js"
Task: "Write unit tests for Game class in tests/unit/Game.test.js"

# Launch all entity implementations for User Story 1 together:
Task: "Implement Snake entity in src/js/game/Snake.js"
Task: "Implement Food entity in src/js/game/Food.js"
Task: "Implement Input handler in src/js/game/Input.js"

# Launch UI entry points in parallel:
Task: "Create HTML entry point in index.html"
Task: "Create basic CSS styles in src/css/styles.css"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready (basic Snake game playable)

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
   - Developer D: User Story 4 (or Polish)
3. Stories complete and integrate independently

---

## Notes

- **[P]** tasks = different files, no dependencies
- **[Story]** label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing (TDD methodology)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- All user stories require TDD approach: write tests first, then implementation
- Constitution requires 80%+ code coverage for all production code
- Vite project structure must be followed as defined in plan.md

---

## Quick Reference

**Total Tasks**: 61 tasks
- Setup: 7 tasks
- Foundational: 8 tasks
- User Story 1: 12 tasks (includes 4 tests)
- User Story 2: 7 tasks (includes 3 tests)
- User Story 3: 10 tasks (includes 4 tests)
- User Story 4: 9 tasks (includes 3 tests)
- Polish: 7 tasks

**MVP Scope**: Phases 1-3 (User Story 1) - Basic playable Snake game
**Full Feature**: All phases complete - Full Snake game with progressive difficulty
**Parallel Opportunities**: 24+ tasks marked with [P] can run in parallel
