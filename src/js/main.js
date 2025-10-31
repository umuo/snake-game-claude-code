/**
 * Main entry point for the Snake game
 * Initializes game, input, and rendering
 */

import { Game } from './game/Game.js';
import { Board } from './game/Board.js';
import { Input } from './game/Input.js';
import { i18n } from './i18n/i18n.js';
import { GameConfig } from './utils/constants.js';

class SnakeGameApp {
  constructor() {
    this.game = null;
    this.board = null;
    this.input = null;
    this.gameLoop = null;
    this.lastUpdateTime = 0;

    this.init();
  }

  /**
   * Initialize the application
   */
  init() {
    // Get canvas element
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }

    // Create game instance
    this.game = new Game();

    // Create board renderer
    this.board = new Board(canvas, this.game);

    // Create input handler with restart callback
    this.input = new Input(this.game, () => this.startGame());

    // Setup start button
    const startButton = document.getElementById('startButton');
    if (startButton) {
      startButton.addEventListener('click', () => {
        this.startGame();
      });
    }

    // Setup fullscreen button
    this.setupFullscreen();

    // Setup language switcher
    this.setupLanguageSwitcher();

    // Update UI with current language
    this.updateUILanguage();

    // Initial render
    this.board.render();

    // Show welcome message
    this.showWelcomeMessage();
  }

  /**
   * Setup fullscreen functionality
   */
  setupFullscreen() {
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const gameContainer = document.querySelector('.game-container');
    const canvas = this.board.canvas;

    if (!fullscreenBtn || !gameContainer) return;

    // Store original canvas size
    const originalWidth = canvas.width;
    const originalHeight = canvas.height;

    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        gameContainer
          .requestFullscreen()
          .then(() => {
            gameContainer.classList.add('fullscreen');
            this.resizeCanvasForFullscreen();
            // Ensure focus for keyboard events
            canvas.focus();
            canvas.tabIndex = 1;
          })
          .catch((err) => {
            console.error('Error attempting to enable fullscreen:', err);
          });
      } else {
        document.exitFullscreen();
      }
    });

    // Handle fullscreen change
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        gameContainer.classList.remove('fullscreen');
        // Restore original canvas size
        canvas.style.width = '';
        canvas.style.height = '';
        this.board.render();
      } else {
        this.resizeCanvasForFullscreen();
      }
    });

    // Handle ESC key in fullscreen
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.fullscreenElement) {
        gameContainer.classList.remove('fullscreen');
      }
    });
  }

  /**
   * Resize canvas to fit fullscreen
   */
  resizeCanvasForFullscreen() {
    const canvas = this.board.canvas;
    const gameContainer = document.querySelector('.game-container');

    if (!document.fullscreenElement) return;

    // Calculate scale to fit screen while maintaining aspect ratio
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    const canvasRatio = canvas.width / canvas.height;
    const containerRatio = containerWidth / containerHeight;

    let newWidth, newHeight;

    if (containerRatio > canvasRatio) {
      // Container is wider, fit by height
      newHeight = containerHeight * 0.9; // 90% of screen height
      newWidth = newHeight * canvasRatio;
    } else {
      // Container is taller, fit by width
      newWidth = containerWidth * 0.9; // 90% of screen width
      newHeight = newWidth / canvasRatio;
    }

    canvas.style.width = `${newWidth}px`;
    canvas.style.height = `${newHeight}px`;

    // Re-render to update display
    this.board.render();
  }

  /**
   * Setup language switcher
   */
  setupLanguageSwitcher() {
    const langBtn = document.getElementById('langBtn');
    const langMenu = document.getElementById('langMenu');
    const langOptions = document.querySelectorAll('.lang-option');

    if (!langBtn || !langMenu) return;

    // Toggle menu
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langMenu.classList.toggle('hidden');
    });

    // Close menu when clicking outside
    document.addEventListener('click', () => {
      langMenu.classList.add('hidden');
    });

    // Language selection
    langOptions.forEach((option) => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const lang = option.getAttribute('data-lang');
        if (i18n.setLanguage(lang)) {
          this.updateUILanguage();
          this.board.render();
          if (!this.game.isRunning()) {
            this.showWelcomeMessage();
          }
          langMenu.classList.add('hidden');
        }
      });
    });

    // Update active language indicator
    this.updateLanguageIndicator();
  }

  /**
   * Update language indicator
   */
  updateLanguageIndicator() {
    const currentLang = document.getElementById('currentLang');
    const langOptions = document.querySelectorAll('.lang-option');
    const lang = i18n.getCurrentLanguage();

    if (currentLang) {
      const langName = i18n.getLanguageName(lang);
      currentLang.textContent = `🌐 ${langName}`;
    }

    langOptions.forEach((option) => {
      if (option.getAttribute('data-lang') === lang) {
        option.classList.add('active');
      } else {
        option.classList.remove('active');
      }
    });
  }

  /**
   * Update all UI text with current language
   */
  updateUILanguage() {
    // Update page title and subtitle
    document.getElementById('pageTitle').textContent = `🐍 ${i18n.t('title')}`;
    document.getElementById('pageSubtitle').textContent = i18n.t('subtitle');

    // Update controls
    document.getElementById('controlsTitle').textContent = i18n.t(
      'controls.title'
    );
    document.getElementById('controlMove').textContent = i18n.t(
      'controls.move'
    );
    document.getElementById('controlAlt').textContent = i18n.t(
      'controls.alternativeMove'
    );
    document.getElementById('controlPause').textContent = i18n.t(
      'controls.pause'
    );
    document.getElementById('controlRestart').textContent = i18n.t(
      'controls.restart'
    );
    document.getElementById('controlSpeedBoost').textContent = i18n.t(
      'controls.speedBoost'
    );

    // Update rules
    document.getElementById('rulesTitle').textContent = i18n.t('rules.title');
    document.getElementById('ruleSmallFood').textContent = `🟡 ${i18n.t('rules.smallFood')}`;
    document.getElementById('ruleBigFood').textContent = `🔴 ${i18n.t('rules.bigFood')}`;
    document.getElementById('ruleBigFoodSpawn').textContent = i18n.t(
      'rules.bigFoodSpawn'
    );
    document.getElementById('ruleAvoid').textContent = i18n.t(
      'rules.avoidCollision'
    );

    // Update button
    document.getElementById('startButton').textContent = i18n.t(
      'buttons.start'
    );

    // Update stats board labels
    document.getElementById('statScoreLabel').textContent = i18n.t(
      'gameInfo.score'
    );
    document.getElementById('statLengthLabel').textContent = i18n.t(
      'gameInfo.length'
    );
    document.getElementById('statProgressLabel').textContent = i18n.t(
      'gameInfo.progress'
    );

    // Update footer
    document.getElementById('footerText').textContent = i18n.t(
      'footer.builtWith'
    );

    // Update language indicator
    this.updateLanguageIndicator();

    // Update HTML lang attribute
    document.documentElement.lang = i18n.getCurrentLanguage();
  }

  /**
   * Show welcome message on canvas
   */
  showWelcomeMessage() {
    const ctx = this.board.ctx;
    const canvas = this.board.canvas;

    // Semi-transparent overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Welcome text
    ctx.fillStyle = '#4ade80';
    ctx.font = 'bold 48px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(
      i18n.t('gameState.welcome'),
      canvas.width / 2,
      canvas.height / 2 - 60
    );

    // Subtitle
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px monospace';
    ctx.fillText(
      i18n.t('gameState.welcomeSubtitle'),
      canvas.width / 2,
      canvas.height / 2 - 20
    );

    // Instructions
    ctx.font = '16px monospace';
    ctx.fillText(
      i18n.t('gameState.welcomeHint'),
      canvas.width / 2,
      canvas.height / 2 + 30
    );

    ctx.font = '14px monospace';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(
      i18n.t('gameState.controlHint'),
      canvas.width / 2,
      canvas.height / 2 + 60
    );
  }

  /**
   * Start the game
   */
  startGame() {
    // Stop existing game loop if any
    if (this.gameLoop) {
      cancelAnimationFrame(this.gameLoop);
    }

    // Reset and start game
    this.game.reset();
    this.game.start();

    // Start game loop
    this.lastUpdateTime = performance.now();
    this.runGameLoop();
  }

  /**
   * Main game loop
   */
  runGameLoop() {
    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastUpdateTime;

    // Update game at appropriate speed
    if (deltaTime >= this.game.getSpeed()) {
      this.game.update();
      this.board.render();
      this.updateStats();
      this.lastUpdateTime = currentTime;
    }

    // Continue loop if game is running
    if (this.game.isRunning() && !this.game.isGameOver()) {
      this.gameLoop = requestAnimationFrame(() => this.runGameLoop());
    } else if (this.game.isGameOver()) {
      // Render final game over screen
      this.board.render();
      this.updateStats();
    }
  }

  /**
   * Update stats display
   */
  updateStats() {
    const scoreEl = document.getElementById('statScore');
    const lengthEl = document.getElementById('statLength');
    const progressEl = document.getElementById('statProgress');

    if (scoreEl) scoreEl.textContent = this.game.getScore();
    if (lengthEl) lengthEl.textContent = this.game.getSnake().getLength();
    if (progressEl) {
      const progress = this.game.getSmallFoodCount();
      progressEl.textContent = `${progress}/${GameConfig.SMALL_FOOD_COUNT}`;
    }
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new SnakeGameApp();
});
