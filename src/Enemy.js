import Phaser from 'phaser';
import Entity from './Entity';
import EnemyLaser from './EnemyLaser';

export default class Enemy extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    this.body.velocity.x = Phaser.Math.Between(150, 250);
  }

  generate() {
    if (this.active) {
      const enemyLaser = new EnemyLaser(this.scene, this.x, this.y);
      enemyLaser.angle -= 90;
      this.scene.enemyLaserGroup.add(enemyLaser);
    }
  }

  shoot() {
    this.scene.time.addEvent({
      delay: 300,
      callback: this.generate,
      callbackScope: this,
      loop: true,
    });
  }
}
