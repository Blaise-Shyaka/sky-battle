import Entity from './Entity';

export default class PlayerLaser extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    this.body.setVelocityX(-150);
  }
}
