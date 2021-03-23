import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 640,
  backgroundColor: 'black',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [
  ],
  pixelArt: true,
  roundPixels: true,
};

const game = new Phaser.Game(config);