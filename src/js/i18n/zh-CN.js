/**
 * 中文语言包
 */
export const zhCN = {
  // 页面标题
  title: '贪吃蛇游戏',
  subtitle: '渐进式难度版',

  // 控制说明
  controls: {
    title: '游戏控制',
    move: '移动蛇',
    alternativeMove: '备用移动键',
    pause: '暂停/恢复',
    restart: '开始/重启',
    speedBoost: '长按方向键加速',
  },

  // 游戏规则
  rules: {
    title: '游戏规则',
    smallFood: '黄色苹果: +10 分，增长 1 格',
    bigFood: '红色星星: +50 分，增长 3 格，速度提升 15%',
    bigFoodSpawn: '连续吃到 4 个小食物后会出现大食物',
    avoidCollision: '避免撞墙和咬到自己！',
  },

  // 按钮
  buttons: {
    start: '开始游戏',
    restart: '重新开始',
    pause: '暂停',
    resume: '继续',
  },

  // 游戏状态
  gameState: {
    welcome: '贪吃蛇游戏',
    welcomeSubtitle: '渐进式难度',
    welcomeHint: '按 ENTER、R 键或点击开始游戏按钮',
    controlHint: '使用方向键或 WASD 移动',
    paused: '已暂停',
    pauseHint: '按空格键或 P 键继续',
    gameOver: '游戏结束',
    gameOverHint: '按 ENTER 或 R 键重新开始',
  },

  // 游戏信息
  gameInfo: {
    score: '分数',
    finalScore: '最终分数',
    nextBigFood: '下一个大食物',
    length: '长度',
    progress: '进度',
  },

  // 页脚
  footer: {
    builtWith: '使用 JavaScript ES2020 + HTML5 Canvas 构建',
  },

  // 语言切换
  language: {
    label: '语言',
    chinese: '中文',
    english: 'English',
  },
};
