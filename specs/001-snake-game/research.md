# Research: Snake Game Implementation

**Feature**: Snake Game with Progressive Difficulty
**Date**: 2025-10-29
**Phase**: 0 - Research and Technology Decisions

## Research Objectives

Resolve all "NEEDS CLARIFICATION" items from Technical Context and validate technology choices against project requirements.

## Decision 1: Build Tool and Framework

**Decision**: Use **Vite** with **vanilla JavaScript ES2020** and **Jest** for testing

**Rationale**:
- **Vite** provides fast development server with hot module replacement (HMR)
- Vite has minimal configuration for vanilla JavaScript projects
- Vite handles ES modules natively without bundling during development
- Vanilla JavaScript keeps dependencies minimal (only Canvas API)
- Jest integrates well with Vite projects and provides:
  - Built-in test runner and assertion library
  - Code coverage reporting (satisfies 80% requirement)
  - jsdom environment for browser API testing
  - Simple configuration for JavaScript projects

**Alternatives Considered**:
- Webpack: More complex configuration, slower development server
- Parcel: Automatic transpilation but adds overhead for vanilla JS
- No build tool: Requires manual live-server setup, no HMR

**Build Tool Rationale**:
Vite selected for developer experience improvement (fast hot reload) while maintaining minimal library approach (no framework dependencies)

---

## Decision 2: Game Rendering Approach

**Decision**: Use **HTML5 Canvas API** directly without game library

**Rationale**:
- Canvas API is native to browsers (no external dependencies)
- Provides full control over rendering pipeline for optimal performance
- Can achieve 60 FPS easily for simple game like Snake
- Draw operations are hardware-accelerated in modern browsers
- Direct pixel-level control for precise collision detection

**Alternatives Considered**:
- Phaser.js: Feature-rich game engine but adds ~500KB bundle size, overkill for Snake
- p5.js: Creative coding library, not optimized for games
- DOM-based rendering: Performance issues with frequent updates, complex collision detection

---

## Decision 3: Code Formatting and Linting

**Decision**: Use **ESLint + Prettier** for code quality

**Rationale**:
- ESLint catches code quality issues and potential bugs
- Prettier enforces consistent code formatting automatically
- Both integrate well with VS Code and CI/CD pipelines
- Pre-commit hooks can run formatting automatically (satisfies Constitution II requirement)
- Standard JavaScript config (eslint:recommended) works out of the box

**Configuration**:
- ESLint config: eslint:recommended + jest plugin for test files
- Prettier config: Print width 100, single quotes, trailing commas
- Pre-commit hook: lint-staged to check only staged files

**Alternatives Considered**:
- StandardJS: Linter with built-in formatter but less flexible configuration
- XO: Wrapper around ESLint but adds opinionated rules that may conflict

---

## Decision 4: Performance Targets

**Decision**: Target **60 FPS** with **<50MB memory** footprint

**Rationale**:
- 60 FPS provides smooth, responsive gameplay (industry standard for games)
- Modern browsers can easily render Snake at 60 FPS with Canvas
- <50MB memory allows game to run on older devices and browsers
- Performance testing can verify via browser DevTools Performance tab

**Measurement**:
- Use `requestAnimationFrame` for game loop (naturally synced to display refresh rate)
- Track FPS in real-time using timestamps
- Monitor memory via Performance API

---

## Decision 5: Target Platform and Browser Support

**Decision**: Support **modern desktop browsers** (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

**Rationale**:
- Snake is primarily a desktop game (keyboard controls)
- Modern browsers have full Canvas API support and ES2020 features
- Covers 95%+ of desktop browser usage according to current statistics
- Can add mobile touch controls later as enhancement

---

## Decision 6: Storage Strategy

**Decision**: Use **LocalStorage** for persistent high scores

**Rationale**:
- LocalStorage is supported across all target browsers
- Provides simple key-value storage without backend
- Data persists across browser sessions
- Can implement high score leaderboard easily

---

## Summary of Research Findings

All "NEEDS CLARIFICATION" items have been resolved:

1. ✅ **Language/Version**: JavaScript ES2020 (finalized)
2. ✅ **Primary Dependencies**: HTML5 Canvas API (no external game library needed)
3. ✅ **Testing**: Jest framework chosen with built-in coverage
4. ✅ **Storage**: LocalStorage for high scores (finalized)
5. ✅ **Target Platform**: Modern desktop browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
6. ✅ **Performance Goals**: 60 FPS target (upgraded from 30 FPS requirement)
7. ✅ **Constraints**: Cross-browser compatibility, <50MB memory (finalized)
8. ✅ **Scale/Scope**: Single-player game, ~400-500 LOC estimated (finalized)

## Updated Technical Context

**Language/Version**: JavaScript ES2020
**Primary Dependencies**: HTML5 Canvas API (native), Jest for testing
**Storage**: LocalStorage for high scores
**Testing**: Jest with 80%+ code coverage requirement
**Target Platform**: Modern desktop browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
**Project Type**: single (desktop web game)
**Performance Goals**: 60 FPS gameplay, <50MB memory footprint
**Constraints**: Cross-browser compatibility, keyboard controls
**Scale/Scope**: Single-player game, ~400-500 LOC

## Risks and Mitigations

**Risk**: Browser performance variations across different devices
**Mitigation**: Use `requestAnimationFrame` for frame-synchronized updates, monitor actual FPS in real-time

**Risk**: Edge cases in collision detection with fast snake movement
**Mitigation**: Implement delta-time based movement, add unit tests for all collision scenarios

**Risk**: Game becomes too difficult with cumulative speed increases
**Mitigation**: Test and tune speed increase factor (15%) to ensure playability
