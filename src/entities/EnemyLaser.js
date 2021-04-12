import Entity from './Entity';

export default class EnemyLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemyLaser');
    this.play('enemyLaser');
    this.body.velocity.x = 300;
    this.setData('alive, true');
  }
}
