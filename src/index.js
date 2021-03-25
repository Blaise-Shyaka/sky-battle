import Phaser from 'phaser';
import MainScene from './MainScene';
import GameIntro from './GameIntro';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  // backgroundColor: 'black',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [GameIntro, MainScene],
};

const game = new Phaser.Game(config);

game.scene.start('GameIntro');

// function preload() {
//   this.load.image('background', 'assets/background.png');
//   this.load.image('jet', 'assets/sprite2.png');
//   this.load.image('helicopter', 'assets/helicopter.png');
// }

// function create() {
//   console.log('main scene');
//   this.add.image(400, 300, 'background');
//   this.add.image(100, 50, 'jet');

//   // Create enemy jets group
//   this.enemyJets = this.physics.add.group();

//   // Create multiple villains and make sure they move
//   this.time.addEvent({
//     delay: 1000,
//     callBack() {
//       const xPosition = 0;
//       const yPosition = Phaser.Math.Between(0, this.game.config.width);
//       const jetVelocity = Phaser.Math.Between(80, 200);
//       const newJet = this.enemyJets.create(xPosition, yPosition, 'helicopter');
//       newJet.velocity.y = jetVelocity;
//     },
//     loop: true,
//   });
// }
