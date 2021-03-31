import Phaser from 'phaser';

export default class GameIntro extends Phaser.Scene {
  constructor() {
    super('GameIntro');
  }

  preload() {
    this.load.image('gameBackground', 'assets/f35.jpeg');
    this.load.image('playButton', 'assets/play-btn.png');
  }

  create() {
    this.add.image(400, 300, 'gameBackground').setScale(3.5);
    this.playBtn = this.add.image(400, 500, 'playButton').setScale(0.7);
    this.playBtn.setInteractive({ useHandCursor: true });
    this.pointer = this.input.activePointer;
    this.add.text(150, 25, 'SKY', { fontFamily: '"Press Start 2P"', fontSize: 100, color: '#4D1A0A' });
    this.add.text(150, 95, 'BATTLE', { fontFamily: '"Press Start 2P"', fontSize: 100, color: '#4D1A0A' });
    this.playBtn.on('pointerdown', function() {
      this.scene.start('MainScene');
    }, this);
  }
}
