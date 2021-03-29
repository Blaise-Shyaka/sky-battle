import Phaser from 'phaser';
import Player from './Player';
import Enemy from './Enemy';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    this.load.image('background', 'assets/background.png');
    this.load.image('jet', 'assets/sprite2.png');
    this.load.image('helicopter', 'assets/helicopter.png');
    this.load.image('playerLaser', 'assets/sprLaserPlayer.png');
    this.load.spritesheet('enemyLaser', 'assets/sprEnemy2.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  create() {
    this.anims.create({
      key: 'enemyLaser',
      frames: this.anims.generateFrameNumbers('sprEnemy2'),
      frameRate: 20,
      repeat: -1,
    });

    this.add.image(400, 300, 'background');

    this.player = new Player(this, 400, 200, 'helicopter').setScale(0.3);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.playerLasersGroup = this.add.group();
    this.enemyLaserGroup = this.add.group();

    const genEnemyJets = () => {
      const yRandomPosition = Math.random() * this.game.config.height;
      const newEnemy = new Enemy(this, 25, yRandomPosition, 'jet');
      newEnemy.shoot(this.scene, newEnemy.x, newEnemy.y);
      this.enemyLaserGroup.add(newEnemy);
    };

    this.time.addEvent({
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