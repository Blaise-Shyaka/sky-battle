import Entity from './Entity';

export default class EnemyLaser extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    this.body.velocity.x = 300;
  }
}
