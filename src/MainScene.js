import Phaser from 'phaser';
import Player from './Player';
import Enemy from './Enemy';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
    this.score = 0;
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
    this.load.spritesheet('explodePlane', './assets/explosion.png', {
      frameWidth: 60,
      frameHeight: 60,
    });
  }

  create() {
    this.anims.create({
      key: 'enemyLaser',
      frames: this.anims.generateFrameNumbers('enemyLaser'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'explodePlane',
      frames: this.anims.generateFrameNumbers('explodePlane', { start: 0, end: 20 }),
      frameRate: 20,
      repeat: -1,
    });

    this.add.image(400, 300, 'background');

    this.player = new Player(this, 400, 200, 'helicopter').setScale(0.3);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.playerLasersGroup = this.add.group();
    this.enemiesGroup = this.add.group();
    this.enemyLaserGroup = this.add.group();

    const genEnemyJets = () => {
      const yRandomPosition = Math.random() * this.game.config.height;
      const newEnemy = new Enemy(this, 25, yRandomPosition, 'jet');
      newEnemy.shoot(this.scene, newEnemy.x, newEnemy.y);
      this.enemiesGroup.add(newEnemy);
    };

    this.time.addEvent({
      delay: 1000,
      callback: genEnemyJets,
      callbackScope: this,
      loop: true,
    });

    this.physics.add.overlap(this.playerLasersGroup,
      this.enemyLaserGroup,
      this.handleLasersCollision,
      null,
      this);

    this.physics.add.collider(this.enemyLaserGroup,
      this.player,
      this.handleHelicopterCrash,
      null,
      this);

    this.physics.add.collider(this.playerLasersGroup,
      this.enemiesGroup,
      this.handleJetCrash,
      null,
      this);
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

    this.player.x = Phaser.Math.Clamp(this.player.x, 0, this.game.config.width - 35);
    this.player.y = Phaser.Math.Clamp(this.player.y, 30, this.game.config.height - 55);

    this.destroyEnemyGroupElements(this.enemiesGroup);
    this.destroyEnemyGroupElements(this.enemyLaserGroup);
    this.destroyPlayerLasers();
  }

  destroyEnemyGroupElements(group) {
    for (let i = 0; i < group.getChildren().length; i += 1) {
      const enemy = group.getChildren()[i];
      enemy.update();
      if (enemy.body.x > this.game.config.width) {
        enemy.destroy();
      }
    }
  }

  destroyPlayerLasers() {
    for (let i = 0; i < this.playerLasersGroup.getChildren().length; i += 1) {
      const playerLaser = this.playerLasersGroup.getChildren()[i];
      playerLaser.update();
      if (this.player.body.x < 0) {
        playerLaser.destroy();
      }
    }
  }

  handleLasersCollision(playerLaser, enemyLaser) {
    enemyLaser.destroy();
    playerLaser.destroy();
    this.score += 50;
  }

  handleHelicopterCrash(enemyLaser, helicopter) {
    helicopter.play('explodePlane');
    enemyLaser.destroy();
    this.scene.pause();
  }

  handleJetCrash(playerLaser, jet) {
    jet.play('explodePlane');
    // enemyLaser.destroy();
    this.scene.pause();
  }
}