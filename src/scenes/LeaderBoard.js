import Phaser from 'phaser';
import { getTopScores } from '../helpers/gameHelpers';

export default class LeaderBoard extends Phaser.Scene {
  constructor() {
    super({ key: 'LeaderBoard' });
    this.gameApiId = 'WU53r6YoPGNHhlvVTFu9';
  }

  create() {
    this.add.text(150, 30, 'LEADERBOARD', { fontSize: 65 });
    this.loading = this.add.text(140, 150, '', { fontSize: 35 });
    this.playAgain = this.add.text(300, 390, 'Play Again');
    this.playAgain.setInteractive({ useHandCursor: true });
    this.pointer = this.input.activePointer;

    this.playAgain.on('pointerdown', () => {
      this.scene.start('GameIntro');
      const playerNameInput = document.querySelector('#playerName');
      playerNameInput.classList.remove('hide');
      playerNameInput.value = '';
    });
    getTopScores(this.loading, this.gameApiId);
  }

  printTopScores(arr) {
    arr.forEach(elt => {
      const yPosition = arr.indexOf(elt) * 30 + 130;
      this.add.text(300, yPosition, `${elt.user}: ${elt.score}`);
    });
  }
}