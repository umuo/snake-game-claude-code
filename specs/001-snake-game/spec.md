# Feature Specification: Snake Game with Progressive Difficulty

**Feature Branch**: `001-snake-game`
**Created**: 2025-10-29
**Status**: Draft
**Input**: User description: "生成一个贪吃蛇的游戏，每连续吃到4个下小食物，便会生成一个大的食物，大的食物会让蛇变的更长，速度更快"

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.

  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Basic Snake Movement and Food Collection (Priority: P1)

A player can start a new game and control the snake to move around the game board, eating food to grow longer.

**Why this priority**: This is the core gameplay loop that defines the Snake game experience. Without this, there is no playable game.

**Independent Test**: Can be fully tested by starting the game, moving the snake in all directions, and eating food to verify the snake length increases by 1 unit per food.

**Acceptance Scenarios**:

1. **Given** a new game started, **When** the snake moves, **Then** the snake moves smoothly in the current direction without reversing
2. **Given** the snake's head is on a food position, **When** the food is eaten, **Then** the snake grows by 1 segment and a new food spawns
3. **Given** the snake moves into its own body, **When** collision occurs, **Then** the game ends with a game over screen
4. **Given** the snake moves out of bounds, **When** collision occurs, **Then** the game ends with a game over screen

---

### User Story 2 - Progressive Difficulty: Big Food Every 4 Small Foods (Priority: P2)

After eating 4 consecutive small food items, a larger food item appears that provides bonus growth and speed increase.

**Why this priority**: This adds the progressive difficulty mechanic that is central to the feature specification, making the game more engaging and challenging over time.

**Independent Test**: Can be fully tested by eating 4 small foods in sequence and verifying a big food spawns, then eating the big food to verify increased growth and speed.

**Acceptance Scenarios**:

1. **Given** a player has eaten 3 small foods, **When** they eat the 4th small food, **Then** a big food appears at a random position
2. **Given** a big food has spawned, **When** the player eats it, **Then** the snake grows by 3 segments (compared to 1 for small food)
3. **Given** a big food has been eaten, **When** the snake eats the big food, **Then** the game speed increases by 15%
4. **Given** a big food is eaten, **When** food counter resets, **Then** the player must eat 4 more small foods to spawn the next big food

---

### User Story 3 - Game State Management and Scoring (Priority: P3)

The game tracks score, level progression, and provides pause/restart functionality for better player experience.

**Why this priority**: While not essential to core gameplay, these features provide essential quality-of-life improvements and allow players to track their progress.

**Independent Test**: Can be fully tested by verifying score increases correctly with both food types, pausing and resuming the game, and restarting after game over.

**Acceptance Scenarios**:

1. **Given** small food eaten, **When** food consumed, **Then** score increases by 10 points
2. **Given** big food eaten, **When** food consumed, **Then** score increases by 50 points
3. **Given** game in progress, **When** pause key pressed, **Then** game pauses and can be resumed
4. **Given** game over screen displayed, **When** restart button pressed, **Then** a new game starts with reset state

---

### User Story 4 - Visual Feedback and Polish (Priority: P4)

The game provides clear visual indicators for game state, food types, and progress toward big food.

**Why this priority**: Visual feedback enhances the user experience and makes game mechanics immediately understandable without explanation.

**Independent Test**: Can be fully tested by observing visual differences between small and big food, seeing progress indicators, and recognizing game states (playing, paused, game over).

**Acceptance Scenarios**:

1. **Given** small food present, **When** displayed, **Then** it appears as a green circle (different from big food)
2. **Given** big food present, **When** displayed, **Then** it appears as a red circle that is 2x the size of small food
3. **Given** player eats small foods, **When** counter reaches 3, **Then** visual indicator shows progress toward big food
4. **Given** game over occurs, **When** screen displayed, **Then** it shows final score and restart option

---

### Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
-->

- What happens when the snake eats multiple foods simultaneously due to fast movement?
- How does the game handle direction changes that would cause immediate self-collision?
- Can big food spawn on the snake's body, and how is this resolved?
- What happens if the game board is full and no space remains for new food?

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: System MUST render a game board of at least 20x20 grid
- **FR-002**: System MUST allow snake movement via arrow keys or WASD keys
- **FR-003**: System MUST spawn food at random unoccupied positions on the board
- **FR-004**: System MUST increase snake length by 1 segment when small food is eaten
- **FR-005**: System MUST spawn big food after exactly 4 consecutive small foods are eaten
- **FR-006**: System MUST increase snake length by 3 segments when big food is eaten
- **FR-007**: System MUST increase game speed by 15% when big food is eaten
- **FR-008**: System MUST detect collision with walls and snake body for game over
- **FR-009**: System MUST track and display score (10 pts small food, 50 pts big food)
- **FR-010**: System MUST provide pause functionality (spacebar or pause button)
- **FR-011**: System MUST provide restart functionality after game over

### Key Entities *(include if feature involves data)*

- **Snake**: Ordered collection of coordinates representing body segments with direction vector
- **Food**: Entity with position, type (small/big), and value (score, growth, speed multiplier)
- **Game Board**: 2D grid representing playable area with width and height
- **Game State**: Tracks score, speed, food counter, running/paused/game over status
- **Player Input**: Direction changes from keyboard controls

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: Players can successfully complete a game session from start to game over
- **SC-002**: Snake grows correctly by 1 segment for small food, 3 segments for big food
- **SC-003**: Big food spawns exactly every 4 small foods eaten (no variation)
- **SC-004**: Game speed increases by 15% per big food eaten (cumulative)
- **SC-005**: Score increases by 10 points per small food, 50 points per big food
- **SC-006**: All collision detection works correctly (walls, self-collision, food collection)
- **SC-007**: Game responds to player input within 100ms (smooth movement)
- **SC-008**: Game maintains 30+ FPS during gameplay with full snake and food on board
