import Phaser from 'phaser';
import { MainScene } from './scenes/MainScene';
import GameIntro from './scenes/GameIntro';
import GameOver from './scenes/GameOver';
import LeaderBoard from './scenes/LeaderBoard';

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
  scene: [GameIntro, MainScene, GameOver, LeaderBoard],
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
game.score = 0;
export default game;
