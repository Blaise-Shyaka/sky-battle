import Phaser from 'phaser';
import Entity from './Entity';

export default class Enemy extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    this.body.velocity.x = Phaser.Math.Between(150, 250);
  }
}
