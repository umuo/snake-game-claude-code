/**
 * Board renderer
 * Handles canvas rendering for the game
 */

import { GameConfig } from '../utils/constants.js';
import { i18n } from '../i18n/i18n.js';

export class Board {
  /**
   * Create board renderer
   * @param {HTMLCanvasElement} canvas - Canvas element
   * @param {Game} game - Game instance to render
   */
  constructor(canvas, game) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.game = game;

    // Set canvas size
    this.canvas.width = GameConfig.BOARD_WIDTH * GameConfig.CELL_SIZE;
    this.canvas.height = GameConfig.BOARD_HEIGHT * GameConfig.CELL_SIZE;
  }

  /**
   * Render the entire game state
   */
  render() {
    this.clearBoard();
    this.drawSnake();
    this.drawFood();

    // Show game over or paused state
    if (this.game.isGameOver()) {
      this.drawGameOver();
    } else if (this.game.isPaused()) {
      this.drawPaused();
    }
  }

  /**
   * Clear the board
   */
  clearBoard() {
    // Dark gradient background
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw grid with subtle lines
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    this.ctx.lineWidth = 1;

    for (let x = 0; x <= GameConfig.BOARD_WIDTH; x++) {
      this.ctx.beginPath();
      this.ctx.moveTo(x * GameConfig.CELL_SIZE, 0);
      this.ctx.lineTo(x * GameConfig.CELL_SIZE, this.canvas.height);
      this.ctx.stroke();
    }

    for (let y = 0; y <= GameConfig.BOARD_HEIGHT; y++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y * GameConfig.CELL_SIZE);
      this.ctx.lineTo(this.canvas.width, y * GameConfig.CELL_SIZE);
      this.ctx.stroke();
    }
  }

  /**
   * Draw the snake
   */
  drawSnake() {
    const snake = this.game.getSnake();
    const body = snake.getBody();

    body.forEach((segment, index) => {
      const x = segment.x * GameConfig.CELL_SIZE;
      const y = segment.y * GameConfig.CELL_SIZE;
      const size = GameConfig.CELL_SIZE;

      if (index === 0) {
        // Head - brighter with gradient and eyes
        const gradient = this.ctx.createRadialGradient(
          x + size / 2,
          y + size / 2,
          0,
          x + size / 2,
          y + size / 2,
          size / 2
        );
        gradient.addColorStop(0, '#6ee7b7');
        gradient.addColorStop(1, '#10b981');
        this.ctx.fillStyle = gradient;

        // Rounded head
        this.ctx.beginPath();
        this.ctx.roundRect(x + 2, y + 2, size - 4, size - 4, 6);
        this.ctx.fill();

        // Eyes
        const direction = snake.getDirection();
        let eyeX1 = x + size * 0.35;
        let eyeY1 = y + size * 0.35;
        let eyeX2 = x + size * 0.65;
        let eyeY2 = y + size * 0.35;

        // Adjust eye position based on direction
        if (direction.name === 'DOWN') {
          eyeY1 = y + size * 0.65;
          eyeY2 = y + size * 0.65;
        } else if (direction.name === 'LEFT') {
          eyeX1 = x + size * 0.35;
          eyeY1 = y + size * 0.35;
          eyeX2 = x + size * 0.35;
          eyeY2 = y + size * 0.65;
        } else if (direction.name === 'RIGHT') {
          eyeX1 = x + size * 0.65;
          eyeY1 = y + size * 0.35;
          eyeX2 = x + size * 0.65;
          eyeY2 = y + size * 0.65;
        }

        // Draw eyes
        this.ctx.fillStyle = '#ffffff';
        this.ctx.beginPath();
        this.ctx.arc(eyeX1, eyeY1, 3, 0, Math.PI * 2);
        this.ctx.arc(eyeX2, eyeY2, 3, 0, Math.PI * 2);
        this.ctx.fill();

        // Pupils
        this.ctx.fillStyle = '#000000';
        this.ctx.beginPath();
        this.ctx.arc(eyeX1, eyeY1, 1.5, 0, Math.PI * 2);
        this.ctx.arc(eyeX2, eyeY2, 1.5, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        // Body - gradient green with pattern
        const gradient = this.ctx.createLinearGradient(x, y, x + size, y + size);
        gradient.addColorStop(0, '#34d399');
        gradient.addColorStop(1, '#059669');
        this.ctx.fillStyle = gradient;

        // Rounded body segments
        this.ctx.beginPath();
        this.ctx.roundRect(x + 2, y + 2, size - 4, size - 4, 4);
        this.ctx.fill();

        // Add subtle pattern
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
      }
    });
  }

  /**
   * Draw the food
   */
  drawFood() {
    const food = this.game.getFood();
    const pos = food.getPosition();
    const centerX = pos.x * GameConfig.CELL_SIZE + GameConfig.CELL_SIZE / 2;
    const centerY = pos.y * GameConfig.CELL_SIZE + GameConfig.CELL_SIZE / 2;

    if (food.isBig()) {
      // Big food - glowing red star
      const radius = GameConfig.CELL_SIZE / 2 - 2;

      // Outer glow
      const glowGradient = this.ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.5,
        centerX,
        centerY,
        radius * 1.5
      );
      glowGradient.addColorStop(0, 'rgba(239, 68, 68, 0.8)');
      glowGradient.addColorStop(1, 'rgba(239, 68, 68, 0)');
      this.ctx.fillStyle = glowGradient;
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, radius * 1.5, 0, Math.PI * 2);
      this.ctx.fill();

      // Main body - star shape
      this.ctx.fillStyle = '#ef4444';
      this.ctx.strokeStyle = '#dc2626';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        if (i === 0) this.ctx.moveTo(x, y);
        else this.ctx.lineTo(x, y);

        const innerAngle = angle + Math.PI / 5;
        const innerX = centerX + Math.cos(innerAngle) * (radius * 0.5);
        const innerY = centerY + Math.sin(innerAngle) * (radius * 0.5);
        this.ctx.lineTo(innerX, innerY);
      }
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();

      // Sparkle effect
      this.ctx.fillStyle = '#fecaca';
      this.ctx.beginPath();
      this.ctx.arc(centerX - 3, centerY - 3, 2, 0, Math.PI * 2);
      this.ctx.fill();
    } else {
      // Small food - glowing apple
      const radius = GameConfig.CELL_SIZE / 3;

      // Outer glow
      const glowGradient = this.ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        radius * 1.8
      );
      glowGradient.addColorStop(0, 'rgba(251, 191, 36, 0.6)');
      glowGradient.addColorStop(1, 'rgba(251, 191, 36, 0)');
      this.ctx.fillStyle = glowGradient;
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, radius * 1.8, 0, Math.PI * 2);
      this.ctx.fill();

      // Main apple body
      const appleGradient = this.ctx.createRadialGradient(
        centerX - radius * 0.3,
        centerY - radius * 0.3,
        0,
        centerX,
        centerY,
        radius
      );
      appleGradient.addColorStop(0, '#fde047');
      appleGradient.addColorStop(1, '#f59e0b');
      this.ctx.fillStyle = appleGradient;
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      this.ctx.fill();

      // Stem
      this.ctx.strokeStyle = '#92400e';
      this.ctx.lineWidth = 2;
      this.ctx.lineCap = 'round';
      this.ctx.beginPath();
      this.ctx.moveTo(centerX, centerY - radius);
      this.ctx.lineTo(centerX + 2, centerY - radius - 3);
      this.ctx.stroke();

      // Highlight
      this.ctx.fillStyle = 'rgba(254, 243, 199, 0.8)';
      this.ctx.beginPath();
      this.ctx.arc(centerX - radius * 0.4, centerY - radius * 0.4, 3, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  /**
   * Draw UI elements (score, etc.)
   */
  drawUI() {
    // Semi-transparent background for UI
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.ctx.fillRect(0, 0, this.canvas.width, 80);

    // Draw score
    this.ctx.fillStyle = '#fbbf24';
    this.ctx.font = 'bold 20px monospace';
    this.ctx.textAlign = 'left';
    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    this.ctx.shadowBlur = 4;
    this.ctx.fillText(`${i18n.t('gameInfo.score')}: ${this.game.getScore()}`, 15, 30);

    // Draw small food progress
    const progress = this.game.getSmallFoodCount();
    this.ctx.fillStyle = '#34d399';
    this.ctx.font = 'bold 16px monospace';
    this.ctx.fillText(
      `${i18n.t('gameInfo.nextBigFood')}: ${progress}/${GameConfig.SMALL_FOOD_COUNT}`,
      15,
      55
    );

    // Draw snake length on the right
    this.ctx.textAlign = 'right';
    this.ctx.fillStyle = '#6ee7b7';
    this.ctx.fillText(
      `${i18n.t('gameInfo.length')}: ${this.game.getSnake().getLength()}`,
      this.canvas.width - 15,
      30
    );

    // Reset shadow
    this.ctx.shadowBlur = 0;
  }

  /**
   * Draw game over screen
   */
  drawGameOver() {
    // Semi-transparent overlay
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Game Over text
    this.ctx.fillStyle = '#ef4444';
    this.ctx.font = 'bold 48px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(
      i18n.t('gameState.gameOver'),
      this.canvas.width / 2,
      this.canvas.height / 2 - 40
    );

    // Score
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 24px monospace';
    this.ctx.fillText(
      `${i18n.t('gameInfo.finalScore')}: ${this.game.getScore()}`,
      this.canvas.width / 2,
      this.canvas.height / 2 + 10
    );

    // Restart instruction
    this.ctx.font = '16px monospace';
    this.ctx.fillText(
      i18n.t('gameState.gameOverHint'),
      this.canvas.width / 2,
      this.canvas.height / 2 + 50
    );
  }

  /**
   * Draw paused screen
   */
  drawPaused() {
    // Semi-transparent overlay
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Paused text
    this.ctx.fillStyle = '#fbbf24';
    this.ctx.font = 'bold 48px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(i18n.t('gameState.paused'), this.canvas.width / 2, this.canvas.height / 2);

    // Resume instruction
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '16px monospace';
    this.ctx.fillText(
      i18n.t('gameState.pauseHint'),
      this.canvas.width / 2,
      this.canvas.height / 2 + 40
    );
  }
}
