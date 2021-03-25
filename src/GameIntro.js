import Phaser from 'phaser';

export default class GameIntro extends Phaser.Scene {
  constructor() {
    super('GameIntro');
  }

  preload() {
    this.load.image('sprite', 'assets/sprite6.png');
  }

  create() {
    this.scene.start('MainScene');
  }
}
