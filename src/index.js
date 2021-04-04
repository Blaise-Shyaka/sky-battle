import Phaser from 'phaser';
import MainScene from './MainScene';
import GameIntro from './GameIntro';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      enableBody: true,
    },
  },
  scene: [GameIntro, MainScene],
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
