import Phaser from 'phaser';
import Player from './Player';
import PlayerLaser from './PlayerLaser';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    this.load.image('background', 'assets/background.png');
    this.load.image('jet', 'assets/sprite2.png');
    this.load.image('helicopter', 'assets/helicopter.png');
    this.load.image('playerLaser', 'assets/sprLaserPlayer.png');
  }

  create() {
    this.add.image(400, 300, 'background');
    // this.add.sprite(200, 100, 'jet');
    this.player = new Player(this, 400, 200, 'helicopter').setScale(0.3);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.playerLasersGroup = this.add.group();
    const enemyLaserGroup = this.add.group();

    function genEnemyJets() {
      const yRandomPosition = Math.random() * this.game.config.height;
      // const jet = enemyJets.create(10, yRandomPosition, 'jet');
    }

    const timer = this.time.addEvent({
      delay: 1000,
      callback: genEnemyJets,
      callbackScope: this,
      loop: true,
    });
  }

  update() {
    this.player.body.setVelocity(0, 0);

    if (this.cursors.down.isDown) {
      this.player.moveDown();
    } else if (this.cursors.up.isDown) {
      this.player.moveUp();
    } else if (this.cursors.left.isDown) {
      this.player.moveLeft();
    } else if (this.cursors.right.isDown) {
      this.player.moveRight();
    }

    if (this.cursors.space.isDown) {
      this.player.shoot();
    }
  }
}