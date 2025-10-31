/**
 * Unit tests for Snake entity
 * Tests snake movement, growth, and state management
 */

import { Snake } from '../../src/js/game/Snake.js';
import { Position } from '../../src/js/utils/Position.js';
import { Direction } from '../../src/js/utils/Direction.js';

describe('Snake', () => {
  describe('constructor', () => {
    test('should create snake with initial position and length', () => {
      const snake = new Snake(10, 10, 3);
      expect(snake.getHead().x).toBe(10);
      expect(snake.getHead().y).toBe(10);
      expect(snake.getLength()).toBe(3);
    });

    test('should initialize with RIGHT direction by default', () => {
      const snake = new Snake(10, 10, 3);
      expect(snake.getDirection()).toBe(Direction.RIGHT);
    });

    test('should create body segments extending left from head', () => {
      const snake = new Snake(10, 10, 3);
      const body = snake.getBody();
      expect(body.length).toBe(3);
      expect(body[0].x).toBe(10); // head
      expect(body[1].x).toBe(9);
      expect(body[2].x).toBe(8);
    });
  });

  describe('setDirection', () => {
    test('should update direction when valid', () => {
      const snake = new Snake(10, 10, 3);
      snake.setDirection(Direction.UP);
      expect(snake.getDirection()).toBe(Direction.UP);
    });

    test('should prevent reversing direction (RIGHT to LEFT)', () => {
      const snake = new Snake(10, 10, 3);
      snake.setDirection(Direction.LEFT);
      expect(snake.getDirection()).toBe(Direction.RIGHT);
    });

    test('should prevent reversing direction (UP to DOWN)', () => {
      const snake = new Snake(10, 10, 3);
      snake.setDirection(Direction.UP);
      snake.setDirection(Direction.DOWN);
      expect(snake.getDirection()).toBe(Direction.UP);
    });

    test('should allow perpendicular direction changes', () => {
      const snake = new Snake(10, 10, 3);
      snake.setDirection(Direction.UP);
      expect(snake.getDirection()).toBe(Direction.UP);
      snake.setDirection(Direction.LEFT);
      expect(snake.getDirection()).toBe(Direction.LEFT);
    });
  });

  describe('move', () => {
    test('should move head in current direction without growing', () => {
      const snake = new Snake(10, 10, 3);
      snake.move(false);
      const head = snake.getHead();
      expect(head.x).toBe(11); // moved right
      expect(head.y).toBe(10);
      expect(snake.getLength()).toBe(3);
    });

    test('should move up correctly', () => {
      const snake = new Snake(10, 10, 3);
      snake.setDirection(Direction.UP);
      snake.move(false);
      const head = snake.getHead();
      expect(head.x).toBe(10);
      expect(head.y).toBe(9); // moved up
    });

    test('should move down correctly', () => {
      const snake = new Snake(10, 10, 3);
      snake.setDirection(Direction.DOWN);
      snake.move(false);
      const head = snake.getHead();
      expect(head.x).toBe(10);
      expect(head.y).toBe(11); // moved down
    });

    test('should move left correctly', () => {
      const snake = new Snake(10, 10, 3);
      // First change to UP to avoid reversing, then to LEFT
      snake.setDirection(Direction.UP);
      snake.setDirection(Direction.LEFT);
      snake.move(false);
      const head = snake.getHead();
      expect(head.x).toBe(9); // moved left
      expect(head.y).toBe(10);
    });

    test('should grow when move with grow=true', () => {
      const snake = new Snake(10, 10, 3);
      snake.move(true);
      expect(snake.getLength()).toBe(4);
    });

    test('should keep tail when growing', () => {
      const snake = new Snake(10, 10, 3);
      const tailBefore = snake.getBody()[2];
      snake.move(true);
      const body = snake.getBody();
      expect(body[3].x).toBe(tailBefore.x);
      expect(body[3].y).toBe(tailBefore.y);
    });

    test('should remove tail when not growing', () => {
      const snake = new Snake(10, 10, 3);
      snake.move(false);
      const body = snake.getBody();
      expect(body.length).toBe(3);
      expect(body[body.length - 1].x).toBe(9);
    });
  });

  describe('grow', () => {
    test('should add segments equal to growth amount', () => {
      const snake = new Snake(10, 10, 3);
      snake.grow(2);
      expect(snake.getLength()).toBe(5);
    });

    test('should maintain head position after growth', () => {
      const snake = new Snake(10, 10, 3);
      const headBefore = snake.getHead();
      snake.grow(3);
      const headAfter = snake.getHead();
      expect(headAfter.x).toBe(headBefore.x);
      expect(headAfter.y).toBe(headBefore.y);
    });
  });

  describe('getBodyWithoutHead', () => {
    test('should return body excluding head', () => {
      const snake = new Snake(10, 10, 3);
      const bodyWithoutHead = snake.getBodyWithoutHead();
      expect(bodyWithoutHead.length).toBe(2);
      expect(bodyWithoutHead[0].x).toBe(9);
      expect(bodyWithoutHead[1].x).toBe(8);
    });

    test('should return empty array for length-1 snake', () => {
      const snake = new Snake(10, 10, 1);
      const bodyWithoutHead = snake.getBodyWithoutHead();
      expect(bodyWithoutHead.length).toBe(0);
    });
  });

  describe('getAllPositions', () => {
    test('should return all body segment positions', () => {
      const snake = new Snake(10, 10, 3);
      const positions = snake.getAllPositions();
      expect(positions.length).toBe(3);
      expect(positions[0].x).toBe(10);
      expect(positions[1].x).toBe(9);
      expect(positions[2].x).toBe(8);
    });
  });
});
