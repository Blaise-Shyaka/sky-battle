import Entity from './Entity';
import PlayerLaser from './PlayerLaser';

export default class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    this.setData('speed', 200);
  }

  moveUp() {
    this.body.velocity.y = -this.getData('speed');
  }

  moveDown() {
    this.body.velocity.y = this.getData('speed');
  }

  moveLeft() {
    this.body.velocity.x = -this.getData('speed');
  }

  moveRight() {
    this.body.velocity.x = this.getData('speed');
  }

  shoot() {
    const playerLaser = new PlayerLaser(this.scene, this.body.x, this.body.y, 'playerLaser');
    playerLaser.angle += 90;
    this.scene.playerLasersGroup.add(playerLaser, true);
  }
}
