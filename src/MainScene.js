import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    this.load.image('background', 'assets/background.png');
    this.load.image('jet', 'assets/sprite2.png');
    this.load.image('helicopter', 'assets/helicopter.png');
  }

  create() {
    this.add.image(400, 300, 'background');
    this.add.sprite(200, 100, 'jet');
    this.player = this.add.sprite(400, 200, 'helicopter').setScale(0.3);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.enemyJets = this.physics.add.group();

    this.time.addEvent({
      delay: 500,
      callBack() {
        // const xRandomPosition = Phaser.Math.between(0, this.game.config.height);
        // const enemyJet = new EnemyJet(this, 0, xRandomPosition, 'jet');
        // this.enemyJets.add(enemyJet);
      },
      callBackScope: this,
      loop: true,
    });
  }

  update() {
    const playerVelocity = 10;

    if (this.cursors.down.isDown) {
      this.player.y += playerVelocity;
    } else if (this.cursors.up.isDown) {
      this.player.y -= playerVelocity;
    } else if (this.cursors.left.isDown) {
      this.player.x -= playerVelocity;
    } else if (this.cursors.right.isDown) {
      this.player.x += playerVelocity;
    }
  }
}